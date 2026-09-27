import { Link } from 'react-router-dom'
import TopHeader from '../components/TopHeader'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { IconProjects, IconCost, IconAlert } from '../components/icons'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopHeader />
      <Hero />

      <section className="mx-auto max-w-3xl px-6 py-14 text-center">
        <h2 className="text-2xl font-bold text-navy-950">
          One record for every project under watch
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-navy-950/70">
          SETU brings together cost, schedule, and risk for central sector
          infrastructure projects in one place — with a predictive model
          flagging cost and time overruns before they happen, and an
          assistant that can answer questions about any project on record.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/login"
            className="rounded bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded border border-navy-900/20 px-6 py-2.5 text-sm font-semibold text-navy-950 hover:border-saffron-500"
          >
            Create account
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded border border-navy-900/10 bg-white p-5 text-center">
            <IconProjects className="mx-auto text-navy-900" />
            <p className="mt-2 text-sm font-semibold text-navy-950">Project register</p>
            <p className="mt-1 text-xs text-navy-950/60">
              Every project's cost, schedule, and progress in one place.
            </p>
          </div>
          <div className="rounded border border-navy-900/10 bg-white p-5 text-center">
            <IconCost className="mx-auto text-navy-900" />
            <p className="mt-2 text-sm font-semibold text-navy-950">Predictive risk</p>
            <p className="mt-1 text-xs text-navy-950/60">
              A trained model flags cost and time overrun risk early.
            </p>
          </div>
          <div className="rounded border border-navy-900/10 bg-white p-5 text-center">
            <IconAlert className="mx-auto text-navy-900" />
            <p className="mt-2 text-sm font-semibold text-navy-950">Active alerts</p>
            <p className="mt-1 text-xs text-navy-950/60">
              High and critical risk projects surface automatically.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
