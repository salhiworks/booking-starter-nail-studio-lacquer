import { formatClockTime, formatDate, timeZoneLabel } from '@profitstudio/booking-engine';
import type { Business, Service, Slot } from '@profitstudio/booking-engine';
import { durationLabel, priceLabel } from '../../lib/services';

interface SummaryProps {
  business: Business;
  service: Service | null;
  date: string | null;
  slot: Slot | null;
  canChangeTime: boolean;
  onChangeTreatment: () => void;
  onChangeTime: () => void;
  busy: boolean;
}

/** The chosen treatment, length, price, date and time — in view at every step. */
export function Summary({ business, service, date, slot, canChangeTime, onChangeTreatment, onChangeTime, busy }: SummaryProps) {
  const { locale, timezone } = business;
  if (!service) {
    return (
      <aside className="summary summary--empty" aria-label="Your appointment">
        <p className="summary__title">Your appointment</p>
        <p className="summary__hint">Choose a treatment to begin. Your choices will appear here.</p>
      </aside>
    );
  }
  const dateLabel = date ? formatDate(date, locale, { weekday: 'long', month: 'long', day: 'numeric' }) : null;
  const shortDate = date ? formatDate(date, locale, { weekday: 'short', month: 'short', day: 'numeric' }) : null;
  const time = slot ? formatClockTime(slot.time, locale) : null; // the server's business-local label
  return (
    <aside className="summary" aria-label="Your appointment">
      <p className="summary__title">Your appointment</p>
      <dl className="summary__list">
        <div className="summary__row summary__row--treatment">
          <dt>Treatment</dt>
          <dd>{service.name}</dd>
        </div>
        <div className="summary__row">
          <dt>Length</dt>
          <dd>{durationLabel(service.durationMinutes)}</dd>
        </div>
        <div className="summary__row">
          <dt>Price</dt>
          <dd>{priceLabel(service, locale)}</dd>
        </div>
        <div className="summary__row summary__row--date">
          <dt>Date</dt>
          <dd>{dateLabel ?? <span className="summary__pending">Not chosen yet</span>}</dd>
        </div>
        <div className="summary__row summary__row--time">
          <dt>Time</dt>
          <dd>
            {time ? (
              <>
                {time} <span className="summary__zone">{timeZoneLabel(timezone, locale)}</span>
              </>
            ) : (
              <span className="summary__pending">Not chosen yet</span>
            )}
          </dd>
        </div>
        {shortDate && (
          <div className="summary__row summary__row--when">
            <dt>When</dt>
            <dd>
              {shortDate}
              {time ? ` · ${time}` : ''}
            </dd>
          </div>
        )}
      </dl>
      <div className="summary__actions">
        <button type="button" className="link-button" onClick={onChangeTreatment} disabled={busy} aria-label="Change treatment">
          Change<span className="summary__wide" aria-hidden="true">&nbsp;treatment</span>
        </button>
        {canChangeTime && (
          <button type="button" className="link-button summary__change-time" onClick={onChangeTime} disabled={busy}>
            Change time
          </button>
        )}
      </div>
    </aside>
  );
}
