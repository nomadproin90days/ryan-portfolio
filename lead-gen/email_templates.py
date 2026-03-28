#!/usr/bin/env python3
"""
Lead Gen Pipeline — Step 5: Cold Email Sequence Templates
5-touch outreach sequence for GHL campaigns targeting local service businesses.
"""

BOOKING_LINK = "https://link.luxetidestudio.com/widget/booking/ewffe"
SENDER_NAME = "Ryan"
SENDER_COMPANY = "Luxetide Studio"

# ---------------------------------------------------------------------------
# Vertical-specific snippets
# ---------------------------------------------------------------------------

VERTICAL_HOOKS = {
    "dentist": {
        "pain_point": "most dental offices lose 15-20 new patients a month because nobody follows up on missed calls",
        "automation_example": "automated recall reminders, missed-call text-backs, and review requests after cleanings",
        "social_proof": "a dental practice i worked with added 47 new google reviews in 60 days just by automating the ask",
        "quick_insight": "patients who get a text within 5 minutes of a missed call are 3x more likely to book than those who get a voicemail callback the next day",
    },
    "hvac": {
        "pain_point": "most HVAC companies leave money on the table by not following up on quote requests fast enough",
        "automation_example": "instant quote follow-ups, seasonal maintenance reminders, and after-service review requests",
        "social_proof": "an HVAC company i helped cut their lead response time from 4 hours to under 2 minutes with a simple automation",
        "quick_insight": "the first HVAC company to respond to a quote request wins the job 78% of the time — speed is everything in your space",
    },
    "plumber": {
        "pain_point": "plumbing companies miss half their inbound calls during jobs and never follow up",
        "automation_example": "missed-call text-backs, automated estimate follow-ups, and post-job review requests",
        "social_proof": "a plumber i set up with missed-call text-back recovered 12 jobs in the first month that would have gone to a competitor",
        "quick_insight": "homeowners call an average of 3 plumbers — the one who texts back first almost always gets the job",
    },
    "med spa": {
        "pain_point": "med spas lose thousands in rebooking revenue because follow-up is manual and inconsistent",
        "automation_example": "treatment rebooking sequences, birthday offers, and automated before/after photo requests",
        "social_proof": "a med spa i worked with increased rebooking rates by 35% just by automating a 3-text follow-up after each visit",
        "quick_insight": "clients who get a personalized rebooking reminder 2 weeks post-treatment are 4x more likely to schedule their next session",
    },
    "chiropractor": {
        "pain_point": "chiro offices spend hours on the phone confirming appointments that could be automated",
        "automation_example": "automated appointment confirmations, recall sequences for lapsed patients, and review generation",
        "social_proof": "a chiropractic office i helped freed up 12 hours a week of front desk time by automating confirmations and recalls",
        "quick_insight": "lapsed patients are 6x cheaper to reactivate than acquiring new ones — most chiro offices just never follow up",
    },
    "roofing contractor": {
        "pain_point": "roofers spend so much time on jobs they forget to follow up on the estimates they sent last week",
        "automation_example": "automated estimate follow-ups, post-job review requests, and storm damage outreach sequences",
        "social_proof": "a roofing company i worked with closed 8 extra jobs in one month just from automated estimate follow-up texts",
        "quick_insight": "homeowners get 3-5 roofing estimates on average — the company that follows up twice closes the deal most often",
    },
    "electrician": {
        "pain_point": "electricians lose repeat business because customers forget who they called last time",
        "automation_example": "post-job follow-ups, annual safety check reminders, and automated review requests",
        "social_proof": "an electrician i helped went from 12 to 67 google reviews in 90 days with one simple post-job automation",
        "quick_insight": "most homeowners can not name the electrician they used last year — a single follow-up text 6 months later changes that",
    },
    "landscaper": {
        "pain_point": "landscaping companies lose seasonal revenue because they do not re-engage last year's customers",
        "automation_example": "seasonal reactivation campaigns, automated quote follow-ups, and review requests",
        "social_proof": "a landscaper i set up with seasonal reactivation texts brought back 23 clients who had gone to a competitor",
        "quick_insight": "sending a 'spring prep' text to last year's customers in february fills your march calendar before the season even starts",
    },
    "general contractor": {
        "pain_point": "GCs juggle so many projects that new lead follow-up falls through the cracks",
        "automation_example": "automated lead follow-up, project milestone updates to clients, and post-project review requests",
        "social_proof": "a GC i worked with recovered over 30k in lost estimates by automating a 3-touch follow-up sequence",
        "quick_insight": "homeowners planning renovations contact an average of 4 contractors — 60% go with whoever responds first",
    },
    "pest control": {
        "pain_point": "pest control companies live and die by recurring revenue but most do not automate re-service reminders",
        "automation_example": "quarterly re-service reminders, seasonal pest alerts, and post-treatment review requests",
        "social_proof": "a pest control company i helped increased recurring service sign-ups by 28% with automated re-service reminders",
        "quick_insight": "customers who get a reminder text 2 weeks before their next service is due cancel 40% less often",
    },
    "painting contractor": {
        "pain_point": "painters send estimates and then wait — the ones who follow up consistently close twice as many jobs",
        "automation_example": "automated estimate follow-ups, project completion photo requests, and review generation",
        "social_proof": "a painting contractor i helped closed 6 extra jobs in 30 days just from automated estimate follow-up texts",
        "quick_insight": "homeowners sit on painting estimates for an average of 11 days — a well-timed follow-up on day 3 cuts that in half",
    },
    "garage door repair": {
        "pain_point": "garage door companies get emergency calls all day but never market to past customers for upgrades",
        "automation_example": "post-repair follow-ups, annual maintenance reminders, and automated review requests",
        "social_proof": "a garage door company i worked with added 40 google reviews in 60 days and started ranking for their whole service area",
        "quick_insight": "most garage door customers only call when something breaks — a yearly maintenance reminder creates predictable revenue",
    },
    "fence contractor": {
        "pain_point": "fence companies are seasonal and most do not have a system to stay booked through slow months",
        "automation_example": "off-season promotions, automated estimate follow-ups, and neighbor referral campaigns",
        "social_proof": "a fence contractor i helped filled their january calendar with off-season promo automations sent in november",
        "quick_insight": "when you finish a fence job, the neighbors notice — an automated referral offer to nearby addresses converts at 12%",
    },
}

