import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

import Background3D from './canvas/Background3D';
import CosmicWarpOverlay from './canvas/CosmicWarpOverlay';
import AudioController from './components/AudioController';
import CountdownLockGate from './components/CountdownLockGate';

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
  const [isGateUnlocked, setIsGateUnlocked] = useState(() => {
    const target = new Date('2026-08-30T00:00:00+05:30').getTime();
    return new Date().getTime() >= target;
  });
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

  // If before 30 August 2026 Midnight and not bypassed, render Countdown Gate
  if (!isGateUnlocked) {
    return <CountdownLockGate onUnlock={() => setIsGateUnlocked(true)} />;
  }

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
          {/* Bottom Stage Navigation Footer */}
          <footer
            style={{
              position: 'fixed',
              bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '10px 18px',
              width: '92%',
              maxWidth: '850px',
              borderRadius: '30px',
              background: 'rgba(15, 10, 30, 0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 42, 141, 0.4)',
              boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.85)'
            }}
          >
            {/* Back Button */}
            {currentStageIndex > 0 ? (
              <button
                onClick={() => goToStage(currentStageIndex - 1)}
                disabled={isWarping}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronLeft size={16} />
                <span>BACK</span>
              </button>
            ) : (
              <div style={{ width: '70px' }} />
            )}

            {/* Title / Stage Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '1.1rem' }}>👑</span>
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  STAGE {currentStageIndex + 1} OF 12
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                  {SECTIONS[currentStageIndex].title}
                </div>
              </div>
            </div>

            {/* Stage Progress Bar & Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '80px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
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
              <div
                style={{
                  background: 'rgba(255, 42, 141, 0.2)',
                  border: '1px solid rgba(255, 42, 141, 0.5)',
                  color: '#ff758c',
                  padding: '3px 10px',
                  borderRadius: '14px',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}
              >
                {progressPercent}%
              </div>
            </div>
          </footer>

          {/* Main Stage View Container (Single Active Screen Architecture) */}
          <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh', width: '100%', paddingTop: '60px', paddingBottom: '90px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStageIndex}
                initial={{ opacity: 0, scale: 0.94, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -25 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ width: '100%', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
}
