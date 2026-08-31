import { motion } from "motion/react";
import { Link } from "react-router";
import useHead from "../../hooks/useHead";

const metrics = [
  { value: "3.4%", label: "monthly churn", detail: "2 churns across 138 clients. Company avg: 6.3%" },
  { value: "138", label: "active clients", detail: "largest book in the company by client count" },
  { value: "$8,009", label: "commission generated", detail: "#1 on the leaderboard. Nearly 2x the next closest CSM" },
  { value: "#1", label: "CSM leaderboard", detail: "#1 in MRR, upsells, and total commission" },
];

const wins = [
  {
    title: "Turned client data into an upsell system",
    body: "April started with scattered signals: client audits, Gmail threads, GHL conversations, competitor screenshots, ranking reports, and billing history. The win was turning those signals into a repeatable sales motion. I used competitor gaps, local search data, and client-specific buying signals to create short, direct SEO offers that set meetings or asked for approval."
  },
  {
    title: "Built a stronger ranking-service pipeline",
    body: "The strongest opportunities came from clients who already wanted more leads but were buried locally. A painting company, a law firm, a plumbing company, a tree and landscape company, a paving company, and other accounts became part of a sharper SEO pipeline built around top-3 local ranking, competitor proof, and a 90-day guarantee."
  },
  {
    title: "Protected retention while selling expansion",
    body: "The month was not just selling. I worked billing-risk and churn-risk situations, including a contracting company and an HVAC company, while avoiding the trap of pitching expansion into unresolved service pain. The operating rule was simple: stabilize trust first, then talk growth."
  },
  {
    title: "Synced the operating layer",
    body: "I updated the local Supabase client layer with Ryan Grant customer data from the CS Platform, normalizing 143 matched customer records and giving the internal tooling a cleaner source for client prioritization, outreach, and churn visibility."
  },
];

export default function April2026Performance() {
  useHead({
    title: "April 2026 Performance Recap | Ryan Christmas",
    description:
      "A monthly performance recap covering churn, SEO upsells, client operations, and system improvements across a large customer success portfolio.",
    canonical: "https://luxetidestudio.com/blog/april-2026-performance",
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "April 2026 Performance Recap",
      datePublished: "2026-04-29",
      author: {
        "@type": "Person",
        name: "Ryan Christmas",
      },
      publisher: {
        "@type": "Organization",
        name: "Luxetide Studio",
      },
      description:
        "A monthly performance recap covering churn, SEO upsells, client operations, and system improvements across a large customer success portfolio.",
    },
  });

  const slideUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-[1080px] mx-auto px-5 md:px-14 pt-28 pb-24"
    >
      <Link to="/#writing" className="text-sm font-medium text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2">
        ← Back to writing
      </Link>

      <motion.p
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="text-sm tracking-widest uppercase text-muted-foreground font-semibold mb-5"
      >
        Monthly Performance
      </motion.p>

      <motion.h1
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="text-[12vw] md:text-7xl lg:text-[96px] font-bold tracking-tighter leading-[0.9] mb-8 text-balance"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        #1 across every metric. Here's how.
      </motion.h1>

      <motion.p
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-14"
      >
        April ended with #1 on the company leaderboard: highest MRR ($44.7K), most upsells (5), and most commission generated ($8,009). Managing 138 active clients, the largest book in the company, with a 3.4% churn rate against a company average of 6.3%.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-20"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-border bg-black/[0.02] dark:bg-white/[0.03] p-6">
            <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {metric.value}
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">{metric.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{metric.detail}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 mb-20 border-y border-border py-12">
        <aside>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">Snapshot</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            April 2026. Large-book CSM operations, SEO expansion, churn control, and internal automation.
          </p>
        </aside>
        <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
          <p>
            The leaderboard data at month end: <strong className="text-foreground">3.4% 30-day churn</strong> with 138 active clients and <strong className="text-foreground">$44.7K MRR under management</strong>, the highest in the company. Holding churn below the company average (6.3%) with the largest portfolio is a different operating problem than doing it with 20-30 accounts.
          </p>
          <p>
            April was also the strongest expansion month. 5 upsells closed, <strong className="text-foreground">$8,009 in commission generated</strong>, nearly double the next closest CSM ($6,247). The approach: find clients with a verified Google foundation, prove the local ranking gap with a competitor audit, and give them a clean next step. No hard pitches. Data-driven offers that set meetings or got approval on the call.
          </p>
        </div>
      </div>

      <section className="mb-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">What Changed</p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          From reactive support to revenue operations
        </h2>
        <div className="space-y-10">
          {wins.map((win, index) => (
            <motion.div
              key={win.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 border-t border-border pt-8"
            >
              <div className="text-3xl font-bold tracking-tighter text-muted-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {win.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{win.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-foreground text-background p-8 md:p-12">
        <p className="text-xs uppercase tracking-widest text-background/60 font-semibold mb-5">Takeaway</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          The best CSM work compounds.
        </h2>
        <p className="text-lg text-background/75 leading-relaxed max-w-3xl">
          Every client conversation, audit, billing save, ranking report, and spreadsheet row becomes more useful when it is captured and turned into the next action. April proved the model: lower churn, cleaner data, sharper upsells, and faster movement from signal to revenue.
        </p>
      </section>
    </motion.article>
  );
}
