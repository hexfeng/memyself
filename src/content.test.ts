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

  it("uses verified dates and keeps the current role first", () => {
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
