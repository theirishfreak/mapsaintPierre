import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
  onClick?: () => void
}

const WOOD_DARK = '#5c3010'
const WOOD_MED = '#7a4818'
const WOOD_LIGHT = '#a87538'

export function Saloon({ onClick }: Props) {
  const lamp1 = useRef<THREE.PointLight>(null)
  const lamp2 = useRef<THREE.PointLight>(null)

  useFrame(() => {
    const flicker = 0.8 + Math.random() * 0.4
    if (lamp1.current) lamp1.current.intensity = flicker
    if (lamp2.current) lamp2.current.intensity = flicker * 0.9
  })

  return (
    <group position={[-50, 0, -10]} onClick={onClick}>
      {/* Main body ground floor */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 5, 6]} />
        <meshStandardMaterial color={WOOD_MED} roughness={0.85} />
      </mesh>

      {/* Second floor facade */}
      <mesh position={[0, 6.5, 1.5]} castShadow>
        <boxGeometry args={[8, 3, 1]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.85} />
      </mesh>

      {/* Roof main */}
      <mesh position={[0, 8.2, 0]} castShadow>
        <boxGeometry args={[9, 0.4, 7]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.9} />
      </mesh>

      {/* Roof overhang front */}
      <mesh position={[0, 4.2, 3.6]} castShadow>
        <boxGeometry args={[9, 0.3, 1.5]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.9} />
      </mesh>

      {/* Columns */}
      {[-3, 3].map((x, i) => (
        <mesh key={i} position={[x, 2, 3.3]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 4.5, 8]} />
          <meshStandardMaterial color={WOOD_LIGHT} roughness={0.85} />
        </mesh>
      ))}

      {/* Batwing doors */}
      <mesh position={[-0.7, 1.5, 3.01]} castShadow>
        <boxGeometry args={[0.8, 1.8, 0.08]} />
        <meshStandardMaterial color={WOOD_LIGHT} roughness={0.85} />
      </mesh>
      <mesh position={[0.7, 1.5, 3.01]} castShadow>
        <boxGeometry args={[0.8, 1.8, 0.08]} />
        <meshStandardMaterial color={WOOD_LIGHT} roughness={0.85} />
      </mesh>

      {/* Windows ground floor (emissive warm) */}
      {[-2.8, 2.8].map((x, i) => (
        <group key={`win-${i}`} position={[x, 2.8, 3.01]}>
          <mesh>
            <boxGeometry args={[1.4, 1.8, 0.05]} />
            <meshStandardMaterial color="#2a1800" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[1.2, 1.6, 0.01]} />
            <meshStandardMaterial
              color="#ffaa44"
              emissive="#ffaa44"
              emissiveIntensity={2}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* Windows second floor */}
      {[-2, 0, 2].map((x, i) => (
        <mesh key={`win2-${i}`} position={[x, 6.5, 2.01]}>
          <boxGeometry args={[1.2, 1.4, 0.05]} />
          <meshStandardMaterial
            color="#ffcc88"
            emissive="#ff8833"
            emissiveIntensity={1.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Sign "SALOON" */}
      <Text
        position={[0, 7.5, 2.1]}
        fontSize={0.7}
        color="#ffd766"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#3a1800"
      >
        SALOON
      </Text>

      {/* Hanging sign */}
      <group position={[0, 5.8, 3.5]}>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[2.5, 0.6, 0.08]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={0.85} />
        </mesh>
        <mesh position={[-1, 0.5, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
          <meshStandardMaterial color="#8a7050" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[1, 0.5, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
          <meshStandardMaterial color="#8a7050" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>

      {/* Oil lamp posts */}
      {[-1.8, 1.8].map((x, i) => (
        <group key={`lamp-${i}`} position={[x, 0, 3.3]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 3, 6]} />
            <meshStandardMaterial color="#5a3010" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.2, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial
              color="#ffcc44"
              emissive="#ffaa22"
              emissiveIntensity={3}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* Point lights for oil lamps */}
      <pointLight ref={lamp1} position={[-1.8, 3.2, 3.3]} color="#ff8833" intensity={1} distance={8} />
      <pointLight ref={lamp2} position={[1.8, 3.2, 3.3]} color="#ff8833" intensity={1} distance={8} />

      {/* Barrels */}
      {[[-3.5, 0, 2.5], [-3.5, 0.9, 2.5], [3.5, 0, 2.5]].map(([x, y, z]) => (
        <mesh key={`${x}-${y}`} position={[x, y + 0.55, z]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 1.1, 12]} />
          <meshStandardMaterial color={WOOD_MED} roughness={0.85} />
        </mesh>
      ))}

      {/* Chairs */}
      {[[-2.5, 0, 3.8], [2.5, 0, 3.8]].map(([x, , z], i) => (
        <group key={`chair-${i}`} position={[x, 0, z]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.7, 0.08, 0.7]} />
            <meshStandardMaterial color={WOOD_LIGHT} roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.85, -0.3]}>
            <boxGeometry args={[0.7, 0.85, 0.08]} />
            <meshStandardMaterial color={WOOD_LIGHT} roughness={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
