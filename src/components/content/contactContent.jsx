const ContactContent = () => {
  const handleSubmit = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = document.getElementById('subject').value;

    const payload = { name, email, subject, message };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      alert('Error sending message. Please try again.');
    }
  };

  const handleReset = () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6 text-white border-b border-white pb-2">
        Contact
      </h2>
      <p className="text-white/90 mb-6">
        The following information will be sent to my email at{' '}
        <a href="mailto:r38su@uwaterloo.ca" className="text-blue-300 hover:text-blue-200 underline">
          r38su@uwaterloo.ca
        </a>.
      </p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-white text-sm font-medium mb-2 uppercase tracking-wide">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-3 bg-transparent border border-white rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-2 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-3 bg-transparent border border-white rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>

        <div>
            <label htmlFor="subject" className="block text-white text-sm font-medium mb-2 uppercase tracking-wide">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="w-full px-4 py-3 bg-transparent border border-white rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white"
            />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-white text-sm font-medium mb-2 uppercase tracking-wide">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            className="w-full px-4 py-3 bg-transparent border border-white rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white resize-vertical"
          />
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors uppercase tracking-wide text-sm"
          >
            Send Message
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-white text-white rounded hover:bg-white/10 transition-colors uppercase tracking-wide text-sm"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mt-8">
        <a
          href="https://www.instagram.com/plane_paper_rick/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/ruiquansu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.036-1.849-3.036-1.85 0-2.134 1.445-2.134 2.939v5.666H9.357V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.368-1.849 3.602 0 4.269 2.368 4.269 5.451v6.289zM5.337 7.433c-1.144 0-2.069-.927-2.069-2.069 0-1.143.925-2.069 2.069-2.069 1.142 0 2.069.926 2.069 2.069 0 1.142-.927 2.069-2.069 2.069zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.731v20.538C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.269V1.731C24 .774 23.2 0 22.225 0z" />
          </svg>
        </a>
        <a
          href="https://github.com/plane-paper"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.38-3.88-1.38-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.11-.75.41-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18.93-.26 1.92-.39 2.91-.39.99 0 1.98.13 2.91.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.75.81 1.2 1.84 1.2 3.1 0 4.43-2.71 5.4-5.29 5.69.42.36.78 1.08.78 2.18 0 1.57-.01 2.83-.01 3.21 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ContactContent;