import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { memoryPhotos } from '../utils/photoFallbacks';

const PLANET_NAMES = [
  "🪐 Planet Twilight Chill",
  "🎮 Planet Arcade Squad",
  "🦖 Planet Dino Boss",
  "🛺 Planet Auto Comedy",
  "🍕 Planet Foodie Madness",
  "💆‍♀️ Planet Spa Day",
  "🥚 Planet Baby Dino",
  "💃 Planet Desi Swag"
];

const PLANET_COLORS = [
  '#ff2a8d',
  '#ec4899',
  '#f43f5e',
  '#38bdf8',
  '#10b981',
  '#a855f7',
  '#ff758c',
  '#f59e0b'
];

function OrbitingOrb({ index, total, onClick }) {
  const meshRef = useRef();
  const radius = 3.6;
  const angle = (index / total) * Math.PI * 2;
  const orbColor = PLANET_COLORS[index % PLANET_COLORS.length];
  const planetName = PLANET_NAMES[index] || `Planet Memory #${index + 1}`;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * 0.25 + angle;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.5;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={meshRef}>
      {/* 3D Planet Orb Sphere */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick(index);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshStandardMaterial
          color={orbColor}
          emissive={orbColor}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Planetary Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[0.62, 0.78, 32]} />
        <meshBasicMaterial color={orbColor} side={THREE.DoubleSide} transparent opacity={0.65} />
      </mesh>

      {/* HTML Floating Badge / Label above the planet */}
      <Html position={[0, 0.85, 0]} center distanceFactor={10} zIndexRange={[100, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick(index);
          }}
          style={{
            background: 'rgba(15, 10, 30, 0.88)',
            border: `1px solid ${orbColor}`,
            boxShadow: `0 0 15px ${orbColor}66`,
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: '800',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            userSelect: 'none',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
            pointerEvents: 'auto'
          }}
        >
          {planetName}
        </div>
      </Html>
    </group>
  );
}

function GalaxyCore() {
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={coreRef}>
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1.3}
          roughness={0.1}
        />
      </mesh>

      {/* Sun Atmosphere Glow */}
      <mesh scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial color="#ff2a8d" transparent opacity={0.25} />
      </mesh>

      <pointLight intensity={5} distance={15} color="#fbbf24" />
    </group>
  );
}

export default function Galaxy3D({ onSelectOrb }) {
  const totalOrbs = memoryPhotos.length;

  return (
    <div style={{ width: '100%', height: '480px', position: 'relative', borderRadius: '24px', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 3.2, 7.5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#ff2a8d" />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} maxPolarAngle={Math.PI / 2.1} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <GalaxyCore />

          {Array.from({ length: totalOrbs }).map((_, idx) => (
            <OrbitingOrb
              key={idx}
              index={idx}
              total={totalOrbs}
              onClick={onSelectOrb}
            />
          ))}
        </Float>
      </Canvas>
    </div>
  );
}
