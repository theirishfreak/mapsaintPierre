import { Text } from '@react-three/drei'

interface Props {
  onClick?: () => void
}

export function EntranceArch({ onClick }: Props) {
  return (
    <group position={[0, 0, 65]} onClick={onClick}>
      {/* Left post */}
      <mesh position={[-4, 3.5, 0]} castShadow>
        <boxGeometry args={[1, 7, 0.8]} />
        <meshStandardMaterial color="#7a4818" roughness={0.85} />
      </mesh>

      {/* Right post */}
      <mesh position={[4, 3.5, 0]} castShadow>
        <boxGeometry args={[1, 7, 0.8]} />
        <meshStandardMaterial color="#7a4818" roughness={0.85} />
      </mesh>

      {/* Top beam */}
      <mesh position={[0, 7.2, 0]} castShadow>
        <boxGeometry args={[9.5, 1, 0.8]} />
        <meshStandardMaterial color="#5c3010" roughness={0.85} />
      </mesh>

      {/* Diagonal cross braces */}
      <mesh position={[-2.5, 5.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.2, 3, 0.4]} />
        <meshStandardMaterial color="#5c3010" roughness={0.85} />
      </mesh>
      <mesh position={[2.5, 5.5, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.2, 3, 0.4]} />
        <meshStandardMaterial color="#5c3010" roughness={0.85} />
      </mesh>

      {/* Sheriff star at top */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
        const outerR = 0.7
        return (
          <group key={i} position={[0, 8.5, 0.1]}>
            <mesh position={[Math.cos(angle) * outerR, Math.sin(angle) * outerR, 0]}>
              <boxGeometry args={[0.2, 0.2, 0.1]} />
              <meshStandardMaterial color="#ffd766" emissive="#ffd766" emissiveIntensity={2} metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        )
      })}
      {/* Star body */}
      <mesh position={[0, 8.5, 0.1]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 5]} />
        <meshStandardMaterial color="#ffd766" emissive="#ffd766" emissiveIntensity={2} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Text */}
      <Text
        position={[0, 7.2, 0.5]}
        fontSize={0.7}
        color="#ffd766"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.06}
        outlineColor="#3a1800"
      >
        FAR WEST
      </Text>

      {/* Info stand */}
      <group position={[-7, 0, 0]}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.8, 1.5]} />
          <meshStandardMaterial color="#7a4818" roughness={0.85} />
        </mesh>
        {/* Awning */}
        <mesh position={[0, 2, 0.5]} castShadow>
          <boxGeometry args={[3, 0.15, 2.5]} />
          <meshStandardMaterial color="#a82828" roughness={0.9} />
        </mesh>
        <Text
          position={[0, 1.6, 0.76]}
          fontSize={0.25}
          color="#ffd766"
          anchorX="center"
          anchorY="middle"
        >
          POINT INFO
        </Text>
      </group>
    </group>
  )
}