# Fallback for verticals not explicitly listed
DEFAULT_VERTICAL = {
    "pain_point": "most local service businesses lose leads because they are too busy doing the actual work to follow up",
    "automation_example": "missed-call text-backs, automated follow-ups, and post-job review requests",
    "social_proof": "a local service business i worked with doubled their google reviews in 60 days with one simple automation",
    "quick_insight": "the business that responds first wins the job 78% of the time — most respond in hours, not minutes",
}


# ---------------------------------------------------------------------------
# Observation builders (from score_reasons / lead data)
# ---------------------------------------------------------------------------

def _build_observation(lead: dict) -> str:
    """Build a specific, data-backed observation about the lead's business."""
    reasons = lead.get("score_reasons", [])
    name = lead.get("name", "your business")
    review_count = lead.get("review_count", 0)
    rating = lead.get("rating", 0)
    website = lead.get("website")

    observations = []

    for reason in reasons:
        r = reason.lower()
        if "no website" in r:
            observations.append(
                f"i noticed {name} does not have a website right now"
            )
        elif "gbp unclaimed" in r:
            observations.append(
                f"i saw that {name}'s google business profile looks unclaimed"
            )
        elif "zero reviews" in r or "no reviews" in r:
            observations.append(
                f"i noticed {name} does not have any google reviews yet"
            )
        elif "low reviews" in r:
            observations.append(
                f"i saw {name} has {review_count} google reviews"
            )
        elif "high rating" in r and "few reviews" in r:
            observations.append(
                f"i noticed {name} has a solid {rating}-star rating but only {review_count} reviews"
            )

    if not observations:
        if review_count and review_count < 50:
            observations.append(
                f"i was looking at {name}'s google profile and noticed you have {review_count} reviews"
            )
        elif not website:
            observations.append(
                f"i came across {name} and noticed you do not have a website yet"
            )
        else:
            observations.append(
                f"i was looking at {name}'s online presence and spotted a few gaps"
            )

    return observations[0]


