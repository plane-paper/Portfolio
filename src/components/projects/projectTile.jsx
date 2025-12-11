const ProjectTile = ({ project, index, onProjectSelect, isCompact, isSelected = false }) => {
  const handleTileClick = () => {
    onProjectSelect(index);
  };

  if (isCompact) {
    return (
      <div 
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
      </div>
    );
  }

  return (
    <div 
      className="bg-white/10 hover:bg-white/15 rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
      onClick={handleTileClick}
    >
      <h4 className="text-center py-4 m-0 text-white font-semibold uppercase tracking-wide text-lg">
        {project.title}
      </h4>
      
      {project.images && project.images.length > 0 && (
        <div className="w-full h-48 overflow-hidden rounded-lg mt-4">
          <img 
            src={project.images[0]} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>
      )}
      
      <p className="text-white/80 mt-4 text-center">
        Click to view details → 
      </p>
    </div>
  );
};

export default ProjectTile;