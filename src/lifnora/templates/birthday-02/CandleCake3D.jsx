import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles as ThreeSparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Heart, Flame, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEngine';
import { triggerConfetti, triggerHeartConfetti } from '../../../utils/confetti';

// 3D Cake & Candle Flames Three.js Component
function Cake3DModel({ isBlown, onBlowCandles }) {
  const cakeGroupRef = useRef();

  useFrame((state, delta) => {
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={cakeGroupRef} onClick={onBlowCandles} cursor="pointer" scale={[1.3, 1.3, 1.3]}>
      {/* Bottom Cake Tier */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.8, 32]} />
        <meshStandardMaterial color="#9d4edd" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Middle Cake Tier */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.7, 32]} />
        <meshStandardMaterial color="#ff2a8d" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Top Cake Tier */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Gold Frosting Pearls */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.68, 0.98, Math.sin(angle) * 0.68]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
          </mesh>
        );
      })}

      {/* Center Candle */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.4, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Burning Candle Flame */}
      {!isBlown && (
        <group position={[0, 1.42, 0]}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
          </mesh>
          <pointLight intensity={3} color="#fbbf24" distance={3} />
        </group>
      )}

      {/* Smoke Particles after blowing */}
      {isBlown && (
        <ThreeSparkles count={30} scale={1.5} size={2} speed={0.8} color="#cbd5e1" position={[0, 1.4, 0]} />
      )}
    </group>
  );
}

export default function CandleCake3D({ recipientName = "Anshika Didi", onStartSurprise }) {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlowCandles = () => {
    if (isBlown) return;

    soundEngine.playPop();
    setIsBlown(true);

    soundEngine.playSuccess();
    triggerConfetti(4000);
    triggerHeartConfetti();
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '16px', zIndex: 10 }}
      >
        <span
          style={{
            background: 'rgba(251, 191, 36, 0.18)',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            color: '#fbbf24',
            padding: '6px 20px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={14} color="#fbbf24" /> BIRTHDAY DESIGN 02 • ROYAL CAKE 🎂
        </span>

        <h1
          className="font-title gradient-text-gold"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            marginTop: '10px',
            marginBottom: '8px'
          }}
        >
          Happy Birthday {recipientName}!
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
          {isBlown
            ? "Your wish has been sent to the stars! ✨ Click below to enter the surprise."
            : "Tap or Blow on the 3D Birthday Candle below to make your birthday wish! 🕯️"}
        </p>
      </motion.div>

      {/* 3D Birthday Cake Canvas Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '350px',
          position: 'relative',
          zIndex: 5,
          margin: '10px 0'
        }}
      >
        <Canvas camera={{ position: [0, 1.5, 4.5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff2a8d" />
          <pointLight position={[-10, -10, -5]} intensity={1.2} color="#fbbf24" />
          <ThreeSparkles count={100} scale={8} size={2.5} speed={0.4} color="#fbbf24" />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <Cake3DModel isBlown={isBlown} onBlowCandles={handleBlowCandles} />
          </Float>
        </Canvas>
      </div>

      {/* Blow Candle Action Button */}
      <motion.div style={{ zIndex: 10, marginTop: '16px' }}>
        {!isBlown ? (
          <button onClick={handleBlowCandles} className="glow-button">
            <Flame size={20} color="#fbbf24" />
            <span>BLOW THE BIRTHDAY CANDLE 🕯️</span>
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onStartSurprise}
            className="glow-button"
          >
            <span>ENTER ROYAL BIRTHDAY SURPRISE 🚀</span>
            <ArrowRight size={20} />
          </motion.button>
        )}
      </motion.div>
    </section>
  );
}
