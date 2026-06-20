import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);

  /* ── Dot-grid particle animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* Create ~60 floating dots */
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Draw connecting lines between close particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* Draw dots */
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      <div className="hero__content">
        {/* Code-style greeting */}
        <p className="hero__greeting">
          <span className="hero__prompt">~/portfolio</span>
          <span className="hero__cmd"> $ whoami</span>
        </p>

        <h1 className="hero__name">Ankit</h1>

        <p className="hero__tagline">
          Full-Stack Developer&nbsp;|&nbsp;MERN Stack&nbsp;|&nbsp;Building things that actually work
          <span className="hero__cursor" aria-hidden="true">_</span>
        </p>

        <p className="hero__sub">
          BCA 2026 · Varanasi, India · Open to full-stack roles
        </p>

        <div className="hero__ctas">
          <button className="btn btn--primary" onClick={scrollToProjects}>
            View Projects
          </button>
          <a
            href="/Resume.pdf"
            className="btn btn--outline"
            download="Ankit_Resume.pdf"
            aria-label="Download Ankit's resume"
          >
            Download Resume
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-text">scroll</span>
          <div className="hero__scroll-bar" />
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 24px;
          max-width: 100%;
          overflow: hidden;
        }

        .hero__canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .hero__content {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          padding-top: 80px;
        }

        .hero__greeting {
          font-family: var(--font-code);
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .hero__prompt {
          color: var(--accent);
        }

        .hero__cmd {
          color: var(--text-secondary);
        }

        .hero__name {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 10vw, 7rem);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 0.95;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero__tagline {
          font-family: var(--font-display);
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 16px;
          max-width: 620px;
          line-height: 1.4;
        }

        .hero__cursor {
          display: inline-block;
          color: var(--accent);
          font-weight: 400;
          animation: blink 1.1s step-end infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero__sub {
          font-family: var(--font-code);
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 40px;
          letter-spacing: 0.04em;
        }

        .hero__ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: var(--radius-sm);
          letter-spacing: 0.01em;
          transition: all var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .btn--primary {
          background: var(--accent);
          color: #fff;
          border: 2px solid var(--accent);
        }

        .btn--primary:hover {
          background: var(--accent-light);
          border-color: var(--accent-light);
          box-shadow: 0 0 24px var(--accent-glow);
          transform: translateY(-2px);
        }

        .btn--outline {
          background: transparent;
          color: var(--text-primary);
          border: 2px solid var(--border-hover);
        }

        .btn--outline:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-glow);
          transform: translateY(-2px);
        }

        .hero__scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0.5;
        }

        .hero__scroll-text {
          font-family: var(--font-code);
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .hero__scroll-bar {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollDrop 2s ease infinite;
        }

        @keyframes scrollDrop {
          0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
        }

        @media (max-width: 640px) {
          .hero {
            padding: 0 20px;
          }
          .hero__content {
            padding-top: 100px;
          }
          .hero__ctas {
            flex-direction: column;
          }
          .btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
