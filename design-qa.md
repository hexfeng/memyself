# Design QA — Beside Work cards

- Source visual truth: `C:\Users\PC\AppData\Local\Temp\codex-clipboard-3712bb5a-b8ab-42c7-9704-d292a854a514.png`
- Implementation screenshot: `C:\Users\PC\.codex\visualizations\2026\08\05\019fd30a-66e2-7bc0-866d-86d8ec8b9425\beside-work-cards-light.jpg`
- Comparison image: `C:\Users\PC\.codex\visualizations\2026\08\05\019fd30a-66e2-7bc0-866d-86d8ec8b9425\beside-work-reference-comparison.jpg`
- Viewport: desktop CSS viewport 1440 × 900; mobile CSS viewport 390 × 844
- Pixels and normalization: source 1621 × 692; desktop capture 1425 × 891 and mobile capture 375 × 811 at browser density 1. The comparison preserves aspect ratio and normalizes both desktop images to 1440 px width.
- State: light theme for reference comparison; dark theme also checked.

## Full-view comparison evidence

The implementation carries over the source's three equal-width cards, large landscape image, compact metadata, prominent title, short supporting copy, generous gutters, and rounded neutral surfaces. The existing section heading and portfolio navigation remain above the cards.

Focused-region comparison was not needed: the cards occupy most of both source and implementation captures, and their image crops, typography, padding, and corners remain readable at the captured desktop size.

## Fidelity surfaces

- Fonts and typography: existing Manrope and DM Sans hierarchy is preserved; card titles and descriptions have consistent weight, wrapping, and line height.
- Spacing and layout: three equal desktop columns and one mobile column render without clipping or horizontal overflow.
- Colors and tokens: existing `--surface`, `--surface-alt`, `--text-soft`, and accent tokens adapt the cards to light and dark themes.
- Image quality: three dedicated 1200 × 800 WebP assets use consistent editorial photography, correct 3:2 crops, and no placeholder or code-drawn imagery.
- Copy and content: Travelling, Photography, and Gaming each include one title and one sentence of description.

## Intentional deviations

- The source's Read more row, arrow, and corner notch are omitted because these personal-interest cards are not links.
- The source's warm Cohere palette is replaced by the portfolio's existing light/dark tokens.

## Interaction and runtime evidence

- Flow: page top → click Beside Work navigation → `#beside` aligns below the fixed header and receives `aria-current="page"`.
- Theme toggle changes card surfaces correctly.
- Desktop and mobile screenshots show all images loaded, no horizontal overflow, no framework overlay, and no console warnings or errors.

## Comparison history

- Pass 1: no actionable P0, P1, or P2 mismatch. No corrective visual iteration was required.

final result: passed
