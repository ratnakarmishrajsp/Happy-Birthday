import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Heart, Coffee, ShieldCheck, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function Section07B_SisterStats({ onNextSection }) {
  const [counts, setCounts] = useState({ chai: 0, arguments: 0, rating: 0 });

  useEffect(() => {
    soundEngine.playSuccess();

    // Animate stats numbers counting up
    const interval = setInterval(() => {
      setCounts(prev => ({
        chai: Math.min(prev.chai + 140, 3650),
        arguments: Math.min(prev.arguments + 380, 9999),
        rating: Math.min(prev.rating + 4, 100)
      }));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 20px', position: 'relative' }}>
      <div style={{ maxWidth: '1000px', width: '100%', textCenter: 'center' }}>
        
        {/* Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '30px', background: 'rgba(255, 42, 141, 0.15)', border: '1px solid rgba(255, 42, 141, 0.4)', marginBottom: '24px' }}
        >
          <Sparkles size={16} color="#fbbf24" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', color: '#ff758c', textTransform: 'uppercase' }}>
            SISTER MANIFESTO & SPECS
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 900, background: 'linear-gradient(135deg, #ffffff 0%, #ff758c 50%, #ff2a8d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.15, marginBottom: '20px' }}
        >
          ANSHIKA DIDI: THE ULTIMATE SPECIFICATIONS
        </motion.h2>

        {/* Manifesto Quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#cbd5e1', maxWidth: '780px', margin: '0 auto 48px', lineHeight: 1.6, fontStyle: 'italic' }}
        >
          "Sisterhood isn't just a relationship; it's a lifetime contract of stolen tea, endless advice, secret-keeping, and unconditional love."
        </motion.p>

        {/* Stats Grid - 4 Apple-Style Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel-glow"
            style={{ padding: '28px 20px', textAlign: 'center', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(15, 10, 30, 0.6)' }}
          >
            <div style={{ background: 'rgba(251, 191, 36, 0.15)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Coffee size={24} color="#fbbf24" />
            </div>
            <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24' }}>
              {counts.chai.toLocaleString()}+
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px', fontWeight: 600 }}>
              CUPS OF CHAI STOLEN ☕
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel-glow"
            style={{ padding: '28px 20px', textAlign: 'center', borderRadius: '20px', border: '1px solid rgba(255, 42, 141, 0.25)', background: 'rgba(15, 10, 30, 0.6)' }}
          >
            <div style={{ background: 'rgba(255, 42, 141, 0.15)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trophy size={24} color="#ff2a8d" />
            </div>
            <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '2.5rem', fontWeight: 900, color: '#ff758c' }}>
              {counts.arguments.toLocaleString()}+
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px', fontWeight: 600 }}>
              ARGUMENTS WON BY DIDI 👑
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-panel-glow"
            style={{ padding: '28px 20px', textAlign: 'center', borderRadius: '20px', border: '1px solid rgba(168, 85, 247, 0.25)', background: 'rgba(15, 10, 30, 0.6)' }}
          >
            <div style={{ background: 'rgba(168, 85, 247, 0.15)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <ShieldCheck size={24} color="#c084fc" />
            </div>
            <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '2.5rem', fontWeight: 900, color: '#c084fc' }}>
              {counts.rating}%
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px', fontWeight: 600 }}>
              WORLD'S BEST SISTER 💖
            </div>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-panel-glow"
            style={{ padding: '28px 20px', textAlign: 'center', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.25)', background: 'rgba(15, 10, 30, 0.6)' }}
          >
            <div style={{ background: 'rgba(56, 189, 248, 0.15)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Heart size={24} color="#38bdf8" />
            </div>
            <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '2.5rem', fontWeight: 900, color: '#38bdf8' }}>
              ∞
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px', fontWeight: 600 }}>
              INFINITE LOVE & HUGS 🌸
            </div>
          </motion.div>

        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button
            onClick={() => {
              soundEngine.playSuccess();
              onNextSection();
            }}
            className="glow-button"
            style={{ padding: '16px 36px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <span>ENTER MEMORY UNIVERSE</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
