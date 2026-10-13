import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useActions } from './Actions';
import { Logo } from './Logo';

const links = [
  { label: 'App', to: '/app' },
  { label: 'Portal', to: '/portal' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Company', to: '/company' },
];

export function Nav() {
  const { openEarlyAccess } = useActions();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled ? 'bg-porcelain/80 shadow-[0_1px_0_rgba(16,32,26,0.08)] backdrop-blur-xl' : ''
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <Link to="/" aria-label="VEXU home" className="rounded-lg">
            <Logo />
          </Link>
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                        isActive ? 'text-ink' : 'text-slate hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-signal"
                            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link to="/portal/login" className="rounded-full px-4 py-2 text-[15px] font-medium text-slate transition-colors hover:text-ink">
              Log in
            </Link>
            <button type="button" onClick={openEarlyAccess} className="btn-primary px-5 py-2.5 text-sm">
              Get early access
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-mr-2 rounded-full p-2.5 text-ink md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-porcelain md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="shell flex h-[4.5rem] items-center justify-between">
              <Link to="/" aria-label="VEXU home">
                <Logo />
              </Link>
              <button type="button" onClick={() => setMenuOpen(false)} className="-mr-2 rounded-full p-2.5" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav aria-label="Mobile" className="shell mt-6 flex-1">
              <ul>
                {links.map((link, index) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index + 0.05 }}
                    className="border-b border-line"
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => `display flex items-center justify-between py-5 text-[2.2rem] ${isActive ? 'text-ink' : 'text-ink/60'}`}
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          {isActive && <span className="h-2.5 w-2.5 rounded-full bg-signal" aria-hidden="true" />}
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="shell grid gap-3 pb-8">
              <button type="button" onClick={() => { setMenuOpen(false); openEarlyAccess(); }} className="btn-primary w-full py-4">
                Get early access
              </button>
              <Link to="/portal/login" className="btn-secondary w-full py-4">
                Log in to Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
