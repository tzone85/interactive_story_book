import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import Logo from './Logo';

interface SiteNavProps {
  onSearch: () => void;
}

const LINKS = [
  { href: '#stories', label: 'Stories' },
  { href: '#readers', label: 'Readers' },
  { href: '#how', label: 'How It Works' },
];

const SiteNav = ({ onSearch }: SiteNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-white sm:px-8 lg:px-12"
      >
        <a href="#top" aria-label="Story Express home" className="drop-shadow-[0_1px_8px_rgba(7,12,24,0.6)]">
          <Logo />
        </a>

        <ul className="hidden items-center gap-9 drop-shadow-[0_1px_8px_rgba(7,12,24,0.6)] md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSearch}
            aria-label="Search stories"
            className="rounded-full p-2.5 text-white transition hover:bg-white/15"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <a
            href="#readers"
            className="hidden rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-navy sm:inline-block"
          >
            Pick a Reader
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="rounded-full p-2.5 text-white transition hover:bg-white/15 md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="glass-dark mx-4 animate-pop-in rounded-2xl p-5 md:hidden">
          <ul className="space-y-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#readers"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-white px-5 py-3 text-center text-sm font-bold text-black"
          >
            Pick a Reader
          </a>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
