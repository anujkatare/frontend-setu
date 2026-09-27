import TopHeader from './TopHeader'
import Footer from './Footer'

export default function PageShell({ children, withFooter = true }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopHeader />
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      {withFooter && <Footer />}
    </div>
  )
}
