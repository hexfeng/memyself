import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { App } from './app';

const originalScrollIntoView = Element.prototype.scrollIntoView;
const originalScrollTo = window.scrollTo;

describe('App', () => {
  afterEach(() => {
    history.replaceState(null, '', '/');
    Element.prototype.scrollIntoView = originalScrollIntoView;
    window.scrollTo = originalScrollTo;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  test('renders the approved page structure and desktop progress rail', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Xiaoyu Feng' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Section progress' })).toBeInTheDocument();
    expect(document.querySelector('.scene-backdrop__video')).toHaveAttribute('src', '/site-background.mp4');
    expect(document.querySelector('.hero-media')).not.toBeInTheDocument();
    expect(document.querySelector('.aurora-backdrop')).not.toBeInTheDocument();
    expect(document.querySelector('.hero-metrics')).not.toBeInTheDocument();
    const heroActions = document.querySelector('.hero-actions') as HTMLElement;
    expect(within(heroActions).getByRole('link', { name: /Email/ })).toHaveAttribute('href', 'mailto:');
    expect(within(heroActions).getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/xiaoyufeng/',
    );
    expect(within(heroActions).getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/hexfeng');
    expect(screen.getAllByRole('link', { name: /Experience/ })[0]).toHaveAttribute(
      'href',
      '#experience',
    );

    const main = screen.getByRole('main');
    expect(
      within(main)
        .getAllByRole('region')
        .map((section) => section.id),
    ).toEqual(['top', 'experience', 'gtm', 'transformation', 'ecosystem', 'lab', 'contact']);

    const contact = document.getElementById('contact') as HTMLElement;
    expect(within(contact).getByRole('link', { name: /Email/ })).toHaveAttribute('href', 'mailto:');
    expect(within(contact).getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/xiaoyufeng/',
    );
    expect(within(contact).getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/hexfeng');
  });

  test('lets hover and keyboard focus move Experience active state', async () => {
    render(<App />);

    const timeline = screen.getByRole('list', { name: 'Experience timeline' });
    const entries = within(timeline).getAllByRole('listitem');

    expect(entries[0]).toHaveAttribute('data-active', 'true');
    expect(entries[1]).toHaveAttribute('data-active', 'false');
    expect(entries[0].querySelector('.timeline-logo img')).toHaveAttribute('src', '/logos/huawei.png');

    fireEvent.mouseEnter(entries[1]);
    expect(entries[1]).toHaveAttribute('data-active', 'true');

    fireEvent.focus(entries[2]);
    expect(entries[2]).toHaveAttribute('data-active', 'true');
  });

  test('shows the GTM section overview before a project card is active', () => {
    render(<App />);

    const gtm = screen.getByRole('region', { name: 'Strategic Business & GTM Projects' });
    const detail = within(gtm).getByRole('complementary', { name: 'GTM project detail' });

    expect(within(detail).getByText('02 - Strategic Business & GTM')).toBeInTheDocument();
    expect(within(detail).getByRole('heading', { name: 'Strategic Business & GTM Projects' })).toBeInTheDocument();
    expect(
      within(detail).getByText(
        'Translating market signals into product direction and commercial momentum by connecting customer needs, network capabilities, portfolio decisions, and cross-functional execution.',
      ),
    ).toBeInTheDocument();
  });

  test('updates the GTM detail panel from hover, focus, and click', () => {
    render(<App />);

    const gtm = screen.getByRole('region', { name: 'Strategic Business & GTM Projects' });
    const detail = within(gtm).getByRole('complementary', { name: 'GTM project detail' });
    const cards = within(gtm).getAllByRole('button', { name: /Show GTM project/ });

    fireEvent.mouseEnter(cards[0]);
    expect(within(detail).getByRole('heading', { name: 'NOVA 5G FWA Commercial Launch' })).toBeInTheDocument();
    expect(within(detail).getByText('15K subscribers')).toBeInTheDocument();

    fireEvent.focus(cards[1]);
    expect(within(detail).getByRole('heading', { name: 'Antenna Modernization Strategy' })).toBeInTheDocument();

    fireEvent.click(cards[2]);
    expect(within(detail).getByRole('heading', { name: 'Vodafone Spring 6' })).toBeInTheDocument();
  });

  test('renders 28 GTM motion items from four looping project cards', () => {
    render(<App />);

    const gtm = screen.getByRole('region', { name: 'Strategic Business & GTM Projects' });
    const cards = within(gtm).getAllByRole('button', { name: /Show GTM project/ });

    expect(cards).toHaveLength(28);
    expect(cards.map((card) => card.dataset.projectIndex).slice(0, 8)).toEqual([
      '0',
      '1',
      '2',
      '3',
      '0',
      '1',
      '2',
      '3',
    ]);
    expect(within(gtm).getAllByText('Additional Strategic GTM Program')).toHaveLength(7);
  });

  test('scrolls to an initial hash after React mounts the sections', async () => {
    history.replaceState(null, '', '/#experience');
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;

    render(<App />);
    Object.defineProperty(document.getElementById('experience'), 'offsetTop', {
      configurable: true,
      value: 768,
    });
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(scrollTo).toHaveBeenCalledWith({ top: 768, behavior: 'auto' });
  });

  test('smoothly jumps one section per wheel step', () => {
    vi.useFakeTimers();
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));

    render(<App />);
    Object.defineProperty(document.getElementById('top'), 'getBoundingClientRect', {
      value: () => ({ top: 0 }),
    });
    Object.defineProperty(document.getElementById('experience'), 'getBoundingClientRect', {
      value: () => ({ top: 1000 }),
    });
    Object.defineProperty(document.getElementById('experience'), 'offsetTop', {
      configurable: true,
      value: 768,
    });

    fireEvent.wheel(window, { deltaY: 120 });

    expect(scrollTo).toHaveBeenCalledWith({ top: 768, behavior: 'smooth' });
  });

  test('blocks native wheel scrolling while a section jump is locked', () => {
    vi.useFakeTimers();
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));

    render(<App />);
    Object.defineProperty(document.getElementById('top'), 'getBoundingClientRect', {
      value: () => ({ top: 0 }),
    });
    Object.defineProperty(document.getElementById('experience'), 'getBoundingClientRect', {
      value: () => ({ top: 1000 }),
    });
    Object.defineProperty(document.getElementById('experience'), 'offsetTop', {
      configurable: true,
      value: 768,
    });

    window.dispatchEvent(new WheelEvent('wheel', { deltaY: 120, cancelable: true }));
    const lockedWheel = new WheelEvent('wheel', { deltaY: 120, cancelable: true });

    window.dispatchEvent(lockedWheel);

    expect(lockedWheel.defaultPrevented).toBe(true);
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });
});
