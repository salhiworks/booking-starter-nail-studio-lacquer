import type { CSSProperties } from 'react';
import { formatMoney } from '@profitstudio/booking-engine';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import type { Resource } from '../lib/resource';
import { durationLabel } from '../lib/services';
import { bookLink } from '../lib/bookLink';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 1024px) 34vw, (min-width: 720px) 46vw, 88vw';

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  services: Resource<Service[]>;
  business: Business | null;
  onBook: StartBooking;
}

/** Plain facts from the engine: the range of appointment lengths and the lowest price. Nothing is invented. */
function serviceFacts(services: Resource<Service[]>, business: Business | null) {
  if (services.status !== 'ready' || services.data.length === 0) return null;
  const lengths = services.data.map((s) => s.durationMinutes);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const priced = services.data.filter((s) => s.priceCents !== null);
  const cheapest = priced.length ? priced.reduce((a, b) => ((a.priceCents ?? 0) <= (b.priceCents ?? 0) ? a : b)) : null;
  return {
    lengths: min === max ? durationLabel(min) : `${durationLabel(min)} – ${durationLabel(max)}`,
    from: cheapest
      ? formatMoney(cheapest.priceCents ?? 0, cheapest.currency, business?.locale ?? 'en-US').replace(/([.,])00(?!\d)/, '')
      : null,
  };
}

/**
 * The first screen: the lacquer colour edge to edge, the headline and one Book
 * button, a tall photo with a detail laid over its corner, and the name mark
 * set very large along the bottom (decorative — the name is in the header).
 */
export function Hero({ values, status, services, business, onBook }: HeroProps) {
  const photo = values['hero.photo'];
  const detail = values['hero.detail'];
  const facts = serviceFacts(services, business);
  const mark = values['brand.wordmark'];
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="page hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow hero__eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large button--bone" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="hero__link" href="#menu">
              See the menu &amp; prices
            </a>
          </div>
          {(facts || status) && (
            <dl className="hero__facts hero__enter">
              {facts?.from && (
                <div>
                  <dt>Treatments from</dt>
                  <dd>{facts.from}</dd>
                </div>
              )}
              {facts && (
                <div>
                  <dt>At the table</dt>
                  <dd>{facts.lengths}</dd>
                </div>
              )}
              {status && (
                <div className="hero__fact-status">
                  <dt>Today</dt>
                  <dd className="open-status" data-open={status.open}>
                    <span className="open-status__dot" aria-hidden="true" />
                    {status.text}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>
        {photo && (
          <div className={`hero__media ${detail ? 'hero__media--pair' : ''}`}>
            <Photo image={photo} sizes={HERO_SIZES} priority className="hero__photo" />
            {detail && <Photo image={detail} sizes="(min-width: 1024px) 12vw, 32vw" className="hero__detail" />}
          </div>
        )}
      </div>
      <p className="hero__mark" aria-hidden="true" style={{ '--chars': Math.max(mark.length, 4) } as CSSProperties}>
        {mark}
      </p>
    </section>
  );
}
