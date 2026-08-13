import { motion } from "motion/react";
import { Link } from "react-router";
import useHead from "../../hooks/useHead";

export default function CsmOperationsPage() {
  useHead({
    title: "Client Success Operations, Automated | Luxetide Studio",
    description:
      "A contract CSM engagement rebuilt as a command-line operating system: preflight health checks, multi-account inbox triage, dashboard scraping and logging, and a single-SKU upsell engine.",
    canonical: "https://luxetidestudio.com/case-studies/csm-operations",
    ogImage: "https://luxetidestudio.com/images/ryan-coast.jpg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Client Success Operations, Automated",
      author: { "@type": "Person", name: "Ryan Christmas" },
      publisher: { "@type": "Organization", name: "Luxetide Studio" },
      mainEntityOfPage: "https://luxetidestudio.com/case-studies/csm-operations",
    },
  });

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { value: "6", label: "Ops CLIs shipped" },
    { value: "2", label: "CRM sub-accounts, one command" },
    { value: "0", label: "Playwright deps after migration" },
    { value: "5", label: "Upsell engine components" },
  ];

  const sections = [
    {
      title: "The Engagement",
      desc: "Contract Client Success Manager for a paid-ads lead generation agency. The scope was the whole post-sale surface: onboarding, scheduled check-ins, day-to-day client communication, campaign performance conversations, retention, and expansion. Compensation was structured as a base plus a month-to-month tiered retention bonus plus recurring commission on closed upsells, which made speed and coverage worth real money rather than being a matter of diligence."
    },
    {
      title: "The Problem",
      desc: "The working day was scattered across four surfaces: an assigned-task panel on an internal dashboard, two separate CRM sub-accounts with their own inboxes, an overdue-accounts report, and a contact log that leadership read as the record of work. Nothing joined them. Sessions started by manually confirming a browser session and two API tokens were alive, and when one of them was not, the failure surfaced in the middle of a client conversation instead of before it. The retention bonus was calculated one calendar month at a time, so an at-risk signal missed in week one could not be recovered in week four."
    },
    {
      title: "The Operating Layer",
      desc: "I built the engagement as a command-line system rather than a browser habit. A doctor preflight verifies the browser gateway, the dashboard session, and both API tokens before any client work begins, so failure is discovered at the start of a session instead of mid-conversation. One triage command scans both CRM sub-accounts at once, with automatic retry on rate limits, gateway errors and timeouts, and loud immediate failure on auth errors, because those two classes need opposite handling. A scraper pulls the day's assigned outreach list off the dashboard, scoped to the live rows only, since every task ever created stays in the DOM as hidden history and a naive selector returns a hundred and fifty dead rows. Logging writes contacts back to the dashboard, exits non-zero when an entry fails, and refuses to run against a logged-out session rather than silently succeeding."
    },
    {
      title: "The Browser Migration",
      desc: "The dashboard has no API, so everything above depends on driving a real browser. In July a Chrome auto-update rejected a CDP command the automation library issued unconditionally on connect, and every dashboard script broke at once on a browser version nobody controlled. I collapsed all browser access behind a single seam and moved it onto a gateway that owns its own Chrome profile and absorbs upgrades itself. Six CLIs import that one module. The direct dependency went to zero, the logged-in session stopped being something each script had to re-establish, and the class of failure where a vendor upgrade takes out an entire toolchain got designed out instead of patched."
    },
    {
      title: "The Upsell Engine",
      desc: "The expansion side was a single product rolled out across an existing book, which makes it a volume motion rather than bespoke account management. I designed it as five parts: a buy-signal detector that flags inbound language about missed calls, after-hours volume and being short-staffed; an ROI calculator that turns call volume, answer rate and average ticket into a missed-revenue number before the pitch instead of during it; a pitch library covering cold, warm, demo and objection paths; an independent commission ledger keyed on opaque identifiers; and a weekly conversion funnel report reconciling pitched, demoed, closed and paid."
    },
    {
      title: "Diagnosis Over Reporting",
      desc: "The most useful output was not a dashboard. Working the accounts surfaced two operational defects behind most of the churn: a gap in the onboarding handoff affecting several accounts, and a lead-qualification defect affecting several more. Neither was a client-communication problem, which is where churn gets attributed by default. I brought the owner the root cause, the affected count, and an offer to own the fix, rather than a list of unhappy accounts. Retention arguments are won with a diagnosis attached to a proposal."
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-[1000px] mx-auto px-5 md:px-14 pt-32 pb-20 flex flex-col items-start min-h-[70vh]"
    >
      <Link to="/#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground mb-12 flex items-center gap-2">
        ← Back to Projects
      </Link>

      <motion.p variants={slideUp} initial="hidden" animate="visible" className="text-sm tracking-widest uppercase text-muted-foreground font-semibold mb-4">
        Case Study
      </motion.p>

      <motion.h1
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="text-[10vw] md:text-7xl lg:text-[100px] font-bold tracking-tighter text-foreground mb-12 leading-[0.9]"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Client Success Ops, Automated
      </motion.h1>

      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="w-full aspect-[21/9] bg-muted mb-20 rounded-[2rem] overflow-hidden"
      >
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-500/10 to-amber-500/10 p-12 text-center">
          <h3 className="text-4xl md:text-6xl font-bold mb-4 text-foreground/20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>One CSM, Six CLIs</h3>
        </div>
      </motion.div>

      <section className="w-full flex justify-between gap-12 flex-col md:flex-row mb-20 border-b border-border pb-10">
        <div className="w-full max-w-[200px]">
          <p className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">Overview</p>
          <p className="text-muted-foreground text-sm font-medium">Contract CSM, Lead-Gen Agency</p>
        </div>
        <div className="flex-1 max-w-[600px] text-lg text-foreground/80 leading-relaxed font-medium">
          <p>Retention and expansion for an agency's client book, run as an engineering problem. The client work was the job. The tooling underneath it was what made the coverage possible.</p>
        </div>
      </section>

      <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="rounded-2xl border border-border bg-muted/40 p-6 md:p-8"
          >
            <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {stat.value}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground leading-relaxed">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {sections.map((section, idx) => (
        <motion.section
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="w-full mb-20 flex flex-col md:flex-row gap-8 md:gap-16"
        >
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{section.title}</h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-lg text-muted-foreground leading-relaxed">{section.desc}</p>
          </div>
        </motion.section>
      ))}

      <section className="w-full mb-20 rounded-3xl border border-border bg-muted/40 p-8 md:p-12">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">What Transfers</p>
        <ul className="flex flex-col gap-4 text-lg text-muted-foreground leading-relaxed list-none p-0 m-0">
          <li className="flex gap-4"><span className="text-foreground/40">01</span><span>Preflight before work. Check the session, the tokens and the gateway up front, so a broken dependency never surfaces in front of a client.</span></li>
          <li className="flex gap-4"><span className="text-foreground/40">02</span><span>Retry the transient, fail loud on the permanent. Rate limits and gateway hiccups should be absorbed; an expired token should stop everything immediately.</span></li>
          <li className="flex gap-4"><span className="text-foreground/40">03</span><span>One seam per external dependency. When a vendor upgrade breaks the browser layer, there should be a single file to fix, not six.</span></li>
          <li className="flex gap-4"><span className="text-foreground/40">04</span><span>Write results to a file, not to stdout. Long-running jobs get killed and their output truncated; the file survives.</span></li>
          <li className="flex gap-4"><span className="text-foreground/40">05</span><span>Keep your own ledger. When commission is owed on volume, an independent record is the difference between a claim and an argument.</span></li>
        </ul>
      </section>

      <div className="w-full pt-10 flex justify-center">
        <a href="https://link.msgsndr.com/widget/booking/Ti4Dt85I47B5xG3rPUDJ" target="_blank" rel="noreferrer" className="bg-foreground text-background px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Discuss Your Retention Problem →
        </a>
      </div>

    </motion.div>
  );
}
