
import NavBar from '@/components/NavBar'
import RequestsNearYou from '@/components/RequestsNearYou'

export default function HomePage() {
  return (
    <main>
      <NavBar />

      <section className="bg-gradient-to-b from-blood/5 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-darkred">Donate blood. Save lives near you.</h1>
          <p className="mt-3 text-lg text-neutral-600">Real-time requests from verified hospitals and NGOs.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <a href="/find-blood" className="px-5 py-3 rounded-lg bg-blood text-white hover:brightness-110">Allow Location</a>
            <a href="/find-blood" className="px-5 py-3 rounded-lg border border-blood text-blood hover:bg-blood/5">Find Blood</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4">Live Requests Near You</h2>
        <RequestsNearYou />
      </section>
    </main>
  )
}
