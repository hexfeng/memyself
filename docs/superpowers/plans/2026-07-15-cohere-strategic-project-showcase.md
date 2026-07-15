# Cohere-Style Strategic Project Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace only the Strategic Business & GTM card grid with an accessible Cohere-style project carousel.

**Architecture:** Keep the generic `ProjectSection` path for all other sections and branch the `gtm` section to one stateful `StrategicProjectShowcase`. Use native React state, buttons, and CSS transitions; reuse the installed Lucide icons and add no dependency.

**Tech Stack:** React 19, TypeScript, CSS, Lucide React, Vitest, Testing Library, Vite

## Global Constraints

- Preserve the current uncommitted `src/App.tsx` and `src/App.test.tsx` work outside the requested section.
- Reuse the three existing strategic project records and keep all other project sections unchanged.
- Use local mock photography and empty image alt text.
- Support pointer, keyboard, 390px mobile layout, and reduced motion.
- Do not add Framer Motion, a carousel library, routes, or new content features.

---

## File Structure

- Modify `src/App.test.tsx` — prove the dedicated carousel renders and its controls update the active project while other sections remain card grids.
- Modify `src/App.tsx` — add the strategic-only carousel state, controls, and directional transition phase.
- Modify `src/content.ts` — attach optional mock image paths to the three existing strategic projects.
- Modify `src/styles.css` — reproduce the reference composition, motion, responsive layout, and reduced-motion treatment.

### Task 1: Prove the Strategic-Only Carousel Behavior

**Files:**
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: existing `App` and `content.gtm.cases`.
- Produces: an executable contract for a carousel named `Strategic project showcase`.

- [ ] **Step 1: Add the failing interaction test**

Render `App`, find `getByRole('group', { name: 'Strategic project showcase' })`, assert the first project is current, click `Next project`, wait for the second project, click the third progress button, and assert the third title is current. Also assert the Transformation section still contains three `.project-card` elements.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/App.test.tsx -t "switches strategic projects"`  
Expected: FAIL because the carousel region and controls do not exist.

### Task 2: Implement the Minimum Carousel and Cohere Visual Treatment

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/content.ts`
- Modify: `src/styles.css`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `CaseStudy[]` with optional `image?: string`.
- Produces: `StrategicProjectShowcase({ cases }: { cases: CaseStudy[] })` and the `Strategic project showcase` accessible group.

- [ ] **Step 1: Add mock image paths to strategic content**

Add `image?: string` to `CaseStudy`, then assign local image paths to the three `content.gtm.cases` entries. Leave every other case record untouched.

- [ ] **Step 2: Add the strategic-only render branch**

In `ProjectSection`, render `StrategicProjectShowcase` only for `id === 'gtm'`; retain the existing `.project-cards` markup for every other section.

- [ ] **Step 3: Implement native switching behavior**

Use `activeIndex`, `direction`, and a short `transitioning` phase. Previous/next buttons wrap with modulo arithmetic. Progress buttons select directly. Clear the transition timer on unmount and label the region and controls for assistive technology.

- [ ] **Step 4: Implement the reference layout and motion**

Keep the original `gtm` scene visible below a translucent blur veil. Add the diagonal glass text panel, rounded clipped media panel, minimal arrow controls, and three-segment progress track. Use CSS keyframes/classes for directional text/image transitions and the measured Cohere panel sequence (79%/20%, 500ms hold, then 700ms to 55%/55%), plus a stacked mobile layout and reduced-motion overrides.

- [ ] **Step 5: Run focused test and verify GREEN**

Run: `npm test -- src/App.test.tsx -t "switches strategic projects"`  
Expected: PASS.

- [ ] **Step 6: Run complete automated verification**

Run: `npm test`  
Expected: all tests pass.

Run: `npm run lint`  
Expected: TypeScript exits 0.

Run: `npm run build`  
Expected: production build exits 0.

- [ ] **Step 7: Run visual and interaction QA**

Open the local site, navigate to `#gtm`, inspect at 1440 x 900 and 390 x 844, exercise previous/next/direct progress controls, verify no console errors, and compare the desktop capture against the supplied Cohere screenshot. Fix visible spacing, crop, radius, border, or motion mismatches before handoff.

## Plan Self-Review

- Spec coverage: strategic-only scope, exact composition, controls, directional motion, mobile, reduced motion, and verification are covered.
- Placeholder scan: no deferred feature or implementation placeholder remains.
- Type consistency: `CaseStudy.image?: string` is the single new data field and is consumed only by `StrategicProjectShowcase`.
