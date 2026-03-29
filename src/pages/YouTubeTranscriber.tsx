import { useState, useRef } from "react";
import { motion } from "motion/react";
import useHead from "../hooks/useHead";

const API = "https://transcriber-production-a626.up.railway.app";

type Segment = { start: number; end: number; text: string };
type JobResult = {
  id: string;
  status: string;
  message: string;
  platform: string;
  video_info: {
    title: string;
    duration: number;
    uploader: string;
    has_thumbnail: boolean;
    original_url: string;
  } | null;
  result: {
    language: string;
    full_text: string;
    segments: Segment[];
  } | null;
};

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function YouTubeTranscriber() {
    useHead({
    title: "Free YouTube Video & Shorts Transcript Generator | Luxetide Studio",
    description: "Transcribe YouTube Video & Shorts to text instantly. Free, unlimited, no account required. AI-powered YouTube Video & Shorts to text converter.",
    canonical: "https://luxetidestudio.com/youtube-transcript",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "YouTube Video & Shorts Transcript Generator",
      "url": "https://luxetidestudio.com/youtube-transcript",
      "description": "Free AI-powered YouTube Video & Shorts transcription tool. Paste any URL and get accurate text in seconds.",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    },
  });


  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<JobResult | null>(null);
  const [view, setView] = useState<"segments" | "full">("segments");
  const [tab, setTab] = useState<"single" | "upload">("single");
  const fileRef = useRef<HTMLInputElement>(null);

  const pollJob = (jobId: string): Promise<JobResult> => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`${API}/api/status/${jobId}`);
          const job: JobResult = await res.json();
          setStatus(job.message);
          if (job.status === "done") { clearInterval(interval); resolve(job); }
          else if (job.status === "error") { clearInterval(interval); reject(new Error(job.message)); }
        } catch {}
      }, 1200);
    });
  };

  const transcribeSingle = async () => {
    if (!url.trim()) return;
    setLoading(true); setError(""); setResult(null); setStatus("Starting...");
    try {
      const res = await fetch(`${API}/api/transcribe`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const job = await pollJob(data.job_id);
      setResult(job);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally { setLoading(false); setStatus(""); }
  };

  const handleUpload = async (file: File) => {
    setLoading(true); setError(""); setResult(null); setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${API}/api/transcribe/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const job = await pollJob(data.job_id);
      setResult(job);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally { setLoading(false); setStatus(""); }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadFormat = (format: "srt" | "vtt" | "txt") => {
    if (!result?.id) return;
    const url = `${API}/api/export/${result.id}/${format}`;
    window.open(url, "_blank");
  };


  const saveCover = async () => {
    if (!result?.id) return;
    try {
      const res = await fetch(`${API}/api/thumbnail/${result.id}`);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${(result.video_info?.title || "cover").replace(/[^a-z0-9]/gi, "_")}_cover.jpg`;
      a.click();
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[1400px] mx-auto"
    >
      {/* Hero */}
      <div className="text-center py-16 md:py-24 px-5">
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Free Tool</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.9] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          YouTube Video & Shorts Transcript Generator
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
          Transcribe videos from any platform. Free forever, no limits, no accounts required.
        </p>
        <div className="flex gap-2 justify-center mt-6 flex-wrap">
          {["Instagram Reels", "TikTok", "YouTube Shorts", "Twitter/X", "Facebook"].map(p => (
            <span key={p} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-muted border border-border text-xs text-muted-foreground font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-20">
        {/* Tabs */}
        <div className="flex gap-1 justify-center mb-6 bg-muted rounded-full p-1 border border-border max-w-md mx-auto">
          {(["single", "upload"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              {t === "single" ? "Single Video" : "Upload"}
            </button>
          ))}
        </div>

        {/* Single */}
        {tab === "single" && (
          <div>
            <div className="border border-border rounded-xl p-5 mb-4">
              <div className="flex gap-3 items-center flex-col sm:flex-row">
                <input value={url} onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && transcribeSingle()}
                  placeholder="Paste YouTube Video & Shorts URL..."
                  className="flex-1 w-full px-4 py-3.5 rounded-full border border-border bg-muted text-foreground text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50" />
                <button onClick={transcribeSingle} disabled={loading}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-foreground text-background font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-40 disabled:translate-y-0 disabled:shadow-none whitespace-nowrap">
                  {loading ? "Processing..." : "Transcribe"}
                </button>
              </div>
            </div>

            {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm mb-4">{error}</div>}

            {loading && (
              <div className="flex items-center gap-3 p-4 bg-muted border border-border rounded-xl mb-4">
                <div className="w-4 h-4 border-2 border-border border-t-foreground rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">{status}</span>
              </div>
            )}

            {result && (
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-5">
                {/* Thumbnail */}
                <div className="relative rounded-xl overflow-hidden border border-border bg-muted">
                  {result.video_info?.has_thumbnail && (
                    <img src={`${API}/api/thumbnail/${result.id}?t=${Date.now()}`} alt="Video thumbnail"
                      className="w-full aspect-[9/16] object-cover" onError={e => (e.target as HTMLImageElement).style.display = "none"} />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 bg-gradient-to-t from-black/70 to-transparent">
                    <button onClick={saveCover} className="px-4 py-2 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold border border-white/20 hover:bg-white/30 transition-all">
                      Save cover image
                    </button>
                    <button onClick={() => window.open(result.video_info?.original_url, "_blank")}
                      className="px-4 py-2 rounded-full bg-white text-foreground text-xs font-semibold hover:-translate-y-0.5 transition-all">
                      Download video
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm leading-snug line-clamp-2 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {result.video_info?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">{result.video_info?.uploader}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted border border-border text-muted-foreground font-medium capitalize">{result.platform}</span>
                      {result.video_info?.duration ? <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted border border-border text-muted-foreground font-medium">{formatDuration(result.video_info.duration)}</span> : null}
                      {result.result?.language ? <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted border border-border text-muted-foreground font-medium uppercase">{result.result.language}</span> : null}
                    </div>
                  </div>
                </div>

                {/* Transcript */}
                <div className="border border-border rounded-xl flex flex-col max-h-[600px]">
                  <div className="flex items-center gap-2 p-3 border-b border-border flex-wrap">
                    <div className="flex gap-0.5 bg-muted rounded-full p-0.5 border border-border">
                      <button onClick={() => setView("full")} className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${view === "full" ? "bg-foreground text-background" : "text-muted-foreground"}`}>Full Text</button>
                      <button onClick={() => setView("segments")} className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${view === "segments" ? "bg-foreground text-background" : "text-muted-foreground"}`}>Timestamps</button>
                    </div>
                    <div className="flex-1" />
                    <button onClick={() => copyText(result.result?.full_text || "")} title="Copy"
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <div className="flex gap-1 ml-2">
                      <button onClick={() => downloadFormat("srt")} className="px-2.5 py-1.5 rounded-lg border border-border text-[10px] font-bold text-muted-foreground hover:text-foreground hover:border-foreground transition-all">SRT</button>
                      <button onClick={() => downloadFormat("vtt")} className="px-2.5 py-1.5 rounded-lg border border-border text-[10px] font-bold text-muted-foreground hover:text-foreground hover:border-foreground transition-all">VTT</button>
                      <button onClick={() => downloadFormat("txt")} className="px-2.5 py-1.5 rounded-lg border border-border text-[10px] font-bold text-muted-foreground hover:text-foreground hover:border-foreground transition-all">TXT</button>
                    </div>
                  </div>
                  <div className="p-4 overflow-y-auto flex-1">
                    {view === "full" ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.result?.full_text}</p>
                    ) : (
                      <div className="space-y-0">
                        {result.result?.segments.map((s, i) => (
                          <div key={i} className="flex gap-4 py-2.5 border-b border-border last:border-0">
                            <span className="font-mono text-xs text-muted-foreground min-w-[44px] pt-0.5 font-medium">{formatTime(s.start)}</span>
                            <span className="text-sm leading-relaxed">{s.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upload */}
        {tab === "upload" && (
          <div>
            <div className="border border-border rounded-xl p-5 mb-4">
              <div onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-foreground transition-all bg-muted">
                <p className="font-semibold mb-1">Drop a video or audio file here</p>
                <p className="text-sm text-muted-foreground">or click to browse. MP4, MP3, WAV, M4A, WebM supported.</p>
              </div>
              <input ref={fileRef} type="file" className="hidden" accept="video/*,audio/*,.mp4,.mp3,.wav,.m4a,.webm,.ogg"
                onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
            </div>
            {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm mb-4">{error}</div>}
            {loading && (
              <div className="flex items-center gap-3 p-4 bg-muted border border-border rounded-xl mb-4">
                <div className="w-4 h-4 border-2 border-border border-t-foreground rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">{status}</span>
              </div>
            )}
            {result && (
              <div className="border border-border rounded-xl p-4">
                <p className="font-semibold text-sm mb-2">{result.video_info?.title}</p>
                <p className="text-sm whitespace-pre-wrap">{result.result?.full_text}</p>
              </div>
            )}
          </div>
        )}

        {/* How it works */}
        <div className="mt-16 pt-16 border-t border-border">
          <h2 className="text-center text-2xl font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { n: "1", title: "Paste a URL", desc: "From Instagram, TikTok, YouTube, Twitter, or any platform" },
              { n: "2", title: "We extract audio", desc: "Video is downloaded and audio is extracted automatically" },
              { n: "3", title: "AI transcribes", desc: "Whisper AI converts speech to text with timestamps" },
            ].map(s => (
              <div key={s.n} className="border border-border rounded-xl p-8 text-center hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center font-bold mx-auto mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.n}</div>
                <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Claude badge */}
        <div className="flex justify-center mt-12">
          <a href="https://claude.ai/referral/VIVK8NoJOw" target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm text-muted-foreground font-medium hover:border-foreground hover:text-foreground hover:-translate-y-0.5 hover:shadow-md transition-all no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#D4A574" opacity="0.15"/><path d="M15.5 8.5L10 14l-2.5-2.5" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Built with Claude Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}
