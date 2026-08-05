# Thinking Lab Development Plan

Date: August 5, 2026  
Visual source: `C:\Users\PC\.codex\attachments\f358f24c-95c7-4c74-ba02-c9ce8b1be178\image-1.png`

## Outcome

Replace the generic Thinking Lab section with the approved 16:9 composition: a compact narrative and live GitHub contribution panel above a 3 × 2 grid of six floating horizontal project cards, all over a section-wide Vanta Net background.

## Scope and Decisions

- Preserve the existing header, navigation, section order, themes, and all non-Lab sections.
- Use the existing React, Three, Vanta, and Lucide dependencies; add no packages.
- Keep the Net canvas inside the full Thinking Lab section so it covers the center as well as the edges. Use a static dotted fallback for reduced motion or WebGL failure.
- Render a real bundled contribution snapshot immediately, then refresh from the public `hexfeng` calendar endpoint in the background. Network failure keeps the verified snapshot visible; the widget links to GitHub and requires no credentials.
- Use six independent generated WebP thumbnails. Each card is a real external link to its matching public repository.
- Desktop uses the approved two-column overview and 3 × 2 cards. Tablet changes to two columns; mobile stacks the overview and cards while keeping the calendar horizontally scrollable.

## Implementation

1. Update `src/content.ts` with the approved title, description, six projects, image paths, and repository destinations.
2. Add a dedicated `ThinkingLab` render path in `src/app.tsx`; leave the generic project card component for the existing Transformation and Ecosystem sections.
3. Add `NetBackground`, a compact GitHub calendar, and horizontal linked Lab cards using semantic section, aside, and anchor markup.
4. Extend `src/vanta.d.ts` for the already-installed Net module.
5. Add isolated responsive and dark-theme rules in `src/styles.css`.
6. Add focused component/content/style tests for the six-card structure, live/snapshot contribution states, Net lifecycle, layout, and removal of Lab numbering.

## Verification

- Run `npm test`, `npm run lint`, `npm run build`, and `git diff --check`.
- Browser-test the exact 1728 × 972 reference viewport plus 390 × 844 mobile in light and dark themes.
- Verify GitHub loading/success/failure behavior, external links, hover/focus states, reduced motion, Net cleanup, and console health.
- Capture implementation screenshots and compare them with the source visual in `design-qa.md`; finish only with no actionable P0/P1/P2 differences.
