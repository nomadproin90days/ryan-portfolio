# GEMINI HANDOFF: Portfolio Redesign Continuation

**Date:** March 16, 2026
**Author:** Claude (Opus 4.6)
**Purpose:** Full context for Gemini to continue work on Ryan's portfolio site.

---

## WHAT EXISTS NOW

**Live URL:** https://ryan-portfolio-beta.vercel.app
**Project directory:** `/Users/mac/Documents/projects/ryan-portfolio/`
**Vercel project:** `ryan-portfolio` (org: `iamryanxmas-6981s-projects`)
**Deploy command:** `cd /Users/mac/Documents/projects/ryan-portfolio && npx vercel --prod --yes`

### File Structure
```
ryan-portfolio/
  index.html          # Single-file site (HTML + CSS + JS, no framework)
  .vercel/
    project.json      # Vercel config
  images/
    ryan-coast.jpg     # Ryan on motorcycle, sunset, Oaxacan coast (HERO BANNER)
    ryan-portrait.jpg  # Ryan on beach at sunset, Oaxaca shirt (ABOUT SECTION)
    ocean-dark.jpg     # Aerial turquoise waves on white sand (unused, available)
    beach-tropical.jpg # Sunset beach with soft waves (LIFESTYLE STRIP)
    mezcal.jpg         # Dark moody cocktail on wood board (LIFESTYLE STRIP)
    sunset-gold.jpg    # Golden sunset on ocean waves (LIFESTYLE STRIP)
    ocean-aerial.jpg   # Tropical palm beach (PROJECT CARD background)
    surf-silhouette.jpg # Underwater blue ocean (PROJECT CARD background)
```

---

## DESIGN DIRECTION

### Inspiration
Ryan referenced the **Creativos** Readymag template: https://readymag.com/designs/5818706/

Key elements from that template applied here:
- White background, black massive typography (Space Grotesk)
- Minimal nav (logo left, links + CTA right)
- Editorial magazine layout with lots of whitespace
- Project cards in asymmetric grid (3 top, 2 small + 1 large bottom)
- Right-aligned descriptive text next to massive headings
- Clean, premium, high-end creative studio feel

