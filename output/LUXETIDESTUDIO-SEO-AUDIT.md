# Full SEO Audit: luxetidestudio.com
**Date:** 2026-03-26 | **Business Type:** Technical Automation Studio (Remote Services)

---

## SEO Health Score: 32 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 42 | 9.2 |
| Content Quality | 23% | 34 | 7.8 |
| On-Page SEO | 20% | 35 | 7.0 |
| Schema / Structured Data | 10% | 0 | 0.0 |
| Performance (CWV) | 10% | 45 | 4.5 |
| AI Search Readiness (GEO) | 10% | 28 | 2.8 |
| Images | 5% | 25 | 1.3 |
| **TOTAL** | | | **32.6** |

---

## Executive Summary

### Top 5 Critical Issues
1. **Zero structured data** — no JSON-LD, no schema markup of any kind
2. **No robots.txt or sitemap.xml** — search engines get zero crawl guidance
3. **No canonical tags or OG meta tags** — indexability and social sharing broken
4. **E-E-A-T score of 26/100** — no testimonials, no case studies, no social proof
5. **AI citation readiness at 18/100** — invisible to ChatGPT, Perplexity, Google AIO

### Top 5 Quick Wins (under 1 hour total)
1. Create robots.txt + sitemap.xml (15 min)
2. Add canonical tags + OG meta tags to all pages (20 min)
3. Add `defer` to Three.js script + `loading="lazy"` to below-fold images (5 min)
4. Add `width`/`height` to all `<img>` tags (10 min)
5. Preload hero image with `fetchpriority="high"` (2 min)

---

## Site Overview

| Property | Value |
|----------|-------|
| Pages | 3 (index.html, contractors.html, healthcare.html) |
| Hosting | Vercel Edge (SFO), HTTP/2, Brotli |
| TTFB | 269ms |
| HTML Size | 36KB (inline CSS + inline JS) |
| Total Image Payload | 2.2MB (8 JPEGs, no WebP/AVIF) |
| Three.js Bundle | 608KB (decorative wireframe sphere) |
| Fonts | 2 families, 7 weights via fonts.bunny.net |
| robots.txt | MISSING (404) |
| sitemap.xml | MISSING (404) |
| Schema Markup | NONE |
| OG Tags | NONE |
| Canonical Tags | NONE |

---

## 1. Technical SEO (42/100)

### Critical
- **No robots.txt** (404) — crawlers get no directives, no sitemap pointer
- **No sitemap.xml** (404) — 3 pages discoverable only via link-following
- **No canonical tags** on any page
- **Zero structured data** — not eligible for any rich results
- **No Search Console verification** detected

### High
- **No OG/Twitter Card meta tags** — social sharing produces blank previews
- **Missing security headers** — no X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy
- **Booking link missing `rel="noopener noreferrer"`**
- **.html extensions** on case study URLs (should use clean URLs)

### Positive
- HTTPS with HSTS (2-year max-age)
- Brotli compression active
- Static HTML (no JS framework rendering issues)
- Meta description present and well-written (117 chars)
- Single H1 per page

---

## 2. Content Quality (34/100)

### E-E-A-T Breakdown

| Factor | Score | Key Issue |
|--------|-------|-----------|
| Experience | 22/100 | 4 of 6 project cards say "Case study soon" — zero completed work shown |
| Expertise | 30/100 | Correct terminology but only 1-2 sentences per capability |
| Authoritativeness | 15/100 | Zero testimonials, zero client logos, zero external validation |
| Trustworthiness | 35/100 | Real name/photo/contact is good; unverifiable metric claims are bad |

### Word Count: ~577 words
- Capabilities section: 125 words total (5 items x 25 words)
- Process section: 60 words total
- About section: ~80 words
- **A competing studio with case studies + blog would out-depth this 10-20x**

### Content Gaps
| Expected Content | Present? |
|-----------------|----------|
| Detailed service descriptions | No (1-2 sentences each) |
| Case studies with outcomes | No (2 stubs, 4 "coming soon") |
| Client testimonials | No |
| Client logos or named clients | No |
| Pricing or engagement model | No |
| Blog / technical writing | No |
| FAQ section | No |
| Privacy policy / terms | No |
| Certifications / badges | No |

### Positive
- Writing quality per-word is above average — distinctive voice, no AI filler
- Readability grade level 8-9 (appropriate for B2B)
- Contact transparency is genuine (real name, phone, photo, location)

