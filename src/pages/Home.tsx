import { motion, useScroll, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";

// Components
const AnimatedNumber = ({ target }: { target: number }) => {
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
          // easeOutExpo
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

  return <span ref={ref}>{count}</span>;
};

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);

  const heroStaggerContainer: Variants = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
  };
  const heroItem: Variants = { 
    hidden: { opacity: 0, y: 20 }, 
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } } 
  };

  const services = [
    { name: "Revenue Systems", desc: "Retention programmes, upsell engines, churn forecasting, and the reporting that makes revenue predictable instead of anecdotal." },
    { name: "AI Implementation", desc: "Sales co-pilots, autonomous agents, and transcript-to-document pipelines built on Claude and OpenAI. Shipped to production, not demos." },
    { name: "Production Software", desc: "Next.js, React, TypeScript, Supabase, PostgreSQL. Client portals, dashboards, and event-driven monitors that run unattended." },
    { name: "CRM & Compliance", desc: "GoHighLevel at scale, A2P 10DLC registration, HIPAA-aware architecture, Google Business Profile and local SEO." }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col items-center"
    >
      {/* Hero Section */}
      <section className="w-full max-w-[1400px] px-5 md:px-14 pt-[20vh] pb-10 flex flex-col items-start min-h-[70vh]">
        <motion.div 
          className="text-left max-w-5xl"
          variants={heroStaggerContainer} 
          initial="hidden" 
          animate="visible"
        >
          <motion.h1 
            variants={heroItem}
            className="text-[10vw] md:text-[6.5vw] lg:text-[88px] font-bold leading-[0.9] tracking-tighter text-foreground mb-8 text-balance"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            I&apos;ve run the book<br />and built the system.
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-10 md:gap-20 max-w-[900px] mb-12">
            <motion.p variants={heroItem} className="text-base text-muted-foreground leading-relaxed flex-1">
              <strong className="text-foreground font-medium">Ryan Christmas</strong> builds revenue operations for service businesses — retention, automation, and the software underneath. 138 accounts at 3.4% churn, then the systems that made it repeatable.
            </motion.p>
            <motion.p variants={heroItem} className="text-base text-muted-foreground leading-relaxed flex-1">
              Based in <strong className="text-foreground font-medium">Puerto Escondido, Oaxaca</strong>. Originally from Toronto, Canada. Working remotely across time zones since 2023.
            </motion.p>
          </div>
          <motion.div variants={heroItem}>
            <a
              href="https://link.msgsndr.com/widget/booking/Ti4Dt85I47B5xG3rPUDJ"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black font-semibold px-8 py-4 rounded-full text-sm tracking-wide transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Start a conversation <span className="text-lg leading-none">→</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Hero Image Parallax */}
      <div className="w-full max-w-[1400px] px-5 md:px-14 mb-20 overflow-hidden relative">
        <div className="w-full aspect-video md:aspect-[16/7] rounded-2xl md:rounded-[2rem] overflow-hidden relative" style={{ backgroundColor: "#111" }}>
          <motion.img 
            style={{ y, opacity }}
            src="/images/ryan-coast.jpg" 
            alt="Ryan Christmas on the coast of Puerto Escondido" 
            className="w-full h-[130%] object-cover object-center absolute top-[-15%]"
            fetchPriority="high"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/60 to-transparent flex justify-between items-end">
            <span className="text-white/90 text-sm md:text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Puerto Escondido, Oaxaca, MX</span>
            <span className="flex items-center gap-2 text-emerald-400 font-medium text-xs md:text-sm shadow-emerald-400 drop-shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
              Available for contract
            </span>
          </div>
        </div>
      </div>

      {/* Results Strip */}
      <section className="w-full border-y border-black/10 dark:border-white/10 mb-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-14 pt-6">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Stone Systems &middot; 2025&ndash;26
          </p>
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/10 dark:divide-white/10">
          {[
            { num: 138, label: "Clients Managed", suffix: "" },
            { num: 44.7, label: "MRR Under Mgmt", suffix: "K", prefix: "$", float: true },
            { num: 3.4, label: "Monthly Churn", suffix: "%", float: true },
            { num: 1, label: "Leaderboard Rank", suffix: "", prefix: "#" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="p-8 md:p-12 text-center flex flex-col items-center justify-center"
            >
              <div
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {stat.prefix || ""}{stat.float ? stat.num : <AnimatedNumber target={stat.num} />}{stat.suffix}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="w-full max-w-[1400px] px-5 md:px-14 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Testimonial</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            In Their Words
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[340px] mx-auto lg:mx-0"
          >
            <video
              controls
              preload="none"
              playsInline
              poster="/images/nico-testimonial-poster.jpg"
              className="w-full aspect-[9/16] rounded-2xl border border-black/10 dark:border-white/[0.08] bg-black object-cover"
            >
              <source src="/video/nico-testimonial.mp4" type="video/mp4" />
              <track
                kind="captions"
                src="/video/nico-testimonial.vtt"
                srcLang="en"
                label="English"
                default
              />
            </video>
            <p className="text-xs text-muted-foreground mt-3 text-center lg:text-left">
              55 seconds &middot; captions available
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-2xl border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-8 md:p-12"
            >
              <p
                className="text-2xl md:text-4xl font-bold tracking-tighter leading-[1.15] text-balance mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                &ldquo;I worked with Ryan Christmas for about two and a half months as my CSM, and cannot recommend this guy enough.&rdquo;
              </p>
              <footer className="flex flex-col gap-1">
                <cite className="not-italic text-sm font-semibold text-foreground">Niccolo &ldquo;Nico&rdquo; Defendi Cho</cite>
                <span className="text-sm text-muted-foreground">Owner, Launch Pros LLC</span>
              </footer>
            </motion.blockquote>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  quote: "He really had diligent follow-up. Got me multiple testimonials, hopped on multiple Zoom calls, quelled multiple issues.",
                  label: "Follow-through"
                },
                {
                  quote: "He really understood the construction industry as well — so that means, you know, any sort of contractor.",
                  label: "Domain fluency"
                },
                {
                  quote: "I mentioned some sort of CRM that he knew, and that instantly creates rapport. With a CSM, that's very important.",
                  label: "Technical credibility"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  className="rounded-2xl border border-black/10 dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] p-6 flex flex-col gap-3"
                >
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">{item.label}</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="w-full max-w-[1400px] px-5 md:px-14 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">What I Do</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Capabilities</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.06] p-8 rounded-2xl flex flex-col gap-4 cursor-default hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:border-black/20 dark:hover:border-white/[0.12] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-black/[0.05] dark:bg-white/[0.06] flex items-center justify-center mb-2">
                <span className="text-lg">{["📈", "🤖", "💻", "⚙️"][i]}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {service.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Studies Preview */}
      <section id="projects" className="w-full max-w-[1400px] px-5 md:px-14 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Case Studies</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Systems That Scale
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              to: "/case-studies/clarity",
              label: "AI Implementation",
              title: "Sales Co-pilot & Client Portal",
              desc: "For a residential construction and remodelling firm: recorded sales calls turned into scopes of work, estimates and rep scoring, plus a live client portal and an event-driven operations monitor.",
              metric: "3",
              metricLabel: "Systems In Production",
              gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
              external: false
            },
            {
              to: "/case-studies/contractors",
              label: "CRM Automation",
              title: "Contractors CRM Network",
              desc: "Automated workflows and centralized snapshot deployment across 184 sub-accounts.",
              metric: "184",
              metricLabel: "Trade Businesses",
              gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
              external: false
            },
            {
              to: "/case-studies/healthcare",
              label: "Compliance Infrastructure",
              title: "Medical Compliance Scaling",
              desc: "Automated SMS registration and secure data pipeline routing for HIPAA-aware systems.",
              metric: "800+",
              metricLabel: "Clinics Migrated",
              gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
              external: false
            },
            {
              to: "/case-studies/csm-operations",
              label: "Retention & Expansion Ops",
              title: "Client Success Ops, Automated",
              desc: "A contract CSM engagement rebuilt as a command-line system: preflight health checks, multi-account inbox triage, dashboard scraping and logging, and a single-SKU upsell engine.",
              metric: "6",
              metricLabel: "Ops CLIs Shipped",
              gradient: "from-rose-500/20 via-amber-500/10 to-transparent",
              external: false
            },
            {
              to: "https://gbp-sop-deploy.vercel.app",
              label: "Operations SOP",
              title: "Google Business Profile Fix SOP",
              desc: "Authored the company-wide standard operating procedure for GBP verification, suspension appeals, and video verification. Adopted by leadership and used across all CSM teams.",
              metric: "100+",
              metricLabel: "Profiles Processed",
              gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
              external: true
            }
          ].map((project, i) => {
            const Wrapper = project.external
              ? ({ children, className }: { children: React.ReactNode; className: string }) => <a href={project.to} target="_blank" rel="noreferrer" className={className}>{children}</a>
              : ({ children, className }: { children: React.ReactNode; className: string }) => <Link to={project.to} className={className}>{children}</Link>;
            return (
              <Wrapper key={i} className="block group">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full h-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/[0.12] transition-colors duration-300"
                >
                  <div className={`p-10 md:p-14 bg-gradient-to-br ${project.gradient}`}>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">{project.label}</p>
                    <div className="text-6xl md:text-7xl font-bold tracking-tighter mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {project.metric}
                    </div>
                    <p className="text-sm text-muted-foreground">{project.metricLabel}</p>
                  </div>
                  <div className="p-8 border-t border-black/10 dark:border-white/[0.06]">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {project.title} <span className="inline-block group-hover:translate-x-1 transition-transform">{project.external ? "↗" : "→"}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                  </div>
                </motion.div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Writing Preview */}
      <section id="writing" className="w-full max-w-[1400px] px-5 md:px-14 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Writing</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Operating Notes
          </h2>
        </motion.div>

        <Link to="/blog/april-2026-performance" className="block group">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            whileHover={{ scale: 1.01, y: -3 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl border border-black/10 dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] p-8 md:p-12 hover:border-black/20 dark:hover:border-white/[0.16] hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-end">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-5">April 2026 Performance Recap</p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  #1 across every metric. Here's how.
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  A field note on hitting #1 in churn, revenue, upsells, and MRR while managing the largest client book in the company. The data layer that turned customer success into a revenue operating system.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["3.4%", "monthly churn"],
                  ["138", "active clients"],
                  ["$8K", "commission"],
                  ["#1", "leaderboard"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-black/[0.05] dark:bg-black/[0.18] border border-black/10 dark:border-white/[0.06] p-5">
                    <div className="text-3xl font-bold tracking-tighter mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
              Read the recap →
            </div>
          </motion.article>
        </Link>
      </section>

      {/* CTA Bottom */}
      <section className="w-full px-5 md:px-14 py-32 bg-foreground text-background text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8 max-w-5xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Let's Build It.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-background/70 max-w-lg mb-12"
        >
          Stop losing hours to manual ops. Build a scalable system that handles the heavy lifting for you.
        </motion.p>
        <motion.a 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          href="https://link.msgsndr.com/widget/booking/Ti4Dt85I47B5xG3rPUDJ"
          target="_blank"
          rel="noreferrer"
          className="bg-background text-foreground font-semibold px-10 py-5 rounded-full text-lg tracking-tight hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Book a Discovery Call
        </motion.a>
      </section>
    </motion.div>
  );
}
