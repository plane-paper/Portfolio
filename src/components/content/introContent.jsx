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
                Single-handedly built a core product for this AI startup that generated over <strong>100,000 CAD in revenue</strong> and attracted over <strong>3,000 waitlist customers</strong>
            </li>
            <li>

            </li>
          </ul>
          <p><strong>Sioux Technologies</strong></p>
            <ul>
                <li>
                </li>
            </ul>
          <p><strong>Capital Air Inc., Beijing Capital Group Co.</strong></p>
            <ul>
                <li>

                </li>
            </ul>
        </DropdownSection>

        <DropdownSection title="Education">
          <p>
            <strong>University of Waterloo</strong> - Computer Engineering, BASc
          </p>
          <p>
            <strong>Rothesay Netherwood School</strong> - International Baccalaureate Diploma, 43/45
          </p>
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
              <p>English and Mandarin - Native level</p>
              <p>French - Fluent level</p>
              <p>Cantonese - Still learning</p>
            </div>
          </div>
        </DropdownSection>
        </div>
      </div>
  );
};

export default IntroContent;