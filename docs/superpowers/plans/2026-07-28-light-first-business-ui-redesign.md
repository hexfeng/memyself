# Light-First Business UI Redesign Implementation Plan

Date: July 28, 2026  
Design source: `../specs/2026-07-28-light-first-business-ui-redesign.md`

## Scope Guardrails

Preserve the current page order, section IDs, navigation destinations, content categories, and Cohere-style strategic-project behavior. This plan changes the visual system, Hero presentation, theme behavior, and Experience interaction only.

## Phase 1: Lock Behavior with Tests

1. Update `src/app.test.tsx`, replacing assertions for the outgoing video, timeline, auto-advance, and wheel-navigation behavior, to cover:
   - First render uses light mode when no saved choice exists.
   - The upper-right theme control toggles to dark and back to light.
   - A saved manual theme is restored.
   - An invalid saved theme falls back to light.
   - The theme control's accessible label always names the destination theme.
   - The Hero renders the corrected `Project & Program Manager` label and never renders `Manger`.
   - The Hero descriptive statement is visible while the location remains removed.
   - Role rotation pauses while the role is hovered, while focus is inside the Hero, and while the document is hidden.
   - Every Experience entry is collapsed initially.
   - Expanding two Experience entries leaves both expanded.
   - Clicking an expanded entry collapses only that entry.
   - Strategic projects change through previous, next, and direct selection but do not auto-advance.
2. Extend `src/content.test.ts` for the exact role sequence and month/year Experience data.
3. Update `src/styles.test.ts` for theme tokens, the separate accessible light accent-text token, reduced-motion role rules, opaque post-Hero header rules, and removal of the global video/glass styling.
4. Mock Vanta at the dynamic-import boundary so component tests remain deterministic. Verify successful cleanup, initialization failure fallback, and that reduced-motion or missing-WebGL environments do not initialize Vanta.

## Phase 2: Add the Theme Foundation

1. Define centralized light tokens under `:root` and dark overrides under `[data-theme='dark']` in `src/styles.css`.
2. Cover page backgrounds, surfaces, primary and secondary text, borders, accent, controls, focus rings, and project-progress colors.
3. Add a small theme state boundary in `src/app.tsx`:
   - Restore a valid stored choice.
   - Fall back to light regardless of system preference.
   - Apply the root `data-theme` value.
   - Persist only explicit user changes.
4. Add an accessible sun/moon toggle as the always-visible rightmost Header control. Keep Resume immediately to its left on desktop and hidden on mobile with the desktop navigation.
5. Add a small guarded script in `index.html`, before the application module, that applies a valid stored theme and otherwise applies light. Do not defer this work to `src/main.tsx`.

## Phase 3: Replace the Global Background and Restyle the Header

1. Remove `SceneBackdrop` and the `/site-background.mp4` render path from `src/app.tsx`.
2. Delete `public/site-background.mp4`; removing only its render path would leave the roughly 90 MB asset in production output.
3. Remove or rewrite `.scene-backdrop`, `.scene-backdrop__video`, `.scene-backdrop__shade`, and global translucent screen washes in `src/styles.css`.
4. Give every non-Hero section an opaque theme surface.
5. Keep the Header fixed to the top edge across the full viewport width and add an observed/scroll state for whether the Hero is active.
6. Render an opaque theme-colored Header with a fine border after the viewport leaves the Hero; ensure the state change does not alter Header dimensions.

## Phase 4: Build the New Hero

1. Change `content.hero` in `src/content.ts` to include the exact corrected role list:
   - Strategist
   - Product Manager
   - Developer
   - Project & Program Manager
   - Community Builder
2. Remove the visible Hero eyebrow and location from `Hero`; retain the statement, name, and existing action destinations.
3. Create a focused `RotatingRoles` component in `src/app.tsx`:
   - Maintain the current role index.
   - Advance every 2 seconds and map each role to its own accessible blue, cyan, rose, violet, or green color.
   - Pause while the role region is hovered, while focus is anywhere inside the Hero, and while the document is hidden.
   - Resume without resetting.
   - Clean up timers and visibility listeners.
4. Reserve a stable role viewport sized for the longest label and implement vertical enter/exit transitions in normal motion mode.
5. In the reduced-motion media query, replace roles without translation; use immediate replacement or opacity only.
6. Keep transitional copies hidden from assistive technology and expose a stable identity description.
7. Reduce the name and role scale one visual step, and separate the four action boxes with high-contrast inverse hover states.

