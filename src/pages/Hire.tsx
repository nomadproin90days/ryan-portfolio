import { motion } from "motion/react";
import { Link } from "react-router";

/**
 * Recruiter-facing page. Deliberately unlisted: no nav link, excluded from
 * sitemap.xml, and served with noindex via the prerender head. The public site
 * sells services; a prospective client should never land on a page that reads
 * as a job application. Send this URL directly on applications instead.
 */
export default function HirePage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col items-center"
    >
      <section className="w-full max-w-[1080px] px-5 md:px-14 pt-32 pb-16">
        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-xs tracking-widest uppercase text-muted-foreground font-semibold mb-4">
          For hiring teams
        </motion.p>
        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible"
          className="text-[10vw] md:text-6xl lg:text-[76px] font-bold tracking-tighter text-foreground mb-8 leading-[0.95]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Ryan Christmas
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
          AI implementation, solutions architecture, and revenue systems. I have carried a
          $44.7K MRR book at 3.4% churn and shipped the software that makes that repeatable —
          sales co-pilots, client portals, and event-driven operations monitors running in production.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div>
            <div className="text-sm font-semibold text-emerald-400 mb-1">Availability</div>
            <div className="text-sm text-muted-foreground">Contract or part-time. Remote, US business hours.</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-emerald-400 mb-1">Work authorisation</div>
            <div className="text-sm text-muted-foreground">Canadian citizen. Mexico permanent resident, authorised to work in Mexico. Not US work-authorised.</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-emerald-400 mb-1">Based</div>
            <div className="text-sm text-muted-foreground">Puerto Escondido, Oaxaca, Mexico.</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link to="/journey" className="bg-foreground text-background font-semibold px-8 py-4 rounded-full text-sm tracking-wide hover:-translate-y-1 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Read the full record →
          </Link>
          <Link to="/case-studies/clarity" className="border border-black/20 dark:border-white/20 font-semibold px-8 py-4 rounded-full text-sm tracking-wide hover:-translate-y-1 transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            What I build now →
          </Link>
        </div>
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

      <section className="w-full max-w-[1080px] px-5 md:px-14 pb-32">
        <p className="text-sm text-muted-foreground">
          Prefer email? <a className="text-foreground underline underline-offset-4" href="mailto:ryan@luxetidestudio.com">ryan@luxetidestudio.com</a>
        </p>
      </section>
    </motion.div>
  );
}
