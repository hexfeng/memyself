# Strategic Project Showcase Design QA

- Source visual truth: `C:/Users/PC/AppData/Local/Temp/codex-clipboard-747682c5-68b3-4a03-9bcc-d610839b1e6e.png`
- Implementation: `http://127.0.0.1:4173/#gtm`
- Implementation screenshot: `C:/Users/PC/AppData/Local/Temp/strategic-showcase-desktop.png`
- Browser: Codex in-app Browser
- Viewport: desktop browser viewport, 1280 x 720 CSS pixels; the captured section region is 1265 x 765 pixels
- State: first project selected and transition settled

## Full-View Comparison Evidence

The source and implementation captures were opened together in one comparison input. The implementation retains the reference's defining structure: headline and minimal arrows above the content, a light glass text panel with a diagonal trailing edge, parallel diagonal image mask, large photographic panel, restrained radii, and centered segmented progress line. The site's original moving background remains visible through a dark liquid-glass veil.

The portfolio keeps its existing fixed global header outside the component. This is an intentional page constraint rather than a component mismatch.

## Focused Region Evidence

No separate crop was required. The 1265-pixel implementation capture and 2048-pixel source resolve the diagonal borders, arrow controls, typography, image crop, and progress segments clearly enough for direct comparison.

## Required Fidelity Surfaces

- Fonts and typography: DM Sans is close to the source's neutral grotesk character. Weight, negative display tracking, compact line height, and small uppercase eyebrow are consistent. The project title is intentionally larger than the testimonial quote because it carries project identity.
- Spacing and layout rhythm: the resting panels overlap at 55%/55%, with the reference's shallow diagonal channel, generous internal whitespace, and centered progress treatment. The page header introduces extra context above the component by design.
- Colors and visual tokens: the existing blue-black scene, translucent blur veil, light glass copy panel, near-black card type, muted metadata, grey progress track, and warm-to-blue active segment preserve both the site identity and the source hierarchy.
- Image quality and asset fidelity: local mountain photography is sharp and correctly cropped behind a real image element. It is intentionally mock content, as requested; no CSS or drawn placeholder replaces it.
- Copy and content: the three existing strategic projects are preserved and mapped into the source hierarchy: project index, title, summary, outcome, supporting evidence, and CTA.

## Interaction Evidence

- `Next project` was clicked in the in-app Browser.
- The accessible active heading changed from `NOVA 5G FWA Commercial Launch` to `Antenna Modernization Strategy`.
- The outgoing and incoming text/image layers used the directional wipe classes.
- The browser console contained no errors or warnings.
- The section had no horizontal overflow at the desktop viewport.

## Comparison History

### Iteration 1

- Earlier finding: inherited flex alignment collapsed the showcase to an 8-pixel-wide strip (P0).
- Fix: set `.strategic-projects` to `align-items: stretch`.
- Post-fix evidence: the showcase measured 1339 x 486 pixels at the desktop reference viewport.

### Iteration 2

- Earlier finding: applying parallel clips to both panels left an approximately 80-pixel visual channel, and the global progress rail remained visible over the white stage (P2).
- Fix: overlap the media grid item by 64 pixels and hide the global progress rail while `gtm` is active.
- Post-fix evidence: the parallel edges are separated by approximately 16 pixels and the rail computes to opacity `0`.

### Iteration 3

- Earlier finding: the section replaced the original background with opaque off-white, and project changes animated only text/image layers while panel boundaries stayed fixed (P1).
- Fix: restore a transparent section over the original scene with an 18px translucent blur veil; animate the keyed text/media containers from 79%/20% to 55%/55% after the reference's 500ms hold.
- Post-fix evidence: at a 1190.4px stage width the local media measured 238.1px immediately after click, 591.4px mid-transition, and 654.7px at rest. The live Cohere reference measured 236.9px, 581.7px, and 651.6px at the corresponding frames.

### Iteration 4

- Earlier finding: the panel widths changed, but their final diagonal masks stayed fixed and the image ran a separate wipe, creating an approximately 186px top gap in the narrow state (P1).
- Fix: animate each mask on the same 500ms-delay/700ms timeline as its container and remove the independent image wipe.
- Post-fix evidence: the narrow-state gap is 11.9px and the incoming image matches the media panel's x-position and width at every sampled frame.

## Findings

No actionable P0, P1, or P2 mismatch remains.

## Residual Test Gap

The in-app Browser advertised a viewport override but continued rendering at its desktop width after requesting 390 x 844, so the mobile CSS path could not be screenshot-verified in this run. The implementation still includes the explicit stacked layout, unclipped rounded panels, full-width progress controls, and no mobile minimum width below 767px.

## Follow-up Polish

- P3: replace the reused mountain mock images when project-specific art direction is ready.
- P3: shorten the section introduction if an even closer one-line Cohere header rhythm is desired.

final result: passed