## Phase 5: Add Hero-Scoped Vanta Fog

1. Add compatible `vanta` and `three` dependencies to `package.json` and update the lockfile.
2. Add the minimum local TypeScript declaration only if the package does not provide usable types.
3. Create a `FogBackground` component mounted inside the Hero:
   - Render the static CSS fallback immediately.
   - Dynamically import Vanta and Three when reduced motion is not requested; let Vanta perform WebGL initialization without a separate throwaway-canvas probe.
   - Initialize from a DOM ref.
   - Apply the exact light or dark parameter set from the design specification.
   - Destroy before reinitializing for a theme change.
   - Destroy on unmount.
4. Add a theme-aware static CSS fallback for reduced motion, WebGL absence, and initialization failure; the light fallback mirrors the configured blue, cyan, and gray Fog palette at visible intensity, and initialization failures remain visible in the console.
5. Keep the canvas behind Hero content, inside the Hero boundary, `aria-hidden`, and free of pointer events.

## Phase 6: Replace Experience Timeline with a Multi-Open Accordion

1. Retain the existing `ExperienceItem` data and logos in `src/content.ts`; continue storing separate `startDate` and `endDate` values with month and year.
2. Replace the active-index timeline logic with one native `<details>` element per entry and an empty initial open state.
3. Use the entire `<summary>` as the row trigger. Native independent state allows multiple entries to remain open without a React `Set`, generated control IDs, or shared accordion state.
4. In a collapsed summary row, render only logo, organization/school, role/degree, month-and-year range, and chevron.
5. Render the existing one-sentence experience description inside the details body; richer detail content is outside this scope.
6. Replace timeline-node and contextual-hover styling with separated, consistent-height accordion cards using fine borders, light corner rounding, restrained elevation, and theme-aware states.
7. Use the compact source logo assets in larger frameless slots with `object-fit: contain`; adapt the white University of Toronto mark to remain visible in light and dark themes.
8. Stack or reposition dates on mobile without truncating long identity text.
9. Remove artificial list-item tab stops and the obsolete IntersectionObserver behavior.

## Phase 7: Re-Skin Existing Project and Contact Sections

1. Convert ordinary project cards and Contact surfaces from transparent/glowing treatments to the shared opaque tokens.
2. Preserve `StrategicProjectShowcase` state, controls, progress selection, transition direction, masks, responsive behavior, and user-initiated transition timing.
3. Replace only its glass backgrounds, borders, control colors, progress colors, and transition mask fill colors.
4. Remove the 30-second auto-advance timer. Keep project changes manual and avoid timed live-region announcements.
5. Exercise next, previous, wraparound, and direct progress selection in both themes to catch geometry seams.
6. Restyle section progress and all focus/hover states for consistent contrast.

## Phase 8: Restore Native Scrolling

1. Delete the global wheel handler and its lock timer from `src/app.tsx`.
2. Remove the test that expects one section jump per wheel step.
3. Keep native page scrolling, existing anchor navigation, and reduced-motion scroll behavior. Do not add boundary detection or trackpad-intent heuristics.

## Phase 9: Verification

Run:

```bash
npm test
npm run lint
npm run build
```

Perform browser QA at 1440 × 900, 1280 × 800, and 390 × 844 in both themes. Capture at least the updated Hero and Experience section because the change is perceptible and visual.

Verify:

- First-visit light mode and persisted manual selection
- Always-visible upper-right theme button, desktop Resume placement, and opaque scrolled Header
- Exact Fog colors and Hero-only canvas scope
- Deferred Vanta loading, cleanup, and static fallback
- Correct role spelling, order, pause behavior, stable width, and reduced-motion replacement
- Existing Hero action destinations
- Fully collapsed Experience initial state
- Multiple simultaneous Experience expansions and independent collapse
- Month/year visibility and mobile wrapping
- Natural scrolling with expanded details and no global wheel interception
- Strategic-project geometry, manual controls, and user-initiated animation in both themes; verify no timed auto-advance
- Keyboard navigation, focus visibility, touch behavior, and contrast
- Absence of `site-background.mp4` from `public/` and the production output

## Completion Criteria

The implementation is complete only when automated tests, TypeScript checks, and production build pass; the required screenshots have been reviewed; the public video asset, global wheel interception, project auto-advance, and global glass dependency are absent; and every acceptance criterion in the design specification is satisfied.

