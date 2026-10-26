const ProjectTile = ({ project, index, onProjectSelect, isCompact, isSelected = false }) => {
  const handleTileClick = () => {
    onProjectSelect(index);
  };

  if (isCompact) {
    return (
      <button
        type="button"
        aria-label={`View ${project.title}`}
        aria-pressed={isSelected}
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
      </button>
    );
  }

  return (
    <button
      type="button"
      className="w-full min-w-0 bg-white/10 hover:bg-white/15 rounded-lg p-4 sm:p-6 cursor-pointer transition-all duration-300 transform md:hover:scale-[1.02] hover:shadow-2xl"
      onClick={handleTileClick}
    >
      <span className="block text-center py-3 m-0 text-white font-semibold uppercase tracking-wide text-xl sm:text-lg break-words">
        {project.title}
      </span>
      
      {project.images && project.images.length > 0 && (
        <span className="block w-full aspect-video sm:aspect-auto sm:h-48 overflow-hidden rounded-lg mt-3">
          <img 
            src={project.images[0]} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </span>
      )}
      
      <span className="block text-white/80 mt-4 text-center">
        View project details →
      </span>
    </button>
  );
};

export default ProjectTile;
