import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
  position: [number, number, number]
  seed?: number
}

export function Lantern({ position, seed = 0 }: Props) {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 0.5 + Math.sin(state.clock.elapsedTime * 1.5 + seed) * 0.1
    }
  })

  return (
    <Float
      speed={0.5 + seed * 0.2}
      rotationIntensity={0.1}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position}>
        {/* Lantern body */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.8, 0.6]} />
          <meshPhysicalMaterial
            color="#ffd766"
            emissive="#ffaa44"
            emissiveIntensity={2}
            transmission={0.4}
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Top cap */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.65, 0.12, 0.65]} />
          <meshStandardMaterial color="#cc8833" roughness={0.6} metalness={0.3} />
        </mesh>

        {/* Bottom cap */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.65, 0.12, 0.65]} />
          <meshStandardMaterial color="#cc8833" roughness={0.6} metalness={0.3} />
        </mesh>

        {/* String */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1, 4]} />
          <meshStandardMaterial color="#8a6030" roughness={0.9} />
        </mesh>

        {/* Inner glow */}
        <mesh>
          <boxGeometry args={[0.35, 0.55, 0.35]} />
          <meshStandardMaterial
            color="#ffdd88"
            emissive="#ffcc44"
            emissiveIntensity={5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Point light */}
        <pointLight ref={lightRef} color="#ffd766" intensity={0.6} distance={10} />
      </group>
    </Float>
  )
}
