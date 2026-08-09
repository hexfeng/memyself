import { describe, expect, test } from 'vitest';
import { content, sections } from './content';
import { githubContributionSnapshot } from './github-contributions';

describe('portfolio content', () => {
  test('keeps the approved section order and anchors', () => {
    expect(sections.map((section) => section.id)).toEqual([
      'top',
      'experience',
      'gtm',
      'transformation',
      'lab',
      'beside',
      'contact',
    ]);
  });

  test('combines transformation and engagement while keeping both content groups', () => {
    expect(content.transformation.groups.map((group) => group.title)).toEqual([
      'AI Transformation',
      'Executive & Ecosystem Engagement',
    ]);
    expect(content.transformation.groups.flatMap((group) => group.cases)).toHaveLength(6);
  });

  test('keeps Beside Work concise and separate from Thinking Lab', () => {
    expect(content.beside.title).toBe('A life shaped by curiosity, places, and people.');
    expect(content.beside.items).toHaveLength(3);
    expect(content.beside.items[0]).toEqual({
      title: 'Travelling',
      text: 'My footprints span 18 countries and 60+ cities, and I’m still unlocking new perspectives and discovering the boundaries of what’s possible.',
      image: '/images/beside-work/world-low-pixels.svg',
    });
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
      summary: [
        'Oversaw a multi-million-dollar R&D portfolio across four research labs, managing industry–academia collaborations in Generative AI, LLMs, cybersecurity, and next-generation software engineering while improving governance for 10+ research projects across planning, budgeting, risk control, scheduling, and resource allocation.',
        'Led RC-level AI transformation and external ecosystem engagement, including AI-enabled workflow adoption, external Blue Zone AI Lab development, AI community collaborations, partnerships with events across universities and organizations(HTN).',
      ],
    });
    expect(
      content.experience.items.every(
        (item) => /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/.test(item.startDate)
          && (item.endDate === 'Present'
            || /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/.test(item.endDate))
          && item.summary.length > 0
          && item.summary.every((description) => description.length > 20),
      ),
    ).toBe(true);

    expect(content.experience.items.map((item) => item.summary)).toEqual([
      [
        'Oversaw a multi-million-dollar R&D portfolio across four research labs, managing industry–academia collaborations in Generative AI, LLMs, cybersecurity, and next-generation software engineering while improving governance for 10+ research projects across planning, budgeting, risk control, scheduling, and resource allocation.',
        'Led RC-level AI transformation and external ecosystem engagement, including AI-enabled workflow adoption, external Blue Zone AI Lab development, AI community collaborations, partnerships with events across universities and organizations(HTN).',
      ],
      [
        'Owned wireless network product and solution strategy for the Greece market, delivering 10%+ YoY sales order growth for two consecutive years and enabling 10+ major product & solution breakthroughs/wins.',
        'Developed and implemented market strategies and provided technical & commercial solutions to achieve the wireless network sales target and solution guidance for Greece market.',
        'Served as single-threaded owner for market strategy across 3 national operator customers, aligning spectrum, technology roadmap, and commercial execution. Participated in 50+ summit/workshop preparation and operation, and successfully launched 10+ Joint innovation projects/POC tests with customers.',
      ],
      [
        'Partnered with Product Owners to validate and commercialize 15+ 5G NR DL features, ensuring zero live-network incidents post-launch, developed a python-based tool that improved test case parameter configuration & generation efficiency by 65%.',
      ],
      [
        'Analyzed historical purchase data to identify key drivers behind declining rebate amounts and ratios; developed a standardized supplier scoring methodology and business model optimization recommendations, resulting in an estimated 11% rebate uplift and stronger supplier engagement on strategic offerings.',
      ],
      ['Master of Statistics with excellence (distinction)'],
      ['Double major in Computer Science & Statistics'],
    ]);
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
    expect(content.gtm.cases[2]).toMatchObject({
      summary:
        "Served as the base station antenna product owner for the Greek market, led the country's antenna modernization program, and translated requirements from 12+ operator customers.",
      outcomes: [
        { highlight: '20%', detail: 'antenna revenue increase in 2 years', icon: 'growth' },
        { highlight: '70%', detail: 'green antenna adoption with', secondaryHighlight: '15%', suffix: 'energy savings', icon: 'energy' },
        { highlight: '30+', detail: 'product roadmap developed, with', secondaryHighlight: '5+', suffix: 'models swapped and upgraded in the Greek market', icon: 'roadmap' },
      ],
    });
  });

  test('keeps the approved Thinking Lab copy and six complete linked projects', () => {
    expect(content.lab.title).toBe('Side Projects — ideas become useful when they are made tangible.');
    expect(content.lab.experiments).toHaveLength(6);
    expect(content.lab.experiments.map((project) => project.title)).toEqual([
      'Personal Finance Dashboard',
      'Voice Input Application',
      'Research Agent Workflow',
      'Screenshot Privacy Tool',
      'AI Usage Dashboard',
      'Event Intelligence Extractor',
    ]);
    expect(content.lab.experiments.every((project) => (
      project.image.startsWith('/images/thinking-lab/')
      && project.href.startsWith('https://github.com/hexfeng/')
      && project.summary.length > 30
    ))).toBe(true);
  });

  test('keeps a real contribution snapshot as the network fallback', () => {
    expect(githubContributionSnapshot).toHaveLength(368);
    expect(githubContributionSnapshot[0].date).toBe('2025-08-03');
    expect(githubContributionSnapshot.at(-1)?.date).toBe('2026-08-05');
    expect(githubContributionSnapshot.reduce((total, day) => total + day.count, 0)).toBe(301);
  });
});
