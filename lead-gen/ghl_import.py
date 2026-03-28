#!/usr/bin/env python3
"""
Lead Gen Pipeline — Step 4: Import leads into GHL
Creates contacts + opportunities in the Cold Prospecting pipeline stage.
"""

import os
import json
import time
import requests
from pathlib import Path
from datetime import datetime

from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / ".env")

GHL_API_KEY = os.getenv("GHL_API_KEY")
GHL_LOCATION_ID = os.getenv("GHL_LOCATION_ID")

BASE_URL = "https://services.leadconnectorhq.com"
HEADERS = {
    "Authorization": f"Bearer {GHL_API_KEY}",
    "Version": "2021-07-28",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

# Pipeline config
PIPELINE_ID = "KJ5OVuV48OMEB9IYcipK"
COLD_PROSPECTING_STAGE_ID = "337352fc-3ba3-4876-b290-cb854a3a4838"


def create_contact(lead: dict) -> dict:
    """Create a contact in GHL from a scored lead."""
    name = lead.get("name", "")
    name_parts = name.split(" ", 1)

    payload = {
        "locationId": GHL_LOCATION_ID,
        "firstName": name_parts[0] if name_parts else "",
        "lastName": name_parts[1] if len(name_parts) > 1 else "",
        "phone": lead.get("phone", ""),
        "companyName": name,
        "address1": lead.get("address", ""),
        "city": lead.get("city", ""),
        "state": lead.get("state", ""),
        "postalCode": lead.get("postal_code", ""),
        "website": lead.get("website", ""),
        "source": "Apify Lead Gen",
        "tags": [
            "lead-gen",
            "apify-scrape",
            lead.get("vertical", ""),
            f"score-{lead.get('score', 0)}",
        ],
        "customFields": [
            {"key": "contact.business_name", "value": name},
            {"key": "contact.company_website_put_na_if_none", "value": lead.get("website", "na")},
        ],
    }

    resp = requests.post(
        f"{BASE_URL}/contacts/",
        headers=HEADERS,
        json=payload,
        timeout=15,
    )

    if resp.status_code in (200, 201):
        return resp.json().get("contact", {})
    elif resp.status_code in (400, 422) and "duplicate" in resp.text.lower():
        print(f"    Duplicate: {name}")
        return {"id": None, "duplicate": True}
    else:
        print(f"    Error creating contact: {resp.status_code} — {resp.text[:200]}")
        return {"id": None, "error": resp.text}


def create_opportunity(contact_id: str, lead: dict) -> dict:
    """Create an opportunity in Cold Prospecting stage."""
    payload = {
        "locationId": GHL_LOCATION_ID,
        "pipelineId": PIPELINE_ID,
        "pipelineStageId": COLD_PROSPECTING_STAGE_ID,
        "contactId": contact_id,
        "name": lead.get("name", "Unknown"),
        "status": "open",
        "source": "Apify Lead Gen",
    }

    resp = requests.post(
        f"{BASE_URL}/opportunities/",
        headers=HEADERS,
        json=payload,
        timeout=15,
    )

    if resp.status_code in (200, 201):
        return resp.json().get("opportunity", {})
    else:
        print(f"    Error creating opportunity: {resp.status_code} — {resp.text[:200]}")
        return {"id": None, "error": resp.text}


def import_leads(input_file: str, max_import: int = None, dry_run: bool = False):
    """Import scored leads into GHL."""
    with open(input_file) as f:
        leads = json.load(f)

    if max_import:
        leads = leads[:max_import]

    print(f"\n{'='*60}")
    print(f"GHL IMPORT — {'DRY RUN' if dry_run else 'LIVE'}")
    print(f"Leads to import: {len(leads)}")
    print(f"Pipeline: Cold Prospecting")
    print(f"{'='*60}\n")

    if dry_run:
        print("DRY RUN — no contacts will be created.\n")
        for i, lead in enumerate(leads[:10], 1):
            print(f"  {i}. [{lead['score']}] {lead['name']} | {lead.get('phone')} | {lead.get('vertical')}")
        if len(leads) > 10:
            print(f"  ... and {len(leads) - 10} more")
        return

    created = 0
    duplicates = 0
    errors = 0
    opportunities_created = 0

    for i, lead in enumerate(leads, 1):
        print(f"  [{i}/{len(leads)}] {lead['name']}...", end=" ")

        # Create contact
        contact = create_contact(lead)

        if contact.get("duplicate"):
            duplicates += 1
            print("(skipped — duplicate)")
            continue

        contact_id = contact.get("id")
        if not contact_id:
            errors += 1
            continue

        created += 1
        print(f"OK (id: {contact_id})", end=" ")

        # Create opportunity
        opp = create_opportunity(contact_id, lead)
        if opp.get("id"):
            opportunities_created += 1
            print(f"+ Opp created")
        else:
            print("(no opp)")

        # Rate limit: GHL allows ~100 requests/min
        if i % 20 == 0:
            print("  [pausing 15s for rate limit]")
            time.sleep(15)
        else:
            time.sleep(0.5)

    print(f"\n{'='*60}")
    print(f"IMPORT COMPLETE")
    print(f"  Contacts created: {created}")
    print(f"  Duplicates skipped: {duplicates}")
    print(f"  Errors: {errors}")
    print(f"  Opportunities created: {opportunities_created}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Import leads into GHL")
    parser.add_argument("input_file", help="Path to scored/qualified leads JSON")
    parser.add_argument("--max", type=int, help="Max leads to import")
    parser.add_argument("--dry-run", action="store_true", help="Preview without importing")
    args = parser.parse_args()

    import_leads(args.input_file, args.max, args.dry_run)
