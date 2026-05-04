import { Text } from '@react-three/drei'

interface Props {
  onClick?: () => void
}

export function Photobooth({ onClick }: Props) {
  return (
    <group position={[0, 0, -55]} onClick={onClick}>
      {/* Main pavilion */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 4]} />
        <meshStandardMaterial color="#a87538" roughness={0.85} />
      </mesh>

      {/* Pointed roof */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <coneGeometry args={[3, 1.8, 4]} />
        <meshStandardMaterial color="#5c1010" roughness={0.9} />
      </mesh>

      {/* Facade saloon trompe-l'oeil */}
      <mesh position={[0, 2, 2.01]} castShadow>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#7a1818" roughness={0.9} />
      </mesh>

      {/* Door cutout frame */}
      <mesh position={[0, 1.2, 2.05]}>
        <boxGeometry args={[1.6, 2.4, 0.05]} />
        <meshStandardMaterial color="#3a1800" roughness={0.9} />
      </mesh>

      {/* Windows on facade */}
      {[-1.2, 1.2].map((x, i) => (
        <mesh key={i} position={[x, 2.2, 2.06]}>
          <boxGeometry args={[0.9, 1.1, 0.04]} />
          <meshStandardMaterial color="#2a1800" roughness={0.5} />
        </mesh>
      ))}

      {/* Globe lamp above */}
      <mesh position={[0, 3.5, 2.1]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#ffdd99" emissive="#ffcc44" emissiveIntensity={3} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 3.2, 2.1]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#5a3010" roughness={0.9} />
      </mesh>

      {/* Props chest */}
      <mesh position={[2.2, 0.3, 2]} castShadow>
        <boxGeometry args={[0.9, 0.6, 0.6]} />
        <meshStandardMaterial color="#5c3010" roughness={0.85} />
      </mesh>
      <mesh position={[2.2, 0.62, 2]}>
        <boxGeometry args={[0.92, 0.08, 0.62]} />
        <meshStandardMaterial color="#7a4818" roughness={0.85} />
      </mesh>

      {/* Hat on chest */}
      <mesh position={[2.2, 0.78, 2]} castShadow>
        <cylinderGeometry args={[0.18, 0.25, 0.25, 12]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.85} />
      </mesh>
      <mesh position={[2.2, 0.68, 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.06, 12]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.85} />
      </mesh>

      <Text
        position={[0, 3.1, 2.1]}
        fontSize={0.3}
        color="#ffd766"
        anchorX="center"
        anchorY="middle"
      >
        PHOTOBOOTH
      </Text>
    </group>
  )
}
