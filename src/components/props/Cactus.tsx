interface Props {
  position: [number, number, number]
  scale?: number
}

export function Cactus({ position, scale = 1 }: Props) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Main trunk */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 3, 8]} />
        <meshStandardMaterial color="#3a6a1a" roughness={0.85} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.55, 2.3, 0]} rotation={[0, 0, -Math.PI / 3]} castShadow>
        <cylinderGeometry args={[0.14, 0.18, 1.4, 8]} />
        <meshStandardMaterial color="#3a6a1a" roughness={0.85} />
      </mesh>
      <mesh position={[-1.05, 2.9, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.9, 8]} />
        <meshStandardMaterial color="#3a6a1a" roughness={0.85} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.55, 2.0, 0]} rotation={[0, 0, Math.PI / 3]} castShadow>
        <cylinderGeometry args={[0.14, 0.18, 1.2, 8]} />
        <meshStandardMaterial color="#3a6a1a" roughness={0.85} />
      </mesh>
      <mesh position={[1.0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#3a6a1a" roughness={0.85} />
      </mesh>
    </group>
  )
}
