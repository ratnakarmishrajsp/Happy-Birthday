import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HeartLock({ isUnlocked, onClick }) {
  const lockRef = useRef();
  const shackleRef = useRef();

  useFrame((state, delta) => {
    if (lockRef.current) {
      lockRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }

    if (shackleRef.current) {
      if (isUnlocked) {
        shackleRef.current.position.y = THREE.MathUtils.lerp(shackleRef.current.position.y, 0.9, delta * 5);
        shackleRef.current.rotation.y = THREE.MathUtils.lerp(shackleRef.current.rotation.y, Math.PI / 4, delta * 5);
      } else {
        shackleRef.current.position.y = THREE.MathUtils.lerp(shackleRef.current.position.y, 0.45, delta * 5);
        shackleRef.current.rotation.y = THREE.MathUtils.lerp(shackleRef.current.rotation.y, 0, delta * 5);
      }
    }
  });

  return (
    <group
      ref={lockRef}
      position={[0, -0.3, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {/* Lock Shackle */}
      <group ref={shackleRef} position={[0, 0.45, 0]}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.55, 0.12, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      {/* Lock Body (Gold & Rose Metal) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 1.2, 0.5]} />
        <meshStandardMaterial
          color="#ff2a8d"
          emissive="#880e4f"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Center Keyhole */}
      <mesh position={[0, 0, 0.26]}>
        <circleGeometry args={[0.18, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -0.12, 0.26]}>
        <planeGeometry args={[0.1, 0.22]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

export default function VaultLock3D({ isUnlocked, onLockClick }) {
  return (
    <div style={{ width: '100%', height: '300px', position: 'relative', cursor: 'pointer' }}>
      <Canvas camera={{ position: [0, 0.5, 3.8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#fbbf24" />
        <pointLight position={[-5, -5, -2]} intensity={1} color="#ff2a8d" />

        <HeartLock isUnlocked={isUnlocked} onClick={onLockClick} />
      </Canvas>
    </div>
  );
}
