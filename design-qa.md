# Beside Work card design QA

- Source visual truth: `C:\Users\PC\AppData\Local\Temp\intuit-cards-default.png` and `C:\Users\PC\AppData\Local\Temp\intuit-cards-hover.png`
- Implementation evidence: `C:\Users\PC\AppData\Local\Temp\beside-work-default.png`, `C:\Users\PC\AppData\Local\Temp\beside-work-depth-hover.png`, and `C:\Users\PC\AppData\Local\Temp\beside-work-mobile.png`
- Combined comparison: `C:\Users\PC\AppData\Local\Temp\beside-work-comparison.png`
- Desktop viewport: 1280 x 720 CSS px; captured images: 1265 x 712 px
- Mobile viewport: 390 x 844 CSS px; captured image: 375 x 812 px
- Density normalization: the Intuit page reported DPR 1.5 and the local page reported DPR 1.0, but the browser capture service normalized both desktop outputs to the same 1265 x 712 pixel size, so no resampling was needed for the combined comparison.
- States: default, pointer hover, keyboard focus behavior, light theme, dark theme, and mobile default

## Full-view comparison evidence

The combined image places Intuit default beside the local default on the first row, and Intuit hover beside the original local hover on the second row. Both implementations keep the default card border transparent, reveal a fine border outside the card on hover, inset the image by 16 px on the top and sides, and inset the text by 16 px without changing the grid dimensions. The latest local hover capture adds the requested 4 px lift, subtle accent-tinted surface, and two-layer shadow without changing the card's measured width or height.

## Focused region evidence

A separate crop was not needed because the three-card rows fill the lower two-thirds of each 1265 x 712 capture and the image edge, card border, title, and body-copy offsets are readable at native size. Computed-style checks confirmed the reference and implementation use the same 16 px image clip path and text inset. The reference uses a 600 ms `cubic-bezier(.6, 0, .25, 1)` transition; the implementation matches it.

## Required fidelity surfaces

- Fonts and typography: the implementation intentionally retains the portfolio's DM Sans and Manrope hierarchy instead of importing Intuit typography. Titles, descriptions, and the optional Photography action remain legible with no clipping.
- Spacing and layout rhythm: the reference's -8 px border extension, 16 px visual inset, and 600 ms shared transition are reproduced. Hover adds a 4 px compositor-friendly lift without layout movement. The existing three-column desktop and one-column mobile grids are preserved.
- Colors and visual tokens: the reference's subtle blue-black 20% border is adapted to `var(--text)` at 18%. Hover also introduces a 5% accent tint and soft two-layer light-theme shadow; dark mode uses an 8% accent tint and stronger black shadow for equivalent separation.
- Image quality and asset fidelity: all existing Beside Work images and the Photography collage are preserved at their native project crops. The existing 3:2 image ratio is an intentional content constraint; no assets were replaced or approximated.
- Copy and content: the three existing titles and descriptions are unchanged. Photography's existing CTA is now a separate optional link-style button; cards without a destination expose no false interaction.

## Findings

No actionable P0, P1, or P2 mismatches remain. The reference's category chips and square imagery were intentionally not copied because the requested card contract was image, title, description, and optional link, and the portfolio already has established imagery and typography.

## Comparison history

- Pass 1: no actionable P0/P1/P2 differences after normalization. The source and implementation share the requested default and hover logic, so no post-comparison visual fix was required.
- Pass 2: the requested depth enhancement added tint, shadow, and 4 px lift. Browser measurements confirmed the card remained 380.79 x 393.53 CSS px before and after hover, with no layout shift.

## Functional and responsive checks

- Page identity, meaningful DOM content, and framework-overlay checks passed.
- Browser console: no errors or warnings during default, hover, mobile, dark-theme, and gallery interaction checks.
- Photography action opened the 58-image gallery; Close gallery dismissed it and returned focus to the action.
- Mobile document width matched the client width, with no horizontal overflow.
- Automated checks: 37 tests passed; TypeScript lint passed; production build passed.

final result: passed
