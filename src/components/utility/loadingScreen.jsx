import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const fullText = 'Richard Su';
    
    const typeText = () => {
      if (!isDeleting) {
        if (charIndex < fullText.length) {
          setLoadingText(fullText.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 300);
        }
      } else {
        if (loadingText.length > 0) {
          setLoadingText(prev => prev.substring(0, prev.length - 1));
        } else {
          setIsComplete(true);
          setCharIndex(fullText.length);
        }
      }
    };

    const speed = isDeleting ? 60 : 40;
    const timer = setTimeout(typeText, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, loadingText]);

  if (isComplete) {
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

export default LoadingScreen;