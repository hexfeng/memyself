# Light-First Business UI Redesign Implementation Plan

Date: July 28, 2026  
Design source: `../specs/2026-07-28-light-first-business-ui-redesign.md`

## Scope Guardrails

Preserve the current page order, section IDs, navigation destinations, content categories, and Cohere-style strategic-project behavior. This plan changes the visual system, Hero presentation, theme behavior, and Experience interaction only.

## Phase 1: Lock Behavior with Tests

1. Extend `src/app.test.tsx` to cover:
   - First render uses light mode when no saved choice exists.
   - The upper-right theme control toggles to dark and back to light.
   - A saved manual theme is restored.
   - The Hero renders the corrected `Project & Program Manager` label and never renders `Manger`.
   - Hero descriptive statement and location are no longer visible.
   - Every Experience entry is collapsed initially.
   - Expanding two Experience entries leaves both expanded.
   - Clicking an expanded entry collapses only that entry.
2. Extend `src/content.test.ts` for the exact role sequence and month/year Experience data.
3. Extend `src/styles.test.ts` for theme tokens, reduced-motion role rules, opaque post-Hero header rules, and removal of the global video/glass styling.
4. Mock Vanta at the module boundary so component tests remain deterministic and verify instance cleanup without WebGL.

## Phase 2: Add the Theme Foundation

1. Define centralized light tokens under `:root` and dark overrides under `[data-theme='dark']` in `src/styles.css`.
2. Cover page backgrounds, surfaces, primary and secondary text, borders, accent, controls, focus rings, and project-progress colors.
3. Add a small theme state boundary in `src/app.tsx`:
   - Restore a valid stored choice.
   - Fall back to light regardless of system preference.
   - Apply the root `data-theme` value.
   - Persist only explicit user changes.
4. Add an accessible sun/moon toggle to the right side of `Header`.
5. Prevent an initial theme flash by applying the stored value before or at the earliest application bootstrap point in `src/main.tsx` or `index.html`.

## Phase 3: Replace the Global Background and Restyle the Header

1. Remove `SceneBackdrop` and the `/site-background.mp4` render path from `src/app.tsx`.
2. Remove or rewrite `.scene-backdrop`, `.scene-backdrop__video`, `.scene-backdrop__shade`, and global translucent screen washes in `src/styles.css`.
3. Give every non-Hero section an opaque theme surface.
4. Keep the Header sticky and add an observed/scroll state for whether the Hero is active.
5. Render an opaque theme-colored Header with a fine border after the viewport leaves the Hero; ensure the state change does not alter Header dimensions.

## Phase 4: Build the New Hero

1. Change `content.hero` in `src/content.ts` to include the exact corrected role list:
   - Strategist
   - Product Manager
   - Developer
   - Project & Program Manager
   - Community Builder
2. Remove the visible Hero eyebrow, statement, and location from `Hero` while retaining the name and existing action destinations.
3. Create a focused `RotatingRoles` component in `src/app.tsx`:
   - Maintain the current role index.
   - Pause for pointer hover, keyboard focus, and hidden-document state.
   - Resume without resetting.
   - Clean up timers and visibility listeners.
4. Reserve a stable role viewport sized for the longest label and implement vertical enter/exit transitions in normal motion mode.
5. In the reduced-motion media query, replace roles without translation; use immediate replacement or opacity only.
6. Keep transitional copies hidden from assistive technology and expose a stable identity description.

## Phase 5: Add Hero-Scoped Vanta Fog

1. Add compatible `vanta` and `three` dependencies to `package.json` and update the lockfile.
2. Add the minimum local TypeScript declaration only if the package does not provide usable types.
3. Create a `FogBackground` component mounted inside the Hero:
   - Initialize from a DOM ref.
   - Apply the exact light or dark parameter set from the design specification.
   - Destroy before reinitializing for a theme change.
   - Destroy on unmount.
4. Add a theme-aware static CSS fallback for reduced motion, WebGL absence, and initialization failure.
5. Keep the canvas behind Hero content, inside the Hero boundary, `aria-hidden`, and free of pointer events.

## Phase 6: Replace Experience Timeline with a Multi-Open Accordion

1. Retain the existing `ExperienceItem` data and logos in `src/content.ts`; continue storing separate `startDate` and `endDate` values with month and year.
2. Replace the active-index timeline logic in `ExperienceTimeline` with a `Set` of expanded item identifiers or indexes.
3. Initialize the set empty.
4. Toggle only the activated item so multiple items remain expanded simultaneously.
5. Make the entire row a native button with `aria-expanded` and a stable `aria-controls` target.
6. In a collapsed row, render only logo, organization/school, role/degree, month-and-year range, and chevron.
7. In the controlled detail region, initially render the existing summary.
8. Replace timeline-node and contextual-hover styling with consistent-height accordion rows, fine borders, aligned logos, and theme-aware states.
9. Stack or reposition dates on mobile without truncating long identity text.
10. Remove artificial list-item tab stops and the obsolete IntersectionObserver behavior.

## Phase 7: Re-Skin Existing Project and Contact Sections

1. Convert ordinary project cards and Contact surfaces from transparent/glowing treatments to the shared opaque tokens.
2. Preserve `StrategicProjectShowcase` state, controls, progress selection, transition direction, masks, responsive behavior, and timing.
3. Replace only its glass backgrounds, borders, control colors, progress colors, and transition mask fill colors.
4. Exercise next, previous, wraparound, and direct progress selection in both themes to catch geometry seams.
5. Restyle section progress and all focus/hover states for consistent contrast.

## Phase 8: Reconcile Section Scrolling

1. Review the global wheel handler in `src/app.tsx` after Experience can grow beyond one viewport.
2. Allow natural scrolling inside the current expanded section.
3. Trigger section-to-section navigation only at the relevant section boundary and never intercept scrollable descendants or small trackpad intent.
4. Preserve reduced-motion behavior and existing anchor navigation.

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
- Upper-right theme button and opaque scrolled Header
- Exact Fog colors and Hero-only canvas scope
- Vanta cleanup and static fallback
- Correct role spelling, order, pause behavior, stable width, and reduced-motion replacement
- Existing Hero action destinations
- Fully collapsed Experience initial state
- Multiple simultaneous Experience expansions and independent collapse
- Month/year visibility and mobile wrapping
- Natural scrolling with expanded details
- Strategic-project geometry, controls, and animation in both themes
- Keyboard navigation, focus visibility, touch behavior, and contrast

## Completion Criteria

The implementation is complete only when automated tests, TypeScript checks, and production build pass; the required screenshots have been reviewed; no global video/glass dependency remains; and every acceptance criterion in the design specification is satisfied.

