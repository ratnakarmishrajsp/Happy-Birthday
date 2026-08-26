import confetti from 'canvas-confetti';

export const triggerConfetti = (duration = 3000) => {
  const end = Date.now() + duration;

  // Launch initial burst
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 }
  });

  // Continuous celebratory stream
  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff2a8d', '#9d4edd', '#fbbf24', '#38bdf8', '#ffffff']
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff2a8d', '#9d4edd', '#fbbf24', '#38bdf8', '#ffffff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

export const triggerHeartConfetti = () => {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['heart'],
    colors: ['FF1493', 'FF69B4', 'FFB6C1', 'FF007F']
  };

  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2
  });

  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 3
  });
};
