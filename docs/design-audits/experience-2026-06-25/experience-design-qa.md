# Experience Design QA

- Date: June 25, 2026
- Production preview: `http://127.0.0.1:4174/#experience`
- Primary viewport: 1280 × 800
- Minimum supported desktop viewport: 960 × 800
- Default capture: `01-experience-default.png`

## Verified

- The page title and Experience route loaded without a framework error overlay.
- The browser console reported no warnings or errors.
- Reverse chronology is correct: Huawei Canada appears first and University of Toronto appears last.
- All six entries show the verified month-and-year range, stage, organization, role or degree, and one-sentence summary.
- All six entries remain visible within the 1280 × 800 Experience chapter.
- The 960 px desktop viewport has no horizontal overflow.
- The Hero Experience action navigates to `#experience` and aligns the section below the fixed header.
- Timeline entries remain semantic, non-focusable articles.
- Contextual focus is scoped to hover-capable, fine-pointer devices.
- The reduced-motion rule removes timeline and node translation.

## Contextual Focus Evidence

The in-app browser automation successfully located the Huawei Greece entry but did not retain the CSS `:hover` pseudo-class after pointer movement. No hover screenshot is included because a default-state image would be misleading.

Runtime stylesheet inspection confirmed these production rules:

- non-active entries use `opacity: 0.74` only while an entry is actually hovered
- the hovered entry uses `translateX(5px)`
- the hovered node uses `scale(1.28)` and a restrained teal halo
- the effect is contained by `(hover: hover) and (pointer: fine)`
- `prefers-reduced-motion: reduce` forces timeline transforms to `none`

## Findings

No unresolved P0, P1, or P2 findings.

The only QA limitation is the automation environment's inability to preserve `:hover` for screenshot capture. The hover implementation is still covered by runtime stylesheet inspection and constrained media-query behavior.

Final result: passed with the hover-capture limitation documented above.
