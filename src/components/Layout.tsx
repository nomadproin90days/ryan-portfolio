import { Outlet, Link } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-5 md:px-14 h-16 flex items-center justify-between bg-white/85 dark:bg-black/85 backdrop-blur-xl border-b border-black/5 dark:border-white/5 transition-colors">
        <Link to="/" className="font-sans text-base font-semibold tracking-tight text-foreground no-underline" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Luxetide Studio
        </Link>
        
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-7 list-none m-0 p-0">
            <li><a href="/#projects" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">Projects</a></li>
            <li><a href="/#writing" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">Writing</a></li>
            <li><a href="/#process" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">Process</a></li>
            <li><a href="/#about" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">About</a></li>
            <li><a href="/transcriber" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors tracking-wide">Free Transcriber Tool</a></li>
          </ul>
          <Link to="/contact" className="hidden md:inline-flex text-xs font-medium text-primary-foreground bg-primary px-5 py-2.5 rounded-full hover:-translate-y-[1px] hover:shadow-lg transition-all tracking-wide">
            Get in touch
          </Link>
          <button 
            className="md:hidden flex flex-col gap-[5px] p-2 z-50 bg-transparent border-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-foreground transition-transform ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-foreground transition-transform ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 bg-white/97 dark:bg-black/97 backdrop-blur-xl border-b border-border z-40 flex flex-col px-5 py-6 gap-5 md:hidden"
          >
            <a href="/#projects" onClick={() => setMenuOpen(false)} className="text-base text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="/#writing" onClick={() => setMenuOpen(false)} className="text-base text-muted-foreground hover:text-foreground transition-colors">Writing</a>
            <a href="/#process" onClick={() => setMenuOpen(false)} className="text-base text-muted-foreground hover:text-foreground transition-colors">Process</a>
            <a href="/#about" onClick={() => setMenuOpen(false)} className="text-base text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="/transcriber" onClick={() => setMenuOpen(false)} className="text-base text-muted-foreground hover:text-foreground transition-colors">Free Transcriber Tool</a>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-base text-primary font-medium mt-2">Get in touch →</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full flex-1 flex flex-col pb-20 pt-16 mt-0">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[1400px] border-t border-border px-5 md:px-14 py-10 flex flex-col md:flex-row justify-between items-center gap-6 mt-auto">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Luxetide Studio. All rights reserved.</span>
          <div className="flex gap-3 mt-1">
            <Link to="/instagram-transcript" className="text-[10px] text-muted-foreground/60 hover:text-foreground transition-colors uppercase tracking-wider font-semibold">Instagram</Link>
            <Link to="/tiktok-transcript" className="text-[10px] text-muted-foreground/60 hover:text-foreground transition-colors uppercase tracking-wider font-semibold">TikTok</Link>
            <Link to="/youtube-transcript" className="text-[10px] text-muted-foreground/60 hover:text-foreground transition-colors uppercase tracking-wider font-semibold">YouTube</Link>
          </div>
        </div>

        <div className="flex gap-6">
          <a href="https://linkedin.com/in/ryanxmas" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
          <a href="https://github.com/nomadproin90days" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
          <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
