
'use client'
import { useEffect, useState } from 'react'

type BloodRequest = {
  id: string
  bloodType: 'A'|'B'|'AB'|'O'
  rh: '+'|'-'
  units: number
  lat: number
  lng: number
  createdAt: string
}

export default function RequestsNearYou() {
  const [data, setData] = useState<BloodRequest[]|null>(null)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/requests', { headers: { 'x-correlation-id': crypto.randomUUID() } })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (e: any) {
        if (!cancelled) setError(e.message)
      }
    })()
    return () => { cancelled = true }
  }, [])

  if (error) return <div className="text-red-600">Failed to load: {error}</div>
  if (!data) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({length: 6}).map((_,i)=> (
        <div key={i} className="h-28 rounded-lg bg-neutral-100 animate-pulse" />
      ))}
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((r) => (
        <article key={r.id} className="rounded-lg border p-4 hover:shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{r.bloodType}{r.rh}</h3>
            <span className="text-sm text-neutral-600">{new Date(r.createdAt).toLocaleString()}</span>
          </div>
          <p className="mt-1 text-sm text-neutral-700">Units needed: {r.units}</p>
          <a href={`/requests/${r.id}`} className="inline-block mt-3 text-blood underline">View details</a>
        </article>
      ))}
    </div>
  )
}
