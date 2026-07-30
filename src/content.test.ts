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

  test('keeps the exact rotating role order and spelling', () => {
    expect(content.hero.roles).toEqual([
      'Strategist',
      'Product Manager',
      'Developer',
      'Project & Program Manager',
      'Community Builder',
    ]);
    expect(content.hero.roles.join(' ')).not.toContain('Manger');
  });

  test('keeps six complete Experience entries with month and year dates', () => {
    expect(content.experience.items).toHaveLength(6);
    expect(content.experience.items[0]).toMatchObject({
      organization: 'Huawei Canada · Waterloo Research Center',
      role: 'COO / Operations Manager',
    });
    expect(
      content.experience.items.every(
        (item) => /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/.test(item.startDate)
          && (item.endDate === 'Present'
            || /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/.test(item.endDate))
          && item.summary.length > 20,
      ),
    ).toBe(true);
  });

  test('keeps the four strategic projects in the approved order', () => {
    expect(content.gtm.cases.map((project) => project.title)).toEqual([
      'GR Nova 5G FWA Commercial Launch',
      'Greece Vodafone Spring 6 Strategic Partnership',
      'Green Antenna Modernization',
      'Strategic Business & Product Leadership',
    ]);
    expect(content.gtm.cases[0].outcomes).toEqual([
      { highlight: '15K', detail: 'subscribers in 4 months' },
      { highlight: 'EUR 9M+', detail: 'revenue growth' },
      { highlight: 'First', detail: 'commercial 5G FWA network in Greece' },
      { highlight: 'MetaAAU breakthrough', detail: 'in high-performance commercial deployment' },
    ]);
    expect(content.gtm.cases[0].summary).toBe(
      "Partnered with Nova to launch Greece's first commercial 5G FWA service and advance an integrated FWA + FTTH strategy.",
    );
  });
});