def _get_vertical_snippets(lead: dict) -> dict:
    """Get the right vertical-specific copy for this lead."""
    vertical = lead.get("vertical", "").lower()
    for key, snippets in VERTICAL_HOOKS.items():
        if key in vertical:
            return snippets
    return DEFAULT_VERTICAL


# ---------------------------------------------------------------------------
# Email sequence templates
# ---------------------------------------------------------------------------

SEQUENCE = [
    {
        "step": 1,
        "delay_days": 0,
        "subject": "quick question about {{contact.company_name}}",
        "body": (
            "hey {{contact.first_name}},\n"
            "\n"
            "{observation} — and it got me thinking.\n"
            "\n"
            "{pain_point}.\n"
            "\n"
            "i help businesses like yours set up {automation_example} — "
            "all running on autopilot so you can focus on the work.\n"
            "\n"
            "would a free 20-min audit of what you could automate be useful? "
            "no pitch, just a walkthrough of what is costing you leads right now.\n"
            "\n"
            "{booking_link}\n"
            "\n"
            "— {sender_name}"
        ),
    },
    {
        "step": 2,
        "delay_days": 2,
        "subject": "re: quick question about {{contact.company_name}}",
        "body": (
            "hey {{contact.first_name}},\n"
            "\n"
            "quick thought for you:\n"
            "\n"
            "{quick_insight}.\n"
            "\n"
            "this is the kind of stuff i would walk through in a free audit — "
            "specific to {{contact.company_name}}, not generic advice.\n"
            "\n"
            "20 minutes, no strings.\n"
            "\n"
            "{booking_link}\n"
            "\n"
            "— {sender_name}"
        ),
    },
    {
        "step": 3,
        "delay_days": 5,
        "subject": "how a {vertical_label} added reviews on autopilot",
        "body": (
            "hey {{contact.first_name}},\n"
            "\n"
            "{social_proof}.\n"
            "\n"
            "no extra staff, no extra hours — just a system that runs "
            "in the background while they do what they do best.\n"
            "\n"
            "i could show you exactly how that would work for "
            "{{contact.company_name}} in about 20 minutes.\n"
            "\n"
            "{booking_link}\n"
            "\n"
            "— {sender_name}"
        ),
    },
    {
        "step": 4,
        "delay_days": 9,
        "subject": "is this even on your radar?",
        "body": (
            "hey {{contact.first_name}},\n"
            "\n"
            "i have sent a couple notes about automating some of the "
            "lead follow-up and review stuff at {{contact.company_name}}.\n"
            "\n"
            "totally get it if the timing is off — just want to make sure "
            "this is not something that is costing you jobs without you realizing it.\n"
            "\n"
            "if it is on your radar at all, here is the link:\n"
            "\n"
            "{booking_link}\n"
            "\n"
            "if not, no worries — i will stop reaching out.\n"
            "\n"
            "— {sender_name}"
        ),
    },
    {
        "step": 5,
        "delay_days": 14,
        "subject": "closing the loop",
        "body": (
            "hey {{contact.first_name}},\n"
            "\n"
            "last note from me. i know you are busy running "
            "{{contact.company_name}} and the last thing you need is "
            "another email.\n"
            "\n"
            "if you ever want a second set of eyes on your online "
            "presence and what you could automate, the offer stands:\n"
            "\n"
            "{booking_link}\n"
            "\n"
            "either way, good luck out there.\n"
            "\n"
            "— {sender_name}"
        ),
    },
]


