# Experience Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current education-first Experience list with a verified, reverse-chronological editorial timeline that uses restrained contextual-focus motion.

**Architecture:** Keep the existing `Experience` component and localized content source, but give timeline entries explicit date and stage fields. Rendering remains semantic and non-interactive; CSS applies pointer-only contextual emphasis while preserving full readability for touch and reduced-motion users.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, CSS

---

## File Structure

- Modify `src/content.ts` — define the timeline date model and store reverse-chronological English and Chinese entries.
- Modify `src/content.test.ts` — verify content parity, date validity, and chronological structure.
- Modify `src/App.tsx` — render the separate date and stage fields without adding artificial interaction semantics.
- Modify `src/App.test.tsx` — verify entry order, period formatting, and semantic behavior.
- Modify `src/styles.css` — refine the two-column timeline and implement contextual hover/reduced-motion behavior.
- Create `docs/design-audits/experience-2026-06-25/experience-design-qa.md` — record visual verification evidence and findings.

## Verified Date Source

The site owner supplied `C:/Users/PC/Downloads/Resume_Xiaoyu Feng_PMP.pdf`. Text extraction and visual inspection confirm these ranges:

1. Huawei Canada · Waterloo Research Center: Jun 2025–Present
2. Huawei Greece: Aug 2022–Nov 2024
3. Huawei software engineering: Aug 2021–Jul 2022
4. Rexel Canada: Sep 2020–Mar 2021
5. University of New South Wales: Feb 2018–Jul 2020
6. University of Toronto: Sep 2013–Jun 2017

Use month-and-year precision throughout. Use `Present` only for the current role. Do not replace these values with dates from the superseded resume at `D:/resume/Xiaoyu Feng-PMP-PM.pdf`.

### Task 1: Introduce a Verified Timeline Content Model

**Files:**
- Create: `src/content.test.ts`
- Modify: `src/content.ts:1-9`
- Modify: `src/content.ts:79-122`
- Modify: `src/content.ts:303-346`

- [ ] **Step 1: Write the failing content-model tests**

Create `src/content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { content } from "./content";

const DATE = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;

describe("experience content", () => {
  it("keeps English and Chinese timelines aligned", () => {
    const english = content.en.experience.items;
    const chinese = content.zh.experience.items;

    expect(english).toHaveLength(6);
    expect(chinese).toHaveLength(6);
    expect(chinese.map((item) => [item.startDate, item.endDate])).toEqual(
      english.map((item) => [item.startDate, item.endDate])
    );
  });

  it("uses verified year-shaped fields and keeps the current role first", () => {
    const items = content.en.experience.items;

    for (const item of items) {
      expect(item.startDate).toMatch(DATE);
      expect(item.endDate === "Present" || DATE.test(item.endDate)).toBe(true);
      expect(item.stage.length).toBeGreaterThan(0);
    }

    expect(items[0]).toMatchObject({
      organization: "Huawei Canada · Waterloo Research Center",
      startDate: "Jun 2025",
      endDate: "Present",
      stage: "Organizational scale"
    });
    expect(items.at(-1)?.organization).toBe("University of Toronto");
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
npm test -- src/content.test.ts
```

Expected: FAIL because timeline items still expose `period` and do not expose `startDate`, `endDate`, or `stage`.

- [ ] **Step 3: Replace `TimelineItem.period` with explicit fields**

Change the type in `src/content.ts` to:

```ts
type TimelineItem = {
  startDate: string;
  endDate: string;
  stage: string;
  organization: string;
  role: string;
  summary: string;
};
```

- [ ] **Step 4: Rewrite both locale arrays in reverse chronological order**

For every entry, copy the exact range from the Verified Date Source into `startDate` and `endDate`. Use these English stage values:

```ts
[
  "Organizational scale",
  "Market ownership",
  "Technical depth",
  "Career foundation",
  "Graduate study",
  "Undergraduate foundation"
]
```

Use these Chinese stage values in the same order:

```ts
[
  "组织规模化",
  "市场责任",
  "技术深度",
  "职业基础",
  "研究生阶段",
  "本科基础"
]
```

Preserve each existing organization, role, and one-sentence summary. Write these exact date strings directly into both locale arrays:

```ts
[
  ["Jun 2025", "Present"],
  ["Aug 2022", "Nov 2024"],
  ["Aug 2021", "Jul 2022"],
  ["Sep 2020", "Mar 2021"],
  ["Feb 2018", "Jul 2020"],
  ["Sep 2013", "Jun 2017"]
]
```

