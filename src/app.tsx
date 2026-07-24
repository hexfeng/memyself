import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { content, sections, type CaseStudy, type ExperienceItem, type SectionId } from './content';
import './styles.css';

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

export function App() {
  const [currentSection, setCurrentSection] = useState<SectionId>('top');

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

        if (visible?.target.id) {
          setCurrentSection(visible.target.id as SectionId);
        }
      },
      { threshold: [0.35, 0.55, 0.75] },
    );

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let locked = false;

    const jumpToSection = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 24 || locked) return;

      const nodes = sections
        .map((section) => document.getElementById(section.id))
        .filter((node): node is HTMLElement => Boolean(node));
      const currentIndex = nodes
        .map((node, index) => ({ index, distance: Math.abs(node.getBoundingClientRect().top) }))
        .sort((a, b) => a.distance - b.distance)[0]?.index;

      if (currentIndex === undefined) return;

      const nextIndex = Math.min(nodes.length - 1, Math.max(0, currentIndex + Math.sign(event.deltaY)));
      if (nextIndex === currentIndex) return;

      event.preventDefault();
      locked = true;
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      nodes[nextIndex].scrollIntoView({ behavior });
      window.setTimeout(() => {
        locked = false;
      }, 900);
    };

    window.addEventListener('wheel', jumpToSection, { passive: false });
    return () => window.removeEventListener('wheel', jumpToSection);
  }, []);

  return (
    <>
      <SceneBackdrop />
      <Header currentSection={currentSection} />
      <SectionProgress currentSection={currentSection} />
      <main>
        <Hero />
        <Experience />
        {projectSections.map((section) => (
          <ProjectSection key={section.id} {...section} />
        ))}
        <Contact />
      </main>
    </>
  );
}

function SceneBackdrop() {
  return (
    <div className="scene-backdrop" aria-hidden="true">
      <video className="scene-backdrop__video" src="/site-background.mp4" autoPlay muted loop playsInline />
      <div className="scene-backdrop__shade" />
    </div>
  );
}

function Header({ currentSection }: { currentSection: SectionId }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={content.hero.name}>
        <span className="brand-mark" aria-hidden="true">
          XF
        </span>
        <span>{content.hero.name}</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <HeaderLink href="#experience" active={currentSection === 'experience'}>
          {content.nav.experience}
        </HeaderLink>
        <HeaderLink
          href="#gtm"
          active={currentSection === 'gtm' || currentSection === 'transformation' || currentSection === 'ecosystem'}
        >
          {content.nav.work}
        </HeaderLink>
        <HeaderLink href="#lab" active={currentSection === 'lab'}>
          {content.nav.lab}
        </HeaderLink>
        <HeaderLink href="#contact" active={currentSection === 'contact'}>
          {content.nav.contact}
        </HeaderLink>
      </nav>
      <a className="resume-link" href="#contact">
        Resume soon
      </a>
    </header>
  );
}

function HeaderLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: string;
}) {
  return (
    <a href={href} aria-current={active ? 'page' : undefined}>
      {children}
    </a>
  );
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

function Hero() {
  return (
    <section id="top" className="hero screen" aria-labelledby="hero-title">
      <div className="page-shell hero-content">
        <div className="hero-identity">
          <p className="section-label">Strategy & Transformation</p>
          <h1 id="hero-title">{content.hero.name}</h1>
          <p className="hero-statement">{content.hero.statement}</p>
          <p className="hero-location">{content.hero.location}</p>
          <nav className="hero-actions" aria-label="Hero navigation">
            <a className="hero-action hero-action--primary" href="#gtm">
              <span>{content.hero.primaryAction}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="hero-action hero-action--compact" href="mailto:">
              <Mail size={17} aria-hidden="true" />
              <span>Email</span>
            </a>
            <a
              className="hero-action hero-action--compact"
              href="https://www.linkedin.com/in/xiaoyufeng/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={17} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              className="hero-action hero-action--compact"
              href="https://github.com/hexfeng"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="screen screen--experience" aria-labelledby="experience-title">
      <div className="page-shell screen-content experience-layout">
        <SectionCopy
          label={content.experience.label}
          title={content.experience.title}
          intro={content.experience.intro}
          titleId="experience-title"
        />
        <ExperienceTimeline items={content.experience.items} />
      </div>
    </section>
  );
}

function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const [scrollActive, setScrollActive] = useState(0);
  const [hoverActive, setHoverActive] = useState<number | null>(null);
  const activeIndex = hoverActive ?? scrollActive;

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-experience-index]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setScrollActive(Number((visible.target as HTMLElement).dataset.experienceIndex));
        }
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0.4, 0.65] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <ol className="experience-timeline" aria-label="Experience timeline">
      {items.map((item, index) => {
        const active = activeIndex === index;
        return (
          <li
            key={`${item.organization}-${item.role}`}
            className="timeline-entry"
            data-active={active}
            data-experience-index={index}
            onMouseEnter={() => setHoverActive(index)}
            onMouseLeave={() => setHoverActive(null)}
            onFocus={() => setHoverActive(index)}
            onBlur={() => setHoverActive(null)}
            tabIndex={0}
          >
            <span className="timeline-node" aria-hidden="true" />
            <div className="timeline-marker" aria-hidden="true">
              <span className="timeline-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="timeline-logo" data-logo={item.logo}>
                <img src={logoSrc(item.logo)} alt="" />
              </span>
            </div>
            <div className="timeline-copy">
              <p className="timeline-period">
                {item.startDate} - {item.endDate} / {item.stage}
              </p>
              <h3>{item.organization}</h3>
              <p className="timeline-role">{item.role}</p>
              <p className="timeline-summary">{item.summary}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function logoSrc(logo: string) {
  const logos: Record<string, string> = {
    huawei: '/logos/huawei.png',
    rexel: '/logos/rexel.svg',
    unsw: '/logos/unsw.png',
    utoronto: '/logos/utoronto.svg',
  };

  return logos[logo] ?? '/logos/huawei.png';
}

function ProjectSection({
  id,
  label,
  title,
  intro,
  cases,
  reverse = false,
}: {
  id: SectionId;
  label: string;
  title: string;
  intro: string;
  cases: CaseStudy[];
  reverse?: boolean;
}) {
  if (id === 'gtm') {
    return (
      <section id={id} className="screen project-screen project-screen--showcase" aria-labelledby={`${id}-title`}>
        <StrategicProjectShowcase label={label} title={title} intro={intro} cases={cases} />
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`screen project-screen ${reverse ? 'project-screen--reverse' : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="page-shell screen-content project-layout">
        <SectionCopy label={label} title={title} intro={intro} titleId={`${id}-title`} />
        <div className="project-cards">
          {cases.slice(0, 3).map((item, index) => (
            <article className="project-card" key={item.title}>
              <div className="project-card__media" aria-hidden="true">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="project-card__body">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="project-card__result">
                  <strong>{item.result}</strong>
                  <span>{item.secondary}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StrategicProjectShowcase({
  label,
  title,
  intro,
  cases,
}: {
  label: string;
  title: string;
  intro: string;
  cases: CaseStudy[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const active = cases[activeIndex];
  const previous = previousIndex === null ? null : cases[previousIndex];

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
    <div
      className="page-shell screen-content strategic-projects"
      role="group"
      aria-label="Strategic project showcase"
    >
      <div className="strategic-projects__header">
        <SectionCopy label={label} title={title} intro={intro} titleId="gtm-title" />
        <div className="strategic-projects__controls" aria-label="Project controls">
          <button type="button" aria-label="Previous project" onClick={() => moveProject(-1)}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next project" onClick={() => moveProject(1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className="strategic-showcase"
        data-direction={direction === 1 ? 'next' : 'previous'}
        data-switching={previous ? 'true' : 'false'}
      >
        <div key={`copy-${active.title}`} className="strategic-showcase__copy-shell">
          <div className="strategic-showcase__copy-stage" aria-live="polite">
            {previous ? (
              <ProjectShowcaseCopy project={previous} index={previousIndex!} state="exit" />
            ) : null}
            <ProjectShowcaseCopy key={active.title} project={active} index={activeIndex} state="enter" />
          </div>
        </div>

        <div key={`media-${active.title}`} className="strategic-showcase__media" aria-hidden="true">
          <div className="strategic-showcase__media-frame">
            {previous ? (
              <img
                className="strategic-showcase__image strategic-showcase__image--exit"
                src={previous.image}
                alt=""
              />
            ) : null}
            <img
              key={active.title}
              className="strategic-showcase__image strategic-showcase__image--enter"
              src={active.image}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="strategic-showcase__progress" aria-label="Select a strategic project">
        {cases.map((project, index) => (
          <button
            key={project.title}
            type="button"
            aria-label={`Show project ${index + 1}: ${project.title}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => selectProject(index, index > activeIndex ? 1 : -1)}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectShowcaseCopy({
  project,
  index,
  state,
}: {
  project: CaseStudy;
  index: number;
  state: 'enter' | 'exit';
}) {
  return (
    <article className={`strategic-showcase__copy strategic-showcase__copy--${state}`} aria-hidden={state === 'exit'}>
      <p className="strategic-showcase__eyebrow">
        {String(index + 1).padStart(2, '0')} / Selected project
      </p>
      <div className="strategic-showcase__statement">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="strategic-showcase__footer">
        <div>
          <strong>{project.result}</strong>
          <span>{project.secondary}</span>
        </div>
        <a href="#contact" tabIndex={state === 'exit' ? -1 : undefined}>
          Discuss project <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function SectionCopy({
  label,
  title,
  intro,
  titleId,
}: {
  label: string;
  title: string;
  intro: string;
  titleId: string;
}) {
  return (
    <div className="section-copy">
      <p className="section-label">{label}</p>
      <h2 id={titleId}>{title}</h2>
      <p>{intro}</p>
    </div>
  );
}

function Contact() {
  const links = useMemo(
    () => [
      { icon: Mail, label: content.contact.emailLabel, href: 'mailto:' },
      { icon: Linkedin, label: content.contact.linkedinLabel, href: 'https://www.linkedin.com/in/xiaoyufeng/' },
      { icon: Github, label: 'GitHub', href: 'https://github.com/hexfeng' },
    ],
    [],
  );

  return (
    <section id="contact" className="screen screen--contact" aria-labelledby="contact-title">
      <div className="page-shell screen-content contact-layout">
        <SectionCopy
          label={content.contact.label}
          title={content.contact.title}
          intro={content.contact.intro}
          titleId="contact-title"
        />
        <div className="contact-links">
          {links.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <span className="contact-link__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span>{label}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <footer className="page-shell site-footer">
        <span className="brand-mark" aria-hidden="true">
          XF
        </span>
        <span>{content.footer}</span>
        <span>© {new Date().getFullYear()} Xiaoyu Feng</span>
      </footer>
    </section>
  );
}
