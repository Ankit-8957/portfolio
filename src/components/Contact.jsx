import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    /* Frontend-only demo — show success state */
    setSent(true);
  };

  return (
    <section id="contact">
      <div className="section-fade" ref={ref}>
        <span className="section-label">// get in touch</span>
        <h2 className="section-title">Let's Build Something Together</h2>
        <p className="section-subtitle">
          Open to full-time roles, freelance projects, and interesting conversations.
          Based in Varanasi — available remotely or for relocation.
        </p>

        <div className="contact__grid">
          {/* Left: info */}
          <div className="contact__info">
            <div className="contact__links">
              <a href="mailto:ankit@example.com" className="contact__link">
                <span className="contact__link-icon">
                  <EmailIcon />
                </span>
                <div>
                  <span className="contact__link-label">Email</span>
                  <span className="contact__link-val">apandey8957@gmail.com</span>
                </div>
              </a>

              <a
                href="https://github.com/Ankit-8957"
                className="contact__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact__link-icon">
                  <GitHubIcon />
                </span>
                <div>
                  <span className="contact__link-label">GitHub</span>
                  <span className="contact__link-val">https://github.com/Ankit-8957</span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/ankit-pandey-b203592b6"
                className="contact__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact__link-icon">
                  <LinkedInIcon />
                </span>
                <div>
                  <span className="contact__link-label">LinkedIn</span>
                  <span className="contact__link-val">https://www.linkedin.com/in/ankit-pandey-b203592b6</span>
                </div>
              </a>
            </div>

            <div className="contact__location">
              <span className="contact__location-icon">📍</span>
              <div>
                <p className="contact__location-city">Varanasi, Uttar Pradesh, India</p>
                <p className="contact__location-note">Open to remote & relocation</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact__form-wrap">
            {sent ? (
              <div className="contact__success">
                <span className="contact__success-icon">✓</span>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  className="btn btn--outline"
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input form-textarea"
                    placeholder="What's on your mind?"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn btn--primary contact__submit">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact__grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: start;
        }

        .contact__links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .contact__link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          transition: all var(--transition);
          text-decoration: none;
        }

        .contact__link:hover {
          border-color: var(--accent);
          background: var(--accent-glow);
          transform: translateX(4px);
        }

        .contact__link-icon {
          width: 40px;
          height: 40px;
          background: var(--bg-secondary);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
          transition: background var(--transition);
        }

        .contact__link:hover .contact__link-icon {
          background: var(--accent);
          color: #fff;
        }

        .contact__link-label {
          display: block;
          font-family: var(--font-code);
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }

        .contact__link-val {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .contact__location {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
        }

        .contact__location-icon {
          font-size: 1.2rem;
          margin-top: 2px;
        }

        .contact__location-city {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
          margin-bottom: 4px;
        }

        .contact__location-note {
          font-family: var(--font-code);
          font-size: 0.78rem;
          color: var(--accent-light);
        }

        /* Form */
        .contact__form-wrap {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px;
        }

        .contact__form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-family: var(--font-code);
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .form-input {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-primary);
          outline: none;
          transition: border-color var(--transition), box-shadow var(--transition);
          width: 100%;
          resize: vertical;
        }

        .form-input::placeholder {
          color: var(--text-muted);
        }

        .form-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }

        .form-textarea {
          min-height: 120px;
        }

        .form-error {
          font-size: 0.85rem;
          color: #F87171;
          background: rgba(248, 113, 113, 0.08);
          border: 1px solid rgba(248, 113, 113, 0.2);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
        }

        .contact__submit {
          align-self: flex-start;
        }

        /* Success state */
        .contact__success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: 16px 0;
        }

        .contact__success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--accent-glow);
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--accent);
        }

        .contact__success h3 {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .contact__success p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .contact__grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
