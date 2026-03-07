import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'papatiger.tech | Custom Software Development & Scalable Web Solutions',
  description: 'papatiger.tech builds production-ready web applications, SaaS platforms, and enterprise software solutions. We specialize in scalable architecture, clean code, and long-term technical partnership for startups and growing businesses.',
  keywords: [
    'papatiger.tech',
    'custom software development',
    'SaaS development',
    'web application development',
    'enterprise software',
    'Next.js development',
    'startup software partner'
  ],
  authors: [{ name: 'papatiger.tech' }],
  openGraph: {
    title: 'papatiger.tech | Custom Software Development',
    description: 'Production-ready SaaS and web applications built with scalable architecture and clean engineering standards.',
    url: 'https://papatiger.tech',
    siteName: 'papatiger.tech',
    type: 'website',
  },
}

import LiveChat from "@/components/LiveChat";

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
        <LiveChat />
      </body>
    </html>
  )
}