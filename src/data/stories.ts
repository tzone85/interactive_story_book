import { Story } from '../types';

// Helper function to create story IDs
const createStoryId = (age: number, index: number) => `story-${age}-${index}`;

// Stories for age 17 (Young Adult)
const youngAdultStories: Story[] = [
  {
    id: createStoryId(17, 1),
    title: "The Quantum Decision",
    description: "A sci-fi thriller where your choices affect parallel universes",
    ageRange: { min: 15, max: 18 },
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
    firstSceneId: "quantum-1",
    tags: ["science fiction", "mystery", "parallel universes"],
    scenes: {
      "quantum-1": {
        id: "quantum-1",
        content: "You discover a quantum device that shows you glimpses of parallel universes. In one reality, you see a global catastrophe approaching. In another, you see a peaceful future.",
        choices: [
          {
            id: "q1-choice1",
            text: "Focus on preventing the catastrophe",
            nextSceneId: "quantum-2a"
          },
          {
            id: "q1-choice2",
            text: "Investigate the peaceful timeline",
            nextSceneId: "quantum-2b"
          }
        ]
      },
      "quantum-2a": {
        id: "quantum-2a",
        content: "You choose to prevent the catastrophe. Your knowledge of the future makes you a key player in averting disaster, but at what personal cost?",
        choices: [
          {
            id: "q2a-choice1",
            text: "Share your knowledge with authorities",
            nextSceneId: "quantum-3a"
          },
          {
            id: "q2a-choice2",
            text: "Work behind the scenes",
            nextSceneId: "quantum-3b"
          }
        ]
      },
      "quantum-2b": {
        id: "quantum-2b",
        content: "The peaceful timeline reveals a world where a crucial scientific discovery changed everything. You recognize the lab where it happens - it's in your city.",
        choices: [
          {
            id: "q2b-choice1",
            text: "Visit the lab",
            nextSceneId: "quantum-3c"
          },
          {
            id: "q2b-choice2",
            text: "Research the discovery online",
            nextSceneId: "quantum-3d"
          }
        ]
      },
      "quantum-3a": {
        id: "quantum-3a",
        content: "You decide to share your knowledge with the authorities. After initial skepticism, they begin to take your warnings seriously as your predictions prove accurate.",
        choices: [
          {
            id: "q3a-choice1",
            text: "Work directly with the emergency response team",
            nextSceneId: "quantum-4a"
          },
          {
            id: "q3a-choice2",
            text: "Focus on public awareness",
            nextSceneId: "quantum-4b"
          }
        ]
      },
      "quantum-3b": {
        id: "quantum-3b",
        content: "Working behind the scenes, you start connecting with key scientists and researchers who might help prevent the catastrophe.",
        choices: [
          {
            id: "q3b-choice1",
            text: "Share your device with a trusted scientist",
            nextSceneId: "quantum-4c"
          },
          {
            id: "q3b-choice2",
            text: "Use the information to guide research anonymously",
            nextSceneId: "quantum-4d"
          }
        ]
      },
      "quantum-3c": {
        id: "quantum-3c",
        content: "At the lab, you meet Dr. Sarah Chen, the scientist who will make the breakthrough. She's currently struggling with a crucial experiment.",
        choices: [
          {
            id: "q3c-choice1",
            text: "Offer to help with her research",
            nextSceneId: "quantum-4e"
          },
          {
            id: "q3c-choice2",
            text: "Share your knowledge of the future",
            nextSceneId: "quantum-4f"
          }
        ]
      },
      "quantum-3d": {
        id: "quantum-3d",
        content: "Your research reveals that the discovery involves a new form of clean energy. The breakthrough happens after a seemingly unrelated discovery in quantum computing.",
        choices: [
          {
            id: "q3d-choice1",
            text: "Focus on quantum computing research",
            nextSceneId: "quantum-4g"
          },
          {
            id: "q3d-choice2",
            text: "Look for connections between fields",
            nextSceneId: "quantum-4h"
          }
        ]
      },
      "quantum-4a": {
        id: "quantum-4a",
        content: "Working with the emergency response team, you help develop a comprehensive plan. Your knowledge of the future helps save countless lives.",
        isEnding: true
      },
      "quantum-4b": {
        id: "quantum-4b",
        content: "Through public awareness campaigns, you mobilize communities worldwide. The collective action prevents the worst of the catastrophe.",
        isEnding: true
      },
      "quantum-4c": {
        id: "quantum-4c",
        content: "The scientist helps validate your warnings with hard data. Together, you find a way to prevent the catastrophe through technological innovation.",
        isEnding: true
      },
      "quantum-4d": {
        id: "quantum-4d",
        content: "Your anonymous guidance leads to breakthrough discoveries. The catastrophe is averted, though few will ever know of your role.",
        isEnding: true
      },
      "quantum-4e": {
        id: "quantum-4e",
        content: "Working alongside Dr. Chen, you help accelerate her research. The clean energy breakthrough comes years ahead of schedule.",
        isEnding: true
      },
      "quantum-4f": {
        id: "quantum-4f",
        content: "Dr. Chen is skeptical at first but your knowledge helps her see new possibilities. Together, you reshape the future of energy.",
        isEnding: true
      },
      "quantum-4g": {
        id: "quantum-4g",
        content: "Your focus on quantum computing leads to unexpected breakthroughs. The clean energy discovery follows naturally from your work.",
        isEnding: true
      },
      "quantum-4h": {
        id: "quantum-4h",
        content: "By connecting different scientific fields, you help create a new interdisciplinary approach that revolutionizes energy production.",
        isEnding: true
      }
    }
  }
];

