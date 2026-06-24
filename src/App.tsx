import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, Linkedin, Mail } from "lucide-react";
import { content } from "./content";
import "./styles.css";

const copy = content.en;
const mountainImage = "/images/mountain-background-web.jpg";

type CaseItem = {
  title: string;
  summary: string;
  result?: string;
  secondary?: string;
};

type ProjectSectionProps = {
  id: string;
  label: string;
  title: string;
  intro: string;
  cases: CaseItem[];
  reverse?: boolean;
  tone: "business" | "transformation" | "ecosystem" | "lab";
};

function usePageSignals() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("reduce-motion");
      return;
    }

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return scrolled;
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      XF
    </span>
  );
}

function Navigation({ scrolled }: { scrolled: boolean }) {
  return (
    <header className={`site-header ${scrolled ? "site-header--solid" : ""}`}>
      <a className="brand" href="#top" aria-label={copy.hero.name}>
        <BrandMark />
        <span>{copy.hero.name}</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#experience">{copy.nav.experience}</a>
        <a href="#gtm">{copy.nav.work}</a>
        <a href="#lab">{copy.nav.lab}</a>
        <a href="#contact">{copy.nav.contact}</a>
      </nav>
      <a className="resume-link" href="#contact">
        {copy.nav.resume}
        <Download size={15} aria-hidden="true" />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-content page-shell">
        <div className="hero-copy" data-reveal>
          <p className="hero-name">{copy.hero.name}</p>
          <h1 id="hero-title">{copy.hero.title}</h1>
          <p className="hero-statement">{copy.hero.statement}</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#gtm">
              Explore projects
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className="button button--secondary" href="#contact">
              {copy.hero.secondaryAction}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-metrics" aria-label="Selected outcomes" data-reveal>
          {copy.hero.metrics.map((metric) => (
            <div className="hero-metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
      <a className="scroll-cue" href="#experience" aria-label="Experience">
        <span />
      </a>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="screen screen--experience" aria-labelledby="experience-title">
      <div className="screen-tint" aria-hidden="true" />
      <div className="page-shell screen-content experience-layout">
        <div className="section-copy" data-reveal>
          <p className="section-label">{copy.experience.label}</p>
          <h2 id="experience-title">{copy.experience.title}</h2>
          <p>{copy.experience.intro}</p>
        </div>
        <div className="compact-timeline" data-reveal>
          {copy.experience.items.map((item, index) => (
            <article className="timeline-entry" key={`${item.organization}-${item.role}`}>
              <span className="timeline-number">0{index + 1}</span>
              <span className="timeline-node" aria-hidden="true" />
              <div>
                <p className="timeline-period">{item.period}</p>
                <h3>{item.organization}</h3>
                <p className="timeline-role">{item.role}</p>
                <p className="timeline-summary">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  item,
  index,
  tone
}: {
  item: CaseItem;
  index: number;
  tone: ProjectSectionProps["tone"];
}) {
  return (
    <article className="project-card" data-reveal>
      <div className={`project-card__media project-card__media--${index + 1}`}>
        <img src={mountainImage} alt={`Conceptual visual for ${item.title}`} />
        <span className={`project-card__wash project-card__wash--${tone}`} aria-hidden="true" />
        <span className="project-card__number">0{index + 1}</span>
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
  );
}

function ProjectSection({
  id,
  label,
  title,
  intro,
  cases,
  reverse = false,
  tone
}: ProjectSectionProps) {
  return (
    <section
      id={id}
      className={`screen project-screen project-screen--${tone} ${reverse ? "project-screen--reverse" : ""}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="screen-tint" aria-hidden="true" />
      <div className="page-shell screen-content project-layout">
        <div className="section-copy project-copy" data-reveal>
          <p className="section-label">{label}</p>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{intro}</p>
        </div>
        <div className="project-cards">
          {cases.slice(0, 3).map((item, index) => (
            <ProjectCard item={item} index={index} tone={tone} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="screen screen--contact" aria-labelledby="contact-title">
      <div className="screen-tint" aria-hidden="true" />
      <div className="page-shell screen-content contact-layout">
        <div className="section-copy" data-reveal>
          <p className="section-label">{copy.contact.label}</p>
          <h2 id="contact-title">{copy.contact.title}</h2>
        </div>
        <div className="contact-details" data-reveal>
          <p>{copy.contact.intro}</p>
          <div className="contact-links">
            <div className="contact-placeholder">
              <Mail size={20} aria-hidden="true" />
              <span>
                {copy.contact.emailLabel}
                <small>{copy.contact.resumeNote}</small>
              </span>
            </div>
            <a href="https://www.linkedin.com/in/xiaoyufeng/" target="_blank" rel="noreferrer">
              <Linkedin size={20} aria-hidden="true" />
              <span>{copy.contact.linkedinLabel}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <div className="contact-placeholder">
              <Download size={20} aria-hidden="true" />
              <span>
                {copy.contact.resumeLabel}
                <small>{copy.contact.resumeNote}</small>
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer className="page-shell site-footer">
        <BrandMark />
        <span>{copy.footer}</span>
        <span>© {new Date().getFullYear()} Xiaoyu Feng</span>
      </footer>
    </section>
  );
}

export default function App() {
  const scrolled = usePageSignals();

  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = "Xiaoyu Feng — Strategy & Transformation";
  }, []);

  return (
    <>
      <div className="fixed-background" aria-hidden="true" />
      <Navigation scrolled={scrolled} />
      <main>
        <Hero />
        <Experience />
        <ProjectSection
          id="gtm"
          label={copy.gtm.label}
          title={copy.gtm.title}
          intro={copy.gtm.intro}
          cases={copy.gtm.cases}
          tone="business"
        />
        <ProjectSection
          id="transformation"
          label={copy.transformation.label}
          title={copy.transformation.title}
          intro={copy.transformation.intro}
          cases={copy.transformation.cases}
          reverse
          tone="transformation"
        />
        <ProjectSection
          id="ecosystem"
          label={copy.ecosystem.label}
          title={copy.ecosystem.title}
          intro={copy.ecosystem.intro}
          cases={copy.ecosystem.cases}
          tone="ecosystem"
        />
        <ProjectSection
          id="lab"
          label={copy.lab.label}
          title={copy.lab.title}
          intro={copy.lab.intro}
          cases={copy.lab.experiments}
          reverse
          tone="lab"
        />
        <Contact />
      </main>
    </>
  );
}
