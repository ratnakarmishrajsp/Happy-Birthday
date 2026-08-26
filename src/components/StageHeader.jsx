import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles, Award } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function StageHeader({ currentStageIndex, totalStages, stageTitle, onPrevStage, canGoPrev }) {
  const handlePrev = () => {
    soundEngine.playClick();
    if (onPrevStage) onPrevStage();
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9990,
        width: '92%',
        maxWidth: '900px',
        background: 'rgba(15, 12, 35, 0.85)',
        border: '1px solid rgba(255, 42, 141, 0.35)',
        borderRadius: '40px',
        padding: '8px 20px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 42, 141, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#ffffff'
      }}
    >
      {/* Back Button */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        {canGoPrev ? (
          <button
            onClick={handlePrev}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ff758c',
              padding: '6px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              fontWeight: 700,
              transition: 'all 0.3s ease'
            }}
            title="Previous Stage"
          >
            <ChevronLeft size={16} />
            <span className="hide-mobile">PREV</span>
          </button>
        ) : (
          <div style={{ width: '60px' }} />
        )}
      </div>

      {/* Stage Badge & Title */}
      <div style={{ flex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#ff758c', letterSpacing: '1px', textTransform: 'uppercase' }}>
          <Sparkles size={12} color="#fbbf24" />
          <span>STAGE {currentStageIndex + 1} OF {totalStages}</span>
          <Sparkles size={12} color="#fbbf24" />
        </div>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }}>
          {stageTitle}
        </div>
      </div>

      {/* Level Star Dot Indicators */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
        <div
          style={{
            background: 'rgba(255, 42, 141, 0.15)',
            border: '1px solid rgba(255, 42, 141, 0.4)',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Award size={14} />
          <span>{currentStageIndex + 1}/{totalStages}</span>
        </div>
      </div>
    </motion.header>
  );
}
