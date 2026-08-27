import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';
import { triggerHeartConfetti, triggerConfetti } from '../utils/confetti';
import { Clock, Smartphone, Flame, Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const roastCards = [
  {
    id: 1,
    badge: "ROAST CARD 01 / 04",
    title: "THE 9–10 AM EMPLOYEE ⏰",
    icon: Clock,
    color: "#ff2a8d",
    text: "Work starts around 9–10... Because apparently mornings need a proper warm-up routine. 😌"
  },
  {
    id: 2,
    badge: "ROAST CARD 02 / 04",
    title: "LE LE PE PE PE 🗣️",
    icon: Sparkles,
    color: "#9d4edd",
    text: "Her legendary 'le-le, pe-pe' moments. No explanation required. Le Le Pe Pe Pe 😂"
  },
  {
    id: 3,
    badge: "ROAST CARD 03 / 04",
    title: "REEL QUEEN 📱",
    icon: Smartphone,
    color: "#fbbf24",
    text: "Can watch Reels for 4 hours straight... But still finds time to send me 50 clips a day!"
  },
  {
    id: 4,
    badge: "ROAST CARD 04 / 04",
    title: "BROTHER DISTURBER SUPREME 🔥",
    icon: Flame,
    color: "#38bdf8",
    text: "Her most consistent daily hobby: annoying her little brother Ratnakar. 😂❤️"
  }
];

export default function Section05_RoastWall({ onNextSection }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCardWarping, setIsCardWarping] = useState(false);

  const currentCard = roastCards[currentCardIndex];
  const isLastCard = currentCardIndex === roastCards.length - 1;

  const handleCardClick = () => {
    if (isRevealed || isCardWarping) return;

    soundEngine.playPop();
    triggerHeartConfetti();
    triggerConfetti(1500);
    setIsRevealed(true);
  };

  const handleNextCard = () => {
    if (isCardWarping) return;

    soundEngine.playClick();
    setIsCardWarping(true);

    setTimeout(() => {
      if (!isLastCard) {
        setCurrentCardIndex((prev) => prev + 1);
        setIsRevealed(false);
      }
      setIsCardWarping(false);
    }, 600);
  };

  return (
    <section
      id="roast-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '650px' }}
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
            textTransform: 'uppercase'
          }}
        >
          HALL OF FAME 🔥 (CARD {currentCardIndex + 1} OF 4)
        </span>
        <h2 className="font-title gradient-text-magic" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginTop: '12px' }}>
          Things Anshika Does That We Accept 😂
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '8px' }}>
          Tap on each card to blast & unlock the evidence!
        </p>
      </motion.div>

      {/* Single Interactive Card Displayed One-by-One */}
      <div style={{ width: '100%', maxWidth: '520px', minHeight: '360px', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCardIndex}
            initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scale: 1.4, opacity: 0, filter: 'blur(15px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleCardClick}
            className={isRevealed ? "glass-panel-glow" : "glass-panel"}
            style={{
              padding: '36px 28px',
              textAlign: 'center',
              cursor: isRevealed ? 'default' : 'pointer',
              borderTop: `6px solid ${currentCard.color}`,
              boxShadow: isRevealed ? `0 0 35px ${currentCard.color}` : '0 10px 30px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
          >
            {/* Card Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: currentCard.color, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {currentCard.badge}
              </span>
            </div>

            {/* Icon */}
            <div style={{ display: 'inline-flex', padding: '20px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '20px' }}>
              <currentCard.icon size={52} color={currentCard.color} />
            </div>

            <h3 className="font-title" style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '16px' }}>
              {currentCard.title}
            </h3>

            {/* Card Content - Unlocked Text vs Tap Prompt */}
            {!isRevealed ? (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  background: 'rgba(255, 42, 141, 0.15)',
                  border: '1px dashed rgba(255, 42, 141, 0.5)',
                  padding: '16px',
                  borderRadius: '16px',
                  color: '#ff758c',
                  fontWeight: '700',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '12px'
                }}
              >
                <Zap size={20} color="#fbbf24" />
                <span>TAP TO BLAST & UNLOCK ROAST 💥</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '24px' }}>
                  "{currentCard.text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#10b981', fontSize: '0.85rem', fontWeight: 700, marginBottom: '24px' }}>
                  <CheckCircle2 size={16} />
                  <span>Verified by Ratnakar • Uncontested Truth ✅</span>
                </div>

                {!isLastCard ? (
                  <button onClick={handleNextCard} className="glow-button" style={{ width: '100%' }}>
                    <span>NEXT ROAST CARD ({currentCardIndex + 2}/4)</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button onClick={onNextSection} className="glow-button" style={{ width: '100%' }}>
                    <span>CONTINUE TO THE TEA INCIDENT ☕</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
