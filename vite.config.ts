import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

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
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
