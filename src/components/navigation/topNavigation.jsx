import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const TopNavigation = ({ currentView, onViewChange, onClose }) => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-label="Main navigation"
      className="portfolio-navigation fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-white/20"
    >
      <div className="container mx-auto px-4 md:px-6 py-2 md:py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onClose}
            aria-label="Return to home"
            className="min-h-11 text-lg font-semibold tracking-wide hover:text-white/80 transition-colors cursor-pointer"
          >
            Richard Su
          </button>
          <div className="hidden md:flex items-center space-x-1 text-sm">
            {['intro', 'work', 'about', 'contact'].map((view, idx, arr) => (
              <React.Fragment key={view}>
                <button 
                  onClick={() => onViewChange(view)}
                  className={`px-3 py-2 rounded transition-all duration-300 ${
                    currentView === view 
                      ? 'bg-white/20' 
                      : 'hover:bg-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  {view === 'work' ? 'Projects' : view === 'about' ? 'Resume' : view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
                {idx < arr.length - 1 && <span className="text-white/50">|</span>}
              </React.Fragment>
            ))}
          </div>
          <button
            onClick={onClose}
            aria-label="Close section and return home"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1 pt-1 md:hidden">
          {['intro', 'work', 'about', 'contact'].map((view) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              aria-current={currentView === view ? 'page' : undefined}
              className={`min-h-11 rounded-md px-1 text-base transition-colors ${currentView === view ? 'bg-white/15 text-white font-semibold' : 'text-white/70 hover:bg-white/10'}`}
            >
              {view === 'work' ? 'Projects' : view === 'about' ? 'Resume' : view === 'intro' ? 'Intro' : 'Contact'}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNavigation;
