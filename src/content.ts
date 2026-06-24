export type Locale = "en" | "zh";

type TimelineItem = {
  period: string;
  organization: string;
  role: string;
  summary: string;
};

type CaseItem = {
  title: string;
  summary: string;
  result?: string;
  secondary?: string;
};

type Content = {
  nav: Record<"experience" | "work" | "lab" | "contact" | "resume", string>;
  hero: {
    name: string;
    title: string;
    statement: string;
    location: string;
    metrics: Array<{ value: string; label: string }>;
    primaryAction: string;
    secondaryAction: string;
  };
  experience: { label: string; title: string; intro: string; items: TimelineItem[] };
  overview: {
    label: string;
    title: string;
    intro: string;
    streams: Array<{ number: string; title: string; summary: string; href: string }>;
  };
  gtm: { label: string; title: string; intro: string; cases: CaseItem[] };
  transformation: { label: string; title: string; intro: string; cases: CaseItem[] };
  ecosystem: { label: string; title: string; intro: string; cases: CaseItem[] };
  lab: {
    label: string;
    title: string;
    intro: string;
    experiments: Array<{ number: string; title: string; summary: string }>;
  };
  contact: {
    label: string;
    title: string;
    intro: string;
    emailLabel: string;
    linkedinLabel: string;
    resumeLabel: string;
    resumeNote: string;
  };
  footer: string;
};

