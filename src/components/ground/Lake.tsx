import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Lake() {
  const waterRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)

  const shape = useMemo(() => {
    const s = new THREE.Shape()
    // Ellipse approximation 80x40
    const rx = 40, ry = 20
    s.moveTo(rx, 0)
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2
      s.lineTo(Math.cos(a) * rx, Math.sin(a) * ry)
    }
    return s
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      const t = state.clock.elapsedTime * 0.1
      materialRef.current.normalMap?.offset?.set(t * 0.3, t * 0.2)
    }
  })

  // Lake bed / shore gradient
  return (
    <group position={[0, -1, 0]}>
      {/* Shore ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[39, 48, 64]} />
        <meshStandardMaterial color="#5a6a40" roughness={1} />
      </mesh>

      {/* Water surface */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <shapeGeometry args={[shape]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color="#1a3a5c"
          transmission={0.7}
          roughness={0.05}
          metalness={0.1}
          ior={1.33}
          transparent
          opacity={0.88}
          envMapIntensity={2}
        />
      </mesh>

      {/* Reflection highlights (moon) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.1, -8]}>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#c8d8ff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Lake bed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color="#1a2c1a" roughness={1} />
      </mesh>
    </group>
  )
}
