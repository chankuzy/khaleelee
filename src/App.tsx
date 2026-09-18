import { useEffect, useRef, useState } from 'react';
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

// Words for the staggered hero headline reveal. Kept as data so the
// animation delay math lives in one place instead of scattered inline.
const heroLineOne = ['I', 'build', 'things'];
const heroLineTwo = ['people', 'can', 'use.'];

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

// Purely decorative — currentColor / transparent only, so it always
// matches whatever palette the surrounding page defines. Nothing here
// introduces a new color.
function HeroDecor() {
  return (
    <div className="hero-decor" aria-hidden="true">
      <span className="deco-shape deco-ring" />
      <span className="deco-shape deco-square" />
      <span className="deco-shape deco-dot" />
      <span className="deco-mark deco-mark-1">✦</span>
      <span className="deco-mark deco-mark-2">⌁</span>
      <span className="deco-mark deco-mark-3">◆</span>
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
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes driftX {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(10px) rotate(8deg); }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes spinSlowReverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes wordRise {
          from { opacity: 0; transform: translateY(22px) rotate(-2deg); }
          to { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-4deg); }
          75% { transform: rotate(4deg); }
        }
        @keyframes bobArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(7px); }
        }
        @keyframes wobbleCaption {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          33% { transform: rotate(-2deg) translateY(-3px); }
          66% { transform: rotate(2deg) translateY(2px); }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.035); opacity: 0.85; }
        }
        @keyframes dotPop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }

        .hero { position: relative; overflow: hidden; }

        .hero-decor {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .deco-shape {
          position: absolute;
          border: 1.5px solid currentColor;
          opacity: 0.16;
        }
        .deco-ring {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          top: 10%;
          left: 5%;
          animation: floatY 7s ease-in-out infinite;
        }
        .deco-square {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          top: 62%;
          left: 9%;
          animation: driftX 9s ease-in-out infinite, spinSlow 22s linear infinite;
        }
        .deco-dot {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          top: 22%;
          right: 9%;
          animation: floatY 5.5s ease-in-out infinite reverse;
        }
        .deco-mark {
          position: absolute;
          font-size: 20px;
          opacity: 0.35;
          line-height: 1;
        }
        .deco-mark-1 {
          top: 16%;
          right: 20%;
          animation: floatY 5s ease-in-out infinite;
        }
        .deco-mark-2 {
          bottom: 24%;
          left: 7%;
          animation: floatY 6.5s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        .deco-mark-3 {
          top: 68%;
          right: 12%;
          animation: driftX 6s ease-in-out infinite;
          animation-delay: 0.4s;
        }

        .hero-heading .word {
          display: inline-block;
          opacity: 0;
          animation: wordRise 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .eyebrow-playful { cursor: default; }
        .eyebrow-playful:hover { animation: wiggle 0.5s ease; }
        .eyebrow-playful .status-dot { animation: dotPop 1.6s ease-in-out infinite; }

        .hero-scroll .bob {
          display: inline-flex;
          animation: bobArrow 1.4s ease-in-out infinite;
        }

        .hero-actions .primary-btn,
        .hero-actions .text-btn {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hero-actions .primary-btn:hover,
        .hero-actions .text-btn:hover {
          transform: scale(1.06) rotate(-1deg);
        }
        .hero-actions .primary-btn:active,
        .hero-actions .text-btn:active {
          transform: scale(0.96);
        }

        .portrait-ring-spin {
          animation: spinSlow 20s linear infinite, ringPulse 4s ease-in-out infinite;
        }
        .portrait-image-float {
          animation: floatY 5s ease-in-out infinite;
        }
        .portrait-orbit {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .orbit-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.55;
          transform-origin: -50px center;
        }
        .orbit-dot.od-1 { animation: spinSlow 9s linear infinite; }
        .orbit-dot.od-2 {
          width: 5px;
          height: 5px;
          opacity: 0.35;
          transform-origin: -78px center;
          animation: spinSlowReverse 13s linear infinite;
        }
        .orbit-dot.od-3 {
          width: 6px;
          height: 6px;
          opacity: 0.3;
          transform-origin: -104px center;
          animation: spinSlow 17s linear infinite;
        }
        .portrait-caption-wobble {
          animation: wobbleCaption 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero *,
          .hero *::before,
          .hero *::after {
            animation: none !important;
            transition: none !important;
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
        <HeroDecor />
        <div className="hero-copy reveal">
          <div
            className="eyebrow eyebrow-playful"
            onMouseEnter={() => setActive('HI')}
            onMouseLeave={() => setActive('')}
          >
            <span className="status-dot" /> Chief Engineer · Co-Founder ·
            Builder
          </div>
          <h1 className="hero-heading">
            {heroLineOne.map((w, i) => (
              <span
                className="word"
                key={w}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {w}
                {i < heroLineOne.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
            <br />
            <em>
              {heroLineTwo.map((w, i) => (
                <span
                  className="word"
                  key={w}
                  style={{ animationDelay: `${220 + i * 70}ms` }}
                >
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
          onMouseEnter={() => setActive('HELLO')}
          onMouseLeave={() => setActive('')}
        >
          <div className="portrait-ring portrait-ring-spin" />
          <div className="portrait-orbit">
            <span className="orbit-dot od-1" />
            <span className="orbit-dot od-2" />
            <span className="orbit-dot od-3" />
          </div>
          <img
            className="portrait-image portrait-image-float"
            src="https://unavatar.io/x/chankuzy"
            alt="Khalifa Muhammad"
          />
          <span className="portrait-label">
            KHALIFA
            <br />
            MUHAMMAD
          </span>
          <div className="portrait-caption portrait-caption-wobble">
            <span>Currently building</span>
            <strong>→ Anaija</strong>
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
        <div className="projects">
          {projects.map((p) => (
            <article
              className="project"
              key={p.title}
              onMouseEnter={() => setActive('VIEW')}
              onMouseLeave={() => setActive('')}
            >
              <ProjectVisual icon={p.icon} tone={p.tone} />
              <div className="project-meta">
                <span>
                  {p.number} / {p.type}
                </span>
                <ArrowUpRight size={18} />
              </div>
              <h3>{p.title}</h3>
              <div className="project-sub">{p.subtitle}</div>
              <p>{p.description}</p>
              <button>
                View project <ArrowUpRight size={15} />
              </button>
            </article>
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
            <div className={`build-card b${i}`} key={a}>
              <span>0{i + 1}</span>
              <h3>{a}</h3>
              <p>{b}</p>
              <ArrowUpRight />
            </div>
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
          <div className="person-card big">
            <Sparkles />
            <span>Currently building</span>
            <strong>Anaija</strong>
          </div>
          <div className="person-card">
            <Cpu />
            <span>Currently exploring</span>
            <strong>Digital infrastructure</strong>
          </div>
          <div className="person-card">
            <MapPin />
            <span>Based in</span>
            <strong>Nigeria</strong>
          </div>
          <div className="person-card">
            <Database />
            <span>Favourite rabbit hole</span>
            <strong>Systems</strong>
          </div>
          <div className="person-card joke">
            <span>Last thing I broke</span>
            <strong>Production 😭</strong>
          </div>
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
        <button className="outline-btn">
          Visit Lyopard <ExternalLink size={16} />
        </button>
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
          <a href="mailto:hello@lyopard.com">
            <Mail size={16} /> Email
          </a>
          <a href="#">
            <FaLinkedin size={16} /> LinkedIn
          </a>
          <a href="#">
            <FaGithub size={16} /> GitHub
          </a>
          <a href="#">
            <Globe2 size={16} /> X / Twitter
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