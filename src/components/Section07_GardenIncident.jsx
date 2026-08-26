import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap, ArrowRight, Frown, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function Section07_GardenIncident({ onNextSection }) {
  const [step, setStep] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const storySteps = [
    { text: "Once upon a time...", emoji: "📜" },
    { text: "Anshika complained about her little brother...", emoji: "🗣️" },
    { text: "Somehow...", emoji: "👀" },
    { text: "Her mama — my dad — got involved.", emoji: "👨‍👧" },
    { text: "AND I GOT HIT IN FRONT OF EVERYONE. 😭😂", emoji: "💥", isHit: true }
  ];

  const handleNextStep = () => {
    if (step < storySteps.length - 1) {
      const next = step + 1;
      setStep(next);
      if (storySteps[next].isHit) {
        soundEngine.playHit();
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
      } else {
        soundEngine.playPop();
      }
    }
  };

  return (
    <section
      id="garden-section"
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
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`glass-panel-glow ${isShaking ? 'shake-active' : ''}`}
        style={{
          width: '100%',
          maxWidth: '640px',
          padding: '44px 30px',
          position: 'relative',
          borderColor: isShaking ? '#f43f5e' : 'rgba(236, 72, 153, 0.4)'
        }}
      >
        <span
          style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            color: '#fb7185',
            padding: '6px 18px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          CARTOON TRAGEDY 💀
        </span>

        <h2 className="font-title gradient-text-magic" style={{ fontSize: '2.2rem', marginTop: '16px', marginBottom: '28px' }}>
          THE INCIDENT WE SHALL NEVER FORGET
        </h2>

        {/* Story Box */}
        <div
          style={{
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            borderRadius: '20px',
            background: 'rgba(15, 12, 35, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '32px'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
            >
              <span style={{ fontSize: '3.5rem' }}>{storySteps[step].emoji}</span>
              <p
                style={{
                  fontSize: storySteps[step].isHit ? '1.8rem' : '1.3rem',
                  fontWeight: storySteps[step].isHit ? '900' : '600',
                  color: storySteps[step].isHit ? '#fb7185' : '#f8fafc'
                }}
              >
                {storySteps[step].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {step < storySteps.length - 1 ? (
          <button onClick={handleNextStep} className="glow-button">
            <span>CONTINUE STORY...</span>
            <ArrowRight size={20} />
          </button>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '24px' }}>
              Thank you, Didi. I will remember this betrayal forever. 😂
            </p>
            <button onClick={onNextSection} className="glow-button">
              <span>ENTER MEMORY UNIVERSE ❤️</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
