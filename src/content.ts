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
  summary: string;
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
    icon?: 'growth' | 'energy' | 'roadmap';
  }>;
  image?: string;
};

export type LabProject = {
  title: string;
  summary: string;
  image: string;
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
        summary:
          'Builds the operating environment for AI research, collaboration, governance, and growth.',
        logo: 'huawei',
      },
      {
        startDate: 'Aug 2022',
        endDate: 'Nov 2024',
        stage: 'Market ownership',
        organization: 'Huawei Greece',
        role: 'Product Manager, Wireless Network',
        summary:
          'Connected customer priorities, product roadmaps, and GTM execution across national operators.',
        logo: 'huawei',
      },
      {
        startDate: 'Aug 2021',
        endDate: 'Jul 2022',
        stage: 'Technical depth',
        organization: 'Huawei',
        role: 'Software Engineer',
        summary:
          'Turned telecom requirements into reliable 5G software and more efficient engineering workflows.',
        logo: 'huawei',
      },
      {
        startDate: 'Sep 2020',
        endDate: 'Mar 2021',
        stage: 'Career foundation',
        organization: 'Rexel Canada',
        role: 'Data Analyst',
        summary: 'Used supplier and performance data to identify material commercial opportunities.',
        logo: 'rexel',
      },
      {
        startDate: 'Feb 2018',
        endDate: 'Jul 2020',
        stage: 'Graduate study',
        organization: 'University of New South Wales',
        role: 'Master of Statistics',
        summary: 'Deepened the analytical discipline used to frame complex business decisions.',
        logo: 'unsw',
      },
      {
        startDate: 'Sep 2013',
        endDate: 'Jun 2017',
        stage: 'Undergraduate foundation',
        organization: 'University of Toronto',
        role: 'B.Sc. in Computer Science & Statistics',
        summary: 'Built a dual foundation in computational thinking and quantitative analysis.',
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
        title: 'Greece Vodafone Spring 6 Strategic Partnership',
        summary:
          'A mock strategic partnership program aligning executive priorities, technology roadmaps, and joint commercial initiatives with Vodafone Greece.',
        result: 'Strategic partnership',
        secondary: 'Mock copy - public outcomes to be added',
        image: '/images/greece-vodafone-spring-6.png',
      },
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
        title: 'Strategic Business & Product Leadership',
        summary:
          'A mock portfolio case connecting market strategy, product roadmaps, commercial planning, and cross-functional execution.',
        result: 'Business & product leadership',
        secondary: 'Mock copy - detailed outcomes to be added',
        image: '/images/mountain-background-web.jpg',
      },
    ] satisfies CaseStudy[],
  },
  transformation: {
    label: '03 - AI Transformation & Engagement',
    title: 'Turning operating systems and relationships into momentum.',
    intro:
      'Sustainable transformation needs both: a clear system for execution and the relationships that move complex programs forward.',
    groups: [
      {
        title: 'AI Transformation',
        cases: [
          {
            title: 'Waterloo Research Center Operations',
            summary:
              'Coordinates planning, multimillion-dollar resources, risk, and execution across a multidisciplinary research environment.',
            result: '4 research labs',
            secondary: '10+ research projects supported',
          },
          {
            title: 'Blue Zone AI Lab Environment',
            summary:
              'Supports a controlled AI development environment by aligning infrastructure, process, compliance, and researcher needs.',
            result: 'Reliable experimentation',
            secondary: 'Detailed public outcomes to be added',
          },
          {
            title: 'AI-Enabled Workflow Transformation',
            summary:
              'Identifies fragmented operational work and applies practical AI and automation with adoption and control in mind.',
            result: 'From manual to repeatable',
            secondary: 'Quantitative outcomes to be added',
          },
        ] satisfies CaseStudy[],
      },
      {
        title: 'Executive & Ecosystem Engagement',
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
    ],
  },
  lab: {
    label: '04 - Thinking Lab',
    title: 'Side Projects — ideas become useful when they are made tangible.',
    intro:
      'A working collection of small products, AI experiments, and tools for thinking more clearly.',
    experiments: [
      {
        title: 'Personal Finance Dashboard',
        summary: 'Turning fragmented financial data into a clearer personal decision system.',
        image: '/images/thinking-lab/personal-finance-dashboard.webp',
        href: 'https://github.com/hexfeng/Iquant',
      },
      {
        title: 'Voice Input Application',
        summary: 'Exploring private, low-friction speech input with AI-assisted editing.',
        image: '/images/thinking-lab/voice-input-application.webp',
        href: 'https://github.com/hexfeng/Gospeak',
      },
      {
        title: 'Research Agent Workflow',
        summary: 'Testing structured AI workflows for collection, verification, and synthesis.',
        image: '/images/thinking-lab/research-agent-workflow.webp',
        href: 'https://github.com/hexfeng/InsightFlow',
      },
      {
        title: 'Screenshot Privacy Tool',
        summary: 'A faster way to capture, redact, annotate, and share safely.',
        image: '/images/thinking-lab/screenshot-privacy-tool.webp',
        href: 'https://github.com/hexfeng/EasyCapture',
      },
      {
        title: 'AI Usage Dashboard',
        summary: 'Making model usage, cost, and limits visible at a glance.',
        image: '/images/thinking-lab/ai-usage-dashboard.webp',
        href: 'https://github.com/hexfeng/CodexUsageDashboard',
      },
      {
        title: 'Event Intelligence Extractor',
        summary: 'Turning event pages into structured, reviewable winner data.',
        image: '/images/thinking-lab/event-intelligence-extractor.webp',
        href: 'https://github.com/hexfeng/Accumulate',
      },
    ] satisfies LabProject[],
  },
  beside: {
    label: '05 - Beside Work',
    title: 'A life shaped by curiosity, places, and people.',
    intro:
      'Outside work, I make room for unfamiliar places, small things made just for the joy of it, and conversations that widen how I see the world.',
    items: [
      { title: 'Explore', text: 'New places and different ways of living are a reminder that every familiar assumption is only one possible answer.' },
      { title: 'Make', text: 'I enjoy following small curiosities, learning by doing, and turning everyday friction into something a little more useful.' },
      { title: 'Connect', text: 'Time with friends, family, and communities keeps ambition grounded in the people it is ultimately meant to serve.' },
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
