export type ContributionDay = { date: string; count: number; level: number };

export const githubContributionSnapshotDate = '2026-08-05';

const active = [
  190, 2, 1, 191, 4, 1, 227, 2, 1, 284, 3, 1, 292, 7, 2, 297, 3, 1, 298, 1, 1,
  302, 1, 1, 303, 3, 1, 304, 19, 4, 305, 3, 1, 306, 6, 2, 310, 2, 1, 312, 4, 1,
  313, 9, 2, 315, 3, 1, 316, 17, 4, 317, 6, 2, 318, 7, 2, 319, 2, 1, 323, 5, 1,
  324, 2, 1, 325, 5, 1, 326, 8, 2, 329, 4, 1, 330, 4, 1, 331, 3, 1, 332, 21, 4,
  333, 1, 1, 336, 4, 1, 337, 3, 1, 338, 5, 1, 339, 2, 1, 340, 1, 1, 341, 22, 4,
  342, 10, 2, 343, 1, 1, 344, 12, 3, 345, 5, 1, 346, 20, 4, 347, 20, 4,
  351, 14, 3, 352, 2, 1, 353, 1, 1, 354, 4, 1, 355, 7, 2, 359, 5, 1, 360, 5, 1,
  361, 1, 1,
] as const;

const activeDays = new Map<number, { count: number; level: number }>();
for (let index = 0; index < active.length; index += 3) {
  activeDays.set(active[index], { count: active[index + 1], level: active[index + 2] });
}

export const githubContributionSnapshot: ContributionDay[] = Array.from({ length: 368 }, (_, index) => {
  const date = new Date(Date.UTC(2025, 7, 3 + index)).toISOString().slice(0, 10);
  return { date, count: activeDays.get(index)?.count ?? 0, level: activeDays.get(index)?.level ?? 0 };
});
