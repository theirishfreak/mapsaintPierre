import type { Zone } from '../../data/zones'

interface Props {
  zone: Zone | null
  onClose: () => void
}

export function ZonePanel({ zone, onClose }: Props) {
  if (!zone) return null

  const categoryColors: Record<string, string> = {
    general: 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10',
    adultes: 'text-orange-400 border-orange-500/50 bg-orange-500/10',
    enfants: 'text-green-400 border-green-500/50 bg-green-500/10',
    mixte: 'text-blue-300 border-blue-400/50 bg-blue-400/10',
  }

  const categoryLabels: Record<string, string> = {
    general: 'Général',
    adultes: '18+',
    enfants: 'Enfants',
    mixte: 'Tout public',
  }

  return (
    <div className="absolute right-4 top-20 bottom-20 z-10 pointer-events-auto" style={{ width: 280 }}>
      <div className="bg-black/70 backdrop-blur-md border border-yellow-700/40 rounded-xl overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-yellow-700/20 flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{zone.emoji}</span>
              <h2 className="text-yellow-300 font-bold text-sm leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                {zone.name}
              </h2>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColors[zone.category]}`}>
              {categoryLabels[zone.category]}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors text-lg leading-none flex-shrink-0 mt-0.5"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
          {/* Description */}
          <p className="text-white/80 text-xs leading-relaxed">{zone.description}</p>

          {/* Schedule */}
          <div>
            <h3 className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-2">🕐 Programme</h3>
            <div className="space-y-1.5">
              {zone.schedule.map((s, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="text-yellow-400 font-mono font-bold tabular-nums w-12 flex-shrink-0">{s.time}</span>
                  <span className="text-white/70">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image placeholder */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-700/20 aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-1">{zone.emoji}</div>
              <p className="text-yellow-500/60 text-xs">Photo à venir</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-yellow-700/20">
          <p className="text-white/40 text-xs text-center">Amiens Far West · 21 juin</p>
        </div>
      </div>
    </div>
  )
}
