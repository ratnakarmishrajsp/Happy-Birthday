import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles as ThreeSparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Key, Lock, Sparkles, ShieldCheck, Zap, X, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { triggerConfetti, triggerHeartConfetti } from '../utils/confetti';

const TEASING_ATTEMPTS = [
  {
    msg: "Nice try Sadhivaaa! 😜 The Royal Gate is sealed with 256-bit Brother Security until 30th Aug Midnight!",
    btn: "TRY AGAIN 🔄 (Attempt 1/4)"
  },
  {
    msg: "Patience Dino Boss! 🦖 The Gate engine is charging for 30th August 12:00 AM Midnight!",
    btn: "TRY AGAIN 🔄 (Attempt 2/4)"
  },
  {
    msg: "Pagal + Badmash + Sadhivaaa = Access Denied! Treat for Brother required for instant unlock! 😂",
    btn: "TRY AGAIN 🔄 (Attempt 3/4)"
  },
  {
    msg: "Vault Lockdown! 🛑 This Golden Gate ONLY opens when clock hits ZERO on 30 Aug Midnight!",
    btn: "TRY AGAIN 🔄 (Attempt 4/4)"
  }
];

// 3D Floating Particles & Stars Background
function CosmicGateBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#fbbf24" />
      <pointLight position={[-10, -10, -5]} intensity={1.2} color="#ff2a8d" />
      <ThreeSparkles count={180} scale={12} size={3} speed={0.4} color="#fbbf24" />
    </Canvas>
  );
}