Do not introduce a runtime date map, derive dates, or localize month names differently between the two currently inactive content arrays.

- [ ] **Step 5: Run the focused test and verify it passes**

Run:

```powershell
npm test -- src/content.test.ts
```

Expected: PASS with 2 tests.

- [ ] **Step 6: Commit the content-model change**

```powershell
git add src/content.ts src/content.test.ts
git commit -m "Refine experience timeline content model"
```

### Task 2: Render the Reverse-Chronological Editorial Timeline

**Files:**
- Modify: `src/App.test.tsx:18-32`
- Modify: `src/App.tsx:150-176`

- [ ] **Step 1: Replace the existing Experience test with order and format assertions**

Update the Experience test in `src/App.test.tsx`:

```tsx
it("renders a reverse-chronological experience timeline with explicit dates and stages", () => {
  render(<App />);

  const experience = screen.getByRole("region", {
    name: /a career built across data, technology, markets, and organizations/i
  });
  const entries = within(experience).getAllByRole("article");

  expect(entries).toHaveLength(6);
  expect(within(entries[0]).getByText("Huawei Canada · Waterloo Research Center")).toBeInTheDocument();
  expect(within(entries[5]).getByText("University of Toronto")).toBeInTheDocument();

  for (const entry of entries) {
    expect(entry.querySelector(".timeline-period")?.textContent).toMatch(
      /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}–(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}|Present) · .+/
    );
    expect(entry).not.toHaveAttribute("tabindex");
  }
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: FAIL because the current timeline is education-first and renders `period` without a date range.

- [ ] **Step 3: Render date range and stage as one readable period line**

Replace the timeline mapping inside `Experience` with:

```tsx
<div className="compact-timeline" data-reveal>
  {copy.experience.items.map((item, index) => (
    <article
      className="timeline-entry"
      key={`${item.organization}-${item.role}`}
      data-timeline-index={index}
    >
      <span className="timeline-number">0{index + 1}</span>
      <span className="timeline-node" aria-hidden="true" />
      <div className="timeline-entry__content">
        <p className="timeline-period">
          <span>{item.startDate}–{item.endDate}</span>
          <span aria-hidden="true"> · </span>
          <span>{item.stage}</span>
        </p>
        <h3>{item.organization}</h3>
        <p className="timeline-role">{item.role}</p>
        <p className="timeline-summary">{item.summary}</p>
      </div>
    </article>
  ))}
</div>
```

Do not add `tabIndex`, buttons, links, click handlers, expanded states, or ARIA selection attributes. These entries remain informational articles.

- [ ] **Step 4: Run the focused component test and verify it passes**

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: PASS for all tests in `src/App.test.tsx`.

- [ ] **Step 5: Commit the rendering change**

```powershell
git add src/App.tsx src/App.test.tsx
git commit -m "Render reverse chronological experience timeline"
```

### Task 3: Refine Layout and Add Contextual Focus

**Files:**
- Modify: `src/styles.css:409-507`
- Modify: `src/styles.css:730-809`

- [ ] **Step 1: Record the baseline before changing CSS**

Run:

```powershell
npm run build
```

Expected: PASS. If it fails, stop and fix the pre-existing failure before attributing it to timeline styling.

- [ ] **Step 2: Loosen the two-column layout and entry spacing**

Replace the Experience layout rules with:

```css
.experience-layout {
  grid-template-columns: minmax(320px, 0.78fr) minmax(650px, 1.22fr);
  gap: clamp(64px, 7vw, 110px);
}

.compact-timeline {
  position: relative;
  display: grid;
  padding-left: 35px;
}

.compact-timeline::before {
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 4px;
  width: 1px;
  content: "";
  background: rgba(16, 44, 61, 0.24);
}

.timeline-entry {
  position: relative;
  display: grid;
  grid-template-columns: 38px 1fr;
  gap: 14px;
  min-height: 112px;
  padding: 10px 0 16px;
  border-bottom: 1px solid rgba(16, 44, 61, 0.14);
  transition:
    opacity 210ms ease,
    transform 210ms ease;
}

