import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import manifest from './manifest.json' assert { type: 'json' }

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: [
      {
        find: '$ui',
        replacement: path.resolve(__dirname, '../../packages/ui/src'),
      },
      {
        find: '$',
        replacement: path.resolve(__dirname, './kindle-online/src'),
      },
      { find: '$base', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  build: {
    chunkSizeWarningLimit: 700,
    sourcemap: 'inline',
    rollupOptions: {
      output:
        mode === 'production'
          ? {
              manualChunks: {
                vendor: ['react', 'react-dom', 'lucide-react'],
                tooling: ['zod', '@tanstack/react-query'],
              },
            }
          : {},
    },
  },
}))
