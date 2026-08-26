import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Sparkles, Rocket } from 'lucide-react';

function WarpStars({ count = 1500 }) {
  const points = useRef();

  const [positions, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#ff2a8d'),
      new THREE.Color('#9d4edd'),
      new THREE.Color('#fbbf24'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#ffffff')
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      spd[i] = 1.5 + Math.random() * 3.0;

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, spd, col];
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      const positionsArr = points.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        positionsArr[i * 3 + 2] += speeds[i] * delta * 55;
        if (positionsArr[i * 3 + 2] > 20) {
          positionsArr[i * 3 + 2] = -50;
          positionsArr[i * 3] = (Math.random() - 0.5) * 45;
          positionsArr[i * 3 + 1] = (Math.random() - 0.5) * 45;
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true;
      points.current.rotation.z += delta * 2.0;
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
        size={0.2}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function EnergyRings() {
  const group = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.children.forEach((ring, idx) => {
        ring.scale.x += delta * (3 + idx * 0.8);
        ring.scale.y += delta * (3 + idx * 0.8);
        ring.rotation.z += delta * (1.5 + idx * 0.4);
        if (ring.scale.x > 10) {
          ring.scale.set(0.1, 0.1, 0.1);
        }
      });
    }
  });

  return (
    <group ref={group}>
      {[1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[0, 0, -5 - i * 3]} scale={[0.2, 0.2, 0.2]}>
          <ringGeometry args={[1, 1.3, 32]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#ff2a8d' : '#9d4edd'}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function CosmicWarpOverlay({ isWarping, nextStageTitle = 'Next Memory Stage' }) {
  return (
    <AnimatePresence>
      {isWarping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            background: 'radial-gradient(circle at center, #1b002c 0%, #05010d 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'all',
            overflow: 'hidden'
          }}
        >
          {/* 3D Hyperspace Warp Canvas */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
              <WarpStars count={1800} />
              <EnergyRings />
            </Canvas>
          </div>

          {/* Fullscreen Expanding Cosmic Sphere Wave Animation */}
          <motion.div
            animate={{
              scale: [0.5, 3.5, 30],
              opacity: [0.3, 0.95, 0]
            }}
            transition={{ duration: 1.7, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,42,141,0.9) 0%, rgba(157,78,221,0.7) 45%, rgba(251,191,36,0.5) 75%, rgba(0,0,0,0) 100%)',
              filter: 'blur(20px)',
              boxShadow: '0 0 80px rgba(255, 42, 141, 0.9)'
            }}
          />

          {/* Central Warp Text Banner */}
          <motion.div
            initial={{ scale: 0.5, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center',
              padding: '24px 36px',
              background: 'rgba(15, 12, 35, 0.82)',
              border: '2px solid rgba(255, 42, 141, 0.65)',
              borderRadius: '24px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 50px rgba(255, 42, 141, 0.7)',
              maxWidth: '90%'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-block', marginBottom: '12px' }}
            >
              <Rocket size={38} color="#ff758c" />
            </motion.div>

            <h2
              className="font-title gradient-text-magic"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', marginBottom: '8px', letterSpacing: '1px' }}
            >
              WARPING TO NEXT LEVEL...
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#cbd5e1', fontSize: '1rem', fontWeight: 600 }}>
              <Sparkles size={16} color="#fbbf24" />
              <span>{nextStageTitle}</span>
              <Sparkles size={16} color="#fbbf24" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
