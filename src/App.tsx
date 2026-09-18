import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Network,
  Sparkles,
  X,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs';

const projects = [
  {
    number: '01',
    type: 'PRODUCT',
    title: 'Anaija',
    subtitle: 'Digital campus · Social · Marketplace',
    description:
      'A digital campus built around student life, community, discovery and commerce.',
    icon: Globe2,
    tone: 'warm',
  },
  {
    number: '02',
    type: 'SYSTEM',
    title: 'Skoolarea',
    subtitle: 'School operating system',
    description:
      'A digital operating system for schools — results, approvals, payments, records and parent access.',
    icon: Layers3,
    tone: 'neutral',
  },
  {
    number: '03',
    type: 'COMPANY',
    title: 'Lyopard Tech Solutions',
    subtitle: 'Technology · Infrastructure · Systems',
    description:
      'Building practical technology systems for businesses, schools, institutions and individuals.',
    icon: Network,
    tone: 'green',
  },
  {
    number: '04',
    type: 'EXPERIMENTS',
    title: "Things I've been building",
    subtitle: 'Prototypes · Ideas · Experiments',
    description:
      'Small software experiments, interface ideas and unfinished systems that may become something bigger.',
    icon: Sparkles,
    tone: 'soft',
  },
];

const skills = [
  ['Software Engineering', Code2],
  ['Product Development', Layers3],
  ['Backend Systems', Database],
  ['Cloud & Infrastructure', Network],
  ['Technical Architecture', Cpu],
  ['Digital Systems', Globe2],
];

// Words for the staggered hero headline reveal.
const heroLineOne = ['I', 'build', 'things'];
const heroLineTwo = ['people', 'can', 'use.'];

// Fires `inView = true` once an element crosses the viewport threshold,
// then stops watching. Powers every scroll-triggered entrance below.
function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function ProjectVisual({
  icon: Icon,
  tone,
}: {
  icon: typeof Globe2;
  tone: string;
}) {
  return (
    <div className={`project-visual ${tone}`}>
      <div className="visual-grid" />
      <div className="placeholder-orb">
        <Icon size={58} strokeWidth={1.2} />
      </div>
      <div className="visual-label">VISUAL PLACEHOLDER</div>
    </div>
  );
}

// A single card in the Work section. Sticky-positioned with an
// increasing top offset so, as you scroll, each card stacks on top
// of the last instead of just scrolling past, and pops in with a
// slight tilt the first time it's scrolled to.
function ProjectCard({
  project,
  index,
  onHover,
}: {
  project: (typeof projects)[number];
  index: number;
  onHover: (v: string) => void;
}) {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const isEven = index % 2 === 0;
  return (
    <article
      ref={ref}
      className={`project stack-project ${inView ? 'in-view' : ''}`}
      style={
        {
          position: 'sticky',
          top: `${88 + index * 26}px`,
          zIndex: index + 1,
          marginBottom: index === projects.length - 1 ? 0 : '16vh',
          transitionDelay: `${index * 100}ms`,
          '--tilt': isEven ? '-1.4deg' : '1.4deg',
        } as any
      }
      onMouseEnter={() => onHover('VIEW')}
      onMouseLeave={() => onHover('')}
    >
      <ProjectVisual icon={project.icon} tone={project.tone} />
      <div className="project-meta">
        <span>
          {project.number} / {project.type}
        </span>
        <ArrowUpRight size={18} />
      </div>
      <h3>{project.title}</h3>
      <div className="project-sub">{project.subtitle}</div>
      <p>{project.description}</p>
      <button>
        View project <ArrowUpRight size={15} />
      </button>
    </article>
  );
}

