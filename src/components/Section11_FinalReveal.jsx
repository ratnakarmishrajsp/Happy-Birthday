import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function Section11_FinalReveal({ onProceedToFinale }) {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    soundEngine.playClick();
    setStep((prev) => prev + 1);
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
          padding: '50px 36px',
          position: 'relative',
          background: 'rgba(18, 12, 38, 0.85)',
          boxShadow: '0 0 50px rgba(255, 42, 141, 0.3)'
        }}
      >
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="font-title gradient-text-pink" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              Okay... jokes apart.
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.3rem', marginBottom: '36px' }}>
              There's something I really want you to know.
            </p>
            <button onClick={handleNextStep} className="glow-button">
              <span>READ THE LETTER ❤️</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
                I hope this new year of your life brings you happiness, success, peace, and everything you truly deserve.
              </p>

              <p style={{ fontWeight: '600', color: '#ff758c' }}>
                Keep smiling.<br />
                Keep growing.<br />
                Keep being the crazy, funny, amazing person you are.
              </p>

              <p>
                And yes...
              </p>

              <p style={{ fontStyle: 'italic', color: '#fbbf24' }}>
                Please try to make the tea a little faster next time. 😂☕
              </p>

              <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' }}>
                <h4 className="font-title gradient-text-pink" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                  Happy Birthday, Anshika Didi. ❤️
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '1rem', fontStyle: 'italic' }}>
                  Your annoying little brother,<br />
                  <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Ratnakar</strong>
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <button onClick={onProceedToFinale} className="glow-button">
                <span>GRAND BIRTHDAY REVEAL 🎂</span>
                <Sparkles size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
