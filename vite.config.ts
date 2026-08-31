import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

// vite-prerender-plugin keeps the event loop alive after writing dist, so
// `vite build` never exits and CI deploys hang. Everything is flushed by the
// time closeBundle finishes, so exit explicitly. Build-only: this hook does
// not run for `vite dev` or `vite preview`.
const forceExitAfterBuild = {
  name: 'force-exit-after-build',
  apply: 'build' as const,
  closeBundle: {
    sequential: true,
    order: 'post' as const,
    handler() {
      setTimeout(() => process.exit(0), 250).unref()
    },
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve(__dirname, 'src/prerender.tsx'),
      additionalPrerenderRoutes: [
        '/',
        '/case-studies/contractors',
        '/case-studies/healthcare',
        '/case-studies/csm-operations',
        '/contact',
        '/journey',
        '/blog/april-2026-performance',
        '/transcriber',
        '/instagram-transcript',
        '/tiktok-transcript',
        '/youtube-transcript',
      ],
    }),
    forceExitAfterBuild,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
