import { useState } from 'react'
import { IconBuilding } from './icons'

export default function MinistrySectorTabs({ ministryGroups, sectorGroups }) {
  const [tab, setTab] = useState('ministry')
  const groups = tab === 'ministry' ? ministryGroups : sectorGroups

  return (
    <div className="bg-gradient-to-b from-sky-500/15 to-transparent py-6">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 flex w-fit overflow-hidden rounded border border-navy-900/15 bg-white text-sm font-semibold">
          <button
            onClick={() => setTab('ministry')}
            className={`px-6 py-2.5 ${
              tab === 'ministry'
                ? 'bg-navy-900 text-white'
                : 'text-navy-950/70 hover:bg-navy-900/5'
            }`}
          >
            Ministry-Wise
          </button>
          <button
            onClick={() => setTab('sector')}
            className={`px-6 py-2.5 ${
              tab === 'sector'
                ? 'bg-navy-900 text-white'
                : 'text-navy-950/70 hover:bg-navy-900/5'
            }`}
          >
            Sector-Wise
          </button>
        </div>

        {groups.length === 0 ? (
          <p className="text-sm text-navy-950/60">
            No projects recorded yet under this view.
          </p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {groups.map((g) => (
              <div
                key={g.name}
                className="flex min-w-[220px] shrink-0 flex-col gap-3 rounded border border-navy-900/10 bg-white px-4 py-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-saffron-400 hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-navy-900">
                  <IconBuilding />
                  <span className="text-sm font-semibold">{g.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-navy-950/50">Projects</p>
                    <p className="font-bold text-navy-950">{g.count}</p>
                  </div>
                  <div>
                    <p className="text-navy-950/50">Approved (₹ Cr)</p>
                    <p className="font-bold text-navy-950">{g.totalCost.toFixed(0)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
