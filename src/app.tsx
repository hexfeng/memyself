import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import huaweiLogo from './assets/logos/huawei.png';
import rexelLogo from './assets/logos/rexel.svg';
import unswDarkLogo from './assets/logos/unsw-dark.png';
import unswLogo from './assets/logos/unsw.png';
import utorontoLogo from './assets/logos/utoronto.svg';
import { content, sections, type CaseStudy, type ExperienceItem, type SectionId } from './content';
import './styles.css';

type Theme = 'light' | 'dark';

const THEME_KEY = 'portfolio-theme';
const experienceLogos: Record<string, string> = {
  huawei: huaweiLogo,
  rexel: rexelLogo,
  unsw: unswLogo,
  utoronto: utorontoLogo,
};
const projectSections: Array<{
  id: SectionId;
  label: string;
  title: string;
  intro: string;
  cases: CaseStudy[];
  reverse?: boolean;
}> = [
  { id: 'gtm', ...content.gtm },
  { id: 'transformation', ...content.transformation, reverse: true },
  { id: 'ecosystem', ...content.ecosystem },
  { id: 'lab', ...content.lab, cases: content.lab.experiments, reverse: true },
];

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage can be unavailable in privacy-restricted contexts.
  }
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('top');
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.title = 'Xiaoyu Feng - Strategy & Transformation';

    if (window.location.hash) {
      const scrollToHash = () => document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
      window.requestAnimationFrame(() => window.requestAnimationFrame(scrollToHash));
      window.setTimeout(scrollToHash, 140);
    }

    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrentSection(visible.target.id as SectionId);
      },
      { threshold: [0.35, 0.55, 0.75] },
    );

    sections.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    setTheme((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // The current page still switches even when persistence is unavailable.
      }
      return next;
    });
  }

  return (
    <>
      <Header currentSection={currentSection} theme={theme} onToggleTheme={toggleTheme} />
      <SectionProgress currentSection={currentSection} />
      <main>
        <Hero theme={theme} />
        <Experience />
        {projectSections.map((section) => (
          <ProjectSection key={section.id} {...section} />
        ))}
        <Contact />
      </main>
    </>
  );
}

function Header({
  currentSection,
  theme,
  onToggleTheme,
}: {
  currentSection: SectionId;
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  return (
    <header className="site-header" data-solid={currentSection !== 'top'}>
      <a className="brand" href="#top" aria-label={content.hero.name}>
        <span className="brand-mark" aria-hidden="true">XF</span>
        <span>{content.hero.name}</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <HeaderLink href="#experience" active={currentSection === 'experience'}>{content.nav.experience}</HeaderLink>
        <HeaderLink href="#gtm" active={['gtm', 'transformation', 'ecosystem'].includes(currentSection)}>
          {content.nav.work}
        </HeaderLink>
        <HeaderLink href="#lab" active={currentSection === 'lab'}>{content.nav.lab}</HeaderLink>
        <HeaderLink href="#contact" active={currentSection === 'contact'}>{content.nav.contact}</HeaderLink>
      </nav>
      <div className="header-actions">
        <a className="resume-link" href="#contact">Resume</a>
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${nextTheme} mode`}>
          {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function HeaderLink({ href, active, children }: { href: string; active: boolean; children: string }) {
  return <a href={href} aria-current={active ? 'page' : undefined}>{children}</a>;
}

function SectionProgress({ currentSection }: { currentSection: SectionId }) {
  return (
    <nav className="section-progress" aria-label="Section progress" data-hidden={currentSection === 'gtm'}>
      <span className="section-progress__line" aria-hidden="true" />
      {sections.map((section) => (
        <a
          key={section.id}
          className="section-progress__dot"
          href={`#${section.id}`}
          aria-label={`Go to ${section.label}`}
          aria-current={currentSection === section.id ? 'step' : undefined}
          data-active={currentSection === section.id}
        >
          <span>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}

function Hero({ theme }: { theme: Theme }) {
  const [focusPaused, setFocusPaused] = useState(false);
  return (
    <section
      id="top"
      className="hero screen"
      aria-labelledby="hero-title"
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusPaused(false);
      }}
    >
      <FogBackground theme={theme} />
      <div className="page-shell hero-content">
        <div className="hero-identity">
          <h1 id="hero-title">{content.hero.name}</h1>
          <p className="hero-role-line">
            <span>A</span> <RotatingRoles focusPaused={focusPaused} />
          </p>
          <p className="hero-statement">{content.hero.statement}</p>
          <nav className="hero-actions" aria-label="Hero navigation">
            <a className="hero-action hero-action--primary" href="#gtm">
              <span>{content.hero.primaryAction}</span><ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="hero-action hero-action--compact" href="mailto:">
              <Mail size={17} aria-hidden="true" /><span>Email</span>
            </a>
            <a className="hero-action hero-action--compact" href="https://www.linkedin.com/in/xiaoyufeng/" target="_blank" rel="noreferrer">
              <Linkedin size={17} aria-hidden="true" /><span>LinkedIn</span>
            </a>
            <a className="hero-action hero-action--compact" href="https://github.com/hexfeng" target="_blank" rel="noreferrer">
              <Github size={17} aria-hidden="true" /><span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}

function RotatingRoles({ focusPaused }: { focusPaused: boolean }) {
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const paused = focusPaused || hoverPaused || hidden;

  useEffect(() => {
    const onVisibilityChange = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || transitioning) return;
    const timeout = window.setTimeout(() => {
      setPreviousIndex(index);
      setIndex((index + 1) % content.hero.roles.length);
      setTransitioning(true);
    }, 2_000);
    return () => window.clearTimeout(timeout);
  }, [index, paused, reducedMotion, transitioning]);

  useEffect(() => {
    if (paused || !transitioning) return;
    const timeout = window.setTimeout(() => {
      setPreviousIndex(null);
      setTransitioning(false);
    }, 520);
    return () => window.clearTimeout(timeout);
  }, [paused, transitioning]);

  return (
    <>
      <span
        className="rotating-role"
        data-role-index={index}
        data-paused={paused}
        aria-hidden="true"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
      >
        {transitioning && previousIndex !== null ? (
          <span
            className="rotating-role__item rotating-role__item--exit"
            data-role-index={previousIndex}
            key={`exit-${content.hero.roles[previousIndex]}`}
          >
            {content.hero.roles[previousIndex]}
          </span>
        ) : null}
        <span
          className={`rotating-role__item rotating-role__item--${transitioning ? 'enter' : 'current'}`}
          data-role-index={index}
          key={`current-${content.hero.roles[index]}`}
          onAnimationEnd={() => {
            setPreviousIndex(null);
            setTransitioning(false);
          }}
        >
          {content.hero.roles[index]}
        </span>
      </span>
      <span className="sr-only">Strategist, product manager, developer, project and program manager, and community builder.</span>
    </>
  );
}

