#!/usr/bin/env python3
"""
Lead Gen Pipeline — Step 3: Enrich Leads
Crawls lead websites to find automation gaps and extract contact emails.
Uses Hunter.io to find owner/decision-maker email addresses.
"""

import os
import json
import time
import requests
from pathlib import Path
from datetime import datetime
from urllib.parse import urlparse

from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / ".env")

APIFY_TOKEN = os.getenv("APIFY_API_TOKEN")
HUNTER_API_KEY = os.getenv("HUNTER_API_KEY")


def crawl_website(url: str) -> dict:
    """Crawl a single website via Apify's Website Content Crawler."""
    resp = requests.post(
        "https://api.apify.com/v2/acts/apify~website-content-crawler/runs",
        params={"token": APIFY_TOKEN, "waitForFinish": 120},
        json={
            "startUrls": [{"url": url}],
            "maxCrawlPages": 5,
            "crawlerType": "cheerio",  # fast, lightweight
        },
        timeout=180,
    )
    resp.raise_for_status()
    run_data = resp.json()["data"]

    if run_data["status"] != "SUCCEEDED":
        return {"pages": [], "error": run_data["status"]}

    items_resp = requests.get(
        f"https://api.apify.com/v2/datasets/{run_data['defaultDatasetId']}/items",
        params={"token": APIFY_TOKEN, "format": "json"},
        timeout=60,
    )
    items_resp.raise_for_status()
    return {"pages": items_resp.json(), "error": None}


def analyze_website(pages: list) -> dict:
    """Analyze crawled pages for automation gaps."""
    all_text = " ".join(p.get("text", "") for p in pages).lower()

    signals = {
        "has_online_booking": any(
            kw in all_text
            for kw in ["book online", "schedule appointment", "book now", "online booking", "calendly", "acuity"]
        ),
        "has_chatbot": any(
            kw in all_text
            for kw in ["chat with us", "live chat", "chatbot", "intercom", "drift", "zendesk"]
        ),
        "has_contact_form": any(
            kw in all_text
            for kw in ["contact form", "get in touch", "send us a message", "contact us"]
        ),
        "has_reviews_widget": any(
            kw in all_text
            for kw in ["testimonials", "what our customers say", "reviews", "google reviews"]
        ),
        "has_seo_basics": any(
            kw in all_text
            for kw in ["meta description", "og:title"]
        ),
        "page_count": len(pages),
    }

    # Calculate automation gap score
    gaps = []
    if not signals["has_online_booking"]:
        gaps.append("No online booking system")
    if not signals["has_chatbot"]:
        gaps.append("No chatbot or live chat")
    if not signals["has_reviews_widget"]:
        gaps.append("No reviews/testimonials section")
    if signals["page_count"] <= 2:
        gaps.append("Minimal website (few pages)")

    signals["automation_gaps"] = gaps
    signals["gap_count"] = len(gaps)

    return signals


def find_contact_email(domain: str) -> dict:
    """Use Hunter.io to find the best contact email for a domain."""
    if not HUNTER_API_KEY or not domain:
        return {}

    try:
        resp = requests.get(
            "https://api.hunter.io/v2/domain-search",
            params={"domain": domain, "api_key": HUNTER_API_KEY, "limit": 3},
            timeout=15,
        )
        resp.raise_for_status()
        data = resp.json().get("data", {})

        emails = data.get("emails", [])
        if not emails:
            return {}

        # Prefer owner/CEO/founder, then management, then first result
        priority_titles = ["owner", "ceo", "founder", "president", "director", "manager"]
        best = emails[0]
        for email_entry in emails:
            position = (email_entry.get("position") or "").lower()
            if any(title in position for title in priority_titles):
                best = email_entry
                break

        return {
            "email": best.get("value"),
            "email_confidence": best.get("confidence"),
            "email_first_name": best.get("first_name"),
            "email_last_name": best.get("last_name"),
            "email_position": best.get("position"),
            "email_source": "hunter.io",
        }
    except Exception as e:
        print(f"    Hunter.io error: {e}")
        return {}


def extract_domain(website: str) -> str:
    """Extract clean domain from a website URL."""
    if not website:
        return ""
    if not website.startswith("http"):
        website = "https://" + website
    parsed = urlparse(website)
    domain = parsed.netloc or parsed.path
    return domain.replace("www.", "").strip("/")


def enrich_leads(input_file: str, max_enrich: int = 50) -> tuple:
    """Enrich top leads with website analysis."""
    with open(input_file) as f:
        leads = json.load(f)

    print(f"\nEnriching top {max_enrich} leads with website analysis...")

    enriched = []
    skipped = 0

    for i, lead in enumerate(leads[:max_enrich]):
        website = lead.get("website")
        if not website:
            lead["enrichment"] = {
                "automation_gaps": ["No website at all — needs everything"],
                "gap_count": 5,
                "has_online_booking": False,
                "has_chatbot": False,
            }
            enriched.append(lead)
            continue

        print(f"  [{i+1}/{min(max_enrich, len(leads))}] Crawling {website}...")

        try:
            result = crawl_website(website)
            if result["error"]:
                print(f"    Error: {result['error']}")
                lead["enrichment"] = {"error": result["error"]}
            else:
                analysis = analyze_website(result["pages"])
                lead["enrichment"] = analysis
                print(f"    Gaps found: {analysis['gap_count']} — {', '.join(analysis['automation_gaps'][:3])}")
        except Exception as e:
            print(f"    Error: {e}")
            lead["enrichment"] = {"error": str(e)}
            skipped += 1

        # Hunter.io email lookup
        domain = extract_domain(website)
        if domain:
            contact = find_contact_email(domain)
            if contact.get("email"):
                lead["contact_email"] = contact["email"]
                lead["contact_name"] = f"{contact.get('email_first_name', '')} {contact.get('email_last_name', '')}".strip()
                lead["contact_position"] = contact.get("email_position", "")
                lead["email_confidence"] = contact.get("email_confidence", 0)
                print(f"    Email: {contact['email']} ({contact.get('email_position', 'unknown role')}, {contact.get('email_confidence', '?')}% confidence)")

        enriched.append(lead)
        time.sleep(1)  # rate limiting

    # Re-score with enrichment data
    for lead in enriched:
        enrich = lead.get("enrichment", {})
        gap_count = enrich.get("gap_count", 0)
        # Boost score based on automation gaps
        lead["score"] = lead.get("score", 50) + (gap_count * 3)
        lead["score"] = min(lead["score"], 100)

    enriched.sort(key=lambda x: x.get("score", 0), reverse=True)

    # Save
    output_dir = Path(input_file).parent
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = output_dir / f"leads_enriched_{timestamp}.json"
    with open(output_file, "w") as f:
        json.dump(enriched, f, indent=2)

    print(f"\nEnriched {len(enriched)} leads (skipped {skipped})")
    print(f"Saved to: {output_file}")

    return enriched, output_file


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Enrich leads with website analysis")
    parser.add_argument("input_file", help="Path to scored/qualified leads JSON")
    parser.add_argument("--max", type=int, default=50, help="Max leads to enrich")
    args = parser.parse_args()

    enrich_leads(args.input_file, args.max)
