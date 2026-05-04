export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
      <div className="flex items-center justify-center py-3 px-4">
        <div className="bg-black/50 backdrop-blur-sm border border-yellow-700/40 rounded-lg px-6 py-2 text-center">
          <h1 className="text-yellow-400 font-bold text-lg tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(255,200,50,0.5)' }}>
            🤠 Amiens Far West
          </h1>
          <p className="text-yellow-200/70 text-xs tracking-wide mt-0.5">
            Parc Saint-Pierre · 21 juin · Événement annuel
          </p>
        </div>
      </div>
    </header>
  )
}
