import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Galaxy3D from '../canvas/Galaxy3D';
import { memoryPhotos } from '../utils/photoFallbacks';
import { soundEngine } from '../utils/soundEngine';
import { Heart, Sparkles, X, ArrowRight } from 'lucide-react';

export default function Section08_MemoryUniverse({ onNextSection }) {
  const [selectedOrb, setSelectedOrb] = useState(null);

  const handleSelectOrb = (index) => {
    soundEngine.playPop();
    setSelectedOrb(memoryPhotos[index]);
  };

  return (
    <section
      id="memory-section"
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '24px', maxWidth: '650px' }}
      >
        <span
          style={{
            background: 'rgba(255, 42, 141, 0.15)',
            border: '1px solid rgba(255, 42, 141, 0.4)',
            color: '#ff758c',
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
          <Heart size={14} color="#ff2a8d" fill="#ff2a8d" /> EMOTIONAL GALAXY
        </span>

        <h2 className="font-title gradient-text-gold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginTop: '12px' }}>
          OUR LITTLE UNIVERSE
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginTop: '8px' }}>
          Click on any orbiting planet to unlock a precious memory orb.
        </p>
      </motion.div>

      {/* 3D Galaxy Canvas */}
      <div style={{ width: '100%', maxWidth: '850px' }}>
        <Galaxy3D onSelectOrb={handleSelectOrb} />
      </div>

      {/* Quick Select Buttons Grid below for accessibility on mobile */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          width: '100%',
          maxWidth: '700px',
          marginTop: '20px',
          marginBottom: '40px'
        }}
      >
        {memoryPhotos.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleSelectOrb(idx)}
            className="glass-panel"
            style={{
              padding: '12px 16px',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              borderColor: 'rgba(255, 42, 141, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Orb #{idx + 1}</span>
            <Sparkles size={12} color="#fbbf24" />
          </button>
        ))}
      </div>

      <motion.div>
        <button onClick={onNextSection} className="glow-button">
          <span>CONTINUE TO SISTER QUIZ ❤️</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>

      {/* Photo Memory Modal */}
      <AnimatePresence>
        {selectedOrb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(7, 7, 18, 0.88)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setSelectedOrb(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="glass-panel-glow"
              style={{
                width: '100%',
                maxWidth: '560px',
                padding: '28px',
                position: 'relative',
                textAlign: 'left'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedOrb(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={24} />
              </button>

              <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <img
                  src={selectedOrb.path}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = selectedOrb.fallback;
                  }}
                  alt={selectedOrb.title}
                  style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#ff2a8d', letterSpacing: '1px' }}>
                MEMORY #{selectedOrb.id} • {selectedOrb.year}
              </span>

              <h3 className="font-title" style={{ fontSize: '1.6rem', color: '#fff', margin: '6px 0 10px 0' }}>
                {selectedOrb.title}
              </h3>

              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.6' }}>
                "{selectedOrb.caption}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
