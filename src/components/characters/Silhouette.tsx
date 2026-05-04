import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  position: [number, number, number]
  color?: string
  hatColor?: string
  animation?: 'sway' | 'idle' | 'dance' | 'sit'
  seed?: number
}

export function Silhouette({ position, color = '#1a0a00', hatColor = '#2a0a00', animation = 'idle', seed = 0 }: Props) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime + seed * 1.3

    if (animation === 'sway') {
      groupRef.current.rotation.z = Math.sin(t * 1.2) * 0.08
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * 2.4)) * 0.03
    } else if (animation === 'dance') {
      groupRef.current.rotation.z = Math.sin(t * 2.5) * 0.15
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * 5)) * 0.08
    } else if (animation === 'idle') {
      groupRef.current.rotation.z = Math.sin(t * 0.5 + seed) * 0.03
    }
  })

  const bodyColor = color
  const accentColor = hatColor

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#c8a070" roughness={0.9} />
      </mesh>

      {/* Cowboy hat brim */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.06, 12]} />
        <meshStandardMaterial color={accentColor} roughness={0.85} />
      </mesh>
      {/* Hat crown */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.38, 12]} />
        <meshStandardMaterial color={accentColor} roughness={0.85} />
      </mesh>

      {/* Neckerchief */}
      <mesh position={[0, 1.55, 0.18]} castShadow>
        <coneGeometry args={[0.12, 0.2, 6]} />
        <meshStandardMaterial color="#cc2222" roughness={0.9} />
      </mesh>

      {/* Belt buckle */}
      <mesh position={[0, 0.78, 0.21]}>
        <boxGeometry args={[0.12, 0.1, 0.04]} />
        <meshStandardMaterial color="#ffd766" emissive="#aa8800" emissiveIntensity={0.5} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}
