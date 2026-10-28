import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom lacks IntersectionObserver, which scroll-reveal components rely on to become visible.
class StubIntersectionObserver {
  private readonly callback: (entries: Array<{ isIntersecting: boolean }>) => void;
  constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) {
    this.callback = callback;
  }
  observe(target: Element) {
    this.callback([{ isIntersecting: true }]);
    return target;
  }
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: StubIntersectionObserver,
});
