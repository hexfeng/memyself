# Experience Section Design

Date: June 25, 2026  
Status: Approved design

## Purpose

The Experience section presents a complete, credible, and quickly scannable personal history inside the portfolio. Its primary job is to show the visitor where Xiaoyu has studied and worked. The progression from data analysis to technology, markets, and organizational leadership should be visible, but remain a supporting narrative rather than the section's headline.

Detailed outcomes, metrics, and project evidence remain in the project sections that follow.

## Information Architecture

Education and professional experience remain on one continuous timeline. Entries appear in reverse chronological order so the current role is visible first.

Each entry contains exactly:

1. Verified year range and a short stage label
2. Organization
3. Role or degree
4. One-sentence summary

The period line uses this format:

`YYYY–YYYY · Stage label`

The current position may use:

`YYYY–Present · Organizational scale`

Real dates must be confirmed by the site owner before implementation. The design must not infer or publish unverified dates.

The approved entry order is:

1. Huawei Canada · Waterloo Research Center
2. Huawei Greece
3. Huawei
4. Rexel Canada
5. University of New South Wales
6. University of Toronto

## Layout

Use a refined two-column composition that preserves the site's existing editorial structure:

- Left column: section label, headline, and short introduction
- Right column: compact vertical timeline

The left column remains visually calm and provides context. The right column carries the chronological detail.

The timeline should be less dense than the current implementation. Entries need enough vertical separation for the organization, role, and summary to be read as one unit without becoming card-like. A thin vertical rule and restrained teal nodes preserve chronological continuity.

The section remains one viewport-oriented chapter on desktop where practical, but content must not be compressed merely to force an exact one-screen height.

## Content Treatment

The headline should describe the breadth of the career without overstating a transformation story. The introduction may mention that each chapter added a new layer of capability, but chronology and role clarity come first.

Stage labels provide the supporting progression:

- Organizational scale
- Market ownership
- Technical depth
- Career foundation
- Graduate study
- Undergraduate foundation

Each summary stays to one concise sentence. Do not add achievement metrics, responsibility lists, skill chips, logos, expandable details, or calls to action.

## Interaction

The timeline is static and fully readable without interaction.

On pointer hover or keyboard focus:

- The active entry shifts horizontally by approximately 4–6 px.
- Its timeline node grows slightly.
- The other entries reduce to approximately 70–75% visual emphasis.
- No content expands, collapses, or changes position vertically.
- The full timeline returns immediately when the pointer or focus leaves the group.

The transition should feel calm and editorial, using an approximately 180–240 ms ease. The effect must not resemble a selected list item or interactive card.

Keyboard focus must provide equivalent emphasis when an entry contains or becomes a focusable element. If entries remain non-interactive semantic articles, the hover effect is decorative and they should not receive artificial tab stops.

Under `prefers-reduced-motion`, remove positional movement and retain only a subtle contrast change.

On touch devices, all content remains equally emphasized; the section must not depend on hover.

## Visual Language

Continue the established portfolio language:

- DM Sans typography
- Deep blue-green text
- Muted teal accents
- Pale mist-blue translucent section wash
- Fine low-contrast rules
- Square, editorial composition rather than rounded cards

The Experience section should bridge the immersive Hero and the more visual project sections. It should feel quieter than the projects and more structured than the Hero.

## Responsive Behavior

Desktop retains the two-column layout.

When the broader site gains responsive support below its current desktop minimum width, the section becomes a single column:

1. Section copy
2. Timeline

The timeline keeps its vertical rule and nodes, and text wraps naturally. Removing the site's current fixed desktop minimum width is outside this module's scope; this Experience implementation must not introduce any additional horizontal overflow.

## Component and Data Boundaries

Keep Experience as its own section component and render entries from the existing localized content model.

Update the timeline item data shape so dates and stage labels are separate fields rather than one ambiguous `period` string. This keeps presentation flexible and prevents punctuation from being embedded in translated content.

The timeline item model uses these conceptual fields:

- `startYear`
- `endYear` or `isCurrent`
- `stage`
- `organization`
- `role`
- `summary`

Both English and Chinese content must preserve the same entry order and meaning.

## Acceptance Criteria

- Current experience appears first and undergraduate education appears last.
- Education and employment share one continuous timeline.
- Every entry shows a verified date range, stage label, organization, role or degree, and one sentence.
- The section uses the approved two-column layout on desktop.
- Hover emphasis matches the contextual-focus behavior without hiding other entries.
- Content does not expand and no outcomes duplicate the project sections.
- Reduced-motion and touch behavior remain fully readable.
- English and Chinese content structures remain aligned.
- Existing reveal behavior, navigation anchor, and semantic heading structure continue to work.

## Verification

Implementation should be checked at the existing 1280 × 800 desktop reference viewport, at the site's current minimum supported desktop width, and with reduced motion enabled.

Verify:

- visual hierarchy and spacing
- no clipping or horizontal overflow
- reverse chronological order
- hover/focus restoration
- touch-safe static presentation
- English and Chinese content parity
- existing automated tests and production build
