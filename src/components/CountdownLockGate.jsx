import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles as ThreeSparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Lock, Key, Sparkles, ShieldCheck, Zap, X, Disc } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { triggerConfetti, triggerHeartConfetti } from '../utils/confetti';

const TEASING_MESSAGES = [
  "Nice try Sadhivaaa! 🌌 Cosmic Vault unlocks strictly at 30th Aug 12:00 AM Midnight!",
  "Patience Dino Boss! 🦖 Cosmic engines are aligning for 30th August!",
  "Pagal + Badmash + Sadhivaaa = Space Vault unlocking... ⏳",
  "No sneaking allowed! 🔒 Wait for 30 August Midnight!",
  "Ratnakar locked this vault with super-secret cosmic brother magic! ✨"
];

// 3D Rotating Metallic Vault Core Component
function Vault3DCore() {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (outerRingRef.current) outerRingRef.current.rotation.z += delta * 0.4;
    if (innerRingRef.current) innerRingRef.current.rotation.z -= delta * 0.6;
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group scale={[1.4, 1.4, 1.4]}>
      {/* Central Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#ff2a8d"
          emissive="#ff2a8d"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Metallic Ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.2, 0.06, 16, 100]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Inner Rotating Ring */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[0.95, 0.04, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Point Lights */}
      <pointLight position={[0, 0, 2]} intensity={3} color="#ff2a8d" />
      <pointLight position={[0, 0, -2]} intensity={2} color="#fbbf24" />
    </group>
  );
}

export default function CountdownLockGate({ onUnlock }) {
  const targetTime = new Date('2026-08-30T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [toastMessage, setToastMessage] = useState(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isReached: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isReached: false
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (updated.isReached) {
        clearInterval(timer);
        triggerConfetti(4000);
        triggerHeartConfetti();
        soundEngine.playSuccess();
        setTimeout(() => {
          onUnlock();
        }, 1500);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onUnlock]);

  const handlePokeVault = () => {
    soundEngine.playPop();
    const randomMsg = TEASING_MESSAGES[Math.floor(Math.random() * TEASING_MESSAGES.length)];
    setToastMessage(randomMsg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode.trim() === '0830' || passcode.trim().toLowerCase() === 'ratnakar') {
      soundEngine.playSuccess();
      triggerConfetti(3000);
      setShowKeyModal(false);
      onUnlock();
    } else {
      soundEngine.playError();
      setPassError(true);
      setTimeout(() => setPassError(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#050512',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflow: 'hidden'
      }}
    >
      {/* 3D Cosmic Space Background with Rotating Rings & Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff2a8d" />
          <pointLight position={[-10, -10, -5]} intensity={1.2} color="#fbbf24" />

          <ThreeSparkles count={150} scale={10} size={2.5} speed={0.4} color="#ff758c" />

          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <Vault3DCore />
          </Float>
        </Canvas>
      </div>

      {/* Main Glassmorphic Cosmic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '36px 28px',
          borderRadius: '32px',
          textAlign: 'center',
          border: '1px solid rgba(255, 42, 141, 0.45)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95)',
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(22px)',
          background: 'rgba(10, 8, 25, 0.86)'
        }}
      >
        {/* Header Tag */}
        <div style={{ marginBottom: '16px' }}>
          <span
            style={{
              background: 'rgba(255, 42, 141, 0.2)',
              border: '1px solid rgba(255, 42, 141, 0.5)',
              color: '#ff758c',
              padding: '6px 18px',
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
            <Sparkles size={14} color="#fbbf24" /> THE COSMIC VAULT GATE 🌌
          </span>
        </div>

        <h1
          className="font-title gradient-text-magic"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            marginTop: '8px',
            marginBottom: '8px',
            lineHeight: '1.2'
          }}
        >
          Anshika Didi's Surprise
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '26px', maxWidth: '520px', margin: '0 auto 26px' }}>
          The 3D Cosmic Vault is locked. It will automatically unlock and blast open on <span style={{ color: '#fbbf24', fontWeight: '800' }}>30 August 2026 at Midnight 12:00 AM IST</span>.
        </p>

        {/* Live Countdown Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            marginBottom: '32px'
          }}
        >
          {[
            { label: 'DAYS', value: timeLeft.days, color: '#ff2a8d' },
            { label: 'HOURS', value: timeLeft.hours, color: '#a855f7' },
            { label: 'MINUTES', value: timeLeft.minutes, color: '#38bdf8' },
            { label: 'SECONDS', value: timeLeft.seconds, color: '#fbbf24' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.06 }}
              style={{
                background: 'rgba(20, 15, 45, 0.75)',
                border: `1px solid ${item.color}66`,
                borderRadius: '20px',
                padding: '16px 8px',
                textAlign: 'center',
                boxShadow: `0 8px 24px ${item.color}33`
              }}
            >
              <div
                className="font-title"
                style={{
                  fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
                  fontWeight: 900,
                  color: item.color,
                  textShadow: `0 0 18px ${item.color}aa`
                }}
              >
                {String(item.value).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#94a3b8',
                  letterSpacing: '1px',
                  marginTop: '4px'
                }}
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Teasing Toast Popup Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              style={{
                background: 'rgba(255, 42, 141, 0.25)',
                border: '1px solid rgba(255, 42, 141, 0.6)',
                borderRadius: '16px',
                padding: '12px 20px',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 700,
                marginBottom: '24px',
                boxShadow: '0 8px 25px rgba(255, 42, 141, 0.4)'
              }}
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={handlePokeVault}
            className="glass-panel"
            style={{
              background: 'rgba(255, 42, 141, 0.15)',
              color: '#ffffff',
              borderColor: 'rgba(255, 42, 141, 0.4)',
              borderRadius: '24px',
              padding: '10px 20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Lock size={16} color="#ff2a8d" />
            <span>POKE THE VAULT 🔒</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setShowKeyModal(true);
            }}
            style={{
              background: 'rgba(251, 191, 36, 0.2)',
              border: '1px solid rgba(251, 191, 36, 0.6)',
              color: '#fbbf24',
              borderRadius: '24px',
              padding: '10px 20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Key size={16} color="#fbbf24" />
            <span>BROTHER OVERRIDE KEY 🔑</span>
          </button>
        </div>
      </motion.div>

      {/* Secret Brother Override Passcode Modal */}
      <AnimatePresence>
        {showKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999999,
              background: 'rgba(5, 5, 15, 0.88)',
              backdropFilter: 'blur(18px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="glass-panel-glow"
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '28px',
                borderRadius: '24px',
                textAlign: 'center',
                border: '1px solid rgba(251, 191, 36, 0.5)',
                background: 'rgba(15, 10, 30, 0.95)',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setShowKeyModal(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <div style={{ background: 'rgba(251, 191, 36, 0.2)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <ShieldCheck size={26} color="#fbbf24" />
              </div>

              <h3 className="font-title" style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '6px' }}>
                Brother Master Key 🔑
              </h3>

              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
                Enter the secret passcode to test & preview the surprise website anytime:
              </p>

              <form onSubmit={handlePasscodeSubmit}>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. 0830)"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    border: passError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#fff',
                    fontSize: '1rem',
                    textAlign: 'center',
                    outline: 'none',
                    marginBottom: '16px'
                  }}
                />

                {passError && (
                  <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '12px' }}>
                    Incorrect Key! Hint: Use 0830 or ratnakar
                  </p>
                )}

                <button type="submit" className="glow-button" style={{ width: '100%' }}>
                  <span>UNLOCK & PREVIEW SURPRISE 🚀</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