// Generic scroll-entrance wrapper: fades/pops a card in the first
// time it enters the viewport, with an optional stagger delay.
function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={`reveal-pop ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursor.current) {
        cursor.current.style.left = `${e.clientX}px`;
        cursor.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <main className="site">
      <style>{`
        @keyframes wordRise {
          from { opacity: 0; transform: translateY(22px) rotate(-2deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes dotPop {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.7; }
        }
        @keyframes bobArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(7px); }
        }

        .hero { position: relative; overflow: hidden; }
        .hero-heading .word { display: inline-block; opacity: 0; animation: wordRise 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .eyebrow-live .status-dot { animation: dotPop 1.8s ease-in-out infinite; }
        .hero-scroll .bob { display: inline-flex; animation: bobArrow 1.4s ease-in-out infinite; }
        .hero-actions .primary-btn, .hero-actions .text-btn { transition: transform 0.2s ease; }
        .hero-actions .primary-btn:hover, .hero-actions .text-btn:hover { transform: scale(1.04); }
        .hero-actions .primary-btn:active, .hero-actions .text-btn:active { transform: scale(0.97); }

        /* ---- Hero portrait: one restrained, cinematic frame ---- */
        @keyframes photoSettle {
          from { opacity: 0; transform: scale(1.1); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes kenBurns {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.045); }
        }
        @keyframes cornerIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes lowerThirdIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slateIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .portrait-frame { position: relative; width: 100%; height: 100%; border-radius: 18px; overflow: hidden; }
        .frame-photo-wrap {
          width: 100%; height: 100%; overflow: hidden;
          opacity: 0; animation: photoSettle 1.1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .frame-photo {
          width: 100%; height: 100%; object-fit: cover; display: block;
          animation: kenBurns 22s ease-in-out infinite;
        }
        .portrait-frame:hover .frame-photo { animation-duration: 8s; }
        .frame-vignette {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0) 52%);
        }
        .frame-corner {
          position: absolute; width: 26px; height: 26px; opacity: 0;
          animation: cornerIn 0.5s ease-out forwards;
        }
        .frame-corner.tl { top: 12px; left: 12px; border-top: 2px solid #fff; border-left: 2px solid #fff; transform-origin: top left; animation-delay: 0.35s; }
        .frame-corner.tr { top: 12px; right: 12px; border-top: 2px solid #fff; border-right: 2px solid #fff; transform-origin: top right; animation-delay: 0.45s; }
        .frame-corner.bl { bottom: 12px; left: 12px; border-bottom: 2px solid #fff; border-left: 2px solid #fff; transform-origin: bottom left; animation-delay: 0.55s; }
        .frame-corner.br { bottom: 12px; right: 12px; border-bottom: 2px solid #fff; border-right: 2px solid #fff; transform-origin: bottom right; animation-delay: 0.65s; }
        .frame-slate {
          position: absolute; top: 14px; left: 14px; color: #fff; font-size: 11px; letter-spacing: 0.06em;
          opacity: 0; animation: slateIn 0.5s ease-out forwards; animation-delay: 0.9s;
        }
        .frame-lower {
          position: absolute; left: 18px; right: 18px; bottom: 16px; color: #fff;
          opacity: 0; transform: translateY(14px);
          animation: lowerThirdIn 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards; animation-delay: 1s;
        }
        .frame-lower .frame-eyebrow { display: block; font-size: 11px; letter-spacing: 0.07em; text-transform: uppercase; opacity: 0.75; margin-bottom: 4px; }
        .frame-lower strong { display: block; font-size: 16px; font-weight: 600; }

        /* ---- Work section: sticky stacking cards ---- */
        .stack-project {
          opacity: 0; transform: translateY(70px) scale(0.94) rotate(var(--tilt, 0deg));
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stack-project.in-view { opacity: 1; transform: translateY(0) scale(1) rotate(var(--tilt, 0deg)); }
        .stack-project.in-view:hover { transform: translateY(-12px) scale(1.02) rotate(0deg); transition-duration: 0.35s; }

        /* ---- Generic reveal-on-scroll pop (Building + Personality cards) ---- */
        .reveal-pop {
          opacity: 0; transform: translateY(26px) scale(0.96);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-pop.in-view { opacity: 1; transform: translateY(0) scale(1); }
        .build-card, .person-card { transition: transform 0.3s ease; }
        .build-card:hover { transform: translateY(-8px) scale(1.02); }
        .person-card:hover { transform: translateY(-6px) scale(1.02); }

        @media (prefers-reduced-motion: reduce) {
          .site * {
            animation: none !important;
            transition: none !important;
          }
          .frame-photo-wrap, .frame-corner, .frame-slate, .frame-lower, .stack-project, .reveal-pop, .hero-heading .word {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div ref={cursor} className={`custom-cursor ${active ? 'active' : ''}`}>
        <span>{active || '·'}</span>
      </div>
      <nav className="nav">
        <button className="brand" onClick={() => go('top')}>
          KHALIFA <span>MUHAMMAD</span>
        </button>
        <div className="desktop-nav">
          <button onClick={() => go('work')}>Work</button>
          <button onClick={() => go('about')}>About</button>
          <button onClick={() => go('building')}>Building</button>
          <button onClick={() => go('contact')}>Contact</button>
        </div>
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => go('work')}>
            Work <ArrowUpRight />
          </button>
          <button onClick={() => go('about')}>
            About <ArrowUpRight />
          </button>
          <button onClick={() => go('building')}>
            Building <ArrowUpRight />
          </button>
          <button onClick={() => go('contact')}>
            Contact <ArrowUpRight />
          </button>
        </div>
      )}

      <section id="top" className="hero section-pad">
        <div className="hero-copy reveal">
          <div className="eyebrow eyebrow-live">
            <span className="status-dot" /> Chief Engineer · Co-Founder ·
            Builder
          </div>
          <h1 className="hero-heading">
            {heroLineOne.map((w, i) => (
              <span className="word" key={w} style={{ animationDelay: `${i * 70}ms` }}>
                {w}
                {i < heroLineOne.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
            <br />
            <em>
              {heroLineTwo.map((w, i) => (
                <span className="word" key={w} style={{ animationDelay: `${220 + i * 70}ms` }}>
                  {w}
                  {i < heroLineTwo.length - 1 ? '\u00A0' : ''}
                </span>
              ))}
            </em>
          </h1>
          <p>
            Software engineer, product builder and Chief Engineer & Co-Founder
            at Lyopard Tech Solutions. Building digital products, systems and
            infrastructure from Nigeria.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => go('work')}>
              Explore my work <ArrowDown size={17} />
            </button>
            <button className="text-btn" onClick={() => go('contact')}>
              Let’s talk <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
        <div
          className="hero-portrait"
          onMouseEnter={() => setActive('VIEW')}
          onMouseLeave={() => setActive('')}
        >
          <div className="portrait-frame">
            <div className="frame-photo-wrap">
              <img className="frame-photo" src="https://unavatar.io/x/chankuzy" alt="Khalifa Muhammad" />
            </div>
            <div className="frame-vignette" />
            <span className="frame-corner tl" />
            <span className="frame-corner tr" />
            <span className="frame-corner bl" />
            <span className="frame-corner br" />
            <span className="frame-slate">KM / 01</span>
            <div className="frame-lower">
              <span className="frame-eyebrow">Currently building</span>
              <strong>→ Anaija</strong>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span className="bob">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </span>
        </div>
      </section>

      <section id="about" className="statement section-pad">
        <p className="kicker">A LITTLE ABOUT THE PERSON BEHIND THE PIXELS</p>
        <h2>
          I like turning <span>“this should exist”</span> into “here it is.”
        </h2>
        <div className="about-grid">
          <div className="about-photo">
            <img className="about-photo-image" src="https://unavatar.io/x/chankuzy" alt="Khalifa Muhammad" />
            <span>PROFILE</span>
          </div>
          <div className="about-copy">
            <p className="large">
              I’m Khalifa — a software engineer, product builder and co-founder
              based in Nigeria.
            </p>
            <p>
              I enjoy finding problems hiding in plain sight and building
              systems around them. Sometimes that’s an app. Sometimes it’s
              infrastructure. Sometimes it’s an idea that probably shouldn’t
              work — until it does.
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="work section-pad">
        <div className="section-head">
          <div>
            <p className="kicker">SELECTED WORK</p>
            <h2>
              Things worth
              <br />
              <em>building.</em>
            </h2>
          </div>
          <span className="section-count">04 PROJECTS</span>
        </div>
        <div className="projects" style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} onHover={setActive} />
          ))}
        </div>
      </section>

      <section className="systems section-pad">
        <div className="systems-copy">
          <p className="kicker">THE ENGINEERING BRAIN</p>
          <h2>
            I don’t just build interfaces.
            <br />
            <em>I build systems.</em>
          </h2>
          <p>
            Technology is only useful when it survives contact with real people,
            real constraints and real life.
          </p>
        </div>
        <div className="system-map">
          <div className="system-line" />
          <div className="system-node n1">IDEA</div>
          <div className="system-node n2">ARCHITECTURE</div>
          <div className="system-node n3">PRODUCT</div>
          <div className="system-node n4">INFRASTRUCTURE</div>
          <div className="system-node n5">PEOPLE</div>
        </div>
        <div className="skills">
          {skills.map(([name, Icon]) => (
            <div className="skill" key={name as string}>
              <Icon size={17} />
              <span>{name as string}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="building" className="building section-pad">
        <div className="section-head">
          <div>
            <p className="kicker">RIGHT NOW</p>
            <h2>
              Building <em>now.</em>
            </h2>
          </div>
          <span className="section-count">KEEP SCROLLING →</span>
        </div>
        <div className="building-track">
          {[
            ['ANAIJA', 'Digital campus'],
            ['SKOOLAREA', 'School operating system'],
            ['LYOPARD', 'Technology & infrastructure'],
            ['NEXT', 'Something I’m not ready to talk about yet.'],
          ].map(([a, b], i) => (
            <Reveal key={a} delay={i * 90}>
              <div className={`build-card b${i}`}>
                <span>0{i + 1}</span>
                <h3>{a}</h3>
                <p>{b}</p>
                <ArrowUpRight />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="personality section-pad">
        <p className="kicker">OUTSIDE THE SERIOUS STUFF</p>
        <h2>
          There’s a human
          <br />
          <em>in here too.</em>
        </h2>
        <div className="personality-grid">
          <Reveal delay={0}>
            <div className="person-card big">
              <Sparkles />
              <span>Currently building</span>
              <strong>Anaija</strong>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <div className="person-card">
              <Cpu />
              <span>Currently exploring</span>
              <strong>Digital infrastructure</strong>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="person-card">
              <MapPin />
              <span>Based in</span>
              <strong>Nigeria</strong>
            </div>
          </Reveal>
          <Reveal delay={210}>
            <div className="person-card">
              <Database />
              <span>Favourite rabbit hole</span>
              <strong>Systems</strong>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <div className="person-card joke">
              <span>Last thing I broke</span>
              <strong>Production 😭</strong>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-inner">
          <p className="kicker">A SMALL MANIFESTO</p>
          <h2>
            Africa doesn’t need more
            <br />
            <span>copies of Silicon Valley.</span>
          </h2>
          <div className="manifesto-rule" />
          <h3>
            It needs systems that
            <br />
            <em>make sense here.</em>
          </h3>
          <p>That’s the kind of technology I want to build.</p>
        </div>
      </section>

      <section className="lyopard section-pad">
        <p className="kicker">SOME OF MY WORK HAS A HOME.</p>
        <div className="lyopard-word">LYOPARD</div>
        <p className="lyopard-sub">Technology. Infrastructure. Systems.</p>
        <div className="lyopard-grid">
          {[
            'Software',
            'Digital Systems',
            'Infrastructure',
            'Security',
            'Energy',
            'Products',
          ].map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              {x}
            </div>
          ))}
        </div>
        <a href='https://lyopard.vercel.app' target='_blank' className="outline-btn">
          Visit Lyopard <ExternalLink size={16} />
        </a>
      </section>

      <section id="contact" className="contact section-pad">
        <p className="kicker">LET’S BUILD SOMETHING</p>
        <h2>
          Have something
          <br />
          <em>worth building?</em>
        </h2>
        <button className="contact-btn">
          Let’s make it real <ArrowUpRight />
        </button>
        <div className="contact-links">
          <a target='_blank' href="mailto:mchankuxieey@gmail.com">
            <Mail size={16} /> Email
          </a>
          <a target='_blank' href="https://www.linkedin.com/in/muhammad-ibrahim-1881972a5/">
            <FaLinkedin size={16} /> LinkedIn
          </a>
          <a target='_blank' href="https://github.com/chankuzy">
            <FaGithub size={16} /> GitHub
          </a>
          <a target='_blank' href="https://x.com/chankuzy">
            <BsTwitterX size={16} /> X / Twitter
          </a>
        </div>
      </section>

      <footer>
        <div>
          <strong>Khalifa Muhammad</strong>
          <span>Chief Engineer · Co-Founder · Builder</span>
        </div>
        <div>
          <span>Built somewhere in Nigeria.</span>
          <span className="footer-status">
            <i /> Building
          </span>
        </div>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

export default App;