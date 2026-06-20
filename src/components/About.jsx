import { useState, useEffect, useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about">
      <div className="about section-fade" ref={ref}>
        <div className="about__text">
          <span className="section-label">// about me</span>
          <h2 className="section-title">Who I Am</h2>

          <p className="about__bio">
            I'm a final-year BCA student at{' '}
            <strong>Mahatma Gandhi Kashi Vidyapith</strong>, Varanasi — graduating in 2026 and
            actively seeking full-stack / MERN developer roles. I build web apps that are fast,
            maintainable, and actually solve problems.
          </p>

          <p className="about__bio">
            My stack lives in the MERN world: React on the frontend, Node.js + Express on
            the backend, MongoDB for data. I care deeply about clean code, intuitive UX,
            and shipping things that work in production — not just on localhost.
          </p>

          <p className="about__fun">
            <span className="about__fun-icon">⚡</span>
            From the city of ghats — I code as persistently as the Ganga flows.
          </p>

          <div className="about__chips">
            {[
              'Open to Remote',
              'Open to Relocation',
              'Full-Time Ready',
              'MERN Specialist',
            ].map(tag => (
              <span key={tag} className="about__chip">{tag}</span>
            ))}
          </div>
        </div>

        {/* Profile photo */}
        <div className="about__photo-wrap">
          <div className="about__photo">
            {!imgErr ? (
              <img
                src="/Ankit.jpeg"
                alt="Ankit's profile"
                onError={() => setImgErr(true)}
              />
            ) : (
              <div className="about__photo-inner">
                <span className="about__photo-initials">A</span>
                <span className="about__photo-hint">/Ankit.jpeg</span>
              </div>
            )}
          </div>
          <div className="about__photo-ring" aria-hidden="true" />
        </div>
      </div>

      <style>{`
        .about {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 80px;
          align-items: center;
        }

        .about__bio {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 20px;
        }

        .about__bio strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .about__fun {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-code);
          font-size: 0.9rem;
          color: var(--accent-light);
          background: var(--accent-glow);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          padding: 14px 18px;
          border-radius: var(--radius-sm);
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .about__fun-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .about__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .about__chip {
          font-family: var(--font-code);
          font-size: 0.78rem;
          color: var(--accent);
          background: var(--accent-glow);
          border: 1px solid var(--border);
          padding: 6px 14px;
          border-radius: 100px;
          letter-spacing: 0.03em;
        }

        .about__photo-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about__photo {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          overflow: hidden;
          box-shadow: 0 0 40px var(--accent-glow);
        }

        .about__photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .about__photo-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .about__photo-initials {
          font-family: var(--font-display);
          font-size: 4rem;
          font-weight: 700;
          color: var(--accent);
          line-height: 1;
        }

        .about__photo-hint {
          font-family: var(--font-code);
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .about__photo-ring {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          border: 1px dashed var(--border-hover);
          animation: spin 20s linear infinite;
          pointer-events: none;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .about {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .about__photo-wrap {
            order: -1;
          }
          .about__photo {
            width: 160px;
            height: 160px;
          }
          .about__photo-ring {
            width: 196px;
            height: 196px;
          }
          .about__photo-initials {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
