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
    title: "Twilight Balcony & Serene Chill 🌆",
    path: "/assets/photos/IMG_20260406_140953.jpg",
    fallback: getPlaceholderPhoto(1, "Twilight Balcony", "#ff2a8d", "#9d4edd"),
    caption: "Hand resting on her neck, evening sky in the background, and neckband earphones locked in — Didi in her serene yet cute default pose! Evening walks with Didi solve all life problems.",
    year: "Evening Memories",
    rotate: 0,
    aspectRatio: "16/9"
  },
  {
    id: 2,
    title: "7D Arcade Squad & Thumbs Up! 🎮👍",
    path: "/assets/photos/IMG_20260406_141028.jpg",
    fallback: getPlaceholderPhoto(2, "7D Arcade Squad", "#ec4899", "#8b5cf6"),
    caption: "Right before the 7D motion ride started! Didi trying to stay calm while the seats start shaking, and the squad hyping up with a big thumbs up!",
    year: "Arcade Outing",
    rotate: 0,
    aspectRatio: "3/4"
  },
  {
    id: 3,
    title: "T-Rex Dino Survival & Boss Pose 🦖😎",
    path: "/assets/photos/IMG_20260406_141228.jpg",
    fallback: getPlaceholderPhoto(3, "T-Rex Dino Park", "#f43f5e", "#fbbf24"),
    caption: "A giant roaring T-Rex right behind us, and what do we do? Put on cool sunglasses and sit like total bosses! With Didi around, even Jurassic Park feels like a chill picnic.",
    year: "Dino Park Adventure",
    rotate: 0,
    aspectRatio: "16/9"
  },
  {
    id: 4,
    title: "Auto Ride Goofiness & Comedy 🛺😜",
    path: "/assets/photos/Snapchat-1309424231.jpg",
    fallback: getPlaceholderPhoto(4, "Auto Ride Comedy", "#38bdf8", "#a855f7"),
    caption: "Me making goofy funny faces while Didi tries her best to look aesthetic! Every auto ride with Didi turns into a comedy show filled with laughter and endless gossip.",
    year: "Daily Rides",
    rotate: 0,
    aspectRatio: "3/4"
  },
  {
    id: 5,
    title: "Foodie Madness 'In The Punjab' 🍕✌️",
    path: "/assets/photos/Snapchat-2067139904.jpg",
    fallback: getPlaceholderPhoto(5, "In The Punjab Cafe", "#10b981", "#3b82f6"),
    caption: "Double peace sign ✌️, tongue out, and ready to devour all the food! Didi's official rule at any cafe: First take silly & cute photos, then eat everything in sight!",
    year: "Cafe Hangouts",
    rotate: 0,
    aspectRatio: "9/16"
  },
  {
    id: 6,
    title: "Home Face Mask Spa Day 💆‍♀️✨",
    path: "/assets/photos/Snapchat-275239515.jpg",
    fallback: getPlaceholderPhoto(6, "Face Mask Spa Day", "#a855f7", "#6366f1"),
    caption: "Face mask cream on, heart pom-pom headband locked in! Who needs an expensive parlor when you can do a chaotic home spa day with Didi and laugh till your mask cracks?",
    year: "Home Fun",
    rotate: 0,
    aspectRatio: "3/4"
  },
  {
    id: 7,
    title: "Baby Dino Hatching Moment 🥚🦖",
    path: "/assets/photos/Snapchat-436339798.jpg",
    fallback: getPlaceholderPhoto(7, "Baby Dino Hatching", "#ff2a8d", "#f43f5e"),
    caption: "The cutest dinosaur to ever hatch! Didi posing inside a giant cracked egg shell looking like the main character of a cute animated movie.",
    year: "Cute Moments",
    rotate: 0,
    aspectRatio: "9/16"
  },
  {
    id: 8,
    title: "Desi Function Swag & 4-Grid Drama 💃✨",
    path: "/assets/photos/Snapchat-568120777.jpg",
    fallback: getPlaceholderPhoto(8, "Desi Function Swag", "#f59e0b", "#ef4444"),
    caption: "Dressed up in traditional ethnic wear with jhumkas on for the family function, but remaining 100% dramatic & playful in front of the camera! Sibling bond forever. ❤️",
    year: "Family Celebrations",
    rotate: 0,
    aspectRatio: "9/16"
  }
];
