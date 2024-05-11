import preset from '@readfort/tailwindcss/tailwind.config.js'

module.exports = {
  presets: [preset],
  content: [
    '../../packages/ui/src/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
}