// Stories for age 14 (Teen)
const teenStories: Story[] = [
  {
    id: createStoryId(14, 1),
    title: "Digital Detective",
    description: "Solve a cyber mystery that's affecting your school",
    ageRange: { min: 12, max: 15 },
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
    firstSceneId: "cyber-1",
    tags: ["mystery", "school", "technology"],
    scenes: {
      "cyber-1": {
        id: "cyber-1",
        content: "Strange messages are appearing on your school's social media. Some students think it's a hack, others believe it's an elaborate prank.",
        choices: [
          {
            id: "c1-choice1",
            text: "Investigate the computer lab",
            nextSceneId: "cyber-2a"
          },
          {
            id: "c1-choice2",
            text: "Talk to the social media team",
            nextSceneId: "cyber-2b"
          }
        ]
      },
      "cyber-2a": {
        id: "cyber-2a",
        content: "In the computer lab, you notice some unusual programs running on one of the computers. The screen shows a complex coding interface.",
        choices: [
          {
            id: "c2a-choice1",
            text: "Try to decode the program",
            nextSceneId: "cyber-3a"
          },
          {
            id: "c2a-choice2",
            text: "Check the computer's history",
            nextSceneId: "cyber-3b"
          }
        ]
      },
      "cyber-2b": {
        id: "cyber-2b",
        content: "The social media team shows you their admin logs. There are login attempts from unknown IP addresses at odd hours.",
        choices: [
          {
            id: "c2b-choice1",
            text: "Track the IP addresses",
            nextSceneId: "cyber-3c"
          },
          {
            id: "c2b-choice2",
            text: "Review the posted messages pattern",
            nextSceneId: "cyber-3d"
          }
        ]
      },
      "cyber-3a": {
        id: "cyber-3a",
        content: "The program appears to be an automated messaging system that's been modified to post messages. Someone has been teaching it to copy student conversation patterns.",
        choices: [
          {
            id: "c3a-choice1",
            text: "Shut down the program",
            nextSceneId: "cyber-4a"
          },
          {
            id: "c3a-choice2",
            text: "Try to interact with the program",
            nextSceneId: "cyber-4b"
          }
        ]
      },
      "cyber-3b": {
        id: "cyber-3b",
        content: "The computer's history reveals regular visits to an advanced programming forum. One username keeps appearing: 'CyberWhisperer'.",
        choices: [
          {
            id: "c3b-choice1",
            text: "Message CyberWhisperer",
            nextSceneId: "cyber-4c"
          },
          {
            id: "c3b-choice2",
            text: "Report the findings to teachers",
            nextSceneId: "cyber-4d"
          }
        ]
      },
      "cyber-3c": {
        id: "cyber-3c",
        content: "The IP addresses all trace back to the school's network, but they're being routed through different classrooms each time.",
        choices: [
          {
            id: "c3c-choice1",
            text: "Set up a trace on the next login",
            nextSceneId: "cyber-4e"
          },
          {
            id: "c3c-choice2",
            text: "Map out the classroom pattern",
            nextSceneId: "cyber-4f"
          }
        ]
      },
      "cyber-3d": {
        id: "cyber-3d",
        content: "The messages follow a specific pattern - they're all posted exactly when the school's robotics club meets.",
        choices: [
          {
            id: "c3d-choice1",
            text: "Visit the robotics club",
            nextSceneId: "cyber-4g"
          },
          {
            id: "c3d-choice2",
            text: "Monitor the next meeting time",
            nextSceneId: "cyber-4h"
          }
        ]
      },
      "cyber-4a": {
        id: "cyber-4a",
        content: "You successfully shut down the program. The next day, a shy student from the programming club confesses it was their experimental project that got out of hand.",
        isEnding: true
      },
      "cyber-4b": {
        id: "cyber-4b",
        content: "Through the program, you discover it was created as part of a student's advanced programming project, meant to study social media behavior. You help them redirect it for positive use.",
        isEnding: true
      },
      "cyber-4c": {
        id: "cyber-4c",
        content: "CyberWhisperer turns out to be a talented freshman who wanted to demonstrate innovative programming techniques. Together, you create guidelines for responsible technology use at school.",
        isEnding: true
      },
      "cyber-4d": {
        id: "cyber-4d",
        content: "The teachers are impressed by your investigation. The incident leads to the creation of a new digital ethics committee, with you as a student representative.",
        isEnding: true
      },
      "cyber-4e": {
        id: "cyber-4e",
        content: "Your trace reveals a group of students testing an experimental network routing system. Their project becomes a highlight of the school's tech fair.",
        isEnding: true
      },
      "cyber-4f": {
        id: "cyber-4f",
        content: "The classroom pattern leads to the discovery of an innovative mesh network project. The students are recognized for their technical creativity.",
        isEnding: true
      },
      "cyber-4g": {
        id: "cyber-4g",
        content: "At the robotics club, you find students developing an automated system to interact on social media. Your discovery leads to an exciting collaboration between the robotics and programming clubs.",
        isEnding: true
      },
      "cyber-4h": {
        id: "cyber-4h",
        content: "During the meeting, you uncover an ambitious programming project. The club agrees to make their experiment public, turning it into an educational opportunity for the whole school.",
        isEnding: true
      }
    }
  }
];

