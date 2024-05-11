import preset from '@readfort/tailwindcss/tailwind.config.js'

export default {
  presets: [preset],
  content: [
    './node_modules/@readfort/ui/src/**/*.tsx',
    './node_modules/@readfort/ui/src/**/*.ts',
    './src/**/*.ts',
    './src/**/*.tsx',
    './kindle-online/**/*.ts',
    './kindle-online/**/*.tsx',
  ],
}