### Brand: Luxe Tide Studio
- **Vibe:** Puerto Escondido, Oaxaca, Mexico. Surfing. Sunset. Mezcal. Digital nomad lifestyle. La Punta mornings, Zicatela swells, deep work in between.
- **Tone:** Professional but not corporate. Confident, not bragging. Shows capability through the work, not through hype.
- **Typography:** Space Grotesk (headings, massive display), Inter (body)
- **Colors:** White background (#fff), black text (#111), subtle grays for secondary text. No accent colors. Let the photography carry the visual weight.
- **Fonts loaded from:** fonts.bunny.net (privacy-respecting alternative to Google Fonts)

---

## RYAN'S PERSONAL INFO (from resume)

- **Full name:** Ryan Christmas
- **Company:** Luxe Tide Studio
- **Title:** AI Implementation Specialist, CRM & Automation Architect, GoHighLevel Expert
- **Email:** ryan@luxetidestudio.com
- **Personal email:** iamryanxmas@gmail.com
- **Mobile (MX):** +52 954 177 2437
- **WhatsApp:** +1 619 416 6678
- **Hometown:** Toronto, Canada (Canadian citizen)
- **Based:** Puerto Escondido, Oaxaca, Mexico (remote-first)
- **GitHub:** github.com/nomadproin90days
- **LinkedIn:** linkedin.com/in/ryanxmas

---

## CONTENT SECTIONS (current order)

1. **Nav** - "Luxe Tide Studio" logo, links (Projects, Process, About), "Get in touch" pill button
2. **Hero** - Massive "Automation Studio" heading, two-column intro text, personal details
3. **Hero Image** - Ryan's motorcycle/coast photo with location overlay
4. **Info Bar** - 4-cell grid: Email, WhatsApp, Mobile, Location
5. **Studio Intro** - "Build systems, not busywork." heading, two-column description
6. **Lifestyle Strip** - 3 photos in a row (beach sunset, mezcal, golden sunset)
7. **Tech Marquee** - Scrolling tech stack (GHL, Next.js, React, TypeScript, etc.)
8. **Projects** - "Projects" massive heading with year range, 3+3 card grid
9. **Process** - "How I work" - 3 steps (Scope, Build, Hand Off)
10. **Capabilities** - List layout (GHL, AI Automation, Full-Stack Dev, Revenue Ops, Strategy)
11. **About** - "Based on the coast. Built for remote." with Ryan's portrait photo, full contact details
12. **CTA** - "Let's build something." with email button, GitHub/LinkedIn/WhatsApp links
13. **Footer** - Copyright + social links

---

## PROJECTS LISTED

| Project | Category | Visual Treatment |
|---------|----------|-----------------|
| CRM Operations | Agency / GHL | Photo background (ocean-aerial.jpg, darkened) |
| Healthcare Digital Build | Healthcare / HIPAA | Solid warm brown (#8b4513) with text overlay |
| Intelligence Platform | SaaS / Internal Tool | Photo background (surf-silhouette.jpg, darkened) |
| A2P Migration | Compliance / 800+ Accounts | Solid teal (#0d4f4f) with text overlay |
| Google Ads at Scale | Performance / API | Solid dark (#1a1a1a) with text overlay |
| Browser Automation Suite | DevTools / Infrastructure | Solid slate (#2a2a2e) with text overlay |

**IMPORTANT NOTE ON SOLEIL/VOSHELL'S PROJECT:** The "Healthcare Digital Build" card refers to work Ryan did for Soleil Infusion Pharmacy / Voshell's Pharmacy, placed through Caleb Fowler's agency (AI Architect). There was a payment dispute that has been resolved. Ryan wants to extend an olive branch to Caleb and pitch himself as a collaborator. DO NOT name-drop Soleil, Voshell's, Caleb, or AI Architect anywhere on the portfolio. Keep it humble and generic. The goal is to impress Caleb without rubbing the dispute in his face.

---

## WHAT COULD BE IMPROVED

Areas Ryan or Gemini might want to work on:

1. **More lifestyle photos** - A surfing shot, working-at-a-cafe digital nomad shot, or mezcal bar scene would fill out the lifestyle strip and project cards
2. **Project card imagery** - Some cards use solid color placeholders. Real screenshots or styled mockups of the actual work would elevate the whole page
3. **Animations** - Current animations are simple scroll-reveal (opacity + translateY). The Creativos template has more sophisticated interactions (parallax, smooth scrolling sections, hover effects on images)
4. **Mobile polish** - Responsive breakpoints are functional but could use refinement, especially the hero image overlay and info bar on small screens
5. **SEO / Open Graph** - No OG meta tags, no favicon, no structured data
6. **Page speed** - Images are served directly without optimization. Could add lazy loading, srcset, or use Vercel Image Optimization
7. **Custom domain** - Currently on vercel.app subdomain. Could connect luxetidestudio.com

---

## TECHNICAL NOTES

- **Single HTML file** - No build step, no framework, no dependencies. Just index.html + images.
- **Deploy:** `npx vercel --prod --yes` from the project directory
- **Fonts:** Loaded from fonts.bunny.net CDN
- **Images:** Local files in `/images/` directory, deployed to Vercel as static assets
- **JS:** Minimal - just IntersectionObserver for scroll reveals
- **No package.json** - This is a static site, no npm/node required

---

## RYAN'S PREFERENCES (important for tone)

- No em dashes. Use hyphens, commas, colons, or periods.
- Be direct. Lead with the answer, not the reasoning.
- No corporate speak. Write like a human.
- No bragging about the Soleil project specifically.
- The portfolio should make Caleb Fowler (AI Architect owner) feel like Ryan is someone he should hire, partner with, or put on retainer. The message is: "I'm a professional, I deliver, I'm an asset to your team."
- Ryan values outcomes over hours. He prefers flat retainers ($5,000/month was his proposed rate).
- The digital nomad / Puerto Escondido lifestyle is part of the brand, not separate from it.

---

## RESUME FILE

Full HTML resume available at:
`/Users/mac/Documents/projects/soleil-infusion/Ryan_Christmas_Resume_Updated.html`

Contains detailed work history, toolkit, competencies, and professional profile that can be referenced for content.

---

*This handoff is for Ryan Christmas / Luxe Tide Studio internal use. It provides full context for any AI assistant continuing work on the portfolio.*
