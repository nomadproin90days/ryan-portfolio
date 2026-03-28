#!/usr/bin/env python3
"""
Lead Gen Pipeline — Step 1: Scrape Google Maps via Apify
Finds local businesses matching Ryan's ICP across target verticals and cities.
"""

import os
import json
import time
import requests
from datetime import datetime
from pathlib import Path

# Load API token
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / ".env")

APIFY_TOKEN = os.getenv("APIFY_API_TOKEN")
if not APIFY_TOKEN:
    raise ValueError("APIFY_API_TOKEN not found in .env")

ACTOR_ID = "compass~crawler-google-places"
BASE_URL = f"https://api.apify.com/v2/acts/{ACTOR_ID}"

# --- ICP Configuration ---
# Target verticals: local service businesses that benefit most from AI automation
VERTICALS = [
    "dentist",
    "HVAC contractor",
    "plumber",
    "personal injury lawyer",
    "med spa",
    "chiropractor",
    "roofing contractor",
    "auto repair shop",
    "real estate agent",
    "veterinarian",
    "electrician",
    "landscaper",
    "general contractor",
    "pest control",
    "painting contractor",
    "garage door repair",
    "fence contractor",
]

# Target cities — start with mid-size US markets where competition for AI services is lower
CITIES = [
    "Nashville, TN",
    "Austin, TX",
    "Charlotte, NC",
    "Denver, CO",
    "Phoenix, AZ",
    "Tampa, FL",
    "Raleigh, NC",
    "Salt Lake City, UT",
    "Indianapolis, IN",
    "Columbus, OH",
]

MAX_PER_SEARCH = 20  # leads per vertical per city


def run_scrape(search_term: str, city: str, max_results: int = MAX_PER_SEARCH, retries: int = 3) -> dict:
    """Run a single Google Maps scrape via Apify with polling and retries."""
    print(f"  Scraping: '{search_term}' in {city} (max {max_results})...")

    for attempt in range(1, retries + 1):
        try:
            # Start the run without waiting (avoids long HTTP connection timeouts)
            resp = requests.post(
                f"{BASE_URL}/runs",
                params={"token": APIFY_TOKEN},
                json={
                    "searchStringsArray": [search_term],
                    "locationQuery": city,
                    "countryCode": "us",
                    "maxCrawledPlacesPerSearch": max_results,
                    "language": "en",
                    "maxReviews": 0,
                    "maxImages": 0,
                },
                timeout=30,
            )
            resp.raise_for_status()
            run_data = resp.json()["data"]
            run_id = run_data["id"]
            dataset_id = run_data["defaultDatasetId"]

            # Poll for completion
            run_url = f"https://api.apify.com/v2/actor-runs/{run_id}"
            for _ in range(60):  # max 5 minutes
                time.sleep(5)
                status_resp = requests.get(
                    run_url,
                    params={"token": APIFY_TOKEN},
                    timeout=15,
                )
                status_resp.raise_for_status()
                status = status_resp.json()["data"]["status"]
                if status in ("SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"):
                    break

            cost = status_resp.json()["data"].get("usageTotalUsd", 0)
            print(f"    Status: {status} | Cost: ${cost:.4f}")

            if status != "SUCCEEDED":
                print(f"    WARNING: Run did not succeed ({status})")
                return {"status": status, "results": [], "cost": cost}

            # Fetch results
            items_resp = requests.get(
                f"https://api.apify.com/v2/datasets/{dataset_id}/items",
                params={"token": APIFY_TOKEN, "format": "json"},
                timeout=60,
            )
            items_resp.raise_for_status()
            results = items_resp.json()

            print(f"    Got {len(results)} results")
            return {"status": status, "results": results, "cost": cost}

        except (requests.exceptions.ConnectionError, requests.exceptions.Timeout) as e:
            print(f"    Attempt {attempt}/{retries} failed: {e}")
            if attempt < retries:
                time.sleep(5)
            else:
                print(f"    SKIPPING after {retries} attempts")
                return {"status": "CONNECTION_ERROR", "results": [], "cost": 0}


