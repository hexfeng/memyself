# Design QA — South East Europe Wireless Strategy Project

- Source project image: `D:\文档\照片素材\本地文件\exec-64eb9017-5617-43a6-a5f8-25494e9d8108.png` (1536 × 1024 px)
- Source issue capture: `C:\Users\PC\AppData\Local\Temp\codex-clipboard-ffe1c72a-bea6-44cb-a355-0bba1aa5f813.png` (731 × 1122 px)
- Source FWA transition reference: `C:\Users\PC\AppData\Local\Temp\codex-clipboard-158218a5-a3fb-48c2-bd01-8eda463ab3f9.png` (873 × 951 px)
- Source seam issue: `C:\Users\PC\AppData\Local\Temp\codex-clipboard-9928713d-ed2d-4bab-9c77-589b65c32f00.png` (231 × 921 px)
- Final desktop implementation: `D:\Projects\Personal_Website\docs\design-audits\strategic-projects-2026-08-11\07-desktop-transition-final.png`
- Final mobile implementation: `D:\Projects\Personal_Website\docs\design-audits\strategic-projects-2026-08-11\05-mobile-final.png`
- State: light theme, fourth Strategic Business & GTM project selected.

## Viewport and normalization

- Desktop browser CSS viewport: 1440 × 900; saved capture: 1425 × 891 px.
- Mobile browser CSS viewport: 390 × 844; saved capture: 375 × 811 px.
- The supplied screenshots are focused crops rather than same-viewport full designs. Comparison therefore normalized on the shared project-card seam, copy density, image crop, and metric layout instead of asserting pixel-for-pixel full-page fidelity.

## Full-view comparison evidence

The final desktop capture preserves the established Strategic Projects card geometry and uses the supplied South East Europe map directly. The fourth project now has a complete title, one concise ownership statement, and three metric rows. The full 1536 × 1024 image renders with `object-fit: contain`; the browser confirmed the natural dimensions and complete load. No horizontal overflow or card content overflow remains.

## Focused-region comparison evidence

The source seam capture showed a visible pale vertical boundary after the original gray overlay. The final implementation separates the two jobs: a 1px diagonal edge follows the actual slanted card boundary with a soft inward shadow, while a separate 190px white-to-transparent blend merges the image background. Side-by-side inspection shows a clear card boundary without the former vertical band. The FWA card's existing gradient remains unchanged.

## Fidelity surfaces

- Fonts and typography: the existing Manrope hierarchy is preserved. The long title uses the existing project-specific responsive sizing and remains fully visible at desktop and mobile widths.
- Spacing and layout rhythm: desktop content fits the 533px card exactly. The fourth project's mobile copy shell is 460px so all text and metrics fit without clipping; other projects retain the existing 380px shell.
- Colors and visual tokens: the final transition uses a 14% neutral 1px diagonal edge with a 9% soft shadow, followed by an independent 88% to 0% white fade. This keeps the card boundary legible without reintroducing a vertical band, while retaining the existing light theme, radius, and shadow tokens.
- Image quality and asset fidelity: the supplied 1536 × 1024 PNG is used unchanged, contained rather than cropped or stretched, with no recreated logos or illustration elements.
- Copy and content: the mock title and copy are removed. The replacement emphasizes South East Europe strategy, Greece operator ownership, annual BP, spectrum/product roadmaps, and commercial execution. `10%+`, `2 consecutive years`, `3`, `50+`, and both `10+` metrics are visually emphasized.
- Accessibility and responsiveness: project selection remains button-based with existing accessible labels. Desktop and 390px mobile checks show no horizontal overflow; reduced-motion and existing navigation behavior are unchanged.

## Interaction and runtime evidence

- Selected project 4 through the project progress control after page load and reload.
- Verified the updated card at 1440 × 900 and 390 × 844.
- Desktop card: `clientHeight = 533`, `scrollHeight = 533`.
- Mobile card: `clientHeight = 460`, `scrollHeight = 460`.
- Browser console: no warnings or errors.
- Automated verification: `npm test` passed 34/34 tests; `npm run lint`, `npm run build`, and `git diff --check` passed. The build retains the pre-existing Three.js large-chunk warning.

## Findings

No actionable P0, P1, or P2 findings remain.

## Comparison history

- Pass 1 — P2: the two-sentence description and metric layout overflowed the desktop card by 27px and the mobile card by 92px. Shortened the ownership statement and metric wording, then added a project-specific 460px mobile copy shell.
- Pass 2 — P2: the FWA-style gray overlay softened the diagonal seam but produced a visible pale vertical boundary at the end of the gradient. Replaced it only for the new project with a wider white-to-transparent blend.
- Pass 3 — P2: the all-white blend removed the vertical band but made the two overlapping cards read as one surface. Added a short, low-opacity neutral shadow at the diagonal edge before the longer white fade.
- Pass 4 — P2: the neutral-to-white gradient improved separation, but its horizontal color stops still could not follow the slanted boundary consistently from top to bottom.
- Pass 5 — passed: added a dedicated edge rotated to the card's 5.36-degree slant and kept the wide fade independent. The diagonal boundary is now consistently visible without a hard vertical line; desktop and mobile cards have no content or horizontal overflow; the source image remains complete and sharp.

## Adversarial review

- Long-title clipping: checked at desktop and 390px mobile; the complete title is visible.
- Copy/metric overflow: measured `scrollHeight` against `clientHeight` in both viewports; values are equal.
- Image cropping or distortion: browser reported the original 1536 × 1024 natural size and `object-fit: contain`.
- Transition regression: the new selector is scoped to the South East Europe image, leaving the FWA transition untouched.
- Unintended project changes: the four-project order and all project navigation tests pass.

## Follow-up polish

No follow-up visual issues are currently identified.

final result: passed
