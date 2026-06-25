import { describe, expect, it } from "vitest";
import styles from "./styles.css?raw";

describe("experience timeline interaction styles", () => {
  it("dims entries only while a timeline entry is actually hovered", () => {
    expect(styles).toContain(
      ".compact-timeline:has(.timeline-entry:hover) .timeline-entry"
    );
    expect(styles).not.toContain(".compact-timeline:hover .timeline-entry");
  });
});

describe("mobile portfolio layout", () => {
  it("removes the desktop minimum width and stacks project cards", () => {
    expect(styles).toContain("@media (max-width: 767px)");
    expect(styles).toContain("min-width: 0;");
    expect(styles).toContain("grid-template-columns: 1fr;");
    expect(styles).toContain(".desktop-nav,\n  .resume-link");
    expect(styles).toContain("  [data-reveal] {\n    opacity: 1;");
    expect(styles).toContain(
      "  .hero-identity {\n    width: 100%;\n    max-width: 100%;"
    );
  });
});
