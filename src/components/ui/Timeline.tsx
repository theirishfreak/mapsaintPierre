interface Props {
  hour: number
  onHourChange: (h: number) => void
}

const HOURS = [10, 12, 14, 16, 18, 19, 20, 21, 22, 23, 24]

function formatHour(h: number) {
  if (h === 24) return '00h'
  return `${h}h`
}

function getTimeLabel(h: number) {
  if (h < 18) return '☀️ Jour'
  if (h < 20) return '🌅 Crépuscule'
  if (h < 23) return '🌙 Nuit'
  return '✨ Minuit'
}

export function Timeline({ hour, onHourChange }: Props) {
  const min = 10
  const max = 24
  const pct = ((hour - min) / (max - min)) * 100

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-auto" style={{ width: 'min(500px, 90vw)' }}>
      <div className="bg-black/60 backdrop-blur-sm border border-yellow-700/40 rounded-xl px-5 py-3">
        {/* Label */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-yellow-500 text-xs font-bold uppercase tracking-wider">Heure de la soirée</span>
          <span className="text-yellow-300 text-sm font-mono font-bold">{formatHour(hour)} · {getTimeLabel(hour)}</span>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={0.25}
            value={hour}
            onChange={(e) => onHourChange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ffd766 0%, #ffd766 ${pct}%, rgba(255,255,255,0.15) ${pct}%, rgba(255,255,255,0.15) 100%)`,
            }}
          />
          {/* Tick marks */}
          <div className="flex justify-between mt-1.5 px-0">
            {HOURS.map((h) => (
              <button
                key={h}
                onClick={() => onHourChange(h)}
                className="text-white/40 hover:text-yellow-400 text-xs transition-colors tabular-nums"
                style={{ fontSize: '0.6rem' }}
              >
                {formatHour(h)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
