import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

import Background3D from './canvas/Background3D';
import CosmicWarpOverlay from './canvas/CosmicWarpOverlay';
import AudioController from './components/AudioController';

import Section01_Loading from './components/Section01_Loading';
import Section02_Hero from './components/Section02_Hero';
import Section03_Verification from './components/Section03_Verification';
import Section04_BrotherQuiz from './components/Section04_BrotherQuiz';
import Section05_RoastWall from './components/Section05_RoastWall';
import Section06_TeaIncident from './components/Section06_TeaIncident';
import Section07_GardenIncident from './components/Section07_GardenIncident';
import Section07B_SisterStats from './components/Section07B_SisterStats';
import Section08_MemoryUniverse from './components/Section08_MemoryUniverse';
import Section09_SisterQuiz from './components/Section09_SisterQuiz';
import Section10_SecretLock from './components/Section10_SecretLock';
import Section11_FinalReveal from './components/Section11_FinalReveal';
import Section12_GrandFinale from './components/Section12_GrandFinale';

import { soundEngine } from './utils/soundEngine';

const SECTIONS = [
  { id: 'hero', label: '🎁 Gift Box', title: 'The 3D Mystery Box' },
  { id: 'verification', label: '🔐 Identity', title: 'Identity Check' },
  { id: 'brother-quiz', label: '🧠 Quiz 1', title: 'Brother Quiz' },
  { id: 'roast', label: '🔥 Roasts', title: 'Roast Wall' },
  { id: 'tea', label: '☕ Tea Story', title: 'The Tea Incident' },
  { id: 'garden', label: '🌸 Garden', title: 'The Garden Incident' },
  { id: 'sister-stats', label: '📊 Specs', title: 'Sister Specs Manifesto' },
  { id: 'memory', label: '🌌 Memories', title: 'Memory Universe' },
  { id: 'sister-quiz', label: '👑 Quiz 2', title: 'Sister Quiz' },
  { id: 'secret-lock', label: '🔒 Lock', title: 'Vault Lock' },
  { id: 'final-reveal', label: '💌 Letter', title: 'Heartfelt Letter' },
  { id: 'grand-finale', label: '🎉 Finale', title: 'Grand Finale' }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [completedMaxIndex, setCompletedMaxIndex] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [warpTargetTitle, setWarpTargetTitle] = useState('');

  const goToStage = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;
    if (isWarping) return;

    soundEngine.playPop();
    setWarpTargetTitle(SECTIONS[targetIndex].title);
    setIsWarping(true);

    setTimeout(() => {
      setCurrentStageIndex(targetIndex);
      setCompletedMaxIndex((prev) => Math.max(prev, targetIndex));
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 700);

    setTimeout(() => {
      setIsWarping(false);
    }, 1400);
  };

  const renderActiveSection = () => {
    switch (currentStageIndex) {
      case 0:
        return <Section02_Hero onStartSurprise={() => goToStage(1)} />;
      case 1:
        return <Section03_Verification onVerified={() => goToStage(2)} />;
      case 2:
        return <Section04_BrotherQuiz onQuizComplete={() => goToStage(3)} />;
      case 3:
        return <Section05_RoastWall onNextSection={() => goToStage(4)} />;
      case 4:
        return <Section06_TeaIncident onNextSection={() => goToStage(5)} />;
      case 5:
        return <Section07_GardenIncident onNextSection={() => goToStage(6)} />;
      case 6:
        return <Section07B_SisterStats onNextSection={() => goToStage(7)} />;
      case 7:
        return <Section08_MemoryUniverse onNextSection={() => goToStage(8)} />;
      case 8:
        return <Section09_SisterQuiz onQuizComplete={() => goToStage(9)} />;
      case 9:
        return <Section10_SecretLock onUnlockFinal={() => goToStage(10)} />;
      case 10:
        return <Section11_FinalReveal onProceedToFinale={() => goToStage(11)} />;
      case 11:
        return <Section12_GrandFinale onReplay={() => goToStage(0)} />;
      default:
        return <Section02_Hero onStartSurprise={() => goToStage(1)} />;
    }
  };

  const progressPercent = Math.round(((currentStageIndex + 1) / SECTIONS.length) * 100);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflowX: 'hidden', backgroundColor: '#070712' }}>
      {/* 3D Cosmic Ambient Background */}
      <Background3D />

      {/* Cosmic Warp / Particle Blast Overlay */}
      <CosmicWarpOverlay isWarping={isWarping} nextStageTitle={warpTargetTitle} />

      {/* Audio Controller (Music BGM Track Selector & Sound Effects) */}
      <AudioController />

      {/* Loading Screen */}
      {isLoading ? (
        <Section01_Loading onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Top Stage Header Bar */}
          <header
            style={{
              position: 'fixed',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '10px 20px',
              width: '92%',
              maxWidth: '850px',
              borderRadius: '30px',
              background: 'rgba(15, 10, 30, 0.82)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(255, 42, 141, 0.35)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.7)'
            }}
          >
            {/* Title / Stage Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.1rem' }}>👑</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  STAGE {currentStageIndex + 1} OF 12
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
                  {SECTIONS[currentStageIndex].title}
                </div>
              </div>
            </div>

            {/* Stage Progress Bar */}
            <div style={{ flex: 1, maxWidth: '200px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff2a8d 0%, #fbbf24 100%)',
                  borderRadius: '10px'
                }}
              />
            </div>

            {/* Quick Step Counter Badge */}
            <div
              style={{
                background: 'rgba(255, 42, 141, 0.2)',
                border: '1px solid rgba(255, 42, 141, 0.5)',
                color: '#ff758c',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}
            >
              {progressPercent}%
            </div>
          </header>

          {/* Main Stage View Container (Single Active Screen Architecture) */}
          <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh', width: '100%' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStageIndex}
                initial={{ opacity: 0, scale: 0.94, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -25 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Bottom Stage Navigation Dock */}
          <nav
            style={{
              position: 'fixed',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '30px',
              background: 'rgba(15, 10, 30, 0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 42, 141, 0.4)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.85)',
              maxWidth: '94vw',
              width: 'max-content'
            }}
          >
            {/* Prev Stage Button */}
            <button
              onClick={() => goToStage(currentStageIndex - 1)}
              disabled={currentStageIndex === 0 || isWarping}
              style={{
                background: currentStageIndex === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.15)',
                color: currentStageIndex === 0 ? '#475569' : '#ffffff',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: currentStageIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronLeft size={16} />
              <span>PREV</span>
            </button>

            {/* Scrubber Pills Container */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                overflowX: 'auto',
                maxWidth: '65vw',
                scrollbarWidth: 'none',
                padding: '2px 4px'
              }}
            >
              {SECTIONS.map((sec, idx) => {
                const isActive = currentStageIndex === idx;
                const isUnlocked = idx <= completedMaxIndex;

                return (
                  <button
                    key={sec.id}
                    onClick={() => goToStage(idx)}
                    title={sec.title}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #ff2a8d 0%, #ff758c 100%)'
                        : isUnlocked
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isActive ? '#ffffff' : isUnlocked ? '#e2e8f0' : '#64748b',
                      border: isActive ? '1px solid #ff758c' : '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '20px',
                      padding: '5px 10px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
                    }}
                  >
                    <span>{sec.label}</span>
                    {!isUnlocked && <Lock size={11} color="#fbbf24" />}
                  </button>
                );
              })}
            </div>

            {/* Next Stage Button */}
            <button
              onClick={() => goToStage(currentStageIndex + 1)}
              disabled={currentStageIndex === SECTIONS.length - 1 || isWarping}
              style={{
                background: currentStageIndex === SECTIONS.length - 1
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'linear-gradient(135deg, #ff2a8d 0%, #ff758c 100%)',
                color: currentStageIndex === SECTIONS.length - 1 ? '#475569' : '#ffffff',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: currentStageIndex === SECTIONS.length - 1 ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                boxShadow: currentStageIndex === SECTIONS.length - 1 ? 'none' : '0 4px 15px rgba(255, 42, 141, 0.4)'
              }}
            >
              <span>NEXT</span>
              <ChevronRight size={16} />
            </button>
          </nav>
        </>
      )}
    </div>
  );
}
