# Cohere-Style Strategic Project Showcase Design

Date: July 15, 2026  
Status: Approved through the referenced design conversation and implementation request

## Goal

Replace only the `Strategic Business & GTM Projects` card grid with a faithful adaptation of Cohere's `Why leading teams trust Cohere` component. Preserve every other page section and the site's existing navigation.

## Chosen Direction

Use one large editorial stage over the portfolio's existing video background. A translucent, blurred veil preserves the site atmosphere while the stage keeps Cohere's defining composition: a wide glass text panel with a diagonal trailing edge, a separate rounded media panel, minimal previous/next arrows, and a thin progress track beneath.

Alternatives rejected for this scope:

- Three independent large cards: loses the focused carousel interaction.
- Sticky scroll storytelling: adds unnecessary page length and conflicts with the existing section-to-section wheel navigation.
- Framer Motion: not installed and unnecessary for this bounded transition.

## Layout

- Section background: transparent over the existing scene, with a dark translucent blur veil and light header typography.
- Header row: existing section label/title/intro on the left; previous and next arrow controls on the right.
- Showcase row: overlapping 55% text and 55% media panels at rest, matching the reference geometry.
- Text panel: thin dark border, rounded outer corners, generous padding, and a diagonal right edge that visually overlaps the media gap.
- Media panel: rounded corners, clipped photographic mock image, full-height cover crop.
- Progress: three equal track segments below the panels, with the active segment shown in a restrained warm-to-blue treatment inspired by the reference.

At widths below 768px, panels stack vertically, the diagonal cut becomes a normal rounded edge, controls remain visible, and the progress segments stay directly below the card.

## Content Mapping

Reuse the three existing strategic case studies without changing their facts. Map each item as follows:

- Existing title -> project title
- Existing summary -> main editorial copy
- Existing result -> primary outcome
- Existing secondary -> supporting outcome
- Existing order -> carousel order and `01` to `03` index

Mock photography is presentation-only and must have empty alternative text so it does not compete with the textual project description.

## Interaction

- Previous and next controls wrap between the three projects.
- Progress segments are buttons and allow direct selection.
- Keyboard users can operate every control with native button behavior.
- On project change, the outgoing text moves slightly left and fades; the incoming text settles from the right. The image uses the same directional clip/wipe logic with a restrained scale change.
- The transition direction follows the user's navigation direction, including wraparound.
- On every project change, the text panel snaps to 79% and the media panel to a 20% vertical slice; after 500ms both settle to 55% over 700ms while their masks move from rectangles to the final diagonal edges. The image has no separate wipe and remains fitted to the media boundary for the entire transition.
- `prefers-reduced-motion` removes transforms, wipes, and delayed motion while preserving immediate project switching.
- Controls expose an accessible carousel label and the active progress button uses `aria-current`.

## Architecture

Keep the current `ProjectSection` for the other three project categories. Add a small `StrategicProjectShowcase` component in `src/App.tsx`, selected only when `id === 'gtm'`. Use React state plus a short-lived transition phase and CSS classes; do not add a carousel or animation dependency.

Extend `CaseStudy` with an optional `image` field and add mock image paths only to `content.gtm.cases`. Other case-study data remains unchanged.

## Acceptance Criteria

- Only the `gtm` section changes its component design.
- The desktop result visibly matches the reference's headline/control row, diagonal text panel, rounded image panel, segmented progress track, and full panel-geometry transition while retaining the original site background under glass.
- Previous, next, and direct progress selection all switch the active project and wrap correctly.
- The content and image animate with a consistent directional wipe.
- The showcase remains usable at 390px width and with reduced motion.
- Existing tests, TypeScript checks, and production build pass.

## Verification

Run the focused interaction test first, then the full test, lint, and build commands. Inspect the rendered `#gtm` section at 1440 x 900 and 390 x 844, exercise previous/next/progress controls, and compare the desktop capture side by side with the supplied Cohere reference.
