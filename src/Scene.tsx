import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Sky, Html } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

import { Ground } from './components/ground/Ground'
import { Lake } from './components/ground/Lake'
import { Saloon } from './components/buildings/Saloon'
import { Stage } from './components/buildings/Stage'
import { DiningArea } from './components/buildings/DiningArea'
import { Photobooth } from './components/buildings/Photobooth'
import { EntranceArch } from './components/buildings/EntranceArch'
import { KidsVillage } from './components/villages/KidsVillage'
import { AdultsVillage } from './components/villages/AdultsVillage'
import { Lantern } from './components/props/Lantern'
import { Tree } from './components/props/Tree'
import { Cactus } from './components/props/Cactus'
import { Campfire } from './components/props/Campfire'
import { Silhouette } from './components/characters/Silhouette'
import { NightLighting } from './components/lighting/NightLighting'
import type { Zone } from './data/zones'
import type { TimeState } from './hooks/useTimeOfDay'

const LANTERN_POSITIONS: [number, number, number][] = [
  [-20, 1, -5],
  [-10, 1.5, 10],
  [5, 1, -8],
  [15, 1.8, 5],
  [-5, 1.2, -15],
  [10, 1, -18],
  [-15, 1.5, 12],
]

const TREE_POSITIONS: { pos: [number, number, number]; variant: 'pine' | 'oak'; scale: number }[] = [
  { pos: [-80, 0, -50], variant: 'oak', scale: 1.2 },
  { pos: [-75, 0, 50], variant: 'oak', scale: 1.0 },
  { pos: [85, 0, 40], variant: 'pine', scale: 1.3 },
  { pos: [80, 0, -45], variant: 'oak', scale: 0.9 },
  { pos: [-85, 0, 10], variant: 'pine', scale: 1.1 },
  { pos: [85, 0, -10], variant: 'oak', scale: 1.0 },
  { pos: [-30, 0, -75], variant: 'pine', scale: 0.8 },
  { pos: [30, 0, -75], variant: 'oak', scale: 1.1 },
  { pos: [-30, 0, 75], variant: 'oak', scale: 1.2 },
  { pos: [30, 0, 75], variant: 'pine', scale: 0.9 },
  { pos: [60, 0, 60], variant: 'oak', scale: 1.0 },
  { pos: [-60, 0, 60], variant: 'pine', scale: 1.1 },
  { pos: [60, 0, -60], variant: 'oak', scale: 0.8 },
  { pos: [-60, 0, -60], variant: 'pine', scale: 1.2 },
  { pos: [0, 0, -80], variant: 'oak', scale: 1.0 },
  { pos: [-90, 0, -25], variant: 'pine', scale: 0.9 },
  { pos: [90, 0, 25], variant: 'oak', scale: 1.1 },
  { pos: [-50, 0, -75], variant: 'oak', scale: 0.8 },
  { pos: [50, 0, 75], variant: 'pine', scale: 1.0 },
  { pos: [-75, 0, -75], variant: 'oak', scale: 0.9 },
]

const CACTUS_POSITIONS: [number, number, number][] = [
  [25, 0, -60], [35, 0, -70], [20, 0, -45],
  [70, 0, -30], [75, 0, 10], [70, 0, 50],
  [-20, 0, -70], [-35, 0, 55], [55, 0, -50],
  [65, 0, -60], [-40, 0, -35], [45, 0, 60],
  [-15, 0, 60], [80, 0, -55], [-80, 0, 35],
]

const BRASERO_POSITIONS: [number, number, number][] = [
  [-30, 0, 0], [30, 0, 0], [0, 0, 30],
  [-15, 0, -30], [15, 0, -30],
]

interface CameraControllerProps {
  targetZone: Zone | null
  cinematic: boolean
  onCinematicEnd: () => void
  controlsRef: React.RefObject<OrbitControlsImpl | null>
}

