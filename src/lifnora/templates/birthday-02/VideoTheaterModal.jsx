import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Film, Sparkles, ArrowRight, Video } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEngine';

export default function VideoTheaterModal({ videoUrl, recipientName, onNextSection }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    soundEngine.playSuccess();
    setIsPlaying(true);
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '740px',
          padding: '44px 32px',
          position: 'relative',
          background: 'rgba(12, 8, 28, 0.92)',
          boxShadow: '0 0 50px rgba(157, 78, 221, 0.4)',
          borderRadius: '32px'
        }}
      >
        <span
          style={{
            background: 'rgba(157, 78, 221, 0.2)',
            border: '1px solid rgba(157, 78, 221, 0.5)',
            color: '#c084fc',
            padding: '6px 18px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Film size={14} color="#c084fc" /> ₹1499 ULTIMATE EXCLUSIVE • CINEMATIC VIDEO 🎬
        </span>

        <h2 className="font-title gradient-text-magic" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '12px' }}>
          Before You Read My Final Letter...
        </h2>

        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', marginBottom: '28px', maxWidth: '520px', margin: '0 auto 28px' }}>
          There's a special personal video message waiting for you, {recipientName}! Click play to watch.
        </p>

        {/* Glassmorphic Video Theater Player Box */}
        <div
          style={{
            width: '100%',
            maxWidth: '640px',
            aspectRatio: '16/9',
            borderRadius: '24px',
            overflow: 'hidden',
            background: '#05040d',
            border: '2px solid rgba(157, 78, 221, 0.5)',
            boxShadow: '0 15px 45px rgba(0, 0, 0, 0.9)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px'
          }}
        >
          {isPlaying ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              onClick={handlePlayVideo}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: 'radial-gradient(circle, rgba(157, 78, 221, 0.3) 0%, rgba(5, 4, 13, 0.95) 80%)'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff2a8d 0%, #9d4edd 100%)',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 30px rgba(255, 42, 141, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px'
                }}
              >
                <Play size={36} color="#ffffff" fill="#ffffff" style={{ marginLeft: '4px' }} />
              </motion.div>

              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', letterSpacing: '1px' }}>
                CLICK TO PLAY SPECIAL VIDEO 🎬
              </span>
            </div>
          )}
        </div>

        <button onClick={onNextSection} className="glow-button">
          <span>CONTINUE SURPRISE JOURNEY 🚀</span>
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </section>
  );
}
