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
