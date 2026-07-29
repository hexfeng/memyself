# Light-First Business UI Redesign

Date: July 28, 2026  
Status: Approved design direction

## Purpose

Refresh the portfolio from an immersive video-and-glass presentation into a quieter, more concise business-oriented interface. The page's section order, navigation targets, content categories, and strategic-project interaction remain unchanged. This specification defines only the new visual language and the bounded interaction changes required for the Hero, theme control, and Experience entries.

This specification supersedes the global video/glass treatment in the current implementation and the Experience presentation rules in `2026-06-25-experience-section-design.md`. The Cohere-style layout and interaction described in `2026-07-15-cohere-strategic-project-showcase-design.md` remain authoritative except where this document replaces their colors and glass materials.

## Design Principles

The approved direction is editorial business minimalism:

- Use light mode by default and provide an explicit light/dark toggle.
- Prefer solid surfaces, fine borders, clear hierarchy, and restrained effects over glass, glow, and heavy blur.
- Limit continuous motion to the Hero fog and rotating professional identity.
- Keep strategic-project changes user initiated; the showcase does not auto-advance.
- Keep all information readable without hover, animation, or WebGL.
- Preserve the existing information architecture and recognizable Cohere-style strategic-project geometry.

## Theme System

### Behavior

- The first visit always uses light mode, regardless of the operating-system preference.
- A theme button appears in the upper-right header area.
- The button toggles directly between light and dark modes and has an accessible label that names the destination theme.
- A manual choice is persisted locally and restored by a small bootstrap script in `index.html` before the application module loads.
- Invalid stored values or unavailable local storage fall back to light without blocking the page.
- The document exposes the active theme through a root attribute such as `data-theme="light"` or `data-theme="dark"`.
- Theme changes update every surface, text color, border, control, focus style, and the Hero fog—not only the page background.

### Visual Tokens

Implementation should centralize theme values as CSS custom properties. The initial palette is:

| Purpose | Light | Dark |
| --- | --- | --- |
| Page background | `#f7f8fa` | `#0b0c0f` |
| Primary surface | `#ffffff` | `#121419` |
| Primary text | `#111318` | `#f4f5f7` |
| Secondary text | `#5e6470` | `#a5aab4` |
| Border | `#dde1e8` | `#2b2f37` |
| Accent for controls and decoration | `#5576fc` | `#8da4ff` |
| Accent text | `#4563df` | `#8da4ff` |
| Hover surface | `#f1f4fa` | `#191c23` |

The light accent text is separate because `#5576fc` does not meet the 4.5:1 contrast target for normal text on the approved light surfaces. The Hero fog retains its exact approved `#5576fc` highlight. Other values may receive small contrast adjustments during visual QA, but the palette must remain neutral and business-like. Avoid luminous white edges, colored glow, and translucent content cards.

## Header

- Retain the existing brand and primary navigation structure.
- Place the light/dark toggle at the upper right and keep it visible at every supported viewport.
- On desktop, keep the existing Resume control immediately to the left of the theme toggle. On mobile, Resume and the desktop navigation may remain hidden, but the brand and theme toggle remain reachable.
- The header remains fixed to the top edge and spans the full viewport width.
- Over the Hero, it is a full-width fixed translucent bar with a fine bottom separator and no backdrop blur; central navigation uses the primary text color and semibold weight for reliable contrast over the fog.
- Once the page leaves the Hero, the header becomes an opaque theme-colored surface with a fine lower border.
- Header state changes must not cause a layout shift.
- Keyboard focus remains clearly visible in both themes.

## Hero

### Information Hierarchy

The Hero contains only:

1. `Xiaoyu Feng` as the dominant page title.
2. A professional identity line consisting of the fixed article `A` and one rotating role.
3. The existing one-sentence professional statement.
4. The existing navigation/action boxes, separated by visible gaps with high-contrast inverse hover states.

Remove the current section eyebrow and location from the visible Hero. Keep the name and role visually dominant over the supporting statement.

### Rotating Roles

Use this exact spelling and order:

1. Strategist
2. Product Manager
3. Developer
4. Project & Program Manager
5. Community Builder

`Project & Program Manger` is a typo and must not appear in content, tests, documentation, or accessible labels.

In normal motion mode, a padded fixed-height clipped viewport makes the current role scroll fully upward out of frame while the next role scrolls upward from below. After the new role settles, it remains still for 2 seconds before the next transition. Each role has a stable, distinct accessible color (blue, cyan, rose, violet, and green in sequence), and the container reserves enough width for the longest label so switching does not shift surrounding content.

Pointer hover over the role region and keyboard focus anywhere inside the Hero pause both an active transition and the next scheduled transition. Hover also adds a restrained white glow. The non-interactive role text does not receive an artificial tab stop. Leaving the hover or focus region resumes from the current item rather than resetting the sequence. Rotation also pauses while the page is hidden.

With `prefers-reduced-motion: reduce`, roles may continue to change, but the transition uses no positional movement. An immediate replacement or restrained opacity-only change is acceptable. Hidden and transitional copies must not be repeatedly announced by assistive technology.

### Fog Background

Vanta.js Fog is confined to the Hero and never acts as the global page background.

Light mode:

