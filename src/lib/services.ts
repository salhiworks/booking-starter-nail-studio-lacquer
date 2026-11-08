import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The menu's shelves.
 *
 * The engine (2.0.0-beta.3) has no service categories and no per-service
 * metadata, and a service's id is a database UUID this site cannot know when
 * it is built — so the shelf is read from the service's own engine data:
 *
 *   1. its NAME, against the rules below — the first rule that matches wins,
 *      strongest signal first (feet before finishes: "French Pedicure" is a
 *      pedicure; "Gel Manicure with Accent Art" is Nail art);
 *   2. if the name has no treatment words (an owner renamed "Gel Manicure with
 *      Full Art" to "Statement Set"), its DESCRIPTION, against the same rules;
 *   3. otherwise "More treatments" — a genuinely new kind of service (lashes,
 *      brows) gets its own shelf instead of a wrong one.
 *
 * Finishes (French, chrome, ombré) are not art on their own: they can be done
 * on any manicure or pedicure. A truly stable category needs an engine field —
 * see docs/ENGINE-PROPOSAL-nail-services.md in the Niche Pack workspace.
 */
export type ShelfId = 'art' | 'builder' | 'pedicure' | 'care' | 'manicure' | 'more';

interface ShelfRule {
  id: ShelfId;
  label: string;
  /** Content field holding the shelf's note (src/content/site.ts), if any. */
  note: 'menu.noteManicure' | 'menu.noteBuilder' | 'menu.noteArt' | 'menu.notePedicure' | 'menu.noteCare' | null;
  match: RegExp;
}

const RULES: ShelfRule[] = [
  { id: 'pedicure', label: 'Pedicure', note: 'menu.notePedicure', match: /\b(pedicures?|pedi|feet|foot|toes?|toenails?)\b/i },
  { id: 'builder', label: 'Builder gel', note: 'menu.noteBuilder', match: /\b(builder|biab|infills?|refills?|overlays?|extensions?|acrylics?|polygel|tips)\b/i },
  { id: 'art', label: 'Nail art', note: 'menu.noteArt', match: /\b(art|designs?|accents?|hand[- ]?painted)\b/i },
  { id: 'care', label: 'Care', note: 'menu.noteCare', match: /\b(removal|remove|repairs?|soak[- ]?off|nail care)\b/i },
  { id: 'manicure', label: 'Manicure', note: 'menu.noteManicure', match: /\b(manicures?|mani|polish|shellac|gel|hands?|nails?)\b/i },
];

const MORE = { id: 'more', label: 'More treatments', note: null } as const;

/** The order shelves are shown in. */
const ORDER: ShelfId[] = ['manicure', 'builder', 'art', 'pedicure', 'care', 'more'];

export interface Shelf {
  id: ShelfId;
  label: string;
  note: ShelfRule['note'];
  services: Service[];
}

export function shelfOf(service: Pick<Service, 'name' | 'description'>): ShelfRule | typeof MORE {
  const byName = RULES.find((rule) => rule.match.test(service.name));
  if (byName) return byName;
  const description = service.description ?? '';
  return RULES.find((rule) => rule.match.test(description)) ?? MORE;
}

/** Services on their shelves, keeping the owner's display order inside each; empty shelves are left out. */
export function shelve(services: readonly Service[]): Shelf[] {
  const shelves = new Map<ShelfId, Shelf>();
  for (const service of services) {
    const rule = shelfOf(service);
    let shelf = shelves.get(rule.id);
    if (!shelf) {
      shelf = { id: rule.id, label: rule.label, note: rule.note, services: [] };
      shelves.set(rule.id, shelf);
    }
    shelf.services.push(service);
  }
  return ORDER.flatMap((id) => (shelves.has(id) ? [shelves.get(id)!] : []));
}

/** "75 min", "1 h 45 min" — durations straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 90) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (minutes < 90 || h === 0) return `${minutes} minutes`;
  return m ? `${h} hour${h > 1 ? 's' : ''} ${m} minutes` : `${h} hour${h > 1 ? 's' : ''}`;
}

export function priceLabel(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): string {
  if (service.priceCents === null) return 'Price on request';
  const amount = formatMoney(service.priceCents, service.currency, locale);
  return service.priceFrom ? `from ${amount}` : amount;
}

/** Whole-dollar prices print without ".00" — "$62", not "$62.00". */
export function shortPrice(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): string {
  return priceLabel(service, locale).replace(/([.,])00(?!\d)/, '');
}
