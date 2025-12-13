import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Utility Components
import LoadingScreen from './utility/loadingScreen';

// Navigation Components
import TopNavigation from './navigation/topNavigation';

// Project Components
import ProjectTile from './projects/projectTile';
import ProjectDetail from './projects/projectDetail';
import ProjectFilters from './projects/projectFilters';

// Content Components
import IntroContent from './content/introContent';
import ResumeContent from './content/resumeContent';
import ContactContent from './content/contactContent';
import HomeHeader from './content/homeHeader';

// Data
import { projects } from '../data/projects';
import DecryptedText from './ui/decyptedText';

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
    }, 1400);

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

  // Filtered projects
  const filteredProjects = projects.filter(p => {
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

  // Escape key handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && isArticleVisible) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isArticleVisible]);

  const renderArticleContent = () => {
    switch (currentView) {
      case 'intro':
        return <IntroContent />;
      
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
          <div className="pb-7">
            <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
              Projects
            </h2>

            <ProjectFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              alphaFilter={alphaFilter}
              onAlphaChange={setAlphaFilter}
              onClear={() => {
                setSearchQuery('');
                setAlphaFilter('All');
              }}
            />

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
        return <ResumeContent />;
      
      case 'contact':
        return <ContactContent />;
      
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
        {/* Top Navigation */}
        <AnimatePresence>
          {(isArticleVisible || isTransitioning) && (
            <TopNavigation
              currentView={currentView}
              onViewChange={handleTopNavClick}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>

        {/* Background Image */}
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
        
        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-8 md:p-16">
          
          {/* Home Header */}
          <AnimatePresence>
            {!isArticleVisible && !isTransitioning && (
              <HomeHeader 
                isLoading={isLoading}
                onNavigate={handleMainNavClick}
              />
            )}
          </AnimatePresence>

          {/* Article Content */}
          <AnimatePresence mode="wait">
            {isArticleVisible && (
              <motion.article
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm overflow-y-auto no-scrollbar"
                style={{ paddingTop: '80px' }}
                onClick={(e) => {
                  if (e.target === e.currentTarget && selectedProject === null) {
                    handleClose();
                  }
                }}
              >
                {currentView !== 'work' || selectedProject === null ? (
                  <div className="container mx-auto px-6 md:px-12 py-12 max-w-4xl no-scrollbar">
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

          {/* Footer */}
          <AnimatePresence>
            {!isArticleVisible && !isTransitioning && (
              <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.06 }}
                className="text-center"
              >
                <div className="space-y-2">
                  <p className="text-xs text-white/50">
                    Visitor #{visitorCount.toLocaleString()}
                  </p>
                </div>
                <DecryptedText
                  text="You found my secret! I hate runny eggs."
                  sequential
                  animateOn="hover"
                  className="text-white/50 text-xs"
                  encryptedClassName='text-white/50 text-xs'></DecryptedText>
              </motion.footer>
            )}
          </AnimatePresence>
        </div>

        {/* Backdrop Overlay */}
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