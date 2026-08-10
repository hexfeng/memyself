import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { App } from './app';

const { fogFactory, fogDestroy, netFactory, netDestroy } = vi.hoisted(() => ({
  fogFactory: vi.fn(),
  fogDestroy: vi.fn(),
  netFactory: vi.fn(),
  netDestroy: vi.fn(),
}));

vi.mock('three', () => ({ Scene: class Scene {} }));
vi.mock('vanta/dist/vanta.fog.min', () => ({ default: { default: fogFactory } }));
vi.mock('vanta/dist/vanta.net.min', () => ({ default: { default: netFactory } }));

const contributionFixture = Array.from({ length: 14 }, (_, index) => ({
  date: `2026-07-${String(index + 1).padStart(2, '0')}`,
  count: index === 2 ? 2 : index === 9 ? 1 : 0,
  level: index === 2 ? 2 : index === 9 ? 1 : 0,
}));

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
    netFactory.mockReset();
    netDestroy.mockReset();
    fogFactory.mockReturnValue({ destroy: fogDestroy });
    netFactory.mockReturnValue({ destroy: netDestroy });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ contributions: contributionFixture }),
    }));
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
    expect(document.querySelector('#experience .experience-threads .threads-container')).toBeInTheDocument();
    expect(document.querySelector('#experience .threads-container canvas')).not.toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Section progress' })).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(
      within(main)
        .getAllByRole('region')
        .map((section) => section.id),
    ).toEqual(['top', 'experience', 'gtm', 'transformation', 'lab', 'beside', 'contact']);

    const transformation = screen.getByRole('region', { name: 'Building momentum through engagement, innovation, and ecosystems.' });
    expect(transformation.querySelectorAll('.engagement-point')).toHaveLength(3);
    expect(within(transformation).queryByRole('heading', { name: 'AI Transformation' })).not.toBeInTheDocument();
    for (const title of ['Executive & Customer Engagement', 'Joint Innovation', 'University & Research Ecosystem']) {
      expect(within(transformation).getByRole('heading', { name: title })).toBeInTheDocument();
    }
    expect(within(transformation).getByRole('img', { name: 'Engagement moments' })).toBeInTheDocument();
    expect(transformation.querySelectorAll('.engagement-drift-wall__static img')).toHaveLength(8);
    expect(within(transformation).queryByText('Selected ecosystem')).not.toBeInTheDocument();
    const ecosystem = screen.getByRole('group', { name: 'Selected ecosystem' });
    expect(within(ecosystem).getAllByRole('img')).toHaveLength(11);
    expect(within(ecosystem).getByRole('img', { name: 'COSMOTE Greece' })).toHaveAttribute(
      'src',
      '/logos/engagement/04_cosmote-greece.svg',
    );
    expect(within(ecosystem).getByRole('img', { name: 'University of Waterloo' }).closest('li')).toHaveAttribute(
      'data-preserve-detail',
      'true',
    );

    const beside = screen.getByRole('region', { name: 'A life shaped by curiosity, places, and people.' });
    expect(beside.querySelectorAll('.beside-work__item')).toHaveLength(3);
    expect(beside.querySelectorAll('.beside-work__item img')).toHaveLength(3);
    for (const title of ['Travelling', 'Photography', 'Gaming']) {
      expect(within(beside).getByRole('heading', { name: title })).toBeInTheDocument();
    }
    const travellingFolder = within(beside).getByRole('button', { name: 'Toggle Travelling folder' });
    expect(travellingFolder).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(travellingFolder);
    expect(travellingFolder).toHaveAttribute('aria-pressed', 'true');
    expect(travellingFolder.closest('.beside-work__item')).toHaveAttribute('data-open', 'true');
    expect(document.querySelector('.screen--contact')).toHaveClass('contact-band');
  });

  test('opens the Photography depth gallery after the cover zoom and keeps its cover first', () => {
    vi.useFakeTimers();
    stubMotion(false);
    render(<App />);

    const trigger = screen.getByRole('button', { name: 'Open Photography gallery' });
    const card = trigger.closest('.beside-work__item');
    fireEvent.click(trigger);
    expect(card).toHaveAttribute('data-gallery-opening', 'true');
    expect(screen.queryByRole('dialog', { name: 'Photography gallery' })).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(420));
    const gallery = screen.getByRole('dialog', { name: 'Photography gallery' });
    expect(gallery.querySelectorAll('.photo-gallery__card')).toHaveLength(9);
    expect(gallery.querySelectorAll(".photo-gallery__card[data-buffer='true']")).toHaveLength(2);
    expect(gallery.querySelectorAll(".photo-gallery__card[data-side='left']:not([data-buffer='true'])")).toHaveLength(3);
    expect(gallery.querySelectorAll(".photo-gallery__card[data-side='right']:not([data-buffer='true'])")).toHaveLength(3);
    const firstPhoto = within(gallery).getByRole('button', { name: 'Photo 1 of 58' });
    expect(firstPhoto.querySelector('img')).toHaveAttribute('src', '/images/beside-work/photography.webp');
    expect(within(gallery).getByText('1 / 58')).toBeInTheDocument();

    fireEvent.click(within(gallery).getByRole('button', { name: 'Next photo' }));
    expect(gallery.querySelector('.photo-gallery__stage')).toHaveAttribute('data-direction', 'next');
    expect(within(gallery).getByRole('button', { name: 'Photo 2 of 58' })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(gallery.querySelector('.photo-gallery__stage')).toHaveAttribute('data-direction', 'previous');
    expect(within(gallery).getByRole('button', { name: 'Photo 1 of 58' })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    act(() => vi.advanceTimersByTime(20));
    expect(screen.queryByRole('dialog', { name: 'Photography gallery' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  test('renders the dedicated Thinking Lab with a live contribution summary and six linked image cards', async () => {
    render(<App />);

    const lab = screen.getByRole('region', { name: 'Side Projects — ideas become useful when they are made tangible.' });
    expect(within(lab).getByRole('heading', { name: 'Building in public' })).toBeInTheDocument();
    await waitFor(() => expect(within(lab).getByRole('img', { name: '3 GitHub contributions in the last year' })).toBeInTheDocument());
    expect(within(lab).getByText(/3 contributions/)).toBeInTheDocument();
    expect(lab.querySelectorAll('.lab-project-card')).toHaveLength(6);
    expect(lab.querySelectorAll('.lab-project-card__media')).toHaveLength(6);
    const finSightLink = within(lab).getByRole('link', { name: /View FinSight on GitHub/ });
    expect(finSightLink.querySelectorAll('.lab-project-card__image')).toHaveLength(2);
    expect(finSightLink.querySelector('.lab-project-card__image--primary')).toHaveAttribute(
      'src',
      '/images/thinking-lab/finsight-dashboard.jpg',
    );
    expect(finSightLink.querySelector('.lab-project-card__image--hover')).toHaveAttribute(
      'src',
      '/images/thinking-lab/finsight-investments.jpg',
    );
    expect(finSightLink).toHaveAttribute(
      'href',
      'https://github.com/hexfeng/Accumulate',
    );
    const websiteLink = within(lab).getByRole('link', { name: /View This Website on GitHub/ });
    expect(websiteLink).toHaveClass('lab-project-card--swap-dark');
    expect(websiteLink.querySelector('.lab-project-card__image--primary')).toHaveAttribute(
      'src',
      '/images/thinking-lab/this-website-light.jpg',
    );
    expect(websiteLink.querySelector('.lab-project-card__image--hover')).toHaveAttribute(
      'src',
      '/images/thinking-lab/this-website-dark.jpg',
    );
    expect(websiteLink).toHaveAttribute('href', 'https://github.com/hexfeng/memyself');
    expect(lab).not.toHaveTextContent('01');
    expect(lab).not.toHaveTextContent('02');
  });

  test('keeps the real contribution snapshot when the live request is unavailable', () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<App />);

    const chart = screen.getByRole('img', { name: '301 GitHub contributions in the last year' });
    expect(chart).toHaveAttribute('data-status', 'snapshot');
    expect(screen.getByText(/301 contributions/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View GitHub/ })).toHaveAttribute('href', 'https://github.com/hexfeng');
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
    expect(Array.from(entries[0].querySelectorAll('.experience-detail li')).map((item) => item.textContent)).toEqual([
      'Oversaw a multi-million-dollar R&D portfolio across four research labs, managing industry–academia collaborations in Generative AI, LLMs, cybersecurity, and next-generation software engineering while improving governance for 10+ research projects across planning, budgeting, risk control, scheduling, and resource allocation.',
      'Led RC-level AI transformation and external ecosystem engagement, including AI-enabled workflow adoption, external Blue Zone AI Lab development, AI community collaborations, partnerships with events across universities and organizations(HTN).',
    ]);

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
    const greenCopy = showcase.querySelector('.strategic-showcase__copy--enter') as HTMLElement;
    expect(within(greenCopy).getByText('20%', { selector: 'strong' })).toBeInTheDocument();
    expect(within(greenCopy).getByText('15%', { selector: 'strong' })).toBeInTheDocument();
    expect(within(greenCopy).getByText('5+', { selector: 'strong' })).toBeInTheDocument();
    expect(greenCopy.querySelectorAll('.strategic-showcase__outcome-icon')).toHaveLength(3);

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
    expect(netFactory).not.toHaveBeenCalled();
    reduced.unmount();

    stubMotion(false);
    const animated = render(<App />);
    await waitFor(() => expect(fogFactory).toHaveBeenCalled());
    await waitFor(() => expect(netFactory).toHaveBeenCalled());
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
    expect(netDestroy).toHaveBeenCalled();
  });

  test('uses black and white for the Thinking Lab Net', async () => {
    stubMotion(false);
    render(<App />);

    await waitFor(() => expect(netFactory).toHaveBeenCalledTimes(1));
    expect(netFactory.mock.calls[0]?.[0]).toMatchObject({ color: 0x111318 });

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    await waitFor(() => expect(netFactory).toHaveBeenCalledTimes(2));
    expect(netFactory.mock.calls[1]?.[0]).toMatchObject({ color: 0xffffff });
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

  test('keeps the full-section fallback when the Thinking Lab Net cannot initialize', async () => {
    stubMotion(false);
    const failure = new Error('WebGL unavailable');
    netFactory.mockImplementationOnce(() => {
      throw failure;
    });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(<App />);
    await waitFor(() => expect(warn).toHaveBeenCalledWith('Thinking Lab Net failed to initialize; using CSS fallback.', failure));
    expect(document.querySelector('.net-background')).toBeInTheDocument();
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
