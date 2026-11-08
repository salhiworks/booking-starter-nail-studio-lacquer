import { useEffect, useRef, useState } from 'react';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { NAV } from '../lib/nav';
import { Wordmark } from './Wordmark';


/**
 * Sticky header. Over the lacquer hero it is transparent with light type; once
 * the hero has scrolled away it becomes a bone bar with dark type. On phones the
 * sections fold into a menu; the Book button always stays in reach.
 */
export function Header({ values, onBook }: { values: SiteValues; onBook: StartBooking }) {
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), { rootMargin: '-72px 0px 0px 0px' });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Esc closes the menu and returns focus to its button.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header" data-over-hero={overHero && !open ? '' : undefined} data-open={open ? '' : undefined}>
      <div className="page site-header__inner">
        <a className="site-header__home" href="#top" onClick={() => setOpen(false)}>
          <Wordmark values={values} />
        </a>
        <nav className="site-nav" aria-label="Sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="site-header__actions">
          <a className="button button--small site-header__book" href="#book" onClick={bookLink(onBook)}>
            <span>
              Book<span className="site-header__wide"> now</span>
            </span>
          </a>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-toggle__bars" aria-hidden="true" />
            <span className="sr-only">{open ? 'Close the menu' : 'Open the menu'}</span>
          </button>
        </div>
      </div>
      <nav id="site-menu" className="site-menu" aria-label="Sections (menu)" hidden={!open}>
        <ul role="list" className="page">
          {NAV.map((item, i) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                <span className="site-menu__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
