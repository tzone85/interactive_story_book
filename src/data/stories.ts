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
        content: "Late one night in your university's physics lab, you discover an unusual device hidden behind old equipment. Its sleek design and pulsing blue light catch your attention. As you examine it closer, you notice it's covered in complex equations and diagrams you've never seen before.\n\nCurious, you press what appears to be the activation button. Suddenly, the room fills with shimmering light, and before you appear two distinct visions of the future. The first shows devastating scenes: rising sea levels, extreme weather events, and global unrest. Cities you recognize are in chaos, and the timeline suggests this will happen within the next year.\n\nBut the second vision tells a different story. You see the same cities thriving, with revolutionary clean energy technology powering everything. People seem prosperous and at peace. The contrast between these two potential futures is stark and unsettling.\n\nAs the visions fade, you realize you're holding what must be a quantum viewing device, something that can peer into parallel timelines. The weight of this discovery settles on your shoulders - you now have knowledge that could change the course of history.",
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
        content: "The catastrophic timeline weighs heavily on your mind. You spend the next few days analyzing the visions, taking detailed notes of every detail you can remember. The patterns become clear: a series of interconnected events will trigger a cascade of environmental and social disasters.\n\nYou identify several key moments: a crucial environmental protection bill that fails to pass, a delayed renewable energy project, and a series of ignored warning signs about weather pattern changes. Each event seems minor on its own, but together they create the perfect storm.\n\nYour research also reveals something troubling - in the catastrophic timeline, those who tried to warn others were often dismissed as alarmists. The evidence was there, but it was ignored until it was too late. You realize that how you present this information could be just as important as the information itself.\n\nTime is ticking. You have the knowledge to potentially prevent this disaster, but you need to act carefully. Going public could make you a target of ridicule or worse, while working secretly might limit your influence.",
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
        content: "You focus on understanding the peaceful future, replaying the vision in your mind. The transformation seems to hinge on a breakthrough at the Morrison Institute for Advanced Research - a facility just across town. In your vision, you saw their main laboratory filled with unique equipment, researchers celebrating, and what looked like a revolutionary energy prototype.\n\nDigging deeper into the vision, you notice more details. The date on a wall calendar shows the discovery happens just three months from now. You recognize some of the researchers, including Dr. Sarah Chen, whose recent papers on quantum field theory have been making waves in the scientific community.\n\nWhat's most intriguing is how this discovery spreads. Unlike many scientific breakthroughs that take years to implement, this one seems to catalyze immediate change. Within months, cities begin adopting the technology, leading to a rapid transformation in how society produces and uses energy.\n\nYou have a choice to make. The Morrison Institute is known for its strict security, but as a physics student, you might be able to find a way in. Alternatively, your research skills could help you understand the theoretical groundwork that leads to this discovery.",
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
        content: "After careful preparation, you schedule a meeting with the city's emergency management director. You bring detailed documentation: weather pattern analyses, infrastructure vulnerability assessments, and economic impact projections. The director, Dr. Martinez, listens with growing concern as you lay out the evidence.\n\nInitially skeptical, her attitude shifts when you accurately predict a series of minor but unusual weather events. Your knowledge of specific details - which buildings would be most affected, which neighborhoods would face the greatest risks - adds credibility to your warnings.\n\nOver the next few weeks, you become a regular visitor to the emergency management office. Your predictions continue to prove accurate, and a small team begins to form around you. Some focus on immediate preparation, while others look at longer-term public awareness strategies.\n\nHowever, you notice a divide forming in the team. The emergency response specialists want to focus on practical preparation - stockpiling supplies, reinforcing infrastructure, and creating evacuation plans. Meanwhile, the communications team argues that without public support, any preparation efforts will be insufficient. They believe educating the public about the coming dangers is crucial.\n\nYou realize you can't effectively lead both efforts simultaneously. You need to choose where to focus your energy.",
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
        content: "You begin a careful campaign of indirect influence. Using your university credentials, you access academic databases and begin corresponding with researchers whose work could help prevent the coming disaster. You share specific suggestions disguised as theoretical questions, pointing them toward crucial areas of research.\n\nYour efforts start bearing fruit. Dr. Yuki Tanaka, a leading climate scientist, incorporates your suggestions into her latest research model. Professor Chen at the Morrison Institute begins investigating the energy storage solutions you hinted at. Each small nudge brings the scientific community closer to the breakthroughs needed to prevent catastrophe.\n\nLate one night, Dr. Tanaka sends you an unexpected email. She's noticed patterns in your questions - patterns that suggest you have access to information that shouldn't be possible. She doesn't accuse you directly but offers to meet privately to discuss your 'interesting theoretical framework.'\n\nYou realize you're at a crossroads. Dr. Tanaka's reputation and influence could accelerate the necessary changes, but sharing the quantum device would mean revealing its existence to the scientific community. Alternatively, you could continue your anonymous work, carefully guiding research from the shadows.",
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
        content: "You manage to get an internship at the Morrison Institute through your university connections. On your first day, you find yourself in Dr. Chen's laboratory, surrounded by cutting-edge equipment and complex experimental setups. The atmosphere is tense - the team has been working long hours on a promising energy storage breakthrough, but something isn't quite working.\n\nDr. Chen is exactly as you saw in your vision - brilliant, determined, but currently frustrated. You notice she's using an innovative approach to quantum field manipulation, but their containment field keeps destabilizing at crucial moments. From your vision, you know this is the exact problem they eventually solve, leading to the revolutionary breakthrough.\n\nWatching the team work, you spot subtle details you recognized from the successful timeline: the specific arrangement of the quantum stabilizers, the unique frequency patterns they'll eventually discover. You also notice Dr. Chen's openness to new ideas, especially from younger team members.\n\nYou have two possible approaches: You could offer to help with the technical aspects of the research, using your physics background and subtle hints from your vision to guide the work. Or you could take a bold step and share your knowledge of the future, hoping Dr. Chen's scientific mindset will lead her to believe you.",
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
        content: "You immerse yourself in research, spending countless hours in the university library and online databases. The pieces start coming together: the breakthrough isn't just about energy storage - it's about the unexpected intersection of quantum computing and energy systems.\n\nYou discover that Dr. Chen's team will accidentally stumble upon their breakthrough while trying to solve a quantum computing stability problem. The same principles that make quantum computers work could be applied to energy storage and distribution, but no one has made the connection yet.\n\nLate one night, cross-referencing papers from both fields, you find something fascinating. The quantum computing team at the university's Computer Science department is working on exactly the type of stability problem that will lead to Dr. Chen's breakthrough. They're approaching it from a completely different angle, but their research contains crucial pieces of the puzzle.\n\nYou realize you could either dive deep into the quantum computing angle, potentially accelerating their stability research, or work on building bridges between the two fields, helping researchers see the bigger picture that you glimpsed in your vision.",
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
        content: "You channel your knowledge into a compelling public awareness campaign. Working with environmental groups, community organizations, and social media influencers, you craft messages that strike the perfect balance between urgency and hope.\n\nYour predictions about local weather patterns and infrastructure vulnerabilities add credibility to the campaign. When you suggest specific community preparations, people listen. Neighborhood groups form to implement your suggestions, creating a network of prepared communities.\n\nThe movement grows beyond anything you could have imagined. Schools adopt your preparedness curriculum. Cities compete to meet readiness metrics you helped develop. International organizations take notice, and your local initiatives become a global model.\n\nWhen the challenging times arrive, communities are not just prepared - they're united. The spirit of cooperation you fostered proves as valuable as the physical preparations. Instead of panic, there's purpose. Instead of chaos, there's coordination.\n\nYears later, you're invited to speak at the United Nations about the grassroots resilience movement you helped create. Looking out at the delegates, you realize you didn't just help prevent a disaster - you helped change how humanity faces challenges.",
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
        content: "It starts during lunch break when your phone buzzes with notifications from the school's social network. The usually quiet feed is suddenly flooded with bizarre posts. The chess club is sharing advanced calculus problems, the art club is posting about network protocols, and the drama club is discussing quantum physics.\n\nYour best friend Alex, who runs the school's social media team, looks worried. 'These aren't just random posts,' she says, showing you her admin dashboard. 'They're appearing at exact intervals, and they're somehow connected to each student's interests, but... wrong. Like someone or something is mixing up all our data.'\n\nAs you scroll through the feed, you notice more oddities. Posts are appearing simultaneously from different locations in the school. Some messages reference private conversations that happened just minutes ago. The coding club's page is filled with poetry, while the literature club is sharing programming tutorials.\n\nStudents are forming groups in the cafeteria, theories flying. 'It has to be a hack,' says one of the tech-savvy seniors. 'No way,' argues another, 'this is too elaborate - it's got to be some kind of senior prank.' But something about this feels different, more systematic than a typical hack or prank.",
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
        content: "The computer lab is quiet when you enter, most students still at lunch. As you walk past the rows of monitors, something catches your eye - a faint blue glow from a screen in the back corner. While other computers display the standard school screensaver, this one is alive with activity.\n\nMoving closer, you see windows of code scrolling automatically, too fast to read. The main screen shows what looks like a sophisticated programming interface you've never seen before. Multiple chat windows are minimized in the taskbar, each connecting to different school club channels.\n\nWhat's most intriguing is a visualization panel showing a complex web of connections. Tiny dots of light - each labeled with a student's name - pulse and connect with others in intricate patterns. Lines of data flow between the dots, creating an ever-shifting network map of the school's social interactions.\n\nAs you watch, new code appears in one window while simultaneously, a post appears on the school's social network. The timing can't be coincidental. This computer isn't just running unusual programs - it's actively generating and coordinating the strange messages.",
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
        content: "The social media team's headquarters - really just a corner of the journalism classroom - is buzzing with activity. Alex and her team are huddled around a computer, scrolling through admin logs with increasingly worried expressions.\n\n'Look at this,' Alex says, pointing to the screen. The login history shows dozens of access attempts from unfamiliar IP addresses, all between 2 AM and 4 AM. 'Nobody should be posting at these hours, but the system shows active sessions.'\n\nJenny, the team's security expert, pulls up another screen. 'The weird thing is, these IPs? They're all from within the school network. But they're bouncing around - one minute it's from the library, next it's the science lab, then the gym. It's like whatever this is, it's moving through the school's network like... like it's exploring.'\n\nAs you watch, a new post appears on the main feed. Instantly, Jenny pulls up the access log. 'There! Room 234... but that's impossible, that classroom's been empty all semester for renovations.' The team looks at each other, the mystery deepening.",
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
        content: "Armed with Jenny's network tracking software, you begin mapping the mysterious IP addresses. Each one leads back to the school's network, but the path is anything but straightforward. The signal seems to dance through the building's infrastructure, leaving a complex trail of digital breadcrumbs.\n\nUsing the school's floor plan, you start marking each IP location. The pattern is fascinating - the signal moves in a specific sequence, never using the same route twice, but always following some kind of internal logic. It's as if whatever is causing this knows the school's network layout intimately.\n\nJenny points out something else interesting: 'See how it always passes through the main server room first? And look at these timestamps - there's a precise 2.7-second gap between each hop. This isn't random. This is programmed.'\n\nAs you dig deeper, you discover that each classroom in the sequence has something in common - they've all had recent technology upgrades as part of the school's new STEM initiative. The latest network switches, upgraded Wi-Fi access points, new smart boards - all connected to the central system.",
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
        content: "With the social media team's help, you begin analyzing the content and timing of every unusual post. Alex creates a spreadsheet, and patterns quickly emerge. The posts aren't just random - they follow the school's activity schedule, with an interesting twist.\n\nThe heaviest activity coincides perfectly with the robotics club's meeting times. Every Wednesday and Friday, 3:30 to 5:00 PM, the strange posts spike. But it's more than that - the posts seem to reflect whatever the robotics club is working on, albeit in an unusual way.\n\nWhen the club was working on servo motors, the posts were all about rhythm and movement, but applied to unexpected subjects - dance club members discussing motor precision, band kids posting about mechanical harmonics. During their AI week, the posts explored consciousness and learning, but through art and literature.\n\n'Look at this correlation,' Alex says, pulling up a chart. 'The posts aren't just matching their schedule - they're evolving with their project phases. It's like whatever's doing this is learning from the robotics club's activities, but... interpreting them through every other subject in school.'",
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
        content: "After carefully studying the program's structure, you find a way to safely shut it down. The mysterious posts cease immediately, and the school's social network returns to normal. The next morning, you're called to the principal's office.\n\nThere you meet Jamie, a quiet sophomore from the programming club, nervously clutching a laptop. 'It was supposed to be a small experiment,' they explain, voice barely above a whisper. 'I was trying to create a program that could help students connect across different interests. It worked at first - just making simple connections, suggesting study partners.'\n\nBut the program had grown beyond its original design. Each interaction taught it more about how students communicated, leading it to make increasingly complex - and sometimes confusing - connections between different subjects and clubs.\n\nInstead of punishment, the principal suggests turning this into a learning opportunity. Jamie's programming skills, properly directed, could actually benefit the school. Together with the computer science teacher, you help Jamie redesign the program into a legitimate club collaboration tool, this time with proper oversight and safety measures.\n\nBy the end of the semester, Jamie's project becomes a positive addition to the school's technology program, helping students find study groups and project partners across different subjects - just as originally intended, but now in a controlled and helpful way.",
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
        content: "Setting up the trace takes hours of careful preparation with Jenny's help. You create a virtual map of the school's network, placing digital 'sensors' at key points. When the next login occurs, you'll be ready to track it in real-time.\n\nThe trace leads you to an unexpected place - the advanced computer science classroom after hours. There you find a group of junior and senior students, surrounded by network equipment and laptops. They freeze when you enter, then break into relieved smiles.\n\n'Finally! Someone figured it out!' Their project leader, Sarah, explains that they've been developing a new kind of network routing system. 'We're trying to create a more efficient way to handle school network traffic. The weird posts were just test data, but we needed real accounts to properly test the system.'\n\nTheir project is actually brilliant - a dynamic routing system that adapts to network usage patterns, something that could revolutionize how school networks handle their daily digital traffic. With your help, they refine their testing methods to be less disruptive.\n\nTwo months later, their project wins first place at the state technology fair. The judges are particularly impressed by the real-world applications. Several tech companies express interest, and the school board approves a pilot program to implement their system across the district.",
        isEnding: true
      },
      "cyber-4f": {
        id: "cyber-4f",
        content: "The classroom pattern leads to the discovery of an innovative mesh network project. The students are recognized for their technical creativity.",
        isEnding: true
      },
      "cyber-4g": {
        id: "cyber-4g",
        content: "You arrive at the robotics club just as they're testing their latest project. The room is filled with excited chatter and the whir of machinery, but what catches your eye isn't a robot - it's a complex diagram on their whiteboard showing social network connections.\n\nThe team explains that they've been working on combining robotics principles with social media automation. Their project started as a simple bot to handle club announcements but evolved into something more ambitious: a system that could understand and connect different areas of study, just like how their robots integrate multiple systems to function.\n\n'We wanted to show how robotics concepts apply to everything,' explains Marcus, the club president. 'Like how servo motor control relates to music rhythm, or how sensor feedback is like environmental awareness in art. The posts were our way of demonstrating these connections.'\n\nExcited by the potential, you suggest a collaboration between the robotics and programming clubs. The two groups begin working together, combining the robotics team's innovative thinking with the programming club's technical expertise.\n\nThe result is remarkable: a new program that helps students see connections between different subjects, illustrated through both digital and physical demonstrations. The project becomes a permanent feature of the school's STEM program, breaking down barriers between technical and creative subjects in ways nobody expected.",
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
        content: "The note appears in your science notebook during class, though you're sure those pages were blank a moment ago. Written in shimmering green ink that seems to change shade like leaves in sunlight, it reads:\n\n'Dear Plant Friend,\n\nWe've noticed how you care for living things. The way you saved the withering classroom fern last week (water and kind words, in just the right measure) showed us you might be special. If you'd like to learn about plants that most people never see, come to the old greenhouse after school.\n\nP.S. - Bring gardening gloves if you have them. Some of our friendlier flowers can get a bit... enthusiastic with their greetings.'\n\nYou've passed the old greenhouse countless times, its glass panels frosted with age and mysterious vines curling around the frame. But today, something's different. Is that a rainbow-colored gleam behind the clouded glass? And why does the air smell like summer rain and wild strawberries, even though it's autumn?",
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
        content: "As you approach the greenhouse after school, the vines on its frame shift and part like a living curtain, revealing a door you've never noticed before. A girl with flowers woven into her braids steps out, smiling warmly.\n\n'I'm Rosa,' she says, her eyes twinkling. 'Welcome to the real Secret Garden Club!' She leads you not into the greenhouse, but behind it, where an archway of moonflowers glows with silver light. Beyond lies a garden that shouldn't be possible - it's far larger than the space behind the greenhouse should allow.\n\nStudents in earth-stained aprons tend to extraordinary plants: flowers that change color as they bloom, vines that dance to music only they can hear, and what looks like a miniature tree growing crystal fruit. In one corner, a group is carefully replanting what appears to be a young star-plant, its petals giving off a gentle constellation of light.\n\n'This is where we grow the impossible,' Rosa explains, gesturing to a patch of flowers whose blooms float above their stems like tiny hot air balloons. 'Every plant here has a story, and every gardener has a special talent. We think you might have one too.'",
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
        content: "You show the note to your best friend Lily during lunch. Her eyes sparkle with recognition, and she pulls back her sleeve to reveal a bracelet made of tiny, living flowers that change color with her mood - right now they're shifting from excited pink to happy yellow.\n\n'You got an invitation!' she whispers excitedly. 'I've been hoping they'd notice you. We're not just growing ordinary plants - we're nurturing species that most people think only exist in fairy tales. Remember last week when I helped predict the weather for the school picnic? That was thanks to our cloudbloom flowers. And those special paints the art club used for the mural? They came from our rainbow sage.'\n\nLily glances around before continuing, her voice dropping even lower. 'The greenhouse is just the entrance. The real garden exists in a special place - a pocket of magic where anything can grow. We have plants from hidden valleys, ancient forests, and some...' she grins mischievously, 'some might not even be from Earth at all.'\n\nShe touches her flower bracelet, which pulses with a gentle blue light. 'Want to know more? Or should we head there together after school? Rosa - our president - would be thrilled to have you join us.'",
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
        content: "'These are Prismatic Peonies,' Rosa explains, leading you to a bed of flowers whose petals ripple with ever-changing colors like living rainbows. 'They're distant cousins of regular peonies, but they developed in a valley where aurora lights touch the ground. The colors shift with temperature - they can predict weather three days in advance if you know how to read them.'\n\nShe gently touches one bloom, and its colors swirl in response. 'See this pattern of blue and gold? That means clear skies and sunshine coming this weekend. But it's more than just weather prediction - their petals can be used to make paints that never fade, and their nectar... well, let's just say it makes the most extraordinary honey you've ever tasted.'\n\nAnother student, Marco, approaches with a small pot. 'We've been growing some seedlings,' he says, showing you tiny sprouts that already shimmer with potential. 'They're tricky to start - they need moonlight for the first week, then dawn light for the second, and they have to be sung to every evening. But once they take root, they're quite hardy. Would you like to learn how to grow them?'",
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
        content: "Rosa hands you a pair of iridescent gloves and leads you to a potting station. The soil here isn't like anything you've seen before - it sparkles as if mixed with tiny stars, and when disturbed, it releases a scent like mint and morning dew.\n\n'This is Starlight Soil,' she explains, scooping up a handful. The sparkles dance between her fingers like falling constellations. 'We make it ourselves by combining regular soil with powdered moonstone and essence of meteor flowers. Each batch has to be mixed under the light of a different moon phase - this one was prepared during the last quarter moon, perfect for growing night-blooming varieties.'\n\nAs you help repot a young Whispering Willow (a miniature tree whose leaves murmur ancient secrets), you notice the other students using different watering cans for different plants. Some sprinkle what looks like liquid starlight, while others pour water that flows upward instead of down.\n\n'Every plant needs its own special care,' Rosa says, noticing your curiosity. 'Would you like to learn about our soil mixing techniques, or shall we start with the basics of magical watering?'",
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
        content: "Over the next few weeks, you dedicate yourself to nurturing your Prismatic Peony seedling. Following Marco's guidance, you create the perfect schedule: moonlight baths at midnight, dawn exposure at sunrise, and evening serenades where you sing softly to the tiny sprout. Other club members start gathering to hear your songs, saying they've never seen a seedling respond so enthusiastically to music.\n\nYour dedication pays off spectacularly. One morning, you arrive to find your plant has bloomed overnight, producing not just one but three perfect flowers, their petals shifting through colors you didn't even know existed. The rainbow patterns are more intricate than any the club has seen before, creating complex swirls that Rosa says indicate you have a special gift for weather magic.\n\n'Look at how the colors dance,' she exclaims, studying your flowers with wonder. 'They're not just predicting the weather - they're singing with it! I've only read about this in the ancient gardening texts. Your flowers aren't just growing, they're harmonizing with the very essence of the seasons.'\n\nYour success leads to a new project: creating a special weather-predicting garden section that combines your Prismatic Peonies with other meteorological plants. Together, they form a living forecast system that helps the school plan outdoor events with perfect accuracy.",
        isEnding: true
      },
      "garden-4b": {
        id: "garden-4b",
        content: "Your research reveals these flowers are from a remote valley. The club uses your findings to create a special climate-controlled section in the greenhouse.",
        isEnding: true
      },
      "garden-4c": {
        id: "garden-4c",
        content: "Rosa takes you under her wing, teaching you the intricate art of crafting Starlight Soil. Each ingredient must be gathered at precisely the right moment: moonstone collected during lunar eclipses, stardust from meteor showers, and essence from flowers that bloom only once a century.\n\nYou develop a particular talent for sensing which moon phase will best nourish different plants. Your first custom blend - a mixture of waning crescent moonstone, dawn dew, and crushed aurora crystals - proves perfect for growing Twilight Tulips, flowers that normally take years to bloom but flourish in your soil within weeks.\n\nWord spreads about your soil-crafting abilities. Soon, other magical gardening clubs from around the world are sending requests for your special blends. You create a detailed grimoire documenting your recipes, complete with pressed flower samples and soil crystals that shimmer with stored moonlight.\n\nYour greatest achievement comes when you develop a revolutionary soil blend that allows plants from completely different magical environments to grow side by side - desert-dwelling Sunfire Succulents happily sharing space with Arctic Frost Ferns. The garden becomes a living testament to your ability to bridge different magical ecosystems through the power of perfectly balanced soil.",
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
        content: "During recess, you hear quiet sniffling coming from behind the art room. Following the sound, you discover something extraordinary - a small dragon about the size of a puppy, with scales that shimmer like opals in the sunlight. He's huddled in a corner, tiny wisps of smoke curling from his nostrils as he tries to hold back tears.\n\nWhen he notices you, his eyes widen with hope, but he quickly curls his tail around himself protectively. 'Oh... hello,' he says in a voice that sounds like wind chimes. 'I... I don't suppose you want to run away screaming too?' He unfurls his wings slightly, showing patches of rainbow colors that remind you of soap bubbles.\n\n'I just wanted to make some art,' he continues, gesturing to a slightly singed sketchbook beside him. 'But when I tried to join the art club, everyone panicked. One student even fainted when I offered to share my special sparkly crayons.' He sighs, and a small puff of glitter-filled smoke forms a sad face in the air.\n\n'I thought school would be the perfect place to make friends,' he adds hopefully, 'Everyone here is learning new things, just like me. Plus, I've been practicing very hard not to accidentally set things on fire when I get excited.'",
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
        content: "The dragon's eyes light up at your suggestion. 'A sign? That's brilliant!' He carefully pulls out his art supplies - crayons that sparkle like starlight and markers that change color as you draw. 'I've been practicing my letters,' he says proudly, though you notice some of them are a bit wobbly and slightly smoking.\n\nTogether, you create a beautiful sign on special flame-proof paper. The dragon adds his own special touch - tiny puffs of colorful, sweet-smelling smoke that form friendly shapes around the letters. The final result reads 'Friendly Dragon - Just Wants to Play!' with dancing hearts and stars floating above it.\n\nAs you hold up the sign near the playground, something magical happens. The dragon's excitement makes the letters glow gently, like a warm sunset. A few students stop to read it, their eyes widening with curiosity instead of fear. One small girl even points at the floating smoke shapes and giggles.\n\n'They're not running away!' the dragon whispers excitedly, his tail wagging so hard it creates a small breeze. 'What should we do next? Should I try to look extra friendly? I've been practicing my smile - see?' He demonstrates, though his enthusiasm makes a few sparks fly from his teeth.",
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
        content: "'Games?' The dragon perks up immediately. 'Oh yes, please! I've watched everyone playing from my hiding spot, but I wasn't sure how to join in.' He rummages in his backpack and pulls out a collection of balls he's made himself - each one unique and magical. One glows softly, another floats slightly above the ground, and a third changes color when you touch it.\n\n'I made these during art class,' he explains proudly. 'The floating one is filled with happy-smoke, and the glowing one has a tiny piece of dragon-star inside. I was hoping... maybe someone would want to play with them?' He demonstrates by gently catching a ball with his claws retracted, being extra careful not to puncture it.\n\nYou show him how to play catch, and he's a quick learner. His natural agility makes him surprisingly good at it, though sometimes his excitement makes him hover a few inches off the ground. 'This is amazing!' he exclaims, doing a perfect catch. 'And look - I remembered not to use my claws or accidentally breathe fire in celebration!'\n\nHe's so focused on being gentle that his tongue sticks out slightly when he concentrates, making him look more adorable than scary. 'Do you think... do you think others might want to play too? I promise to be extra careful!'",
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
        content: "The dragon pulls out his special art supplies again, this time revealing magical chalk that creates moving pictures when you draw with it. 'I've been practicing drawing happy scenes,' he says, demonstrating by sketching a tiny version of himself playing jump rope - the chalk figure actually skips across the paper!\n\nTogether, you add more drawings to the sign: the dragon playing basketball (his chalk-self does a perfect slam dunk), having a picnic (complete with tiny animated sandwiches), and reading books in the library (where the chalk-dragon carefully turns pages with his claws). Each drawing comes to life with movement and sparkle, telling its own little story.\n\nA group of younger students notices the magical artwork and crowds around, fascinated. 'How does it move?' one asks. 'Look at the sparkles!' says another. 'That dragon looks so friendly,' a third points out, watching the chalk-dragon share his sandwich with chalk-students.\n\nThe real dragon, still hidden nearby, is practically vibrating with excitement. 'They like me!' he whispers, his happy smoke forming tiny hearts. 'Well, chalk-me, anyway. Do you think... do you think they might like real-me too?'",
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
        content: "'Okay, okay, I can do this!' The dragon stands in front of a puddle, using it as a mirror to practice his greeting. 'Too much teeth?' he asks, trying different smiles. 'Maybe if I tilt my head like this? Or should I wave with my wing instead of my claw?' Each time he gets nervous, tiny puffs of rainbow smoke escape from his nostrils, creating a cheerful halo around his head.\n\nHe tries different approaches: a royal bow (but his tail knocks over a flowerpot), a curtsy (his wings get tangled), and finally a simple, gentle wave combined with a warm smile that makes his scales shimmer with friendly colors. 'I've been practicing controlling my fire too,' he demonstrates, breathing out a tiny flame that forms the words 'Hello Friend' in the air before dissolving into sparkles.\n\nMore students have gathered to read the sign, and some are pointing at the beautiful sparkles floating nearby. 'Those are so pretty!' one girl exclaims. 'They look like fairy lights!' says another. The dragon beams with pride, though you notice he's trembling slightly with nerves.\n\n'They like my sparkles,' he whispers hopefully. 'Do you think... do you think it's time to show them who's making them?'",
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