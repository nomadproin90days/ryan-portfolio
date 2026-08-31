import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AnimatedRoutes } from "./App";
import "./index.css";

const SITE = "https://luxetidestudio.com";
const OG_IMAGE = `${SITE}/images/ryan-coast.jpg`;

interface RouteMeta {
  title: string;
  description: string;
}

/** Per-route title (<=60 chars) and description (<=160 chars). */
const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "Luxetide Studio: GHL Automation and AI Workflows",
    description:
      "GHL automation, AI workflows, and full-stack development from Puerto Escondido, Mexico. Systems that scale without headcount.",
  },
  "/case-studies/contractors": {
    title: "Contractors CRM Network Case Study | Luxetide",
    description:
      "How 184 GoHighLevel sub-accounts became one contractor CRM network with shared snapshots, pipelines, and consistent reporting.",
  },
  "/case-studies/healthcare": {
    title: "Healthcare A2P 10DLC Case Study | Luxetide",
    description:
      "A2P 10DLC registration and HIPAA-aware SMS infrastructure for healthcare clients, built for compliant patient messaging at scale.",
  },
  "/case-studies/csm-operations": {
    title: "CSM Operations Case Study | Luxetide Studio",
    description:
      "One customer success manager, six command-line tools: running a 138-account portfolio on automation instead of headcount.",
  },
  "/contact": {
    title: "Contact Luxetide Studio",
    description:
      "Get in touch with Ryan Christmas at Luxetide Studio about GHL automation, AI workflow, and full-stack development work.",
  },
  "/journey": {
    title: "Build Journey | Luxetide Studio",
    description:
      "The projects, systems, and lessons behind Luxetide Studio: a running log of what Ryan Christmas has built and what it taught him.",
  },
  "/blog/april-2026-performance": {
    title: "April 2026 Performance Report | Luxetide Studio",
    description:
      "A month of measured output at Luxetide Studio: what shipped in April 2026, what performed, and what the numbers actually showed.",
  },
  "/transcriber": {
    title: "Free Video Transcriber | Luxetide Studio",
    description:
      "Free browser-based video transcriber. Paste a link and get a clean text transcript you can search, copy, and export.",
  },
  "/instagram-transcript": {
    title: "Instagram Transcript Generator | Luxetide Studio",
    description:
      "Turn any Instagram Reel or video into a clean, searchable text transcript. Free, browser-based, no signup required.",
  },
  "/tiktok-transcript": {
    title: "TikTok Transcript Generator | Luxetide Studio",
    description:
      "Turn any TikTok video into a clean, searchable text transcript. Free, browser-based, no signup required.",
  },
  "/youtube-transcript": {
    title: "YouTube Transcript Generator | Luxetide Studio",
    description:
      "Turn any YouTube video into a clean, searchable text transcript. Free, browser-based, no signup required.",
  },
};

const FALLBACK: RouteMeta = ROUTE_META["/"];

interface PrerenderData {
  url: string;
}

export async function prerender({ url }: PrerenderData) {
  const path = url.replace(/\/+$/, "") || "/";
  const meta = ROUTE_META[path] ?? FALLBACK;
  const canonical = path === "/" ? `${SITE}/` : `${SITE}${path}`;

  const html = renderToString(
    <StaticRouter location={url}>
      <AnimatedRoutes />
    </StaticRouter>,
  );

  return {
    html,
    head: {
      lang: "en",
      title: meta.title,
      elements: new Set([
        { type: "meta", props: { name: "description", content: meta.description } },
        { type: "link", props: { rel: "canonical", href: canonical } },
        { type: "meta", props: { property: "og:title", content: meta.title } },
        { type: "meta", props: { property: "og:description", content: meta.description } },
        { type: "meta", props: { property: "og:url", content: canonical } },
        { type: "meta", props: { property: "og:image", content: OG_IMAGE } },
        { type: "meta", props: { name: "twitter:title", content: meta.title } },
        { type: "meta", props: { name: "twitter:description", content: meta.description } },
      ]),
    },
  };
}
