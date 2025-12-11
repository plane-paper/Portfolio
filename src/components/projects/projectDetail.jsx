import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

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
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
      className={`h-full p-8 overflow-y-auto no-scrollbar ${isVisible ? 'fade-in' : ''}`}
    >
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
    </motion.div>
  );
};
export default ProjectDetail;