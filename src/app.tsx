import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';
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
      const scrollToHash = () => {
        const target = document.getElementById(window.location.hash.slice(1));
        if (target) window.scrollTo({ top: target.offsetTop, behavior: 'auto' });
      };
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
    let wheelDelta = 0;

    const jumpToSection = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      event.preventDefault();
      if (locked) return;

      wheelDelta += event.deltaY;
      if (Math.abs(wheelDelta) < 80) return;

      const direction = Math.sign(wheelDelta);
      wheelDelta = 0;

      const nodes = sections
        .map((section) => document.getElementById(section.id))
        .filter((node): node is HTMLElement => Boolean(node));
      const currentIndex = nodes
        .map((node, index) => ({ index, distance: Math.abs(node.getBoundingClientRect().top) }))
        .sort((a, b) => a.distance - b.distance)[0]?.index;

      if (currentIndex === undefined) return;

      const nextIndex = Math.min(nodes.length - 1, Math.max(0, currentIndex + direction));
      if (nextIndex === currentIndex) return;

      locked = true;
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.scrollTo({ top: nodes[nextIndex].offsetTop, behavior });
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
    <nav className="section-progress" aria-label="Section progress">
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
    return <GtmProjectSection id={id} label={label} title={title} intro={intro} cases={cases} />;
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

function GtmProjectSection({
  id,
  label,
  title,
  intro,
  cases,
}: {
  id: SectionId;
  label: string;
  title: string;
  intro: string;
  cases: CaseStudy[];
}) {
  const projects = cases.slice(0, 4);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [focusedProject, setFocusedProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const activeProjectIndex = hoveredProject ?? focusedProject ?? selectedProject;
  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex];

  return (
    <section id={id} className="screen project-screen gtm-screen" aria-labelledby={`${id}-title`}>
      <div className="page-shell screen-content gtm-layout">
        <GtmMotionGrid
          projects={projects}
          activeProjectIndex={activeProjectIndex}
          onHover={setHoveredProject}
          onFocus={setFocusedProject}
          onSelect={setSelectedProject}
        />
        <aside className="gtm-detail" aria-label="GTM project detail" aria-live="polite">
          {activeProject ? (
            <>
              <p className="section-label">{String(activeProjectIndex! + 1).padStart(2, '0')} - GTM Project</p>
              <h2 id={`${id}-title`}>{activeProject.title}</h2>
              <p>{activeProject.summary}</p>
              <div className="gtm-detail__result">
                <strong>{activeProject.result}</strong>
                <span>{activeProject.secondary}</span>
              </div>
            </>
          ) : (
            <>
              <p className="section-label">{label}</p>
              <h2 id={`${id}-title`}>{title}</h2>
              <p>{intro}</p>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

function GtmMotionGrid({
  projects,
  activeProjectIndex,
  onHover,
  onFocus,
  onSelect,
}: {
  projects: CaseStudy[];
  activeProjectIndex: number | null;
  onHover: (index: number | null) => void;
  onFocus: (index: number | null) => void;
  onSelect: (index: number) => void;
}) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef(window.innerWidth / 2);
  const motionItems = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        item: projects[index % projects.length],
        projectIndex: index % projects.length,
      })),
    [projects],
  );

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (event: MouseEvent) => {
      mouseXRef.current = event.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 260;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (!row) return;

        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    gsap.ticker.add(updateMotion);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(updateMotion);
    };
  }, []);

  return (
    <div className="gtm-motion">
      <div className="gtm-motion__container">
        {Array.from({ length: 4 }, (_, rowIndex) => (
          <div
            className="gtm-motion__row"
            key={rowIndex}
            ref={(node) => {
              rowRefs.current[rowIndex] = node;
            }}
          >
            {motionItems.slice(rowIndex * 7, rowIndex * 7 + 7).map(({ item, projectIndex }, itemIndex) => (
              <button
                className="gtm-motion-card"
                type="button"
                key={`${rowIndex}-${itemIndex}`}
                data-active={activeProjectIndex === projectIndex}
                data-project-index={projectIndex}
                aria-label={`Show GTM project ${projectIndex + 1}: ${item.title}`}
                onMouseEnter={() => onHover(projectIndex)}
                onMouseLeave={() => onHover(null)}
                onMouseDown={(event) => event.preventDefault()}
                onPointerUp={() => {
                  onHover(null);
                  onFocus(null);
                  onSelect(projectIndex);
                }}
                onFocus={() => {
                  onHover(null);
                  onFocus(projectIndex);
                }}
                onBlur={() => onFocus(null)}
                onClick={() => {
                  onHover(null);
                  onFocus(null);
                  onSelect(projectIndex);
                }}
              >
                <span className="gtm-motion-card__number">{String(projectIndex + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <span>{item.result}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
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
