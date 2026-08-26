import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Check, Sparkles, X } from 'lucide-react';
import { soundEngine, bgmTracks } from '../utils/soundEngine';

export default function AudioController() {
  const [isMuted, setIsMuted] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [activeTrack, setActiveTrack] = useState('baddie-trap');

  const toggleAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playClick();
    }
  };

  const handleSelectTrack = (trackId) => {
    setActiveTrack(trackId);
    soundEngine.setTrack(trackId);
    soundEngine.playSuccess();
    setShowMusicMenu(false);
  };

  return (
    <>
      <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Track Selector Button */}
        <button
          onClick={() => setShowMusicMenu(!showMusicMenu)}
          className="audio-toggle-btn"
          style={{ background: 'rgba(157, 78, 221, 0.3)', borderColor: 'rgba(157, 78, 221, 0.6)' }}
          title="Select Background Music Track"
        >
          <Music size={16} color="#fbbf24" />
          <span className="hide-mobile">MUSIC 🎵</span>
        </button>

        {/* Mute/Unmute Toggle Button */}
        <button
          onClick={toggleAudio}
          className="audio-toggle-btn"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <>
              <VolumeX size={18} color="#ef4444" />
              <span>MUTE 🔇</span>
            </>
          ) : (
            <>
              <Volume2 size={18} color="#ff2a8d" />
              <span>SOUND ON</span>
            </>
          )}
        </button>
      </div>

      {/* Music Selector Modal */}
      <AnimatePresence>
        {showMusicMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="glass-panel-glow"
            style={{
              position: 'fixed',
              top: '76px',
              right: '24px',
              zIndex: 99999,
              width: '340px',
              maxWidth: '90vw',
              padding: '20px',
              borderColor: 'rgba(255, 42, 141, 0.5)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 800, color: '#ff758c' }}>
                <Sparkles size={16} color="#fbbf24" />
                <span>CHOOSE BGM VIBE</span>
              </div>
              <button
                onClick={() => setShowMusicMenu(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {bgmTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(track.id)}
                  style={{
                    background: activeTrack === track.id ? 'rgba(255, 42, 141, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: activeTrack === track.id ? '1px solid rgba(255, 42, 141, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    textAlign: 'left',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: activeTrack === track.id ? '#ff758c' : '#f8fafc' }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                      {track.style}
                    </div>
                  </div>
                  {activeTrack === track.id && <Check size={16} color="#ff2a8d" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