function CameraController({ targetZone, cinematic, onCinematicEnd, controlsRef }: CameraControllerProps) {
  const { camera } = useThree()
  const cinematicT = useRef(0)
  const cinematicDone = useRef(false)
  const lerpTarget = useRef<THREE.Vector3 | null>(null)
  const lerpLookAt = useRef<THREE.Vector3 | null>(null)

  useEffect(() => {
    if (cinematic) {
      cinematicT.current = 0
      cinematicDone.current = false
    }
  }, [cinematic])

  useEffect(() => {
    if (targetZone) {
      const [x, y, z] = targetZone.cameraPosition
      lerpTarget.current = new THREE.Vector3(x, y, z)
      lerpLookAt.current = new THREE.Vector3(...targetZone.position)
    } else {
      lerpTarget.current = null
      lerpLookAt.current = null
    }
  }, [targetZone])

  useFrame((_, delta) => {
    if (cinematic && !cinematicDone.current) {
      cinematicT.current += delta / 8
      const t = Math.min(cinematicT.current, 1)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

      const startPos = new THREE.Vector3(0, 120, 0)
      const endPos = new THREE.Vector3(80, 60, 80)
      camera.position.lerpVectors(startPos, endPos, eased)
      camera.lookAt(0, 0, 0)
      controlsRef.current?.target.set(0, 0, 0)

      if (t >= 1) {
        cinematicDone.current = true
        onCinematicEnd()
      }
      return
    }

    if (lerpTarget.current) {
      camera.position.lerp(lerpTarget.current, delta * 2.5)
      if (lerpLookAt.current && controlsRef.current) {
        controlsRef.current.target.lerp(lerpLookAt.current, delta * 2.5)
      }
    }
  })

  return null
}

interface SceneContentProps {
  timeState: TimeState
  selectedZone: Zone | null
  onZoneSelect: (zone: Zone) => void
  cinematic: boolean
  onCinematicEnd: () => void
  controlsRef: React.RefObject<OrbitControlsImpl | null>
}

