#!/usr/bin/env python3
"""
Lead Gen Pipeline — Full Orchestrator
Scrape → Score → Enrich → Export for GHL outreach

Usage:
    python pipeline.py --test          # Quick test: 1 vertical, 1 city, 3 results
    python pipeline.py                 # Full run: all verticals, all cities
    python pipeline.py --cities "Nashville, TN" "Austin, TX" --verticals dentist plumber
"""

from scrape import run_pipeline as scrape
from score import score_and_rank
from enrich import enrich_leads
import json
import csv
from pathlib import Path
from datetime import datetime


def export_for_ghl(leads: list, output_dir: Path) -> str:
    """Export qualified leads as CSV ready for GHL import."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    csv_file = output_dir / f"ghl_import_{timestamp}.csv"

    fieldnames = [
        "firstName",  # business name as placeholder
        "lastName",
        "phone",
        "email",
        "companyName",
        "address1",
        "city",
        "state",
        "postalCode",
        "website",
        "tags",
        "source",
        "customField.lead_score",
        "customField.vertical",
        "customField.review_count",
        "customField.rating",
        "customField.automation_gaps",
        "customField.google_maps_url",
    ]

    with open(csv_file, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()

        for lead in leads:
            name_parts = (lead.get("name") or "").split(" ", 1)
            gaps = lead.get("enrichment", {}).get("automation_gaps", [])

            writer.writerow({
                "firstName": lead.get("contact_name", "").split(" ", 1)[0] or (name_parts[0] if name_parts else ""),
                "lastName": lead.get("contact_name", "").split(" ", 1)[-1] if " " in lead.get("contact_name", "") else (name_parts[1] if len(name_parts) > 1 else ""),
                "phone": lead.get("phone", ""),
                "email": lead.get("contact_email", ""),
                "companyName": lead.get("name", ""),
                "address1": lead.get("address", ""),
                "city": lead.get("city", ""),
                "state": lead.get("state", ""),
                "postalCode": lead.get("postal_code", ""),
                "website": lead.get("website", ""),
                "tags": f"lead-gen,{lead.get('vertical', '')},apify-scrape",
                "source": "apify-lead-gen",
                "customField.lead_score": lead.get("score", 0),
                "customField.vertical": lead.get("vertical", ""),
                "customField.review_count": lead.get("review_count", 0),
                "customField.rating": lead.get("rating", ""),
                "customField.automation_gaps": "; ".join(gaps),
                "customField.google_maps_url": lead.get("google_maps_url", ""),
            })

    print(f"\nGHL import CSV: {csv_file}")
    print(f"  {len(leads)} leads ready for import")
    return str(csv_file)


def run_full_pipeline(
    verticals=None,
    cities=None,
    max_per_search=20,
    min_score=60,
    max_enrich=50,
):
    """Run the complete lead gen pipeline."""
    print("\n" + "=" * 60)
    print("FULL LEAD GEN PIPELINE")
    print("Scrape → Score → Enrich → Export")
    print("=" * 60)

    # Step 1: Scrape
    raw_leads, raw_file = scrape(verticals, cities, max_per_search)

    # Step 2: Score
    qualified, qualified_file = score_and_rank(str(raw_file), min_score)

    # Step 3: Enrich top leads
    enriched, enriched_file = enrich_leads(str(qualified_file), max_enrich)

    # Step 4: Export for GHL
    output_dir = Path(enriched_file).parent
    csv_file = export_for_ghl(enriched, output_dir)

    print("\n" + "=" * 60)
    print("PIPELINE COMPLETE")
    print(f"  Raw leads scraped: {len(raw_leads)}")
    print(f"  Qualified (score >= {min_score}): {len(qualified)}")
    print(f"  Enriched: {len(enriched)}")
    print(f"  GHL CSV: {csv_file}")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Full lead gen pipeline")
    parser.add_argument("--verticals", nargs="+", help="Override verticals")
    parser.add_argument("--cities", nargs="+", help="Override cities")
    parser.add_argument("--max", type=int, default=20, help="Max results per search")
    parser.add_argument("--min-score", type=int, default=60, help="Min qualification score")
    parser.add_argument("--max-enrich", type=int, default=50, help="Max leads to enrich")
    parser.add_argument("--test", action="store_true", help="Test mode")
    args = parser.parse_args()

    if args.test:
        run_full_pipeline(
            verticals=["dentist"],
            cities=["Nashville, TN"],
            max_per_search=3,
            min_score=50,
            max_enrich=3,
        )
    else:
        run_full_pipeline(
            verticals=args.verticals,
            cities=args.cities,
            max_per_search=args.max,
            min_score=args.min_score,
            max_enrich=args.max_enrich,
        )
