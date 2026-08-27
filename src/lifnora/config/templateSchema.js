// Standard Lifnora Template JSON Config Schema

export const DEFAULT_TEMPLATE_CONFIG = {
  templateId: 'birthday-02-royal-glowing-vault',
  packageTier: 'ultimate-1499', // 'surprise-999' or 'ultimate-1499'
  theme: {
    primaryColor: '#ff2a8d',
    secondaryColor: '#fbbf24',
    accentColor: '#9d4edd',
    bgColor: '#070712',
    vibe: 'royal-gold-neon'
  },
  recipient: {
    name: 'Anshika Pandey',
    nickname: 'Sadhivaaa',
    targetDate: '2026-08-30T00:00:00+05:30',
    relation: 'Sister'
  },
  sender: {
    name: 'Ratnakar Mishra',
    relation: 'Brother'
  },
  features: {
    maxPhotos: 15,
    enableVideo: true,
    enableSecretUnlock: true,
    enableMultipleQuizzes: true,
    enableQR: true
  },
  content: {
    cakeMessage: "Happy Birthday Anshika Didi!",
    videoUrl: "https://cdn.pixabay.com/video/2021/08/04/83907-584742616_large.mp4",
    secretPasscode: "0830",
    bgmTrack: "magical-piano",
    quizzes: [
      {
        id: 1,
        question: "How fast does Anshika's mood change when favorite food arrives?",
        options: [
          "Slower than 2G",
          "Faster than 5G internet ⚡",
          "Normal speed",
          "Depends on weather"
        ],
        correctAnswer: 1,
        reaction: "Faster than 5G internet! Instant smile guaranteed! 😂"
      },
      {
        id: 2,
        question: "What secret teasing nickname does Ratnakar call her at home?",
        options: [
          "Pagal 🤪",
          "Badmash 😈",
          "Sadhivaaa 👑",
          "All of the above 😂❤️"
        ],
        correctAnswer: 3,
        reaction: "All of the above! Pagal + Badmash + Sadhivaaa = Ultimate Didi! ❤️"
      }
    ],
    roasts: [
      {
        id: 1,
        title: "DINO BOSS 🦖",
        text: "Sitting like a total boss in front of a giant roaring T-Rex! Dino Park Queen."
      },
      {
        id: 2,
        title: "LE LE PE PE PE 🗣️",
        text: "Her legendary 'le-le, pe-pe' gossip moments. No explanation required! 😂"
      },
      {
        id: 3,
        title: "TEA DISASTER ☕",
        text: "Spilling hot tea everywhere while explaining serious life philosophy."
      }
    ],
    photos: [
      {
        id: 1,
        title: "Twilight Balcony 🌆",
        path: "/assets/photos/IMG_20260406_140953.jpg",
        caption: "Evening walks with Didi solve all life problems."
      },
      {
        id: 2,
        title: "7D Arcade Squad 🎮",
        path: "/assets/photos/IMG_20260406_141028.jpg",
        caption: "Thumbs up right before the 7D motion ride starts!"
      },
      {
        id: 3,
        title: "Dino Survival 🦖",
        path: "/assets/photos/IMG_20260406_141228.jpg",
        caption: "Chill boss pose in front of a roaring T-Rex!"
      },
      {
        id: 4,
        title: "Auto Comedy 🛺",
        path: "/assets/photos/Snapchat-1309424231.jpg",
        caption: "Every auto ride turns into a non-stop comedy show."
      }
    ],
    letter: {
      heading: "A Letter For Anshika Didi",
      body: [
        "Anshika, you are not just my sister. You are one of those people who make life feel a little more complete.",
        "We've had our arguments, our stupid fights, and countless moments where we've annoyed each other for no reason.",
        "Thank you for being there, for supporting me when I needed it, and for making life a lot more fun.",
        "Happy Birthday, Anshika Didi! ❤️ — Always your brother, Ratnakar"
      ]
    }
  }
};
