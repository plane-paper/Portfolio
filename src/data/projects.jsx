// Project shape (everything except title is optional):
// {
//   title, description,
//   tech:       ['Next.js', ...],
//   links:      [{ label, href }],
//   highlights: ['...'],                       // 1-3 skimmable lines
//   sections:   [{ heading, points: ['...'] }], // grouped details (use for 6+ bullets)
//   details:    ['...'],                       // flat list, used when there are no sections
//   images:     ['images/x.png'],
//   video:      'images/x.mp4',
// }

export const projects = [
  {
    title: "Reimburst",
    description:
      "A web service that automates expense reimbursement end to end: photograph a receipt, and it extracts the details, categorizes each item, and either routes the request for approval or generates a request you can send yourself.",
    images: ["images/pic20.png"],
    tech: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Azure"],
    links: [{ label: "GitHub", href: "https://github.com/plane-paper/Reimburst" }],
    highlights: [
      "Receipt photo to categorized expense in one flow",
      "OCR and LLM pipeline integrated asynchronously with human review",
      "Idempotent payouts and an append-only audit log for financial security",
    ],
    sections: [
      {
        heading: "Receipt processing",
        points: [
          "Extracts merchant, date, currency, total, tax, and every line item from receipt photos through a swappable cloud OCR provider. Images stay in object storage; only a key is stored in the database.",
          "An LLM constrained to a fixed expense taxonomy (structured output) categorizes each item, flags low-confidence ones for review, and writes a synopsis. Users edit the breakdown before submitting.",
          "FastAPI, Redis, and background workers run extraction, categorization, and synopsis as jobs that never block a request, with explicit pending, success, and retryable-error states in the UI.",
        ],
      },
      {
        heading: "Approval workflow and payouts",
        points: [
          "Reimbursements move through a state machine: draft, submitted, approved, paid, plus rejection. Key transitions send notifications and leave a human-readable audit trail.",
          "Role-based access for individuals, employees, approvers, and admins, with rules like no self-approval and a dedicated approver queue.",
          "Payout dispatch sits behind a swappable payroll provider interface, with CSV export for manual payroll and an Employment Hero integration.",
        ],
      },
      {
        heading: "Financial integrity",
        points: [
          "All money is stored as integer cents with explicit currency codes.",
          "A reconciliation check blocks submission when line items don't add up to the receipt total.",
          "Every state change is written to an immutable, append-only audit log.",
          "Payout processing is idempotent, so retries can never double-pay.",
        ],
      },
      {
        heading: "Individual mode and platform",
        points: [
          "Individual mode reuses the same pipeline: spending history, filterable reports with charts and CSV/PDF export, item selection across receipts, and an editable LLM-drafted email or document to send to an external payer.",
          "Installable PWA, usable end to end from a mobile browser.",
          "An OpenAPI contract generates the TypeScript client, keeping frontend and backend in sync inside a polyglot monorepo (pnpm, Turborepo, uv), with versioned Alembic migrations and CI.",
        ],
      },
    ],
  },

  {
    title: "SnapLearn",
    images: ["images/pic16.png", "images/pic17.png", "images/pic18.png"],
    tech: ["Next.js", "Flask", "PostgreSQL", "Auth0", "Docker", "PyMuPDF", "NLP"],
    links: [{ label: "GitHub", href: "https://github.com/plane-paper/SnapLearn" }],
    highlights: [
      "Turns an uploaded textbook into a study plan that fits your daily schedule",
      "Infers prerequisite relationships between topics with NLP and cosine similarity",
      "Small language model trained to estimate study time per topic",
    ],
    sections: [
      {
        heading: "Curriculum generation",
        points: [
          "Next.js and Flask app that takes a textbook uploaded by the user (parsed with PyMuPDF) and the time they plan to study each day, then regenerates the textbook's topics into a curriculum that fits their schedule using NLP.",
          "Python algorithm uses NLP and cosine similarity search to work out how any set of topics depends on each other, and builds a directed acyclic graph from the result.",
        ],
      },
      {
        heading: "Scheduling and content",
        points: [
          "Trained a small language model to estimate how long an average person needs to study a topic once all prerequisite knowledge is acquired.",
          "A greedy algorithm fits the course content into the user's schedule while balancing it with practice sessions. An LLM then generates the content at the specified length.",
        ],
      },
      {
        heading: "Accounts and deployment",
        points: [
          "Auth0 handles login and authorization, and PostgreSQL stores user data including progress and course information.",
          "Docker containerizes the entire application for easy deployment.",
        ],
      },
    ],
  },

  {
    title: "QuickSilver",
    images: ["images/pic12.jpg", "images/pic19.jpg"],
    tech: ["Python", "Tkinter", "TCP", "Bluetooth (RFCOMM)"],
    links: [{ label: "GitHub", href: "https://github.com/plane-paper/Quicksilver" }],
    highlights: [
      "Discovers every device on the LAN and sends files between them",
      "Bluetooth fallback for when there's no internet connection",
      "Decentralized, with minimal dependencies",
    ],
    sections: [
      {
        heading: "Discovery and file transfer",
        points: [
          "A broadcaster sends its IP address, name, OS, MAC, and broadcast time as JSON to every machine on the LAN. A receiver listens for all broadcasts and organizes them by OS before returning them to the user.",
          "TCP file transfer lets the sender freely choose any broadcasting device and any file, and the receiver validates the file.",
          "A Bluetooth alternative sends and receives files over an RFCOMM port for situations without internet, with the same functionality as the TCP system.",
        ],
      },
      {
        heading: "Safety and design",
        points: [
          "Several safeguards against misuse, including simple malware detection and encryption.",
          "A Tkinter UI for more user-friendly interaction.",
          "Built to scale: compatibility is maintained, dependencies are minimized, and the design stays decentralized, as with the broadcaster.",
        ],
      },
    ],
  },

  {
    title: "KnowledgeHunt",
    images: ["images/pic15.jpg"],
    tech: ["Python", "NLP", "Tkinter"],
    links: [{ label: "GitHub", href: "https://github.com/plane-paper/KnowledgeHunt" }],
    highlights: [
      "Donated to Vision Academy Ltd., a tutoring organization with over 10,000 students",
    ],
    details: [
      "Developed a Python NLP algorithm that selects relevant PDF pages based on user-entered keywords, by vectorizing the PDFs and keywords and computing their cosine similarity.",
      "Designed a Tkinter UI where users pick the question bank to source PDFs from and the topics to focus on, creating an automatic question bank build tool for any educational system.",
      "Built an alternative seeking algorithm independent of NLP, so the core functionality remains if the NLP algorithm fails.",
      "Included a status report so the user is always informed of how the application is functioning.",
      "Created a default question bank for the International Baccalaureate system and donated the finished software to Vision Academy Ltd.",
    ],
  },

  {
    title: "Cat Feeder",
    images: ["images/pic02.jpg"],
    tech: ["Python", "OpenCV", "TensorFlow", "Raspberry Pi", "3D printing"],
    links: [{ label: "GitHub", href: "https://github.com/plane-paper/Catfeeder" }],
    details: [
      "Designed and 3D printed the cat feeder as pictured above.",
      "Used OpenCV (Python) and ImUtils to program a motion capture mechanism on the Raspberry Pi's integrated camera by counting contours.",
      "Trained a TensorFlow model on over 10,000 images to distinguish cats within the captured frame once motion is detected, which then controls the DC servo motor that dispenses food.",
      "Designed a door mechanism that covers the top of the feeder to allow easy refilling.",
      "Wrote a clear README so the average person can program and build the cat feeder with adequate supplies.",
    ],
  },

  {
    title: "WatIsLife",
    images: ["images/pic13.jpg"],
    tech: ["Google Speech", "React", "OAuth", "Discord API"],
    links: [
      { label: "API on GitHub", href: "https://github.com/plane-paper/WatIsLife" },
      { label: "Discord bot on GitHub", href: "https://github.com/plane-paper/WatIsLife-Discord" },
    ],
    details: [
      "Developed a web API that records the user's speech, uses the Google Speech module to count how many times a certain phrase was said, and stores the count in a database.",
      "Built a simple React front end that displays a leaderboard of all users by the number of times the phrase has been said.",
      "Collaborated with a friend to build an OAuth system that lets users log in and out of accounts freely.",
      "Built a Discord bot using the Discord API to offer the same functionality, with a few built-in commands to keep it user-friendly.",
    ],
  },

  {
    title: "Admission Database",
    images: ["images/pic04.jpg"],
    tech: ["PostgreSQL", "Python", "HTML5", "PHP", "JavaScript"],
    highlights: [
      "Still serves the entire Rothesay Netherwood School",
    ],
    details: [
      "Built a database using PostgreSQL, Python, HTML5, PHP, and JS to store and access my high school's admissions data.",
      "Designed a UI and a password system for users accessing the database, with an identification mechanism that changes the information displayed and accessible based on who the user is.",
      "Improved the aesthetics and features over the course of a year to meet school standards and synchronize with various other school systems.",
    ],
  },

  {
    title: "Speech Recognition Glasses",
    images: ["images/pic05.jpg", "images/pic06.jpg"],
    tech: ["Python", "Arduino", "Google Speech", "3D printing"],
    links: [
      {
        label: "GitHub (speech recognition program only)",
        href: "https://github.com/plane-paper/speech-recog",
      },
    ],
    highlights: [
      "Tested with patients with dysgraphia and received positive feedback",
    ],
    details: [
      "Developed a Python and Arduino program, based on the Google Speech module, that recognizes English speech and outputs it onto an LCD unit, which projects the display onto an anti-glare visor for an AR-like effect.",
      "Improved the design of the 3D-printed glasses frame, with a friend's help, to incorporate the electronic parts.",
      "Tested the product on patients with dysgraphia, who previously struggled to put words onto a page, and received positive feedback.",
    ],
  },

  {
    title: "YourSweeper",
    images: ["images/pic14.jpg"],
    tech: ["Python", "OpenCV", "NumPy", "PyAutoGUI"],
    links: [{ label: "GitHub", href: "https://github.com/plane-paper/YourSweeper" }],
    details: [
      "Built a screen detection algorithm that finds the Minesweeper window by matching a grayscale screenshot against a template with OpenCV, then computes the grid using contour tracing.",
      "Developed a solver that records the grid's status in a matrix, analyzes it with NumPy to find safe squares, and makes guesses when no square is obviously safe.",
      "Automated the solver with PyAutoGUI to click the most desirable squares.",
      "Built a failsafe that outputs detailed logs and takes screenshots on failure to simplify debugging.",
    ],
  },

  {
    title: "The Red Sun",
    description:
      "A 2D game I developed individually in Python's library PyGame, in which the player must defeat the enemies and stop the sun from setting by using their power to turn back time.",
    images: ["images/pic07.jpg", "images/pic08.jpg", "images/pic09.jpg", "images/pic10.jpg"],
    tech: ["Python", "Pygame"],
    links: [{ label: "GitHub", href: "https://github.com/plane-paper/The-red-sun" }],
    highlights: [
      "Lighting shifts in color and intensity as the sun sets, driving the core mechanic",
      "Multiple enemy types, with difficulty rising as you progress",
      "Custom physics for characters, daggers, and train carts",
    ],
    sections: [
      {
        heading: "Gameplay systems",
        points: [
          "Frame-checked character physics and movement control, automated enemy movement and attacks, and real-time projectile (dagger) physics.",
          "A unique method of battle and a death penalty mechanic.",
          "A variety of enemy types, with battles getting harder as the player progresses through the game.",
        ],
      },
      {
        heading: "Visuals",
        points: [
          "A rendering algorithm changes the game's lighting in color and intensity as the sun sets in the background, which is a key mechanic.",
          "Dynamic background and foreground movement, plus polished component physics such as the train carts.",
          "Graphics drawn in collaboration with a friend.",
        ],
      },
      {
        heading: "Story and extras",
        points: [
          "Conceptualized and wrote a basic plot to keep players interested in the game.",
          "...And many more features.",
        ],
      },
    ],
  },

  {
    title: "Soil Moisture Sensor",
    images: ["images/pic11.jpg"],
    video: "images/performance.mp4",
    tech: ["C/C++", "STM32", "STM32CubeIDE", "UART", "ADC"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/lacser/ECE-198-Soil-Humidity-Project",
      },
    ],
    highlights: [
      "Two STM32 boards communicate over UART to flag soil that's too dry",
      "Parity check implemented by hand with bit manipulation",
      "Microcontroller and peripherals initialized manually, without CubeMX-generated code",
    ],
    sections: [
      {
        heading: "Design and hardware",
        points: [
          "Completed a full engineering design process: drafting a proposal, assessing need, writing a design document, completing revisions, and giving an implementation demo.",
          "Constructed a soil humidity module with 2 STM32 microcontrollers that tell the user when soil humidity is too low.",
          "Configured the analog-to-digital converter to turn the capacitive soil moisture sensor's voltage into a percentage, which is compared against a user-set threshold.",
          "Configured pins so a buzzer and 2 LEDs switch on and off based on the received data, without using timer or PWM modules.",
        ],
      },
      {
        heading: "Communication and error checking",
        points: [
          "Implemented UART communication between the two STM32 boards to transmit the soil humidity data.",
          "In the sender module, manually added a parity bit to the end of each message using C++ bit manipulation, instead of STM's embedded parity function.",
          "In the receiver module, wrote a function to decode the message and check for even parity to detect data corruption.",
        ],
      },
      {
        heading: "Low-level firmware",
        points: [
          "Skipped IOC (STM32CubeMX) code generation in STM32CubeIDE and manually initialized the microcontroller, UART peripherals, and pins in pure C, which required a solid understanding of microcontrollers.",
          "Understood the concepts behind powering and unpowering pins, and how signals are sent and received between embedded components and microcontrollers.",
        ],
      },
    ],
  },
];