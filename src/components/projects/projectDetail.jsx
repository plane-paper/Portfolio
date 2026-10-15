import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, Play } from 'lucide-react';

/* ---------------------------------------------------------------------------
 * Backwards compatibility
 * Pulls <a href> strings out of a legacy `details` array into link objects.
 * Every project in projects.jsx now has `links`, so once you've dropped that
 * file in you can delete this helper (and use project.details directly).
 * ------------------------------------------------------------------------- */
const LEGACY_LINK = /<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i;

const splitLegacyDetails = (details = []) => {
  const links = [];
  const points = [];
  details.forEach((detail) => {
    const match = detail.match(LEGACY_LINK);
    if (match) {
      const label =
        match[2]
          .replace(/^click me for\s+/i, '')
          .replace(/\s+link\b/i, '')
          .trim() || 'Link';
      links.push({ href: match[1], label });
    } else {
      points.push(detail);
    }
  });
  return { links, points };
};

/* ---------------------------------------------------------------------------
 * Small pieces
 * ------------------------------------------------------------------------- */
const BulletList = ({ points, twoColumns = false }) => (
  <ul className={twoColumns ? 'md:columns-2 md:gap-x-10' : ''}>
    {points.map((point, index) => (
      <li
        key={index}
        className="break-inside-avoid pb-3 text-white/90 leading-relaxed flex items-start"
      >
        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0" />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

const Lightbox = ({ src, alt, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Portal: the detail panel is transformed and scrolls, which would trap a
  // fixed-position overlay inside it.
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
    >
      <img src={src} alt={alt} className="max-w-full max-h-full object-contain rounded-lg" />
    </motion.div>,
    document.body
  );
};

/* One viewer for images and the optional demo video, with thumbnails.
 * The media is capped by height (so text is still visible on the first
 * screen) and centered at its natural proportions. */
const Gallery = ({ title, images = [], video }) => {
  const items = [
    ...images.map((src) => ({ type: 'image', src })),
    ...(video ? [{ type: 'video', src: video }] : []),
  ];
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(null);
  const current = items[active] ?? items[0];

  return (
    <div>
      {current.type === 'image' ? (
        <button
          type="button"
          onClick={() => setZoomed(current.src)}
          aria-label="View image full size"
          className="block mx-auto max-w-full rounded-lg cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
        >
          <img
            src={current.src}
            alt={`${title} ${active + 1}`}
            className="block max-w-full max-h-[60vh] w-auto rounded-lg shadow-2xl"
          />
        </button>
      ) : (
        <video
          key={current.src}
          controls
          className="block mx-auto max-w-full max-h-[60vh] rounded-lg bg-black shadow-2xl"
        >
          <source src={current.src} type="video/mp4" />
          Your browser does not support video.
        </video>
      )}

      {items.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={item.type === 'video' ? 'Play demo video' : `Show image ${index + 1}`}
              aria-current={index === active}
              className={`relative w-20 h-14 rounded-md overflow-hidden bg-white/10 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 ${
                index === active ? 'ring-2 ring-blue-400' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="flex flex-col items-center justify-center w-full h-full text-white text-xs gap-0.5">
                  <Play className="w-4 h-4" />
                  Demo
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {zoomed && (
        <Lightbox src={zoomed} alt={`${title} enlarged`} onClose={() => setZoomed(null)} />
      )}
    </div>
  );
};

// Tailwind needs full class names, so no string-building here.
const HIGHLIGHT_COLUMNS = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

/* ---------------------------------------------------------------------------
 * Main component
 *
 * Project shape (everything except title is optional):
 * {
 *   title, description,
 *   tech:       ['Next.js', ...],
 *   links:      [{ label: 'GitHub', href: '...' }],
 *   highlights: ['...', '...', '...'],        // 1-3 work best
 *   sections:   [{ heading: '...', points: ['...'] }],
 *   details:    ['...'],                      // flat list when there are no sections
 *   images:     ['images/x.png'],
 *   video:      'images/x.mp4',
 * }
 *
 * Layout, top to bottom:
 *   header (title, description, tech + links)
 *   gallery (full width, height-capped)
 *   highlights strip
 *   details panel (two columns on desktop)
 * ------------------------------------------------------------------------- */
const ProjectDetail = ({ project, isClosing, onClose, onCloseComplete }) => {
  const legacy = splitLegacyDetails(project.details);
  const links = project.links ?? legacy.links;
  const tech = project.tech ?? [];
  const highlights = (project.highlights ?? []).slice(0, 3);
  const hasMedia = (project.images?.length ?? 0) > 0 || Boolean(project.video);
  const hasSections = (project.sections?.length ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={isClosing ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (isClosing) onCloseComplete();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="h-full p-6 sm:p-8 overflow-y-auto no-scrollbar"
    >
      <div className="max-w-6xl mx-auto pb-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="w-10 h-10 flex-shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {project.description && (
            <p className="mt-4 max-w-3xl text-white/90 text-lg leading-relaxed">
              {project.description}
            </p>
          )}

          {(tech.length > 0 || links.length > 0) && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              {tech.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {tech.map((item) => (
                    <li
                      key={item}
                      className="px-3 py-1 rounded-full text-sm text-blue-200 bg-blue-400/10 border border-blue-400/20"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {links.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300 ${
                        index === 0
                          ? 'bg-blue-500 hover:bg-blue-400'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {link.label}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </header>

        {/* Media */}
        {hasMedia && (
          <Gallery key={project.title} title={project.title} images={project.images} video={project.video} />
        )}

        {/* Highlights: one row, so there's no empty column to balance */}
        {highlights.length > 0 && (
          <ul className={`mt-8 grid gap-5 ${HIGHLIGHT_COLUMNS[highlights.length]}`}>
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-l-2 border-blue-400 pl-4 text-white text-lg font-medium leading-snug"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Details: one panel, flowing into two columns on desktop */}
        <div className="mt-8 bg-white/5 rounded-lg p-6 md:p-8 backdrop-blur-sm">
          {hasSections ? (
            <div className="md:columns-2 md:gap-x-12">
              {project.sections.map((section) => (
                <section key={section.heading} className="break-inside-avoid mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">{section.heading}</h3>
                  <BulletList points={section.points} />
                </section>
              ))}
            </div>
          ) : (
            <section>
              <h3 className="text-lg font-semibold text-white mb-4">Project details</h3>
              <BulletList points={legacy.points} twoColumns />
            </section>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;