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
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-white/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onClose}
            className="text-lg font-semibold tracking-wide hover:text-white/80 transition-colors cursor-pointer"
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
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNavigation;