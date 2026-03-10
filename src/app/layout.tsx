import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

import { GeistSans } from 'geist/font/sans'

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
 icons: {
  icon: [
    { url: "/favicon.ico" }, // Main fallback
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  ],
  shortcut: "/favicon-16x16.png",
  apple: "/favicon-32x32.png", // Next.js will use this for Apple devices
},
}

import LiveChat from "@/components/LiveChat";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.className}`}>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="pt-0">{children}</main>
        <LiveChat />
      </body>
    </html>
  )
}