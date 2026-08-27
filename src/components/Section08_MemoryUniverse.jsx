import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Galaxy3D from '../canvas/Galaxy3D';
import { memoryPhotos } from '../utils/photoFallbacks';
import { soundEngine } from '../utils/soundEngine';
import { Heart, Sparkles, X, ArrowRight, Camera } from 'lucide-react';

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
        style={{ marginBottom: '20px', maxWidth: '650px' }}
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
          <Heart size={14} color="#ff2a8d" fill="#ff2a8d" /> REAL MEMORY GALAXY
        </span>

        <h2 className="font-title gradient-text-gold" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginTop: '12px' }}>
          OUR MEMORY CONSTELLATION 📸
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginTop: '8px' }}>
          Click on any planet orb to view the original photo & unedited story!
        </p>
      </motion.div>

      {/* 3D Galaxy Canvas */}
      <div style={{ width: '100%', maxWidth: '950px', marginBottom: '28px' }}>
        <Galaxy3D onSelectOrb={handleSelectOrb} />
      </div>

      <motion.div>
        <button onClick={onNextSection} className="glow-button">
          <span>CONTINUE TO ULTIMATE SISTER QUIZ 👑</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>

      {/* High Quality Natural Aspect Ratio Photo Modal */}
      <AnimatePresence>
        {selectedOrb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(7, 7, 18, 0.92)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              overflowY: 'auto'
            }}
            onClick={() => setSelectedOrb(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="glass-panel-glow"
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                padding: '24px',
                position: 'relative',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedOrb(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 42, 141, 0.2)',
                  border: '1px solid rgba(255, 42, 141, 0.5)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  color: '#fff',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>

              {/* Natural Aspect Ratio Uncropped Photo Container */}
              <div
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  background: '#090a15',
                  border: '2px solid rgba(255, 42, 141, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '200px',
                  maxHeight: '42vh',
                  padding: '8px',
                  flexShrink: 0
                }}
              >
                <img
                  src={selectedOrb.path}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = selectedOrb.fallback;
                  }}
                  alt={selectedOrb.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '38vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    transform: selectedOrb.rotate ? `rotate(${selectedOrb.rotate}deg)` : 'none',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
                  }}
                />
              </div>

              {/* Scrollable Story Details Container */}
              <div style={{ overflowY: 'auto', maxHeight: '35vh', paddingRight: '4px' }}>
                {/* Badge & Year */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#ff2a8d', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    MEMORY #{selectedOrb.id} • {selectedOrb.year}
                  </span>
                  <Sparkles size={14} color="#fbbf24" />
                </div>

                {/* Title */}
                <h3 className="font-title" style={{ fontSize: '1.4rem', color: '#fff', margin: '4px 0 10px 0' }}>
                  {selectedOrb.title}
                </h3>

                {/* Emotion / Pose Story Text */}
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', background: 'rgba(255, 255, 255, 0.06)', padding: '14px 18px', borderRadius: '12px', borderLeft: '4px solid #ff2a8d' }}>
                  "{selectedOrb.caption}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
