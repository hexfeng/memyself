export type SectionId =
  | 'top'
  | 'experience'
  | 'gtm'
  | 'transformation'
  | 'ecosystem'
  | 'lab'
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
  image?: string;
};

export const sections: Array<{ id: SectionId; label: string }> = [
  { id: 'top', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'gtm', label: 'Projects' },
  { id: 'transformation', label: 'Transformation' },
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'lab', label: 'Thinking Lab' },
  { id: 'contact', label: 'Contact' },
];

export const content = {
  nav: {
    experience: 'Experience',
    work: 'Projects',
    lab: 'Thinking Lab',
    contact: 'Contact',
    resume: 'Resume',
  },
  hero: {
    name: 'Xiaoyu Feng',
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
        title: 'NOVA 5G FWA Commercial Launch',
        summary:
          'Supported the strategy and commercial launch of a 5G fixed wireless access proposition for the Greek market.',
        result: '15K subscribers',
        secondary: 'EUR 9M+ expected revenue within the launch trajectory',
        image: '/images/mountain-background-web.jpg',
      },
      {
        title: 'Antenna Modernization Strategy',
        summary:
          'Consolidated customer requirements into a scalable product roadmap spanning more than 30 antenna products.',
        result: '20%+ order growth',
        secondary: '70%+ SDIF adoption',
        image: '/hero-mountain.png',
      },
      {
        title: 'Vodafone Spring 6',
        summary:
          'A strategic customer program bringing product, solution, and executive stakeholders into a shared direction.',
        result: 'Cross-functional alignment',
        secondary: 'Additional public outcomes to be added',
        image: '/images/mountain-background-web.jpg',
      },
    ] satisfies CaseStudy[],
  },
  transformation: {
    label: '03 - Operations & AI Transformation',
    title: 'Building the operating system for AI research execution.',
    intro:
      'Operations becomes strategic when it creates clarity, control, collaboration, and a repeatable path from research ambition to execution.',
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
  ecosystem: {
    label: '04 - Executive & Ecosystem Engagement',
    title: 'Creating the connections that allow technology, business, and research to move together.',
    intro:
      'Complex programs advance when diverse stakeholders share context, trust, and a concrete next step.',
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
    label: '05 - Thinking Lab',
    title: 'Small experiments for exploring better products and better ways of working.',
    intro:
      'These are practical learning environments used to test product hypotheses, emerging technology, and personal workflows.',
    experiments: [
      {
        title: 'Personal Finance Dashboard',
        summary: 'Organizing fragmented financial data into a more useful personal decision system.',
        result: '01',
        secondary: 'Product hypothesis',
      },
      {
        title: 'Voice Input Application',
        summary:
          'Exploring lower-cost, privacy-aware speech input with AI editing and personal vocabulary.',
        result: '02',
        secondary: 'AI workflow',
      },
      {
        title: 'Research Agent Workflow',
        summary:
          'Testing multi-step AI workflows for research collection, verification, and structured synthesis.',
        result: '03',
        secondary: 'Research system',
      },
    ] satisfies CaseStudy[],
  },
  contact: {
    label: '06 - Contact',
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
