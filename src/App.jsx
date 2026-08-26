import React, { useState, useEffect } from 'react';
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
  { id: 'hero', label: '🎁 Gift Box' },
  { id: 'verification', label: '🔐 Identity' },
  { id: 'brother-quiz', label: '🧠 Quiz 1' },
  { id: 'roast', label: '🔥 Roasts' },
  { id: 'tea', label: '☕ Tea Story' },
  { id: 'garden', label: '🌸 Garden' },
  { id: 'sister-stats', label: '📊 Specs' },
  { id: 'memory', label: '🌌 Memories' },
  { id: 'sister-quiz', label: '👑 Quiz 2' },
  { id: 'secret-lock', label: '🔒 Lock' },
  { id: 'final-reveal', label: '💌 Letter' },
  { id: 'grand-finale', label: '🎉 Finale' }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState('hero');

  const scrollToSection = (id) => {
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
              background: 'rgba(15, 10, 30, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              maxWidth: '92vw',
              overflowX: 'auto'
            }}
          >
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                style={{
                  background: activeSectionId === sec.id ? 'rgba(255, 42, 141, 0.8)' : 'rgba(255, 255, 255, 0.08)',
                  color: activeSectionId === sec.id ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '5px 11px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease'
                }}
              >
                {sec.label}
              </button>
            ))}
          </nav>

          {/* Main Continuous Scroll Content */}
          <main style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <div id="hero">
              <Section02_Hero onStartSurprise={() => scrollToSection('verification')} />
            </div>

            <div id="verification">
              <Section03_Verification onVerified={() => scrollToSection('brother-quiz')} />
            </div>

            <div id="brother-quiz">
              <Section04_BrotherQuiz onQuizComplete={() => scrollToSection('roast')} />
            </div>

            <div id="roast">
              <Section05_RoastWall onNextSection={() => scrollToSection('tea')} />
            </div>

            <div id="tea">
              <Section06_TeaIncident onNextSection={() => scrollToSection('garden')} />
            </div>

            <div id="garden">
              <Section07_GardenIncident onNextSection={() => scrollToSection('sister-stats')} />
            </div>

            {/* Apple Spec-Sheet & Sister Manifesto Section */}
            <div id="sister-stats">
              <Section07B_SisterStats onNextSection={() => scrollToSection('memory')} />
            </div>

            <div id="memory">
              <Section08_MemoryUniverse onNextSection={() => scrollToSection('sister-quiz')} />
            </div>

            <div id="sister-quiz">
              <Section09_SisterQuiz onQuizComplete={() => scrollToSection('secret-lock')} />
            </div>

            <div id="secret-lock">
              <Section10_SecretLock onUnlockFinal={() => scrollToSection('final-reveal')} />
            </div>

            <div id="final-reveal">
              <Section11_FinalReveal onProceedToFinale={() => scrollToSection('grand-finale')} />
            </div>

            <div id="grand-finale">
              <Section12_GrandFinale onReplay={() => scrollToSection('hero')} />
            </div>
          </main>
        </>
      )}
    </div>
  );
}
