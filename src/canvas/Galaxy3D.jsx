import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function OrbitingOrb({ index, total, title, onClick }) {
  const meshRef = useRef();
  const radius = 3.2;
  const angle = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * 0.35 + angle;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.4;
      meshRef.current.rotation.y += 0.02;
    }
  });

  const colors = ['#ff2a8d', '#9d4edd', '#fbbf24', '#38bdf8', '#10b981', '#f43f5e'];
  const orbColor = colors[index % colors.length];

  return (
    <group ref={meshRef}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick(index);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color={orbColor}
          emissive={orbColor}
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Outer Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[0.55, 0.65, 32]} />
        <meshBasicMaterial color={orbColor} side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function GalaxyCore() {
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={coreRef}>
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>
      <pointLight intensity={4} distance={10} color="#fbbf24" />
    </group>
  );
}

export default function Galaxy3D({ onSelectOrb }) {
  const totalOrbs = 8;

  return (
    <div style={{ width: '100%', height: '420px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 2.5, 6.5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ff2a8d" />

        <GalaxyCore />

        {Array.from({ length: totalOrbs }).map((_, idx) => (
          <OrbitingOrb
            key={idx}
            index={idx}
            total={totalOrbs}
            title={`Memory #${idx + 1}`}
            onClick={onSelectOrb}
          />
        ))}
      </Canvas>
    </div>
  );
}
