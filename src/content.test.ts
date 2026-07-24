import { describe, expect, test } from 'vitest';
import { content, sections } from './content';

describe('portfolio content', () => {
  test('keeps the approved section order and anchors', () => {
    expect(sections.map((section) => section.id)).toEqual([
      'top',
      'experience',
      'gtm',
      'transformation',
      'ecosystem',
      'lab',
      'contact',
    ]);
  });

  test('keeps Experience as a complete timeline without hidden detail panels', () => {
    expect(content.experience.items).toHaveLength(6);
    expect(content.experience.items[0]).toMatchObject({
      organization: 'Huawei Canada · Waterloo Research Center',
      role: 'COO / Operations Manager',
    });
    expect(content.experience.items.every((item) => item.summary.length > 20)).toBe(true);
  });

  test('keeps the four strategic projects in the approved order', () => {
    expect(content.gtm.cases.map((project) => project.title)).toEqual([
      'Greece Nova 5G FWA Commercial Launch',
      'Greece Vodafone Spring 6 Strategic Partnership',
      'Green Antenna Modernization',
      'Strategic Business & Product Leadership',
    ]);
  });
});
