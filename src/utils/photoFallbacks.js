// Helper function to generate SVG Data URIs for fallback photos
export const getPlaceholderPhoto = (id, title, color1 = '#ff2a8d', color2 = '#9d4edd') => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="grad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
        <radialGradient id="glow_${id}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.8" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#grad_${id})" />
      <rect width="600" height="400" fill="url(#glow_${id})" />
      <circle cx="300" cy="160" r="70" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
      <text x="300" y="175" font-family="'Outfit', sans-serif" font-size="56" fill="#ffffff" text-anchor="middle">📸</text>
      <text x="300" y="270" font-family="'Cinzel', serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">${title.toUpperCase()}</text>
      <text x="300" y="310" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="rgba(255,255,255,0.8)" text-anchor="middle">Anshika &amp; Ratnakar Memory #${id}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const memoryPhotos = [
  {
    id: 1,
    title: "Sibling Shenanigans",
    path: "/assets/photos/memory-01.jpg",
    fallback: getPlaceholderPhoto(1, "Sibling Shenanigans", "#ff2a8d", "#9d4edd"),
    caption: "That one time we laughed until our stomachs hurt over the most stupid joke! 😂",
    year: "Childhood Days"
  },
  {
    id: 2,
    title: "The Reel Partner",
    path: "/assets/photos/memory-02.jpg",
    fallback: getPlaceholderPhoto(2, "The Reel Partner", "#ec4899", "#8b5cf6"),
    caption: "Always scrolling Reels, always making me watch 50 clips in a row! 📱✨",
    year: "Daily Life"
  },
  {
    id: 3,
    title: "Random Arguments",
    path: "/assets/photos/memory-03.jpg",
    fallback: getPlaceholderPhoto(3, "Random Arguments", "#f43f5e", "#fbbf24"),
    caption: "Fighting over the TV remote & AC temperature like it's a world war. ⚔️",
    year: "Unbreakable Bond"
  },
  {
    id: 4,
    title: "Tea Master Didi",
    path: "/assets/photos/memory-04.jpg",
    fallback: getPlaceholderPhoto(4, "Tea Master Didi", "#10b981", "#3b82f6"),
    caption: "The legendary 1-hour tea session that will go down in family history! ☕",
    year: "Legendary Moment"
  },
  {
    id: 5,
    title: "Festival Magic",
    path: "/assets/photos/memory-05.jpg",
    fallback: getPlaceholderPhoto(5, "Festival Magic", "#a855f7", "#6366f1"),
    caption: "Dressed up for celebrations, pretending to be civilized for 5 minutes. 🌟",
    year: "Festive Vibes"
  },
  {
    id: 6,
    title: "Best Friends Forever",
    path: "/assets/photos/memory-06.jpg",
    fallback: getPlaceholderPhoto(6, "Best Friends Forever", "#f59e0b", "#ef4444"),
    caption: "No matter how much we annoy each other, you'll always be my favorite human. ❤️",
    year: "Always & Forever"
  },
  {
    id: 7,
    title: "Anshika Didi Special",
    path: "/assets/photos/anshika-01.jpg",
    fallback: getPlaceholderPhoto(7, "Anshika Didi Special", "#ff2a8d", "#f43f5e"),
    caption: "Captured in her element — pure laughter and good energy! ✨",
    year: "Memories"
  },
  {
    id: 8,
    title: "Brother-Sister Moments",
    path: "/assets/photos/anshika-02.jpg",
    fallback: getPlaceholderPhoto(8, "Brother-Sister Moments", "#38bdf8", "#9d4edd"),
    caption: "Partners in chaos since day one! 🚀❤️",
    year: "Together"
  }
];
