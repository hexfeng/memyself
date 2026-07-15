import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const styles = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');

describe('dark foundation styles', () => {
  test('defines the restrained white-on-black design tokens', () => {
    expect(styles).toContain('--bg: #000000');
    expect(styles).toContain('--text: #FFFFFF');
    expect(styles).toContain('--text-soft: rgba(255, 255, 255, 0.78)');
    expect(styles).toContain('--text-muted: rgba(255, 255, 255, 0.48)');
    expect(styles).toContain('--line: rgba(255, 255, 255, 0.18)');
    expect(styles).toContain('--accent: #FFFFFF');
    expect(styles).not.toContain('#5EEAD4');
  });

  test('uses natural scroll, glass panels, and no Aurora layer', () => {
    expect(styles).toContain('scroll-snap-type: none');
    expect(styles).toContain('.scene-backdrop');
    expect(styles).toContain('position: fixed');
    expect(styles).toContain('object-fit: cover');
    expect(styles).toContain('@media (max-width: 767px)');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    expect(styles).toContain('backdrop-filter: blur(12px)');
    expect(styles).not.toContain('.aurora-band');
    expect(styles).not.toContain('.hero-fade-cover');
  });

  test('keeps the strategic project background visible and animates the Cohere panel geometry', () => {
    expect(styles).toMatch(
      /\.project-screen--showcase\s*\{[^}]*background:\s*transparent;/s,
    );
    expect(styles).toMatch(
      /\.project-screen--showcase::before\s*\{[^}]*backdrop-filter:\s*blur\(/s,
    );
    expect(styles).toContain('@keyframes showcase-copy-panel-settle');
    expect(styles).toContain('@keyframes showcase-media-panel-expand');
    expect(styles).toMatch(
      /@keyframes showcase-copy-panel-settle[\s\S]*?width:\s*79%;[\s\S]*?width:\s*55%;/,
    );
    expect(styles).toMatch(
      /@keyframes showcase-media-panel-expand[\s\S]*?width:\s*20%;[\s\S]*?width:\s*55%;/,
    );
  });

  test('keeps panel masks and the image on one expansion timeline', () => {
    expect(styles).toMatch(
      /@keyframes showcase-copy-panel-settle[\s\S]*?from\s*\{[^}]*clip-path:\s*polygon\(0 0, 100% 0, 100% 100%, 0 100%\);[^}]*\}[\s\S]*?to\s*\{[^}]*clip-path:\s*polygon\(0 0, 82% 0, 98% 100%, 0 100%\);/,
    );
    expect(styles).toMatch(
      /@keyframes showcase-media-panel-expand[\s\S]*?from\s*\{[^}]*clip-path:\s*polygon\(0 0, 100% 0, 100% 100%, 0 100%\);[^}]*\}[\s\S]*?to\s*\{[^}]*clip-path:\s*polygon\(2% 0, 100% 0, 100% 100%, 18% 100%\);/,
    );
    expect(styles).toContain(
      ".strategic-showcase[data-switching='true'] .strategic-showcase__copy-stage",
    );
    expect(styles).not.toContain('showcase-image-enter-next');
    expect(styles).not.toContain('showcase-image-enter-previous');
  });
});
