import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { triggerConfetti, triggerHeartConfetti } from '../utils/confetti';
import { soundEngine } from '../utils/soundEngine';
import { memoryPhotos } from '../utils/photoFallbacks';
import { RefreshCw, Heart, Crown, Sparkles, Star } from 'lucide-react';

export default function Section12_GrandFinale({ onReplay }) {
  useEffect(() => {
    soundEngine.playSuccess();
    triggerConfetti(4000);
    const timeout = setTimeout(() => {
      triggerHeartConfetti();
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="finale-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px 60px 20px',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ maxWidth: '800px', width: '100%' }}
      >
        <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(251, 191, 36, 0.2)', marginBottom: '20px' }}>
          <Crown size={52} color="#fbbf24" className="animate-bounce" />
        </div>

        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            color: '#ff758c',
            fontSize: '1.2rem',
            fontWeight: '700',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}
        >
          ✨ CELEBRATING THE QUEEN ✨
        </motion.p>

        <h1
          className="font-title gradient-text-magic"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
            lineHeight: '1.1',
            marginBottom: '12px',
            textShadow: '0 0 40px rgba(255, 42, 141, 0.5)'
          }}
        >
          HAPPY BIRTHDAY
        </h1>

        <h2
          className="font-title"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#ffffff',
            marginBottom: '16px'
          }}
        >
          ANSHIKA DIDI ❤️
        </h2>

        <div
          style={{
            display: 'inline-block',
            padding: '8px 24px',
            borderRadius: '30px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fbbf24',
            fontWeight: '800',
            fontSize: '1.2rem',
            letterSpacing: '2px',
            marginBottom: '40px'
          }}
        >
          30 AUGUST 2002
        </div>

        {/* Photo Collage Preview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
            marginBottom: '48px'
          }}
        >
          {memoryPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.06, rotate: (photo.id % 2 === 0 ? 3 : -3) }}
              className="glass-panel"
              style={{
                overflow: 'hidden',
                borderRadius: '16px',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
              }}
            >
              <img
                src={photo.path}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = photo.fallback;
                }}
                alt={photo.title}
                style={{ width: '100%', height: '140px', objectFit: 'cover' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button onClick={onReplay} className="glow-button">
            <RefreshCw size={20} />
            <span>PLAY IT AGAIN ❤️</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
