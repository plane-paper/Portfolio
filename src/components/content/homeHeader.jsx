import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from '../utility/typeWriter';

const HomeHeader = ({ isLoading, onNavigate }) => {
  return (
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
              delay: 1.3
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
              delay: 1.6
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
              staggerChildren: 0.1,
              delayChildren: 0.2
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
        {['intro', 'work', 'about', 'contact'].map((item, idx, arr) => (
          <motion.button
            key={item}
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
            onClick={() => onNavigate(item)}
            className={`px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 ${
              idx < arr.length - 1 ? 'border-r border-white' : ''
            }`}
          >
            {item === 'work' ? 'Projects' : item === 'about' ? 'Resume' : item.charAt(0).toUpperCase() + item.slice(1)}
          </motion.button>
        ))}
      </motion.nav>
    </motion.header>
  );
};

export default HomeHeader;