```text
highlightColor: 0x0020ff
midtoneColor: 0x00e3ff
lowlightColor: 0xbdbdbd
baseColor: 0xffffff
blurFactor: 0.7
zoom: 1
speed: 1.5
mouseControls: true
touchControls: true
gyroControls: false
minHeight: 200
minWidth: 200
```

Dark mode:

```text
highlightColor: 0xffffff
midtoneColor: 0x494949
lowlightColor: 0x3a3a3a
baseColor: 0x000000
blurFactor: 0.7
zoom: 0.7
speed: 1.6
```

The Hero paints a theme-appropriate static CSS fallback first. The light fallback uses the same blue, cyan, and gray palette at visible intensity so non-WebGL environments retain the approved visual direction. When motion is allowed, dynamically import Vanta and Three and let Vanta attempt WebGL initialization rather than blocking it with a separate probe. The implementation must destroy the Vanta instance on unmount and before theme-driven reinitialization. WebGL absence, initialization failure, and reduced-motion environments keep the static fallback, and initialization failures remain visible in the console. Fog canvas elements do not receive pointer input or meaningful accessibility semantics.

## Non-Hero Sections

Every section below the Hero uses an opaque, solid background selected by the active theme. Remove reliance on the global video, translucent white washes, glass cards, and glowing edges, and remove the unused `public/site-background.mp4` asset so it is not copied into production builds. Section boundaries may use subtle alternation between page and primary-surface tokens, but should not introduce new gradients or decorative animation.

## Experience

### Collapsed Entry

Retain all existing logos and source content. Replace the current editorial timeline with a compact, consistent-height accordion list inspired by the supplied reference. A collapsed row contains only:

- Organization or school logo
- Organization or school name
- Role, title, or degree
- Start and end dates including month and year
- Expansion indicator

Use the existing `Mon YYYY` form, such as `Jun 2025 – Present`. Do not reduce dates to years only. Stage labels and summaries remain in the data model but are not required in the collapsed header.

### Accordion Behavior

- Every entry is collapsed initially.
- Implement each entry with native `<details>` and `<summary>` elements; the whole summary row is the activation target.
- Activating an expanded row collapses it again.
- Multiple entries may be expanded simultaneously without shared React expansion state.
- Expanded details render only the existing one-sentence experience description in this scope.

Rows are visually independent cards with equal collapsed heights on desktop, visible gaps, low-contrast borders, light corner rounding, restrained elevation, and clear hover/focus treatments. Logos have no surrounding tile or border; use the compact source assets inside larger aligned `contain` slots so every mark remains complete and legible in both themes. On small screens, long organization and role names wrap naturally and the date moves beneath the main identity rather than being truncated.

Expansion must not depend on hover. Reduced motion removes height/position choreography while preserving an immediate state change. Remove the global wheel handler and use native page scrolling so expanded content and trackpad input are never intercepted.

## Selected Strategic Projects

Retain the existing Cohere-inspired composition and behavior:

- Overlapping text and media panels
- Diagonal/trapezoidal text-panel edge
- Previous and next controls
- Direct progress selection
- Direction-aware transition
- Existing responsive stacking and reduced-motion behavior

Previous, next, and direct progress controls are the only ways to change projects. Remove the existing 30-second auto-advance timer. Preserve the direction-aware transition for user-initiated changes, but do not create a timed announcement or motion cycle.

Only the visual material changes. Replace glass and glow with opaque theme surfaces, fine theme-aware borders, neutral controls, and a blue active progress treatment. During every transition phase, masks and pseudo-elements must use the correct theme background so no former video or glass color shows through.

## Accessibility and Resilience

- All controls are keyboard operable and have visible focus states.
- Theme and accordion controls expose their current state.
- Color contrast meets WCAG AA for normal text and controls.
- The experience remains complete without WebGL, hover, or animation.
- `prefers-reduced-motion` removes positional role transitions and nonessential accordion movement.
- Touch layouts do not depend on hover states.
- Dynamic role changes do not create repetitive live-region announcements.
- Strategic projects never advance without user input.

## Responsive Requirements

Verify the design at 1440 × 900, 1280 × 800, and 390 × 844.

- The Hero name scales without clipping.
- The professional identity accommodates the longest role without horizontal overflow.
- Hero actions wrap in their existing order.
- Experience rows remain scannable when dates move below titles.
- Strategic-project panels preserve the approved stacked mobile behavior.
- The fixed header and always-visible theme button remain reachable without covering anchored headings.

## Acceptance Criteria

- Light is the first-visit default; the upper-right toggle switches and persists themes.
- The fixed header becomes opaque after leaving the Hero.
- The global video, its public asset, and the white glowing glass treatment are absent.
- Vanta Fog appears only in the Hero with the exact approved theme parameters and a static fallback.
- The Hero shows the name, corrected rotating roles, and existing action boxes without descriptive text.
- Role rotation pauses on role hover or focus within the Hero and uses no positional transition under reduced motion.
- Experience starts fully collapsed, shows month and year, and permits multiple simultaneous expansions.
- Native page scrolling replaces global wheel interception.
- Strategic-project geometry and user-initiated animation remain intact while borders and surfaces match both themes; projects do not auto-advance.
- The complete page remains usable at the approved viewports, by keyboard, and without WebGL.

