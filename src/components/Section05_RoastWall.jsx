import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';
import { triggerHeartConfetti } from '../utils/confetti';
import { Clock, Smartphone, Flame, Sparkles, X, ArrowRight } from 'lucide-react';

const roastCards = [
  {
    id: 1,
    badge: "CARD 01",
    title: "THE 9–10 AM EMPLOYEE",
    icon: Clock,
    color: "#ff2a8d",
    text: "Work starts around 9–10... Because apparently mornings need a proper warm-up. 😌"
  },
  {
    id: 2,
    badge: "CARD 02",
    title: "LE LE PE PE",
    icon: Sparkles,
    color: "#9d4edd",
    text: "Her legendary 'le-le, pe-pe' moments. No explanation required. 😂"
  },
  {
    id: 3,
    badge: "CARD 03",
    title: "REEL QUEEN 📱",
    icon: Smartphone,
    color: "#fbbf24",
    text: "Can watch Reels for hours... But somehow still has time to disturb me."
  },
  {
    id: 4,
    badge: "CARD 04",
    title: "PROFESSIONAL BROTHER DISTURBER",
    icon: Flame,
    color: "#38bdf8",
    text: "Her most consistent daily activity: annoying her little brother. 😂"
  }
];

export default function Section05_RoastWall({ onNextSection }) {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (card) => {
    soundEngine.playPop();
    triggerHeartConfetti();
    setActiveCard(card);
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
        style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '650px' }}
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
          HALL OF FAME 😂
        </span>
        <h2 className="font-title gradient-text-magic" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginTop: '12px' }}>
          Things Anshika Does That We Somehow Accept 😂
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '8px' }}>
          Click on any card to inspect the evidence.
        </p>
      </motion.div>

      {/* Grid of 4 Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '900px'
        }}
      >
        {roastCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={card.id}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(card)}
              className="glass-panel"
              style={{
                padding: '28px 24px',
                cursor: 'pointer',
                borderTop: `4px solid ${card.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: card.color, letterSpacing: '1px' }}>
                    {card.badge}
                  </span>
                  <IconComponent size={24} color={card.color} />
                </div>
                <h3 className="font-heading" style={{ fontSize: '1.2rem', color: '#fff', fontWeight: '700', marginBottom: '12px' }}>
                  {card.title}
                </h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                {card.text}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div style={{ marginTop: '48px' }}>
        <button onClick={onNextSection} className="glow-button">
          <span>NEXT: THE TEA INCIDENT</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>

      {/* Pop Out Modal */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(7, 7, 18, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="glass-panel-glow"
              style={{
                width: '100%',
                maxWidth: '480px',
                padding: '36px 28px',
                textAlign: 'center',
                borderColor: activeCard.color,
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveCard(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                <X size={24} />
              </button>

              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '16px' }}>
                <activeCard.icon size={44} color={activeCard.color} />
              </div>

              <h3 className="font-title" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '12px' }}>
                {activeCard.title}
              </h3>

              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '24px' }}>
                "{activeCard.text}"
              </p>

              <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontStyle: 'italic' }}>
                Verified by Ratnakar • Uncontested Truth ✅
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
