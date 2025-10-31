import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Loading Screen Component
const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const fullText = 'Richard Su';
    
    const typeText = () => {
      if (!isDeleting) {
        // Typing phase
        if (charIndex < fullText.length) {
          setLoadingText(fullText.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 300);
        }
      } else {
        // Deleting phase
        if (loadingText.length > 0) {
          setLoadingText(prev => prev.substring(0, prev.length - 1));
        } else {
          // Complete
          setIsComplete(true);
          setCharIndex(fullText.length); // Ensure all characters are displayed immediately
        }
      }
    };

    // faster typing & deleting speeds
    const speed = isDeleting ? 60 : 40;
    const timer = setTimeout(typeText, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, loadingText]);

  if (isComplete) {
    // Transition to the main content immediately
    return <div className="fixed inset-0 bg-gray-900" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-light text-white uppercase tracking-wider">
          {loadingText}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    </motion.div>
  );
};

const Typewriter = ({ texts, period = 2000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentFullText = texts[currentIndex];
    const updateText = () => {
      if (isPaused) {
        setTimeout(() => setIsPaused(false), period);
        return;
      }

      if (isDeleting) {
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
        if (currentText === currentFullText) {
          setIsPaused(true);
          setIsDeleting(true);
        }
      }
    };

    const timeout = setTimeout(updateText, isDeleting ? 100 : 150);
    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused, texts, period]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Project Tile Component
const ProjectTile = ({ project, index, onProjectSelect, isCompact, isSelected = false }) => {
  const handleTileClick = () => {
    onProjectSelect(index);
  };

  if (isCompact) {
    return (
      <div 
        className={`w-16 h-16 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center mb-4 group ${
          isSelected 
            ? 'bg-white/30 border-2 border-white shadow-lg' 
            : 'bg-white/10 hover:bg-white/20'
        }`}
        onClick={handleTileClick}
      >
        <span className={`font-bold text-xl group-hover:scale-110 transition-transform ${
          isSelected ? 'text-white scale-110' : 'text-white'
        }`}>
          {project.title[0]}
        </span>
      </div>
    );
  }

  return (
    <div 
      className="bg-white/10 hover:bg-white/15 rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
      onClick={handleTileClick}
    >
      <h4 className="text-center py-4 m-0 text-white font-semibold uppercase tracking-wide text-lg">
        {project.title}
      </h4>
      
      {project.images && project.images.length > 0 && (
        <div className="w-full h-48 overflow-hidden rounded-lg mt-4">
          <img 
            src={project.images[0]} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>
      )}
      
      <p className="text-white/80 mt-4 text-center">
        Click to view details → 
      </p>
    </div>
  );
};

// Animation for sidebar and project content
const ProjectDetail = ({ project, onClose }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [project]);

  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.muted = false;
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Extract GitHub link from project details
  const getGitHubLink = () => {
    const githubDetail = project.details.find(detail => 
      detail.includes('github.com') && detail.includes('<a href=')
    );
    if (githubDetail) {
      const match = githubDetail.match(/href="([^"]*github\.com[^"]*)"/);
      return match ? match[1] : null;
    }
    return null;
  };

  const githubLink = getGitHubLink();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }} // Changed from x: -100 to y: 100
      animate={{ opacity: 1, y: 0 }}   // Changed from x: 0 to y: 0
      exit={{ opacity: 0, y: -100 }}   // Changed from x: 100 to y: -100
      transition={{ duration: 0.5 }}
      className={`h-full p-8 overflow-y-auto no-scrollbar ${isVisible ? 'fade-in' : ''}`}
    >
      <div className="h-full p-8 overflow-y-auto no-scrollbar">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {githubLink ? (
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl font-bold text-white uppercase tracking-wide hover:text-blue-300 transition-colors"
            >
              {project.title}
            </a>
          ) : (
            <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
              {project.title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {project.description && (
          <div className="mb-6">
            <p className="text-white/90 text-lg leading-relaxed">{project.description}</p>
          </div>
        )}
        
        {project.images && project.images.map((image, index) => (
          <div key={index} className="mb-8">
            <img 
              src={image} 
              alt={`${project.title} ${index + 1}`} 
              className="w-full rounded-lg shadow-2xl" 
            />
          </div>
        ))}
        
        <div className="bg-white/5 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-4 uppercase tracking-wide">
            Project Details
          </h3>
          <ul className="space-y-3">
            {project.details.map((detail, index) => (
              <li key={index} className="text-white/90 leading-relaxed flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span dangerouslySetInnerHTML={{ __html: detail }} />
              </li>
            ))}
          </ul>
        </div>
        
        {project.video && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 uppercase tracking-wide">
              Demo Video
            </h3>
            <video 
              ref={videoRef}
              controls
              className="w-full rounded-lg shadow-2xl cursor-pointer"
              onClick={handleVideoClick}
            >
              <source src={project.video} type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>
        )}
      </div>
    </div>
    </motion.div>
  );
};