// Stories for age 11 (Pre-teen)
const preteenStories: Story[] = [
  {
    id: createStoryId(11, 1),
    title: "The Secret Garden Club",
    description: "Join a mysterious club that's growing amazing plants",
    ageRange: { min: 9, max: 12 },
    coverImage: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb",
    firstSceneId: "garden-1",
    tags: ["adventure", "nature", "friendship"],
    scenes: {
      "garden-1": {
        id: "garden-1",
        content: "You find a note inviting you to join the Secret Garden Club. It meets behind the old greenhouse after school.",
        choices: [
          {
            id: "g1-choice1",
            text: "Go to the meeting",
            nextSceneId: "garden-2a"
          },
          {
            id: "g1-choice2",
            text: "Ask your friend about it first",
            nextSceneId: "garden-2b"
          }
        ]
      },
      "garden-2a": {
        id: "garden-2a",
        content: "At the greenhouse, you find a small group of students tending to unusual, colorful plants. They welcome you warmly.",
        choices: [
          {
            id: "g2a-choice1",
            text: "Ask about the colorful plants",
            nextSceneId: "garden-3a"
          },
          {
            id: "g2a-choice2",
            text: "Offer to help with gardening",
            nextSceneId: "garden-3b"
          }
        ]
      },
      "garden-2b": {
        id: "garden-2b",
        content: "Your friend's eyes light up - they're already a member! They explain that the club is growing rare plants from around the world.",
        choices: [
          {
            id: "g2b-choice1",
            text: "Go to the club together",
            nextSceneId: "garden-3c"
          },
          {
            id: "g2b-choice2",
            text: "Learn more about the plants first",
            nextSceneId: "garden-3d"
          }
        ]
      },
      "garden-3a": {
        id: "garden-3a",
        content: "The club members explain these are rare rainbow flowers that change color based on temperature. They offer to teach you how to grow them.",
        choices: [
          {
            id: "g3a-choice1",
            text: "Start growing your own",
            nextSceneId: "garden-4a"
          },
          {
            id: "g3a-choice2",
            text: "Research their origin",
            nextSceneId: "garden-4b"
          }
        ]
      },
      "garden-3b": {
        id: "garden-3b",
        content: "They show you how to care for the plants. You notice they're using a special type of soil with tiny, sparkling particles.",
        choices: [
          {
            id: "g3b-choice1",
            text: "Ask about the special soil",
            nextSceneId: "garden-4c"
          },
          {
            id: "g3b-choice2",
            text: "Focus on watering techniques",
            nextSceneId: "garden-4d"
          }
        ]
      },
      "garden-3c": {
        id: "garden-3c",
        content: "Your friend introduces you to everyone. The club is preparing for a special exhibition of their rarest plants.",
        choices: [
          {
            id: "g3c-choice1",
            text: "Help plan the exhibition",
            nextSceneId: "garden-4e"
          },
          {
            id: "g3c-choice2",
            text: "Learn about plant care",
            nextSceneId: "garden-4f"
          }
        ]
      },
      "garden-3d": {
        id: "garden-3d",
        content: "Your friend shares a book about the plants. Some can glow in the dark, others change color with the seasons.",
        choices: [
          {
            id: "g3d-choice1",
            text: "Study the glowing plants",
            nextSceneId: "garden-4g"
          },
          {
            id: "g3d-choice2",
            text: "Focus on seasonal plants",
            nextSceneId: "garden-4h"
          }
        ]
      },
      "garden-4a": {
        id: "garden-4a",
        content: "You successfully grow your own rainbow flower. The club makes you their expert on temperature-sensitive plants, and your flower becomes the centerpiece of their next exhibition.",
        isEnding: true
      },
      "garden-4b": {
        id: "garden-4b",
        content: "Your research reveals these flowers are from a remote valley. The club uses your findings to create a special climate-controlled section in the greenhouse.",
        isEnding: true
      },
      "garden-4c": {
        id: "garden-4c",
        content: "The soil contains natural minerals that help plants thrive. You help the club develop new soil mixtures, making their plants healthier than ever.",
        isEnding: true
      },
      "garden-4d": {
        id: "garden-4d",
        content: "You master the art of plant hydration. Your watering schedule becomes the club's standard method, leading to unprecedented plant growth.",
        isEnding: true
      },
      "garden-4e": {
        id: "garden-4e",
        content: "The exhibition is a huge success. Your creative display ideas help the club win a grant to expand their greenhouse.",
        isEnding: true
      },
      "garden-4f": {
        id: "garden-4f",
        content: "You become an expert in rare plant care. The club puts you in charge of their most delicate specimens, which flourish under your attention.",
        isEnding: true
      },
      "garden-4g": {
        id: "garden-4g",
        content: "You create a beautiful nighttime garden with bioluminescent plants. It becomes a magical evening attraction for the whole school.",
        isEnding: true
      },
      "garden-4h": {
        id: "garden-4h",
        content: "Your work with seasonal plants leads to a year-round rainbow garden. Each season brings new colors and attracts rare butterflies.",
        isEnding: true
      }
    }
  }
];

