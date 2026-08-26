import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const STAGES = [
  { id: 'hero', title: 'The 3D Mystery Box 🎁', component: Section02_Hero },
  { id: 'verification', title: 'Birthday Identity Check 🔐', component: Section03_Verification },
  { id: 'brother-quiz', title: 'Level 01: Brother Quiz 🧠', component: Section04_BrotherQuiz },
  { id: 'roast', title: 'The Anshika Roast Wall 🔥', component: Section05_RoastWall },
  { id: 'tea', title: 'The Tea Incident ☕', component: Section06_TeaIncident },
  { id: 'garden', title: 'The Garden Incident 🌸', component: Section07_GardenIncident },
  { id: 'specs', title: 'Anshika Specs & Sister Manifesto 📊', component: Section07B_SisterStats },
  { id: 'memory', title: 'Memory Constellation Universe 🌌', component: Section08_MemoryUniverse },
  { id: 'sister-quiz', title: 'Level 02: Ultimate Sister Quiz 👑', component: Section09_SisterQuiz },
  { id: 'secret-lock', title: '3D Secret Vault Lock 🔒', component: Section10_SecretLock },
  { id: 'final-reveal', title: 'Final Heartfelt Letter 💌', component: Section11_FinalReveal },
  { id: 'grand-finale', title: 'Grand Birthday Celebration 🎉', component: Section12_GrandFinale }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [nextStageTitle, setNextStageTitle] = useState('');

  const warpToStage = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= STAGES.length) return;

    soundEngine.playSuccess();
    setNextStageTitle(STAGES[targetIndex].title);
    setIsWarping(true);

    setTimeout(() => {
      setCurrentStageIndex(targetIndex);
    }, 800);

    setTimeout(() => {
      setIsWarping(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1800);
  };

  const handleNextStage = () => {
    warpToStage(currentStageIndex + 1);
  };

  const handleReplay = () => {
    warpToStage(0);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      {/* 3D Cosmic Ambient Background */}
      <Background3D />

      {/* Cosmic Hyperspace 3D Warp Transition Overlay */}
      <CosmicWarpOverlay isWarping={isWarping} nextStageTitle={nextStageTitle} />

      {/* Audio Controller Mute/Unmute & BGM Track Selector */}
      <AudioController />

      {/* Section 01: Loading Screen */}
      {isLoading ? (
        <Section01_Loading onComplete={() => setIsLoading(false)} />
      ) : (
        <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStageIndex}
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.25, filter: 'blur(15px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', minHeight: '100vh' }}
            >
              {currentStageIndex === 0 && <Section02_Hero onStartSurprise={handleNextStage} />}
              {currentStageIndex === 1 && <Section03_Verification onVerified={handleNextStage} />}
              {currentStageIndex === 2 && <Section04_BrotherQuiz onQuizComplete={handleNextStage} />}
              {currentStageIndex === 3 && <Section05_RoastWall onNextSection={handleNextStage} />}
              {currentStageIndex === 4 && <Section06_TeaIncident onNextSection={handleNextStage} />}
              {currentStageIndex === 5 && <Section07_GardenIncident onNextSection={handleNextStage} />}
              {currentStageIndex === 6 && <Section07B_SisterStats onNextSection={handleNextStage} />}
              {currentStageIndex === 7 && <Section08_MemoryUniverse onNextSection={handleNextStage} />}
              {currentStageIndex === 8 && <Section09_SisterQuiz onQuizComplete={handleNextStage} />}
              {currentStageIndex === 9 && <Section10_SecretLock onUnlockFinal={handleNextStage} />}
              {currentStageIndex === 10 && <Section11_FinalReveal onProceedToFinale={handleNextStage} />}
              {currentStageIndex === 11 && <Section12_GrandFinale onReplay={handleReplay} />}
            </motion.div>
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}
