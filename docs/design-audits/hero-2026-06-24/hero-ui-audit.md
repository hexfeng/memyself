# Hero UI Audit

Date: June 24, 2026
Surface: Desktop homepage Hero at 1280 × 800
Mode: Combined UX, visual-design, and accessibility review

## Audit scope

This review evaluates only the first screen of the personal portfolio. The intended user is a recruiter, hiring manager, executive, or industry partner who needs to understand Xiaoyu Feng's product, commercial, and transformation profile within a few seconds.

Evidence:

- [User-provided reference](./00-user-reference.png)
- [Current rendered Hero](./01-current-hero.png)

## Step list

1. **Land on the homepage Hero — generally healthy.** The visitor sees a strong landscape image, a stable top navigation, the name, positioning statement, expertise labels, and five next-step links.
2. **Scan the positioning — understandable but still broad.** Product strategy, customer solutions, and commercial growth are visible, although the statement does not yet make the type or scale of work concrete.
3. **Choose a next action — usable but weakly prioritized.** All five links are presented with equal weight, so the visitor must decide what matters instead of being guided toward the portfolio's main story.

## Strengths

1. **The composition has a memorable anchor.** The mountain creates a distinctive identity and leaves useful negative space on the right.
2. **The name is now immediate and readable.** The single-line heading establishes ownership of the page quickly.
3. **The information sequence is sensible.** Name → positioning → expertise → actions matches how a new visitor scans a portfolio.
4. **The panel solves the original contrast problem.** Dark text remains readable across the changing tones of the photograph.
5. **Interaction targets are generous.** The five action tiles are approximately 104 × 72 pixels at the audited viewport.
6. **The page has sound semantic landmarks.** The captured DOM exposes a banner, primary navigation, main region, H1, and named Hero navigation.

## UX risks

### P1 — Five equal actions hide the intended journey

Experience, Explore Projects, LinkedIn, GitHub, and Contact look equally important. For the target audience, the primary path should be obvious:

1. Explore Projects
2. Experience
3. Contact

LinkedIn and GitHub are supporting proof or external utilities. Equal tiles make the Hero feel like an app launcher and duplicate several options already present in the top navigation.

**Recommendation:** Create one clear primary action for `Explore Projects`, one secondary action for `Experience`, and move LinkedIn, GitHub, and Contact into a quieter text-link row or compact icon group.

### P1 — The positioning is polished but not specific enough

The statement explains the operating model but not the concrete domain. A recruiter can understand how Xiaoyu works, but not immediately see 5G products, go-to-market launches, AI research operations, or international technology markets.

**Recommendation:** Keep the outcome-led sentence, then add a short evidence line such as:

> Product strategy, GTM launches, and AI research operations across global telecom markets.

This is more credible than adding another set of abstract capability labels.

### P2 — Navigation duplicates the Hero actions

Experience, Projects, and Contact are available twice within the same viewport. This creates visual activity without adding choice value.

**Recommendation:** Let the header remain the persistent site map and use the Hero actions only for the two or three highest-value next steps.

### P2 — Resume currently communicates stronger functionality than it provides

The top-right control uses a download icon and looks like a real file download, but the current implementation routes to Contact.

**Recommendation:** Until the PDF exists, label it `Resume — soon`, remove the download icon, or hide the control. Restore the download treatment only when it downloads or opens the actual document.

## Visual-design risks

### P1 — The panel is visually heavier than the content requires

At 640 × 460 pixels, the translucent panel occupies roughly half the usable composition and competes with the mountain. Its rectangular boundary, five equal tiles, and strong internal grid make the page feel closer to a dashboard than an editorial leadership portfolio.

**Recommendation:** Reduce the panel to approximately 570–600 pixels wide, lower its opacity slightly less aggressively by using a more stable 78–84% pale surface, and soften the blur/shadow. The aim is a calm reading surface, not a glass effect.

### P1 — The panel edge creates an awkward tangent with the mountain

The panel begins around x=588, almost exactly where the mountain's right slope enters the text area. The hard vertical edge visually cuts the landscape rather than sitting comfortably within its negative space.

**Recommendation:** Move the panel 24–40 pixels farther right, or reduce its width so a deliberate gap appears between the mountain silhouette and the panel.

### P2 — The expertise row is too small and dense

Five uppercase labels wrap into two uneven lines. At roughly 11–12 pixels, they read more like metadata than meaningful positioning. The dot separators add noise once wrapping occurs.

**Recommendation:** Use three stronger pillars instead of five:

- Product & GTM Strategy
- AI Transformation
- Strategic Operations

Render them as a single calm line where possible, or as three evenly spaced columns without dot separators.

### P2 — The action tiles use inconsistent internal grammar

The first two tiles use trailing arrows, while the external and contact tiles use leading icons. The layout is technically aligned but visually mixed.

**Recommendation:** Use one rule for every action: label left, icon or arrow right. Add an external-link indicator only for LinkedIn and GitHub.

### P3 — The header is visually faint

The header works over the current cloud band, but its small uppercase navigation and transparent surface may lose contrast if the crop or image changes.

**Recommendation:** Give the header a subtle, consistent translucent wash from the first frame rather than relying on the photograph for contrast.

## Accessibility risks

1. **Small text:** Header navigation and expertise labels are near the lower comfortable size for desktop reading. Increase them to at least 12–13 pixels with sufficient line height.
2. **Contrast variability:** The header sits directly over an image. Contrast should be measured against the lightest and darkest areas of the final crop, not assumed from this screenshot.
3. **Focus visibility:** The inverse-color focus treatment is directionally good, but it should also include a visible outline so focus is clear without relying only on color change.
4. **External destinations:** LinkedIn and GitHub open new tabs. Their accessible labels should communicate that behavior.
5. **Motion:** The reveal animation should remain disabled under `prefers-reduced-motion`, as currently intended.

Screenshot evidence alone cannot confirm contrast ratios, keyboard order across browsers, screen-reader announcements, browser zoom behavior, or complete WCAG compliance.

## Recommended next iteration

The highest-value revision is a lighter, more editorial Hero:

- Keep the mountain, name, and current outcome-led statement.
- Make the panel narrower and slightly more opaque, with less blur.
- Replace five capability labels with three positioning pillars.
- Promote `Explore Projects` as the primary action.
- Keep `Experience` secondary.
- Demote LinkedIn, GitHub, and Contact to a quiet utility row.
- Move the panel right enough to avoid cutting into the mountain silhouette.

This preserves the clarity gained in the current version while making the page feel more senior, intentional, and aligned with a product-and-business leadership portfolio.
