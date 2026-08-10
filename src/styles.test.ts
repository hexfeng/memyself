import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const styles = readFileSync(join(process.cwd(), 'src', 'styles.css'), 'utf8');
const engagementEffects = readFileSync(join(process.cwd(), 'src', 'engagement-effects.tsx'), 'utf8');

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

  test('uses opaque content surfaces and removes the outgoing global video selector', () => {
    expect(styles).not.toContain('.scene-backdrop');
    expect(styles).toContain('.fog-background');
    expect(styles).toContain('.site-header[data-solid=\'true\']');
    expect(styles).toContain('@media (max-width: 767px)');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
  });

  test('uses one combined transformation page and a compact dark contact band', () => {
    expect(styles).toMatch(/\.transformation-main\s*\{[^}]*grid-template-columns:\s*minmax\(330px,/s);
    expect(styles).toMatch(/\.transformation-layout \.section-copy\s*\{[^}]*max-width:\s*none/s);
    expect(styles).toMatch(/\.engagement-points\s*\{[^}]*grid-template-rows:\s*repeat\(3,/s);
    expect(styles).toMatch(/\.engagement-drift-wall\s*\{[^}]*height:\s*540px;[^}]*background:\s*transparent;[^}]*mask-image:\s*linear-gradient/s);
    expect(styles).toMatch(/\.engagement-drift-wall__plane\s*\{[^}]*transform:\s*translate\(-50%, -50%\) scale\(1\.18\) translateZ\(-270px\)/s);
    expect(engagementEffects).not.toContain('pointerRef');
    expect(engagementEffects).not.toContain('wallHoveredRef');
    expect(engagementEffects).not.toContain('rotateX');
    expect(engagementEffects).toContain('const target = hoveredColumnRef.current === index ? 0 : baseVelocities[index]');
    expect(engagementEffects).toContain("if (event.pointerType !== 'mouse') return");
    expect(styles).toMatch(/\.engagement-logo-band\s*\{[^}]*width:\s*100%;[^}]*padding-block:\s*10px;[^}]*background:\s*rgb\(255 255 255 \/ 42%\)/s);
    expect(styles).toMatch(/\.engagement-logo-loop__item img\s*\{[^}]*filter:\s*grayscale\(1\) brightness\(0\) drop-shadow\([^;]+;[^}]*transform:\s*translateY\(var\(--logo-offset-y\)\)/s);
    expect(styles).toMatch(/\[data-theme='dark'\] \.engagement-logo-loop__item img\s*\{[^}]*filter:\s*grayscale\(1\) brightness\(0\) invert\(1\) drop-shadow\(/s);
    expect(styles).toContain(".engagement-logo-loop__item[data-preserve-detail='true'] img");
    expect(styles).toContain("[data-theme='dark'] .engagement-logo-band");
    expect(engagementEffects).not.toContain('isHovered');
    expect(engagementEffects).not.toContain('onMouseEnter');
    expect(styles).toMatch(/\.beside-work\s*\{[^}]*background:\s*var\(--surface\)/s);
    expect(styles).toMatch(/\.beside-work__layout \.section-copy\s*\{[^}]*max-width:\s*none/s);
    expect(styles).toMatch(/\.beside-work__items\s*\{[^}]*grid-template-columns:\s*repeat\(3,/s);
    expect(styles).toMatch(/\.beside-work__item\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column/s);
    expect(styles).toMatch(/\.beside-work__item > img,[\s\S]*?\.beside-work__photo-collage\s*\{[^}]*aspect-ratio:\s*3\s*\/\s*2/s);
    expect(styles).toMatch(/\.beside-work__photo-collage\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\);[^}]*grid-template-rows:\s*repeat\(2, minmax\(0, 1fr\)\);[^}]*gap:\s*3px/s);
    expect(styles).toMatch(/\.beside-work__photo-collage img\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*object-fit:\s*cover/s);
    expect(styles).toMatch(/\.beside-work__item-content\s*\{[^}]*flex:\s*1/s);
    expect(styles).toMatch(/img\[src\$='world-low-pixels\.svg'\]\s*\{[^}]*background:\s*#000;[^}]*object-fit:\s*contain/s);
    expect(styles).toMatch(/\.beside-work__item::before\s*\{[^}]*opacity:\s*0;[^}]*transform:\s*translateY\(-4px\) scale\(\.97\)/s);
    expect(styles).toContain(".beside-work__item:is(:hover, [data-open='true']) > img");
    expect(styles).toContain(".beside-work__item:is(:hover, [data-open='true']) .beside-work__photo-collage");
    expect(styles).toContain('.beside-work__trigger:focus-visible');
    expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\.beside-work__item-content\s*\{[^}]*padding:\s*28px 18px 50px/s);
    expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.beside-work__item:is\([^}]*transform:\s*none/s);
    expect(styles).toMatch(/\.strategic-projects__header \.section-copy\s*\{[^}]*max-width:\s*none/s);
    expect(styles).toMatch(/\.contact-band\s*\{[^}]*min-height:\s*clamp\(320px, 34svh, 420px\);[^}]*background:\s*#0b0c0f/s);
    expect(styles).toMatch(/\[data-theme='dark'\] \.contact-band\s*\{[^}]*background:\s*var\(--surface-alt\)/s);
  });

  test('keeps the minimal business theme around the authored Cohere panel motion', () => {
    expect(styles).toMatch(/\.section-copy h2\s*\{[^}]*text-wrap:\s*pretty/s);
    expect(styles).toMatch(/\.project-screen--showcase\s*\{[^}]*background:\s*var\(--page\)/s);
    expect(styles).not.toContain(".site-header[data-section='gtm']");
    expect(styles).toMatch(/\.strategic-showcase\s*\{[^}]*height:\s*clamp\(440px, 37vw, 560px\)/s);
    expect(styles).toMatch(/\.strategic-showcase__copy-shell\s*\{[^}]*width:\s*79%;/s);
    expect(styles).toMatch(/\.strategic-showcase__media\s*\{[^}]*width:\s*71%;/s);
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
    expect(styles).not.toContain('--showcase-outline');
    expect(styles).toContain('--showcase-shadow: 0 18px 28px rgb(17 19 24 / 18%)');
    expect(styles).toMatch(/\.strategic-showcase__copy-shell\s*\{[^}]*border:\s*0;[^}]*border-radius:\s*18px;[^}]*filter:\s*none/s);
    expect(styles).toMatch(/\.strategic-showcase::before\s*\{[^}]*left:\s*0;[^}]*right:\s*0;[^}]*border-radius:\s*18px;[^}]*box-shadow:\s*var\(--showcase-shadow\)/s);
    expect(styles).toMatch(/\.strategic-showcase__media\s*\{[^}]*border:\s*0;[^}]*border-radius:\s*18px;[^}]*background:\s*transparent;[^}]*filter:\s*none/s);
    expect(styles).toMatch(/\.strategic-showcase__media-frame\s*\{[^}]*inset:\s*0;[^}]*border:\s*0;[^}]*border-radius:\s*inherit;[^}]*clip-path:\s*none/s);
    expect(styles).not.toContain('.strategic-showcase__copy-shell::after');
    expect(styles).not.toContain('showcase-seam-reveal');
    expect(styles).not.toContain('showcase-border-reveal');
    expect(styles).toMatch(/\.strategic-showcase__image\[src\$='greece-nova-5g-fwa\.png'\]\s*\{[^}]*object-fit:\s*contain;[^}]*background:\s*#fff;[^}]*transform:\s*none/s);
    expect(styles).not.toContain('background: #f3f4f6');
    expect(styles).toMatch(/\[data-theme='light'\] \.strategic-showcase:has\(\.strategic-showcase__image--enter\[src\$='greece-nova-5g-fwa\.png'\]\) \.strategic-showcase__media-frame::after\s*\{[^}]*width:\s*140px;[^}]*background:\s*linear-gradient\(96deg, rgb\(17 19 24 \/ 8%\), transparent 72%\)/s);
    expect(styles).toMatch(/\.strategic-showcase__copy\[data-project-index='0'\] \.strategic-showcase__statement h3\s*\{[^}]*font-size:\s*clamp\(28px, 2\.3vw, 36px\)/s);
    expect(styles).toMatch(/\.strategic-showcase__outcomes\s*\{[^}]*display:\s*grid;[^}]*list-style:\s*none/s);
    expect(styles).toMatch(/\.strategic-showcase__outcomes li\s*\{[^}]*font-size:\s*13px/s);
    expect(styles).toMatch(/\.strategic-showcase__copy:has\(\.strategic-showcase__outcomes\) \.strategic-showcase__statement\s*\{[^}]*margin:\s*clamp\(34px, 4\.5vh, 52px\) 0 0/s);
    expect(styles).toMatch(/\.strategic-showcase__outcomes li\.strategic-showcase__outcome--icon\s*\{[^}]*grid-template-columns:\s*24px 1fr/s);
    expect(styles).toMatch(/\.strategic-showcase__footer \.strategic-showcase__outcome-icon\s*\{[^}]*border:\s*1px solid var\(--border\);[^}]*color:\s*var\(--accent-text\)/s);
    expect(styles).toMatch(/\.strategic-showcase__footer \.strategic-showcase__outcome-copy\s*\{[^}]*font-size:\s*13px;[^}]*line-height:\s*1\.65/s);
    expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\.strategic-showcase\s*\{[^}]*gap:\s*16px/s);
    expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\.strategic-showcase__copy-shell\s*\{[^}]*box-shadow:\s*var\(--showcase-shadow\)/s);
  });

  test('builds Thinking Lab as a full Net canvas with six floating image cards', () => {
    expect(styles).toMatch(/\.net-background\s*\{[^}]*position:\s*absolute;[^}]*inset:\s*0/s);
    expect(styles).toContain('rgb(17 19 24 / 38%)');
    expect(styles).toContain('rgb(255 255 255 / 24%)');
    expect(styles).toMatch(/\.thinking-lab__overview\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:/s);
    expect(styles).toMatch(/\.thinking-lab__overview\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1\.08fr\) minmax\(660px, \.92fr\)/s);
    expect(styles).toMatch(/@media \(max-width: 1280px\)[\s\S]*?\.thinking-lab__overview\s*\{[^}]*grid-template-columns:\s*1fr/s);
    expect(styles).toMatch(/\.thinking-lab__projects\s*\{[^}]*grid-template-columns:\s*repeat\(3,/s);
    expect(styles).toMatch(/\.lab-project-card\s*\{[^}]*grid-template-columns:\s*48%[^}]*border-radius:\s*16px;[^}]*box-shadow:/s);
    expect(styles).toMatch(/\.lab-project-card--preview\s*\{[^}]*grid-template-columns:\s*52%/s);
    expect(styles).toMatch(/@media \(min-width:\s*1051px\)[\s\S]*?\.lab-project-card--preview\s*\{[^}]*min-height:\s*226px/s);
    expect(styles).toMatch(/\.lab-project-card__image\s*\{[^}]*object-fit:\s*cover/s);
    expect(styles).toMatch(/\.lab-project-card__media--contain\s*\{[^}]*background:\s*#eef1f5/s);
    expect(styles).toMatch(/\[data-theme='dark'\] \.lab-project-card__media--contain\s*\{[^}]*background:\s*var\(--surface-alt\)/s);
    expect(styles).toMatch(/\.lab-project-card__media--contain \.lab-project-card__image\s*\{[^}]*object-fit:\s*contain;[^}]*object-position:\s*center/s);
    expect(styles).toMatch(/\.lab-project-card--swap-dark \.lab-project-card__image\s*\{[^}]*right:\s*auto;[^}]*width:\s*115%;[^}]*max-width:\s*none;[^}]*object-position:\s*left center/s);
    expect(styles).toMatch(/\.lab-project-card__image--hover\s*\{[^}]*opacity:\s*0/s);
    expect(styles).toMatch(/@media \(hover:\s*hover\)[\s\S]*?\.lab-project-card--preview:hover \.lab-project-card__image--primary\s*\{[^}]*opacity:\s*0/s);
    expect(styles).toMatch(/@media \(hover:\s*hover\)[\s\S]*?\.lab-project-card:hover \.lab-project-card__image--hover\s*\{[^}]*opacity:\s*1/s);
    expect(styles).toMatch(/\[data-theme='dark'\] \.lab-project-card--swap-dark \.lab-project-card__image--primary\s*\{[^}]*opacity:\s*0/s);
    expect(styles).toMatch(/\[data-theme='dark'\] \.lab-project-card--swap-dark \.lab-project-card__image--hover\s*\{[^}]*opacity:\s*1/s);
    expect(styles).toMatch(/@media \(hover:\s*hover\)[\s\S]*?\[data-theme='dark'\] \.lab-project-card--swap-dark:hover \.lab-project-card__image--primary\s*\{[^}]*opacity:\s*1/s);
    expect(styles).toMatch(/@media \(hover:\s*hover\)[\s\S]*?\[data-theme='dark'\] \.lab-project-card--swap-dark:hover \.lab-project-card__image--hover\s*\{[^}]*opacity:\s*0/s);
    expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\.thinking-lab__projects\s*\{[^}]*grid-template-columns:\s*1fr/s);
  });

  test('styles native Experience disclosure rows and reduced motion', () => {
    expect(styles).toMatch(/\.experience-timeline\s*\{[^}]*display:\s*grid;[^}]*gap:\s*14px/s);
    expect(styles).toMatch(/\.experience-entry\s*\{[^}]*border:\s*1px solid var\(--border\);[^}]*border-radius:\s*6px/s);
    expect(styles).toMatch(/\.experience-entry\s*\{[^}]*background:\s*rgb\(255 255 255 \/ 42%\);[^}]*backdrop-filter:\s*blur\(6px\)/s);
    expect(styles).toContain("[data-theme='dark'] .experience-entry { background: rgb(24 27 34 / 38%); }");
    expect(styles).toMatch(/\.experience-detail ul\s*\{[^}]*list-style-type:\s*disc/s);
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

  test('progressively solidifies the frosted fixed header while scrolling', () => {
    expect(styles).toMatch(/\.site-header\s*\{[^}]*inset:\s*0 0 auto;[^}]*height:\s*72px;[^}]*background:\s*rgb\(255 255 255 \/ 28%\);[^}]*backdrop-filter:\s*blur\(18px\) saturate\(145%\)/s);
    expect(styles).toContain('@keyframes header-scroll-light');
    expect(styles).toContain('@keyframes header-scroll-dark');
    expect(styles).toMatch(/@supports \(animation-timeline: scroll\(\)\)[\s\S]*?animation-timeline:\s*scroll\(root block\);[^}]*animation-range:\s*0 72vh/s);
    expect(styles).toMatch(/\.desktop-nav\s*\{[^}]*color:\s*var\(--text\);[^}]*font-weight:\s*600/s);
    expect(styles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\.site-header\s*\{[^}]*inset:\s*0 0 auto;[^}]*height:\s*64px/s);
    expect(styles).not.toContain('inset: 14px 3.5vw auto');
  });
});
