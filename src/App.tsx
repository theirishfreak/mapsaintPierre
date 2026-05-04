import { useState, useCallback } from 'react'
import { Scene } from './Scene'
import { Header } from './components/ui/Header'
import { Sidebar } from './components/ui/Sidebar'
import { Timeline } from './components/ui/Timeline'
import { ZonePanel } from './components/ui/ZonePanel'
import { useTimeOfDay } from './hooks/useTimeOfDay'
import { zones } from './data/zones'
import type { Zone } from './data/zones'

export default function App() {
  const timeState = useTimeOfDay(23)
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [cinematic, setCinematic] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)

  const handleZoneSelect = useCallback((zone: Zone) => {
    const full = zones.find((z) => z.id === zone.id) ?? zone
    setSelectedZone(full)
  }, [])

  const handleCinematicEnd = useCallback(() => {
    setCinematic(false)
  }, [])

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Scene
          timeState={timeState}
          selectedZone={selectedZone}
          onZoneSelect={handleZoneSelect}
          cinematic={cinematic}
          onCinematicEnd={handleCinematicEnd}
        />
      </div>

      {/* UI Overlay */}
      <Header />

      <Sidebar
        onSelectZone={handleZoneSelect}
        selectedZoneId={selectedZone?.id ?? null}
      />

      <ZonePanel
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
      />

      <Timeline
        hour={timeState.hour}
        onHourChange={timeState.setTime}
      />

      {/* Controls top-right */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={() => setCinematic(true)}
          title="Vue cinématique"
          className="bg-black/60 backdrop-blur-sm border border-yellow-700/40 text-yellow-400 hover:text-yellow-200 hover:bg-black/80 transition-all rounded-lg px-3 py-2 text-xs font-medium"
        >
          🎬 Cinéma
        </button>
        <button
          onClick={handleToggleFullscreen}
          title="Plein écran"
          className="bg-black/60 backdrop-blur-sm border border-yellow-700/40 text-yellow-400 hover:text-yellow-200 hover:bg-black/80 transition-all rounded-lg px-3 py-2 text-xs font-medium"
        >
          {fullscreen ? '⊡ Fenêtre' : '⛶ Plein écran'}
        </button>
        <button
          title="Crédits"
          className="bg-black/60 backdrop-blur-sm border border-yellow-700/40 text-yellow-400 hover:text-yellow-200 hover:bg-black/80 transition-all rounded-lg px-3 py-2 text-xs font-medium"
          onClick={() => alert('Amiens Far West 3D\n\nDéveloppé avec React Three Fiber, Three.js & Tailwind CSS\nÉvénement annuel — Parc Saint-Pierre, Amiens')}
        >
          ℹ️ Crédits
        </button>
      </div>

      {/* Cinematic overlay */}
      {cinematic && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-14 bg-black" />
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-black" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="text-yellow-400/80 text-sm tracking-widest uppercase animate-pulse"
              style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 30px rgba(255,200,50,0.8)' }}
            >
              Survol du Parc Saint-Pierre
            </p>
          </div>
          <button
            className="pointer-events-auto absolute bottom-20 right-8 text-white/50 hover:text-white text-xs border border-white/20 rounded px-3 py-1 transition-colors"
            onClick={handleCinematicEnd}
          >
            Passer ▶
          </button>
        </div>
      )}
    </div>
  )
}
