import { motion } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-[1200px] mx-auto px-5 md:px-14 pt-32 pb-20 flex flex-col items-start min-h-[70vh]"
    >
      <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground mb-12 flex items-center gap-2">
        ← Back Home
      </Link>

      <motion.p variants={slideUp} initial="hidden" animate="visible" className="text-sm tracking-widest uppercase text-muted-foreground font-semibold mb-4">
        Contact
      </motion.p>
      
      <motion.h1 
        variants={slideUp} 
        initial="hidden" 
        animate="visible"
        className="text-[12vw] md:text-7xl lg:text-[100px] font-bold tracking-tighter text-foreground mb-12 leading-[0.9]"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Let's Talk.
      </motion.h1>

      <motion.div 
        variants={slideUp} 
        initial="hidden" 
        animate="visible"
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24"
      >
         {/* Left Col: Info & Form */}
         <div className="flex flex-col gap-12">
            <div>
               <p className="text-lg text-muted-foreground mb-8">
                  Whether you're looking to automate CRM workflows, deploy internal AI agents, or rescue an infrastructure from failing under scale, I build the systems that do the heavy lifting.
               </p>
               
               <div className="flex flex-col gap-4">
                  <a href="mailto:ryan@luxetidestudio.com" className="text-foreground text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
                     ryan@luxetidestudio.com
                  </a>
                  <a href="tel:+16194166678" className="text-foreground text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
                     +1 619 416 6678
                  </a>
                  <a href="https://wa.me/16194166678" target="_blank" rel="noreferrer" className="text-muted-foreground text-base font-medium tracking-tight hover:opacity-70 transition-opacity">
                     Or message on WhatsApp →
                  </a>
               </div>
            </div>

            <form
              className="flex flex-col gap-6 w-full max-w-[500px]"
              onSubmit={async (e) => {
                e.preventDefault();
                if (formState === "submitting") return;
                setFormState("submitting");
                const form = e.currentTarget;
                const formData = new FormData(form);
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: formData.get("name"),
                      email: formData.get("email"),
                      message: formData.get("message"),
                    }),
                  });
                  if (res.ok) {
                    setFormState("success");
                    form.reset();
                  } else {
                    setFormState("error");
                  }
                } catch {
                  setFormState("error");
                }
              }}
            >
               <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold tracking-wide text-foreground">Name</label>
                  <input type="text" id="name" name="name" required className="border-b border-border bg-transparent pb-3 pt-2 text-foreground focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50" placeholder="John Doe" />
               </div>
               <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold tracking-wide text-foreground">Email</label>
                  <input type="email" id="email" name="email" required className="border-b border-border bg-transparent pb-3 pt-2 text-foreground focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50" placeholder="john@example.com" />
               </div>
               <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold tracking-wide text-foreground">Message</label>
                  <textarea id="message" name="message" rows={4} className="border-b border-border bg-transparent pb-3 pt-2 text-foreground focus:outline-none focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground/50" placeholder="Tell me about your system constraints..." />
               </div>
               {formState === "success" ? (
                 <p className="text-emerald-400 font-medium py-4">Message sent — I'll be in touch shortly.</p>
               ) : (
                 <button
                   type="submit"
                   disabled={formState === "submitting"}
                   className="bg-foreground text-background font-semibold py-4 w-full md:w-auto rounded-full hover:shadow-xl hover:-translate-y-1 transition-all flex justify-center items-center gap-2 max-w-[200px] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {formState === "submitting" ? "Sending..." : "Send Message →"}
                 </button>
               )}
               {formState === "error" && (
                 <p className="text-red-400 text-sm">Something went wrong. Try emailing directly.</p>
               )}
            </form>
         </div>

         {/* Right Col: Booking iframe */}
         <div className="w-full flex flex-col bg-muted/30 border border-border/50 rounded-[2rem] p-4 h-full min-h-[600px] lg:min-h-[800px] shadow-sm">
            <h3 className="text-xl font-bold p-6 pb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Directly on the schedule</h3>
            <p className="text-sm text-muted-foreground px-6 pb-6">Book a 30-minute discovery call below.</p>
            <div className="flex-1 w-full rounded-2xl overflow-hidden bg-background">
               <iframe 
                 src="https://link.msgsndr.com/widget/booking/Ti4Dt85I47B5xG3rPUDJ" 
                 title="Booking Calendar" 
                 className="w-full h-full border-none min-h-[600px]"
                 scrolling="yes"
               />
            </div>
         </div>
      </motion.div>
    </motion.div>
  );
}