// Main Portfolio Component
const Portfolio = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isArticleVisible, setIsArticleVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visitorCount, setVisitorCount] = useState(0);

  // Project navigation helpers
  const [searchQuery, setSearchQuery] = useState('');
  const [alphaFilter, setAlphaFilter] = useState('All');


  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400); // Reduced from 5000 to 4000

    return () => clearTimeout(timer);
  }, []);

  // Visitor count effect
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('visitorDate');
    const storedCount = localStorage.getItem('visitorCount');

    let randomCount;
    if (storedDate === today) {
      randomCount = storedCount ? parseInt(storedCount) : Math.floor(Math.random() * 1000) + 500;
    } else {
      randomCount = storedCount ? Math.max(parseInt(storedCount) + 1, Math.floor(Math.random() * 1000) + 500) : Math.floor(Math.random() * 1000) + 500;
      localStorage.setItem('visitorDate', today);
    }

    setVisitorCount(randomCount);
    localStorage.setItem('visitorCount', randomCount);
  }, []);

  // Project data
  const projects = [
    {
      title: "SnapLearn",
      images: ["images/pic16.png", "images/pic17.png", "images/pic18.png"],
      details: [
        "Built an app with Next.js and Flask to take in a textbook uploaded by the user using PyMuPDF and the time they plan t  study every day, and regenerate the topics the textbook covered into a curriculum that fits the user's schedule using NLP techniques.",
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

  const alphabet = ['All', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  const filteredProjects = projects
    .filter(p => {
      const q = searchQuery.trim().toLowerCase();
      if (alphaFilter !== 'All' && p.title[0].toUpperCase() !== alphaFilter) return false;
      if (!q) return true;
      const hay = (p.title + ' ' + (p.details || []).join(' ')).toLowerCase();
      return hay.includes(q);
    });

  // Main screen navigation (with animation)
  const handleMainNavClick = (view) => {
    setIsTransitioning(true);
    
    setCurrentView(view);
    setIsArticleVisible(true);
    setIsTransitioning(true);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Top navigation (simple fade transition)
  const handleTopNavClick = (view) => {
    if (view === currentView) return;
    
    setCurrentView(view);
    setSelectedProject(null);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setIsArticleVisible(false);
    setCurrentView('home');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape' && isArticleVisible) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isArticleVisible]);

  const renderArticleContent = () => {
    switch (currentView) {
      case 'intro':
        return (
          <div className="pb-7"> {/* Added padding at the bottom */}
            <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
              Intro
            </h2>
            <div className="space-y-4 text-white/90 leading-relaxed">
              <p>I am a passionate full-stack and software developer with ample work experience entering the world of Electrical & Computer Engineering at the University of Waterloo.</p>
              <p>I have completed various projects in the past, as big as single-handedly building a core product for Lynkr Inc. (an AI startup) that fetched over 100,000 CAD in revenue and over 3,000 waitlist customers, and as small as designing and building a 3D printed AI cat feeder with integrated machine imaging, or a brainrot translator that helps parents understand their kids.</p> 
              <p>I speak English, Mandarin, and French fluently, and I have a multicultural background, being raised in two countries in my childhood. I am also fluent with most developer tools, most major languages, many modules, and many frameworks.</p>
              <p>I also love to play chess, enjoy various video games, write, or read a nice book. I am decent at cooking, and terrible at giving myself haircuts despite my love for doing it.</p>
              <p>For professional contact, please reach me at my university email: <a href="mailto:r38su@uwaterloo.ca" className="text-blue-300 hover:text-blue-200 underline">r38su@uwaterloo.ca</a>, or my personal email: <a href="mailto:suruiquan10@163.com" className="text-blue-300 hover:text-blue-200 underline">suruiquan8@gmail.com</a>.</p>

              <figure className="mt-6 flex flex-col items-center">
          <img
            src="images/pic01.jpg"
            alt="A photo of me"
            className="w-[90%] md:w-[400px] h-auto rounded"
          />
          <figcaption className="text-sm text-white/60 mt-2 italic">
            The only time that I didn't cut my own hair and went to the barber in my whole life.
          </figcaption>
              </figure>
            </div>
          </div>
        );
      
      case 'work':
        if (selectedProject !== null) {
          return (
            <div className="flex h-full">
              <div className="w-24 bg-gray-900/50 backdrop-blur-sm border-r border-white/20 p-4 overflow-y-auto flex-shrink-0 overflow-x-hidden no-scrollbar">
                {projects.map((project, index) => (
                  <ProjectTile 
                    key={index} 
                    project={project} 
                    index={index}
                    onProjectSelect={setSelectedProject}
                    isCompact={true}
                    isSelected={selectedProject === index}
                  />
                ))}
              </div>
              
              <div className="flex-1 overflow-hidden">
                <ProjectDetail 
                  project={projects[selectedProject]} 
                  onClose={() => setSelectedProject(null)}
                />
              </div>
            </div>
          );
        }
        
        return (
          <div className="pb-7"> {/* Added padding at the bottom */}
            <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
              Projects
            </h2>

            {/* Search + Alphabet filter */}
            <div className="mb-6 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects or keywords..."
                  className="w-full md:w-2/3 px-4 py-3 bg-transparent border border-white rounded text-white placeholder-white/50 focus:outline-none"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setSearchQuery(''); setAlphaFilter('All'); }}
                    className="px-3 py-2 border border-white rounded text-white hover:bg-white/10"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setAlphaFilter(letter)}
                    className={`px-2 py-1 text-sm rounded ${
                      alphaFilter === letter ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtered projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.length === 0 ? (
                <div className="text-white/80">No projects match your search or filter.</div>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectTile
                    key={project.title}
                    project={project}
                    index={projects.indexOf(project)}
                    onProjectSelect={setSelectedProject}
                    isCompact={false}
                  />
                ))
              )}
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="pb-7"> {/* Added padding at the bottom */}
            <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
              Resume
            </h2>
            <div className="bg-white rounded-lg p-4 shadow-2xl">
              <iframe 
                src="Ruiquan_Richard_Su_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1" 
                className="w-full h-[600px] md:h-[800px] rounded"
                title="Richard Su Resume"
              />
            </div>
            <div className="mt-4 text-center">
              <a 
                href="Ruiquan_Richard_Su_Resume.pdf" 
                download
                className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors uppercase tracking-wide text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div>
            <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
              Contact
            </h2>
            <p className="text-white/90 mb-6">
              The following information will be sent to my email at{' '}
              <a href="mailto:r38su@uwaterloo.ca" className="text-blue-300 hover:text-blue-200 underline">
                r38su@uwaterloo.ca
              </a>.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white text-sm font-medium mb-2 uppercase tracking-wide">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-4 py-3 bg-transparent border border-white rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-4 py-3 bg-transparent border border-white rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white text-sm font-medium mb-2 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-transparent border border-white rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white resize-vertical"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const formData = new FormData();
                    formData.append('name', document.getElementById('name').value);
                    formData.append('email', document.getElementById('email').value);
                    formData.append('message', document.getElementById('message').value);
                    
                    fetch('https://formsubmit.co/1a4182dd618b3c2d51cda6e7299d1f77 ', {
                      method: 'POST',
                      body: formData
                    }).then(() => {
                      alert('Message sent successfully!');
                    }).catch(() => {
                      alert('Error sending message. Please try again.');
                    });
                  }}
                  className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors uppercase tracking-wide text-sm"
                >
                  Send Message
                </button>
                <button
                  onClick={() => {
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('message').value = '';
                  }}
                  className="px-6 py-3 border border-white text-white rounded hover:bg-white/10 transition-colors uppercase tracking-wide text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.instagram.com/plane_paper_rick/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </a>

              <a
                href="https://github.com/plane-paper"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.38-3.88-1.38-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.11-.75.41-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18.93-.26 1.92-.39 2.91-.39.99 0 1.98.13 2.91.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.75.81 1.2 1.84 1.2 3.1 0 4.43-2.71 5.4-5.29 5.69.42.36.78 1.08.78 2.18 0 1.57-.01 2.83-.01 3.21 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                </svg>
              </a>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 z-0" />
      
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="min-h-screen text-white relative overflow-hidden"
        style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
      >
      
      <AnimatePresence>
        {(isArticleVisible || isTransitioning) && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-white/20"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleClose}
                  className="text-lg font-semibold tracking-wide hover:text-white/80 transition-colors cursor-pointer"
                >
                  Richard Su
                </button>
                <div className="hidden md:flex items-center space-x-1 text-sm">
                  <button 
                    onClick={() => handleTopNavClick('intro')}
                    className={`px-3 py-2 rounded transition-all duration-300 ${
                      currentView === 'intro' 
                        ? 'bg-white/20' 
                        : 'hover:bg-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    Intro
                  </button>
                  <span className="text-white/50">|</span>
                  <button 
                    onClick={() => handleTopNavClick('work')}
                    className={`px-3 py-2 rounded transition-all duration-300 ${
                      currentView === 'work' 
                        ? 'bg-white/20' 
                        : 'hover:bg-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    Projects
                  </button>
                  <span className="text-white/50">|</span>
                  <button 
                    onClick={() => handleTopNavClick('about')}
                    className={`px-3 py-2 rounded transition-all duration-300 ${
                      currentView === 'about' 
                        ? 'bg-white/20' 
                        : 'hover:bg-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    Resume
                  </button>
                  <span className="text-white/50">|</span>
                  <button 
                    onClick={() => handleTopNavClick('contact')}
                    className={`px-3 py-2 rounded transition-all duration-300 ${
                      currentView === 'contact' 
                        ? 'bg-white/20' 
                        : 'hover:bg-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    Contact
                  </button>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div 
        animate={{
          scale: isArticleVisible ? 1.0825 : 1.125,
          filter: isArticleVisible ? 'blur(0.2rem)' : 'blur(0px)',
          opacity: isTransitioning ? 0 : 1
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-1"
        style={{
          backgroundImage: 'linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)), url("images/bg.gif")',
        }}
      />
      
      {isTransitioning && (
        <div className="fixed inset-0 bg-gray-900 z-0" />
      )}
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-8 md:p-16">
        
        <AnimatePresence>
          {!isArticleVisible && !isTransitioning && (
            <motion.header 
              initial="hidden"
              animate={isLoading ? "hidden" : "visible"}
              exit="exit"
              className="text-center"
            >
              <motion.div
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { 
                    scale: 1, 
                    opacity: 1,
                    transition: { 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 1.3  // Starts after main fade-in
                    }
                  },
                  exit: { 
                    scale: 0.8, 
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }
                }}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-white flex items-center justify-center mx-auto mb-8 overflow-hidden"
              >
                <img
                  src="/images/logo.jpg"
                  alt="Site logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <span
                  aria-hidden="true"
                  style={{ display: 'none' }}
                  className="text-3xl md:text-5xl text-white leading-none items-center justify-center"
                >
                  🛩️
                </span>
              </motion.div>
          
              <motion.div 
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: { 
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 1.6  // 0.3s after logo
                    }
                  },
                  exit: { 
                    y: -20, 
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }
                }}
                className="border-t border-b border-white py-8 mb-8 max-w-2xl"
              >
                <h1 className="text-2xl md:text-4xl font-light mb-4 uppercase tracking-wider">
                  <Typewriter 
                    texts={["Hi, I am Richard Su", "A student and developer", "Good to see you!"]}
                    period={2000}
                  />
                </h1>
                <p className="text-sm md:text-base uppercase tracking-wider leading-8 text-white/90">
                  Hello / Bonjour / 你好 / Здравствуйте
                </p>
              </motion.div>
          
              <motion.nav
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: { 
                      duration: 0.6,
                      ease: "easeOut",
                      delay: 1.9,
                      staggerChildren: 0.1,  // Stagger each button
                      delayChildren: 0.2     // Start after nav appears
                    }
                  },
                  exit: { 
                    y: -30, 
                    scale: 0.95,
                    opacity: 0,
                    transition: { duration: 0.4 }
                  }
                }}
                className="border border-white rounded inline-flex overflow-hidden"
              >
                <motion.button
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { 
                      scale: 1, 
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMainNavClick('intro')}
                  className="px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider border-r border-white hover:bg-white/10 transition-all duration-300"
                >
                  Intro
                </motion.button>
                <motion.button
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { 
                      scale: 1, 
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMainNavClick('work')}
                  className="px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider border-r border-white hover:bg-white/10 transition-all duration-300"
                >
                  Projects
                </motion.button>
                <motion.button
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { 
                      scale: 1, 
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMainNavClick('about')}
                  className="px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider border-r border-white hover:bg-white/10 transition-all duration-300"
                >
                  Resume
                </motion.button>
                <motion.button
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { 
                      scale: 1, 
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMainNavClick('contact')}
                  className="px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
                >
                  Contact
                </motion.button>
              </motion.nav>
            </motion.header>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isArticleVisible && (
            <motion.article
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm"
              style={{ paddingTop: '80px' }}
              onClick={(e) => {
                if (e.target === e.currentTarget && selectedProject === null) {
                  handleClose();
                }
              }}
            >
              {currentView !== 'work' || selectedProject === null ? (
                <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl h-full overflow-y-auto no-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentView}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="h-full"
                    >
                      {renderArticleContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <div className="h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentView}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="h-full"
                    >
                      {renderArticleContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </motion.article>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isArticleVisible && !isTransitioning && (
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.06 }}  // fast hide without extra delay
              className="text-center"
            >
              <div className="space-y-2">
                <p className="text-xs text-white/50">
                  Visitor #{visitorCount.toLocaleString()}
                </p>
              </div>
            </motion.footer>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isArticleVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-5"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
      

    </motion.div>
    </>
  );
};

export default Portfolio;