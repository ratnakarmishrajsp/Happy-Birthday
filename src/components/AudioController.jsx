import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function AudioController() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playClick();
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className="audio-toggle-btn"
      title={isMuted ? 'Unmute Sound & Music' : 'Mute Sound & Music'}
    >
      {isMuted ? (
        <>
          <VolumeX size={18} color="#ef4444" />
          <span>MUTE 🔇</span>
        </>
      ) : (
        <>
          <Volume2 size={18} color="#ff2a8d" />
          <span>SOUND ON 🎵</span>
        </>
      )}
    </button>
  );
}
