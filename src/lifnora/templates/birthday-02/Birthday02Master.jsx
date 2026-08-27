import React, { useState } from 'react';
import CandleCake3D from './CandleCake3D';
import VideoTheaterModal from './VideoTheaterModal';

import CountdownLockGate from '../../../components/CountdownLockGate';
import Section03_Verification from '../../../components/Section03_Verification';
import Section04_BrotherQuiz from '../../../components/Section04_BrotherQuiz';
import Section05_RoastWall from '../../../components/Section05_RoastWall';
import Section08_MemoryUniverse from '../../../components/Section08_MemoryUniverse';
import Section10_SecretLock from '../../../components/Section10_SecretLock';
import Section11_FinalReveal from '../../../components/Section11_FinalReveal';
import Section12_GrandFinale from '../../../components/Section12_GrandFinale';

import CosmicWarpOverlay from '../../../canvas/CosmicWarpOverlay';
import { soundEngine } from '../../../utils/soundEngine';

export default function Birthday02Master({ config, packageTier }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [warpTitle, setWarpTitle] = useState('');

  const isUltimateTier = packageTier === 'ultimate-1499';

  const goToNextStage = (nextIndex, title = '') => {
    if (isWarping) return;

    soundEngine.playPop();
    setWarpTitle(title);
    setIsWarping(true);

    setTimeout(() => {
      setCurrentStage(nextIndex);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 700);

    setTimeout(() => {
      setIsWarping(false);
    }, 1400);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#070712', color: '#fff', paddingTop: '50px' }}>
      <CosmicWarpOverlay isWarping={isWarping} nextStageTitle={warpTitle} />

      {currentStage === 0 && (
        <CandleCake3D
          recipientName={config.recipient.name}
          onStartSurprise={() => goToNextStage(1, "The Royal Gate Lock")}
        />
      )}

      {currentStage === 1 && (
        <CountdownLockGate
          onUnlock={() => goToNextStage(2, "Identity Check")}
        />
      )}

      {currentStage === 2 && (
        <Section03_Verification
          onVerified={() => goToNextStage(3, "Brother Quiz")}
        />
      )}

      {currentStage === 3 && (
        <Section04_BrotherQuiz
          onQuizComplete={() => goToNextStage(4, "Roast Wall")}
        />
      )}

      {currentStage === 4 && (
        <Section05_RoastWall
          onNextSection={() => goToNextStage(5, "Memory Constellation")}
        />
      )}

      {currentStage === 5 && (
        <Section08_MemoryUniverse
          onNextSection={() => {
            if (isUltimateTier) {
              goToNextStage(6, "Cinematic Video Theater");
            } else {
              goToNextStage(8, "Heartfelt Letter");
            }
          }}
        />
      )}

      {/* ₹1499 Ultimate Tier Exclusive Stages */}
      {currentStage === 6 && isUltimateTier && (
        <VideoTheaterModal
          videoUrl={config.content.videoUrl}
          recipientName={config.recipient.name}
          onNextSection={() => goToNextStage(7, "Secret Vault Lock")}
        />
      )}

      {currentStage === 7 && isUltimateTier && (
        <Section10_SecretLock
          onUnlockFinal={() => goToNextStage(8, "Heartfelt Letter")}
        />
      )}

      {currentStage === 8 && (
        <Section11_FinalReveal
          onProceedToFinale={() => goToNextStage(9, "Grand Finale")}
        />
      )}

      {currentStage === 9 && (
        <Section12_GrandFinale
          onReplay={() => goToNextStage(0, "3D Birthday Cake")}
        />
      )}
    </div>
  );
}
