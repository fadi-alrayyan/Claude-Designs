import { Link } from 'react-router-dom';
import { company } from '../config/launch';
import { Logo } from './Logo';
import { StoreBadges } from './StoreBadges';

const columns = [
  { title: 'Product', links: [['App', '/app'], ['Portal', '/portal'], ['Pricing', '/pricing'], ['Portal login', '/portal/login']] },
  { title: 'Company', links: [['About', '/company'], ['Contact', '/company#contact']] },
  { title: 'Legal', links: [['Terms & Conditions', '/terms'], ['Privacy Policy', '/privacy']] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo tone="paper" />
          <p className="display mt-8 max-w-xs text-[1.9rem] text-paper">Keep your number. Add AI.</p>
          <div className="mt-8">
            <StoreBadges tone="paper" />
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-medium text-paper/50">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="text-[15px] text-paper/85 transition-colors hover:text-signal">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-7 text-sm text-paper/55 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} {company.legalName}
            </p>
            <address className="mt-1 not-italic">{company.addressLines.join(', ')}</address>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {company.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
