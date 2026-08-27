import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Check, Sparkles, X } from 'lucide-react';
import { soundEngine, bgmTracks } from '../utils/soundEngine';

export default function AudioController() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playClick();
      soundEngine.setTrack('magical-piano');
    }
  };

  return (
    <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 99999, display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Mute/Unmute Toggle Button for Single Birthday Instrumental BGM */}
      <button
        onClick={toggleAudio}
        className="audio-toggle-btn"
        title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
      >
        {isMuted ? (
          <>
            <VolumeX size={16} color="#ef4444" />
            <span>MUSIC OFF 🔇</span>
          </>
        ) : (
          <>
            <Volume2 size={16} color="#ff2a8d" />
            <span>BIRTHDAY BGM 🎵</span>
          </>
        )}
      </button>
    </div>
  );
}
