import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import Background3D from './canvas/Background3D';
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
  const [unlockedMaxIndex, setUnlockedMaxIndex] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState('hero');

  const unlockAndScrollTo = (targetIndex) => {
    soundEngine.playUnlock();
    setUnlockedMaxIndex(prev => Math.max(prev, targetIndex));
    
    setTimeout(() => {
      const elem = document.getElementById(SECTIONS[targetIndex].id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const scrollToSection = (id, idx) => {
    if (idx > unlockedMaxIndex) {
      soundEngine.playError();
      return;
    }
    soundEngine.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const elem = document.getElementById(SECTIONS[i].id);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSectionId(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      {/* 3D Cosmic Ambient Background */}
      <Background3D />

      {/* Audio Controller Mute/Unmute & BGM Track Selector */}
      <AudioController />

      {/* Section 01: Loading Screen */}
      {isLoading ? (
        <Section01_Loading onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Apple-Style Sticky Quick Scrubber Pills */}
          <nav
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '30px',
              background: 'rgba(15, 10, 30, 0.85)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
              maxWidth: '94vw',
              overflowX: 'auto'
            }}
          >
            {SECTIONS.map((sec, idx) => {
              const isUnlocked = idx <= unlockedMaxIndex;
              const isActive = activeSectionId === sec.id;

              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id, idx)}
                  style={{
                    background: isActive
                      ? 'rgba(255, 42, 141, 0.85)'
                      : isUnlocked
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.03)',
                    color: isActive ? '#ffffff' : isUnlocked ? '#e2e8f0' : '#64748b',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '5px 11px',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    cursor: isUnlocked ? 'pointer' : 'not-allowed',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: isUnlocked ? 1 : 0.6
                  }}
                >
                  <span>{sec.label}</span>
                  {!isUnlocked && <Lock size={10} color="#94a3b8" />}
                </button>
              );
            })}
          </nav>

          {/* Main Continuous Progressive Scroll Content */}
          <main style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            
            {/* Step 0: Hero */}
            <div id="hero" style={{ position: 'relative' }}>
              <Section02_Hero onStartSurprise={() => unlockAndScrollTo(1)} />
            </div>

            {/* Step 1: Verification */}
            <SectionWrapper idx={1} unlockedMaxIndex={unlockedMaxIndex} id="verification" title={SECTIONS[1].title}>
              <Section03_Verification onVerified={() => unlockAndScrollTo(2)} />
            </SectionWrapper>

            {/* Step 2: Brother Quiz */}
            <SectionWrapper idx={2} unlockedMaxIndex={unlockedMaxIndex} id="brother-quiz" title={SECTIONS[2].title}>
              <Section04_BrotherQuiz onQuizComplete={() => unlockAndScrollTo(3)} />
            </SectionWrapper>

            {/* Step 3: Roast Wall */}
            <SectionWrapper idx={3} unlockedMaxIndex={unlockedMaxIndex} id="roast" title={SECTIONS[3].title}>
              <Section05_RoastWall onNextSection={() => unlockAndScrollTo(4)} />
            </SectionWrapper>

            {/* Step 4: Tea Incident */}
            <SectionWrapper idx={4} unlockedMaxIndex={unlockedMaxIndex} id="tea" title={SECTIONS[4].title}>
              <Section06_TeaIncident onNextSection={() => unlockAndScrollTo(5)} />
            </SectionWrapper>

            {/* Step 5: Garden Incident */}
            <SectionWrapper idx={5} unlockedMaxIndex={unlockedMaxIndex} id="garden" title={SECTIONS[5].title}>
              <Section07_GardenIncident onNextSection={() => unlockAndScrollTo(6)} />
            </SectionWrapper>

            {/* Step 6: Sister Specs Manifesto */}
            <SectionWrapper idx={6} unlockedMaxIndex={unlockedMaxIndex} id="sister-stats" title={SECTIONS[6].title}>
              <Section07B_SisterStats onNextSection={() => unlockAndScrollTo(7)} />
            </SectionWrapper>

            {/* Step 7: Memory Universe */}
            <SectionWrapper idx={7} unlockedMaxIndex={unlockedMaxIndex} id="memory" title={SECTIONS[7].title}>
              <Section08_MemoryUniverse onNextSection={() => unlockAndScrollTo(8)} />
            </SectionWrapper>

            {/* Step 8: Sister Quiz */}
            <SectionWrapper idx={8} unlockedMaxIndex={unlockedMaxIndex} id="sister-quiz" title={SECTIONS[8].title}>
              <Section09_SisterQuiz onQuizComplete={() => unlockAndScrollTo(9)} />
            </SectionWrapper>

            {/* Step 9: Secret Lock */}
            <SectionWrapper idx={9} unlockedMaxIndex={unlockedMaxIndex} id="secret-lock" title={SECTIONS[9].title}>
              <Section10_SecretLock onUnlockFinal={() => unlockAndScrollTo(10)} />
            </SectionWrapper>

            {/* Step 10: Final Reveal */}
            <SectionWrapper idx={10} unlockedMaxIndex={unlockedMaxIndex} id="final-reveal" title={SECTIONS[10].title}>
              <Section11_FinalReveal onProceedToFinale={() => unlockAndScrollTo(11)} />
            </SectionWrapper>

            {/* Step 11: Grand Finale */}
            <SectionWrapper idx={11} unlockedMaxIndex={unlockedMaxIndex} id="grand-finale" title={SECTIONS[11].title}>
              <Section12_GrandFinale onReplay={() => unlockAndScrollTo(0)} />
            </SectionWrapper>

          </main>
        </>
      )}
    </div>
  );
}

// Wrapper for Step-by-Step Progressive Blur & Lock System
function SectionWrapper({ children, idx, unlockedMaxIndex, id, title }) {
  const isUnlocked = idx <= unlockedMaxIndex;

  return (
    <div
      id={id}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        filter: isUnlocked ? 'none' : 'blur(16px)',
        opacity: isUnlocked ? 1 : 0.35,
        pointerEvents: isUnlocked ? 'auto' : 'none',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: isUnlocked ? 'auto' : 'none'
      }}
    >
      {children}

      {/* Locked Overlay Badge */}
      {!isUnlocked && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 5, 12, 0.55)',
            backdropFilter: 'blur(10px)',
            pointerEvents: 'auto',
            padding: '20px'
          }}
        >
          <div
            className="glass-panel-glow"
            style={{
              padding: '24px 32px',
              borderRadius: '24px',
              textAlign: 'center',
              border: '1px solid rgba(255, 42, 141, 0.5)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.85)',
              maxWidth: '380px',
              width: '90%'
            }}
          >
            <div style={{ background: 'rgba(255, 42, 141, 0.15)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Lock size={28} color="#ff2a8d" />
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
              LEVEL {idx + 1} LOCKED 🔒
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff', marginBottom: '8px' }}>
              {title}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Complete <strong style={{ color: '#ff758c' }}>Level {idx}</strong> above to unlock this 3D stage! ✨
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
