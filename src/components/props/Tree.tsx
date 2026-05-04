interface Props {
  position: [number, number, number]
  variant?: 'pine' | 'oak'
  scale?: number
}

export function Tree({ position, variant = 'oak', scale = 1 }: Props) {
  if (variant === 'pine') {
    return (
      <group position={position} scale={[scale, scale, scale]}>
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.3, 2, 6]} />
          <meshStandardMaterial color="#4a2e0c" roughness={0.9} />
        </mesh>
        <mesh position={[0, 3.5, 0]} castShadow>
          <coneGeometry args={[1.5, 3, 8]} />
          <meshStandardMaterial color="#1a3a1a" roughness={0.9} />
        </mesh>
        <mesh position={[0, 5, 0]} castShadow>
          <coneGeometry args={[1.1, 2.5, 8]} />
          <meshStandardMaterial color="#1e4a1e" roughness={0.9} />
        </mesh>
        <mesh position={[0, 6.2, 0]} castShadow>
          <coneGeometry args={[0.7, 2, 8]} />
          <meshStandardMaterial color="#224a22" roughness={0.9} />
        </mesh>
      </group>
    )
  }

  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.4, 3, 7]} />
        <meshStandardMaterial color="#4a2e0c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4.5, 0]} castShadow>
        <sphereGeometry args={[2, 10, 8]} />
        <meshStandardMaterial color="#2a5a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.8, 3.8, 0.5]} castShadow>
        <sphereGeometry args={[1.2, 8, 7]} />
        <meshStandardMaterial color="#244a16" roughness={0.9} />
      </mesh>
    </group>
  )
}