function SceneContent({ timeState, selectedZone, onZoneSelect, cinematic, onCinematicEnd, controlsRef }: SceneContentProps) {
  const skyProps = timeState.timeOfDay === 'day'
    ? { sunPosition: [-50, 100, -50] as [number, number, number], turbidity: 8, rayleigh: 1.5, mieCoefficient: 0.005 }
    : null

  return (
    <>
      <CameraController
        targetZone={selectedZone}
        cinematic={cinematic}
        onCinematicEnd={onCinematicEnd}
        controlsRef={controlsRef}
      />

      <OrbitControls
        ref={controlsRef as any}
        enableDamping
        dampingFactor={0.05}
        minDistance={30}
        maxDistance={250}
        maxPolarAngle={Math.PI / 2.2}
        target={[0, 0, 0]}
        enabled={!cinematic}
      />

      {/* Sky */}
      {skyProps ? (
        <Sky {...skyProps} />
      ) : (
        <color attach="background" args={[timeState.skyColor]} />
      )}
      <Stars radius={150} depth={80} count={4000} factor={5} saturation={0} fade speed={0.5} />

      {/* Moon */}
      {timeState.timeOfDay !== 'day' && (
        <mesh position={[60, 85, 30]}>
          <sphereGeometry args={[3, 16, 16]} />
          <meshStandardMaterial color="#fffce8" emissive="#fffce8" emissiveIntensity={1.5} />
        </mesh>
      )}

      {/* Fog */}
      <fog attach="fog" args={[timeState.skyColor, 150, 280]} />

      <NightLighting timeState={timeState} />

      <Ground />
      <Lake />

      {/* Buildings */}
      <Stage onClick={() => onZoneSelect({ id: 'scene', name: 'Scène Principale', emoji: '🎸', position: [-65, 0, -40], cameraPosition: [-40, 20, -10], schedule: [{ time: '18h00', label: 'Ouverture' }, { time: '20h00', label: 'Concert country' }], description: 'Grande scène western avec concerts et animations.', category: 'general' })} />
      <Saloon onClick={() => onZoneSelect({ id: 'saloon', name: 'Saloon', emoji: '🥃', position: [-50, 0, -10], cameraPosition: [-25, 15, 15], schedule: [{ time: '17h00', label: 'Happy hour' }], description: 'Bar & apéro adultes façade 2 étages.', category: 'adultes' })} />
      <DiningArea onClick={() => onZoneSelect({ id: 'repas', name: 'Aire de Repas', emoji: '🍖', position: [-65, 0, 35], cameraPosition: [-40, 20, 55], schedule: [{ time: '12h00', label: 'Déjeuner' }, { time: '19h00', label: 'Grand BBQ' }], description: 'Longues tables sous auvents avec food trucks.', category: 'mixte' })} />
      <Photobooth onClick={() => onZoneSelect({ id: 'photobooth', name: 'Photobooth', emoji: '📸', position: [0, 0, -55], cameraPosition: [20, 15, -30], schedule: [{ time: '14h00', label: 'Ouverture' }], description: 'Pavillon trompe-l\'œil avec accessoires western.', category: 'mixte' })} />
      <EntranceArch onClick={() => onZoneSelect({ id: 'entree', name: 'Entrée Far West', emoji: '⭐', position: [0, 0, 65], cameraPosition: [20, 15, 45], schedule: [{ time: '10h00', label: 'Ouverture portes' }], description: 'Grande arche western et point d\'info.', category: 'general' })} />

      {/* Aquarium island */}
      <group position={[0, -1, 0]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[6, 3, 4]} />
          <meshStandardMaterial color="#3a4a6a" roughness={0.8} />
        </mesh>
        <mesh position={[0, 3.2, 0]} castShadow>
          <coneGeometry args={[3.5, 2, 4]} />
          <meshStandardMaterial color="#2a3a5a" roughness={0.85} />
        </mesh>
      </group>

      {/* Villages */}
      <KidsVillage onZoneClick={(id) => {
        const z = { id, name: id, emoji: '🎠', position: [45, 0, 35] as [number, number, number], cameraPosition: [25, 20, 55] as [number, number, number], schedule: [], description: '', category: 'enfants' as const }
        onZoneSelect(z)
      }} />
      <AdultsVillage onZoneClick={(id) => {
        const z = { id, name: id, emoji: '🎲', position: [45, 0, -25] as [number, number, number], cameraPosition: [25, 20, -5] as [number, number, number], schedule: [], description: '', category: 'adultes' as const }
        onZoneSelect(z)
      }} />

      {/* Floating lanterns over lake */}
      {LANTERN_POSITIONS.map((pos, i) => (
        <Lantern key={i} position={pos} seed={i} />
      ))}

      {/* Trees */}
      {TREE_POSITIONS.map((t, i) => (
        <Tree key={i} position={t.pos} variant={t.variant} scale={t.scale} />
      ))}

      {/* Cactus */}
      {CACTUS_POSITIONS.map((pos, i) => (
        <Cactus key={i} position={pos} scale={0.7 + (i % 3) * 0.3} />
      ))}

      {/* Braseros */}
      {BRASERO_POSITIONS.map((pos, i) => (
        <Campfire key={i} position={pos} scale={0.5} />
      ))}

      {/* Characters around saloon */}
      <Silhouette position={[-45, 0, -5]} color="#1a0a00" hatColor="#2a1000" animation="idle" seed={0} />
      <Silhouette position={[-47, 0, -2]} color="#2a1a3a" hatColor="#4a2a5a" animation="sway" seed={1} />
      <Silhouette position={[-53, 0, 0]} color="#0a1a00" hatColor="#1a3a00" animation="idle" seed={2} />

      {/* Characters dancing near stage */}
      <Silhouette position={[-60, 0, -32]} color="#1a0a2a" hatColor="#3a1a4a" animation="dance" seed={3} />
      <Silhouette position={[-65, 0, -30]} color="#2a0a0a" hatColor="#4a1a1a" animation="dance" seed={4} />
      <Silhouette position={[-70, 0, -32]} color="#0a1a2a" hatColor="#1a2a4a" animation="dance" seed={5} />
      <Silhouette position={[-62, 0, -28]} color="#2a2a0a" hatColor="#3a3a1a" animation="sway" seed={6} />

      {/* Characters at dining tables */}
      <Silhouette position={[-60, 0, 33]} color="#1a0a00" hatColor="#2a0a00" animation="sit" seed={7} />
      <Silhouette position={[-65, 0, 37]} color="#0a1a1a" hatColor="#0a2a2a" animation="sit" seed={8} />
      <Silhouette position={[-70, 0, 33]} color="#2a1a0a" hatColor="#3a2a1a" animation="idle" seed={9} />

      {/* Characters near campfire */}
      <Silhouette position={[43, 0, 3]} color="#1a0a00" hatColor="#2a0a00" animation="sway" seed={10} />
      <Silhouette position={[47, 0, -1]} color="#2a0a1a" hatColor="#4a1a2a" animation="idle" seed={11} />

      {/* Postprocessing */}
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
        <Vignette darkness={0.3} offset={0.3} />
      </EffectComposer>
    </>
  )
}

interface SceneProps {
  timeState: TimeState
  selectedZone: Zone | null
  onZoneSelect: (zone: Zone) => void
  cinematic: boolean
  onCinematicEnd: () => void
}

export function Scene({ timeState, selectedZone, onZoneSelect, cinematic, onCinematicEnd }: SceneProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)

  return (
    <Canvas
      shadows
      camera={{ position: [80, 60, 80], fov: 55, near: 0.5, far: 800 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
    >
      <Suspense fallback={<Html center><div style={{ color: '#ffd766', fontFamily: 'Georgia, serif', fontSize: 18 }}>Chargement du Far West…</div></Html>}>
        <SceneContent
          timeState={timeState}
          selectedZone={selectedZone}
          onZoneSelect={onZoneSelect}
          cinematic={cinematic}
          onCinematicEnd={onCinematicEnd}
          controlsRef={controlsRef}
        />
      </Suspense>
    </Canvas>
  )
}
