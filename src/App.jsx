import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

import StudioHeader from './lifnora/studio/StudioHeader';
import Birthday02Master from './lifnora/templates/birthday-02/Birthday02Master';
import { DEFAULT_TEMPLATE_CONFIG } from './lifnora/config/templateSchema';

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
  const [activeTemplate, setActiveTemplate] = useState('birthday-02');
  const [activeTier, setActiveTier] = useState('ultimate-1499');

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

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflowX: 'hidden', backgroundColor: '#070712' }}>
      {/* Lifnora Template Studio Header Switcher */}
      <StudioHeader
        activeTemplate={activeTemplate}
        onChangeTemplate={setActiveTemplate}
        activeTier={activeTier}
        onChangeTier={setActiveTier}
      />

      {/* Audio Controller */}
      <AudioController />

      {activeTemplate === 'birthday-02' ? (
        <Birthday02Master config={DEFAULT_TEMPLATE_CONFIG} packageTier={activeTier} />
      ) : (
        <>
          {/* 3D Cosmic Ambient Background */}
          <Background3D />

          {/* Cosmic Warp / Particle Blast Overlay */}
          <CosmicWarpOverlay isWarping={isWarping} nextStageTitle={warpTargetTitle} />

          {/* If before 30 August 2026 Midnight and not bypassed, render Countdown Gate */}
          {!isGateUnlocked ? (
            <CountdownLockGate onUnlock={() => setIsGateUnlocked(true)} />
          ) : (
            <div style={{ paddingTop: '50px' }}>
              {renderActiveSection()}
            </div>
          )}
        </>
      )}
    </div>
  );
}