export default function CountdownLockGate({ onUnlock }) {
  const targetTime = new Date('2026-08-30T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [attemptCount, setAttemptCount] = useState(0);
  const [isKeyAnimating, setIsKeyAnimating] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);
  const [isGateOpening, setIsGateOpening] = useState(false);

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

      if (updated.isReached && !isGateOpening) {
        clearInterval(timer);
        triggerGateOpenSequence();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isGateOpening]);

  const triggerGateOpenSequence = () => {
    setIsGateOpening(true);
    soundEngine.playSuccess();
    triggerConfetti(4000);
    triggerHeartConfetti();

    setTimeout(() => {
      onUnlock();
    }, 2200);
  };

  const handleKeyClick = () => {
    if (isKeyAnimating || isGateOpening) return;

    soundEngine.playPop();
    setIsKeyAnimating(true);
    setActiveMessage(null);

    // Simulate key insertion & failed lock turn sequence
    setTimeout(() => {
      soundEngine.playError();
      setIsKeyAnimating(false);

      const currentAttempt = TEASING_ATTEMPTS[attemptCount % TEASING_ATTEMPTS.length];
      setActiveMessage(currentAttempt.msg);
      setAttemptCount((prev) => prev + 1);
    }, 1600);
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode.trim() === '0830' || passcode.trim().toLowerCase() === 'ratnakar') {
      setShowKeyModal(false);
      triggerGateOpenSequence();
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
        backgroundColor: '#05040d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflow: 'hidden',
        perspective: '1200px'
      }}
    >
      {/* 3D Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <CosmicGateBackground />
      </div>

      {/* Top Countdown Header Bar */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          zIndex: 10,
          marginBottom: '20px',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            background: 'rgba(251, 191, 36, 0.15)',
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
          <Sparkles size={14} color="#fbbf24" /> 30 AUGUST 2026 MIDNIGHT UNLOCK 👑
        </span>

        {/* Real-time Countdown Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '12px'
          }}
        >
          {[
            { label: 'DAYS', val: timeLeft.days },
            { label: 'HRS', val: timeLeft.hours },
            { label: 'MIN', val: timeLeft.minutes },
            { label: 'SEC', val: timeLeft.seconds }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 10, 30, 0.85)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '14px',
                padding: '8px 14px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="font-title" style={{ fontSize: '1.2rem', fontWeight: 900, color: idx === 3 ? '#ff2a8d' : '#fbbf24' }}>
                {String(item.val).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.6rem', color: '#94a3b8', display: 'block', fontWeight: 800, marginTop: '2px' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* The Majestic Golden Royal Gate & Lock Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          height: 'clamp(250px, 36vh, 360px)',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px 0'
        }}
      >
        {/* Left Swinging Golden Gate Door */}
        <motion.div
          animate={{
            rotateY: isGateOpening ? -100 : 0,
            x: isGateOpening ? -180 : 0
          }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '50%',
            background: 'linear-gradient(135deg, rgba(30, 20, 60, 0.95) 0%, rgba(15, 10, 35, 0.98) 100%)',
            border: '2px solid rgba(251, 191, 36, 0.6)',
            borderRight: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '24px 0 0 24px',
            transformOrigin: 'left center',
            boxShadow: 'inset 0 0 40px rgba(251, 191, 36, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '15px'
          }}
        >
          {/* Gate Metallic Ornaments */}
          <div style={{ border: '2px dashed rgba(251, 191, 36, 0.3)', width: '80%', height: '80%', borderRadius: '16px' }} />
        </motion.div>

        {/* Right Swinging Golden Gate Door */}
        <motion.div
          animate={{
            rotateY: isGateOpening ? 100 : 0,
            x: isGateOpening ? 180 : 0
          }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '50%',
            background: 'linear-gradient(135deg, rgba(30, 20, 60, 0.95) 0%, rgba(15, 10, 35, 0.98) 100%)',
            border: '2px solid rgba(251, 191, 36, 0.6)',
            borderLeft: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '0 24px 24px 0',
            transformOrigin: 'right center',
            boxShadow: 'inset 0 0 40px rgba(251, 191, 36, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '15px'
          }}
        >
          {/* Gate Metallic Ornaments */}
          <div style={{ border: '2px dashed rgba(251, 191, 36, 0.3)', width: '80%', height: '80%', borderRadius: '16px' }} />
        </motion.div>

        {/* Central Heavy Golden Lock Core */}
        <motion.div
          animate={{
            scale: isKeyAnimating ? [1, 1.15, 0.95, 1] : 1,
            rotate: isKeyAnimating ? [0, 15, -15, 0] : 0
          }}
          transition={{ duration: 1.2 }}
          style={{
            position: 'relative',
            zIndex: 20,
            width: 'clamp(110px, 26vw, 135px)',
            height: 'clamp(110px, 26vw, 135px)',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
            border: '4px solid #ffffff',
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.8), inset 0 0 15px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={handleKeyClick}
        >
          <Lock size={38} color="#070712" />
          <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#070712', marginTop: '4px', letterSpacing: '1px' }}>
            {isGateOpening ? 'UNLOCKED' : 'LOCKED'}
          </span>
        </motion.div>

        {/* Animated Flying Key Element */}
        <motion.div
          animate={{
            x: isKeyAnimating ? [0, 0, 0, 0] : 0,
            y: isKeyAnimating ? [120, 0, 0, 120] : 120,
            rotate: isKeyAnimating ? [0, 360, 720, 0] : 0,
            scale: isKeyAnimating ? [1, 1.3, 1] : 1
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            zIndex: 30,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 15px #fbbf24)'
          }}
        >
          <Key size={44} color="#fbbf24" />
        </motion.div>
      </div>

      {/* Teasing Message Card Popup */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{
              position: 'relative',
              zIndex: 30,
              marginTop: '20px',
              maxWidth: '520px',
              width: '92%',
              background: 'rgba(255, 42, 141, 0.22)',
              border: '1px solid rgba(255, 42, 141, 0.6)',
              borderRadius: '20px',
              padding: '14px 20px',
              textAlign: 'center',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 700,
              boxShadow: '0 8px 30px rgba(255, 42, 141, 0.4)',
              backdropFilter: 'blur(12px)'
            }}
          >
            {activeMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Interactive Key Action Buttons */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          position: 'relative',
          zIndex: 30,
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={handleKeyClick}
          disabled={isKeyAnimating || isGateOpening}
          className="glow-button"
          style={{ minWidth: '220px' }}
        >
          <Key size={20} />
          <span>
            {attemptCount === 0
              ? 'CLICK KEY TO UNLOCK GATE 🔑'
              : TEASING_ATTEMPTS[(attemptCount - 1) % TEASING_ATTEMPTS.length].btn}
          </span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setShowKeyModal(true);
          }}
          className="glass-panel"
          style={{
            background: 'rgba(157, 78, 221, 0.25)',
            border: '1px solid rgba(157, 78, 221, 0.6)',
            color: '#fbbf24',
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
          <ShieldCheck size={16} color="#fbbf24" />
          <span>BROTHER OVERRIDE KEY 🔑</span>
        </button>
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
