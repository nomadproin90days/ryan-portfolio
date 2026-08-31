import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { useEffect, useState, useRef } from "react";
import useHead from "../hooks/useHead";

const AnimatedNumber = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);
        const duration = 2000;
        const startTime = performance.now();
        const update = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCount(Math.floor(easeProgress * target));
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const stats = [
  { number: 12, label: "Months at the agency", suffix: "" },
  { number: 138, label: "Active clients managed", suffix: "+" },
  { number: 646, label: "Recorded calls (Fathom)", suffix: "" },
  { number: 12, label: "Team members managed", suffix: "+" },
  { number: 3.4, label: "Churn rate (company avg: 6.3%)", suffix: "%", float: true },
  { number: 8009, label: "Monthly commission generated", suffix: "", prefix: "$" },
];

const contributions = [
  {
    date: "June 2, 2025",
    title: "Day One: Mock Calls with the CEO",
    tag: "The Beginning",
    description: "First day at the agency. Started with a Fathom demo, then immediately into mock onboarding calls with the CEO. Coached on confidence, Lead Connector setup, review funnels, and the art of appearing prepared while learning on the fly.",
    details: [
      "First ever Fathom recording: June 2, 2025",
      "Mock onboarding calls with the CEO coaching in real-time",
      '"Confidence and appearing prepared are crucial during client calls"',
    ],
  },
  {
    date: "June 9 - 30, 2025",
    title: "First Live Clients and Rapid Ramp",
    tag: "Onboarding",
    description: "One week after mock calls, taking live client onboarding calls. First real client: a roofing contractor. By month end, handling multiple daily calls across roofing, HVAC, lawn care, tile, plumbing, cleaning, and more.",
    details: [
      "First live call: a roofing contractor, June 9",
      "GBP setup, domain access collection, customer list exports",
      "By June 30: daily launch calls across 10+ industries",
    ],
  },
  {
    date: "July 30, 2025",
    title: "The 1:1 That Changed Everything",
    tag: "Growth",
    description: "Candid 1:1 with the CEO. Two clients had escalated over incomplete domain redirects, slow communication, and perceived lack of technical knowledge. the CEO coached on email filters, GHL conversation management, and the importance of writing down unknowns rather than guessing.",
    details: [
      "Gaps identified: email management, response time, domain/redirect knowledge",
      "the CEO coached on bottom-to-top GHL conversation method",
      '"If you don\'t know something, say I\'ll find out. Never bluff the client."',
    ],
  },
  {
    date: "August - September 2025",
    title: "Closing Every Gap",
    tag: "Skill Development",
    description: "Two months of deliberate technical mastery. Domains, redirects, GoDaddy delegation, A2P messaging compliance, GHL workflows. Call volume increased. Started handling support calls alongside onboarding.",
    details: [
      "Mastered domain management across all major registrars",
      "A2P 10DLC compliance, GHL calendar/SMS/email workflows",
      "Support calls added: troubleshooting live client issues in real-time",
    ],
  },
  {
    date: "October - November 2025",
    title: "Emerging as a Leader",
    tag: "Leadership Emergence",
    description: "Portfolio past 80+ clients. Started naturally mentoring other CSMs. Running informal 1:1s, helping navigate difficult clients and GHL workflows. Training team members through live call practice with real clients.",
    details: [
      "Portfolio grew past 80+ active clients",
      "Assigned team members live launch calls as training exercise",
      "Developed pre-call strategy technique adopted by the team",
    ],
  },
  {
    date: "November 17, 2025",
    title: "Pay Raise: $875 to $1,000 Biweekly",
    tag: "Milestone",
    description: "Mercury records show the pay bump from $875 to $1,000 biweekly on November 17. This was the real promotion moment, before the formal title came months later.",
    details: [
      "Verified via Mercury payment records in Gmail",
      "$875 biweekly (Jun-Oct) to $1,000 biweekly (Nov+)",
      "Peak paycheck: $1,230 in February 2026 with bonuses",
    ],
  },
  {
    date: "December 2025",
    title: "Daily 1:1s with Five Team Members",
    tag: "Team Management",
    description: "The inflection point from individual contributor to people manager. Daily 1:1s with five team members. Simultaneously maintaining 6+ client calls per day.",
    details: [
      "One team member: daily sessions (Dec 2-23, nearly every day)",
      "Others: 3x/week, daily, 2x/week, weekly cadences",
      "6+ client calls AND 3+ team 1:1s on the same day, repeatedly",
    ],
  },
  {
    date: "January 2026",
    title: "Company Restructuring",
    tag: "Transformation",
    description: "Leadership announced major changes: leaderboard, bonus structure, new Head of CS. Already running the processes the company was now formalizing. Sold a $1,000 website buyout cited by the CEO as an example to the entire team.",
    details: [
      "Leaderboard launched: churn %, upsells, response time, task completion",
      "Already doing 1:1s and mentoring before it was formally required",
      "$1,000 website buyout sale cited by the CEO as example to team",
    ],
  },
  {
    date: "February 2026",
    title: "CS Platform Command Center",
    tag: "Engineering",
    description: "Co-built the CS Platform: Next.js 16, Supabase, real-time GHL sync. Action Queue with weighted prioritization. The Task Dashboard became the single source of truth, replacing ClickUp and all manual tracking company-wide.",
    details: [
      "Weighted lead formula: total_leads = contacts + (opportunities x 2)",
      "Action Queue: Technical Failures (100W), Milestone Stalls (80W), Routine Nudges (50W)",
      "Real-time sync engine with 100ms throttle for GHL rate limits",
    ],
  },
  {
    date: "Early March 2026",
    title: "GBP and SEO Automation at Scale",
    tag: "Automation",
    description: "The domain knowledge the CEO flagged as a gap in July 2025 was now being deployed at scale through browser automation. GBP profiles, verification flows, GSC meta tags across 77/78 client websites.",
    details: [
      "Automated GBP creation for 100+ profiles",
      "77/78 client websites with meta tags deployed",
      "6-step SEO methodology codified into automation",
    ],
  },
  {
    date: "March 14, 2026",
    title: "Promoted to Co-CSM Team Lead",
    tag: "Promotion",
    description: "Nine months after the CEO identified communication and technical gaps, promoted to Co-CSM Team Lead. Authored a 7-section SOP review adopted by leadership.",
    details: [
      "Co-Team Lead (1 of 2), reporting directly to the CEO",
      "Authored CSM Training Feedback: 7-section SOP review adopted by leadership",
      "Proposed onboarding vs. support department split",
    ],
  },
  {
    date: "March 16, 2026",
    title: "Google Ads Mass Rollout",
    tag: "Revenue",
    description: "48 accounts created and 39 campaigns built in a single sprint. The same client management skills learned call-by-call in June 2025, now deployed programmatically at scale.",
    details: [
      "48 Google Ads accounts created programmatically",
      "39 campaigns built at $30/day with optimized targeting",
      "Knowledge base deployed: 702 pgvector chunks",
    ],
  },
  {
    date: "April 2026",
    title: "#1 on the Leaderboard",
    tag: "Peak Performance",
    description: "Swept the company leaderboard: #1 in MRR ($44.7K), upsells (5), and total commission ($8,009). Managing the largest book in the company (138 clients) while maintaining churn nearly half the company average.",
    details: [
      "3.4% churn vs. 6.3% company average",
      "$8,009 commission, nearly 2x the next closest CSM ($6,247)",
      "$44.7K MRR under management, highest in the company",
      "#1 rank across MRR, upsells, and total commission",
    ],
  },
  {
    date: "May 2026",
    title: "Full Revenue Operator",
    tag: "Revenue Operator",
    description: "Transitioned from team lead to full individual contributor focused on revenue. Managing 138+ clients with automated systems, closing upsells, and maintaining elite retention metrics. The CSM who struggled with email filters in July 2025 now outperforms every CSM in the company across every metric.",
    details: [
      "#1 on the leaderboard by a wide margin",
      "138+ active clients with automated infrastructure",
      "Largest MRR under management in the company",
      "Built systems that scale: 12 AI agents, CLI tools, automated pipelines",
    ],
  },
  {
    date: "June 2026",
    title: "June Receipts: Verification and Expansion",
    tag: "The Present",
    description: "Opened the month with the same revenue-ops loop: clear onboarding blockers, verify local search assets, and convert qualified accounts into SEO revenue. The first week added a Google Business Profile verification for a Carolinas home-services contractor and $2,998 in new SEO quarterly revenue across a Virginia cleaning company and a construction company.",
    details: [
      "June 2: Cleaning company (Virginia) SEO Quarterly logged, $1,499 sale / $149.90 commission",
      "June 3: Home-services contractor (Carolinas) Google Business Profile verified and recorded",
      "June 4: Construction company SEO Quarterly logged, $1,499 sale / $149.90 commission",
    ],
  },
];

