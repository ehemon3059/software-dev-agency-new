import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevAgency | Custom Software Development for Startups',
  description: 'We build production-ready web applications for service-based businesses. Clean code, scalable architecture, long-term support.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="pt-0">{children}</main>
      </body>
    </html>
  )
}