.timeline-entry__content {
  min-width: 0;
}
```

Keep the current typography hierarchy, but set `.timeline-period` to allow natural wrapping rather than forcing a single line.

- [ ] **Step 3: Add restrained contextual-focus behavior**

Add:

```css
@media (hover: hover) and (pointer: fine) {
  .compact-timeline:hover .timeline-entry {
    opacity: 0.74;
  }

  .compact-timeline .timeline-entry:hover {
    opacity: 1;
    transform: translateX(5px);
  }

  .timeline-entry:hover .timeline-node {
    transform: scale(1.28);
    box-shadow:
      0 0 0 1px rgba(16, 44, 61, 0.25),
      0 0 0 5px rgba(63, 125, 130, 0.13);
  }
}
```

Update `.timeline-node` so its transition is explicit:

```css
.timeline-node {
  transition:
    transform 210ms ease,
    box-shadow 210ms ease;
}
```

Do not add a filled hover background, card border, scale on the entire entry, or dimming below `0.70`.

- [ ] **Step 4: Preserve reduced-motion and touch behavior**

Inside the existing reduced-motion query, add:

```css
.timeline-entry,
.timeline-node {
  transform: none !important;
}
```

The contextual-focus rules already remain pointer-only because they are wrapped in `@media (hover: hover) and (pointer: fine)`. Do not duplicate them outside that query.

- [ ] **Step 5: Keep compact-height rules readable**

In the existing `max-height` queries, remove any rule that compresses a timeline entry below `96px`. Retain smaller spacing only if organization, role, and summary remain legible at 1280 × 800.

- [ ] **Step 6: Run automated verification**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected:

- Vitest: all tests PASS
- TypeScript lint script: exit code 0
- Production build: exit code 0

- [ ] **Step 7: Commit the styling change**

```powershell
git add src/styles.css
git commit -m "Add contextual focus to experience timeline"
```

### Task 4: Perform Browser and Accessibility QA

**Files:**
- Create: `docs/design-audits/experience-2026-06-25/experience-design-qa.md`
- Create: `docs/design-audits/experience-2026-06-25/01-experience-default.png`
- Create: `docs/design-audits/experience-2026-06-25/02-experience-hover.png`

- [ ] **Step 1: Start the production preview**

Run:

```powershell
npm run build
npm run preview -- --host 127.0.0.1
```

Expected: Vite prints a local preview URL and serves the production build.

- [ ] **Step 2: Capture the default Experience state**

Using the available browser-control workflow, open the preview at 1280 × 800, navigate to `#experience`, and save:

```text
docs/design-audits/experience-2026-06-25/01-experience-default.png
```

Verify all six entries are visible or naturally reachable without clipping, with Huawei Canada first and University of Toronto last.

- [ ] **Step 3: Capture contextual focus**

Hover the Huawei Greece entry and save:

```text
docs/design-audits/experience-2026-06-25/02-experience-hover.png
```

Verify:

- hovered entry shifts only slightly
- its node is visibly stronger
- other entries remain readable
- no entry changes height
- no text or timeline rule jumps

- [ ] **Step 4: Check non-hover and reduced-motion states**

At the site's current minimum supported desktop width, verify there is no additional horizontal overflow from Experience.

Emulate reduced motion and confirm the active entry does not translate. Emulate a touch-capable viewport and confirm all entries remain equally emphasized.

- [ ] **Step 5: Write the QA record**

Create `docs/design-audits/experience-2026-06-25/experience-design-qa.md` with:

```md
# Experience Design QA

- Viewport: 1280 × 800
- Default capture: `01-experience-default.png`
- Hover capture: `02-experience-hover.png`

## Verified

- Reverse chronology is correct.
- Date and stage formatting is consistent.
- Contextual focus is restrained and restores cleanly.
- Reduced motion removes translation.
- Touch presentation does not depend on hover.
- No clipping or new horizontal overflow was introduced.

## Findings

No unresolved P0, P1, or P2 findings.
```

If a P0–P2 issue exists, document it, fix it, recapture the affected state, and only then mark the QA record as passed.

- [ ] **Step 6: Run final verification**

Run:

```powershell
npm test
npm run lint
npm run build
git diff --check
git status --short
```

Expected: all commands succeed; `git status --short` lists only the new QA files.

- [ ] **Step 7: Commit QA evidence**

```powershell
git add docs/design-audits/experience-2026-06-25
git commit -m "Verify experience section design"
```

## Completion Checklist

- [ ] All six date ranges match the visually verified latest resume and no date was inferred.
- [ ] English and Chinese timelines share the same date ranges and order.
- [ ] The current role is first and undergraduate education is last.
- [ ] Each entry contains date range, stage, organization, role or degree, and one sentence.
- [ ] Timeline entries remain semantic, static articles.
- [ ] Pointer hover provides contextual focus without hiding other entries.
- [ ] Touch and reduced-motion states remain fully readable.
- [ ] Tests, type-checking, production build, browser QA, and diff checks pass.
