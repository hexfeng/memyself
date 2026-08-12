export type SectionId =
  | 'top'
  | 'experience'
  | 'gtm'
  | 'transformation'
  | 'lab'
  | 'beside'
  | 'contact';

export type ExperienceItem = {
  startDate: string;
  endDate: string;
  stage: string;
  organization: string;
  role: string;
  summary: string[];
  logo: string;
};

export type CaseStudy = {
  title: string;
  summary: string;
  result: string;
  secondary: string;
  outcomes?: Array<{
    highlight: string;
    detail: string;
    secondaryHighlight?: string;
    suffix?: string;
    icon?: 'growth' | 'energy' | 'roadmap' | 'customers' | 'innovation';
  }>;
  image?: string;
};

export type LabProject = {
  title: string;
  summary: string;
  image: string;
  hoverImage?: string;
  video?: string;
  showFullImage?: boolean;
  swapPreviewInDark?: boolean;
  href: string;
};

export const sections: Array<{ id: SectionId; label: string }> = [
  { id: 'top', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'gtm', label: 'Projects' },
  { id: 'transformation', label: 'Transformation' },
  { id: 'lab', label: 'Thinking Lab' },
  { id: 'beside', label: 'Beside Work' },
  { id: 'contact', label: 'Contact' },
];

export const content = {
  nav: {
    experience: 'Experience',
    work: 'Projects',
    lab: 'Thinking Lab',
    beside: 'Beside Work',
    contact: 'Contact',
    resume: 'Resume',
  },
  hero: {
    name: 'Xiaoyu Feng',
    roles: ['Strategist', 'Product Manager', 'Developer', 'Project & Program Manager', 'Community Builder'],
    title: 'Turning technology opportunities into market outcomes and scalable organizations.',
    statement:
      'I connect market insight, technical roadmaps, customer co-innovation, and operating systems to create measurable business impact.',
    location: 'Toronto-Waterloo, Canada',
    metrics: [
      { value: '10%+', label: 'YoY commercial growth' },
      { value: '50+', label: 'Executive & customer engagements' },
      { value: '4', label: 'AI research labs enabled' },
    ],
    primaryAction: 'Explore strategic work',
    secondaryAction: 'Contact',
  },
  experience: {
    label: '01 - Experience',
    title: 'A career built across data, technology, markets, and organizations.',
    intro:
      'Each chapter added a new layer: analytical judgment, technical depth, commercial ownership, and the operating systems needed to scale research.',
    items: [
      {
        startDate: 'Jun 2025',
        endDate: 'Present',
        stage: 'Organizational scale',
        organization: 'Huawei Canada · Waterloo Research Center',
        role: 'COO / Operations Manager',
        summary: [
          'Oversaw a multi-million-dollar R&D portfolio across four research labs, managing industry–academia collaborations in Generative AI, LLMs, cybersecurity, and next-generation software engineering while improving governance for 10+ research projects across planning, budgeting, risk control, scheduling, and resource allocation.',
          'Led RC-level AI transformation and external ecosystem engagement, including AI-enabled workflow adoption, external Blue Zone AI Lab development, AI community collaborations, partnerships with events across universities and organizations(HTN).',
        ],
        logo: 'huawei',
      },
      {
        startDate: 'Aug 2022',
        endDate: 'Nov 2024',
        stage: 'Market ownership',
        organization: 'Huawei Greece',
        role: 'Product Manager, Wireless Network',
        summary: [
          'Owned wireless network product and solution strategy for the Greece market, delivering 10%+ YoY sales order growth for two consecutive years and enabling 10+ major product & solution breakthroughs/wins.',
          'Developed and implemented market strategies and provided technical & commercial solutions to achieve the wireless network sales target and solution guidance for Greece market.',
          'Served as single-threaded owner for market strategy across 3 national operator customers, aligning spectrum, technology roadmap, and commercial execution. Participated in 50+ summit/workshop preparation and operation, and successfully launched 10+ Joint innovation projects/POC tests with customers.',
        ],
        logo: 'huawei',
      },
      {
        startDate: 'Aug 2021',
        endDate: 'Jul 2022',
        stage: 'Technical depth',
        organization: 'Huawei',
        role: 'Software Engineer',
        summary: [
          'Partnered with Product Owners to validate and commercialize 15+ 5G NR DL features, ensuring zero live-network incidents post-launch, developed a python-based tool that improved test case parameter configuration & generation efficiency by 65%.',
        ],
        logo: 'huawei',
      },
      {
        startDate: 'Sep 2020',
        endDate: 'Mar 2021',
        stage: 'Career foundation',
        organization: 'Rexel Canada',
        role: 'Data Analyst',
        summary: [
          'Analyzed historical purchase data to identify key drivers behind declining rebate amounts and ratios; developed a standardized supplier scoring methodology and business model optimization recommendations, resulting in an estimated 11% rebate uplift and stronger supplier engagement on strategic offerings.',
        ],
        logo: 'rexel',
      },
      {
        startDate: 'Feb 2018',
        endDate: 'Jul 2020',
        stage: 'Graduate study',
        organization: 'University of New South Wales',
        role: 'Master of Statistics',
        summary: ['Master of Statistics with excellence (distinction)'],
        logo: 'unsw',
      },
      {
        startDate: 'Sep 2013',
        endDate: 'Jun 2017',
        stage: 'Undergraduate foundation',
        organization: 'University of Toronto',
        role: 'B.Sc. in Computer Science & Statistics',
        summary: ['Double major in Computer Science & Statistics'],
        logo: 'utoronto',
      },
    ] satisfies ExperienceItem[],
  },
  gtm: {
    label: '02 - Strategic Business & GTM',
    title: 'Strategic Business & GTM Projects',
    intro:
      'Translating market signals into product direction and commercial momentum by connecting customer needs, network capabilities, portfolio decisions, and cross-functional execution.',
    cases: [
      {
        title: 'Green Antenna Modernization',
        summary:
          "Served as the base station antenna product owner for the Greek market, led the country's antenna modernization program, and translated requirements from 12+ operator customers.",
        result: '20%+ order growth',
        secondary: '70%+ SDIF share of Greece antenna orders',
        outcomes: [
          { highlight: '20%', detail: 'antenna revenue increase in 2 years', icon: 'growth' },
          { highlight: '70%', detail: 'green antenna adoption with', secondaryHighlight: '15%', suffix: 'energy savings', icon: 'energy' },
          { highlight: '30+', detail: 'product roadmap developed, with', secondaryHighlight: '5+', suffix: 'models swapped and upgraded in the Greek market', icon: 'roadmap' },
        ],
        image: '/images/green-antenna-modernization.png',
      },
      {
        title: 'GR Vodafone Strategic Partnership',
        summary:
          "Served as SR for Vodafone Greece's wireless business, leading network planning, network evolution, and product roadmaps while advancing strategic cooperation and joint innovation to strengthen commercial success and network leadership.",
        result: 'Strategic partnership',
        secondary: 'Commercial success and network leadership',
        outcomes: [
          { highlight: 'Strategic cooperation', detail: 'secured in S Project', icon: 'customers' },
          { highlight: 'Biggest score increase', detail: 'achieved in Umlaut benchmarking (2023–2024)', icon: 'growth' },
          { highlight: 'Multiple solution breakthroughs', detail: 'across wideband and high-performance AAUs', icon: 'innovation' },
        ],
        image: '/images/greece-vodafone-spring-6.png',
      },
      {
        title: 'GR Nova 5G FWA Commercial Launch',
        summary:
          "Partnered with Nova to launch Greece's first commercial 5G FWA service and advance an integrated FWA + FTTH strategy.",
        result: '15K subscribers in 4 months',
        secondary: 'EUR 9M+ revenue growth',
        outcomes: [
          { highlight: '15K', detail: 'subscribers in 4 months' },
          { highlight: 'EUR 9M+', detail: 'revenue growth' },
          { highlight: 'First', detail: 'commercial 5G FWA network in Greece' },
          { highlight: 'MetaAAU breakthrough', detail: 'in high-performance commercial deployment' },
        ],
        image: '/images/greece-nova-5g-fwa.png',
      },
      {
        title: 'SEE Wireless Business Strategy & Execution',
        summary:
          "Owned South East Europe wireless strategy and annual BP for Greece's three national operators, aligning spectrum, product roadmaps, solutions, and commercial execution.",
        result: '10%+ YoY growth',
        secondary: 'Sustained for two consecutive years',
        outcomes: [
          { highlight: '10%+', detail: 'YoY sales order growth for', secondaryHighlight: '2 consecutive years', icon: 'growth' },
          { highlight: '3', detail: 'national operators under single-threaded ownership;', secondaryHighlight: '50+', suffix: 'executive summits & workshops', icon: 'customers' },
          { highlight: '10+', detail: 'product & solution breakthroughs;', secondaryHighlight: '10+', suffix: 'joint innovation projects / POCs', icon: 'innovation' },
        ],
        image: '/images/south-east-europe-wireless-strategy.png',
      },
    ] satisfies CaseStudy[],
  },
  transformation: {
    label: '03 - AI Transformation & Engagement',
    title: 'Building momentum through engagement, innovation, and ecosystems.',
    intro:
      'Sustainable transformation needs both: a clear system for execution and the relationships that move complex programs forward.',
    cases: [
      {
        title: 'Executive & Customer Engagement',
        summary:
          'Led strategic conversations among CXOs, product teams, technical experts, and commercial stakeholders.',
        result: '50+ summits & workshops',
        secondary: 'Across customer and executive audiences',
      },
      {
        title: 'Joint Innovation',
        summary:
          'Connected customer problems with technical capabilities and internal product resources through co-innovation and proof-of-concept programs.',
        result: '10+ initiatives',
        secondary: 'Opportunity validation through collaboration',
      },
      {
        title: 'University & Research Ecosystem',
        summary:
          'Develops relationships with Canadian universities, professors, labs, and student communities around research and talent.',
        result: 'Research to community',
        secondary: 'Selected public partners to be added',
      },
    ] satisfies CaseStudy[],
  },
  lab: {
    label: '04 - Thinking Lab',
    title: 'Side Projects — ideas become useful when they are made tangible.',
    intro:
      'A working collection of small products, AI experiments, and tools for thinking more clearly.',
    continuation: 'More projects ongoing',
    experiments: [
      {
        title: 'FinSight',
        summary: 'An open-source, local-first personal finance dashboard that brings all your financial data together through SimpleFIN Bridge.',
        image: '/images/thinking-lab/finsight-dashboard.jpg',
        hoverImage: '/images/thinking-lab/finsight-investments.jpg',
        href: 'https://github.com/hexfeng/Accumulate',
      },
      {
        title: 'This Website',
        summary: 'This personal website was designed and built with Codex, turning strategy, experiments, and side projects into a fast, responsive digital portfolio.',
        image: '/images/thinking-lab/this-website-light.jpg',
        hoverImage: '/images/thinking-lab/this-website-dark.jpg',
        swapPreviewInDark: true,
        href: 'https://github.com/hexfeng/memyself',
      },
      {
        title: 'Codex Usage Dashboard',
        summary: 'A lightweight floating Windows widget for monitoring Codex five-hour and weekly usage limits at a glance.',
        image: '/images/thinking-lab/codex-usage-dashboard.webp',
        showFullImage: true,
        href: 'https://github.com/hexfeng/CodexUsageDashboard',
      },
      {
        title: 'GoSpeak',
        summary: 'Open-source Windows voice input for 90% typeless workflows at near-zero cost, with configurable ASR and AI rewriting.',
        image: '/images/thinking-lab/gospeak-general.webp',
        hoverImage: '/images/thinking-lab/gospeak-providers.webp',
        href: 'https://github.com/hexfeng/Gospeak',
      },
      {
        title: 'Blink',
        summary: 'An open-source Chrome extension that optimizes LLM prompts in one click, right where you type.',
        image: '/images/thinking-lab/blink-first-frame.webp',
        video: '/videos/thinking-lab/blink-demo.mp4',
        href: 'https://github.com/hexfeng/Blink',
      },
      {
        title: 'EasyCapture',
        summary: 'A local-first Chrome extension for seamless full-page screenshots, with built-in tools for annotation, editing, and privacy-ready redaction.',
        image: '/images/thinking-lab/easycapture-editor-concept.png',
        hoverImage: '/images/thinking-lab/easycapture-surfaces-concept.png',
        href: 'https://github.com/hexfeng/EasyCapture',
      },
    ] satisfies LabProject[],
  },
  beside: {
    label: '05 - Beside Work',
    title: 'A life shaped by curiosity, places, and people.',
    intro:
      'Outside work, I recharge by exploring new places, noticing the world through a lens, and getting lost in well-made games.',
    items: [
      {
        title: 'Travelling',
        text: 'My footprints span 18 countries and 60+ cities, and I’m still unlocking new perspectives and discovering the boundaries of what’s possible.',
        image: '/images/beside-work/world-low-pixels.svg',
      },
      {
        title: 'Photography',
        text: 'Unprofessional photographer—',
        callToAction: 'click to explore the gallery.',
        image: '/images/beside-work/photography.webp',
      },
      {
        title: 'Gaming',
        text: 'Former semi-professional Dota 2 player—once 9K MMR and previously teamed with BSJ.',
        image: '/images/beside-work/gaming.webp',
      },
    ],
  },
  contact: {
    label: 'Contact',
    title: 'Let us turn a complex technology opportunity into a clear path forward.',
    intro:
      'I am interested in conversations at the intersection of product strategy, AI transformation, technical program leadership, and ecosystem development.',
    emailLabel: 'Email',
    linkedinLabel: 'LinkedIn',
    resumeLabel: 'Resume',
    resumeNote: 'Available on request',
  },
  footer: 'Designed for clarity. Built for meaningful conversations.',
};
