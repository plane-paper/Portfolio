import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// Loading Screen Component
const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fullText = 'Richard Su';
    
    const typeText = () => {
      if (!isDeleting) {
        // Typing phase
        if (charIndex < fullText.length) {
          setLoadingText(fullText.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          // Wait for 1 second, then start deleting
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        // Deleting phase
        if (loadingText.length > 0) {
          setLoadingText(prev => prev.substring(0, prev.length - 1));
        } else {
          // Start fade out transition
          setIsFadingOut(true);
          setTimeout(() => setIsComplete(true), 500); // Fade out duration
        }
      }
    };

    const speed = isDeleting ? 100 : 150;
    const timer = setTimeout(typeText, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, loadingText]);

  if (isComplete) return null;

  return (
    <div className={`fixed inset-0 bg-gray-900 flex items-center justify-center z-50 transition-opacity duration-500 ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-light text-white uppercase tracking-wider">
          {loadingText}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    </div>
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

// Project Detail Component
const ProjectDetail = ({ project, onClose }) => {
  const videoRef = useRef(null);

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
    <div className="h-full p-8 overflow-y-auto">
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

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Extended to accommodate the fade out transition

    return () => clearTimeout(timer);
  }, []);

  // Visitor count effect - using in-memory storage instead of localStorage
  useEffect(() => {
    // Simulate visitor count (in a real app, this would come from a backend)
    const randomCount = Math.floor(Math.random() * 1000) + 500;
    setVisitorCount(randomCount);
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
        "Developed a greedy algorithm to fit the course content into the user’s schedule, while also balancing it with practice sessions. Then used an LLM to generate the course content with the specified length.",
        "Used Auth0 to implement storage of user login and authorization, and used PostgreSQL to store user data, including progress, course information, etc.",
        "Used Docker to containerize the entire application for easy deployment.",
        '<a href="https://github.com/plane-paper/SnapLearn" class="text-blue-300 hover:text-blue-200 underline">Click me for GitHub link</a>' 
      ]
    },
    {
      title: "QuickSilver",
      images: ["images/pic12.jpg"],
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

  // Main screen navigation (with animation)
  const handleMainNavClick = (view) => {
    setIsTransitioning(true);
    
    // Start the animation
    setTimeout(() => {
      setCurrentView(view);
      setIsArticleVisible(true);
      setIsTransitioning(false);
    }, 800); // Animation duration
  };

  // Top navigation (simple fade transition)
  const handleTopNavClick = (view) => {
    if (view === currentView) return; // Don't transition if already on this view
    
    setCurrentView(view);
    setSelectedProject(null); // Reset project selection when changing views
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
          <div>
            <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
              Intro
            </h2>
            <div className="space-y-4 text-white/90 leading-relaxed">
              <p>I am a passionate full-stack and software developer with ample work experience entering the world of Electrical & Computer Engineering at the University of Waterloo.</p>
              <p>I have completed various projects in the past, as big as a data visualization project that served over 2,000 clients under Capital Air Ltd., and as small as a 3D printed AI cat feeder.</p>
              <p>I speak English, Mandarin, and French fluently, and I have a multicultural background, being raised in two countries in my childhood. I am also fluent with most developer tools, most major languages, many modules, and many frameworks.</p>
              <p>I also love to play chess, enjoy various video games, write, or read a nice book.</p>
              <p>For professional contact, please reach me at my university email: <a href="mailto:r38su@uwaterloo.ca" className="text-blue-300 hover:text-blue-200 underline">r38su@uwaterloo.ca</a>, or my personal email: <a href="mailto:suruiquan10@163.com" className="text-blue-300 hover:text-blue-200 underline">suruiquan10@163.com</a>.</p>
              <img src="images/pic01.jpg" alt="A photo of me" className="w-full rounded mt-6" />
            </div>
          </div>
        );
      
      case 'work':
        if (selectedProject !== null) {
          return (
            <div className="flex h-full">
              <div className="w-24 bg-gray-900/50 backdrop-blur-sm border-r border-white/20 p-4 overflow-y-auto flex-shrink-0">
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
          <div>
            <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectTile 
                  key={index} 
                  project={project} 
                  index={index}
                  onProjectSelect={setSelectedProject}
                  isCompact={false}
                />
              ))}
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div>
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
              <a href="#" className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-white text-sm">D</span>
              </a>
              <a href="https://www.instagram.com/plane_paper_rick/" className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-white text-sm">IG</span>
              </a>
              <a href="https://github.com/plane-paper" className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors">
                <span className="text-white text-sm">GH</span>
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
      {/* Persistent Background Layer - Always Present */}
      <div className="fixed inset-0 bg-gray-900 z-0" />
      
      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}
      
      {/* Main App */}
      <div className={`min-h-screen text-white relative overflow-hidden transition-opacity duration-1000 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`} style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      
      {/* Top Navigation Bar */}
      {(isArticleVisible || isTransitioning) && (
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-white/20 transition-all duration-800 ${
          isTransitioning ? 'animate-slideFromCenter' : ''
        }`}>
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
        </nav>
      )}

      {/* Background Image Layer */}
      <div 
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out z-1 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: 'linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)), url("images/bg.gif")',
          transform: isArticleVisible ? 'scale(1.0825)' : 'scale(1.125)',
          filter: isArticleVisible ? 'blur(0.2rem)' : 'none'
        }}
      />
      
      {/* Solid background color during transition */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-gray-900 z-0" />
      )}
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-8 md:p-16">
        
        <header 
          className={`text-center transition-all duration-800 ease-in-out ${
            isArticleVisible || isTransitioning ? 'opacity-0 transform scale-95 blur-sm pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white flex items-center justify-center mx-auto mb-8">
            <span className="text-2xl md:text-3xl text-white">⌨</span>
          </div>
          
          <div className="border-t border-b border-white py-8 mb-8 max-w-2xl">
            <h1 className="text-2xl md:text-4xl font-light mb-4 uppercase tracking-wider">
              <Typewriter 
                texts={["Hi, I am Richard Su", "A student and developer", "Good to see you!"]}
                period={2000}
              />
            </h1>
            <p className="text-sm md:text-base uppercase tracking-wider leading-8 text-white/90">
              Hello / Bonjour / 你好 / Здравствуйте
            </p>
          </div>
          
          <nav className={`border border-white rounded inline-flex transition-all duration-800 ${
            isTransitioning ? 'animate-moveToTop' : ''
          }`}>
            <button 
              onClick={() => handleMainNavClick('intro')}
              className="px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider border-r border-white hover:bg-white/10 transition-all duration-300"
            >
              Intro
            </button>
            <button 
              onClick={() => handleMainNavClick('work')}
              className="px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider border-r border-white hover:bg-white/10 transition-all duration-300"
            >
              Projects
            </button>
            <button 
              onClick={() => handleMainNavClick('about')}
              className="px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider border-r border-white hover:bg-white/10 transition-all duration-300"
            >
              Resume
            </button>
            <button 
              onClick={() => handleMainNavClick('contact')}
              className="px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
            >
              Contact
            </button>
          </nav>
        </header>

        {isArticleVisible && (
          <article 
            className={`fixed inset-0 bg-gray-900/95 backdrop-blur-sm transition-all duration-500 ease-in-out ${
              isArticleVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
            style={{ paddingTop: '80px' }}
            onClick={(e) => {
              if (e.target === e.currentTarget && selectedProject === null) {
                handleClose();
              }
            }}
          >
            {currentView !== 'work' || selectedProject === null ? (
              <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl h-full overflow-y-auto">
                <div className="animate-fadeIn">
                  {renderArticleContent()}
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn h-full">
                {renderArticleContent()}
              </div>
            )}
          </article>
        )}

        <footer 
          className={`text-center transition-all duration-800 ease-in-out ${
            isArticleVisible || isTransitioning ? 'opacity-0 transform scale-95 blur-sm pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-white/75">
              Proudly built with React
            </p>
            <p className="text-xs text-white/50">
              Visitor #{visitorCount.toLocaleString()}
            </p>
          </div>
        </footer>
      </div>

      {isArticleVisible && (
        <div 
          className="fixed inset-0 bg-black/50 z-5 transition-opacity duration-500"
          onClick={handleClose}
        />
      )}
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes moveToTop {
          0% {
            transform: translateY(0) scale(1);
            position: static;
          }
          50% {
            transform: translateY(-50vh) scale(0.9);
          }
          100% {
            transform: translateY(-80vh) scale(0.8);
            position: fixed;
            top: 20px;
            left: 50%;
            margin-left: -200px;
            z-index: 1000;
          }
        }
        
        @keyframes slideFromCenter {
          0% {
            transform: translateY(50vh) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-moveToTop {
          animation: moveToTop 0.8s ease-in-out forwards;
        }
        
        .animate-slideFromCenter {
          animation: slideFromCenter 0.8s ease-out forwards;
        }
      `}</style>
    </div>
    </>
  );
};

export default Portfolio;