const payHistory = [
  { date: "Jun 16", amount: 875, label: "" },
  { date: "Jul 2", amount: 875, label: "" },
  { date: "Jul 16", amount: 875, label: "" },
  { date: "Aug 1", amount: 1750, label: "Back-pay" },
  { date: "Sep 2", amount: 950, label: "" },
  { date: "Sep 16", amount: 875, label: "" },
  { date: "Oct 1", amount: 875, label: "" },
  { date: "Oct 16", amount: 875, label: "Last $875" },
  { date: "Nov 17", amount: 1000, label: "RAISE" },
  { date: "Dec 1", amount: 1000, label: "" },
  { date: "Dec 16", amount: 1000, label: "" },
  { date: "Dec 30", amount: 1100, label: "Bonus" },
  { date: "Jan 15", amount: 1000, label: "" },
  { date: "Feb 2", amount: 1050, label: "" },
  { date: "Feb 17", amount: 1230, label: "Peak" },
  { date: "Mar 2", amount: 1000, label: "" },
  { date: "Mar 16", amount: 1000, label: "" },
  { date: "Apr 1", amount: 1000, label: "" },
  { date: "Apr 16", amount: 1000, label: "" },
  { date: "May 1", amount: 1000, label: "" },
];

const timeline = [
  { date: "Jun 2, 2025", event: "Day 1: Fathom demo and mock onboarding calls with the CEO" },
  { date: "Jun 9, 2025", event: "First live client call: a roofing contractor" },
  { date: "Jul 30, 2025", event: "Pivotal 1:1 with the CEO. Gaps identified. Growth plan set." },
  { date: "Aug - Sep", event: "Technical mastery sprint: domains, A2P, GHL workflows" },
  { date: "Oct - Nov", event: "Portfolio past 80+. Mentoring new CSMs with live call training." },
  { date: "Nov 17, 2025", event: "Pay raise from $875 to $1,000 biweekly via Mercury." },
  { date: "Dec 2025", event: "Daily 1:1s with 5 team members. 6+ calls per day." },
  { date: "Jan 2026", event: "Company restructuring. Already doing what they formalized." },
  { date: "Feb 2026", event: "CS Platform Command Center built. Task Dashboard live." },
  { date: "Mar 14, 2026", event: "Promoted to Co-CSM Team Lead. 12 AI agents deployed." },
  { date: "Mar 16, 2026", event: "Google Ads mass rollout: 48 accounts, 39 campaigns." },
  { date: "Apr 2026", event: "#1 on leaderboard: $8K commission, $44.7K MRR, 3.4% churn." },
  { date: "May 2026", event: "Full revenue operator. 138+ clients. Largest book in the company." },
  { date: "Jun 2-4, 2026", event: "June opened with two SEO quarterly upsells (a cleaning company and a construction company) plus a GBP verification for a Carolinas contractor." },
];

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Journey() {
  useHead({
    title: "Agency Journey | Ryan Christmas",
    description: "From mock calls on day one to #1 on the company leaderboard in 12 months. A chronological record of growth at a digital marketing agency.",
    canonical: "https://luxetidestudio.com/journey",
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center">
      {/* HERO */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 pt-28 pb-16">
        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-5">
          Digital Marketing Agency / Customer Success
        </motion.p>
        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible"
          className="text-[10vw] md:text-6xl lg:text-[80px] font-bold tracking-tighter leading-[0.9] mb-8 text-balance"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          From mock calls on day one to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">#1 on the leaderboard</span> in twelve months.
        </motion.h1>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-8 text-sm text-muted-foreground mb-8">
          <div><span className="text-foreground font-medium">Role:</span> CSM / Team Lead / Revenue Operator</div>
          <div><span className="text-foreground font-medium">Period:</span> June 2025 - Present</div>
          <div><span className="text-foreground font-medium">Churn:</span> 3.4% (company avg 6.3%)</div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="w-full border-y border-black/10 dark:border-white/10 mb-20">
        <div className="max-w-[1080px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-black/10 dark:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }} className="p-6 md:p-8 text-center">
              <div className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.float ? <>{stat.prefix || ""}{stat.number}{stat.suffix}</> : <AnimatedNumber target={stat.number} suffix={stat.suffix || ""} prefix={stat.prefix || ""} />}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PAY CHART */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 mb-20">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-4">
          Compensation
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tighter mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Pay progression, verified from Mercury via Gmail.
        </motion.h2>
        <div className="flex items-end gap-[3px] md:gap-2 h-[220px] overflow-x-auto pb-2">
          {payHistory.map((pay, i) => {
            const maxAmount = 1750;
            const height = Math.max((pay.amount / maxAmount) * 180, 16);
            const isRaise = pay.label === "RAISE";
            return (
              <motion.div key={i} initial={{ opacity: 0, scaleY: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="flex flex-col items-center gap-1 flex-1 min-w-[28px] origin-bottom">
                <span className="text-[9px] text-muted-foreground font-medium">${pay.amount.toLocaleString()}</span>
                <div className={`w-full rounded-t-sm transition-colors ${isRaise ? "bg-emerald-500" : "bg-black/20 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/30"}`} style={{ height: `${height}px` }} />
                <span className="text-[8px] text-muted-foreground">{pay.date}</span>
                {pay.label && <span className={`text-[8px] font-bold ${isRaise ? "text-emerald-400" : "text-muted-foreground"}`}>{pay.label}</span>}
              </motion.div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-4">$875/biweekly (Jun-Oct 2025) → $1,000/biweekly (Nov 2025+) → $1,230 peak with bonuses (Feb 2026)</p>
      </section>

      {/* STORY */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 mb-20">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-4">
          Story
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tighter mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Twelve months of growth, told chronologically.
        </motion.h2>
        <div className="space-y-6">
          {contributions.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }} transition={{ delay: idx * 0.03 }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 border-t border-black/10 dark:border-white/[0.08] pt-8 group">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">{item.date}</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-emerald-400">{item.tag}</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                <ul className="space-y-1">
                  {item.details.map((detail, i) => (
                    <li key={i} className="text-sm text-muted-foreground/80 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-black/20 dark:before:bg-black/20 dark:bg-white/20">{detail}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 mb-20">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-4">
          Timeline
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tighter mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          From CSM to Team Lead to Revenue Operator.
        </motion.h2>
        <div className="relative border-l-2 border-black/10 dark:border-white/10 ml-2 space-y-8">
          {timeline.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="pl-8 relative">
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 tracking-wide">{item.date}</span>
              <p className="text-sm text-muted-foreground mt-1">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* UPSELLS IN ACTION */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 mb-20">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-4">
          Revenue
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tighter mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          SEO upsells, closed on camera.
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground leading-relaxed max-w-2xl mb-12">
          Every upsell is a real conversation with a real business owner, recorded on Fathom. The offer: top-3 placement on Google with a 90-day guarantee. If we don't deliver, we keep working at no charge until we do.
        </motion.p>

        {/* Screenshot proof */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-12 rounded-2xl border border-black/10 dark:border-white/[0.08] overflow-hidden">
          <img src="/images/csm-accountability-may12.png" alt="CSM Accountability dashboard showing $13,306.34 in upsell revenue across client accounts" className="w-full" />
          <div className="p-4 bg-black/[0.02] dark:bg-white/[0.03] border-t border-black/10 dark:border-white/[0.08]">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">Live Platform Data</span>
            <span className="text-xs text-muted-foreground ml-3">June additions: a cleaning company and a construction company, $1,499 SEO Quarterly each</span>
          </div>
        </motion.div>

        {/* June proof */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
          {[
            {
              date: "Jun 2",
              client: "Cleaning Company (Virginia)",
              result: "SEO Quarterly logged",
              metric: "$149.90 commission",
              image: "/images/journey-june-cleaning-upsell.png",
              alt: "CS Platform screenshot showing a cleaning company's SEO upsell logged with $149.90 earned",
            },
            {
              date: "Jun 3",
              client: "Home-Services Contractor (Carolinas)",
              result: "Google Business Profile verified",
              metric: "Onboarding recovery logged",
              image: "/images/journey-june-contractor-gmb-verified.png",
              alt: "CS Platform screenshot showing a contractor's Google Business Profile verified",
            },
            {
              date: "Jun 4",
              client: "Construction Company",
              result: "SEO Quarterly logged",
              metric: "$149.90 commission",
              image: "/images/journey-june-construction-upsell.png",
              alt: "CS Platform screenshot showing a construction company's SEO upsell logged with $149.90 earned",
            },
          ].map((proof, i) => (
            <motion.div key={proof.client} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-lg border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03]">
              <img src={proof.image} alt={proof.alt} className="aspect-[16/10] w-full object-cover object-top" />
              <div className="p-4">
                <div className="text-xs font-semibold text-emerald-400 mb-1">{proof.date}</div>
                <div className="text-sm font-medium text-foreground mb-1">{proof.client}</div>
                <div className="text-xs text-muted-foreground">{proof.result} - {proof.metric}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upsell tracker */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
          {[
            { client: "Construction Company", amount: "$1,499", date: "Jun 4", contact: "SEO Quarterly" },
            { client: "Cleaning Company (Virginia)", amount: "$1,499", date: "Jun 2", contact: "SEO Quarterly" },
            { client: "Design Studio", amount: "$1,499", date: "May 15", contact: "SEO Quarterly" },
            { client: "Custom Coatings Company", amount: "$729", date: "May 15", contact: "Google Call Only Ads" },
            { client: "Granite Countertop Company", amount: "$1,499", date: "May 12", contact: "SEO Quarterly" },
            { client: "HVAC Company", amount: "$1,499", date: "May 7", contact: "SEO Quarterly" },
            { client: "Custom Coatings Company", amount: "$800", date: "May 5", contact: "SEO Monthly" },
            { client: "General Contractor", amount: "$1,499", date: "May 3", contact: "SEO Quarterly" },
            { client: "Tree & Landscape Company", amount: "$1,499", date: "Apr 29", contact: "SEO Quarterly" },
            { client: "Paving Company", amount: "$605", date: "Apr 25", contact: "SEO + Quarterly" },
            { client: "Roofing Company", amount: "$1,202", date: "Apr 23", contact: "SEO Quarterly" },
            { client: "Paving Company", amount: "$800", date: "Apr 23", contact: "SEO Monthly" },
            { client: "Roofing Company", amount: "$905", date: "Apr 22", contact: "SEO" },
            { client: "Designer Flooring Company", amount: "$1,499", date: "Apr 22", contact: "SEO Quarterly" },
            { client: "Garage Flooring Company", amount: "$1,499", date: "Apr 22", contact: "SEO Quarterly" },
          ].map((sale, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-5 hover:border-emerald-500/30 transition-colors">
              <div className="text-2xl font-bold tracking-tighter text-emerald-400 mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{sale.amount}</div>
              <div className="text-sm font-medium text-foreground mb-1">{sale.client}</div>
              <div className="text-xs text-muted-foreground">{sale.contact} - {sale.date}</div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-3xl font-bold tracking-tighter text-emerald-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>$17,195.34</div>
            <div className="text-sm text-muted-foreground">Total upsell revenue (Apr 16 - Jun 4)</div>
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tighter text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>$1,942.35</div>
            <div className="text-sm text-muted-foreground">Commission earned (10%)</div>
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tighter text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>16</div>
            <div className="text-sm text-muted-foreground">Deals closed in period</div>
          </div>
        </div>

        {/* Recorded sales conversations */}
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-emerald-400 font-semibold mb-6">
          Watch the Conversations
        </motion.p>
        <div className="space-y-4">
          {[
            {
              date: "Apr 30",
              client: "Local Contractor",
              type: "Client Check-in",
              desc: "Pitched 'Top 3 on Google' with 90-day guarantee. Identified only 1/31 exact NAP citation matches. Built the case with competitor audit data.",
              url: "https://fathom.video/share/BR2wxfMymVQJV66NtX7BLJNTrs632wfa?tab=summary&timestamp=88.0"
            },
            {
              date: "Apr 28",
              client: "Home Services Client",
              type: "Support Call",
              desc: "Client had $600 balance owed. Negotiated $297/mo SEO with top-3 guarantee, waived the balance to close the deal. Turned a collections problem into new recurring revenue.",
              url: "https://fathom.video/share/shu1LX-4e9KV5GEpStBzcmRuWWnS_czs?tab=summary&timestamp=158.0"
            },
            {
              date: "Apr 28",
              client: "Paving Company",
              type: "Negotiation",
              desc: "Client tried to negotiate $1,500/mo SEO down to $800/mo while owing $600 in past-due payments. Held the line on pricing and tied the deal to collecting the outstanding balance.",
              url: "https://fathom.video/share/GUD5otxB7wKcihVPmCmJYNF-g--PApxd?tab=summary&timestamp=195.0"
            },
            {
              date: "Apr 23",
              client: "Roofing Contractor",
              type: "Launch Call",
              desc: "Launched the client's site, ran live competitor analysis against a regional roofing competitor, planted $1,499/quarter SEO seed. Client deferred to next month but committed.",
              url: "https://fathom.video/share/waAk9WnwHX2GxN4a3cAVSByTY6Gfx7jk?tab=summary&timestamp=2103.0"
            },
            {
              date: "Apr 29",
              client: "Service Business Owner",
              type: "Check-in",
              desc: "Recognized the client wasn't ready for SEO upsell. Deferred the pitch, prioritized completing the initial scope first. Protected the relationship over the commission.",
              url: "https://fathom.video/share/KxPV_GVEcK1PX71vSnQZ4PeNsPMxxd1P?tab=summary&timestamp=627.0"
            },
            {
              date: "Apr 22",
              client: "Reactivated Account",
              type: "Reactivation",
              desc: "Reactivated a dead account (inactive since June 2025). Proposed $500/mo advanced SEO to fix missing citations and poor keyword ranking. Turned a lost client into new revenue.",
              url: "https://fathom.video/share/LkrwnooXigrrmYjhy95g-yYYGoVsXCZd?tab=summary&timestamp=1170.0"
            },
          ].map((call, i) => (
            <motion.a key={i} href={call.url} target="_blank" rel="noreferrer"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="block rounded-xl border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-6 hover:border-emerald-500/30 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all group">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-1 md:w-[100px]">
                  <span className="text-xs font-semibold text-emerald-400">{call.date}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{call.type}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-400 transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {call.client} <span className="inline-block group-hover:translate-x-1 transition-transform text-muted-foreground">↗</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{call.desc}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* THE PRODUCT */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 mb-20">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-4">
          The Product
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tighter mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          What I sell. What I deliver.
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground leading-relaxed max-w-2xl mb-12">
          The Advanced SEO and Social Media package I sold to contractors and service businesses. Not a script someone handed me. I learned the product, understood why it works, and pitched it with live competitor data on every call.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: "GBP and Google Maps Optimization", desc: "Get the business showing up at the top of Google Maps when customers search for their services. Includes heat maps to show ranking vs. competitors." },
            { title: "SEO and Content Creation", desc: "Blogs, posts, keyword optimization, site structure improvements. Everything written, published, and managed. The client doesn't touch it." },
            { title: "Social Media Management", desc: "Facebook, Instagram, YouTube, TikTok, LinkedIn, Yelp, Angie's List. Posts created and managed across all major platforms." },
            { title: "Citation and NAP Consistency", desc: "Business name, address, and phone number accurate and consistent across the entire internet. The foundation of local SEO." },
            { title: "Review Management", desc: "Drive more and better customer reviews. Notifications every time a review is left on Google. Builds trust and improves conversion." },
            { title: "FAQ Targeting", desc: "Create FAQ content targeting exactly what customers are searching for. Ranks for more search terms and captures long-tail traffic." },
            { title: "Website SEO Performance", desc: "Keywords, structure, content, page speed. Ongoing optimization that compounds over time." },
            { title: "Lead Conversion Optimization", desc: "Turn website visitors into leads. Optimized content, social proof, and conversion paths that reduce reliance on outbound." },
            { title: "Top 3 Google Guarantee", desc: "The offer: top 3 placement on Google within 90 days. If we don't deliver, we keep working at no charge until we do. Zero risk for the client." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-5 hover:border-emerald-500/20 transition-colors">
              <h3 className="text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-emerald-400 mb-1">Pricing</div>
            <div className="text-2xl font-bold tracking-tighter text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>$1,499/quarter or $500/month</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-emerald-400 mb-1">April Results</div>
            <div className="text-2xl font-bold tracking-tighter text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>$11,807 in 30 days</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-emerald-400 mb-1">Close Method</div>
            <div className="text-sm text-muted-foreground">Live competitor audits on Zoom. Data sells, not pressure.</div>
          </div>
        </motion.div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 mb-20">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-4">
          Interview Q&A
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tighter mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Questions employers ask. Answered.
        </motion.h2>

        <div className="space-y-6">
          {[
            {
              q: "Why should we choose you over the other applicants?",
              a: "Because I don't just tell you I can do the job. I show you 646 recorded calls proving I've done it. Every onboarding, every upsell conversation, every save call, every team training session, from day one, timestamped and on camera. I managed 138 clients simultaneously, the largest book in a company with 20+ CSMs, and maintained 3.4% churn against a 6.3% company average. I was #1 on the leaderboard in every measurable category. Most applicants tell you what they can do. I'm the one who can show you the tape."
            },
            {
              q: "Walk me through how you identify the highest-impact automation opportunity for a client.",
              a: "I start with what the client is doing manually. Most of the businesses I work with are getting leads through word of mouth or old contact lists. So the first high-impact move is to take their existing customer list, build them a website, get their Google Business Profile verified, and then run an SMS or email campaign asking their past customers for five-star reviews. That single automation drives organic traffic, generates leads, and builds their brand on Google. It's simple, but it has the highest ROI because it leverages relationships they already have. Once that's running, I layer on paid ads for immediate results while the SEO campaign works in the background. By month four or five, the organic rankings kick in and the business has a sustainable lead engine."
            },
            {
              q: "Describe a complex multi-step workflow you've built in GoHighLevel.",
              a: "The onboarding pipeline I built handles the full client lifecycle. When a client signs up, an automation kicks in: they get invited to book an onboarding call with reminders at 24 hours and 2 hours. Between onboarding and launch, another sequence collects their EIN number, requests Google Business Profile manager access, and tracks completion. Once their website is ready, a launch notification goes out and they book the launch call. After launch, follow-up automations handle review campaigns, check-in scheduling, and upsell timing. Each step has a human handoff point where I get on a Zoom call. The automation handles the logistics so I can focus on the conversation. I've run this across 138+ clients simultaneously."
            },
            {
              q: "Have you integrated LLMs or AI into an automation workflow?",
              a: "Yes. I built an A2P compliance automation where the system organized a list of all businesses missing phone system approval, then automatically sent each one a branded SMS with a link to a form I built using AI. The form collected their EIN, address, and business information. When submitted, it fed into a dashboard that organized everything for bulk submission to the TCR compliance registry. The whole pipeline went from manual, one-by-one phone calls to an automated system that processed hundreds of registrations. I've also built AI-powered call prep systems that pull client data, recent calls, open action items, and churn risk signals before every call, so I walk into every conversation already knowing what to say."
            },
            {
              q: "What's your experience with voice AI platforms?",
              a: "I've trained voice AI agents using VAPI and Eleven Labs for automated lead qualification. The process is cloning a voice, training it on scripts and objection handling, and implementing it into the phone system. I've also worked with VoiceBox for quick voice cloning from short clips. The key is making the AI handle routine qualification so the human only gets on the call when the lead is warm and ready. It's not complicated to set up. The hard part is writing the scripts well enough that the AI sounds natural and handles edge cases."
            },
            {
              q: "How do you handle ambiguity when a client says 'I need better leads' but gives no details?",
              a: "I look at the full scope first. What types of leads are they getting now? Where are they coming from? What's the close rate? Then I use AI to research the market and build a strategy. Maybe the problem isn't lead quality, it's that they're looking in the wrong areas or targeting the wrong customer profile. I figure out if the solution is cheap or expensive, simple or complex, and whether I can actually pull it off. If I don't know something, I say 'I'll find out' and come back with a plan. I'm pretty good at figuring stuff out. The worst thing you can do is guess and build the wrong thing."
            },
            {
              q: "What's your approach to client retention?",
              a: "Retention starts before the client thinks about leaving. I run a system that flags churn risk signals: missed calls, billing issues, low engagement, stale lead pipelines. When a flag goes up, I reach out before the client has to. When a client does want to cancel, there's a de-escalation flow: understand why, offer a discounted rate, offer a free month, or solve the underlying problem. I've saved clients by giving credits, scheduling biweekly check-ins, and sometimes just picking up the phone and listening. My churn rate is 3.4% in a company where the average is 6.3%. That's not luck. That's a system."
            },
            {
              q: "How do you sell without being pushy?",
              a: "Data. I run a live competitor audit on the call and show the client exactly where they're losing. 'Your competitor has 47 reviews and you have 12. They're ranking #1 for your main keyword and you're on page 3. Here's what it would take to pass them.' Then I offer a guarantee: top 3 on Google in 90 days or I keep working for free until we get there. The client doesn't feel sold to because I'm showing them a problem they can see with their own eyes and offering a solution with zero risk. I closed $11,807 in SEO revenue in 30 days using this approach. And when a client isn't ready, I don't push. I defer the pitch, protect the relationship, and come back when the timing is right. That's why my churn is low."
            },
          ].map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-4 text-emerald-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                "{faq.q}"
              </h3>
              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL VOLUME */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 mb-20">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-4">
          Recorded Calls
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold tracking-tighter mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          646 calls. Every one recorded.
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-muted-foreground leading-relaxed max-w-2xl mb-12">
          Every client onboarding, launch call, support session, team 1:1, and training session recorded on Fathom AI from day one. Full transparency. Full accountability.
        </motion.p>

        {/* Call type breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          {[
            { count: 197, type: "Launch Calls" },
            { count: 169, type: "Onboarding" },
            { count: 130, type: "1:1 Mentoring" },
            { count: 90, type: "Meetings" },
            { count: 68, type: "Support" },
            { count: 20, type: "Training" },
            { count: 13, type: "Check-ins" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold tracking-tighter text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.count}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{item.type}</div>
            </motion.div>
          ))}
        </div>

        {/* Monthly volume chart */}
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-6">
          Monthly Volume
        </motion.p>
        <div className="flex items-end gap-[6px] md:gap-3 h-[200px]">
          {[
            { month: "Jun 25", calls: 35, note: "Day 1" },
            { month: "Jul", calls: 72, note: "" },
            { month: "Aug", calls: 39, note: "" },
            { month: "Sep", calls: 65, note: "" },
            { month: "Oct", calls: 78, note: "" },
            { month: "Nov", calls: 94, note: "Peak" },
            { month: "Dec", calls: 82, note: "" },
            { month: "Jan 26", calls: 25, note: "Lead" },
            { month: "Feb", calls: 34, note: "Build" },
            { month: "Mar", calls: 75, note: "" },
            { month: "Apr", calls: 46, note: "#1" },
          ].map((m, i) => {
            const maxCalls = 94;
            const height = Math.max((m.calls / maxCalls) * 160, 12);
            const isHighlight = m.note === "Peak" || m.note === "#1" || m.note === "Day 1";
            return (
              <motion.div key={i} initial={{ opacity: 0, scaleY: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-1 flex-1 min-w-[24px] origin-bottom">
                <span className="text-[9px] text-muted-foreground font-medium">{m.calls}</span>
                <div className={`w-full rounded-t-sm transition-colors ${isHighlight ? "bg-emerald-500" : "bg-black/20 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/30"}`} style={{ height: `${height}px` }} />
                <span className="text-[7px] md:text-[8px] text-muted-foreground">{m.month}</span>
                {m.note && <span className={`text-[7px] font-bold ${isHighlight ? "text-emerald-400" : "text-muted-foreground"}`}>{m.note}</span>}
              </motion.div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          June 2025: mock calls with the CEO. November 2025: 94 calls in a single month. By April 2026: #1 on every leaderboard metric while managing the largest book in the company.
        </p>
      </section>

      {/* FIRST CALL */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 mb-20">
        <div className="rounded-2xl border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-emerald-400 font-semibold mb-4">First Recording</p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                June 5, 2025: Mock Calls
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Day one action items from the CEO: "Watch DFW call recording to study referral asking technique." "Practice onboarding call flow solo." "Prepare for next mock call session tomorrow, same time."
              </p>
              <p className="text-sm text-muted-foreground/60">
                12 months later: #1 in referrals asked, #1 in upsells closed, #1 in revenue generated.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-emerald-400 font-semibold mb-4">Latest Stats</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["646", "total calls"],
                  ["138+", "clients"],
                  ["$8,009", "commission"],
                  ["#1", "rank"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl bg-black/[0.05] dark:bg-black/[0.3] border border-black/10 dark:border-white/[0.06] p-4">
                    <div className="text-2xl font-bold tracking-tighter mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="w-full max-w-[1080px] px-5 md:px-14 mb-20">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-6">
          Stack
        </motion.p>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-2">
          {["Next.js", "React", "TypeScript", "Supabase", "GoHighLevel API", "Claude AI", "Playwright", "pgvector", "Google Ads API", "Google Search Console", "Google Business Profile", "Fathom AI", "Vercel", "Node.js", "Tailwind CSS"].map((tech) => (
            <motion.span key={tech} variants={fadeUp} className="text-xs font-medium px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-muted-foreground hover:border-black/20 dark:hover:border-white/20 hover:text-foreground transition-colors">
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="w-full px-5 md:px-14 py-24 bg-foreground text-background text-center flex flex-col items-center">
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 max-w-4xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Ready to bring this to your team.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-lg text-background/70 max-w-lg mb-10">
          12 months from zero to #1. The same systems, discipline, and revenue focus, applied to your business.
        </motion.p>
        <motion.a initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          href="https://link.msgsndr.com/widget/booking/Ti4Dt85I47B5xG3rPUDJ" target="_blank" rel="noreferrer"
          className="bg-background text-foreground font-semibold px-10 py-5 rounded-full text-lg tracking-tight hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Book a Discovery Call
        </motion.a>
      </section>
    </motion.div>
  );
}
