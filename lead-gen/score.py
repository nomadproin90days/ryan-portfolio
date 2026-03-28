#!/usr/bin/env python3
"""
Lead Gen Pipeline — Step 2: Score & Rank Leads
Scores leads based on signals that indicate they need AI automation help.
"""

import json
import sys
from pathlib import Path
from datetime import datetime


def score_lead(lead: dict) -> dict:
    """
    Score a lead 0-100 based on likelihood they need AI automation.

    Scoring signals:
    - No website = high opportunity (they need everything)
    - Low reviews = less established, more open to help
    - Medium reviews (50-200) = established but not dominant, sweet spot
    - Has website but no online booking = automation opportunity
    - Unclaimed GBP = massive opportunity
    - High rating but few reviews = good business, bad marketing
    """
    score = 50  # baseline
    reasons = []

    # Website signals
    website = lead.get("website")
    if not website:
        score += 25
        reasons.append("No website — needs full digital presence")
    elif website:
        score += 5
        reasons.append("Has website — check for automation gaps")

    # Review signals (sweet spot: established but not dominant)
    reviews = lead.get("review_count") or 0
    rating = lead.get("rating") or 0

    if reviews == 0:
        score += 15
        reasons.append("Zero reviews — needs reputation management")
    elif reviews < 20:
        score += 10
        reasons.append(f"Low reviews ({reviews}) — needs review automation")
    elif 20 <= reviews <= 100:
        score += 15
        reasons.append(f"Growing business ({reviews} reviews) — prime for automation")
    elif 100 < reviews <= 300:
        score += 10
        reasons.append(f"Established ({reviews} reviews) — has budget for services")
    else:
        score += 5
        reasons.append(f"Dominant ({reviews} reviews) — may already have systems")

    # Rating + review mismatch = good business, bad marketing
    if rating and rating >= 4.5 and reviews < 50:
        score += 10
        reasons.append(f"High rating ({rating}) but few reviews — quality business under-marketed")

    # Unclaimed GBP = massive opportunity
    if lead.get("claim_this_business"):
        score += 20
        reasons.append("GBP unclaimed — huge opportunity")

    # Vertical multipliers (some verticals convert better)
    high_value_verticals = {
        "med spa": 10,
        "personal injury lawyer": 10,
        "dentist": 8,
        "chiropractor": 8,
        "roofing contractor": 5,
        "HVAC contractor": 5,
        "real estate agent": 5,
        "electrician": 5,
        "general contractor": 5,
        "landscaper": 4,
        "pest control": 4,
        "painting contractor": 4,
        "garage door repair": 4,
        "fence contractor": 4,
    }
    vertical = lead.get("vertical", "").lower()
    for v, bonus in high_value_verticals.items():
        if v in vertical:
            score += bonus
            reasons.append(f"High-value vertical ({v}): +{bonus}")
            break

    # Cap at 100
    score = min(score, 100)

    lead["score"] = score
    lead["score_reasons"] = reasons
    return lead


def score_and_rank(input_file: str, min_score: int = 60) -> tuple:
    """Score all leads and return ranked results."""
    with open(input_file) as f:
        leads = json.load(f)

    print(f"\nScoring {len(leads)} leads...")

    scored = [score_lead(lead) for lead in leads]
    scored.sort(key=lambda x: x["score"], reverse=True)

    # Filter by minimum score
    qualified = [l for l in scored if l["score"] >= min_score]

    # Stats
    print(f"\nScore Distribution:")
    brackets = {"90-100": 0, "80-89": 0, "70-79": 0, "60-69": 0, "50-59": 0, "<50": 0}
    for lead in scored:
        s = lead["score"]
        if s >= 90:
            brackets["90-100"] += 1
        elif s >= 80:
            brackets["80-89"] += 1
        elif s >= 70:
            brackets["70-79"] += 1
        elif s >= 60:
            brackets["60-69"] += 1
        elif s >= 50:
            brackets["50-59"] += 1
        else:
            brackets["<50"] += 1

    for bracket, count in brackets.items():
        bar = "#" * count
        print(f"  {bracket}: {count} {bar}")

    qualified_count = len(qualified)
    print(f"\nQualified leads (score >= {min_score}): {qualified_count}")

    # Save scored results
    output_dir = Path(input_file).parent
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    scored_file = output_dir / f"leads_scored_{timestamp}.json"
    qualified_file = output_dir / f"leads_qualified_{timestamp}.json"

    with open(scored_file, "w") as f:
        json.dump(scored, f, indent=2)
    with open(qualified_file, "w") as f:
        json.dump(qualified, f, indent=2)

    # Print top 10
    print(f"\nTop 10 Leads:")
    print("-" * 80)
    for i, lead in enumerate(qualified[:10], 1):
        print(f"{i}. [{lead['score']}] {lead['name']}")
        print(f"   {lead['vertical']} | {lead['address']}")
        print(f"   Phone: {lead.get('phone', 'N/A')} | Website: {lead.get('website', 'NONE')}")
        print(f"   Rating: {lead.get('rating', 'N/A')} ({lead.get('review_count', 0)} reviews)")
        print(f"   Reasons: {', '.join(lead['score_reasons'])}")
        print()

    print(f"Saved: {scored_file}")
    print(f"Saved: {qualified_file}")

    return qualified, qualified_file


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Score and rank scraped leads")
    parser.add_argument("input_file", help="Path to raw leads JSON file")
    parser.add_argument("--min-score", type=int, default=60, help="Minimum score to qualify")
    args = parser.parse_args()

    score_and_rank(args.input_file, args.min_score)
