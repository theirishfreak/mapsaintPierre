import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { Silhouette } from '../characters/Silhouette'

interface Props {
  onZoneClick?: (id: string) => void
}

export function AdultsVillage({ onZoneClick }: Props) {
  const bullRef = useRef<THREE.Group>(null)
  const riderRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (bullRef.current) {
      bullRef.current.rotation.y = t * 1.5
      bullRef.current.rotation.z = Math.sin(t * 4) * 0.15
      bullRef.current.position.y = Math.abs(Math.sin(t * 3)) * 0.2
    }
    if (riderRef.current) {
      riderRef.current.rotation.z = Math.sin(t * 4 + 0.5) * 0.25
    }
  })

  return (
    <group position={[45, 0, -25]}>
      {/* Boundary (red cord on posts) */}
      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={`post-n-${i}`} position={[-15 + i * 2, 0.6, -12]} castShadow>
          <cylinderGeometry args={[0.06, 0.07, 1.4, 6]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
      {/* Red cord visual (simplified as thin boxes) */}
      <mesh position={[0, 0.9, -12]}>
        <boxGeometry args={[30, 0.04, 0.04]} />
        <meshStandardMaterial color="#cc2222" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.9, 12]}>
        <boxGeometry args={[30, 0.04, 0.04]} />
        <meshStandardMaterial color="#cc2222" roughness={0.8} />
      </mesh>
      <mesh position={[-15, 0.9, 0]}>
        <boxGeometry args={[0.04, 0.04, 24]} />
        <meshStandardMaterial color="#cc2222" roughness={0.8} />
      </mesh>
      <mesh position={[15, 0.9, 0]}>
        <boxGeometry args={[0.04, 0.04, 24]} />
        <meshStandardMaterial color="#cc2222" roughness={0.8} />
      </mesh>

      {/* Sign */}
      <group position={[0, 0, -12]}>
        <mesh position={[0, 1.8, 0]} castShadow>
          <boxGeometry args={[4.5, 0.8, 0.15]} />
          <meshStandardMaterial color="#5c3010" roughness={0.85} />
        </mesh>
        <Text position={[0, 1.8, 0.1]} fontSize={0.32} color="#ffd766" anchorX="center" anchorY="middle">
          VILLAGE ADULTES
        </Text>
      </group>

      {/* 6. Poker — left area */}
      <group position={[-9, 0, -5]} onClick={() => onZoneClick?.('poker')}>
        {/* Tables */}
        {[-2.5, 2.5].map((z, ti) => (
          <group key={ti} position={[0, 0, z]}>
            <mesh position={[0, 0.75, 0]} castShadow>
              <cylinderGeometry args={[1.2, 1.2, 0.1, 16]} />
              <meshStandardMaterial color="#5c3010" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.7, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.7, 8]} />
              <meshStandardMaterial color="#3a1800" roughness={0.85} />
            </mesh>
            {/* Chips */}
            {Array.from({ length: 5 }, (_, i) => (
              <mesh key={i} position={[Math.cos(i * 1.26) * 0.6, 0.82, Math.sin(i * 1.26) * 0.6]}>
                <cylinderGeometry args={[0.08, 0.08, 0.04, 12]} />
                <meshStandardMaterial color={['#cc2222', '#ffd766', '#3a3aaa', '#22aa22', '#aa22aa'][i]} roughness={0.5} />
              </mesh>
            ))}
            {/* Hanging lamp */}
            <mesh position={[0, 2.2, 0]}>
              <cylinderGeometry args={[0.3, 0.2, 0.3, 8]} />
              <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.5} />
            </mesh>
            <mesh position={[0, 2.05, 0]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshStandardMaterial color="#ffcc44" emissive="#ffaa22" emissiveIntensity={3} />
            </mesh>
          </group>
        ))}
        <Text position={[0, 3, 0]} fontSize={0.3} color="#ffd766" anchorX="center">POKER DU SHÉRIF</Text>
      </group>

      {/* 7. Shooting gallery — top-right */}
      <group position={[8, 0, -7]} onClick={() => onZoneClick?.('tir-cible')}>
        {/* Counter */}
        <mesh position={[0, 1, -1]} castShadow>
          <boxGeometry args={[5, 2, 0.3]} />
          <meshStandardMaterial color="#7a4818" roughness={0.85} />
        </mesh>
        {/* Barrel targets */}
        {[-1.8, -0.9, 0, 0.9, 1.8].map((x, i) => (
          <group key={i} position={[x, 1.5, -1.3]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.6, 12]} />
              <meshStandardMaterial color="#7a4818" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
              <torusGeometry args={[0.22, 0.03, 6, 16]} />
              <meshStandardMaterial color="#5a3010" metalness={0.3} roughness={0.7} />
            </mesh>
          </group>
        ))}
        {/* Rifle rack */}
        <mesh position={[0, 1.2, 0.5]} castShadow>
          <boxGeometry args={[4, 0.1, 0.3]} />
          <meshStandardMaterial color="#5c3010" roughness={0.85} />
        </mesh>
        <Text position={[0, 3, 0]} fontSize={0.3} color="#ffd766" anchorX="center">TIR AU TONNEAU</Text>
        <Silhouette position={[-1.5, 0, 1.5]} color="#1a2a00" hatColor="#0a1a00" animation="idle" seed={5} />
        <Silhouette position={[1.5, 0, 1.5]} color="#2a1a30" hatColor="#1a0a20" animation="idle" seed={7} />
      </group>

      {/* 8. Mechanical rodeo — center-right */}
      <group ref={bullRef as any} position={[7, 0.3, 2]} onClick={() => onZoneClick?.('rodeo')}>
        {/* Safety mat */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
          <circleGeometry args={[2.5, 16]} />
          <meshStandardMaterial color="#cc2222" roughness={1} />
        </mesh>
        {/* Bull body */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.8, 0.9, 0.9]} />
          <meshStandardMaterial color="#cc3322" roughness={0.85} />
        </mesh>
        {/* Bull head */}
        <mesh position={[0.8, 0.9, 0]} castShadow>
          <boxGeometry args={[0.7, 0.6, 0.6]} />
          <meshStandardMaterial color="#cc3322" roughness={0.85} />
        </mesh>
        {/* Horns */}
        {[-0.25, 0.25].map((z, i) => (
          <mesh key={i} position={[0.9, 1.25, z]} rotation={[0, 0, i === 0 ? -0.5 : 0.5]} castShadow>
            <coneGeometry args={[0.06, 0.5, 6]} />
            <meshStandardMaterial color="#f5e0b0" roughness={0.7} />
          </mesh>
        ))}
        {/* Rider */}
        <group ref={riderRef} position={[0, 1.2, 0]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <capsuleGeometry args={[0.15, 0.5, 4, 8]} />
            <meshStandardMaterial color="#2a3a6a" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshStandardMaterial color="#c8a070" roughness={0.85} />
          </mesh>
          <mesh position={[0, 1.05, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.24, 0.25, 10]} />
            <meshStandardMaterial color="#1a0a00" roughness={0.85} />
          </mesh>
        </group>
        <Text position={[0, 3, 0]} fontSize={0.3} color="#ffd766" anchorX="center">RODÉO MÉCANIQUE</Text>
      </group>

      {/* 9. Line dance — center area */}
      <group position={[-2, 0, 5]} onClick={() => onZoneClick?.('line-dance')}>
        {/* Dance floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
          <planeGeometry args={[8, 6]} />
          <meshStandardMaterial color="#c8a050" roughness={0.7} />
        </mesh>
        {/* Floor markings */}
        {[-2.5, 0, 2.5].map((x, xi) => (
          [-1.5, 1.5].map((z, zi) => (
            <mesh key={`mark-${xi}-${zi}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, z]}>
              <planeGeometry args={[0.5, 0.5]} />
              <meshStandardMaterial color="#ffd766" roughness={0.7} transparent opacity={0.6} />
            </mesh>
          ))
        ))}
        <Text position={[0, 1.5, -3.5]} fontSize={0.35} color="#ffd766" anchorX="center">LINE DANCE</Text>

        {/* Dancers */}
        {[[-2, 0, -1], [0, 0, -1], [2, 0, -1], [-1, 0, 1], [1, 0, 1]].map(([x, , z], i) => (
          <Silhouette
            key={i}
            position={[x, 0, z]}
            color={['#1a0a2a', '#2a0a1a', '#0a1a2a', '#1a2a0a', '#2a1a0a'][i]}
            hatColor={['#3a0a4a', '#4a0a2a', '#0a2a3a', '#2a3a0a', '#3a2a0a'][i]}
            animation="dance"
            seed={i * 2 + 10}
          />
        ))}
      </group>

      {/* W. Whiskey bar */}
      <group position={[-9, 0, 7]} onClick={() => onZoneClick?.('saloon')}>
        {/* Counter */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[4, 2.2, 0.5]} />
          <meshStandardMaterial color="#5c3010" roughness={0.85} />
        </mesh>
        <mesh position={[0, 2.25, 0]} castShadow>
          <boxGeometry args={[4.1, 0.15, 0.6]} />
          <meshStandardMaterial color="#a87538" roughness={0.7} />
        </mesh>
        {/* Bottle shelf behind */}
        <mesh position={[0, 1.5, -0.3]} castShadow>
          <boxGeometry args={[4, 2, 0.1]} />
          <meshStandardMaterial color="#3a1800" roughness={0.9} />
        </mesh>
        {/* Bottles */}
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} position={[-1.5 + i * 0.6, 1.5, -0.2]} castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
            <meshStandardMaterial
              color={['#8b4513', '#2d4a1e', '#4a2d8b', '#8b8b00', '#4a1a00', '#1a4a4a'][i]}
              roughness={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
        {/* Stools */}
        {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <group key={i} position={[x, 0, 0.6]}>
            <mesh position={[0, 0.7, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
              <meshStandardMaterial color="#5c3010" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.65, 6]} />
              <meshStandardMaterial color="#3a1800" roughness={0.9} />
            </mesh>
          </group>
        ))}
        <Text position={[0, 2.8, 0.1]} fontSize={0.35} color="#ffd766" anchorX="center">BAR À WHISKEY</Text>
      </group>
    </group>
  )
}
