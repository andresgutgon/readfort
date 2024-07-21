/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      "$": path.resolve(__dirname, './src'),
      "$ui": path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  test: {
    globals: true,
    testTimeout: 5000,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    include: ['./src/**/*.test.ts'],
  },
})
