import { motion } from "motion/react";
import { Link } from "react-router";

export default function ClarityPage() {
  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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
        Sales Co-pilot &amp; Client Portal
      </motion.h1>

      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="w-full aspect-[21/9] bg-muted mb-20 rounded-[2rem] overflow-hidden"
      >
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-12 text-center">
          <h3 className="text-4xl md:text-6xl font-bold mb-4 text-foreground/20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3 Systems In Production</h3>
        </div>
      </motion.div>

      <section className="w-full flex justify-between gap-12 flex-col md:flex-row mb-32 border-b border-border pb-10">
        <div className="w-full max-w-[200px]">
          <p className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">Overview</p>
          <p className="text-muted-foreground text-sm font-medium">Residential Construction &amp; Remodelling</p>
        </div>
        <div className="flex-1 max-w-[600px] text-lg text-foreground/80 leading-relaxed font-medium">
          <p>A remodelling firm was losing the detail between the sales call and the job site. Every scope of work was written by hand from memory, and nothing tracked whether what was promised on the call matched what got built. Three systems now run that loop in production.</p>
        </div>
      </section>

      {[
        {
          title: "The Problem",
          desc: "Sales conversations were recorded but never processed. Writing a scope of work meant a rep listening back through an hour of audio, and estimates drifted between reps because nothing enforced a shared pricing structure. Operations ran on a group chat with no memory, so an open item could be raised on Monday and re-raised, unresolved, six days later — no one could tell the difference between a thing being handled and a thing being forgotten."
        },
        {
          title: "The Co-pilot",
          desc: "A recorded sales call goes in; a scope of work, an estimate, a follow-up email, and a per-rep call score come out. The pricing bands, contract clauses and rep checklists live in a per-customer configuration rather than in the prompt, so the same engine serves a different company by swapping a config file. A deterministic scope checker and a permit-compliance guard run over every generated document, so nothing goes to a client claiming work that would need a permit it does not name."
        },
        {
          title: "The Portal",
          desc: "A Next.js and Supabase application, live on its own domain, giving the owner a single control surface over the generated documents and the underlying records. Deployment and rollback are both documented procedures — rollback is an alias move onto a build that already exists, so recovery takes seconds rather than a rebuild."
        },
        {
          title: "The Operations Monitor",
          desc: "An event-driven service that turns an unstructured team chat into scheduled briefs. It verifies each brief actually arrived rather than assuming a send succeeded, resends once when delivery fails, and runs a preflight check ten minutes before each scheduled send so a failure surfaces before the brief is due rather than after it is missed."
        },
        {
          title: "The Architecture",
          desc: "Built engine-versus-config from the first commit: the engine is identical for every customer, and brand, pricing, clauses and checklists are per-customer configuration. Nothing hardcodes the client. That decision is what makes the system an asset the owner can resell to other firms rather than a one-off build, and it was made before a single line of customer-specific logic existed."
        }
      ].map((section, idx) => (
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

      <div className="w-full pt-20 flex justify-center mt-10">
        <Link to="/contact" className="bg-foreground text-background px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Start a conversation →
        </Link>
      </div>

    </motion.div>
  );
}
