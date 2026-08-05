# Thinking Lab Design QA

## Evidence

- Source visual truth: `docs/design-audits/thinking-lab-2026-08-05/00-source-visual.png` (copied from `C:\Users\PC\.codex\attachments\f358f24c-95c7-4c74-ba02-c9ce8b1be178\image-1.png`)
- Final desktop implementation: `docs/design-audits/thinking-lab-2026-08-05/10-thinking-lab-desktop-light-final.png`
- Mobile evidence: `docs/design-audits/thinking-lab-2026-08-05/05-thinking-lab-mobile-top.png`, `06-thinking-lab-mobile-cards.png`, and `08-thinking-lab-mobile-dark-lab.png`
- Tablet evidence: `docs/design-audits/thinking-lab-2026-08-05/13-thinking-lab-tablet-final.png`
- Full comparison: `docs/design-audits/thinking-lab-2026-08-05/comparison-full.png`
- Focused comparison: `docs/design-audits/thinking-lab-2026-08-05/comparison-focused.png`
- State: `#lab`, light theme for source comparison; live contribution data; fixed site header.
- CSS viewport: 1728 × 972 at device scale 1. The source is 1672 × 941 px and the browser visible-content capture is 1713 × 964 px. The source was normalized to 1713 × 964 for the combined comparison.

## Full-View Comparison

The implementation preserves the source hierarchy and 16:9 composition: fixed header, left narrative, compact upper-right contribution panel, full-section Net field, and six rounded horizontal cards in a 3 × 2 grid. The title uses the same three-line wrap, the cards begin at the same visual band, and no page-level horizontal overflow is present.

## Focused Comparison

The overview comparison confirms the intended label, title, description, contribution-panel placement, Lucide icons, and light surface treatment. The card comparison confirms independent UI imagery, flush left media, borderless rounded surfaces, restrained shadows, right-side copy, and arrow affordances. Focused comparison was required because card typography, image crop, and heatmap cells are too small to judge reliably from the full view.

## Required Fidelity Surfaces

- Fonts and typography: existing Manrope and DM Sans remain consistent with the site; hierarchy, weight, line height, and three-line heading wrap match the source intent. Card copy remains readable at desktop, tablet, and mobile widths.
- Spacing and layout rhythm: desktop uses a wide Lab-specific shell, 3 × 2 cards, 18 px gaps, 16 px radii, and soft elevation. Tablet becomes two columns; mobile stacks the overview and six cards without overlap.
- Colors and tokens: light and dark tokens are reused. The Vanta Net covers the complete Lab section; foreground surfaces maintain contrast in both themes.
- Image quality and asset fidelity: six independent 768 × 512 WebP UI assets replace the old numeric placeholders. Images are crisp, correctly cropped, and carry no borders or transparency artifacts.
- Copy and content: approved heading, description, six project names, one-sentence summaries, GitHub profile link, and verified repository destinations are present. The contribution total differs from the mock because the implementation uses Xiaoyu's real public data.
- Icons and controls: GitHub and ArrowUpRight use the existing Lucide family. Header theme control, Lab navigation, repository cards, and GitHub link retain visible focus treatment and usable target sizes.
- Responsiveness and accessibility: verified at 1728 × 972, 900 × 900, and 390 × 844. The chart has an accessible summary, cards are semantic links, reduced motion skips Net initialization, and mobile page overflow is absent.

## Comparison History

1. Initial implementation — blocked by P1 layout drift: the inherited 1340 px shell forced the heading to four lines, narrowed the cards, and centered the section 70–120 px too low. Fixed with a Lab-specific 1510 px shell, source-aligned top padding, a wider narrative column, and denser Net parameters. Post-fix evidence: `03-thinking-lab-light-layout-fix.png`.
2. First browser refresh — blocked by P1 reliability: the third-party contribution endpoint failed and left the panel empty. Fixed by bundling the verified 2025-08-03 through 2026-08-05 snapshot, rendering it immediately, and refreshing live data in the background. Post-fix evidence: `04-thinking-lab-desktop-final.png`; automated snapshot total is 301.
3. Desktop refinement — P2 horizontal chart scrollbar caused by a one-pixel intrinsic overflow. Fixed by clipping desktop overflow while retaining horizontal scrolling on mobile. Post-fix evidence: `10-thinking-lab-desktop-light-final.png`; computed desktop overflow is hidden and page overflow is absent.

## Findings

No actionable P0, P1, or P2 findings remain.

- P3 expected content difference: the mock heatmap shows 742 contributions across a dense year, while the real public data currently shows 301 contributions concentrated in recent months. This is correct dynamic content, not design drift.
- P3 intentional proportion: the implemented heatmap panel is slightly shorter than the mock, honoring the approved direction to reduce its visual share.

## Interaction and Console Checks

- Tested primary navigation to Thinking Lab and light/dark theme switching.
- Tested page scrolling and card stacking on mobile.
- Verified live and bundled-snapshot contribution states through component tests and browser rendering.
- Browser console errors: 0.

## Implementation Checklist

- [x] Global Lab-scoped Vanta Net with reduced-motion and failure fallback
- [x] Approved title and description
- [x] Real GitHub contribution panel with reliable snapshot fallback
- [x] Six borderless rounded floating image cards without numbering
- [x] Desktop, tablet, mobile, light, and dark verification
- [x] Automated tests, TypeScript, production build, and visual comparisons

final result: passed