def extract_lead(place: dict, vertical: str, city: str) -> dict:
    """Extract relevant lead fields from a raw Google Maps result."""
    return {
        "name": place.get("title"),
        "vertical": vertical,
        "search_city": city,
        "category": place.get("categoryName"),
        "address": place.get("address"),
        "city": place.get("city"),
        "state": place.get("state"),
        "postal_code": place.get("postalCode"),
        "phone": place.get("phone"),
        "website": place.get("website"),
        "rating": place.get("totalScore"),
        "review_count": place.get("reviewsCount", 0),
        "place_id": place.get("placeId"),
        "google_maps_url": place.get("url"),
        "permanently_closed": place.get("permanentlyClosed", False),
        "claim_this_business": place.get("claimThisBusiness", False),
        "scraped_at": place.get("scrapedAt"),
    }


def run_pipeline(
    verticals: list = None,
    cities: list = None,
    max_per_search: int = MAX_PER_SEARCH,
):
    """Run the full scrape pipeline across verticals and cities."""
    verticals = verticals or VERTICALS
    cities = cities or CITIES

    all_leads = []
    total_cost = 0
    output_dir = Path(__file__).parent / "output"
    output_dir.mkdir(exist_ok=True)

    print(f"\n{'='*60}")
    print(f"LEAD GEN PIPELINE — Google Maps Scrape")
    print(f"Verticals: {len(verticals)} | Cities: {len(cities)}")
    print(f"Max per search: {max_per_search}")
    print(f"Estimated max leads: {len(verticals) * len(cities) * max_per_search}")
    print(f"{'='*60}\n")

    # Incremental save file
    progress_file = output_dir / "leads_in_progress.json"

    for city in cities:
        print(f"\n--- {city} ---")
        for vertical in verticals:
            result = run_scrape(vertical, city, max_per_search)
            total_cost += result["cost"]

            for place in result["results"]:
                # Skip non-US results
                if place.get("countryCode") and place["countryCode"].upper() != "US":
                    continue
                lead = extract_lead(place, vertical, city)
                # Skip closed businesses
                if lead["permanently_closed"]:
                    continue
                all_leads.append(lead)

            # Save progress after each scrape
            with open(progress_file, "w") as f:
                json.dump(all_leads, f, indent=2)

            # Small delay between runs to be respectful
            time.sleep(1)

    # Deduplicate by place_id
    seen = set()
    unique_leads = []
    for lead in all_leads:
        pid = lead.get("place_id")
        if pid and pid not in seen:
            seen.add(pid)
            unique_leads.append(lead)

    # Save results
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = output_dir / f"leads_raw_{timestamp}.json"
    with open(output_file, "w") as f:
        json.dump(unique_leads, f, indent=2)

    print(f"\n{'='*60}")
    print(f"SCRAPE COMPLETE")
    print(f"Total leads: {len(all_leads)} | Unique: {len(unique_leads)}")
    print(f"Total cost: ${total_cost:.4f}")
    print(f"Saved to: {output_file}")
    print(f"{'='*60}\n")

    return unique_leads, output_file


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Scrape Google Maps for leads")
    parser.add_argument("--verticals", nargs="+", help="Override verticals list")
    parser.add_argument("--cities", nargs="+", help="Override cities list")
    parser.add_argument("--max", type=int, default=MAX_PER_SEARCH, help="Max results per search")
    parser.add_argument("--test", action="store_true", help="Test mode: 1 vertical, 1 city, 3 results")
    args = parser.parse_args()

    if args.test:
        run_pipeline(verticals=["dentist"], cities=["Nashville, TN"], max_per_search=3)
    else:
        run_pipeline(
            verticals=args.verticals,
            cities=args.cities,
            max_per_search=args.max,
        )
