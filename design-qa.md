# Experience Card Design QA

## Evidence

- Source visual truth:
  - `C:\Users\PC\AppData\Local\Temp\codex-clipboard-58db0229-faf0-4bc3-a072-4fd7ffa08889.png` (1103 × 935, collapsed cards)
  - `C:\Users\PC\AppData\Local\Temp\codex-clipboard-f649de74-1e6d-488e-91b2-78b4151335fd.png` (1187 × 751, expanded card)
- Implementation:
  - `C:\Users\PC\AppData\Local\Temp\32-experience-cards-closed.jpg` (1425 × 891 capture from a 1440 × 900 CSS viewport)
  - `C:\Users\PC\AppData\Local\Temp\33-experience-card-open.jpg` (1425 × 891 capture from a 1440 × 900 CSS viewport)
  - `C:\Users\PC\AppData\Local\Temp\34-experience-cards-mobile.jpg` (375 × 811 capture from a 390 × 844 CSS viewport)
  - `C:\Users\PC\AppData\Local\Temp\36-experience-cards-dark-fixed.jpg` (1425 × 891 capture from a 1440 × 900 CSS viewport)
  - `C:\Users\PC\AppData\Local\Temp\38-experience-unsw-monochrome.jpg` (1425 × 891 capture from a 1440 × 900 CSS viewport)
- Browser density: 1 CSS pixel per screenshot pixel before the browser scrollbar area is excluded.
- States: light collapsed, light expanded, mobile expanded, and dark collapsed.

## Comparison

- Full view: the implementation keeps the portfolio's existing two-column Experience composition while adopting the reference's separated cards, visible gaps, fine outlines, light corner rounding, and full-card disclosure affordance.
- Focused card region: card padding, logo-to-copy alignment, date placement, chevron rotation, and expanded detail separation were readable at capture scale, so a separate crop was not required.
- Typography: the existing DM Sans/Manrope hierarchy is intentionally retained; organization names remain primary, with role and dates subordinate.
- Spacing and rhythm: 14 px desktop and 12 px mobile card gaps create the reference's independent-card rhythm without changing the section grid.
- Colors and tokens: cards use the existing light/dark surface, border, text, and accent tokens. Reference-only multicolor edge strips were intentionally omitted because the requested change was the framed card treatment and they conflict with the approved neutral business system.
- Image quality: all six images use frameless `contain` slots and remain complete without clipping. Dark mode uses a dedicated high-contrast UNSW asset, with Huawei, Rexel, and UNSW rendered monochrome.
- Copy: all existing organizations, roles, date ranges, stages, and summaries are preserved.
- Interaction: clicking the Huawei Greece summary changed its native `<details>` state from closed to open, rotated the chevron, and revealed the existing description. Automated coverage confirms multiple cards can stay open independently.
- Console: no relevant warnings or errors in the checked states.

## Comparison History

1. Initial comparison found a P2 dark-theme image contrast issue: black Huawei and UNSW wordmark text blended into the dark card surface.
2. Replaced the UNSW inversion with a dedicated dark asset, then applied grayscale so the complete mark is monochrome.
3. Added dark-theme grayscale treatments to Rexel and UNSW; capture `38-experience-unsw-monochrome.jpg` shows both updates clearly.

## Remaining Findings

- No actionable P0, P1, or P2 findings remain.

final result: passed
