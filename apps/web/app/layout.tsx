
import './globals.css'
import type { ReactNode } from 'react'

export const metadata = { title: 'Aggregated Blood Donation System', description: 'Donate blood. Save lives.' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#111]">{children}</body>
    </html>
  )
}
