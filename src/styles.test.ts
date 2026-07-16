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

  test('keeps the strategic project background visible and animates fixed panel geometry', () => {
    expect(styles).toMatch(
      /\.project-screen--showcase\s*\{[^}]*background:\s*transparent;/s,
    );
    expect(styles).toMatch(
      /\.project-screen--showcase::before\s*\{[^}]*backdrop-filter:\s*blur\(/s,
    );
    expect(styles).toContain('@keyframes showcase-copy-panel-settle');
    expect(styles).toContain('@keyframes showcase-media-panel-expand');
    expect(styles).toMatch(/\.strategic-showcase__copy-shell\s*\{[^}]*width:\s*79%;/s);
    expect(styles).toMatch(/\.strategic-showcase__media\s*\{[^}]*width:\s*55%;/s);

    for (const name of ['showcase-copy-panel-settle', 'showcase-media-panel-expand']) {
      const start = styles.indexOf(`@keyframes ${name} {`);
      const block = styles.slice(start, styles.indexOf('\n}', start));
      expect(block).not.toMatch(/\bwidth:/);
      expect(block).not.toMatch(/\b(?:25|50|75)%/);
    }
  });

  test('keeps panel masks and the image on one expansion timeline', () => {
    expect(styles).toMatch(
      /@keyframes showcase-copy-panel-settle[\s\S]*?from\s*\{[^}]*clip-path:\s*polygon\(0 0, 100% 0, 100% 100%, 0 100%\);[^}]*\}[\s\S]*?to\s*\{[^}]*clip-path:\s*polygon\(0 0, 57\.0886% 0, 68\.2278% 100%, 0 100%\);/,
    );
    expect(styles).toMatch(
      /@keyframes showcase-media-panel-expand[\s\S]*?from\s*\{[^}]*clip-path:\s*polygon\(63\.6364% 0, 100% 0, 100% 100%, 63\.6364% 100%\);[^}]*\}[\s\S]*?to\s*\{[^}]*clip-path:\s*polygon\(2% 0, 100% 0, 100% 100%, 18% 100%\);/,
    );
    expect(styles).toContain(
      ".strategic-showcase[data-switching='true'] .strategic-showcase__copy-stage",
    );
    expect(styles).not.toContain('showcase-image-enter-next');
    expect(styles).not.toContain('showcase-image-enter-previous');
  });

  test('keeps the animated panel edges from crossing between keyframes', () => {
    function readFrames(name: string, side: 'copy' | 'media') {
      const start = styles.indexOf(`@keyframes ${name} {`);
      const block = styles.slice(start, styles.indexOf('\n}', start));

      return [...block.matchAll(/(from|to|\d+%)\s*\{\s*clip-path:\s*polygon\(([^)]+)\);\s*\}/g)].map(
        ([, label, polygon]) => {
          const points = polygon.split(',').map((point) => Number.parseFloat(point.trim()));
          return {
            label,
            offset: label === 'from' ? 0 : label === 'to' ? 1 : Number.parseFloat(label) / 100,
            top: side === 'copy' ? points[1] : points[0],
            bottom: side === 'copy' ? points[2] : points[3],
          };
        },
      );
    }

    const copy = readFrames('showcase-copy-panel-settle', 'copy');
    const media = readFrames('showcase-media-panel-expand', 'media');
    expect(copy.map(({ offset }) => offset)).toEqual(media.map(({ offset }) => offset));

    for (let frame = 0; frame <= 100; frame += 1) {
      const progress = frame / 100;
      const index = Math.min(copy.findIndex(({ offset }) => offset >= progress), copy.length - 1);
      const previous = Math.max(0, index - 1);
      const span = copy[index].offset - copy[previous].offset || 1;
      const localProgress = (progress - copy[previous].offset) / span;
      const interpolate = (from: number, to: number) => from + (to - from) * localProgress;
      const copyWidth = 79;
      const mediaWidth = 55;

      for (const edge of ['top', 'bottom'] as const) {
        const copyEdge = copyWidth * interpolate(copy[previous][edge], copy[index][edge]) / 100;
        const mediaEdge = 100 - mediaWidth + mediaWidth * interpolate(media[previous][edge], media[index][edge]) / 100;
        expect(mediaEdge - copyEdge).toBeGreaterThanOrEqual(0.75);
      }
    }
  });
});