function FogBackground({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let effect: { destroy: () => void } | undefined;
    Promise.all([import('three'), import('vanta/dist/vanta.fog.min')])
      .then(([THREE, fogModule]) => {
        if (cancelled) return;
        const fogExport = fogModule.default;
        const fog = typeof fogExport === 'function' ? fogExport : fogExport.default;
        effect = fog({
          THREE,
          el: node,
          mouseControls: theme === 'light',
          touchControls: theme === 'light',
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          highlightColor: theme === 'light' ? 0x0020ff : 0xffffff,
          midtoneColor: theme === 'light' ? 0x00e3ff : 0x494949,
          lowlightColor: theme === 'light' ? 0xbdbdbd : 0x3a3a3a,
          baseColor: theme === 'light' ? 0xffffff : 0x000000,
          blurFactor: 0.7,
          zoom: theme === 'light' ? 1 : 0.7,
          speed: theme === 'light' ? 1.5 : 1.6,
        });
      })
      .catch((error: unknown) => {
        console.warn('Hero Fog failed to initialize; using CSS fallback.', error);
      });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, [theme]);

  return <div ref={ref} className="fog-background" aria-hidden="true" />;
}

function Experience() {
  return (
    <section id="experience" className="screen screen--experience" aria-labelledby="experience-title">
      <div className="page-shell screen-content experience-layout">
        <SectionCopy label={content.experience.label} title={content.experience.title} intro={content.experience.intro} titleId="experience-title" />
        <ExperienceTimeline items={content.experience.items} />
      </div>
    </section>
  );
}

function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="experience-timeline" aria-label="Experience timeline">
      {items.map((item) => (
        <li key={`${item.organization}-${item.role}`}>
          <details className="experience-entry">
            <summary>
              <span className="experience-logo" data-logo={item.logo} aria-hidden="true">
                <img className="experience-logo__default" src={experienceLogos[item.logo] ?? huaweiLogo} alt="" />
                {item.logo === 'unsw' && <img className="experience-logo__dark" src={unswDarkLogo} alt="" />}
              </span>
              <span className="experience-identity"><strong>{item.organization}</strong><span>{item.role}</span></span>
              <span className="experience-dates">{item.startDate} - {item.endDate}</span>
              <ChevronDown className="experience-chevron" aria-hidden="true" />
            </summary>
            <div className="experience-detail"><span>{item.stage}</span><p>{item.summary}</p></div>
          </details>
        </li>
      ))}
    </ol>
  );
}

