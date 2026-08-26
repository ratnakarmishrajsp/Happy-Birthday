import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function Section03_Verification({ onVerified }) {
  const [choice, setChoice] = useState(null);

  const handleSelect = (selected) => {
    setChoice(selected);
    if (selected === 'yes') {
      soundEngine.playSuccess();
    } else {
      soundEngine.playError();
    }
  };

  return (
    <section
      id="verification-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '40px 30px',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div style={{ display: 'inline-flex', padding: '14px', borderRadius: '50%', background: 'rgba(255, 42, 141, 0.15)', marginBottom: '20px' }}>
          <ShieldCheck size={36} color="#ff2a8d" />
        </div>

        <h2 className="font-title gradient-text-gold" style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
          Wait... First, let's verify something.
        </h2>

        <p style={{ color: '#cbd5e1', fontSize: '1.2rem', marginBottom: '32px', fontWeight: '500' }}>
          Are you actually Anshika Pandey?
        </p>

        {!choice ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => handleSelect('yes')}
              className="glass-panel"
              style={{
                padding: '18px 24px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: 'rgba(255, 42, 141, 0.3)'
              }}
            >
              <span>YES, obviously 😌</span>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
            </button>

            <button
              onClick={() => handleSelect('no')}
              className="glass-panel"
              style={{
                padding: '18px 24px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: 'rgba(157, 78, 221, 0.3)'
              }}
            >
              <span>No, I'm pretending 😂</span>
              <span style={{ fontSize: '1.2rem' }}>🥸</span>
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: choice === 'yes' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                border: choice === 'yes' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(244, 63, 94, 0.4)',
                marginBottom: '28px'
              }}
            >
              {choice === 'yes' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={40} color="#10b981" />
                  <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#34d399' }}>
                    Verification successful.<br />Certified Anshika Didi detected. ✅
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <AlertCircle size={40} color="#f43f5e" />
                  <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fb7185' }}>
                    Nice try. We know it's you. 😂
                  </p>
                </div>
              )}
            </motion.div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onVerified();
              }}
              className="glow-button"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Okay, Continue</span>
              <ArrowRight size={20} />
            </button>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}
