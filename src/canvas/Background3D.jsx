import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarParticles({ count = 800 }) {
  const points = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#ff2a8d'),
      new THREE.Color('#9d4edd'),
      new THREE.Color('#fbbf24'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#ffffff')
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.02;
      points.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingHearts({ count = 15 }) {
  const group = useRef();

  const heartsData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10
      ],
      speed: 0.2 + Math.random() * 0.4,
      scale: 0.15 + Math.random() * 0.2,
      rotationSpeed: (Math.random() - 0.5) * 0.8
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.children.forEach((child, idx) => {
        const item = heartsData[idx];
        child.position.y += item.speed * delta;
        child.rotation.z += item.rotationSpeed * delta;
        if (child.position.y > 10) {
          child.position.y = -10;
        }
      });
    }
  });

  // Heart shape geometry
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  return (
    <group ref={group}>
      {heartsData.map((item, i) => (
        <mesh key={i} position={item.position} scale={item.scale} rotation={[Math.PI, 0, 0]}>
          <shapeGeometry args={[heartShape]} />
          <meshStandardMaterial
            color="#ff2a8d"
            emissive="#ff2a8d"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff758c" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#9d4edd" />
        <StarParticles count={900} />
        <FloatingHearts count={16} />
      </Canvas>
    </div>
  );
}
