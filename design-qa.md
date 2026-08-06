# Design QA — Beside Work folder cards

- Source visual truth: `C:\Users\PC\AppData\Local\Temp\codex-clipboard-9c0b55d9-1351-430c-af12-4c015f56533b.png`
- Implementation closed state: `C:\Users\PC\.codex\visualizations\2026\08\05\019fd30a-66e2-7bc0-866d-86d8ec8b9425\beside-folder-card-closed.png`
- Implementation open state: `C:\Users\PC\.codex\visualizations\2026\08\05\019fd30a-66e2-7bc0-866d-86d8ec8b9425\beside-folder-card-open.png`
- Comparison image: `C:\Users\PC\.codex\visualizations\2026\08\05\019fd30a-66e2-7bc0-866d-86d8ec8b9425\beside-folder-reference-closed-open-comparison.png`
- Mobile open state: `C:\Users\PC\.codex\visualizations\2026\08\05\019fd30a-66e2-7bc0-866d-86d8ec8b9425\beside-folder-mobile-open.png`
- Viewports: desktop CSS viewport 1440 × 900; mobile CSS viewport 390 × 844.
- Pixels and normalization: source 722 × 695; desktop browser capture 1425 × 891 at density 1; focused implementation crops 470 × 540, normalized to 605 × 695 beside the source in the comparison image.
- State: light closed and hover-open states compared; dark desktop and dark mobile click-open states also checked.

## Full-view comparison evidence

The three-column portfolio layout and existing Travelling, Photography, and Gaming content remain intact. The implementation adopts the reference's rounded folder surface, large image, text hierarchy, lower-right cutout, and arrow affordance without replacing the site's existing imagery or typography.

## Focused-region comparison evidence

The combined comparison shows the reference, implementation closed state, and implementation open state at equal height. The open state visibly lifts the image sheet, exposes the accent-tinted folder back, tilts the text flap forward, and retains the reference-style lower-right arrow cutout.

## Fidelity surfaces

- Fonts and typography: existing Manrope and DM Sans hierarchy remains consistent; titles and descriptions retain readable weight, line height, and wrapping.
- Spacing and layout: three equal desktop columns and one mobile column render without clipping or horizontal overflow; the open transform does not reflow adjacent cards.
- Colors and tokens: folder surfaces use the existing `--surface`, `--surface-alt`, and `--accent` tokens in both themes.
- Image quality: the three existing 3:2 WebP assets remain sharp and correctly cropped while moving as the folder's inner sheet.
- Copy and content: Travelling, Photography, and Gaming titles and descriptions are unchanged.
- Accessibility: each full-card target is a native button with an accessible name and `aria-pressed`; focus opens the preview, click locks it open, and reduced-motion mode removes the transforms.

## Interaction and runtime evidence

- Hover changed the first card, image, front flap, and back-layer computed transforms/opacity.
- Clicking Travelling produced open states `[true, false, false]`; clicking Photography changed them to `[false, true, false]`.
- Mobile click-open rendered at 375 × 844 browser content size with zero horizontal overflow.
- Page identity, meaningful DOM, framework overlay, and console error/warning checks passed.

## Comparison history

- Pass 1 — P2: the old mobile padding override compressed the folder front and allowed the cutout to crowd the copy. Fixed with mobile-specific front-flap margin and `28px 18px 50px` padding.
- Pass 2 — post-fix mobile and desktop captures show readable copy, a complete click target, visible open state, and no overflow. No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- P3: the open angle is intentionally restrained to keep text readable; increase it only if a more theatrical interaction is desired.

final result: passed