# ---------------------------------------------------------------------------
# Email generator
# ---------------------------------------------------------------------------

def generate_email(lead: dict, step: int) -> dict:
    """
    Generate a personalized email for a given lead and sequence step.

    Args:
        lead: Lead dict with keys like name, vertical, score_reasons,
              review_count, rating, website, etc.
        step: Sequence step (1-5).

    Returns:
        Dict with keys: step, delay_days, subject, body (with all
        placeholders resolved except GHL merge fields which stay as-is
        for GHL to resolve at send time).
    """
    if step < 1 or step > len(SEQUENCE):
        raise ValueError(f"step must be 1-{len(SEQUENCE)}, got {step}")

    template = SEQUENCE[step - 1]
    snippets = _get_vertical_snippets(lead)
    observation = _build_observation(lead)

    vertical = lead.get("vertical", "local business")
    vertical_label = vertical.lower().rstrip("s")

    replacements = {
        "{observation}": observation,
        "{pain_point}": snippets["pain_point"],
        "{automation_example}": snippets["automation_example"],
        "{social_proof}": snippets["social_proof"],
        "{quick_insight}": snippets["quick_insight"],
        "{vertical_label}": vertical_label,
        "{booking_link}": BOOKING_LINK,
        "{sender_name}": SENDER_NAME,
    }

    subject = template["subject"]
    body = template["body"]

    for placeholder, value in replacements.items():
        subject = subject.replace(placeholder, value)
        body = body.replace(placeholder, value)

    return {
        "step": template["step"],
        "delay_days": template["delay_days"],
        "subject": subject,
        "body": body,
    }


def generate_full_sequence(lead: dict) -> list[dict]:
    """Generate all 5 emails in the sequence for a lead."""
    return [generate_email(lead, step) for step in range(1, len(SEQUENCE) + 1)]


# ---------------------------------------------------------------------------
# Preview / CLI
# ---------------------------------------------------------------------------

def preview_sequence(lead: dict):
    """Print a formatted preview of the full sequence for a lead."""
    print(f"\n{'='*70}")
    print(f"SEQUENCE PREVIEW: {lead.get('name', 'Unknown')}")
    print(f"Vertical: {lead.get('vertical', 'N/A')}")
    print(f"Score: {lead.get('score', 'N/A')}")
    print(f"Reasons: {', '.join(lead.get('score_reasons', []))}")
    print(f"{'='*70}")

    emails = generate_full_sequence(lead)
    for email in emails:
        print(f"\n--- Email {email['step']} (Day {email['delay_days']}) ---")
        print(f"Subject: {email['subject']}")
        print(f"\n{email['body']}")
        word_count = len(email["body"].split())
        print(f"\n[{word_count} words]")


if __name__ == "__main__":
    import json
    import argparse

    parser = argparse.ArgumentParser(
        description="Preview cold email sequence for a lead"
    )
    parser.add_argument(
        "input_file",
        help="Path to scored leads JSON file",
    )
    parser.add_argument(
        "--index",
        type=int,
        default=0,
        help="Index of lead to preview (default: 0 = top lead)",
    )
    parser.add_argument(
        "--step",
        type=int,
        help="Preview a single step (1-5) instead of full sequence",
    )
    args = parser.parse_args()

    with open(args.input_file) as f:
        leads = json.load(f)

    if args.index >= len(leads):
        print(f"Index {args.index} out of range (file has {len(leads)} leads)")
        raise SystemExit(1)

    lead = leads[args.index]

    if args.step:
        email = generate_email(lead, args.step)
        print(f"Subject: {email['subject']}")
        print(f"\n{email['body']}")
    else:
        preview_sequence(lead)
