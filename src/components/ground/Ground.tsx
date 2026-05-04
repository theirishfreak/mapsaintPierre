import * as THREE from 'three'
import { useMemo } from 'react'

export function Ground() {
  const pathColor = useMemo(() => new THREE.Color('#8b7355'), [])

  return (
    <group>
      {/* Main grass ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[300, 250, 32, 32]} />
        <meshStandardMaterial color="#3a5c28" roughness={0.95} />
      </mesh>

      {/* Dry earth patches */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[280, 230, 16, 16]} />
        <meshStandardMaterial color="#4a6030" roughness={1} transparent opacity={0.6} />
      </mesh>

      {/* Main paths */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[6, 200]} />
        <meshStandardMaterial color={pathColor} roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[200, 6]} />
        <meshStandardMaterial color={pathColor} roughness={0.9} />
      </mesh>

      {/* Surrounding road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 110]} receiveShadow>
        <planeGeometry args={[240, 14]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -110]} receiveShadow>
        <planeGeometry args={[240, 14]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[110, -0.05, 0]} receiveShadow>
        <planeGeometry args={[14, 200]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-110, -0.05, 0]} receiveShadow>
        <planeGeometry args={[14, 200]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.85} />
      </mesh>

      {/* Park boundary fence posts */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={`fence-n-${i}`} position={[-95 + i * 10, 0.5, -80]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 6]} />
          <meshStandardMaterial color="#7a4818" roughness={0.9} />
        </mesh>
      ))}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={`fence-s-${i}`} position={[-95 + i * 10, 0.5, 80]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1.2, 6]} />
          <meshStandardMaterial color="#7a4818" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}
