import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { App } from './app';

const { fogFactory, fogDestroy } = vi.hoisted(() => ({
  fogFactory: vi.fn(),
  fogDestroy: vi.fn(),
}));

vi.mock('three', () => ({ Scene: class Scene {} }));
vi.mock('vanta/dist/vanta.fog.min', () => ({ default: { default: fogFactory } }));

const originalScrollIntoView = Element.prototype.scrollIntoView;

function stubMotion(reduced: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? reduced : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = 'light';
    stubMotion(true);
    fogFactory.mockReset();
    fogDestroy.mockReset();
    fogFactory.mockReturnValue({ destroy: fogDestroy });
  });

  afterEach(() => {
    history.replaceState(null, '', '/');
    Element.prototype.scrollIntoView = originalScrollIntoView;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('renders the approved page structure without the global video', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Xiaoyu Feng' })).toBeInTheDocument();
    expect(document.querySelector('.scene-backdrop')).not.toBeInTheDocument();
    expect(document.querySelector('.fog-background')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Section progress' })).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(
      within(main)
        .getAllByRole('region')
        .map((section) => section.id),
    ).toEqual(['top', 'experience', 'gtm', 'transformation', 'ecosystem', 'lab', 'contact']);
  });

  test('defaults to light and toggles a persisted manual theme with a destination label', () => {
    render(<App />);

    const toggle = screen.getByRole('button', { name: 'Switch to dark mode' });
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    fireEvent.click(toggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    expect(toggle).toHaveAccessibleName('Switch to light mode');

    fireEvent.click(toggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');
  });

  test('restores a saved theme and rejects invalid stored values', () => {
    localStorage.setItem('portfolio-theme', 'dark');
    const { unmount } = render(<App />);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    unmount();

    localStorage.setItem('portfolio-theme', 'sepia');
    document.documentElement.dataset.theme = 'sepia';
    render(<App />);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  test('restores the Hero statement without restoring the location', () => {
    render(<App />);

    const hero = screen.getByRole('region', { name: 'Xiaoyu Feng' });
    expect(within(hero).getByRole('heading', { name: 'Xiaoyu Feng' })).toBeInTheDocument();
    expect(within(hero).getByText('Strategist')).toBeInTheDocument();
    expect(
      within(hero).getByText(
        'I connect market insight, technical roadmaps, customer co-innovation, and operating systems to create measurable business impact.',
      ),
    ).toBeInTheDocument();
    expect(within(hero).queryByText(hiddenHeroContent.location)).not.toBeInTheDocument();
    expect(document.body).not.toHaveTextContent('Manger');
  });

  test('waits two seconds after each role settles and pauses for hover, focus, and a hidden document', () => {
    vi.useFakeTimers();
    stubMotion(false);
    let hidden = false;
    vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
    render(<App />);

    const role = document.querySelector('.rotating-role') as HTMLElement;
    const primaryAction = screen.getByRole('link', { name: /Explore strategic work/ });
    expect(role.querySelector('.rotating-role__item--current')).toHaveTextContent('Strategist');

    act(() => vi.advanceTimersByTime(2_000));
    expect(role).toHaveTextContent('Product Manager');
    expect(role).toHaveAttribute('data-role-index', '1');
    expect(role.querySelector('.rotating-role__item--exit')).toHaveTextContent('Strategist');
    expect(role.querySelector('.rotating-role__item--enter')).toHaveTextContent('Product Manager');

    act(() => vi.advanceTimersByTime(520));
    expect(role.querySelector('.rotating-role__item--exit')).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1_999));
    expect(role).toHaveAttribute('data-role-index', '1');
    act(() => vi.advanceTimersByTime(1));
    expect(role).toHaveAttribute('data-role-index', '2');

    act(() => vi.advanceTimersByTime(520));

    fireEvent.mouseEnter(role);
    expect(role).toHaveAttribute('data-paused', 'true');
    act(() => vi.advanceTimersByTime(4_000));
    expect(role).toHaveAttribute('data-role-index', '2');

    fireEvent.mouseLeave(role);
    act(() => vi.advanceTimersByTime(2_000));
    expect(role).toHaveAttribute('data-role-index', '3');

    act(() => vi.advanceTimersByTime(520));

    fireEvent.focus(primaryAction);
    act(() => vi.advanceTimersByTime(2_000));
    expect(role).toHaveAttribute('data-role-index', '3');

    fireEvent.blur(primaryAction, { relatedTarget: document.body });
    hidden = true;
    fireEvent(document, new Event('visibilitychange'));
    act(() => vi.advanceTimersByTime(2_000));
    expect(role).toHaveAttribute('data-role-index', '3');
  });

  test('keeps Experience entries independently collapsible with native details', () => {
    render(<App />);

    const entries = Array.from(document.querySelectorAll<HTMLDetailsElement>('.experience-entry'));
    expect(entries).toHaveLength(6);
    expect(entries.every((entry) => !entry.open)).toBe(true);
    expect(entries.map((entry) => entry.querySelector('.experience-logo')?.getAttribute('data-logo'))).toEqual([
      'huawei', 'huawei', 'huawei', 'rexel', 'unsw', 'utoronto',
    ]);
    expect(
      entries.every((entry) => !entry.querySelector('img')?.getAttribute('src')?.startsWith('/logos/')),
    ).toBe(true);
    expect(entries[4].querySelectorAll('img')).toHaveLength(2);
    expect(entries[4].querySelector('.experience-logo__dark')?.getAttribute('src')).toContain('unsw-dark');

    const summaries = entries.map((entry) => entry.querySelector('summary') as HTMLElement);
    fireEvent.click(summaries[0]);
    fireEvent.click(summaries[1]);
    expect(entries[0]).toHaveAttribute('open');
    expect(entries[1]).toHaveAttribute('open');

    fireEvent.click(summaries[0]);
    expect(entries[0]).not.toHaveAttribute('open');
    expect(entries[1]).toHaveAttribute('open');
  });

  test('starts the Cohere showcase on entry, supports manual switching, and auto-advances while visible', () => {
    vi.useFakeTimers();
    const callbacks = new Map<Element, IntersectionObserverCallback>();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(private callback: IntersectionObserverCallback) {}
      observe = (target: Element) => callbacks.set(target, this.callback);
      disconnect = vi.fn();
      unobserve = vi.fn();
    });
    render(<App />);

    const showcase = screen.getByRole('group', { name: 'Strategic project showcase' });
    const stage = showcase.querySelector('.strategic-showcase');
    expect(stage).toHaveAttribute('data-entered', 'false');

    act(() => vi.advanceTimersByTime(30_000));
    expect(
      within(showcase).getByRole('heading', { name: 'GR Nova 5G FWA Commercial Launch' }),
    ).toBeInTheDocument();
    expect(within(showcase).queryByRole('link', { name: 'Discuss project' })).not.toBeInTheDocument();
    expect(within(showcase).getByText('15K', { selector: 'strong' })).toBeInTheDocument();
    expect(within(showcase).getByText('MetaAAU breakthrough', { selector: 'strong' })).toBeInTheDocument();

    act(() => {
      callbacks.get(showcase)?.(
        [{ isIntersecting: true, target: showcase } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(stage).toHaveAttribute('data-entered', 'true');

    fireEvent.click(within(showcase).getByRole('button', { name: 'Next project' }));
    expect(
      within(showcase).getByRole('heading', { name: 'Greece Vodafone Spring 6 Strategic Partnership' }),
    ).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(30_000));
    expect(
      within(showcase).getByRole('heading', { name: 'Green Antenna Modernization' }),
    ).toBeInTheDocument();

    act(() => {
      callbacks.get(showcase)?.(
        [{ isIntersecting: false, target: showcase } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    expect(
      within(showcase).getByRole('heading', { name: 'Green Antenna Modernization' }),
    ).toBeInTheDocument();
  });

  test('uses the static Fog fallback for reduced motion and cleans up an initialized instance', async () => {
    const reduced = render(<App />);
    await act(async () => Promise.resolve());
    expect(fogFactory).not.toHaveBeenCalled();
    reduced.unmount();

    stubMotion(false);
    const animated = render(<App />);
    await waitFor(() => expect(fogFactory).toHaveBeenCalled());
    const fogOptions = fogFactory.mock.calls[0]?.[0] as Record<string, unknown>;
    const {
      mouseControls,
      touchControls,
      gyroControls,
      minHeight,
      minWidth,
      highlightColor,
      midtoneColor,
      lowlightColor,
      baseColor,
      blurFactor,
      zoom,
      speed,
    } = fogOptions;
    expect({ mouseControls, touchControls, gyroControls, minHeight, minWidth, highlightColor, midtoneColor, lowlightColor, baseColor, blurFactor, zoom, speed }).toEqual({
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      highlightColor: 0x0020ff,
      midtoneColor: 0x00e3ff,
      lowlightColor: 0xbdbdbd,
      baseColor: 0xffffff,
      blurFactor: 0.7,
      zoom: 1,
      speed: 1.5,
    });
    animated.unmount();
    expect(fogDestroy).toHaveBeenCalled();
  });

  test('keeps the fallback and reports a Vanta initialization failure', async () => {
    stubMotion(false);
    const failure = new Error('WebGL unavailable');
    fogFactory.mockImplementationOnce(() => {
      throw failure;
    });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(<App />);
    await waitFor(() => expect(warn).toHaveBeenCalledWith('Hero Fog failed to initialize; using CSS fallback.', failure));
    expect(document.querySelector('.fog-background')).toBeInTheDocument();
  });

  test('scrolls to an initial hash but does not intercept wheel input', async () => {
    history.replaceState(null, '', '/#experience');
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    render(<App />);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(scrollIntoView).toHaveBeenCalled();

    scrollIntoView.mockClear();
    fireEvent.wheel(window, { deltaY: 120 });
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});

const hiddenHeroContent = {
  location: 'Toronto-Waterloo, Canada',
};
