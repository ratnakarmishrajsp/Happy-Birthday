import React, { useState } from 'react';
import Background3D from './canvas/Background3D';
import AudioController from './components/AudioController';
import Section01_Loading from './components/Section01_Loading';
import Section02_Hero from './components/Section02_Hero';
import Section03_Verification from './components/Section03_Verification';
import Section04_BrotherQuiz from './components/Section04_BrotherQuiz';
import Section05_RoastWall from './components/Section05_RoastWall';
import Section06_TeaIncident from './components/Section06_TeaIncident';
import Section07_GardenIncident from './components/Section07_GardenIncident';
import Section08_MemoryUniverse from './components/Section08_MemoryUniverse';
import Section09_SisterQuiz from './components/Section09_SisterQuiz';
import Section10_SecretLock from './components/Section10_SecretLock';
import Section11_FinalReveal from './components/Section11_FinalReveal';
import Section12_GrandFinale from './components/Section12_GrandFinale';
import { ChevronDown } from 'lucide-react';
import { soundEngine } from './utils/soundEngine';

const sectionIds = [
  'hero-section',
  'verification-section',
  'quiz-section',
  'roast-section',
  'tea-section',
  'garden-section',
  'memory-section',
  'sister-quiz-section',
  'lock-section',
  'final-letter-section',
  'finale-section'
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollNext = () => {
    soundEngine.playClick();
    const scrollPos = window.scrollY || window.pageYOffset;
    let nextId = sectionIds[0];

    for (let i = 0; i < sectionIds.length; i++) {
      const el = document.getElementById(sectionIds[i]);
      if (el) {
        const top = el.offsetTop - 100;
        if (scrollPos < top) {
          nextId = sectionIds[i];
          break;
        }
      }
    }
    scrollTo(nextId);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      {/* 3D Cosmic Ambient Background Canvas */}
      <Background3D />

      {/* Audio Controller Mute/Unmute Persistent Button */}
      <AudioController />

      {/* Floating Scroll Down Indicator Button */}
      {!isLoading && (
        <button onClick={handleScrollNext} className="scroll-down-btn" title="Scroll to Next Section">
          <span>SCROLL</span>
          <ChevronDown size={18} />
        </button>
      )}

      {/* Section 01: Loading Screen */}
      {isLoading ? (
        <Section01_Loading onComplete={() => setIsLoading(false)} />
      ) : (
        <main style={{ position: 'relative', zIndex: 1 }}>
          {/* Section 02: Hero / Opening Scene */}
          <Section02_Hero onStartSurprise={() => scrollTo('verification-section')} />

          {/* Section 03: Birthday Verification */}
          <Section03_Verification onVerified={() => scrollTo('quiz-section')} />

          {/* Section 04: Level 01 Brother Quiz */}
          <Section04_BrotherQuiz onQuizComplete={() => scrollTo('roast-section')} />

          {/* Section 05: The Anshika Roast Wall */}
          <Section05_RoastWall onNextSection={() => scrollTo('tea-section')} />

          {/* Section 06: The Tea Incident */}
          <Section06_TeaIncident onNextSection={() => scrollTo('garden-section')} />

          {/* Section 07: The Garden Incident */}
          <Section07_GardenIncident onNextSection={() => scrollTo('memory-section')} />

          {/* Section 08: Memory Universe */}
          <Section08_MemoryUniverse onNextSection={() => scrollTo('sister-quiz-section')} />

          {/* Section 09: Level 02 Sister Quiz */}
          <Section09_SisterQuiz onQuizComplete={() => scrollTo('lock-section')} />

          {/* Section 10: Secret Message Lock */}
          <Section10_SecretLock onUnlockFinal={() => scrollTo('final-letter-section')} />

          {/* Section 11: Final Emotional Reveal */}
          <Section11_FinalReveal onProceedToFinale={() => scrollTo('finale-section')} />

          {/* Section 12: Grand Birthday Reveal */}
          <Section12_GrandFinale onReplay={handleReplay} />
        </main>
      )}
    </div>
  );
}
