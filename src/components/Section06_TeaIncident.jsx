import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Clock, ArrowRight, Skull } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function Section06_TeaIncident({ onNextSection }) {
  const [timerText, setTimerText] = useState('00:01');
  const [cupScale, setCupScale] = useState(1);

  useEffect(() => {
    const times = ['00:01', '00:15', '00:30', '00:45', '01:00'];
    let idx = 0;

    const interval = setInterval(() => {
      idx = (idx + 1) % times.length;
      setTimerText(times[idx]);
      soundEngine.playClockTick();
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const handleCupClick = () => {
    soundEngine.playPop();
    setCupScale(1.25);
    setTimeout(() => setCupScale(1), 300);
  };

  return (
    <section
      id="tea-section"
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
          maxWidth: '620px',
          padding: '44px 30px',
          position: 'relative'
        }}
      >
        <span
          style={{
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            color: '#38bdf8',
            padding: '6px 18px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          CINEMATIC MEMORY ☕
        </span>

        <h2 className="font-title gradient-text-gold" style={{ fontSize: '2.2rem', marginTop: '16px', marginBottom: '8px' }}>
          THE TEA INCIDENT
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '32px' }}>
          One cup. One hour. One unforgettable memory.
        </p>

        {/* Animated Clickable Clock Display */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCupClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 32px',
            background: 'rgba(15, 12, 35, 0.8)',
            border: '1px solid rgba(251, 191, 36, 0.4)',
            borderRadius: '50px',
            marginBottom: '36px',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)',
            cursor: 'pointer'
          }}
        >
          <Clock size={28} color="#fbbf24" className="animate-spin-slow" />
          <span style={{ fontFamily: 'monospace', fontSize: '2.2rem', fontWeight: '900', color: '#fbbf24', letterSpacing: '2px' }}>
            {timerText}
          </span>
        </motion.div>

        {/* Animated Clickable Tea Cup */}
        <motion.div
          animate={{ scale: cupScale }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleCupClick}
          style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 32px auto', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 42, 141, 0.25) 0%, rgba(0,0,0,0) 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Coffee size={56} color="#ff2a8d" />
          </div>
        </motion.div>

        {/* Story Sequence Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
          <p style={{ color: '#e2e8f0', fontSize: '1.2rem', fontWeight: '500' }}>
            She was asked to make tea for the guests.
          </p>

          <p style={{ color: '#94a3b8', fontSize: '1.1rem', fontStyle: 'italic' }}>
            How long did it take?
          </p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={handleCupClick}
            style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              cursor: 'pointer'
            }}
          >
            <h3 style={{ fontSize: '1.8rem', color: '#fb7185', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              ONE. WHOLE. HOUR. ☕💀
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', marginTop: '6px' }}>
              And the tea wasn't even that good. 😂
            </p>
          </motion.div>
        </div>

        <button onClick={onNextSection} className="glow-button">
          <span>THAT WAS LEGENDARY</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </section>
  );
}
