import { describe, expect, it } from "vitest";
import styles from "./styles.css?raw";

describe("experience timeline interaction styles", () => {
  it("uses an inset row highlight on hover instead of the left accent line", () => {
    expect(styles).not.toContain(
      ".compact-timeline:has(.timeline-entry:hover) .timeline-entry"
    );
    expect(styles).toContain(".compact-timeline .timeline-entry:hover");
    expect(styles).not.toContain("transform: translateX(3px);");
    expect(styles).toContain(".timeline-entry::before {");
    expect(styles).not.toContain(
      "top: 46px;\n  left: -2px;\n  z-index: 1;\n  width: 3px;\n  height: 38px;"
    );
    expect(styles).not.toContain("inset: 7px 0 7px -2px;");
    expect(styles).toContain("inset: 8px -18px 8px -12px;");
    expect(styles).toContain("border-radius: 18px;");
    expect(styles).toContain("box-shadow: 0 18px 42px rgba(29, 55, 69, 0.1);");
    expect(styles).toContain("transform: scaleX(0.985) translateY(2px);");
    expect(styles).toContain("transform: scaleX(1) translateY(0);");
    expect(styles).toContain(".compact-timeline .timeline-entry:hover::before");
    expect(styles).toContain(".timeline-entry:hover .timeline-entry__content");
    expect(styles).toContain(".timeline-entry:hover .timeline-logo");
    expect(styles).toContain(".screen--experience .screen-tint {\n  backdrop-filter: none;");
  });

  it("uses optically balanced sizes for differently shaped logo marks", () => {
    expect(styles).toContain(".timeline-logo {\n  position: relative;\n  display: grid;");
    expect(styles).toContain("background: transparent;");
    expect(styles).not.toContain(".timeline-logo--rexel {\n  background:");
    expect(styles).not.toContain(".timeline-logo--utoronto {\n  background:");
    expect(styles).toContain(
      ".timeline-logo--huawei img {\n  width: auto;\n  height: 28px;\n  clip-path: inset(0 86px 0 0);"
    );
    expect(styles).toContain(".timeline-logo--rexel img {\n  width: 44px;");
    expect(styles).toContain(".timeline-logo--unsw img {\n  left: 6px;\n  width: auto;\n  height: 42px;");
    expect(styles).toContain(".timeline-logo--utoronto img {\n  left: 8px;\n  width: auto;\n  height: 44px;");
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
