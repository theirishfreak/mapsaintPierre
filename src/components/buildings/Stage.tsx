import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
  onClick?: () => void
}

export function Stage({ onClick }: Props) {
  const curtainRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (curtainRef.current) {
      curtainRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.02
    }
  })

  return (
    <group position={[-65, 0, -40]} onClick={onClick}>
      {/* Platform */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 1, 8]} />
        <meshStandardMaterial color="#7a4818" roughness={0.85} />
      </mesh>

      {/* Stage floor planks */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[-2.5 + i * 1, 1.02, 0]} receiveShadow>
          <boxGeometry args={[0.9, 0.04, 7.8]} />
          <meshStandardMaterial color="#a87538" roughness={0.85} />
        </mesh>
      ))}

      {/* Back wall */}
      <mesh position={[0, 3.5, -3.8]} castShadow>
        <boxGeometry args={[12, 5, 0.3]} />
        <meshStandardMaterial color="#5c1010" roughness={0.9} />
      </mesh>

      {/* Arch */}
      <mesh position={[0, 5.5, -3.7]} castShadow>
        <boxGeometry args={[12.5, 1, 0.4]} />
        <meshStandardMaterial color="#7a1818" roughness={0.85} />
      </mesh>
      <mesh position={[-5.75, 3.5, -3.7]} castShadow>
        <boxGeometry args={[1, 5, 0.4]} />
        <meshStandardMaterial color="#7a1818" roughness={0.85} />
      </mesh>
      <mesh position={[5.75, 3.5, -3.7]} castShadow>
        <boxGeometry args={[1, 5, 0.4]} />
        <meshStandardMaterial color="#7a1818" roughness={0.85} />
      </mesh>

      {/* Curtain */}
      <mesh ref={curtainRef} position={[0, 3.5, -3.5]} castShadow>
        <boxGeometry args={[9.5, 5, 0.15]} />
        <meshStandardMaterial color="#a82828" roughness={1} side={THREE.DoubleSide} />
      </mesh>

      {/* Roof over stage */}
      <mesh position={[0, 6.2, -1.9]} castShadow>
        <boxGeometry args={[12.5, 0.3, 4.5]} />
        <meshStandardMaterial color="#5c1010" roughness={0.9} />
      </mesh>

      {/* Staircase front */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, i * 0.33 + 0.15, 4.3 - i * 0.35]} castShadow>
          <boxGeometry args={[4, 0.33, 0.7]} />
          <meshStandardMaterial color="#7a4818" roughness={0.85} />
        </mesh>
      ))}

      {/* Light bar */}
      <mesh position={[0, 6.5, -0.5]}>
        <boxGeometry args={[11, 0.15, 0.15]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* LED spots on bar */}
      {[-4, -2.5, -1, 1, 2.5, 4].map((x, i) => (
        <mesh key={i} position={[x, 6.4, -0.5]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial
            color="#ffd766"
            emissive="#ffd766"
            emissiveIntensity={4}
          />
        </mesh>
      ))}

      {/* Wooden columns */}
      {[-5, 5].map((x, i) => (
        <mesh key={i} position={[x, 3, -3.5]} castShadow>
          <cylinderGeometry args={[0.3, 0.35, 6, 8]} />
          <meshStandardMaterial color="#7a4818" roughness={0.85} />
        </mesh>
      ))}

      {/* "FAR WEST" banner */}
      <Text
        position={[0, 5.2, -3.4]}
        fontSize={0.8}
        color="#ffd766"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.06}
        outlineColor="#3a1800"
      >
        FAR WEST
      </Text>
    </group>
  )
}
