import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  /* Track scroll for navbar background + active section */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <button
          className="navbar__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Go to top"
        >
          &lt; Ankit /&gt;
        </button>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={`navbar__link${activeSection === link.id ? ' navbar__link--active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + hamburger */}
        <div className="navbar__right">
          <button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}>
        {navLinks.map(link => (
          <button
            key={link.id}
            className={`navbar__mobile-link${activeSection === link.id ? ' active' : ''}`}
            onClick={() => scrollTo(link.id)}
          >
            {link.label}
          </button>
        ))}
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 0 24px;
          transition: background var(--transition), box-shadow var(--transition);
        }

        .navbar--scrolled {
          background: var(--bg-secondary);
          box-shadow: 0 1px 0 var(--border), var(--shadow);
          backdrop-filter: blur(12px);
        }

        .navbar__inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        .navbar__logo {
          font-family: var(--font-code);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--accent);
          letter-spacing: -0.02em;
          cursor: pointer;
          transition: color var(--transition), text-shadow var(--transition);
        }

        .navbar__logo:hover {
          text-shadow: 0 0 12px var(--accent-glow);
        }

        .navbar__links {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .navbar__link {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          transition: color var(--transition), background var(--transition);
          cursor: pointer;
        }

        .navbar__link:hover {
          color: var(--text-primary);
          background: var(--bg-card);
        }

        .navbar__link--active {
          color: var(--accent);
          background: var(--accent-glow);
        }

        .navbar__right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .navbar__theme-btn {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          transition: background var(--transition), border-color var(--transition);
          cursor: pointer;
        }

        .navbar__theme-btn:hover {
          border-color: var(--accent);
          background: var(--accent-glow);
        }

        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          cursor: pointer;
        }

        .navbar__hamburger span {
          display: block;
          width: 18px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        .navbar__hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .navbar__hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .navbar__hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .navbar__mobile {
          display: none;
          flex-direction: column;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
        }

        .navbar__mobile--open {
          max-height: 300px;
        }

        .navbar__mobile-link {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 16px 24px;
          text-align: left;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          transition: color var(--transition), background var(--transition);
        }

        .navbar__mobile-link:hover,
        .navbar__mobile-link.active {
          color: var(--accent);
          background: var(--accent-glow);
        }

        @media (max-width: 640px) {
          .navbar__links {
            display: none;
          }
          .navbar__hamburger {
            display: flex;
          }
          .navbar__mobile {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}
