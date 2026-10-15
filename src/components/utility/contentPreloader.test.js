import { projects } from '../../data/projects';
import { preloadPortfolioContent } from './contentPreloader';

describe('preloadPortfolioContent', () => {
  const originalImage = global.Image;
  const originalFetch = global.fetch;

  afterEach(() => {
    global.Image = originalImage;
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('preloads intro images, project images, then the resume', async () => {
    const requests = [];
    global.Image = class {
      set src(source) {
        requests.push(source);
        Promise.resolve().then(() => this.onload());
      }
    };
    global.fetch = jest.fn(async (url) => {
      requests.push(url);
      return { ok: true, blob: async () => new Blob() };
    });

    await preloadPortfolioContent();

    const projectImages = [...new Set(projects.flatMap((project) => project.images || []))];
    expect(requests[0]).toBe('images/pic01.png');
    expect(requests.slice(1, 1 + projectImages.length)).toEqual(projectImages);
    expect(requests[requests.length - 1]).toBe('Ruiquan_Richard_Su_Resume.pdf');
  });
});
