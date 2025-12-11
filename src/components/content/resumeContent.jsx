const ResumeContent = () => (
  <div className="pb-7">
    <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
      Resume
    </h2>
    <div className="bg-white rounded-lg p-4 shadow-2xl">
      <iframe 
        src="Ruiquan_Richard_Su_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1" 
        className="w-full h-[600px] md:h-[800px] rounded"
        title="Richard Su Resume"
      />
    </div>
    <div className="mt-4 text-center">
      <a 
        href="Ruiquan_Richard_Su_Resume.pdf" 
        download
        className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors uppercase tracking-wide text-sm"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download PDF
      </a>
    </div>
  </div>
);
export default ResumeContent;