import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const IntroContent = () => {
  const [openSection, setOpenSection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const DropdownSection = ({ title, children }) => {
    const isOpen = openSection === title;

    const handleClick = () => {
      if (isAnimating) return;

      if (isOpen) {
        // Just close the current section
        setOpenSection(null);
      } else if (openSection !== null) {
        // Another section is open, close it first then open this one
        setIsAnimating(true);
        setOpenSection(null);
        setTimeout(() => {
          setOpenSection(title);
          setIsAnimating(false);
        }, 300); // Wait for close animation to complete
      } else {
        // No section is open, just open this one
        setOpenSection(title);
      }
    };

    // smooth collapse: measure content and animate maxHeight
    const contentRef = useRef(null);
    const [measuredHeight, setMeasuredHeight] = useState(0);
    useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // update measurement when content mounts / resizes
    const update = () => setMeasuredHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
    }, [children]);

    return (
    <div className="border border-white/20 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
        <motion.button
        onClick={handleClick}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
        whileTap={{ scale: 0.98 }}
        >
        <h3 className="text-lg font-semibold uppercase tracking-wide text-white">
            {title}
        </h3>
        <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
        >
            <ChevronDown className="w-5 h-5 text-white" />
        </motion.div>
        </motion.button>
        <motion.div
        // don't use initial true/false so animation runs on both open and close
        initial={false}
        animate={{ maxHeight: isOpen ? measuredHeight : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.34, ease: "easeInOut" }}
        style={{ overflow: 'hidden' }}
        >
        <div ref={contentRef} className="px-6 pb-6 pt-2 space-y-3 text-white/90 leading-relaxed">
            {children}
        </div>
        </motion.div>
    </div>
    );
  };

return (
    <div className="pb-7">
        <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
            Intro
        </h2>

        <div className="mb-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
                <p className="text-white/90 leading-relaxed">
                    Hello! I'm a passionate full-stack and software developer studying Electrical & Computer Engineering at the University of Waterloo, fostering hands-on experience with the co-op program, and academic success during my study terms.
                    <br />
                    I love building impactful projects that leverage modern technologies to solve real-world problems! Check out my projects page for more information. I also freqeuently compete in hackathons and engineering competitions, winning multiple awards.
                    <br />
                    I have a multicultural background, having been raised in two countries during my childhood. This diverse upbringing has given me a unique perspective and adaptability in both technical and interpersonal contexts.
                    <br />
                    When I'm not studying or working, you may find me playing chess, gaming, writing, reading, debating, or cooking. I really wish I could cut my own hair, but reality often disappoints.
                </p>
            </div>
            
            <figure className="flex flex-col items-center md:w-64 flex-shrink-0">
                <img
                    src="images/pic01.jpg"
                    alt="Me going to the barber"
                    className="w-full rounded-lg shadow-lg border border-white/20"
                />
                <figcaption className="text-xs text-white/50 mt-2 italic text-center">
                    The only time I went to the barber
                </figcaption>
            </figure>
        </div>

        <div className="space-y-4">
            <DropdownSection title="Work Experience">
                <p>
                    I have worked in a professional setting at a range of very different positions, and performed beyond expectation in all of them:
                </p>
                <p><strong>Lynkr Inc.</strong></p>
                <ul>
                    <li>
                        
                    </li>
                </ul>
                <p><strong>Sioux Technologies</strong></p>
                    <ul>
                        <li></li>
                    </ul>
                <p><strong>Capital Air Inc., Beijing Capital Group Co.</strong></p>
                    <ul>
                        <li></li>
                    </ul>
            </DropdownSection>

            <DropdownSection title="Education">
                    <p><strong>University of Waterloo</strong> - Computer Engineering, BASc, 4.0/4.0 GPA</p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>Elected academic student representative</li>
                        <li>Core member of Wat.AI student design team</li>
                    </ul>
                    <p><strong>Rothesay Netherwood School</strong> - International Baccalaureate Diploma, 43/45</p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>Elected prefect for democracy</li>
                        <li>Secretary General, Co-Founder, Organizer of Gordon Fairweather MUN</li>
                        <li>Founder of student-led newspaper RNS Monthly</li>
                        <li>President of Forensics Club</li>
                    </ul>
            </DropdownSection>

            <DropdownSection title="Awards">
                <p><strong>Academic</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Term Distinction (Top 10% of class)</li>
                    <li>President's Scholarship with Distinction</li>
                    <li>2nd Place - Waterloo Engineering Competition 2025</li>
                    <li>Honour Roll (Top 5%) - Canadian Computing Competition 2023</li>
                    <li>Distinction (Top 20%) - Canadian Computing Competition 2021, 2022, 2024</li>
                    <li>2nd Place - FIRST Robotics Competition Nationals 2023</li>
                    <li>High Commendation (Top 1.3%) - John Locke Essay Competition 2023</li>
                    <li>Governor's Bronze & Silver - Rothesay Netherwood School</li>
                </ul>
                <p><strong>Others</strong></p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Reach For The Top Provincial Runner-up 2023</li>
                    <li>3rd Place - Stanford Flemming Debate Tournament 2025</li>
                    <li>2nd Place - Provincial Debate Tournament 2024</li>
                    <li>3rd Place - Provincial Debate Tournament 2023</li>
                    <li>3rd Place - Provincial Chess Tournament 2023</li>
                </ul>
            </DropdownSection>

            <DropdownSection title="Skills & Languages">
                <div className="space-y-3">
                    <div>
                        <p className="font-semibold text-white mb-2">Programming Languages:</p>
                        <p>Python, JavaScript/TypeScript, C++/C, C#, Java, SQL, Go, Scripting (Powershell/YAML/Bash/CMD)</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white mb-2">Frameworks:</p>
                        <p>NumPy, Pandas, Tensorflow, PyTorch, skLearn, spaCy, LangChain/LangGraph, Postgres/MySQL, Flask, FastAPI, Matplot, Kriging, MCP, Pydantic, React, Next.js</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white mb-2">Developer Tools:</p>
                        <p>Git, Node, Yarn, Docker, VS/VS Code/PyCharm, Jupyter/Anaconda, NSIS, NuGet, Vim, Jira, Confluence, IntelliJ</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white mb-2">Spoken Languages:</p>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                            <li>English and Mandarin - Native level</li>
                            <li>French - Fluent level</li>
                        </ul>
                    </div>
                </div>
            </DropdownSection>
        </div>
    </div>
);
};

export default IntroContent;
