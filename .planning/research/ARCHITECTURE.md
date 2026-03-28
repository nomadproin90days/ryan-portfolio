# Architecture Research

**Domain:** Cold email lead generation engine (solo operator, GHL-native)
**Researched:** 2026-03-18
**Confidence:** MEDIUM — GHL workflow patterns are well-documented in official support portal; send limits and DNS specifics verified across multiple sources; cold email funnel patterns are from multiple practitioner sources with consistent agreement.

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                        INFRASTRUCTURE LAYER                          │
│  ┌──────────────────┐  ┌─────────────────┐  ┌────────────────────┐  │
│  │  Sending Domains │  │  DNS Records    │  │  Email Warming     │  │
│  │  (secondary,     │  │  SPF/DKIM/DMARC │  │  Service           │  │
│  │  not luxetide)   │  │  per domain     │  │  (4-6 wks ramp)    │  │
│  └────────┬─────────┘  └────────┬────────┘  └─────────┬──────────┘  │
│           └───────────────────┬─┘                     │             │
│                               ▼                        │             │
│                    GHL LC Email / SMTP                 │             │
│                    (dedicated sending domain)          │             │
└───────────────────────────────┬────────────────────────┘─────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────────────┐
│                      PROSPECT SOURCING LAYER                         │
│  ┌──────────────────┐  ┌─────────────────┐  ┌────────────────────┐  │
│  │  Apollo.io       │  │  Clay           │  │  Manual/CSV        │  │
│  │  (B2B database,  │  │  (enrichment,   │  │  (niche lists,     │  │
│  │  265M contacts)  │  │  personalization│  │  referrals)        │  │
│  └────────┬─────────┘  └────────┬────────┘  └─────────┬──────────┘  │
│           └───────────────────┬─┘                     │             │
│                               ▼                        │             │
│                    Prospect CSV / Import               │             │
│                    (verified, ICP-filtered)            │             │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ import
┌───────────────────────────────▼──────────────────────────────────────┐
│                       GHL SUB-ACCOUNT CRM                            │
│  (pit-173cfaac-2154-411f-8b5f-df63281524d6)                         │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                     CONTACTS DATABASE                          │  │
│  │  name, company, title, email, industry, tags, custom fields    │  │
│  └─────────────────────────┬──────────────────────────────────────┘  │
│                            │                                         │
│  ┌─────────────────────────▼──────────────────────────────────────┐  │
│  │                     OPPORTUNITY PIPELINE                       │  │
│  │  Cold Prospect → Emailed → Replied → Qualified → Call Booked  │  │
│  │               → Won (client) / Lost (not a fit)               │  │
│  └─────────────────────────┬──────────────────────────────────────┘  │
│                            │                                         │
│  ┌─────────────────────────▼──────────────────────────────────────┐  │
│  │                    WORKFLOW ENGINE                              │  │
│  │  Trigger → Conditions → Actions → Delays → Branch             │  │
│  └─────────────────────────┬──────────────────────────────────────┘  │
│                            │                                         │
│  ┌─────────────────────────▼──────────────────────────────────────┐  │
│  │                     CALENDAR / BOOKING                         │  │
│  │  Discovery call calendar + intake form + GCal sync            │  │
│  └─────────────────────────┬──────────────────────────────────────┘  │
└────────────────────────────┼─────────────────────────────────────────┘
                             │ reply / booking
┌────────────────────────────▼─────────────────────────────────────────┐
│                        DESTINATION LAYER                             │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  luxetidestudio.com (existing site — case studies, CTAs)     │    │
│  └──────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Sending Domain | Isolated reputation for cold outreach — not luxetidestudio.com | Register a similar domain (e.g., rchristmas.co, luxetidehq.com); add to GHL LC Email as dedicated sending domain |
| DNS Records | Authorize GHL to send mail; pass inbox provider authentication checks | SPF TXT record pointing to GHL mail servers; DKIM TXT record (GHL auto-generates key); DMARC TXT at `p=none` initially → `p=quarantine` after warmup |
| Email Warming Service | Build sender reputation before real sends — prevents landing in spam | Warmup Inbox ($15/mo), Instantly ($37/mo), or Lemwarm ($29/mo) — run 4-6 weeks before first campaign send |
| Prospect Sourcing | Build ICP-filtered contact lists with verified emails | Apollo.io for B2B database search + filter by industry, company size, title; Clay for AI-enriched personalization variables; verify emails before import |
| GHL Contacts | Central CRM record for every prospect — single source of truth | Imported via CSV or Zapier webhook; tagged by campaign, ICP segment, and current status |
| GHL Opportunity Pipeline | Visual tracking of each prospect's position in the funnel | Custom pipeline: Cold Prospect → Emailed → Replied (Positive) → Qualified → Call Booked → Won/Lost |
| GHL Workflow Engine | Automates the entire sequence — sends, waits, branches on replies | Trigger: contact enters workflow; Actions: send email, wait N days, if/else branch on email event (opened, replied); move pipeline stage |
| GHL Calendar | Books discovery calls with intake form; prevents no-shows via reminders | Simple calendar type; custom intake form questions; GCal sync; automated confirmation + reminder workflow wired to it |
| Reply Classification | Routes positive replies toward booking, negative replies toward suppression | GHL "Customer Replied" trigger + keyword/intent filters; manual review for ambiguous replies; or AI reply agent (Instantly-style) if volume demands it |
| luxetidestudio.com | Destination for interested prospects — validates credibility, handles booking fallback | Existing asset; needs booking CTA that points to GHL calendar URL |

## Recommended Project Structure (GHL Sub-Account)

This is a configuration architecture, not a file structure. Within the GHL sub-account:

```
GHL Sub-Account: LuxeTide Lead Engine
├── Settings/
│   ├── Email Services/
│   │   └── Dedicated Sending Domain (secondary domain, not luxetidestudio.com)
│   ├── Email/
│   │   └── From name, reply-to email (ryan@luxetidestudio.com)
│   └── Calendars/
│       └── Discovery Call (30-min, intake form, GCal sync)
│
├── Contacts/
│   ├── Smart Lists/
│   │   ├── Cold Prospects (all imports)
│   │   ├── Active Campaign (currently in sequence)
│   │   ├── Replied - Positive
│   │   ├── Replied - Negative
│   │   └── Booked
│   └── Custom Fields/
│       ├── ICP Segment (insurance / construction / coaching / etc.)
│       ├── Campaign Name
│       └── Last Reply Intent
│
├── Pipelines/
│   └── Cold Outreach Pipeline/
│       ├── Stage 1: Cold Prospect
│       ├── Stage 2: Emailed
│       ├── Stage 3: Replied (Positive)
│       ├── Stage 4: Qualified
│       ├── Stage 5: Call Booked
│       ├── Stage 6: Won
│       └── Stage 7: Lost
│
├── Workflows/
│   ├── WF-Outreach-ColdSequence         (main send sequence)
│   ├── WF-Reply-PositiveHandling        (positive reply → move stage → send calendar link)
│   ├── WF-Reply-NegativeHandling        (negative/unsubscribe → tag → suppress)
│   ├── WF-Booking-Confirmation          (appointment booked → confirmation + reminder)
│   └── WF-NoShow-Recovery              (no-show → reschedule outreach)
│
├── Email Templates/
│   ├── Cold-Email-1-Initial             (opener, 50-90 words)
│   ├── Cold-Email-2-Followup-3d         (follow-up, 3 days)
│   ├── Cold-Email-3-Followup-5d         (follow-up, 5 days)
│   ├── Cold-Email-4-Breakup-7d          (final breakup email)
│   └── Reply-CalendarLink               (send after positive reply)
│
└── Snapshots/ (optional)
    └── Outreach-Engine-v1               (export for reuse/clients)
```

### Structure Rationale

- **Dedicated sending domain:** Protecting luxetidestudio.com reputation is non-negotiable — cold email volume will degrade the primary domain's inbox placement if sent from it.
- **5-stage pipeline:** Matches the actual decision gates (emailed, replied, qualified, booked) without inventing phantom stages that don't correspond to real actions.
- **4 workflows max:** Keeps automation manageable for a solo operator. Each workflow has a single, named responsibility.
- **Smart lists:** Let Ryan see exactly where every prospect is without running manual searches.

## Architectural Patterns

### Pattern 1: Single-Sequence Cadence with Hard Stop on Reply

**What:** The cold email workflow sends a timed sequence (email 1 → wait 3d → email 2 → wait 5d → email 3 → wait 7d → breakup). Any reply — positive or negative — triggers a "Goal Event" that removes the contact from the sequence immediately.
**When to use:** Always. Continuing to send to someone who has replied is a spam signal and a trust-destroyer.
**Trade-offs:** Requires a separate reply-handling workflow to pick up routing after sequence exit. Slightly more complex setup but correct.

```
WF-Outreach-ColdSequence
  Trigger: Contact tag added "cold-sequence-start"
  Action: Send Email (Cold-Email-1-Initial)
  Action: Wait 3 days
  Goal Event: Contact has replied to any email → EXIT
  Action: Send Email (Cold-Email-2-Followup-3d)
  Action: Wait 5 days
  Goal Event: Contact has replied to any email → EXIT
  Action: Send Email (Cold-Email-3-Followup-5d)
  Action: Wait 7 days
  Goal Event: Contact has replied to any email → EXIT
  Action: Send Email (Cold-Email-4-Breakup-7d)
  Action: Tag contact "sequence-complete"
```

### Pattern 2: Reply-Intent Branching Workflow

**What:** GHL's "Customer Replied" trigger fires when any reply arrives. An if/else condition branches on keyword detection (positive: "interested," "yes," "tell me more," "schedule"; negative: "unsubscribe," "not interested," "remove me"). Positive branch moves pipeline stage and sends calendar link. Negative branch suppresses contact.
**When to use:** Standard pattern for all cold email reply handling in GHL. Manual review bucket for ambiguous replies.
**Trade-offs:** Keyword matching misses nuance (sarcasm, conditional interest). Plan to review the "no match" bucket daily until patterns are clear enough to extend the keyword list.

```
WF-Reply-PositiveHandling
  Trigger: Customer Replied (intent filter: contains "interested" OR "schedule" OR "yes")
  Action: Move Pipeline Stage → "Replied (Positive)"
  Action: Send Email (Reply-CalendarLink)
  Action: Add Tag "positive-reply"
  Action: Create Task "Follow up with {contact.name} — replied positively"

WF-Reply-NegativeHandling
  Trigger: Customer Replied (intent filter: contains "unsubscribe" OR "remove" OR "not interested")
  Action: Move Pipeline Stage → "Lost"
  Action: Add Tag "do-not-contact"
  Action: Remove from all active workflows
  Action: Add to DNC list
```

### Pattern 3: Calendar Booking as Pipeline Gate

**What:** The calendar URL sent after a positive reply links to the GHL discovery call calendar. Booking triggers a workflow that moves the opportunity to "Call Booked," sends a confirmation with ICS file, and fires a reminder sequence (24h, 3h, 15min before call).
**When to use:** Every time a prospect expresses interest. The calendar is the qualification mechanism — someone who schedules is self-qualifying.
**Trade-offs:** Intake form on the calendar adds one more step, which may reduce bookings slightly but dramatically improves call quality by giving Ryan context before the call.

```
WF-Booking-Confirmation
  Trigger: Appointment Status → Confirmed
  Action: Move Pipeline Stage → "Call Booked"
  Action: Send Email (confirmation + ICS)
  Action: Wait until 24h before appointment
  Action: Send SMS reminder
  Action: Wait until 3h before appointment
  Action: Send Email reminder with reschedule link
  Action: Wait until 15min before appointment
  Action: Send SMS "See you soon"
  Action: Wait until 30min after appointment
  If/Else: Appointment Status = "Showed"
    → Move Pipeline Stage → Won or Lost (post-call)
    → Send follow-up email
  Else (No-Show):
    → Trigger WF-NoShow-Recovery
```

## Data Flow

### Prospect Journey: Cold List → Booked Call

```
[Apollo/Clay Export]
        ↓ CSV import (verified emails only)
[GHL Contacts Created]
        ↓ tag: "cold-sequence-start" added manually or via import automation
[WF-Outreach-ColdSequence fires]
        ↓ Email 1 sent from secondary sending domain
[Prospect opens / ignores]
        ↓ if no reply: Wait 3 days
[Email 2 sent]
        ↓ if no reply: Wait 5 days
[Email 3 sent]
        ↓ REPLY DETECTED → Goal Event fires → sequence exits
[WF-Reply-PositiveHandling fires]
        ↓ Pipeline stage → "Replied (Positive)"
        ↓ Email sent: calendar link
[Prospect clicks calendar link]
        ↓ Opens GHL booking page (intake form + time slot selection)
[Appointment booked]
        ↓ WF-Booking-Confirmation fires
        ↓ Pipeline stage → "Call Booked"
        ↓ Confirmation email + reminders sent
[Discovery call happens]
        ↓ Ryan updates pipeline: Won or Lost
[Won → Ryan begins project scoping]
```

### Key Data Flows

1. **Prospect import flow:** Apollo export → email verification (NeverBounce or similar) → CSV import to GHL → tags applied → opportunity created in pipeline Stage 1.
2. **Email send flow:** Workflow action → GHL LC Email → dedicated sending domain → prospect inbox. Reply-to header set to ryan@luxetidestudio.com so replies land in Ryan's actual inbox AND fire GHL's "Customer Replied" trigger via conversation tracking.
3. **Reply routing flow:** GHL conversation captures reply → "Customer Replied" trigger fires → keyword filter branches to positive or negative handling workflow → pipeline stage moves automatically.
4. **Booking flow:** Positive reply workflow sends calendar URL → prospect self-books → GHL calendar receives booking → confirmation workflow fires → GCal syncs → Ryan gets notification.
5. **Suppression flow:** Negative reply or bounce → "do-not-contact" tag → future workflows skip or exclude contacts with this tag → protects sender reputation.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-500 prospects/month | Single sending domain, 25-50 emails/day, manual reply review, one pipeline — this is the MVP state |
| 500-2,000 prospects/month | Add 2nd sending domain (inbox rotation), automate positive reply classification with more keywords, add reporting dashboard in GHL |
| 2,000+ prospects/month | Multiple sending domains (3-5 inboxes per domain), dedicated outreach tool (Instantly) feeding GHL via webhook/Zapier, AI reply agent to handle classification volume |

### Scaling Priorities

1. **First bottleneck:** Sending volume. A single warmed inbox caps at ~50 reliable sends/day before deliverability risk climbs. Add inboxes and domains before increasing volume — domain rotation is the scaling mechanism.
2. **Second bottleneck:** Reply handling. At low volume, manual review of ambiguous replies is fine. Above ~20 replies/week, keyword branching logic needs refinement or an AI classification layer.

## Anti-Patterns

### Anti-Pattern 1: Sending Cold Email from luxetidestudio.com

**What people do:** Use their primary business domain as the sending domain to appear consistent.
**Why it's wrong:** Cold email volume and occasional spam complaints will damage the reputation of the primary domain. If luxetidestudio.com lands in spam, warm inbound leads stop seeing email. The primary domain is a business asset — it must be protected.
**Do this instead:** Register a secondary domain (e.g., rchristmas.co, luxetide.co, outreach.luxetidestudio.com is NOT sufficient — a separate root domain is needed). Route all cold sends through it. Keep luxetidestudio.com for warm/transactional email only.

### Anti-Pattern 2: Skipping Email Warmup

**What people do:** Set up DNS, import a list, and blast 200 emails on day one.
**Why it's wrong:** New domains with no send history look like spam infrastructure. Google/Yahoo/Microsoft will filter or block sends immediately. Recovery from early spam flagging is slow and sometimes impossible for that domain.
**Do this instead:** Wire the sending domain into a warmup service (Warmup Inbox or Instantly) for 4-6 weeks before the first real campaign. Start real sends at 10-20/day and ramp 10-20% per week to a safe ceiling of 50/day per inbox.

### Anti-Pattern 3: One Large Monolithic Workflow

**What people do:** Build one "super workflow" with every branch, condition, and email inside it — sequence, reply handling, booking confirmation, reminders all in one.
**Why it's wrong:** Debugging becomes impossible. A single misconfigured condition silently breaks the entire system. Naming becomes meaningless.
**Do this instead:** One workflow per responsibility (send sequence, positive reply handler, negative reply handler, booking confirmation, no-show recovery). Use tags and pipeline stage changes as handoff signals between workflows.

### Anti-Pattern 4: No Email Verification Before Import

**What people do:** Export from Apollo and import to GHL immediately without verifying emails.
**Why it's wrong:** Apollo data has variable accuracy — bounce rates can exceed 5% on unverified lists. Google/Yahoo require bounces under 2%. A single bad batch can permanently damage sender reputation.
**Do this instead:** Pass every list through an email verification service (NeverBounce, ZeroBounce, or Instantly's built-in verifier) before importing. Only import "valid" and "accept-all" addresses. Remove "invalid" addresses entirely.

### Anti-Pattern 5: Letting Prospects Pile Up Without Pipeline Stage Movement

**What people do:** Set up the send sequence but never configure pipeline stage automation — everything sits in "Cold Prospect" forever.
**Why it's wrong:** The pipeline becomes meaningless. Ryan has no visibility into where active conversations are. Reporting is impossible.
**Do this instead:** Wire stage transitions to workflow outcomes: entering sequence → "Emailed"; goal event exit on reply → "Replied"; booking confirmed → "Call Booked". Every stage move is automated as a workflow action, not a manual update.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Apollo.io | Manual CSV export → import to GHL | Apollo API integration possible but adds complexity; CSV is sufficient for solo operator at this scale |
| Clay | Manual export after enrichment → import to GHL | Clay's webhook output can target GHL API if automation desired later |
| Email Warmup Service (Warmup Inbox / Instantly) | IMAP/SMTP credentials of sending domain | Runs independently, not integrated with GHL workflow — just needs access to the sending mailbox |
| Google Calendar | GHL native two-way sync | Built into GHL calendar settings; real-time sync so Ryan's GCal reflects all bookings |
| luxetidestudio.com | Inbound link from GHL calendar URL | Booking page lives in GHL, site links to it; no code integration needed |
| Email Verifier (NeverBounce / ZeroBounce) | Manual: paste list → download verified output | Verify before each import batch; no real-time integration needed at MVP scale |

### Internal Boundaries (Within GHL)

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Workflow → Pipeline | Workflow action "Move Opportunity to Stage" | Workflows drive stage changes; pipeline stages do not self-update |
| Workflow → Contact | Tag add/remove, custom field update | Tags are the primary signal bus between workflows — keep tag names consistent |
| Sequence Workflow → Reply Handler | Goal Event (reply detected) exits sequence; "Customer Replied" trigger starts reply handler | These must be separate workflows; the sequence exits cleanly, reply handler picks up |
| Reply Handler → Calendar | Email action sends calendar link; booking handled by GHL calendar natively | No code boundary; the calendar URL is a direct link |
| Calendar → Booking Workflow | "Appointment Status Changed" or "New Appointment" trigger | Fires WF-Booking-Confirmation automatically on booking |

## Build Order (Dependency Chain)

Building in the wrong order creates dead-end tests and wasted configuration. The correct order:

```
Phase 1: Infrastructure (blocks everything)
  1. Register secondary sending domain
  2. Configure SPF, DKIM, DMARC DNS records
  3. Add domain to GHL as dedicated sending domain (Settings > Email Services)
  4. Connect domain to email warmup service
  5. Begin warmup (4-6 weeks — can build everything else during this time)

Phase 2: GHL Foundation (blocks outreach)
  6. Configure GHL sub-account settings (from name, reply-to)
  7. Create custom contact fields (ICP segment, campaign, reply intent)
  8. Create Cold Outreach Pipeline with 7 stages
  9. Set up Discovery Call calendar with intake form + GCal sync
  10. Build WF-Booking-Confirmation and WF-NoShow-Recovery

Phase 3: Prospect Engine (blocks first send)
  11. Define ICP (industry, company size, title, geography)
  12. Build first Apollo search + export
  13. Verify emails (NeverBounce or Instantly)
  14. Import to GHL, apply tags and create opportunities in Stage 1

Phase 4: Outreach Automation (final assembly)
  15. Write email templates (4 emails in sequence)
  16. Build WF-Outreach-ColdSequence
  17. Build WF-Reply-PositiveHandling and WF-Reply-NegativeHandling
  18. Test end-to-end with 3-5 internal test contacts
  19. Soft launch: 10 emails/day, monitor deliverability metrics for 1 week
  20. Ramp: increase 10-20%/week toward 50/day ceiling
```

## Sources

- [GHL Cold Outreach Support Article](https://help.gohighlevel.com/support/solutions/articles/48001063753-cold-outreach) — official GHL cold outreach guide
- [GHL Email Sending Guide & Warm-Up](https://help.gohighlevel.com/support/solutions/articles/155000001021-email-sending-guide-email-best-practices-email-warm-up) — official sending limits and warmup guidance
- [GHL Dedicated Sending Domain Setup](https://help.gohighlevel.com/support/solutions/articles/48001226115-dedicated-email-sending-domains-overview-setup) — DNS record configuration in GHL
- [GHL Email Events Trigger](https://help.gohighlevel.com/support/solutions/articles/155000002678-workflow-trigger-email-events) — opens, clicks, replies as workflow triggers
- [GHL Customer Replied Trigger](https://help.gohighlevel.com/support/solutions/articles/155000002677-workflow-trigger-customer-replied) — reply routing in workflows
- [GHL Pipeline Stage Changed Trigger](https://help.gohighlevel.com/support/solutions/articles/155000002493-workflow-trigger-pipeline-stage-changed) — pipeline automation
- [GHL Calendars Setup](https://help.gohighlevel.com/support/solutions/articles/155000005061-getting-started-setup-a-booking-calendar) — calendar and booking flow
- [Instantly: Cold Email Deliverability 90%+](https://instantly.ai/blog/how-to-achieve-90-cold-email-deliverability-in-2025/) — deliverability best practices
- [Mailshake: 2026 Deliverability Checklist](https://mailshake.com/blog/the-ultimate-2026-cold-email-deliverability-checklist/) — SPF/DKIM/DMARC requirements
- [Topo.io: Safe Sending Limits 2025](https://www.topo.io/blog/safe-sending-limits-cold-email) — per-inbox sending limits
- [Automate Cold Email with GHL AI Agents](https://ghl-services-playbooks-automation-crm-marketing.ghost.io/automate-cold-email-outreach-with-gohighlevel-ai-agents-a-complete-guide/) — GHL-specific outreach patterns
- [Instantly: Cold Email Reply Management](https://instantly.ai/blog/cold-email-reply-management-agencies/) — reply classification patterns
- [Apollo.io vs Instantly 2026](https://www.saleshandy.com/blog/apollo-vs-instantly/) — prospecting tool comparison

---
*Architecture research for: Cold email lead generation engine (GHL-native, solo operator)*
*Researched: 2026-03-18*
