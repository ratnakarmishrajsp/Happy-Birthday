import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Award, ArrowRight, Check, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { triggerConfetti } from '../utils/confetti';

const quizQuestions = [
  {
    id: 1,
    question: "How fast does Anshika's mood change when someone offers her favorite food?",
    options: [
      { key: 'A', text: '10 minutes ⌛', correct: false },
      { key: 'B', text: '5 minutes ⏱️', correct: false },
      { key: 'C', text: 'Faster than 5G internet ⚡', correct: true },
      { key: 'D', text: 'She never changes her mood 🧊', correct: false }
    ],
    explanation: "Food is the ultimate cheat code for instant happiness! 🍕🍔"
  },
  {
    id: 2,
    question: "What actually happens when Anshika sets an alarm for 7:00 AM?",
    options: [
      { key: 'A', text: 'Wakes up at 6:59 AM full of energy 🌅', correct: false },
      { key: 'B', text: 'Wakes up at 7:00 AM sharp 🔔', correct: false },
      { key: 'C', text: 'Snoozes it 14 times and wakes up at 11:00 AM 😂', correct: true },
      { key: 'D', text: 'The alarm wakes up, but she doesn\'t 😴', correct: false }
    ],
    explanation: "Snooze button's worst nightmare! ⏰😴"
  },
  {
    id: 3,
    question: "What secret teasing nicknames does Ratnakar use for Anshika at home?",
    options: [
      { key: 'A', text: 'Pagal 🤪', correct: false },
      { key: 'B', text: 'Badmash 😈', correct: false },
      { key: 'C', text: 'Sadhivaaa 👑', correct: false },
      { key: 'D', text: 'All of the above 😂❤️', correct: true }
    ],
    explanation: "Pagal + Badmash + Sadhivaaa = The ultimate combo! 😂❤️"
  },
  {
    id: 4,
    question: "Who is more likely to annoy the other person?",
    options: [
      { key: 'A', text: 'Me', correct: false },
      { key: 'B', text: 'Anshika', correct: false },
      { key: 'C', text: 'Both', correct: false },
      { key: 'D', text: 'This question is dangerous 😂', correct: true }
    ],
    explanation: "Wisest answer possible. Safety first! 😂"
  }
];

export default function Section04_BrotherQuiz({ onQuizComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const q = quizQuestions[currentIdx];

  const handleSelectOption = (opt) => {
    if (selectedOpt !== null) return;

    setSelectedOpt(opt);
    if (opt.correct) {
      soundEngine.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      soundEngine.playError();
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    setSelectedOpt(null);
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      triggerConfetti(2000);
    }
  };

  return (
    <section
      id="quiz-section"
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
          maxWidth: '640px',
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
            LEVEL 01 • QUIZ
          </span>
          <span style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.95rem' }}>
            Score: {score}/{quizQuestions.length}
          </span>
        </div>

        {!isCompleted ? (
          <div>
            <h2 className="font-heading" style={{ fontSize: '1.4rem', color: '#f8fafc', marginBottom: '24px', lineHeight: '1.4' }}>
              Q{q.id}. {q.question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {q.options.map((opt) => {
                let borderCol = 'rgba(255, 255, 255, 0.15)';
                let bgCol = 'rgba(18, 14, 46, 0.6)';

                if (selectedOpt) {
                  if (opt.key === selectedOpt.key) {
                    borderCol = opt.correct ? '#10b981' : '#f43f5e';
                    bgCol = opt.correct ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)';
                  } else if (opt.correct) {
                    borderCol = '#10b981';
                    bgCol = 'rgba(16, 185, 129, 0.15)';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt)}
                    className="glass-panel"
                    style={{
                      padding: '16px 20px',
                      color: '#fff',
                      fontSize: '1.05rem',
                      fontWeight: '500',
                      textAlign: 'left',
                      cursor: selectedOpt ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      borderColor: borderCol,
                      backgroundColor: bgCol,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        color: '#fbbf24',
                        flexShrink: 0
                      }}
                    >
                      {opt.key}
                    </span>
                    <span style={{ flexGrow: 1 }}>{opt.text}</span>
                    {selectedOpt && opt.correct && <Check size={20} color="#10b981" />}
                    {selectedOpt && !opt.correct && opt.key === selectedOpt.key && <X size={20} color="#f43f5e" />}
                  </button>
                );
              })}
            </div>

            {selectedOpt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'right' }}
              >
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px', fontStyle: 'italic' }}>
                  {q.explanation}
                </p>
                <button onClick={handleNext} className="glow-button">
                  <span>{currentIdx < quizQuestions.length - 1 ? 'Next Question' : 'See Score'}</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '20px 0' }}
          >
            <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(251, 191, 36, 0.2)', marginBottom: '16px' }}>
              <Award size={48} color="#fbbf24" />
            </div>

            <h3 className="font-title gradient-text-gold" style={{ fontSize: '2rem', marginBottom: '8px' }}>
              Level 01 Complete! 🏆
            </h3>

            <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '24px' }}>
              You scored <span style={{ color: '#ff2a8d', fontWeight: '800' }}>{score}</span> / {quizQuestions.length}!
              <br />
              <span style={{ fontSize: '1rem', color: '#94a3b8' }}>
                {score === 4 ? 'Official Certified Brother Expert! 💯' : 'Not bad! But you still owe me treat. 😂'}
              </span>
            </p>

            <button onClick={onQuizComplete} className="glow-button">
              <span>CONTINUE TO ROAST WALL</span>
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
