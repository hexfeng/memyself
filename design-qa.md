# NOVA Showcase Image and Border Design QA

## Evidence

- Source visual truth: `C:\Users\PC\Downloads\Generated image 1 (3).png` (1753 × 897, SHA-256 `878D2AE1A613AE0188C6D0B9933525A161EF2CF0A3A5255F0707D0A94EE45560`).
- Light implementation: `C:\Users\PC\AppData\Local\Temp\personal-website-nova-gradient-light.png` (1265 × 712).
- Dark implementation: `C:\Users\PC\AppData\Local\Temp\personal-website-nova-separated-dark.png` (1265 × 712).
- Focused comparison: `C:\Users\PC\AppData\Local\Temp\personal-website-nova-image-comparison.png` (845 × 866); source normalized to 845 × 433 above, rendered media crop at 845 × 433 below.
- Environment: `http://localhost:5173/#gtm`, 1280 × 720 CSS viewport, DPR 1.25, NOVA project selected.

## Comparison

- Full view: the supplied NOVA progression graphic replaces the previous asset and remains balanced against the left project copy in both themes.
- Focused region: all three headings, maps, arrows, legends, and supporting statements remain visible. `object-fit: contain` preserves the 1.95:1 source ratio without stretching or edge crop.
- Typography: source-image typography remains raster-authentic; site DM Sans/Manrope hierarchy and wrapping are unchanged.
- Spacing and layout rhythm: the image keeps its authored white breathing room; card size, internal copy padding, radii, and elevation are unchanged.
- Colors and tokens: the copy panel keeps the same white surface as every other light-mode project; a subtle NOVA-only gray gradient fades across the image side of the diagonal boundary, while borders remain absent.
- Image quality: the deployed asset hash exactly matches the supplied PNG. Browser downscaling is clean with no transparency halo or distortion.
- Copy and content: site copy is unchanged; the new image's embedded labels are preserved verbatim.
- Interaction: Next Project and project 1 selection were exercised; the new image returned correctly after the transition.
- Console: no relevant warnings or errors.

## Comparison History

1. Initial P2: the previous NOVA image used a different composition and was enlarged/cropped; the left outline was near-black and the diagonal seam was explicitly drawn.
2. Fix: replaced the public asset with the supplied PNG, switched the NOVA image to contained rendering, removed every copy-panel border and both diagonal seam pseudo-elements, then added a NOVA-only gradient on the image side.
3. Post-fix: the copy panel color stays consistent across projects, the light NOVA boundary remains readable without a drawn edge, and the gradient disappears on other projects and in dark mode.

## Remaining Findings

- P3: the 1280 × 720 desktop states were visually checked; mobile behavior remains covered by the existing responsive CSS and automated style checks rather than a new screenshot.

final result: passed
