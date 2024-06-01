import { ReactNode } from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@readfort/tailwindcss/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Readfort - Read, Highlight, Reflect',
  description: 'Read books, highlight text and reflect on your reading',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
