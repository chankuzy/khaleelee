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
          <div className="eyebrow">
            <span className="status-dot" /> Chief Engineer · Co-Founder ·
            Builder
          </div>
          <h1>
            I build things
            <br />
            <em>people can use.</em>
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
          <div className="portrait-ring" />
          <img className="portrait-image" src="https://unavatar.io/x/chankuzy" alt="Khalifa Muhammad" />
          <span className="portrait-label">
            KHALIFA
            <br />
            MUHAMMAD
          </span>
          <div className="portrait-caption">
            <span>Currently building</span>
            <strong>→ Anaija</strong>
          </div>
        </div>
        <div className="hero-scroll">
          SCROLL TO EXPLORE <ArrowDown size={14} />
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
          {projects.map((p, i) => (
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
