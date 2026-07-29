import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const styles = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');

describe('light-first theme styles', () => {
  test('defines the approved light and dark tokens with accessible light accent text', () => {
    expect(styles).toContain('--page: #f7f8fa');
    expect(styles).toContain('--surface: #ffffff');
    expect(styles).toContain('--text: #111318');
    expect(styles).toContain('--text-soft: #5e6470');
    expect(styles).toContain('--border: #dde1e8');
    expect(styles).toContain('--accent: #5576fc');
    expect(styles).toContain('--accent-text: #4563df');
    expect(styles).toContain("[data-theme='dark']");
    expect(styles).toContain('--page: #0b0c0f');
  });

  test('uses opaque surfaces and removes the outgoing global video and glass selectors', () => {
    expect(styles).not.toContain('.scene-backdrop');
    expect(styles).not.toContain('backdrop-filter');
    expect(styles).toContain('.fog-background');
    expect(styles).toContain('.site-header[data-solid=\'true\']');
    expect(styles).toContain('@media (max-width: 767px)');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
  });

  test('keeps the strategic project geometry and theme-aware opaque panels', () => {
    expect(styles).toContain('@keyframes showcase-copy-panel-settle');
    expect(styles).toContain('@keyframes showcase-media-panel-expand');
    expect(styles).toMatch(/\.strategic-showcase__copy-shell\s*\{[^}]*width:\s*79%;/s);
    expect(styles).toMatch(/\.strategic-showcase__media\s*\{[^}]*width:\s*70%;/s);
    expect(styles).toMatch(
      /\.strategic-showcase__copy-shell\s*\{[^}]*background:\s*var\(--project-panel\);/s,
    );
    expect(styles).toMatch(
      /\.strategic-showcase__media\s*\{[^}]*clip-path:\s*polygon\(8px 0, 100% 0, 100% 100%, 58px 100%\);/s,
    );
    expect(styles).toMatch(
      /\.strategic-showcase__progress\s*\{[^}]*grid-template-columns:\s*repeat\(4,/s,
    );
  });

  test('styles native Experience disclosure rows and reduced motion', () => {
    expect(styles).toContain('.experience-entry');
    expect(styles).toContain('.experience-entry > summary');
    expect(styles).toContain('.experience-entry[open]');
    expect(styles).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.rotating-role__item\s*\{[^}]*transform:\s*none/s,
    );
  });

  test('gives every rotating Hero role its own readable color', () => {
    expect(styles.match(/\.rotating-role__item\[data-role-index=/g)).toHaveLength(5);
    expect(styles).toContain(".rotating-role__item[data-role-index='0']");
    expect(styles).toContain(".rotating-role__item[data-role-index='4']");
    expect(styles).toMatch(/\.fog-background canvas\s*\{[^}]*opacity:\s*1/s);
    expect(styles).toContain('rgb(0 32 255 / 30%)');
    expect(styles).toContain('rgb(0 227 255 / 26%)');
    expect(styles).toContain('rgb(189 189 189 / 56%)');
  });

  test('uses restrained Hero type and separated inverse action boxes', () => {
    expect(styles).toMatch(/\.hero h1\s*\{[^}]*font-size:\s*clamp\(52px, 7\.2vw, 112px\)/s);
    expect(styles).toMatch(/\.hero-role-line\s*\{[^}]*font-size:\s*clamp\(27px, 3\.8vw, 56px\)/s);
    expect(styles).toContain('.hero-statement');
    expect(styles).toMatch(/\.hero-actions\s*\{[^}]*gap:\s*12px/s);
    expect(styles).toMatch(/\.hero-action\s*\{[^}]*border:\s*1px solid var\(--text\)/s);
    expect(styles).toMatch(
      /\.hero-action:hover\s*\{[^}]*border-color:\s*var\(--surface\);[^}]*background:\s*var\(--text\);[^}]*color:\s*var\(--surface\)/s,
    );
    expect(styles).not.toContain('.hero-action + .hero-action');
  });

  test('clips outgoing and incoming roles inside a fixed viewport', () => {
    expect(styles).toMatch(/\.hero-role-line\s*\{[^}]*align-items:\s*flex-start/s);
    expect(styles).toMatch(/\.rotating-role\s*\{[^}]*position:\s*relative;[^}]*height:\s*1\.24em;[^}]*overflow:\s*hidden/s);
    expect(styles).toMatch(/\.rotating-role__item\s*\{[^}]*height:\s*100%;[^}]*padding-block:\s*\.07em/s);
    expect(styles).toContain('.rotating-role__item--enter');
    expect(styles).toContain('.rotating-role__item--exit');
    expect(styles).toMatch(/@keyframes role-enter\s*\{[^}]*translateY\(100%\)[\s\S]*?transform:\s*none/s);
    expect(styles).toMatch(/@keyframes role-exit\s*\{[^}]*transform:\s*none[\s\S]*?translateY\(-100%\)/s);
    expect(styles).toMatch(/\.rotating-role\[data-paused='true'\][^{]*\{[^}]*animation-play-state:\s*paused/s);
    expect(styles).toMatch(/\.rotating-role:hover[^{]*\{[^}]*drop-shadow/s);
  });
});
