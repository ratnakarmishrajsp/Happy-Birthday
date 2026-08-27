import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Mail, Stamp } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { triggerConfetti, triggerHeartConfetti } from '../utils/confetti';

export default function Section11_FinalReveal({ onProceedToFinale }) {
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);

  const handleBreakSeal = () => {
    if (isSealBroken || isEnvelopeOpening) return;

    soundEngine.playPop();
    setIsEnvelopeOpening(true);

    setTimeout(() => {
      soundEngine.playSuccess();
      triggerConfetti(3500);
      triggerHeartConfetti();
      setIsSealBroken(true);
      setIsEnvelopeOpening(false);
    }, 1200);
  };

  return (
    <section
      id="final-letter-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '720px',
          padding: '48px 32px',
          position: 'relative',
          background: 'rgba(18, 12, 38, 0.9)',
          boxShadow: '0 0 50px rgba(255, 42, 141, 0.35)',
          borderRadius: '32px'
        }}
      >
        {/* Step 1: Idea B - 3D Golden Envelope with Red Wax Seal */}
        {!isSealBroken ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <span
              style={{
                background: 'rgba(251, 191, 36, 0.15)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                color: '#fbbf24',
                padding: '6px 18px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={14} color="#fbbf24" /> ROYAL UNBOXING CEREMONY 💌
            </span>

            <h2 className="font-title gradient-text-gold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px' }}>
              A Letter For Anshika Didi
            </h2>

            <p style={{ color: '#cbd5e1', fontSize: '1rem', marginBottom: '28px', maxWidth: '480px' }}>
              This letter is sealed with royal brother magic. Tap the red wax seal below to unseal and read!
            </p>

            {/* 3D Golden Royal Envelope Container */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              animate={{
                scale: isEnvelopeOpening ? [1, 1.1, 0.95, 1] : 1,
                rotate: isEnvelopeOpening ? [0, 5, -5, 0] : 0
              }}
              onClick={handleBreakSeal}
              style={{
                width: '100%',
                maxWidth: '380px',
                height: '240px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(255, 42, 141, 0.25) 100%)',
                border: '2px solid rgba(251, 191, 36, 0.6)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), inset 0 0 25px rgba(251, 191, 36, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Envelope Flap Lines */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  width: 0,
                  height: 0,
                  borderLeft: '190px solid transparent',
                  borderRight: '190px solid transparent',
                  borderTop: '110px solid rgba(251, 191, 36, 0.25)',
                  pointerEvents: 'none'
                }}
              />

              {/* Pulsing Red Wax Seal Button */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
                  border: '3px solid #fbbf24',
                  boxShadow: '0 0 25px rgba(239, 68, 68, 0.8), inset 0 0 10px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <Heart size={36} color="#ffffff" fill="#ffffff" />
              </motion.div>

              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#fbbf24', marginTop: '14px', letterSpacing: '1px' }}>
                {isEnvelopeOpening ? 'UNSEAL_ING...' : 'TAP SEAL TO OPEN 🩸'}
              </span>
            </motion.div>
          </motion.div>
        ) : (
          /* Step 2: Unfolded Heartfelt Letter */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ textAlign: 'left' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <Heart size={24} color="#ff2a8d" fill="#ff2a8d" />
              <span className="font-title" style={{ color: '#ff758c', fontSize: '1.2rem', fontWeight: '700' }}>
                A Letter For Anshika Didi
              </span>
            </div>

            <div
              style={{
                color: '#f1f5f9',
                fontSize: '1.08rem',
                lineHeight: '1.8',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fbbf24' }}>
                Anshika,
              </p>

              <p>
                You are not just my sister. You are one of those people who make life feel a little more complete.
              </p>

              <p>
                We've had our arguments, our stupid fights, our random jokes, and countless moments where we've annoyed each other for absolutely no reason. 😂
              </p>

              <p>
                But somewhere between all those fights and laughs, we created memories that I know I'll always carry with me.
              </p>

              <p>
                You have been my sister, my friend, my partner in chaos, and sometimes the person who annoys me the most. But honestly, I wouldn't want it any other way.
              </p>

              <p>
                Thank you for being there, for supporting me when I needed it, and for making life a lot more fun.
              </p>

              <p style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ff758c', marginTop: '10px' }}>
                Happy Birthday, Anshika Didi! ❤️
              </p>

              <p style={{ color: '#fbbf24', fontStyle: 'italic', fontSize: '0.95rem' }}>
                — Always your brother, Ratnakar
              </p>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ marginTop: '36px', textAlign: 'center' }}>
              <button onClick={onProceedToFinale} className="glow-button">
                <span>ENTER GRAND FINALE CELEBRATION 🎉</span>
                <ArrowRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
