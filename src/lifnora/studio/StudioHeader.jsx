import React from 'react';
import { Sparkles, Eye, Zap, Layers, Crown, ShieldAlert } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export default function StudioHeader({
  activeTemplate,
  onChangeTemplate,
  activeTier,
  onChangeTier
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999999,
        background: 'rgba(7, 7, 18, 0.95)',
        borderBottom: '1px solid rgba(251, 191, 36, 0.4)',
        backdropFilter: 'blur(16px)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}
    >
      {/* Lifnora Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #ff2a8d 0%, #fbbf24 100%)',
            padding: '6px 12px',
            borderRadius: '12px',
            color: '#070712',
            fontWeight: 900,
            fontSize: '0.85rem',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={16} color="#070712" /> LIFNORA TEMPLATE STUDIO
        </div>

        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }} className="mobile-hide">
          PROJECT 1 • PRODUCT PREVIEW
        </span>
      </div>

      {/* Controls: Template Switcher & Package Tier Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {/* Template Switcher */}
        <select
          value={activeTemplate}
          onChange={(e) => {
            soundEngine.playClick();
            onChangeTemplate(e.target.value);
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: 700,
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="birthday-01" style={{ background: '#0a0818', color: '#fff' }}>
            🎂 Birthday Design 01 (Anshika Original 3D Box)
          </option>
          <option value="birthday-02" style={{ background: '#0a0818', color: '#fff' }}>
            👑 Birthday Design 02 (Royal Vault & 3D Candle Cake)
          </option>
        </select>

        {/* Tier Switcher Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            padding: '3px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <button
            onClick={() => {
              soundEngine.playPop();
              onChangeTier('surprise-999');
            }}
            style={{
              background: activeTier === 'surprise-999' ? 'rgba(255, 42, 141, 0.3)' : 'transparent',
              border: activeTier === 'surprise-999' ? '1px solid #ff2a8d' : 'none',
              color: activeTier === 'surprise-999' ? '#ff758c' : '#94a3b8',
              padding: '4px 10px',
              borderRadius: '10px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            ₹999 THE SURPRISE
          </button>

          <button
            onClick={() => {
              soundEngine.playPop();
              onChangeTier('ultimate-1499');
            }}
            style={{
              background: activeTier === 'ultimate-1499' ? 'rgba(251, 191, 36, 0.3)' : 'transparent',
              border: activeTier === 'ultimate-1499' ? '1px solid #fbbf24' : 'none',
              color: activeTier === 'ultimate-1499' ? '#fbbf24' : '#94a3b8',
              padding: '4px 10px',
              borderRadius: '10px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            👑 ₹1499 ULTIMATE
          </button>
        </div>
      </div>
    </div>
  );
}
