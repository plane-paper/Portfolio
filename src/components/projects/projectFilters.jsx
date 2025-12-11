const ProjectFilters = ({ searchQuery, onSearchChange, alphaFilter, onAlphaChange, onClear }) => {
  const alphabet = ['All', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects or keywords..."
          className="w-full md:w-2/3 px-4 py-3 bg-transparent border border-white rounded text-white placeholder-white/50 focus:outline-none"
        />
        <button
          onClick={onClear}
          className="px-3 py-2 border border-white rounded text-white hover:bg-white/10"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => onAlphaChange(letter)}
            className={`px-2 py-1 text-sm rounded ${
              alphaFilter === letter ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilters;