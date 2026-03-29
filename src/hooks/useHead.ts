import { useEffect } from "react";

interface HeadProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schema?: object;
}

function setMeta(property: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.content = content;
}

export default function useHead({ title, description, canonical, ogTitle, ogDescription, ogImage, schema }: HeadProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("robots", "index, follow");

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    // Open Graph
    setMeta("og:title", ogTitle || title, true);
    setMeta("og:description", ogDescription || description, true);
    setMeta("og:url", canonical, true);
    if (ogImage) setMeta("og:image", ogImage, true);

    // Twitter
    setMeta("twitter:title", ogTitle || title);
    setMeta("twitter:description", ogDescription || description);

    // JSON-LD schema
    let scriptEl = document.querySelector('script[data-page-schema]') as HTMLScriptElement | null;
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.type = "application/ld+json";
        scriptEl.setAttribute("data-page-schema", "true");
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    }

    return () => {
      if (scriptEl) scriptEl.remove();
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, schema]);
}
