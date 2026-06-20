import { useEffect, useRef } from 'react';

const CERTS = [
  {
    title: 'Technology Virtual Job Simulation',
    issuer: 'Deloitte via Forage',
    date: 'October 2025',
    credentialUrl: '/DeloiteCertificate.pdf',
    description:
      'Completed a virtual job simulation covering technology consulting, software development workflows, and enterprise-level problem solving — as part of Deloitte\'s Tech track on Forage.',
    icon: '🏢',
    color: '#86C232',
  },
];

export default function Certifications() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications">
      <div className="section-fade" ref={ref}>
        <span className="section-label">// credentials</span>
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">
          Verifiable proof of skills earned beyond the classroom.
        </p>

        <div className="certs-list">
          {CERTS.map(cert => (
            <div className="cert-card" key={cert.title}>
              <div className="cert-card__left">
                <div className="cert-card__icon">{cert.icon}</div>
                <div className="cert-card__line" />
              </div>

              <div className="cert-card__body">
                <div className="cert-card__meta">
                  <span className="cert-card__issuer">{cert.issuer}</span>
                  <span className="cert-card__date">
                    <CalendarIcon /> {cert.date}
                  </span>
                </div>

                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__desc">{cert.description}</p>

                <a
                  href={cert.credentialUrl}
                  className="cert-card__link"
                  download
                >
                  Download Certificate <DownloadIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .certs-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .cert-card {
          display: flex;
          gap: 24px;
          padding: 32px 0;
        }

        .cert-card__left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }

        .cert-card__icon {
          width: 48px;
          height: 48px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
          transition: border-color var(--transition);
        }

        .cert-card:hover .cert-card__icon {
          border-color: var(--accent);
          box-shadow: 0 0 12px var(--accent-glow);
        }

        .cert-card__line {
          width: 1px;
          flex: 1;
          background: var(--border);
          min-height: 20px;
        }

        .cert-card__body {
          flex: 1;
          padding-bottom: 12px;
        }

        .cert-card__meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .cert-card__issuer {
          font-family: var(--font-code);
          font-size: 0.8rem;
          color: var(--accent);
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .cert-card__date {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-code);
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .cert-card__title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .cert-card__desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 16px;
          max-width: 640px;
        }

        .cert-card__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent);
          border: 1px solid var(--border);
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          transition: all var(--transition);
        }

        .cert-card__link:hover {
          background: var(--accent-glow);
          border-color: var(--accent);
        }

        @media (max-width: 480px) {
          .cert-card {
            gap: 16px;
          }
          .cert-card__left {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
