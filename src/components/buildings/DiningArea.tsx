import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Props {
  onClick?: () => void
}

export function DiningArea({ onClick }: Props) {
  const candleRefs = useRef<THREE.PointLight[]>([])

  useFrame(() => {
    candleRefs.current.forEach((light) => {
      if (light) light.intensity = 0.2 + Math.random() * 0.2
    })
  })

  return (
    <group position={[-65, 0, 35]} onClick={onClick}>
      {/* Canopy poles */}
      {[[-4, 0, -3], [4, 0, -3], [-4, 0, 3], [4, 0, 3]].map(([x, , z], i) => (
        <mesh key={i} position={[x, 2.5, z]} castShadow>
          <cylinderGeometry args={[0.12, 0.15, 5, 8]} />
          <meshStandardMaterial color="#7a4818" roughness={0.85} />
        </mesh>
      ))}

      {/* Canopy roof */}
      <mesh position={[0, 5.1, 0]} castShadow>
        <boxGeometry args={[9.5, 0.2, 7.5]} />
        <meshStandardMaterial color="#d4b483" roughness={0.95} transparent opacity={0.85} />
      </mesh>

      {/* String lights */}
      {[-3, 0, 3].map((z, zi) => (
        Array.from({ length: 7 }, (_, i) => (
          <mesh key={`bulb-${zi}-${i}`} position={[-3.5 + i * 1.2, 4.8, z]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color="#ffaa66"
              emissive="#ffaa44"
              emissiveIntensity={3}
            />
          </mesh>
        ))
      ))}

      {/* Tables */}
      {[-2.5, 2.5].map((z, ti) => (
        <group key={ti} position={[0, 0, z]}>
          <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[8, 0.1, 1.5]} />
            <meshStandardMaterial color="#d4b483" roughness={0.85} />
          </mesh>
          {/* Tablecloth at night */}
          <mesh position={[0, 0.77, 0]}>
            <boxGeometry args={[7.8, 0.02, 1.4]} />
            <meshStandardMaterial color="#e8dcc8" roughness={1} />
          </mesh>
          {/* Table legs */}
          {[-3.5, 3.5].map((x, i) => (
            <mesh key={i} position={[x, 0.35, 0]} castShadow>
              <boxGeometry args={[0.1, 0.7, 1.4]} />
              <meshStandardMaterial color="#7a4818" roughness={0.85} />
            </mesh>
          ))}
          {/* Candles */}
          {[-2.5, 0, 2.5].map((x, i) => (
            <group key={`candle-${i}`} position={[x, 0.78, 0]}>
              <mesh>
                <cylinderGeometry args={[0.05, 0.05, 0.15, 8]} />
                <meshStandardMaterial color="#f5f0e8" roughness={1} />
              </mesh>
              <mesh position={[0, 0.1, 0]}>
                <sphereGeometry args={[0.03, 6, 6]} />
                <meshStandardMaterial color="#ffcc44" emissive="#ff8800" emissiveIntensity={4} />
              </mesh>
            </group>
          ))}
          {/* Benches */}
          {[-1.15, 1.15].map((dz, i) => (
            <mesh key={i} position={[0, 0.35, dz]} castShadow receiveShadow>
              <boxGeometry args={[7.8, 0.1, 0.4]} />
              <meshStandardMaterial color="#7a4818" roughness={0.85} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Candle point lights */}
      {[-2.5, 2.5].map((z, ti) => (
        [-2.5, 0, 2.5].map((x, i) => (
          <pointLight
            key={`clight-${ti}-${i}`}
            ref={(el) => { if (el) candleRefs.current[ti * 3 + i] = el }}
            position={[x, 1.3, z]}
            color="#ffcc44"
            intensity={0.3}
            distance={4}
          />
        ))
      ))}

      {/* Food trucks (diligences) */}
      {[[-7, 0, -2], [-7, 0, 2]].map(([x, , z], i) => (
        <group key={`truck-${i}`} position={[x, 0, z]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[3.5, 2.4, 1.8]} />
            <meshStandardMaterial color={i === 0 ? '#8b2020' : '#1a4a1a'} roughness={0.85} />
          </mesh>
          <mesh position={[0, 2.5, 0]} castShadow>
            <boxGeometry args={[3.6, 0.4, 2]} />
            <meshStandardMaterial color="#3a1810" roughness={0.9} />
          </mesh>
          {/* Wheels */}
          {[[-1.4, -0.8], [1.4, -0.8]].map(([wx, wz], wi) => (
            <mesh key={wi} position={[wx, 0.5, wz]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <torusGeometry args={[0.5, 0.1, 8, 16]} />
              <meshStandardMaterial color="#2a1a0a" roughness={0.9} />
            </mesh>
          ))}
          {/* Service window */}
          <mesh position={[0, 1.5, 0.92]}>
            <boxGeometry args={[1.5, 0.8, 0.05]} />
            <meshStandardMaterial color="#ffaa44" emissive="#ffaa44" emissiveIntensity={1.5} transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
