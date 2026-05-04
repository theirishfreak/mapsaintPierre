import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  position: [number, number, number]
  scale?: number
}

export function Campfire({ position, scale = 1 }: Props) {
  const flameRef = useRef<THREE.Mesh>(null)
  const flame2Ref = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (flameRef.current) {
      flameRef.current.scale.x = 0.8 + Math.sin(t * 8) * 0.2
      flameRef.current.scale.y = 0.9 + Math.sin(t * 11) * 0.15
      flameRef.current.scale.z = 0.8 + Math.sin(t * 9) * 0.2
    }
    if (flame2Ref.current) {
      flame2Ref.current.scale.x = 0.6 + Math.sin(t * 12 + 1) * 0.25
      flame2Ref.current.scale.y = 0.7 + Math.sin(t * 7 + 2) * 0.2
    }
    if (lightRef.current) {
      lightRef.current.intensity = 1.2 + Math.random() * 0.6
    }
  })

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Log circle */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.5, 0.1, Math.sin(angle) * 0.5]}
            rotation={[Math.PI / 2, 0, angle]}
            castShadow
          >
            <cylinderGeometry args={[0.1, 0.12, 1.2, 8]} />
            <meshStandardMaterial color="#3a1800" roughness={0.95} />
          </mesh>
        )
      })}

      {/* Rocks */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.65, 0.1, Math.sin(angle) * 0.65]}
            castShadow
          >
            <dodecahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
          </mesh>
        )
      })}

      {/* Main flame */}
      <mesh ref={flameRef} position={[0, 0.6, 0]}>
        <coneGeometry args={[0.3, 0.8, 8]} />
        <meshStandardMaterial
          color="#ff6622"
          emissive="#ff4400"
          emissiveIntensity={4}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Inner flame (brighter) */}
      <mesh ref={flame2Ref} position={[0, 0.5, 0]}>
        <coneGeometry args={[0.18, 0.6, 8]} />
        <meshStandardMaterial
          color="#ffcc22"
          emissive="#ffaa00"
          emissiveIntensity={5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Ember glow base */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial
          color="#ff4400"
          emissive="#ff2200"
          emissiveIntensity={3}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Light */}
      <pointLight ref={lightRef} position={[0, 0.8, 0]} color="#ff6622" intensity={1.5} distance={12} />
    </group>
  )
}
