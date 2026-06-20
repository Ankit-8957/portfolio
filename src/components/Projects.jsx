import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    id: 'hostelbase',
    name: 'HostelBase',
    tagline: 'Role-based hostel management system',
    description:
      'A full-featured hostel management platform with separate dashboards for admins and students. Secure REST APIs with JWT authentication and role-based access control ensure only authorised users can perform sensitive operations.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
    github: 'https://github.com/Ankit-8957/HostelBase.git',
    demo: 'https://hostel-base.vercel.app/',
    status: null,
    highlight: true,
  },
  {
    id: 'safarnest',
    name: 'Safarnest',
    tagline: 'Travel listing platform',
    description:
      'A travel listing and discovery app built on the MERN stack. Users can browse, post, and review travel destinations with a clean, image-driven interface.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Ankit-8957/SafarNest.git',
    demo: 'https://safarnest-4t29.onrender.com/',
    status: null,
    highlight: false,
  },
  {
    id: 'meragaav',
    name: 'Mera Gaav',
    tagline: 'Village information & community web app',
    description:
      'A community platform for rural areas that surfaces local information, announcements, and civic resources. Built to make village-level data accessible to everyone.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https:/github.com/Ankit-8957/MeraGaav.git',
    demo: 'https://meragaav.onrender.com/',
    status: null,
    highlight: false,
  },
  {
    id: 'yatrabuddy',
    name: 'YatraBuddy',
    tagline: 'Public transport guide app',
    description:
      'A React-powered frontend for navigating public transport routes. The Node.js backend is in active development — stay tuned for the full launch.',
    tech: ['React', 'Node.js (WIP)'],
    github: 'https://github.com/ankit',
    demo: null,
    status: '🚧 In Progress',
    highlight: false,
  },
];

function ProjectCard({ project }) {
  return (
    <div className={`project-card${project.highlight ? ' project-card--featured' : ''}`}>
      {project.highlight && (
        <div className="project-card__featured-badge">Featured</div>
      )}

      <div className="project-card__top">
        <div className="project-card__name-row">
          <span className="project-card__folder">◈</span>
          <h3 className="project-card__name">{project.name}</h3>
          {project.status && (
            <span className="project-card__status">{project.status}</span>
          )}
        </div>
        <p className="project-card__tagline">{project.tagline}</p>
      </div>

      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__tech">
        {project.tech.map(t => (
          <span key={t} className="project-card__chip">{t}</span>
        ))}
      </div>

      <div className="project-card__links">
        <a
          href={project.github}
          className="project-card__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub for ${project.name}`}
        >
          <GitHubIcon /> GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            className="project-card__link project-card__link--demo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${project.name}`}
          >
            <ExternalIcon /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects">
      <div className="section-fade" ref={ref}>
        <span className="section-label">// what I've shipped</span>
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Real projects, real code. Each one solved a problem I actually cared about.
        </p>

        <div className="projects-grid">
          {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .project-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
          overflow: hidden;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: transparent;
          transition: background var(--transition);
        }

        .project-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-accent);
          transform: translateY(-4px);
          background: var(--bg-card-hover);
        }

        .project-card:hover::before {
          background: linear-gradient(90deg, var(--accent), var(--accent-light));
        }

        .project-card--featured {
          border-color: rgba(99, 102, 241, 0.3);
        }

        .project-card__featured-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          font-family: var(--font-code);
          font-size: 0.7rem;
          color: var(--accent);
          background: var(--accent-glow);
          border: 1px solid var(--border);
          padding: 3px 10px;
          border-radius: 100px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .project-card__name-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }

        .project-card__folder {
          font-size: 1.2rem;
          color: var(--accent);
        }

        .project-card__name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .project-card__status {
          font-family: var(--font-code);
          font-size: 0.72rem;
          background: rgba(251, 191, 36, 0.1);
          color: #FBBF24;
          border: 1px solid rgba(251, 191, 36, 0.25);
          padding: 3px 10px;
          border-radius: 100px;
        }

        .project-card__tagline {
          font-family: var(--font-code);
          font-size: 0.8rem;
          color: var(--accent-light);
          letter-spacing: 0.02em;
        }

        .project-card__desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.65;
          flex: 1;
        }

        .project-card__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .project-card__chip {
          font-family: var(--font-code);
          font-size: 0.72rem;
          color: var(--text-muted);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          letter-spacing: 0.02em;
          transition: color var(--transition), border-color var(--transition);
        }

        .project-card:hover .project-card__chip {
          color: var(--accent-light);
          border-color: var(--border-hover);
        }

        .project-card__links {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        .project-card__link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 8px 14px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          transition: all var(--transition);
          cursor: pointer;
        }

        .project-card__link:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-glow);
        }

        .project-card__link--demo {
          color: var(--accent);
          border-color: var(--accent);
          background: var(--accent-glow);
        }

        .project-card__link--demo:hover {
          background: var(--accent);
          color: #fff;
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
