import { useState } from 'react'
import { zones } from '../../data/zones'
import type { Zone } from '../../data/zones'

interface Props {
  onSelectZone: (zone: Zone) => void
  selectedZoneId: string | null
}

export function Sidebar({ onSelectZone, selectedZoneId }: Props) {
  const [open, setOpen] = useState(true)

  const categoryColors: Record<string, string> = {
    general: 'text-yellow-400',
    adultes: 'text-orange-400',
    enfants: 'text-green-400',
    mixte: 'text-blue-300',
  }

  const categoryLabels: Record<string, string> = {
    general: 'Général',
    adultes: 'Adultes',
    enfants: 'Enfants',
    mixte: 'Mixte',
  }

  return (
    <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pointer-events-none">
      <div className="pointer-events-auto flex">
        {/* Sidebar panel */}
        <div
          className={`transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ width: 220 }}
        >
          <div className="h-full max-h-screen overflow-y-auto scrollbar-hide bg-black/60 backdrop-blur-sm border-r border-yellow-700/30 flex flex-col" style={{ paddingTop: 72, paddingBottom: 80 }}>
            <div className="px-3 pb-2">
              <p className="text-yellow-500 text-xs uppercase tracking-widest font-bold mb-3">Zones & Programme</p>
              <div className="space-y-1">
                {zones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => onSelectZone(zone)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-150 flex items-center gap-2 group ${
                      selectedZoneId === zone.id
                        ? 'bg-yellow-600/30 border border-yellow-500/50'
                        : 'hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <span className="text-base">{zone.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-medium truncate group-hover:text-yellow-200 transition-colors">
                        {zone.name}
                      </div>
                      <div className={`text-xs ${categoryColors[zone.category]}`}>
                        {categoryLabels[zone.category]}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Toggle tab */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="self-center bg-black/60 backdrop-blur-sm border border-yellow-700/40 text-yellow-400 hover:text-yellow-200 hover:bg-black/80 transition-all rounded-r-lg px-2 py-3 flex flex-col items-center gap-1"
          style={{ marginLeft: open ? 0 : -1 }}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span className="text-xs" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.1em' }}>
            {open ? '◀ Zones' : 'Zones ▶'}
          </span>
        </button>
      </div>
    </div>
  )
}
