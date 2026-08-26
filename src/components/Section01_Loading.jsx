import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function Section01_Loading({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: '#070712',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center'
      }}
    >
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '32px' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px dashed rgba(255, 42, 141, 0.4)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 42, 141, 0.2) 0%, rgba(157, 78, 221, 0) 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Sparkles color="#ff2a8d" size={42} className="animate-pulse-glow" />
        </div>
      </div>

      <motion.h2
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-title gradient-text-pink"
        style={{ fontSize: '1.75rem', marginBottom: '12px' }}
      >
        Preparing something special...
      </motion.h2>

      <motion.p
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ color: '#94a3b8', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        Made with <Heart size={16} color="#ff2a8d" fill="#ff2a8d" /> by your little brother
      </motion.p>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          height: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          marginTop: '40px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <motion.div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #ff2a8d 0%, #fbbf24 100%)',
            borderRadius: '10px'
          }}
        />
      </div>

      <span style={{ color: '#ff2a8d', fontSize: '0.875rem', marginTop: '10px', fontWeight: '600' }}>
        {progress}%
      </span>
    </motion.div>
  );
}
