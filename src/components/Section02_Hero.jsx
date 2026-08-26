import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GiftBox3D from '../canvas/GiftBox3D';
import { soundEngine } from '../utils/soundEngine';
import { triggerConfetti } from '../utils/confetti';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Section02_Hero({ onStartSurprise }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    soundEngine.init();
    soundEngine.playPop();
    soundEngine.startBGM();
    setIsOpen(true);
    triggerConfetti(2500);

    setTimeout(() => {
      onStartSurprise();
    }, 1500);
  };

  return (
    <section
      id="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 40px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '16px' }}
      >
        <span
          style={{
            background: 'rgba(255, 42, 141, 0.15)',
            border: '1px solid rgba(255, 42, 141, 0.4)',
            color: '#ff758c',
            padding: '8px 20px',
            borderRadius: '30px',
            fontSize: '0.875rem',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={14} /> 30 August 2002 • Birthday Surprise
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-title gradient-text-magic"
        style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: '1.2', marginBottom: '12px' }}
      >
        Hey Anshika Didi... 👀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          color: '#cbd5e1',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          maxWidth: '600px',
          marginBottom: '24px'
        }}
      >
        I made something just for you.
      </motion.p>

      {/* 3D Gift Box Scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ width: '100%', maxWidth: '550px' }}
      >
        <GiftBox3D isOpen={isOpen} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{ marginTop: '20px' }}
      >
        <button onClick={handleClick} className="glow-button">
          <span>START THE SURPRISE</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </section>
  );
}
