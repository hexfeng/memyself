# Strategic Project Showcase Design QA

- Source visual truth:
  - `C:/Users/PC/AppData/Local/Temp/codex-clipboard-eece9119-10d6-4319-8259-c36f8b482707.png`
  - `C:/Users/PC/AppData/Local/Temp/codex-clipboard-cd0dddd8-d72e-44b2-a3ed-2356eb1e1389.png`
  - `C:/Users/PC/AppData/Local/Temp/codex-clipboard-0dd3cec6-db6d-44f8-b799-e35d9d7fe26a.png`
- Implementation: `http://127.0.0.1:4173/#gtm`
- Final desktop screenshot: `C:/Users/PC/AppData/Local/Temp/strategic-showcase-final-20260724-v3.png` (1265 x 1186)
- Mid-transition screenshot: `C:/Users/PC/AppData/Local/Temp/strategic-showcase-phase-20260724-v3.png` (1265 x 1186)
- Mobile screenshot: `C:/Users/PC/AppData/Local/Temp/strategic-showcase-mobile-final-20260724-v3.png` (375 x 811)
- Combined comparison: `C:/Users/PC/AppData/Local/Temp/strategic-showcase-comparison-20260724-v2.png` (1459 x 1242)
- Desktop CSS viewport: 1280 x 1200; mobile CSS viewport: 390 x 844; device density: 1
- States: Nova final, Vodafone during continuous expansion, Nova mobile

## Full-View Comparison Evidence

The three supplied issue captures and the matching rendered states were combined into one comparison image. The Nova visual is slightly larger and shifted left, both media endpoints now start moving together with the lower endpoint accelerating into the final diagonal, and the settled center channel reads as parallel.

## Focused Region Evidence

- The settled outer channel measured 11.91px at both top and bottom (less than 0.001px delta).
- The inner media frame measured 28.04px at the top and 27.96px at the bottom (0.08px delta).
- A 110-frame capture across the complete transition measured no meaningful top/bottom channel divergence; the largest delta was below 0.001px.
- The developing slope measured about 19.43px in the early sample and reached the target 50px before the shared translation phase.
- The final geometry remained pixel-identical for more than 40 consecutive frames after completion.
- The Nova image computes to `translateX(-2%) scale(1.04)` on desktop and resets to `none` on mobile.

## Required Fidelity Surfaces

- Fonts and typography: unchanged; no new clipping or wrapping regression was found.
- Spacing and layout rhythm: the final 30/70 composition is preserved and both diagonal gaps are visually parallel.
- Colors and visual tokens: the existing matched dark-glass materials remain unchanged.
- Image quality and asset fidelity: the supplied 1672 x 941 Nova image remains the source; only its in-frame scale and focal position changed.
- Copy and content: unchanged.

## Interaction Evidence

- Flow tested: `#gtm` -> Next project -> narrow vertical media state -> simultaneous leftward expansion -> matched-speed translation -> settled project.
- Both endpoints move from the first animated frame. The upper endpoint keeps a constant speed while the lower endpoint accelerates smoothly until the target 50px diagonal is reached; both then continue left at the same speed.
- All four panel and mask animations share one 350ms linear timeline after the same 500ms delay. Their final keyframes exactly match the static panel geometry, eliminating the extra-frame move and snap-back.
- Desktop and 390 x 844 mobile layouts have no horizontal overflow.
- The page renders meaningful content with no framework overlay and no console warnings or errors.

## Comparison History

### Iteration 1

- Finding: the left and right cards used different stacked materials (P1).
- Fix: reused the right-card surface and shadow on the left shell and made its nested stage transparent.

### Iteration 2

- Finding: independent percentage trapezoids made the settled diagonal frame look uneven (P1).
- Fix: aligned the media and inner-frame slopes with fixed pixel endpoints.

### Iteration 3

- Finding: the first three projects still used older image exports (P1).
- Fix: replaced the files with the supplied July 24 assets and verified their hashes and browser dimensions.

### Iteration 4

- Finding: the Nova subjects sat too far right; interpolating four unrelated trapezoid endpoints produced a squeezed transition; the final center channel still varied by viewport (P1).
- Fix: enlarged and shifted only the Nova image, changed the animation to slope-first then parallel translation, and derived the copy edge from the media edge with a fixed 1% channel.
- Post-fix evidence: the channel remains equal at every sampled frame and in the settled state; the inner frame delta is below one tenth of a CSS pixel.

### Iteration 5

- Finding: the segmented easing restarted at the intermediate keyframe, producing a visible velocity discontinuity; panel geometry also finished 200ms before the text transition, which exposed a one-frame endpoint correction (P1).
- Fix: replaced the segmented easing with one authored linear trajectory. The lower edge uses progressively increasing travel increments until its speed matches the upper edge, then both translate together; all final keyframes now equal the static geometry.
- Post-fix evidence: the upper edge moves continuously, the lower edge accelerates monotonically to the same speed, and the final geometry stays unchanged for more than 40 captured frames.

## Findings

No actionable P0, P1, or P2 mismatch remains for this scope.

## Follow-up Polish

None required.

final result: passed
