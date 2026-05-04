import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { TimeState } from '../../hooks/useTimeOfDay'

interface Props {
  timeState: TimeState
}

export function NightLighting({ timeState }: Props) {
  const moonRef = useRef<THREE.DirectionalLight>(null)
  const sunRef = useRef<THREE.DirectionalLight>(null)
  const spot1 = useRef<THREE.SpotLight>(null)
  const spot2 = useRef<THREE.SpotLight>(null)
  const spot3 = useRef<THREE.SpotLight>(null)
  const spot4 = useRef<THREE.SpotLight>(null)

  useFrame(() => {
    // Flicker stage spots
    const flicker = 2.5 + Math.random() * 0.7
    if (spot1.current) spot1.current.intensity = flicker
    if (spot2.current) spot2.current.intensity = flicker
    if (spot3.current) spot3.current.intensity = flicker * 0.9
    if (spot4.current) spot4.current.intensity = flicker * 0.9
  })

  return (
    <>
      {/* Moonlight */}
      <directionalLight
        ref={moonRef}
        position={[50, 80, 30]}
        intensity={timeState.moonIntensity}
        color="#7080a8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-camera-left={-120}
        shadow-camera-right={120}
        shadow-camera-top={120}
        shadow-camera-bottom={-120}
      />

      {/* Sunlight (daytime) */}
      <directionalLight
        ref={sunRef}
        position={[-50, 100, -50]}
        intensity={timeState.sunIntensity}
        color="#fffae0"
        castShadow={false}
      />

      {/* Ambient */}
      <ambientLight intensity={timeState.ambientIntensity} color="#3040a0" />

      {/* Hemisphere */}
      <hemisphereLight
        groundColor="#1a0a05"
        color="#3a4a6a"
        intensity={0.15}
      />

      {/* Stage spotlights */}
      <spotLight
        ref={spot1}
        position={[-65, 12, -52]}
        target-position={[-65, 0, -40]}
        angle={0.3}
        penumbra={0.5}
        intensity={3}
        color="#ffd766"
        castShadow={false}
        distance={40}
      />
      <spotLight
        ref={spot2}
        position={[-55, 12, -52]}
        target-position={[-55, 0, -38]}
        angle={0.3}
        penumbra={0.5}
        intensity={3}
        color="#ffd766"
        castShadow={false}
        distance={40}
      />
      <spotLight
        ref={spot3}
        position={[-72, 12, -52]}
        target-position={[-72, 0, -40]}
        angle={0.3}
        penumbra={0.5}
        intensity={2.5}
        color="#ffaa44"
        castShadow={false}
        distance={40}
      />
      <spotLight
        ref={spot4}
        position={[-48, 12, -52]}
        target-position={[-48, 0, -38]}
        angle={0.3}
        penumbra={0.5}
        intensity={2.5}
        color="#ffaa44"
        castShadow={false}
        distance={40}
      />

      {/* Saloon warm lights */}
      <pointLight position={[-54, 3, -8]} color="#ffaa44" intensity={1.8} distance={25} />
      <pointLight position={[-46, 3, -12]} color="#ffaa44" intensity={1.8} distance={25} />

      {/* Dining area string lights */}
      <pointLight position={[-72, 4, 30]} color="#ffaa66" intensity={0.4} distance={10} />
      <pointLight position={[-65, 4, 35]} color="#ffaa66" intensity={0.4} distance={10} />
      <pointLight position={[-58, 4, 40]} color="#ffaa66" intensity={0.4} distance={10} />
      <pointLight position={[-65, 4, 25]} color="#ffaa66" intensity={0.3} distance={8} />

      {/* Bar whiskey warm light */}
      <pointLight position={[55, 2, -22]} color="#ffaa44" intensity={1.0} distance={12} />

      {/* Poker lamp */}
      <pointLight position={[36, 2, -22]} color="#ffaa66" intensity={0.8} distance={8} />

      {/* Saloon oil lamps */}
      <pointLight position={[-53, 2.5, -6]} color="#ff8833" intensity={1.0} distance={6} />
      <pointLight position={[-47, 2.5, -6]} color="#ff8833" intensity={1.0} distance={6} />
    </>
  )
}