// Stories for age 8 (Children)
const childrenStories: Story[] = [
  {
    id: createStoryId(8, 1),
    title: "The Friendly Dragon's Dilemma",
    description: "Help a dragon learn to make friends without scaring anyone",
    ageRange: { min: 6, max: 9 },
    coverImage: "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f",
    firstSceneId: "dragon-1",
    tags: ["fantasy", "friendship", "dragons"],
    scenes: {
      "dragon-1": {
        id: "dragon-1",
        content: "You meet a small dragon hiding behind your school. He wants to make friends, but everyone runs away when they see him.",
        choices: [
          {
            id: "d1-choice1",
            text: "Help him make a friendly sign",
            nextSceneId: "dragon-2a"
          },
          {
            id: "d1-choice2",
            text: "Teach him to play games",
            nextSceneId: "dragon-2b"
          }
        ]
      },
      "dragon-2a": {
        id: "dragon-2a",
        content: "Together, you create a colorful sign that says 'Friendly Dragon - Just Wants to Play!' Some students stop to read it, looking curious.",
        choices: [
          {
            id: "d2a-choice1",
            text: "Add drawings to the sign",
            nextSceneId: "dragon-3a"
          },
          {
            id: "d2a-choice2",
            text: "Have the dragon wave to people",
            nextSceneId: "dragon-3b"
          }
        ]
      },
      "dragon-2b": {
        id: "dragon-2b",
        content: "You show the dragon how to play catch with a ball. He's very gentle and careful not to use his claws.",
        choices: [
          {
            id: "d2b-choice1",
            text: "Invite others to join the game",
            nextSceneId: "dragon-3c"
          },
          {
            id: "d2b-choice2",
            text: "Teach him more games",
            nextSceneId: "dragon-3d"
          }
        ]
      },
      "dragon-3a": {
        id: "dragon-3a",
        content: "You add cute drawings of the dragon playing with kids. A group of young students stops to admire the artwork.",
        choices: [
          {
            id: "d3a-choice1",
            text: "Let them help decorate",
            nextSceneId: "dragon-4a"
          },
          {
            id: "d3a-choice2",
            text: "Show them the real dragon",
            nextSceneId: "dragon-4b"
          }
        ]
      },
      "dragon-3b": {
        id: "dragon-3b",
        content: "The dragon practices his friendliest wave. His smile is a bit toothy, but his eyes are kind and gentle.",
        choices: [
          {
            id: "d3b-choice1",
            text: "Practice his greeting",
            nextSceneId: "dragon-4c"
          },
          {
            id: "d3b-choice2",
            text: "Show off his talents",
            nextSceneId: "dragon-4d"
          }
        ]
      },
      "dragon-3c": {
        id: "dragon-3c",
        content: "A few brave students join your game of catch. They're surprised at how fun it is to play with a dragon!",
        choices: [
          {
            id: "d3c-choice1",
            text: "Start a dragon sports club",
            nextSceneId: "dragon-4e"
          },
          {
            id: "d3c-choice2",
            text: "Plan a friendly tournament",
            nextSceneId: "dragon-4f"
          }
        ]
      },
      "dragon-3d": {
        id: "dragon-3d",
        content: "The dragon learns hide and seek, tag, and hopscotch. He's especially good at games that need counting.",
        choices: [
          {
            id: "d3d-choice1",
            text: "Make him a playground helper",
            nextSceneId: "dragon-4g"
          },
          {
            id: "d3d-choice2",
            text: "Create new dragon games",
            nextSceneId: "dragon-4h"
          }
        ]
      },
      "dragon-4a": {
        id: "dragon-4a",
        content: "The sign becomes a beautiful group art project. The dragon is so happy, his scales change color to match the cheerful drawings. He becomes the school's beloved art mascot.",
        isEnding: true
      },
      "dragon-4b": {
        id: "dragon-4b",
        content: "The students are amazed that the real dragon is even friendlier than his picture. They start a dragon art club where he poses for portraits and helps with fire-glazed pottery.",
        isEnding: true
      },
      "dragon-4c": {
        id: "dragon-4c",
        content: "The dragon masters saying 'Hello' without puffing smoke. He becomes the school's official greeter, welcoming everyone with a gentle wave and a warm smile.",
        isEnding: true
      },
      "dragon-4d": {
        id: "dragon-4d",
        content: "The dragon demonstrates his ability to light lanterns and warm up cold lunches. Everyone loves having a helpful dragon friend around the school.",
        isEnding: true
      },
      "dragon-4e": {
        id: "dragon-4e",
        content: "The Dragon Sports Club becomes the most popular after-school activity. The dragon teaches everyone about teamwork and having fun together.",
        isEnding: true
      },
      "dragon-4f": {
        id: "dragon-4f",
        content: "The friendly tournament is a huge success. The dragon makes sure everyone gets a chance to play and helps create special dragon-themed medals for all participants.",
        isEnding: true
      },
      "dragon-4g": {
        id: "dragon-4g",
        content: "As a playground helper, the dragon makes sure no one is left out. He's especially good at helping shy kids find friends and join in the fun.",
        isEnding: true
      },
      "dragon-4h": {
        id: "dragon-4h",
        content: "Your new dragon games become playground favorites. The most popular is 'Dragon Says,' where the dragon teaches kids fun ways to be kind and helpful.",
        isEnding: true
      }
    }
  }
];

export const stories = [
  ...youngAdultStories,
  ...teenStories,
  ...preteenStories,
  ...childrenStories
];