---

## 3. Schema / Structured Data (0/100)

**Zero markup detected.** No JSON-LD, no Microdata, no RDFa on any page.

### Recommended JSON-LD (@graph structure)
Ready-to-paste schema has been generated covering:
- **WebSite** — site-level schema with publisher reference
- **WebPage** — page-level schema
- **ProfessionalService** — business entity with OfferCatalog of 5 services
- **Person** — Ryan Christmas with jobTitle, knowsAbout, sameAs
- **ContactPoint** — email, phone, WhatsApp
- **SiteNavigationElement** — main nav structure

Full JSON-LD is saved in the schema audit output file.

---

## 4. Performance / Core Web Vitals (45/100)

**Estimated Lighthouse: 45-60 (mobile) / 65-80 (desktop)**

### LCP: ~3.5-5.0s on mobile (POOR)
- Hero image not preloaded, no `fetchpriority`
- No `srcset`/`sizes` — mobile downloads full-size JPEG
- Render-blocking font stylesheet
- All 8 images load eagerly (2.2MB initial payload)

### CLS: ~0.15-0.35 (POOR)
- No `width`/`height` on any image
- Font loading causes FOUT with no size-adjust

### INP: ~100-250ms (BORDERLINE)
- Three.js animation loop runs continuously even when off-screen
- 608KB Three.js loads for a barely-visible wireframe at 30% opacity

### Image Optimization (potential 82% savings)

| Image | Current | Est. WebP (mobile) | Savings |
|-------|---------|-------------------|---------|
| ryan-coast.jpg (hero) | 275KB | ~50KB | 82% |
| ocean-dark.jpg | 552KB | ~90KB | 84% |
| sunset-gold.jpg | 374KB | ~65KB | 83% |
| ocean-aerial.jpg | 312KB | ~55KB | 82% |
| ryan-portrait.jpg | 308KB | ~55KB | 82% |
| **Total** | **2,244KB** | **~405KB** | **82%** |

### 20-Minute Fix List (items 1-4 move LCP from ~4s to ~2.5s)
1. Add `defer` to Three.js script tag (1 min)
2. Add `loading="lazy"` to 7 below-fold images (5 min)
3. Add `width`/`height` to all images (10 min)
4. Preload hero image with `fetchpriority="high"` (2 min)

---

## 5. AI Search Readiness / GEO (28/100)

### AI Crawler Access

| Crawler | Status |
|---------|--------|
| GPTBot (ChatGPT) | ALLOWED (no robots.txt = default allow) |
| ClaudeBot | ALLOWED |
| PerplexityBot | ALLOWED |
| Googlebot (AIO) | ALLOWED |
| CCBot (training) | ALLOWED (should be blocked) |

### Key Failures
- **No llms.txt** — the single fastest GEO win, missing entirely
- **No schema markup** — AI systems can't identify the entity
- **No question-based headings** — all H2s are branding phrases, not query-matching
- **Passages too short** — optimal is 134-167 words; site averages 20-40 word fragments
- **No direct answer patterns** — never states "Luxetide Studio is a..."
- **Statistics lack attribution** — "184 businesses" has no timeframe, client, or context

### Platform Visibility Estimates

| Platform | Score | Why |
|----------|-------|-----|
| Google AI Overviews | 15/100 | No schema, no authority, new domain |
| ChatGPT Search | 10/100 | Zero entity recognition |
| Perplexity | 20/100 | Static HTML helps, specific claims exist |
| Bing Copilot | 12/100 | No backlinks, no authority |

### Highest-Impact GEO Actions
1. Create `/llms.txt` (30 min) — structured summary for AI crawlers
2. Add JSON-LD schema (1 hr) — entity recognition
3. Rewrite H2s as question-answer headings (2 hrs) — query matching
4. Expand capabilities to 150-200 words each (2 hrs) — citable passages
5. Build YouTube + Reddit presence (ongoing) — 0.737 correlation with AI citations

---

## 6. ATP Keyword Data (AnswerThePublic)

### "ai automation agency" — 1,900 monthly searches, $18.30 CPC

**People Also Ask:**
- What do AI automation agencies do?
- Can you make money with AI automation Agency?
- How much does an AI automation agency cost?
- How does AI automation Agency work?
- How much do AI automation agencies charge?

