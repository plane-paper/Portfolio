import { useState, useEffect } from 'react';

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

export default Typewriter;