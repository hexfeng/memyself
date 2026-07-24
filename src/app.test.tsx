import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { App } from './app';

const originalScrollIntoView = Element.prototype.scrollIntoView;

describe('App', () => {
  afterEach(() => {
    history.replaceState(null, '', '/');
    Element.prototype.scrollIntoView = originalScrollIntoView;
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

  test('switches strategic projects while leaving other project sections static', () => {
    render(<App />);

    const showcase = screen.getByRole('group', { name: 'Strategic project showcase' });
    expect(within(showcase).getByRole('heading', { name: 'Greece Nova 5G FWA Commercial Launch' })).toBeInTheDocument();
    const mediaFrame = showcase.querySelector<HTMLElement>('.strategic-showcase__media-frame');
    expect(mediaFrame).toBeInTheDocument();
    expect(mediaFrame).not.toHaveAttribute('style');

    fireEvent.click(within(showcase).getByRole('button', { name: 'Next project' }));
    expect(within(showcase).getByRole('heading', { name: 'Greece Vodafone Spring 6 Strategic Partnership' })).toBeInTheDocument();

    fireEvent.click(within(showcase).getByRole('button', { name: 'Show project 4: Strategic Business & Product Leadership' }));
    expect(within(showcase).getByRole('heading', { name: 'Strategic Business & Product Leadership' })).toBeInTheDocument();

    const transformation = screen.getByRole('region', {
      name: 'Building the operating system for AI research execution.',
    });
    expect(transformation.querySelectorAll('.project-card')).toHaveLength(3);
  });

  test('scrolls to an initial hash after React mounts the sections', async () => {
    history.replaceState(null, '', '/#experience');
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    render(<App />);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(scrollIntoView).toHaveBeenCalled();
  });

  test('smoothly jumps one section per wheel step', () => {
    vi.useFakeTimers();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));

    render(<App />);
    Object.defineProperty(document.getElementById('top'), 'getBoundingClientRect', {
      value: () => ({ top: 0 }),
    });
    Object.defineProperty(document.getElementById('experience'), 'getBoundingClientRect', {
      value: () => ({ top: 1000 }),
    });

    fireEvent.wheel(window, { deltaY: 120 });

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(scrollIntoView.mock.instances[0]).toBe(document.getElementById('experience'));

  });
});
