import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Github,
  Leaf,
  Lightbulb,
  Linkedin,
  Mail,
  Map,
  Moon,
  Sun,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import huaweiLogo from './assets/logos/huawei.png';
import rexelLogo from './assets/logos/rexel.svg';
import unswDarkLogo from './assets/logos/unsw-dark.png';
import unswLogo from './assets/logos/unsw.png';
import utorontoLogo from './assets/logos/utoronto.svg';
import { content, sections, type CaseStudy, type ExperienceItem, type LabProject, type SectionId } from './content';
import { DriftWall, LogoLoop, type DriftWallItem, type LogoLoopItem } from './engagement-effects';
import { githubContributionSnapshot, githubContributionSnapshotDate, type ContributionDay } from './github-contributions';
import { PhotographyGallery } from './photography-gallery';
import { Threads } from './threads';
import './styles.css';

type Theme = 'light' | 'dark';

const THEME_KEY = 'portfolio-theme';
const outcomeIcons = { growth: TrendingUp, energy: Leaf, roadmap: Map, customers: Users, innovation: Lightbulb };
const experienceThreadColors: Record<Theme, [number, number, number]> = { light: [0, 0, 0], dark: [1, 1, 1] };
const photographyCoverImages = [
  '/images/photography/_dsc0488.webp',
  '/images/photography/_dsc2207.webp',
  '/images/photography/_dsc2983.webp',
  '/images/photography/_dsc2295.webp',
];
const experienceLogos: Record<string, string> = {
  huawei: huaweiLogo,
  rexel: rexelLogo,
  unsw: unswLogo,
  utoronto: utorontoLogo,
};
const engagementImages: DriftWallItem[] = Array.from({ length: 21 }, (_, index) => ({
  image: `/images/engagement/engagement-${String(index + 1).padStart(2, '0')}.webp`,
}));
const engagementLogos: LogoLoopItem[] = [
  { name: 'NOVA Greece', src: '/logos/engagement/01_nova-greece.svg', width: 174, height: 36, slotWidth: 138, offsetY: 4 },
  { name: 'Vodafone', src: '/logos/engagement/02_vodafone.svg', width: 174, height: 44, slotWidth: 138 },
  { name: 'Huawei', src: '/logos/engagement/03_huawei.svg', width: 88, height: 64, slotWidth: 80 },
  { name: 'COSMOTE Greece', src: '/logos/engagement/04_cosmote-greece.svg', width: 148, height: 54, slotWidth: 121, offsetY: 1 },
  { name: 'Hack the North', src: '/logos/engagement/05_hack-the-north.svg', width: 62, height: 62, slotWidth: 62 },
  { name: 'Techyon', src: '/logos/engagement/06_techyon.svg', width: 58, height: 58, slotWidth: 60 },
  { name: 'UofTHacks', src: '/logos/engagement/07_uofthacks.svg', width: 72, height: 62, slotWidth: 70 },
  { name: 'Victus Networks', src: '/logos/engagement/08_victus-networks.svg', width: 78, height: 62, slotWidth: 74 },
  { name: 'EETT', src: '/logos/engagement/09_eett.svg', width: 64, height: 64, slotWidth: 65 },
  { name: 'University of Toronto', src: '/logos/engagement/10_university-of-toronto.svg', width: 44, height: 68, slotWidth: 51 },
  { name: 'University of Waterloo', src: '/logos/engagement/11_university-of-waterloo.svg', width: 58, height: 68, slotWidth: 61, preserveDetail: true },
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
        <Experience theme={theme} />
        <Projects />
        <Transformation theme={theme} />
        <ThinkingLab theme={theme} />
        <BesideWork />
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
        <HeaderLink href="#gtm" active={['gtm', 'transformation'].includes(currentSection)}>
          {content.nav.work}
        </HeaderLink>
        <HeaderLink href="#lab" active={currentSection === 'lab'}>{content.nav.lab}</HeaderLink>
        <HeaderLink href="#beside" active={currentSection === 'beside'}>{content.nav.beside}</HeaderLink>
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

function Experience({ theme }: { theme: Theme }) {
  return (
    <section id="experience" className="screen screen--experience" aria-labelledby="experience-title">
      <div className="experience-threads" aria-hidden="true">
        <Threads color={experienceThreadColors[theme]} amplitude={1} distance={0} enableMouseInteraction />
      </div>
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
            <div className="experience-detail">
              <span>{item.stage}</span>
              <ul>{item.summary.map((description) => <li key={description}>{description}</li>)}</ul>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

function Projects() {
  return <section id="gtm" className="screen project-screen project-screen--showcase" aria-labelledby="gtm-title">
    <StrategicProjectShowcase {...content.gtm} />
  </section>;
}

function Transformation({ theme }: { theme: Theme }) {
  return (
    <section id="transformation" className="screen project-screen project-screen--reverse" aria-labelledby="transformation-title">
      <div className="page-shell screen-content transformation-layout">
        <SectionCopy {...content.transformation} titleId="transformation-title" />
        <div className="transformation-main">
          <div className="engagement-points">
            {content.transformation.cases.map((item, index) => (
              <article className="engagement-point" key={item.title}>
                <span className="engagement-point__index" aria-hidden="true">0{index + 1}</span>
                <div className="engagement-point__content">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <footer><strong>{item.result}</strong><span>{item.secondary}</span></footer>
                </div>
              </article>
            ))}
          </div>
          <DriftWall items={engagementImages} theme={theme} />
        </div>
        <div className="engagement-logo-band">
          <LogoLoop logos={engagementLogos} theme={theme} />
        </div>
      </div>
    </section>
  );
}

function ThinkingLab({ theme }: { theme: Theme }) {
  return (
    <section id="lab" className="screen thinking-lab" aria-labelledby="lab-title">
      <NetBackground theme={theme} />
      <div className="page-shell thinking-lab__content">
        <div className="thinking-lab__overview">
          <SectionCopy
            label={content.lab.label}
            title={content.lab.title}
            intro={content.lab.intro}
            titleId="lab-title"
          />
          <GitHubCalendar />
        </div>
        <div className="thinking-lab__projects">
          {content.lab.experiments.map((project) => <LabProjectCard key={project.title} project={project} />)}
        </div>
      </div>
    </section>
  );
}

function BesideWork() {
  const [openFolder, setOpenFolder] = useState<number | null>(null);
  const [galleryOpening, setGalleryOpening] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryTimer = useRef<number | null>(null);
  const photographyTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => () => {
    if (galleryTimer.current !== null) window.clearTimeout(galleryTimer.current);
  }, []);

  function openPhotographyGallery() {
    setGalleryOpening(true);
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420;
    galleryTimer.current = window.setTimeout(() => {
      setGalleryOpening(false);
      setGalleryOpen(true);
    }, delay);
  }

  function closePhotographyGallery() {
    setGalleryOpen(false);
    window.requestAnimationFrame(() => photographyTrigger.current?.focus());
  }

  return (
    <section id="beside" className="screen beside-work" aria-labelledby="beside-title">
      <div className="page-shell screen-content beside-work__layout">
        <SectionCopy {...content.beside} titleId="beside-title" />
        <ol className="beside-work__items">
          {content.beside.items.map((item, index) => {
            const isPhotography = item.title === 'Photography';
            return (
              <li
                className="beside-work__item"
                data-open={openFolder === index}
                data-gallery-opening={isPhotography && galleryOpening}
                key={item.title}
              >
                {isPhotography ? (
                  <span className="beside-work__photo-collage" aria-hidden="true">
                    {photographyCoverImages.map((image) => (
                      <img key={image} src={image} alt="" loading="lazy" decoding="async" />
                    ))}
                  </span>
                ) : (
                  <img src={item.image} alt="" loading="lazy" decoding="async" />
                )}
                <div className="beside-work__item-content">
                  <span aria-hidden="true">0{index + 1} / Beside work</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <button
                  ref={isPhotography ? photographyTrigger : undefined}
                  type="button"
                  className="beside-work__trigger"
                  aria-label={isPhotography ? 'Open Photography gallery' : `Toggle ${item.title} folder`}
                  aria-haspopup={isPhotography ? 'dialog' : undefined}
                  aria-pressed={isPhotography ? undefined : openFolder === index}
                  disabled={isPhotography && galleryOpening}
                  onClick={isPhotography
                    ? openPhotographyGallery
                    : () => setOpenFolder(openFolder === index ? null : index)}
                >
                  <ArrowRight aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      {galleryOpen && <PhotographyGallery onClose={closePhotographyGallery} />}
    </section>
  );
}

function NetBackground({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let effect: { destroy: () => void } | undefined;
    Promise.all([import('three'), import('vanta/dist/vanta.net.min')])
      .then(([THREE, netModule]) => {
        if (cancelled) return;
        const netExport = netModule.default;
        const net = typeof netExport === 'function' ? netExport : netExport.default;
        effect = net({
          THREE,
          el: node,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: theme === 'light' ? 0x111318 : 0xffffff,
          backgroundColor: theme === 'light' ? 0xf7f8fa : 0x0b0c0f,
          points: 10,
          maxDistance: 18,
          spacing: 17,
        });
      })
      .catch((error: unknown) => {
        console.warn('Thinking Lab Net failed to initialize; using CSS fallback.', error);
      });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, [theme]);

  return <div ref={ref} className="net-background" aria-hidden="true" />;
}

function GitHubCalendar() {
  const [days, setDays] = useState<ContributionDay[]>(githubContributionSnapshot);
  const [status, setStatus] = useState<'snapshot' | 'live'>('snapshot');

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://github-contributions-api.jogruber.de/v4/hexfeng?y=last', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub contribution request failed: ${response.status}`);
        return response.json() as Promise<{ contributions: ContributionDay[] }>;
      })
      .then((data) => {
        if (!Array.isArray(data.contributions) || data.contributions.length < 7 || data.contributions.some((day) => (
          typeof day.date !== 'string' || typeof day.count !== 'number' || typeof day.level !== 'number'
        ))) throw new Error('GitHub contribution response is invalid');
        setDays(data.contributions.slice(-371));
        setStatus('live');
      })
      .catch((error: unknown) => {
        if ((error as Error).name === 'AbortError') return;
      });
    return () => controller.abort();
  }, []);

  const contributions = days.reduce((sum, day) => sum + day.count, 0);
  const activeWeeks = days.reduce((weeks, day, index) => {
    if (day.count > 0) weeks.add(Math.floor(index / 7));
    return weeks;
  }, new Set<number>()).size;
  const monthLabels = days.reduce<Array<{ label: string; week: number }>>((labels, day, index) => {
    if (day.date.endsWith('-01')) {
      labels.push({
        label: new Date(`${day.date}T00:00:00`).toLocaleString('en', { month: 'short' }),
        week: Math.floor(index / 7) + 1,
      });
    }
    return labels;
  }, []);

  return (
    <aside className="github-calendar" aria-labelledby="github-calendar-title">
      <div className="github-calendar__header">
        <span className="github-calendar__mark" aria-hidden="true"><Github /></span>
        <div><h3 id="github-calendar-title">Building in public</h3><p>A year of experiments, iterations, and useful commits.</p></div>
        <a href="https://github.com/hexfeng" target="_blank" rel="noreferrer">View GitHub <ArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className="github-calendar__chart" role="img" aria-label={`${contributions} GitHub contributions in the last year`} data-status={status}>
        <div className="github-calendar__months" aria-hidden="true">
          {monthLabels.map(({ label, week }) => <span key={`${label}-${week}`} style={{ gridColumn: week }}>{label}</span>)}
        </div>
        <div className="github-calendar__days" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
        <div className="github-calendar__grid" aria-hidden="true">
          {days.map((day) => (
            <span
              key={day.date}
              data-level={day.level}
              title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
            />
          ))}
        </div>
      </div>
      <div className="github-calendar__footer" title={status === 'snapshot' ? `Snapshot captured ${githubContributionSnapshotDate}` : 'Live public GitHub data'}>
        <div className="github-calendar__legend" aria-hidden="true"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} />)}<span>More</span></div>
        <p>{contributions.toLocaleString()} contributions <span>·</span> {activeWeeks} active weeks</p>
      </div>
    </aside>
  );
}

