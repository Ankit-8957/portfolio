import { useEffect, useRef } from 'react';

const SKILLS = [
  {
    category: 'Frontend',
    icon: '🖥️',
    items: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 88 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: [
      { name: 'Node.js', level: 82 },
      { name: 'Express.js', level: 80 },
      { name: 'REST APIs', level: 85 },
      { name: 'JWT Auth', level: 78 },
    ],
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: [
      { name: 'MongoDB', level: 80 },
    ],
  },
  {
    category: 'Tools',
    icon: '🛠️',
    items: [
      { name: 'Git', level: 88 },
      { name: 'GitHub', level: 88 },
      { name: 'VS Code', level: 95 },
      { name: 'Postman', level: 82 },
    ],
  },
];

function SkillCard({ category, icon, items, delay }) {
  return (
    <div className="skill-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="skill-card__header">
        <span className="skill-card__icon">{icon}</span>
        <span className="skill-card__label">{category}</span>
      </div>
      <div className="skill-card__items">
        {items.map(({ name, level }) => (
          <div key={name} className="skill-item">
            <div className="skill-item__top">
              <span className="skill-item__name">{name}</span>
              <span className="skill-item__pct">{level}%</span>
            </div>
            <div className="skill-item__bar">
              <div
                className="skill-item__fill"
                style={{ '--target': `${level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add('visible');
          /* Trigger bar animations after fade-in */
          setTimeout(() => {
            ref.current?.querySelectorAll('.skill-item__fill').forEach(el => {
              el.style.width = el.style.getPropertyValue('--target') || el.parentElement?.dataset.target;
            });
          }, 300);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills">
      <div className="section-fade" ref={ref}>
        <span className="section-label">// what I work with</span>
        <h2 className="section-title">Skills & Stack</h2>
        <p className="section-subtitle">
          The tools I reach for every day — from writing components to deploying APIs.
        </p>

        <div className="skills-grid">
          {SKILLS.map((group, i) => (
            <SkillCard key={group.category} {...group} delay={i * 80} />
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .skill-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
        }

        .skill-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-accent);
          transform: translateY(-3px);
        }

        .skill-card__header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .skill-card__icon {
          font-size: 1.4rem;
        }

        .skill-card__label {
          font-family: var(--font-code);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--accent);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .skill-card__items {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .skill-item__top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .skill-item__name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .skill-item__pct {
          font-family: var(--font-code);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .skill-item__bar {
          height: 4px;
          background: var(--bg-secondary);
          border-radius: 2px;
          overflow: hidden;
        }

        .skill-item__fill {
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, var(--accent), var(--accent-light));
          border-radius: 2px;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Trigger bars when parent becomes visible */
        .visible .skill-item__fill {
          width: var(--target);
        }
      `}</style>
    </section>
  );
}
