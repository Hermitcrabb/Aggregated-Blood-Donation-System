
'use client'
import Link from 'next/link'
import { Droplets, HandHeart } from 'lucide-react'

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Droplets className="text-blood" />
          <span className="font-semibold">BloodConnect</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-blood">Home</Link>
          <Link href="/find-blood" className="hover:text-blood">Find Blood</Link>
          <Link href="/drives" className="hover:text-blood">Blood Drives</Link>
          <Link href="/about" className="hover:text-blood">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="w-12 h-12 rounded-circle bg-darkred text-white flex items-center justify-center shadow hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-darkred"
            aria-label="Log in"
            title="Log in"
          >
            <HandHeart size={20} aria-hidden />
          </Link>
          <Link
            href="/register"
            className="w-12 h-12 rounded-circle border-2 border-blood text-blood bg-white flex items-center justify-center hover:bg-blood/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blood"
            aria-label="Register — Ready to give blood"
            title="Register — Ready to give blood"
          >
            <Droplets size={20} aria-hidden />
          </Link>
        </div>
      </nav>
    </header>
  )
}