**High-Intent Keywords:**
| Keyword | Volume | CPC |
|---------|--------|-----|
| ai automation agency near me | 50 | $5.19 |
| ai automation agency business model | 50 | $10.17 |
| ai automation agency hub | 70 | $5.91 |
| ai automation agency websites | 30 | $10.35 |
| ai automation agency pricing | 20 | $6.65 |
| ai automation agency real estate | 10 | $11.51 |
| ai automation agency in usa | 10 | $11.75 |

### "gohighlevel automation" — 170 monthly searches, $38.22 CPC

**People Also Ask:**
- What is GoHighLevel automation?
- Can GoHighLevel replace Zapier?
- Is GoHighLevel an automation tool?
- Is HubSpot or GoHighLevel better?
- How much does GoHighLevel cost a month?

**High-Intent Keywords:**
| Keyword | Volume | CPC |
|---------|--------|-----|
| gohighlevel email automation | 20 | $29.14 |
| gohighlevel linkedin automation | 10 | $26.92 |
| gohighlevel review automation | 10 | $18.51 |
| gohighlevel automation templates | 10 | $11.12 |

---

## Prioritized Action Plan

### CRITICAL — Fix This Week

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Create robots.txt + sitemap.xml | 15 min | Crawlability |
| 2 | Add canonical + OG + Twitter meta tags | 20 min | Indexability + social |
| 3 | Paste JSON-LD schema (@graph block) | 30 min | Entity recognition + rich results |
| 4 | Add `defer` to Three.js, `loading="lazy"` to images | 5 min | LCP -1.5s |
| 5 | Add `width`/`height` to all images, preload hero | 12 min | CLS fix |
| 6 | Create /llms.txt | 30 min | AI search visibility |

### HIGH — Fix This Month

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 7 | Write 2 complete case studies (contractors + healthcare) | 4 hrs | E-E-A-T score doubles |
| 8 | Add 2-3 client testimonials | 1 hr | Authority + trust |
| 9 | Expand capabilities to 150-200 words each | 2 hrs | Content depth + citability |
| 10 | Add FAQ section with schema | 2 hrs | PAA ranking + AI extraction |
| 11 | Convert images to WebP + add srcset | 30 min | 1.8MB payload reduction |
| 12 | Add security headers via vercel.json | 10 min | Security signals |
| 13 | Enable clean URLs (remove .html) | 15 min | URL structure |
| 14 | Add privacy policy + terms | 1 hr | Trust signal |

### MEDIUM — Content Expansion (ATP-Driven)

| # | Page to Build | Target Keyword | Volume | CPC |
|---|---------------|---------------|--------|-----|
| 15 | "What Does an AI Automation Agency Do?" | ai automation agency | 1,900 | $18.30 |
| 16 | "AI Automation Agency Pricing" | ai automation agency pricing | 20 | $6.65 |
| 17 | "GoHighLevel Email Automation Guide" | gohighlevel email automation | 20 | $29.14 |
| 18 | "GHL Automation Templates" | gohighlevel automation templates | 10 | $11.12 |
| 19 | "Is an AI Automation Agency Worth It?" | is ai automation agency worth it | 20 | $7.65 |
| 20 | "AI Automation for Real Estate" | ai automation agency real estate | 10 | $11.51 |
| 21 | "GoHighLevel vs Zapier" | can gohighlevel replace zapier | PAA | - |

### LOW — Ongoing

| # | Action | Impact |
|---|--------|--------|
| 22 | Start blog (1-2 posts/month on GHL/automation) | Expertise signals |
| 23 | YouTube presence (even Loom walkthroughs) | 0.737 correlation with AI citations |
| 24 | Reddit engagement (r/GoHighLevel, r/automation) | Brand entity signals |
| 25 | Replace Three.js with CSS/SVG alternative | Save 608KB |
| 26 | Self-host fonts, reduce to 4 weights | CLS + FCP improvement |

---

## Score Projection

| Scenario | Est. Score | Timeline |
|----------|-----------|----------|
| Current state | 32/100 | — |
| After Critical fixes (items 1-6) | 50-55/100 | 1 week |
| After High priority (items 7-14) | 65-70/100 | 1 month |
| After Content expansion (items 15-21) | 75-80/100 | 2-3 months |
| After Ongoing (items 22-26) | 85+/100 | 6 months |