function LabProjectCard({ project }: { project: LabProject }) {
  return (
    <a
      className={`lab-project-card${project.hoverImage || project.video ? ' lab-project-card--preview' : ''}${project.video ? ' lab-project-card--video' : ''}${project.showFullImage ? ' lab-project-card--full-image' : ''}${project.swapPreviewInDark ? ' lab-project-card--swap-dark' : ''}`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={project.video ? (event) => {
        const video = event.currentTarget.querySelector('video');
        if (video) void video.play().catch(() => undefined);
      } : undefined}
      onMouseLeave={project.video ? (event) => {
        const video = event.currentTarget.querySelector('video');
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      } : undefined}
    >
      <span className={`lab-project-card__media${project.hoverImage || project.video || project.showFullImage ? ' lab-project-card__media--contain' : ''}`}>
        {project.video && (
          <video className="lab-project-card__video" src={project.video} poster={project.image} muted loop playsInline preload="auto" aria-hidden="true" />
        )}
        <img className="lab-project-card__image lab-project-card__image--primary" src={project.image} alt="" loading="lazy" decoding="async" />
        {project.hoverImage && (
          <img className="lab-project-card__image lab-project-card__image--hover" src={project.hoverImage} alt="" loading="lazy" decoding="async" />
        )}
      </span>
      <span className="lab-project-card__body">
        <ArrowUpRight aria-hidden="true" />
        <strong>{project.title}</strong>
        <span>{project.summary}</span>
      </span>
      <span className="sr-only">View {project.title} on GitHub</span>
    </a>
  );
}

function StrategicProjectShowcase({ label, title, intro, cases }: { label: string; title: string; intro: string; cases: CaseStudy[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hasEntered, setHasEntered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const active = cases[activeIndex];
  const previous = previousIndex === null ? null : cases[previousIndex];

  useEffect(() => {
    const node = showcaseRef.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setHasEntered(true);
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
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

  useEffect(() => {
    if (!isVisible || cases.length < 2) return;
    const timeout = window.setTimeout(() => moveProject(1), 30_000);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, cases.length, isVisible]);

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
    <article className={`strategic-showcase__copy strategic-showcase__copy--${state}`} data-project-index={index} aria-hidden={state === 'exit'}>
      <p className="strategic-showcase__eyebrow">{String(index + 1).padStart(2, '0')} / Selected project</p>
      <div className="strategic-showcase__statement">
        {index === 3 ? (
          <h3 aria-label={project.title}>
            <span>SEE Wireless Business</span>
            <span>Strategy &amp; Execution</span>
          </h3>
        ) : <h3>{project.title}</h3>}
        <p>{project.summary}</p>
      </div>
      <div className="strategic-showcase__footer">
        {project.outcomes ? <ul className="strategic-showcase__outcomes">
          {project.outcomes.map(({ highlight, detail, secondaryHighlight, suffix, icon }) => {
            const OutcomeIcon = icon ? outcomeIcons[icon] : null;
            return <li key={highlight} className={OutcomeIcon ? 'strategic-showcase__outcome--icon' : undefined}>
              {OutcomeIcon && <span className="strategic-showcase__outcome-icon" aria-hidden="true"><OutcomeIcon size={14} /></span>}
              <span className="strategic-showcase__outcome-copy"><strong>{highlight}</strong> {detail}{secondaryHighlight && <> <strong>{secondaryHighlight}</strong> {suffix}</>}</span>
            </li>;
          })}
        </ul> : <div><strong>{project.result}</strong><span>{project.secondary}</span></div>}
      </div>
    </article>
  );
}

function SectionCopy({ label, title, intro, titleId }: { label: string; title: string; intro: string; titleId: string }) {
  return <div className="section-copy"><p className="section-label">{label}</p><h2 id={titleId}>{title}</h2><p>{intro}</p></div>;
}

function Contact() {
  const links = [
    { icon: Mail, label: content.contact.emailLabel, href: 'mailto:' },
    { icon: Linkedin, label: content.contact.linkedinLabel, href: 'https://www.linkedin.com/in/xiaoyufeng/' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/hexfeng' },
  ];
  return (
    <section id="contact" className="screen screen--contact contact-band" aria-labelledby="contact-title">
      <div className="page-shell contact-layout">
        <div className="contact-copy">
          <p className="section-label">{content.contact.label}</p>
          <h2 id="contact-title">{content.contact.title}</h2>
          <p>{content.contact.intro}</p>
        </div>
        <div className="contact-links">
          {links.map(({ icon: Icon, label, href }) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            <span className="contact-link__icon" aria-hidden="true"><Icon size={20} /></span><span>{label}</span><ArrowUpRight size={18} aria-hidden="true" />
          </a>)}
        </div>
      </div>
      <footer className="page-shell site-footer"><span>{content.footer}</span><span>© {new Date().getFullYear()} Xiaoyu Feng</span></footer>
    </section>
  );
}
