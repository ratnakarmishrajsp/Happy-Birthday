import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VaultLock3D from '../canvas/VaultLock3D';
import { soundEngine } from '../utils/soundEngine';
import { Lock, Unlock, Key, ArrowRight } from 'lucide-react';

export default function Section10_SecretLock({ onUnlockFinal }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    soundEngine.playUnlock();
    setIsUnlocked(true);

    setTimeout(() => {
      onUnlockFinal();
    }, 1800);
  };

  return (
    <section
      id="lock-section"
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
          maxWidth: '580px',
          padding: '44px 30px',
          position: 'relative'
        }}
      >
        <span
          style={{
            background: 'rgba(251, 191, 36, 0.15)',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            color: '#fbbf24',
            padding: '6px 18px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Lock size={14} /> FINAL LEVEL 🔒
        </span>

        <h2 className="font-title gradient-text-gold" style={{ fontSize: '2.2rem', marginTop: '16px', marginBottom: '8px' }}>
          There's One More Thing...
        </h2>

        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '24px' }}>
          You've unlocked almost everything.
        </p>

        {/* 3D Heart Lock */}
        <div
          style={{ width: '100%', maxWidth: '400px', margin: '0 auto', cursor: 'pointer' }}
          onClick={handleUnlock}
        >
          <VaultLock3D isUnlocked={isUnlocked} onLockClick={handleUnlock} />
        </div>

        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleUnlock}
            disabled={isUnlocked}
            className="glow-button"
            style={{
              opacity: isUnlocked ? 0.7 : 1,
              cursor: isUnlocked ? 'default' : 'pointer'
            }}
          >
            {isUnlocked ? (
              <>
                <Unlock size={20} />
                <span>UNLOCKING VAULT...</span>
              </>
            ) : (
              <>
                <Key size={20} />
                <span>UNLOCK THE FINAL MESSAGE</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
