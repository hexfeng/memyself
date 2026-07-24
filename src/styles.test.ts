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
    expect(styles).toMatch(/\.strategic-showcase__media\s*\{[^}]*width:\s*70%;/s);

    for (const name of ['showcase-copy-panel-settle', 'showcase-media-panel-expand']) {
      const start = styles.indexOf(`@keyframes ${name} {`);
      const block = styles.slice(start, styles.indexOf('\n}', start));
      expect(block).not.toMatch(/\bwidth:/);
      expect(block).not.toMatch(/^\s*(?:25|50)%\s*\{/m);
    }
  });

  test('builds the final panels with parallel edges and a constant gap', () => {
    expect(styles).toMatch(
      /\.strategic-showcase__copy-shell\s*\{[^}]*clip-path:\s*polygon\(0 0, calc\(36\.7089% \+ 8px\) 0, calc\(36\.7089% \+ 58px\) 100%, 0 100%\);/s,
    );
    expect(styles).toMatch(
      /\.strategic-showcase__media\s*\{[^}]*clip-path:\s*polygon\(8px 0, 100% 0, 100% 100%, 58px 100%\);/s,
    );

    for (const width of [900, 1190, 1360]) {
      const copyTop = width * 0.29 + 8;
      const copyBottom = width * 0.29 + 58;
      const mediaTop = width * 0.3 + 8;
      const mediaBottom = width * 0.3 + 58;
      expect(mediaTop - copyTop).toBeCloseTo(mediaBottom - copyBottom, 5);
    }
  });

  test('accelerates the lower edge smoothly until both edges share one speed', () => {
    expect(styles).toMatch(
      /@keyframes showcase-media-panel-expand[\s\S]*?8%\s*\{[^}]*polygon\(calc\(65\.7143% \+ 0\.64px\) 0, 100% 0, 100% 100%, calc\(65\.7143% \+ 22\.64px\) 100%\)[^}]*\}[\s\S]*?35%\s*\{[^}]*polygon\(calc\(46\.4286% \+ 2\.8px\) 0, 100% 0, 100% 100%, calc\(46\.4286% \+ 52\.8px\) 100%\)[^}]*\}[\s\S]*?100%\s*\{[^}]*polygon\(8px 0, 100% 0, 100% 100%, 58px 100%\)/,
    );

    const checkpoints = [
      { progress: 0, difference: 0 },
      { progress: 0.08, difference: 22 },
      { progress: 0.16, difference: 36 },
      { progress: 0.24, difference: 45 },
      { progress: 0.3, difference: 48.5 },
      { progress: 0.35, difference: 50 },
    ];
    const topTravel = 600;
    const lowerSpeeds = checkpoints.slice(1).map((point, index) => {
      const previous = checkpoints[index];
      const distance =
        (point.progress - previous.progress) * topTravel -
        (point.difference - previous.difference);
      return distance / (point.progress - previous.progress);
    });
    expect(lowerSpeeds).toEqual([...lowerSpeeds].sort((a, b) => a - b));
    expect(lowerSpeeds.at(-1)).toBeLessThan(topTravel);
  });

  test('keeps all panel masks on one non-overshooting timeline', () => {
    for (const name of [
      'showcase-copy-panel-settle',
      'showcase-copy-mask-settle',
      'showcase-media-panel-expand',
      'showcase-media-frame-expand',
    ]) {
      expect(styles).toContain(`animation: ${name} 350ms linear 500ms both;`);
    }
    expect(styles).toMatch(
      /@keyframes showcase-copy-panel-settle[\s\S]*?100%\s*\{[^}]*polygon\(0 0, calc\(36\.7089% \+ 8px\) 0, calc\(36\.7089% \+ 58px\) 100%, 0 100%\)/,
    );
    expect(styles).toContain(
      ".strategic-showcase[data-switching='true'] .strategic-showcase__copy-stage",
    );
    expect(styles).not.toContain('showcase-image-enter-next');
    expect(styles).not.toContain('showcase-image-enter-previous');
  });

  test('slightly enlarges and recenters only the Nova project image', () => {
    expect(styles).toMatch(
      /\.strategic-showcase__image\[src\$='greece-nova-5g-fwa\.png'\]\s*\{[^}]*transform:\s*translateX\(-2%\) scale\(1\.04\);/s,
    );
  });

  test('lays out four strategic project progress controls in one row', () => {
    expect(styles).toMatch(
      /\.strategic-showcase__progress\s*\{[^}]*grid-template-columns:\s*repeat\(4,/s,
    );
  });

  test('uses a taller 30/70 showcase with homepage glass and full-bleed images', () => {
    expect(styles).toMatch(/\.strategic-showcase\s*\{[^}]*height:\s*clamp\(440px, 37vw, 560px\);/s);
    expect(styles).toMatch(
      /\.strategic-showcase__copy-shell\s*\{[^}]*background:\s*rgba\(0, 0, 0, 0\.36\);[^}]*box-shadow:\s*0 18px 42px rgba\(0, 0, 0, 0\.24\),\s*inset 0 1px 0 rgba\(164, 210, 225, 0\.2\),\s*inset 0 -1px 0 rgba\(0, 0, 0, 0\.32\);/s,
    );
    expect(styles).toMatch(/\.strategic-showcase__copy-stage\s*\{[^}]*background:\s*transparent;/s);
    expect(styles).toMatch(/\.strategic-showcase__image\s*\{[^}]*object-fit:\s*cover;/s);
    expect(styles).toMatch(/\.strategic-showcase__statement h3\s*\{[^}]*color:\s*#ffffff;/s);
  });

  test('keeps a sharp trapezoid corner and fills the media frame', () => {
    expect(styles).toMatch(
      /\.strategic-showcase__media\s*\{[^}]*border-radius:\s*0 22px 22px 22px;[^}]*background:\s*rgba\(0, 0, 0, 0\.36\);/s,
    );
    expect(styles).toMatch(/\.strategic-showcase__media\s*\{[^}]*clip-path:\s*polygon\(8px 0, 100% 0, 100% 100%, 58px 100%\);/s);
    expect(styles).toMatch(
      /\.strategic-showcase__media-frame\s*\{[^}]*inset:\s*28px;[^}]*border-radius:\s*0 10px 10px 10px;[^}]*background:\s*rgba\(0, 0, 0, 0\.36\);[^}]*clip-path:\s*polygon\(11px 0, 100% 0, 100% 100%, 55px 100%\);/s,
    );
    expect(styles).not.toContain('.strategic-showcase__media-frame::before');
    expect(styles).not.toContain('.strategic-showcase__media-frame::after');
    expect(styles).not.toMatch(/\.strategic-showcase__image\s*\{[^}]*mask-image:/s);
    expect(styles).toContain('100% { clip-path: polygon(8px 0, 100% 0, 100% 100%, 58px 100%); }');
    expect(styles).toContain('100% { clip-path: polygon(11px 0, 100% 0, 100% 100%, 55px 100%); }');
  });
});
