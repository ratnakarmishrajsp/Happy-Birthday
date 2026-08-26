import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { triggerHeartConfetti } from '../utils/confetti';

const sisterQuestions = [
  {
    id: 1,
    question: "Who gets irritated faster?",
    options: ["Anshika Didi 😤", "Me (Ratnakar) 😇", "Both of us simultaneously 🔥"]
  },
  {
    id: 2,
    question: "Who starts the random arguments?",
    options: ["Definitely Didi 😼", "Ratnakar for fun 🐒", "It just happens spontaneously 🌪️"]
  },
  {
    id: 3,
    question: "Who is more dramatic?",
    options: ["Anshika 🎭", "Ratnakar 🎬", "Oscar goes to both 🏆"]
  },
  {
    id: 4,
    question: "Who secretly cares more?",
    options: ["Anshika", "Ratnakar", "Neither"],
    isFinal: true
  }
];

export default function Section09_SisterQuiz({ onQuizComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const q = sisterQuestions[currentIdx];

  const handleSelect = (index) => {
    if (selectedOpt !== null && !q.isFinal) return;

    setSelectedOpt(index);
    soundEngine.playSuccess();

    if (q.isFinal) {
      setIsRevealed(true);
      triggerHeartConfetti();
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    setSelectedOpt(null);
    if (currentIdx < sisterQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  return (
    <section
      id="sister-quiz-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '620px',
          padding: '40px 30px',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <span
            style={{
              background: 'rgba(255, 42, 141, 0.2)',
              border: '1px solid rgba(255, 42, 141, 0.4)',
              color: '#ff758c',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase'
            }}
          >
            LEVEL 02 • SISTER QUIZ ❤️
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Question {currentIdx + 1}/{sisterQuestions.length}
          </span>
        </div>

        <h2 className="font-heading" style={{ fontSize: '1.5rem', color: '#f8fafc', marginBottom: '28px', lineHeight: '1.4' }}>
          Q{q.id}. {q.question}
        </h2>

        {!isRevealed ? (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {q.options.map((optText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="glass-panel"
                  style={{
                    padding: '18px 20px',
                    color: '#fff',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderColor: selectedOpt === idx ? '#ff2a8d' : 'rgba(255, 255, 255, 0.15)',
                    backgroundColor: selectedOpt === idx ? 'rgba(255, 42, 141, 0.2)' : 'rgba(18, 14, 46, 0.6)'
                  }}
                >
                  {optText}
                </button>
              ))}
            </div>

            {selectedOpt !== null && !q.isFinal && (
              <div style={{ textAlign: 'right' }}>
                <button onClick={handleNext} className="glow-button">
                  <span>Next Question</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '32px 24px',
              borderRadius: '20px',
              background: 'rgba(255, 42, 141, 0.15)',
              border: '1px solid rgba(255, 42, 141, 0.4)',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(255, 42, 141, 0.2)', marginBottom: '16px' }}>
              <Heart size={44} color="#ff2a8d" fill="#ff2a8d" />
            </div>

            <h3 className="font-title gradient-text-pink" style={{ fontSize: '2rem', marginBottom: '12px' }}>
              Nice try.
            </h3>

            <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '28px' }}>
              It's both of us. ❤️
            </p>

            <button onClick={onQuizComplete} className="glow-button">
              <span>PROCEED TO SECRET LOCK 🔐</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