export const content: Record<Locale, Content> = {
  en: {
    nav: {
      experience: "Experience",
      work: "Projects",
      lab: "Thinking Lab",
      contact: "Contact",
      resume: "Resume"
    },
    hero: {
      name: "Xiaoyu Feng",
      title: "Turning technology opportunities into market outcomes and scalable organizations.",
      statement:
        "I connect market insight, technical roadmaps, customer co-innovation, and operating systems to create measurable business impact.",
      location: "Toronto–Waterloo, Canada",
      metrics: [
        { value: "10%+", label: "YoY commercial growth" },
        { value: "50+", label: "Executive & customer engagements" },
        { value: "4", label: "AI research labs enabled" }
      ],
      primaryAction: "Explore strategic work",
      secondaryAction: "Contact"
    },
    experience: {
      label: "01 — Experience",
      title: "A career built across data, technology, markets, and organizations.",
      intro:
        "Each chapter added a new layer: analytical judgment, technical depth, commercial ownership, and the operating systems needed to scale research.",
      items: [
        {
          period: "Undergraduate",
          organization: "University of Toronto",
          role: "B.Sc. in Computer Science & Statistics",
          summary: "Built a dual foundation in computational thinking and quantitative analysis."
        },
        {
          period: "Graduate",
          organization: "University of New South Wales",
          role: "Master of Statistics",
          summary: "Deepened the analytical discipline used to frame complex business decisions."
        },
        {
          period: "Career foundation",
          organization: "Rexel Canada",
          role: "Data Analyst",
          summary: "Used supplier and performance data to identify material commercial opportunities."
        },
        {
          period: "Technical depth",
          organization: "Huawei",
          role: "Software Engineer",
          summary: "Turned telecom requirements into reliable 5G software and more efficient engineering workflows."
        },
        {
          period: "Market ownership",
          organization: "Huawei Greece",
          role: "Product Manager, Wireless Network",
          summary: "Connected customer priorities, product roadmaps, and GTM execution across national operators."
        },
        {
          period: "Organizational scale",
          organization: "Huawei Canada · Waterloo Research Center",
          role: "COO / Operations Manager",
          summary: "Builds the operating environment for AI research, collaboration, governance, and growth."
        }
      ]
    },
    overview: {
      label: "02 — Strategic Work",
      title: "Work that moves from insight to execution.",
      intro:
        "My work sits at the intersection of business strategy, technology execution, organizational transformation, and ecosystem development.",
      streams: [
        {
          number: "01",
          title: "Strategic Business & GTM",
          summary: "Turning market opportunities into product roadmaps, customer solutions, and commercial outcomes.",
          href: "#gtm"
        },
        {
          number: "02",
          title: "Operations & AI Transformation",
          summary: "Building operating systems that make ambitious AI research more effective and scalable.",
          href: "#transformation"
        },
        {
          number: "03",
          title: "Executive & Ecosystem Engagement",
          summary: "Aligning customers, executives, universities, researchers, and technical communities.",
          href: "#ecosystem"
        },
        {
          number: "04",
          title: "Thinking Lab",
          summary: "Small product experiments that keep strategy grounded in hands-on exploration.",
          href: "#lab"
        }
      ]
    },
    gtm: {
      label: "02 — Strategic Business & GTM",
      title: "Strategic Business & GTM Projects",
      intro:
        "Translating market signals into product direction and commercial momentum by connecting customer needs, network capabilities, portfolio decisions, and cross-functional execution.",
      cases: [
        {
          title: "NOVA 5G FWA Commercial Launch",
          summary:
            "Supported the strategy and commercial launch of a 5G fixed wireless access proposition for the Greek market.",
          result: "≈15K subscribers",
          secondary: "€9M+ expected revenue within the launch trajectory"
        },
        {
          title: "Antenna Modernization Strategy",
          summary:
            "Consolidated customer requirements into a scalable product roadmap spanning more than 30 antenna products.",
          result: "20%+ order growth",
          secondary: "70%+ SDIF adoption"
        },
        {
          title: "Vodafone Spring 6",
          summary:
            "A strategic customer program bringing product, solution, and executive stakeholders into a shared direction.",
          result: "Cross-functional alignment",
          secondary: "Additional public outcomes to be added"
        }
      ]
    },
    transformation: {
      label: "03 — Operations & AI Transformation",
      title: "Building the operating system for AI research execution.",
      intro:
        "Operations becomes strategic when it creates clarity, control, collaboration, and a repeatable path from research ambition to execution.",
      cases: [
        {
          title: "Waterloo Research Center Operations",
          summary:
            "Coordinates planning, multimillion-dollar resources, risk, and execution across a multidisciplinary research environment.",
          result: "4 research labs",
          secondary: "10+ research projects supported"
        },
        {
          title: "Blue Zone AI Lab Environment",
          summary:
            "Supports a controlled AI development environment by aligning infrastructure, process, compliance, and researcher needs.",
          result: "Reliable experimentation",
          secondary: "Detailed public outcomes to be added"
        },
        {
          title: "AI-Enabled Workflow Transformation",
          summary:
            "Identifies fragmented operational work and applies practical AI and automation with adoption and control in mind.",
          result: "From manual to repeatable",
          secondary: "Quantitative outcomes to be added"
        }
      ]
    },
    ecosystem: {
      label: "04 — Executive & Ecosystem Engagement",
      title: "Creating the connections that allow technology, business, and research to move together.",
      intro:
        "Complex programs advance when diverse stakeholders share context, trust, and a concrete next step.",
      cases: [
        {
          title: "Executive & Customer Engagement",
          summary:
            "Led strategic conversations among CXOs, product teams, technical experts, and commercial stakeholders.",
          result: "50+ summits & workshops",
          secondary: "Across customer and executive audiences"
        },
        {
          title: "Joint Innovation",
          summary:
            "Connected customer problems with technical capabilities and internal product resources through co-innovation and proof-of-concept programs.",
          result: "10+ initiatives",
          secondary: "Opportunity validation through collaboration"
        },
        {
          title: "University & Research Ecosystem",
          summary:
            "Develops relationships with Canadian universities, professors, labs, and student communities around research and talent.",
          result: "Research to community",
          secondary: "Selected public partners to be added"
        }
      ]
    },
    lab: {
      label: "05 — Thinking Lab",
      title: "Small experiments for exploring better products and better ways of working.",
      intro:
        "These are practical learning environments—not startup claims—used to test product hypotheses, emerging technology, and personal workflows.",
      experiments: [
        {
          number: "01",
          title: "Personal Finance Dashboard",
          summary: "Organizing fragmented financial data into a more useful personal decision system."
        },
        {
          number: "02",
          title: "Voice Input Application",
          summary: "Exploring lower-cost, privacy-aware speech input with AI editing and personal vocabulary."
        },
        {
          number: "03",
          title: "Research Agent Workflow",
          summary: "Testing multi-step AI workflows for research collection, verification, and structured synthesis."
        },
        {
          number: "04",
          title: "AI Coding Usage Monitor",
          summary: "A lightweight Windows concept for understanding AI coding limits and historical activity."
        }
      ]
    },
    contact: {
      label: "06 — Contact",
      title: "Let’s turn a complex technology opportunity into a clear path forward.",
      intro:
        "I’m interested in conversations at the intersection of product strategy, AI transformation, technical program leadership, and ecosystem development.",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      resumeLabel: "Resume",
      resumeNote: "Available on request"
    },
    footer: "Designed for clarity. Built for meaningful conversations."
  },
  zh: {
    nav: {
      experience: "经历",
      work: "战略工作",
      lab: "思考实验室",
      contact: "联系",
      resume: "简历"
    },
    hero: {
      name: "冯潇宇 Xiaoyu (Justin) Feng",
      title: "将技术机遇转化为市场成果和可规模化的组织能力。",
      statement: "我连接市场洞察、技术路线图、客户共创与运营体系，让技术机会产生可衡量的业务价值。",
      location: "加拿大 · 多伦多—滑铁卢",
      metrics: [
        { value: "10%+", label: "年度商业增长" },
        { value: "50+", label: "高管及客户交流" },
        { value: "4", label: "支持的 AI 研究实验室" }
      ],
      primaryAction: "查看战略工作",
      secondaryAction: "联系我"
    },
    experience: {
      label: "01 — 经历",
      title: "一条跨越数据、技术、市场与组织的成长路径。",
      intro: "每个阶段都增加了一层能力：分析判断、技术深度、商业责任，以及支持研究规模化的运营体系。",
      items: [
        {
          period: "本科",
          organization: "多伦多大学",
          role: "计算机科学与统计学理学学士",
          summary: "建立计算思维与定量分析的双重基础。"
        },
        {
          period: "硕士",
          organization: "新南威尔士大学",
          role: "统计学硕士",
          summary: "强化用于复杂商业决策的分析方法与严谨性。"
        },
        {
          period: "职业起点",
          organization: "Rexel Canada",
          role: "数据分析师",
          summary: "通过供应商与绩效数据识别具有实际价值的商业机会。"
        },
        {
          period: "技术深度",
          organization: "华为",
          role: "软件工程师",
          summary: "将通信需求转化为可靠的 5G 软件能力与更高效的工程流程。"
        },
        {
          period: "市场责任",
          organization: "华为希腊",
          role: "无线产品经理",
          summary: "在全国级运营商市场连接客户需求、产品路线图与 GTM 执行。"
        },
        {
          period: "组织规模化",
          organization: "华为加拿大 · 滑铁卢研究中心",
          role: "COO / 运营经理",
          summary: "建设支持 AI 研究、协作、治理与组织成长的运营环境。"
        }
      ]
    },
    overview: {
      label: "02 — 战略工作",
      title: "让洞察真正进入执行。",
      intro: "我的工作位于商业战略、技术执行、组织转型和生态发展之间。",
      streams: [
        { number: "01", title: "战略业务与 GTM", summary: "将市场机会转化为产品路线图、客户解决方案与商业成果。", href: "#gtm" },
        { number: "02", title: "运营与 AI 转型", summary: "建设让 AI 研究更高效、更可靠、更易规模化的运营体系。", href: "#transformation" },
        { number: "03", title: "高管与生态合作", summary: "连接客户、高管、高校、研究人员与技术社区。", href: "#ecosystem" },
        { number: "04", title: "思考实验室", summary: "通过小型产品实验，让战略判断保持与实践相连。", href: "#lab" }
      ]
    },
    gtm: {
      label: "03 — 战略业务与 GTM",
      title: "战略业务与 GTM 项目",
      intro: "连接客户需求、网络能力、产品组合决策和跨职能执行，将市场信号转化为产品方向与商业动能。",
      cases: [
        {
          title: "NOVA 5G FWA 商业发布",
          summary: "支持面向希腊市场的 5G 固定无线接入产品战略与商业发布。",
          result: "约 1.5 万用户",
          secondary: "发布周期内预计收入超过 900 万欧元"
        },
        {
          title: "天线现代化战略",
          summary: "将客户需求整合为覆盖 30 多款天线产品的可规模化路线图。",
          result: "20%+ 订单增长",
          secondary: "SDIF 采用率超过 70%"
        },
        {
          title: "Vodafone Spring 6",
          summary: "推动产品、解决方案与高管团队形成共同方向的战略客户项目。",
          result: "跨职能协同",
          secondary: "更多可公开成果后续补充"
        }
      ]
    },
    transformation: {
      label: "04 — 运营与 AI 转型",
      title: "建设支撑 AI 研究执行的操作系统。",
      intro: "当运营带来清晰度、控制力、协作机制和可复制的执行路径时，它就成为战略能力。",
      cases: [
        {
          title: "滑铁卢研究中心运营",
          summary: "统筹跨学科研究环境中的规划、多百万级资源、风险与项目执行。",
          result: "4 个研究实验室",
          secondary: "支持 10+ 项研究项目"
        },
        {
          title: "Blue Zone AI 实验环境",
          summary: "协调基础设施、流程、合规与研究需求，支持受控的 AI 开发环境。",
          result: "可靠的研究试验",
          secondary: "更多可公开结果后续补充"
        },
        {
          title: "AI 赋能流程转型",
          summary: "识别碎片化运营工作，并在兼顾采用和控制的前提下应用 AI 与自动化。",
          result: "从人工到可复制",
          secondary: "量化成果后续补充"
        }
      ]
    },
    ecosystem: {
      label: "05 — 高管与生态合作",
      title: "建立让技术、商业与研究共同前进的连接。",
      intro: "复杂项目的推进，依赖不同利益相关方共享背景、建立信任，并形成明确的下一步。",
      cases: [
        {
          title: "高管与客户交流",
          summary: "推动 CXO、产品团队、技术专家与商业团队之间的战略讨论。",
          result: "50+ 场峰会与研讨会",
          secondary: "覆盖客户与高管群体"
        },
        {
          title: "联合创新",
          summary: "通过联合创新与概念验证，将客户问题连接到技术能力和内部产品资源。",
          result: "10+ 项合作",
          secondary: "以协作验证未来机会"
        },
        {
          title: "高校与研究生态",
          summary: "围绕科研合作与人才发展，连接加拿大高校、教授、实验室和学生社区。",
          result: "从研究到社区",
          secondary: "可公开合作伙伴后续补充"
        }
      ]
    },
    lab: {
      label: "06 — 思考实验室",
      title: "用小型实验探索更好的产品和工作方式。",
      intro: "这些项目不是创业宣言，而是用于验证产品假设、新兴技术和个人工作流的实践环境。",
      experiments: [
        { number: "01", title: "个人财务仪表盘", summary: "将分散的财务数据组织成更有用的个人决策系统。" },
        { number: "02", title: "语音输入应用", summary: "探索融合 AI 编辑和个人词汇的低成本、隐私友好型语音输入。" },
        { number: "03", title: "研究 Agent 工作流", summary: "测试支持资料收集、验证和结构化综合的多步骤 AI 工作流。" },
        { number: "04", title: "AI 编程用量监控", summary: "用于理解 AI 编程额度与历史活动的轻量 Windows 工具概念。" }
      ]
    },
    contact: {
      label: "07 — 联系",
      title: "让复杂的技术机遇形成清晰的前进路径。",
      intro: "期待围绕产品战略、AI 转型、技术项目领导力与生态发展展开交流。",
      emailLabel: "邮件",
      linkedinLabel: "LinkedIn",
      resumeLabel: "简历",
      resumeNote: "可按需提供"
    },
    footer: "为清晰而设计，为有意义的交流而构建。"
  }
};
