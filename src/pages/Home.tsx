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
    { name: "GoHighLevel CRM Automation", desc: "Workflows, pipelines, tag automations, sub-account management, and API integrations. 184 accounts managed." },
    { name: "AI Automation", desc: "Voice AI routing, agent deployment, workflow automation via Zapier, Make, and n8n." },
    { name: "Full-Stack Development", desc: "Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, Vercel APIs." },
    { name: "Revenue Operations", desc: "Stripe billing logic, A2P 10DLC compliance, HIPAA-aware architecture, Google Ads." }
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
            className="text-[12vw] md:text-[8vw] lg:text-[120px] font-bold leading-[0.85] tracking-tighter text-foreground mb-8 text-balance"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Automation<br />Studio
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-10 md:gap-20 max-w-[900px] mb-12">
            <motion.p variants={heroItem} className="text-base text-muted-foreground leading-relaxed flex-1">
              <strong className="text-foreground font-medium">Ryan Christmas</strong> builds the systems that let agencies and startups scale without adding headcount. CRM automation, AI workflows, full-stack development.
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
              Book a Discovery Call <span className="text-lg leading-none">→</span>
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
      <section className="w-full border-y border-white/10 mb-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
          {[
            { num: 184, label: "Businesses Scaled", suffix: "" },
            { num: 800, label: "SMS Migrations", suffix: "+" },
            { num: 48, label: "Hour Onboarding", suffix: "hr" },
            { num: 99.9, label: "Uptime Guaranteed", suffix: "%", float: true }
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
                {stat.float ? stat.num : <AnimatedNumber target={stat.num} />}{stat.suffix}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
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
              className="group bg-white/[0.03] border border-white/[0.06] p-8 rounded-2xl flex flex-col gap-4 cursor-default hover:bg-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-2">
                <span className="text-lg">{["⚡", "🤖", "💻", "📊"][i]}</span>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              to: "/case-studies/contractors",
              label: "CRM Automation",
              title: "Contractors CRM Network",
              desc: "Automated workflows and centralized snapshot deployment across 184 sub-accounts.",
              metric: "184",
              metricLabel: "Trade Businesses",
              gradient: "from-blue-500/20 via-indigo-500/10 to-transparent"
            },
            {
              to: "/case-studies/healthcare",
              label: "Compliance Infrastructure",
              title: "Medical Compliance Scaling",
              desc: "Automated SMS registration and secure data pipeline routing for HIPAA-aware systems.",
              metric: "800+",
              metricLabel: "Clinics Migrated",
              gradient: "from-emerald-500/20 via-teal-500/10 to-transparent"
            }
          ].map((project, i) => (
            <Link key={i} to={project.to} className="block group">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors duration-300"
              >
                <div className={`p-10 md:p-14 bg-gradient-to-br ${project.gradient}`}>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-6">{project.label}</p>
                  <div className="text-6xl md:text-7xl font-bold tracking-tighter mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {project.metric}
                  </div>
                  <p className="text-sm text-muted-foreground">{project.metricLabel}</p>
                </div>
                <div className="p-8 border-t border-white/[0.06]">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {project.title} <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
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
            className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-12 hover:border-white/[0.16] hover:bg-white/[0.05] transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-end">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-5">April 2026 Performance Recap</p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  April was the month the system started selling.
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  A field note on low churn, SEO upsells, client-specific competitor audits, and the data layer that turned customer success into a revenue operating system.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["0.9%", "30-day churn"],
                  ["114", "active clients"],
                  ["$7.1K", "SEO logged"],
                  ["#6", "leaderboard"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-black/[0.18] border border-white/[0.06] p-5">
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
