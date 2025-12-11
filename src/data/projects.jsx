export const projects = [
  {
    title: "SnapLearn",
    images: ["images/pic16.png", "images/pic17.png", "images/pic18.png"],
    details: [
      "Built an app with Next.js and Flask to take in a textbook uploaded by the user using PyMuPDF and the time they plan to study every day, and regenerate the topics the textbook covered into a curriculum that fits the user's schedule using NLP techniques.",
      "Designed a Python algorithm that takes in any variety of topics, and uses NLP techniques, as well as cosine similarity search, to determine their dependency relationship in learning, and creates a directed acyclic graph.",
      "Trained a small-sized language model to estimate the time needed for an average person to study a certain topic with all pre-requisite knowledge acquired.",
      "Developed a greedy algorithm to fit the course content into the user's schedule, while also balancing it with practice sessions. Then used an LLM to generate the course content with the specified length.",
      "Used Auth0 to implement storage of user login and authorization, and used PostgreSQL to store user data, including progress, course information, etc.",
      "Used Docker to containerize the entire application for easy deployment.",
      '<a href="https://github.com/plane-paper/SnapLearn" class="text-blue-300 hover:text-blue-200 underline">Click me for GitHub link</a>' 
    ]
  },
  {
    title: "QuickSilver",
    images: ["images/pic12.jpg", "images/pic19.jpg"],
    details: [
      "Built a broadcaster that sends the IP address, name, OS, MAC, and broadcast time in JSON format to every machine in the LAN, and a receiver that listens for all broadcasts on the LAN and organizes the information received based on OS types before returning it to the user.",
      "Built a file sending and receiving system via a TCP connection that allows the user to freely choose the target device (any broadcasting device in the LAN) and target file on the sender end, and a system to validate the file on the receiver end.",
      "Developed an alternative system via Bluetooth to accommodate situations without internet connection that sends and receives files via an RFCOMM port, and retains the same functionalities as the TCP system.",
      "Developed several mechanisms to prevent users from misusing the product, including simple malware detection, encryption, etc.",
      "Designed & built an UI with Tkinter that allows more user-friendly interactions.",
      "Ensured the scalability of the project by maintaining its compatibility and minimizing its dependencies, while also ensuring its decentralized nature, such as that with the broadcaster.",
      '<a href="https://github.com/plane-paper/Quicksilver" class="text-blue-300 hover:text-blue-200 underline">Click me for GitHub link</a>'
    ]
  },
  {
    title: "KnowledgeHunt",
    images: ["images/pic15.jpg"],
    details: [
      "Developed a Python-based NLP algorithm that selects relevant PDF pages based on keywords inputted by users, specifically by vectorizing the PDFs and keywords, then computing their cosine similarity",
      "Designed a UI with Tkinter that allows users to select the question bank to source the PDFs from, and the topics to focus on, thus creating an automatic question bank build tool for any educational system.",
      "Built an alternative seeking algorithm independent of NLP to ensure that the functionalities could remain if the NLP algorithm fails.",
      "Included a status report to ensure that the user is properly informed of the functionality of the application.",
      "Created a default question bank for the International Baccalaureate system and donated the resulting curated software to Vision Academy Ltd., a tutoring organization with over 10,000 students.",
      '<a href="https://github.com/plane-paper/KnowledgeHunt" class="text-blue-300 hover:text-blue-200 underline">Click me for GitHub link</a>'
    ]
  },
  {
    title: "Cat Feeder",
    images: ["images/pic02.jpg"],
    details: [
      "Designed & 3D printed the cat feeder as pictured above.",
      "Used OpenCV Python and ImUtils to program a motion capture mechanism based on the camera integrated within the Raspberry Pi set by counting contours.",
      "Used Tensorflow to train an AI based on over 10,000 images to distinguish cats within the captured frame once motion is detected, which then controls the DC servo motor that dispenses food.",
      "Designed a door mechanism that covers the top of the feeder to allow easy refilling of food.",
      "Wrote a clear README document to allow the average person to program and build the catfeeder with adequate supplies.",
      '<a href="https://github.com/plane-paper/Catfeeder" class="text-blue-300 hover:text-blue-200 underline">Click me for Github link</a>'
    ]
  },
  {
    title: "WatIsLife",
    images: ["images/pic13.jpg"],
    details: [
      "Developed a web API that records the user's speech and uses Google Speech Module to count how many times a certain phrase was said and stores the count in a database.",
      "Built a simple React front-end that displays a leaderboard for all users based on the number of times the phrase has been said.",
      "Collaborated with a friend to build an OAuth system that allows users to login and logout of accounts freely.",
      "Built a Discord bot using the Discord API to achieve the same functionalities, with a few built-in commands to ensure that it is user-friendly.",
      '<a href="https://github.com/plane-paper/WatIsLife" class="text-blue-300 hover:text-blue-200 underline">Click me for API Github link</a>',
      '<a href="https://github.com/plane-paper/WatIsLife-Discord" class="text-blue-300 hover:text-blue-200 underline">Click me for Discord Bot GitHub link</a>'
    ]
  },
  {
    title: "Admission Database",
    images: ["images/pic04.jpg"],
    details: [
      "Built a database using PostgreSQL, Python, H5, PHP, and JS to store & access the admissions data of my highschool.",
      "Designed an UI, as well as a password system, for users accessing the database. Integrated a identification mechanism within the system to differentiate information displayed and accessible by the user based on the identity of the user.",
      "Improved the aesthetics and relevant features to be up to school standard and synchronized with various other systems over the course of a year.",
      "The database continues to serve the entire Rothesay Netherwood School."
    ]
  },
  {
    title: "Speech Recognition Glasses",
    images: ["images/pic05.jpg", "images/pic06.jpg"],
    details: [
      "Developed a Python and Arduino-based program based on the Google Speech Module that recognizes English speech and outputs it onto a LCD unit, which projects the display onto an anti-glare visor, achieving an AR-like effect.",
      "Improved the design of the 3D-printed glasses framework with the help of a friend to incorporate the electronic parts.",
      "Tested the product on patients with dysgraphia, who previously struggled to put words onto a page, and received positive feedback.",
      '<a href="https://github.com/plane-paper/speech-recog" class="text-blue-300 hover:text-blue-200 underline">Click me for GitHub link (speech recognition program only)</a>'
    ]
  },
  {
    title: "YourSweeper",
    images: ["images/pic14.jpg"],
    details: [
      "Built a screen detection algorithm that automatically seeks the Minesweeper window on screen by matching the grayscale screenshot with an existing template using OpenCV, then computing the grids using contour tracing.",
      "Developed a solver algorithm that automatically seeks safe squares to be clicked on by listing the status of the grids in a matrix, then analyzing it with NumPy, and finally makes guesses when no square is obviously safe.",
      "Automated the solver with PyAutoGUI to automatically click on the most desirable grids.",
      "Built a failsafe algorithm to output advanced logging and takes screenshots when failure occurs to simplify the debugging process.",
      '<a href="https://github.com/plane-paper/YourSweeper" class="text-blue-300 hover:text-blue-200 underline">Click me for GitHub link</a>'
    ]
  },
  {
    title: "The Red Sun",
    description: "A 2D game I developed individually in Python's library PyGame, in which the player must defeat the enemies and stop the sun from setting by using their power to turn back time.",
    images: ["images/pic07.jpg", "images/pic08.jpg", "images/pic09.jpg", "images/pic10.jpg"],
    details: [
      "Developed frame-checked character physics & movement control, automated enemy movements & attacks, and real-time projectile (dagger) physics.",
      "Included a unique method of battle & death penalty mechanism",
      "Included a variety of enemy types and increasing difficulty of battle as the player progresses through the game.",
      "Developed a rendering algorithm that allows the game's light rendering to change in colour & intensity as the sun sets in the background, which is a key mechanic of this game.",
      "Included dynamic background & foreground movement, as well as aesthetically pleasing component physics (such as the train carts).",
      "Conceptualized & Wrote a basic plot that adds to the interests of the player in the game.",
      "Collaborated with a friend to draw the graphics used in this game.",
      "...And many more features.",
      '<a href="https://github.com/plane-paper/The-red-sun" class="text-blue-300 hover:text-blue-200 underline">Click me for GitHub link</a>'
    ]
  },
  {
    title: "Soil Moisture Sensor",
    images: ["images/pic11.jpg"],
    video: "images/performance.mp4",
    details: [
      "Completed a thorough engineering design process, including drafting a proposal, assessing need, writing a design document, completing revisions, and performing an implementation demo of the soil humidity sensor module.",
      "Constructed a soil humidity module with 2 STM32 microcontrollers that inform the user whether a certain soil humidity is too low.",
      "Implemented communication using the UART protocol between the STM 32 to transmit the soil humidity data.",
      "Configured pins of the microcontrollers such that without using timer and PWM modules, a buzzer and 2 LEDs could be turned on and off according to the data received.",
      "Configured the analogue-to-digital converter in the STM 32 to convert the voltage detected by the capacitance soil moisture sensor to a percentage data, which is compared against a user-set threshold.",
      "Implemented, manually, in the sender module, a parity check by adding a parity bit at the end of the message, via the bit manipulation available in C++, without using the embedded parity function by STM.",
      "Implemented another function to decode the message and check for data corruption by checking for even parity in the receiver module.",
      "Without using IOC (STM32CubeMX) files in the STM32CubeIDE to generate code, manually initialized the microcontroller, UART peripherals, and configured pins by manually purely C coding, only possible through a robust understanding of microcontrollers.",
      "Understood the underlying concepts between powering and unpowering pins on microcontrollers, as well as how signal sending and receiving works between embedded electrical components and microcontrollers.",
      '<a href="https://github.com/lacser/ECE-198-Soil-Humidity-Project" class="text-blue-300 hover:text-blue-200 underline">Click me for GitHub link</a>'
    ]
  }
];