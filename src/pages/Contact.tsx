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
                  <div>
                     <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Business</span>
                     <a href="mailto:ryan@luxetidestudio.com" className="block text-foreground text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
                        ryan@luxetidestudio.com
                     </a>
                  </div>
                  <div>
                     <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Personal</span>
                     <a href="mailto:iamryanxmas@gmail.com" className="block text-foreground text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
                        iamryanxmas@gmail.com
                     </a>
                  </div>
                  <div>
                     <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">WhatsApp</span>
                     <a href="https://wa.me/16194166678" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-foreground text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#25D366] flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        +1 (619) 416-6678
                     </a>
                  </div>
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
