import { motion } from "motion/react";
import { Link } from "react-router";

export default function HealthcarePage() {
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
        Medical Compliance Scaling
      </motion.h1>

      <motion.div 
        variants={slideUp} 
        initial="hidden" 
        animate="visible"
        className="w-full aspect-[21/9] bg-muted mb-20 rounded-[2rem] overflow-hidden"
      >
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-12 text-center">
            <h3 className="text-4xl md:text-6xl font-bold mb-4 text-foreground/20" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A2P 10DLC Infrastructure</h3>
        </div>
      </motion.div>

      <section className="w-full flex justify-between gap-12 flex-col md:flex-row mb-32 border-b border-border pb-10">
         <div className="w-full max-w-[200px]">
            <p className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">Overview</p>
            <p className="text-muted-foreground text-sm font-medium">Healthcare Startup Platform</p>
         </div>
         <div className="flex-1 max-w-[600px] text-lg text-foreground/80 leading-relaxed font-medium">
            <p>Solving the strict carrier compliance issue for automated medical SMS alerts while maintaining HIPAA-aware architecture. We unblocked high-volume traffic limits for 800+ clients.</p>
         </div>
      </section>

      {/* Structured Content Sections */}
      {[
        { 
          title: "The Problem", 
          desc: "Carriers globally have aggressively tightened SMS filtering under A2P 10DLC. The client, a medical communications company, was experiencing 60% failure rates on critical appointment remiders because their traffic was flagged as automated spam."
        },
        { 
          title: "The Solution", 
          desc: "We rebuilt their registration pipeline by establishing verified brand relationships and distinct campaign use cases per sub-account. The infrastructure was migrated to support segregated messaging pools, guaranteeing HIPAA separation while fully registering each number."
        },
        { 
          title: "The Results", 
          desc: "Successfully unblocked 800+ clinic sub-accounts. The message delivery rate rose from under 40% to 99.9%. SMS marketing and direct medical communications operate securely, natively, and automatically without constant blocklist threats."
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
         <a href="https://link.msgsndr.com/widget/booking/Ti4Dt85I47B5xG3rPUDJ" target="_blank" rel="noreferrer" className="bg-foreground text-background px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Discuss Your Scaling Challenges →
         </a>
      </div>

    </motion.div>
  );
}
