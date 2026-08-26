import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GiftBox({ isOpen }) {
  const boxRef = useRef();
  const lidRef = useRef();
  const lightRef = useRef();

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += delta * 0.4;
    }

    if (lidRef.current) {
      if (isOpen) {
        lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 2.5, delta * 4);
        lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, -Math.PI / 3, delta * 4);
      } else {
        lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 0.76, delta * 4);
        lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, 0, delta * 4);
      }
    }

    if (lightRef.current && isOpen) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, 12, delta * 5);
    }
  });

  return (
    <group ref={boxRef} position={[0, -0.5, 0]}>
      {/* Internal Beam Light */}
      <pointLight ref={lightRef} position={[0, 0.5, 0]} intensity={0} color="#fbbf24" distance={8} />

      {/* Main Gift Box Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.4, 1.5]} />
        <meshStandardMaterial
          color="#9d4edd"
          roughness={0.2}
          metalness={0.6}
          emissive="#4a148c"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Vertical Ribbon */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.52, 1.42, 0.3]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 1.42, 1.52]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Box Lid */}
      <group ref={lidRef} position={[0, 0.76, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.6, 0.3, 1.6]} />
          <meshStandardMaterial
            color="#ff2a8d"
            roughness={0.2}
            metalness={0.6}
            emissive="#880e4f"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Lid Ribbon Cross */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.62, 0.32, 0.32]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.32, 0.32, 1.62]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Ribbon Bow on Top */}
        <mesh position={[0, 0.35, 0]}>
          <torusGeometry args={[0.25, 0.08, 16, 32]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

function Balloon({ position, color, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.25;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
      </mesh>
      {/* Balloon Knot */}
      <mesh position={[0, -0.58, 0]}>
        <coneGeometry args={[0.08, 0.12, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export default function GiftBox3D({ isOpen }) {
  return (
    <div style={{ width: '100%', height: '380px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 1.5, 4.2], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 6, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-5, -2, -2]} intensity={1} color="#ff2a8d" />

        <GiftBox isOpen={isOpen} />

        <Balloon position={[-2.2, 0.8, -1]} color="#ff2a8d" speed={1.2} />
        <Balloon position={[2.2, 1.2, -1.2]} color="#9d4edd" speed={0.9} />
        <Balloon position={[-1.6, -0.4, 0.5]} color="#fbbf24" speed={1.4} />
        <Balloon position={[1.8, -0.6, 0.8]} color="#38bdf8" speed={1.1} />
      </Canvas>
    </div>
  );
}