function ProjectSection({ id, label, title, intro, cases, reverse = false }: {
  id: SectionId; label: string; title: string; intro: string; cases: CaseStudy[]; reverse?: boolean;
}) {
  if (id === 'gtm') {
    return <section id={id} className="screen project-screen project-screen--showcase" aria-labelledby={`${id}-title`}>
      <StrategicProjectShowcase label={label} title={title} intro={intro} cases={cases} />
    </section>;
  }
  return (
    <section id={id} className={`screen project-screen ${reverse ? 'project-screen--reverse' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="page-shell screen-content project-layout">
        <SectionCopy label={label} title={title} intro={intro} titleId={`${id}-title`} />
        <div className="project-cards">
          {cases.slice(0, 3).map((item, index) => (
            <article className="project-card" key={item.title}>
              <div className="project-card__media" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div>
              <div className="project-card__body"><h3>{item.title}</h3><p>{item.summary}</p>
                <div className="project-card__result"><strong>{item.result}</strong><span>{item.secondary}</span></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StrategicProjectShowcase({ label, title, intro, cases }: { label: string; title: string; intro: string; cases: CaseStudy[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hasEntered, setHasEntered] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const active = cases[activeIndex];
  const previous = previousIndex === null ? null : cases[previousIndex];

  useEffect(() => {
    const node = showcaseRef.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setHasEntered(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setHasEntered(true);
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function selectProject(nextIndex: number, nextDirection: 1 | -1) {
    if (nextIndex === activeIndex) return;
    setPreviousIndex(activeIndex);
    setDirection(nextDirection);
    setActiveIndex(nextIndex);
  }
  function moveProject(step: 1 | -1) {
    selectProject((activeIndex + step + cases.length) % cases.length, step);
  }

  return (
    <div ref={showcaseRef} className="page-shell screen-content strategic-projects" role="group" aria-label="Strategic project showcase">
      <div className="strategic-projects__header">
        <SectionCopy label={label} title={title} intro={intro} titleId="gtm-title" />
        <div className="strategic-projects__controls" aria-label="Project controls">
          <button type="button" aria-label="Previous project" onClick={() => moveProject(-1)}><ArrowLeft aria-hidden="true" /></button>
          <button type="button" aria-label="Next project" onClick={() => moveProject(1)}><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
      <div className="strategic-showcase" data-entered={hasEntered} data-direction={direction === 1 ? 'next' : 'previous'} data-switching={Boolean(previous)}>
        <div key={`copy-${active.title}`} className="strategic-showcase__copy-shell">
          <div className="strategic-showcase__copy-stage" aria-live="polite">
            {previous ? <ProjectShowcaseCopy project={previous} index={previousIndex!} state="exit" /> : null}
            <ProjectShowcaseCopy key={active.title} project={active} index={activeIndex} state="enter" />
          </div>
        </div>
        <div key={`media-${active.title}`} className="strategic-showcase__media" aria-hidden="true">
          <div className="strategic-showcase__media-frame">
            {previous ? <img className="strategic-showcase__image strategic-showcase__image--exit" src={previous.image} alt="" /> : null}
            <img key={active.title} className="strategic-showcase__image strategic-showcase__image--enter" src={active.image} alt="" />
          </div>
        </div>
      </div>
      <div className="strategic-showcase__progress" aria-label="Select a strategic project">
        {cases.map((project, index) => <button key={project.title} type="button" aria-label={`Show project ${index + 1}: ${project.title}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => selectProject(index, index > activeIndex ? 1 : -1)} />)}
      </div>
    </div>
  );
}

function ProjectShowcaseCopy({ project, index, state }: { project: CaseStudy; index: number; state: 'enter' | 'exit' }) {
  return (
    <article className={`strategic-showcase__copy strategic-showcase__copy--${state}`} aria-hidden={state === 'exit'}>
      <p className="strategic-showcase__eyebrow">{String(index + 1).padStart(2, '0')} / Selected project</p>
      <div className="strategic-showcase__statement"><h3>{project.title}</h3><p>{project.summary}</p></div>
      <div className="strategic-showcase__footer"><div><strong>{project.result}</strong><span>{project.secondary}</span></div>
        <a href="#contact" tabIndex={state === 'exit' ? -1 : undefined}>Discuss project <ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </article>
  );
}

function SectionCopy({ label, title, intro, titleId }: { label: string; title: string; intro: string; titleId: string }) {
  return <div className="section-copy"><p className="section-label">{label}</p><h2 id={titleId}>{title}</h2><p>{intro}</p></div>;
}

function Contact() {
  const links = useMemo(() => [
    { icon: Mail, label: content.contact.emailLabel, href: 'mailto:' },
    { icon: Linkedin, label: content.contact.linkedinLabel, href: 'https://www.linkedin.com/in/xiaoyufeng/' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/hexfeng' },
  ], []);
  return (
    <section id="contact" className="screen screen--contact" aria-labelledby="contact-title">
      <div className="page-shell screen-content contact-layout">
        <SectionCopy label={content.contact.label} title={content.contact.title} intro={content.contact.intro} titleId="contact-title" />
        <div className="contact-links">
          {links.map(({ icon: Icon, label, href }) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            <span className="contact-link__icon" aria-hidden="true"><Icon size={20} /></span><span>{label}</span><ArrowUpRight size={18} aria-hidden="true" />
          </a>)}
        </div>
      </div>
      <footer className="page-shell site-footer"><span className="brand-mark" aria-hidden="true">XF</span><span>{content.footer}</span><span>© {new Date().getFullYear()} Xiaoyu Feng</span></footer>
    </section>
  );
}
