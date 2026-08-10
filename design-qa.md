# Design QA — Engagement Wall and Logo Loop

- Source wall issue: `C:\Users\PC\AppData\Local\Temp\codex-clipboard-86645423-8b85-420f-a4eb-59cd32661eec.png`
- Source logo composition issue: `C:\Users\PC\AppData\Local\Temp\codex-clipboard-7ddd1783-fc21-449d-a2b9-1c4f6caafcbe.png`
- Source Waterloo/COSMOTE issues: `C:\Users\PC\AppData\Local\Temp\codex-clipboard-cb9d1b4b-46e3-4c8f-864f-ac22b052d1fe.png`, `C:\Users\PC\AppData\Local\Temp\codex-clipboard-b205d35c-945a-45f4-af4e-8f20894230b5.png`
- Source alignment/cropping issue: `C:\Users\PC\AppData\Local\Temp\codex-clipboard-e6a7e7d5-d188-4109-b58e-a24760219b79.png`
- Final light desktop: `C:\Users\PC\AppData\Local\Temp\engagement-logo-final-light.png`
- Final dark desktop: `C:\Users\PC\AppData\Local\Temp\engagement-logo-final-dark.png`
- Focused before/after comparison: `C:\Users\PC\AppData\Local\Temp\engagement-logo-qa-comparison.png`
- Current browser CSS viewport: 1254 × 770 at devicePixelRatio 1.25; saved implementation capture: 1238 × 761 pixels.
- Focused comparison normalization: the supplied 637 × 155 issue crop and the matching implementation band crop were placed in one 637 × 309 comparison image. The implementation crop was aspect-fit, without stretching, and the continuously moving sequence was captured with the same logo order visible.
- State: `#transformation`, light and dark themes, running Drift Wall and Logo Loop.

## Full-view comparison evidence

The final desktop view keeps the confirmed two-column composition and open Drift Wall. The logo loop spans the full page shell without the former label column. Its band is now 81.6px high, uses a subtle translucent theme-aware background, and keeps the tighter logo rhythm without horizontal overflow.

## Focused-region comparison evidence

The combined comparison shows the supplied alignment/cropping example above the revised loop. The revised SVGs have sufficient top and bottom clearance, visible shapes are optically centered, and the same sequence is more compact. COSMOTE contains only its wordmark. Waterloo retains internal shield detail instead of collapsing into a solid silhouette. The shadow remains faint and follows each logo's actual alpha contour.

## Fidelity surfaces

- Fonts and typography: section and content typography remain unchanged; no new visible label competes with the section hierarchy.
- Spacing and layout rhythm: desktop logo items are 60px high with 22px inter-item spacing; mobile items are 54px high with 16px spacing. Base logo dimensions are rendered at exactly two-thirds in layout rather than transformed after layout, preventing edge clipping and baseline drift.
- Colors and visual tokens: logos remain monochrome—black in light mode and white in dark mode. The band uses `rgba(255, 255, 255, 0.42)` in light and `rgba(18, 20, 25, 0.48)` in dark, with the existing fine rules.
- Image quality and asset fidelity: all supplied photograph WebPs and 11 supplied SVGs are used directly. COSMOTE's unwanted Telekom mark was removed from the supplied SVG copy; no replacement artwork was drawn. Waterloo uses a detail-preserving grayscale treatment.
- Copy and content: title, introduction, three engagement stories, metrics, and supporting copy remain unchanged.
- Accessibility and motion: the loop keeps one accessible named sequence while duplicated tracks remain hidden from assistive technology. Reduced-motion fallback remains static. Normal motion continues while the pointer is over the logo band.

## Interaction and runtime evidence

- Pointer hover was placed directly over the logo row; the track advanced from `translate3d(-277.845px, 0, 0)` to `translate3d(-328.578px, 0, 0)` during the 900ms hover interval.
- All 11 first-sequence logo boxes were measured. Non-offset logos had a 0px center delta; the optically corrected COSMOTE and NOVA offsets were 1px and 4px. Minimum top/bottom clearance was 7.3px for the two crest assets, so no logo box was clipped.
- Light mode applied a restrained 18% alpha drop shadow; dark mode applied a 45% black alpha shadow for separation without introducing glow.
- Dark-mode browser checks confirmed the detail-preserving Waterloo filter, white COSMOTE wordmark, translucent band, and zero horizontal overflow.
- Browser logs contained only Vite connection/HMR debug entries and the React DevTools development notice; there were no application errors or warnings.
- Automated verification passed: `npm test` (34/34), `npm run lint`, `npm run build`, and `git diff --check`. The build retains the pre-existing Vite large-chunk warning for Three.js.

## Findings

No actionable P0, P1, or P2 findings remain.

## Comparison history

- Pass 1 — P1: the animated wall exposed large empty areas. Fixed with continuous copies and eager animated image loading.
- Pass 1 — P2: the wall read as one large card. Removed its border, radius, fill, and shadow, then added top/bottom background fades.
- Pass 2 — P2: the logo label reduced loop width and several assets had incorrect scale/color handling. Removed the visible label and normalized per-logo dimensions.
- Pass 3 — P2: the requested monochrome treatment collapsed Waterloo into a solid shield and retained COSMOTE's unwanted right-hand graphic. Preserved Waterloo luminance detail and removed only the Telekom group from the supplied COSMOTE SVG.
- Pass 4 — P2: hover still paused, the band was too tall, and spacing was loose. Removed hover pause state, reduced band padding, added theme-aware translucency, narrowed logo slots, and reduced gaps.
- Pass 5 — P2: transformed 68px crest boxes could align unsafely inside a 60px row, causing visible vertical drift and clipping risk. Converted the two-thirds scale into actual rendered dimensions, preserved optical offsets, expanded the safe row height, and added alpha-following shadows. The focused post-fix comparison shows complete centered marks with no remaining P0/P1/P2 issue.

## Follow-up polish

- No follow-up visual issues are currently identified.

final result: passed
