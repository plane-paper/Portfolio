import { projects } from '../../data/projects';

const RESUME_URL = 'Ruiquan_Richard_Su_Resume.pdf';

const preloadImages = (sources) => Promise.all(sources.map((source) => new Promise((resolve) => {
  const image = new Image();
  image.onload = resolve;
  image.onerror = () => {
    console.warn(`Unable to preload image: ${source}`);
    resolve();
  };
  image.src = source;
})));

export const preloadPortfolioContent = async () => {
  await preloadImages(['images/pic01.png']);

  const projectImages = [...new Set(projects.flatMap((project) => project.images || []))];
  await preloadImages(projectImages);

  try {
    const response = await fetch(RESUME_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    await response.blob();
  } catch (error) {
    console.warn('Unable to preload resume PDF', error);
  }
};
