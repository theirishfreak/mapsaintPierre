import { Text } from '@react-three/drei'
import { Campfire } from '../props/Campfire'
import { Silhouette } from '../characters/Silhouette'

interface Props {
  onZoneClick?: (id: string) => void
}

const FENCE_COLOR = '#7a4818'

export function KidsVillage({ onZoneClick }: Props) {
  return (
    <group position={[45, 0, 35]}>
      {/* Fence perimeter */}
      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={`fence-w-${i}`} position={[-15 + i * 2, 0.5, -12]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.2, 6]} />
          <meshStandardMaterial color={FENCE_COLOR} roughness={0.9} />
        </mesh>
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={`fence-e-${i}`} position={[-15 + i * 2, 0.5, 12]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.2, 6]} />
          <meshStandardMaterial color={FENCE_COLOR} roughness={0.9} />
        </mesh>
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <mesh key={`fence-n-${i}`} position={[-15, 0.5, -10 + i * 1.8]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.2, 6]} />
          <meshStandardMaterial color={FENCE_COLOR} roughness={0.9} />
        </mesh>
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <mesh key={`fence-s-${i}`} position={[15, 0.5, -10 + i * 1.8]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.2, 6]} />
          <meshStandardMaterial color={FENCE_COLOR} roughness={0.9} />
        </mesh>
      ))}

      {/* Sign */}
      <group position={[0, 0, -12]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[4, 0.8, 0.15]} />
          <meshStandardMaterial color="#5c3010" roughness={0.85} />
        </mesh>
        <Text position={[0, 1.5, 0.1]} fontSize={0.35} color="#ffd766" anchorX="center" anchorY="middle">
          VILLAGE ENFANTS
        </Text>
      </group>

      {/* 1. Archery — top-left */}
      <group position={[-9, 0, -7]} onClick={() => onZoneClick?.('tir-cible')}>
        {/* Target cactus 1 */}
        <mesh position={[0, 1.5, -2]} castShadow>
          <cylinderGeometry args={[0.2, 0.22, 3, 8]} />
          <meshStandardMaterial color="#3a6a1a" roughness={0.85} />
        </mesh>
        <mesh position={[0, 2, -2]}>
          <torusGeometry args={[0.5, 0.08, 8, 16]} />
          <meshStandardMaterial color="#cc2222" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2, -2]}>
          <torusGeometry args={[0.3, 0.06, 8, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>
        {/* Hay bales */}
        <mesh position={[-1.5, 0.3, -1.5]} castShadow>
          <boxGeometry args={[0.8, 0.7, 0.8]} />
          <meshStandardMaterial color="#c8a030" roughness={0.95} />
        </mesh>
        {/* Bow rack */}
        <mesh position={[1, 0.8, 0]} castShadow>
          <boxGeometry args={[0.1, 1.6, 0.5]} />
          <meshStandardMaterial color="#7a4818" roughness={0.85} />
        </mesh>
        <Text position={[0, 3, -2]} fontSize={0.3} color="#ffd766" anchorX="center">TIR À LA CIBLE</Text>
      </group>

      {/* 2. Poney Express — top-right */}
      <group position={[7, 0, -6]} onClick={() => onZoneClick?.('poney')}>
        {/* Round enclos */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 4, 0.5, Math.sin(angle) * 3]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 1.2, 6]} />
              <meshStandardMaterial color={FENCE_COLOR} roughness={0.9} />
            </mesh>
          )
        })}
        {/* Poney 1 */}
        <group position={[1, 0, 1]}>
          <mesh position={[0, 0.7, 0]} castShadow>
            <boxGeometry args={[1.2, 0.7, 0.5]} />
            <meshStandardMaterial color="#8a5a20" roughness={0.85} />
          </mesh>
          <mesh position={[0.55, 1.1, 0]} castShadow>
            <boxGeometry args={[0.45, 0.4, 0.4]} />
            <meshStandardMaterial color="#8a5a20" roughness={0.85} />
          </mesh>
          {/* Legs */}
          {[[-0.35, 0, -0.18], [-0.35, 0, 0.18], [0.35, 0, -0.18], [0.35, 0, 0.18]].map(([lx, , lz], li) => (
            <mesh key={li} position={[lx, 0.2, lz]} castShadow>
              <cylinderGeometry args={[0.07, 0.07, 0.5, 6]} />
              <meshStandardMaterial color="#6a4010" roughness={0.85} />
            </mesh>
          ))}
        </group>
        {/* Rocking horse */}
        <group position={[-2, 0, 0]}>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[1.5, 0.6, 0.4]} />
            <meshStandardMaterial color="#c8802a" roughness={0.85} />
          </mesh>
          <mesh position={[0.55, 1.2, 0]} castShadow>
            <boxGeometry args={[0.5, 0.5, 0.35]} />
            <meshStandardMaterial color="#c8802a" roughness={0.85} />
          </mesh>
          {/* Rockers */}
          {[-0.2, 0.2].map((z, i) => (
            <mesh key={i} position={[0, 0.3, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <torusGeometry args={[0.7, 0.06, 6, 16, Math.PI]} />
              <meshStandardMaterial color="#7a4818" roughness={0.85} />
            </mesh>
          ))}
        </group>
        <Text position={[0, 3, -3.5]} fontSize={0.3} color="#ffd766" anchorX="center">PONEY EXPRESS</Text>
      </group>

      {/* 3. Lasso School — bottom-left */}
      <group position={[-8, 0, 5]}>
        {[[-2, 0, 0], [0, 0, 0], [2, 0, 0]].map(([x, , z], i) => (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, 1.2, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.1, 2.5, 6]} />
              <meshStandardMaterial color={FENCE_COLOR} roughness={0.9} />
            </mesh>
            {/* Mannequin cactus */}
            <mesh position={[0, 2.2, 0]} castShadow>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshStandardMaterial color="#3a6a1a" roughness={0.85} />
            </mesh>
          </group>
        ))}
        <Text position={[0, 3, 0]} fontSize={0.3} color="#ffd766" anchorX="center">LASSO SCHOOL</Text>
      </group>

      {/* 4. Makeup — bottom-right area */}
      <group position={[8, 0, 7]}>
        {/* Table */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial color="#a87538" roughness={0.85} />
        </mesh>
        {/* Mirror */}
        <mesh position={[0, 1.5, -0.4]} castShadow>
          <boxGeometry args={[0.8, 1, 0.05]} />
          <meshStandardMaterial color="#c8c8c8" metalness={0.8} roughness={0.1} />
        </mesh>
        {/* Chairs */}
        {[-0.6, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.4, 0.3]} castShadow>
            <boxGeometry args={[0.5, 0.08, 0.5]} />
            <meshStandardMaterial color="#7a4818" roughness={0.85} />
          </mesh>
        ))}
        <Text position={[0, 2.5, 0]} fontSize={0.3} color="#ffd766" anchorX="center">MAQUILLAGE</Text>
      </group>

      {/* 5. Gold nugget hunt — center */}
      <group position={[0, 0, 4]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[4, 0.4, 2.5]} />
          <meshStandardMaterial color="#c8a030" roughness={0.95} />
        </mesh>
        {/* Nuggets (golden emissive) */}
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} position={[-1.5 + (i % 4) * 1, 0.5, -0.8 + Math.floor(i / 4) * 1.6]}>
            <dodecahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial color="#ffd766" emissive="#aa8800" emissiveIntensity={2} metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        <Text position={[0, 1.2, 0]} fontSize={0.3} color="#ffd766" anchorX="center">CHASSE AUX PÉPITES</Text>
      </group>

      {/* Central campfire */}
      <Campfire position={[0, 0, 0]} scale={0.8} />

      {/* Log seating */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 2.5, 0.2, Math.sin(angle) * 2.5]} rotation={[0, angle, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 1, 8]} />
            <meshStandardMaterial color="#5c3010" roughness={0.9} />
          </mesh>
        )
      })}

      {/* Characters — kids area */}
      <Silhouette position={[-5, 0, 3]} color="#3a1800" hatColor="#2a0a00" animation="idle" seed={1} />
      <Silhouette position={[5, 0, -4]} color="#1a2a4a" hatColor="#101a30" animation="idle" seed={3} />
    </group>
  )
}
