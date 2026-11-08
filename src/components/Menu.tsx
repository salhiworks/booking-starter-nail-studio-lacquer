import { useEffect, useState } from 'react';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationLabel, durationSpoken, shelve, shortPrice } from '../lib/services';
import type { Shelf } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';

interface MenuProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

/**
 * The treatment menu, straight from the engine: every name, length and price is
 * the one the booking uses. Services sit on shelves (Manicure, Builder gel, Nail
 * art, Pedicure, Care) found from their names; an index beside the list (a row
 * of chips on phones) jumps between them.
 */
export function Menu({ values, services, business, onRetry, onBook }: MenuProps) {
  const locale = business?.locale ?? 'en-US';
  const shelves = services.status === 'ready' ? shelve(services.data) : [];
  const active = useActiveShelf(shelves.map((s) => s.id).join(','));

  return (
    <section id="menu" className="section menu" aria-labelledby="menu-title">
      <div className="page">
        <header className="section-head menu__head">
          <p className="index" aria-hidden="true">
            01
          </p>
          <h2 id="menu-title">
            <Emphasis text={values['menu.title']} />
          </h2>
          {values['menu.intro'] && <p className="section-intro">{values['menu.intro']}</p>}
        </header>

        {services.status === 'loading' && (
          <div className="menu__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading the menu…
            </p>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton skeleton--service" aria-hidden="true" />
            ))}
          </div>
        )}

        {services.status === 'error' &&
          (services.error.code === 'NOT_CONFIGURED' ? (
            <p className="quiet-state">Our treatments and prices will be listed here soon.</p>
          ) : (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn't load the menu just now.</p>
            </Notice>
          ))}

        {services.status === 'ready' && shelves.length === 0 && (
          <p className="quiet-state">Our treatments will be listed here soon — call or email the studio in the meantime.</p>
        )}

        {shelves.length > 0 && (
          <div className="menu__layout">
            {shelves.length > 1 && (
              <nav className="shelf-index" aria-label="Treatment types">
                <ul role="list">
                  {shelves.map((shelf) => (
                    <li key={shelf.id}>
                      <a href={`#shelf-${shelf.id}`} aria-current={active === shelf.id ? 'true' : undefined} data-shelf={shelf.id}>
                        <span className="drop" aria-hidden="true" />
                        <span className="shelf-index__label">{shelf.label}</span>
                        <span className="shelf-index__count" aria-hidden="true">
                          {shelf.services.length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="menu__shelves">
              {shelves.map((shelf) => (
                <ShelfBlock key={shelf.id} shelf={shelf} note={shelf.note ? values[shelf.note] : ''} locale={locale} onBook={onBook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ShelfBlock({ shelf, note, locale, onBook }: { shelf: Shelf; note: string; locale: string; onBook: StartBooking }) {
  return (
    <section className="shelf" id={`shelf-${shelf.id}`} aria-labelledby={`shelf-${shelf.id}-title`} data-shelf={shelf.id}>
      <header className="shelf__head">
        <h3 id={`shelf-${shelf.id}-title`} className="shelf__title">
          <span className="drop" aria-hidden="true" />
          {shelf.label}
        </h3>
        {note && <p className="shelf__note">{note}</p>}
      </header>
      <ul className="services" role="list">
        {shelf.services.map((service) => (
          <li className="service" key={service.id}>
            {service.image && (
              <img
                className="service__thumb"
                src={service.image.url}
                alt={service.image.alt}
                width={service.image.width ?? 160}
                height={service.image.height ?? 160}
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="service__main">
              <h4 className="service__name">{service.name}</h4>
              {service.description && <p className="service__desc">{service.description}</p>}
            </div>
            <p className="service__meta">
              <span className="service__time">
                <span aria-hidden="true">{durationLabel(service.durationMinutes)}</span>
                <span className="sr-only">{durationSpoken(service.durationMinutes)}</span>
              </span>
              <span className="service__price">{shortPrice(service, locale)}</span>
            </p>
            <a className="service__book" href="#book" onClick={bookLink(onBook, service.id)}>
              Book<span className="sr-only"> {service.name}</span>
              <span className="service__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The shelf nearest the top of the screen, for the index's current mark. */
function useActiveShelf(key: string): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!key || !('IntersectionObserver' in window)) return;
    const blocks = [...document.querySelectorAll<HTMLElement>('.shelf[data-shelf]')];
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.shelf!;
          if (entry.isIntersecting) visible.set(id, entry.boundingClientRect.top);
          else visible.delete(id);
        }
        const first = blocks.find((b) => visible.has(b.dataset.shelf!));
        if (first) setActive(first.dataset.shelf!);
      },
      { rootMargin: '-20% 0px -55% 0px' },
    );
    blocks.forEach((b) => observer.observe(b));
    return () => observer.disconnect();
  }, [key]);
  return active;
}
