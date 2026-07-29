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

  test('keeps the minimal business theme around the authored Cohere panel motion', () => {
    expect(styles).toMatch(/\.project-screen--showcase\s*\{[^}]*background:\s*var\(--page\)/s);
    expect(styles).not.toContain(".site-header[data-section='gtm']");
    expect(styles).toMatch(/\.strategic-showcase\s*\{[^}]*height:\s*clamp\(440px, 37vw, 560px\)/s);
    expect(styles).toMatch(/\.strategic-showcase__copy-shell\s*\{[^}]*width:\s*79%;/s);
    expect(styles).toMatch(/\.strategic-showcase__media\s*\{[^}]*width:\s*70%;/s);
    expect(styles).toMatch(
      /\.strategic-showcase__copy-shell\s*\{[^}]*background:\s*var\(--project-panel\);/s,
    );
    expect(styles).toMatch(
      /\.strategic-showcase__media\s*\{[^}]*clip-path:\s*polygon\(8px 0, 100% 0, 100% 100%, 58px 100%\);/s,
    );
    for (const name of ['showcase-copy-panel-settle', 'showcase-copy-mask-settle', 'showcase-media-panel-expand']) {
      expect(styles).toContain(`animation: ${name} 350ms linear 500ms both`);
    }
    expect(styles).not.toContain('showcase-media-frame-expand');
    expect(styles).toContain('100% { clip-path: polygon(8px 0, 100% 0, 100% 100%, 58px 100%); }');
    expect(styles).toContain(".strategic-showcase__image[src$='greece-nova-5g-fwa.png']");
  });

  test('floats and rounds both showcase cards while the media fills its frame', () => {
    expect(styles).toContain('--showcase-outline: #2c3139');
    expect(styles).toContain('--showcase-shadow: 0 18px 28px rgb(17 19 24 / 18%)');
    expect(styles).toMatch(/\[data-theme='dark'\]\s*\{[^}]*--showcase-outline:\s*#4b515d/s);
    expect(styles).toMatch(/\.strategic-showcase__copy-shell\s*\{[^}]*border:\s*1px solid var\(--showcase-outline\);[^}]*border-right:\s*0;[^}]*border-radius:\s*18px;[^}]*filter:\s*none/s);
    expect(styles).toMatch(/\.strategic-showcase::before\s*\{[^}]*left:\s*0;[^}]*right:\s*0;[^}]*border-radius:\s*18px;[^}]*box-shadow:\s*var\(--showcase-shadow\)/s);
    expect(styles).toMatch(/\.strategic-showcase__media\s*\{[^}]*border:\s*0;[^}]*border-radius:\s*18px;[^}]*background:\s*transparent;[^}]*filter:\s*none/s);
    expect(styles).toMatch(/\.strategic-showcase__media-frame\s*\{[^}]*inset:\s*0;[^}]*border:\s*0;[^}]*border-radius:\s*inherit;[^}]*clip-path:\s*none/s);
    expect(styles).toMatch(/\.strategic-showcase__copy-shell::after,[\s\S]*?background:\s*var\(--showcase-outline\);[^}]*clip-path:\s*polygon/s);
    expect(styles).toMatch(/\.strategic-showcase\[data-entered='true'\][\s\S]*?showcase-seam-reveal 100ms linear 850ms both/s);
    expect(styles).toContain('@keyframes showcase-seam-reveal');
    expect(styles).toContain('@keyframes showcase-border-reveal');
    expect(styles).toContain("translateX(-6%) scale(1.13)");
    expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\.strategic-showcase\s*\{[^}]*gap:\s*16px/s);
    expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\.strategic-showcase__copy-shell\s*\{[^}]*box-shadow:\s*var\(--showcase-shadow\)/s);
  });

  test('styles native Experience disclosure rows and reduced motion', () => {
    expect(styles).toMatch(/\.experience-timeline\s*\{[^}]*display:\s*grid;[^}]*gap:\s*14px/s);
    expect(styles).toMatch(/\.experience-entry\s*\{[^}]*border:\s*1px solid var\(--border\);[^}]*border-radius:\s*6px/s);
    expect(styles).toMatch(/\.experience-entry > summary\s*\{[^}]*min-height:\s*112px/s);
    expect(styles).toContain('.experience-entry[open]');
    expect(styles).toMatch(/\.experience-logo\s*\{[^}]*width:\s*84px;[^}]*height:\s*56px;[^}]*padding:\s*0;[^}]*background:\s*transparent;[^}]*border:\s*0/s);
    expect(styles).toMatch(/\.experience-logo img\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*object-fit:\s*contain/s);
    expect(styles).toContain(".experience-logo[data-logo='utoronto'] img");
    expect(styles).toContain("[data-theme='dark'] .experience-logo[data-logo='huawei'] img");
    expect(styles).toContain("filter: brightness(0) invert(1)");
    expect(styles).toContain("[data-theme='dark'] .experience-logo[data-logo='unsw'] .experience-logo__dark");
    expect(styles).toContain(".experience-logo[data-logo='unsw'] .experience-logo__dark { display: block; filter: grayscale(1)");
    expect(styles).toContain("[data-theme='dark'] .experience-logo[data-logo='rexel'] img { filter: grayscale(1)");
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
    expect(styles).toContain('filter: brightness(1.12) drop-shadow(0 0 .16em #fff)');
  });

  test('uses a full-width translucent fixed header and high-contrast navigation', () => {
    expect(styles).toMatch(/\.site-header\s*\{[^}]*inset:\s*0 0 auto;[^}]*height:\s*72px;[^}]*background:\s*rgb\(255 255 255 \/ 72%\);[^}]*border-bottom:\s*1px solid rgb\(17 19 24 \/ 18%\)/s);
    expect(styles).toMatch(/\[data-theme='dark'\] \.site-header:not\(\[data-solid='true'\]\)\s*\{[^}]*background:\s*rgb\(11 12 15 \/ 72%\);[^}]*border-bottom-color:\s*rgb\(244 245 247 \/ 18%\)/s);
    expect(styles).toMatch(/\.desktop-nav\s*\{[^}]*color:\s*var\(--text\);[^}]*font-weight:\s*600/s);
    expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\.site-header\s*\{[^}]*inset:\s*0 0 auto;[^}]*height:\s*64px/s);
    expect(styles).not.toContain('inset: 14px 3.5vw auto');
  });
});
