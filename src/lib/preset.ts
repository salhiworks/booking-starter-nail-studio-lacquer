import type { Preset } from '@profitstudio/booking-engine';

/**
 * Lunula Nail Studio's own preset (INTEGRATION.md §5): the sample services,
 * hours and policies preview mode shows, and the starter set the dashboard
 * offers an owner who has no services yet (<BookingAdmin presets>).
 * Prices are in US dollars, in cents.
 *
 * Each treatment is ONE engine service with its own length and price — the
 * engine has no add-ons, so "a gel manicure with art" is its own service, long
 * enough for the art. The menu on the website sorts services into shelves
 * (Manicure, Builder gel, Nail art, Pedicure, Care) by the words in their
 * names — see src/lib/services.ts.
 */
export const sitePreset = {
  id: 'nail-studio',
  label: 'Nail & Beauty Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'appointment', bookings: 'appointments' },
  previewBusiness: {
    name: 'Sample Nail Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 323-555-0100',
      address: '100 Example Street, Los Angeles, CA',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 120,
    maxAdvanceDays: 60,
    autoConfirm: true,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // Closed on Mondays; a late evening on Thursdays.
  workingHours: [
    { weekday: 2, start: '10:00', end: '19:00' },
    { weekday: 3, start: '10:00', end: '19:00' },
    { weekday: 4, start: '11:00', end: '20:00' },
    { weekday: 5, start: '10:00', end: '19:00' },
    { weekday: 6, start: '09:00', end: '17:00' },
    { weekday: 7, start: '11:00', end: '16:00' },
  ],
  services: [
    {
      name: 'Signature Manicure',
      description: 'Shape, cuticle care, a slow hand massage and a classic polish in the colour of your choice.',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 4800,
    },
    {
      name: 'Gel Manicure',
      description: 'Our full manicure finished in gel — glossy, chip-resistant and set under the lamp in minutes.',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 6200,
    },
    {
      name: 'Builder Gel (BIAB) — New set',
      description: 'A strengthening overlay on your natural nails, shaped and finished in a sheer or solid colour.',
      durationMinutes: 75,
      bufferAfterMinutes: 15,
      priceCents: 7800,
    },
    {
      name: 'Builder Gel (BIAB) — Infill',
      description: 'For existing builder gel within four weeks: we rebalance the grown-out overlay and refresh the colour.',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 6800,
    },
    {
      name: 'Gel Manicure with Accent Art',
      description: 'A gel manicure with art on two nails per hand — chrome, a fine French, dots or a hand-painted detail.',
      durationMinutes: 75,
      bufferAfterMinutes: 15,
      priceCents: 7800,
    },
    {
      name: 'Gel Manicure with Full Art',
      description: 'A design across all ten nails, planned with you at the table. Bring a reference if you have one.',
      durationMinutes: 105,
      bufferAfterMinutes: 15,
      priceCents: 9500,
      priceFrom: true,
    },
    {
      name: 'Classic Pedicure',
      description: 'A warm soak, shaping, cuticle and heel care, a calf massage and a classic polish.',
      durationMinutes: 50,
      bufferAfterMinutes: 15,
      priceCents: 5800,
    },
    {
      name: 'Gel Pedicure',
      description: 'The full pedicure finished in gel, for colour that lasts on holiday and beyond.',
      durationMinutes: 65,
      bufferAfterMinutes: 15,
      priceCents: 7200,
    },
    {
      name: 'Gel Removal & Nail Care',
      description: 'A gentle soak-off with no scraping, then shaping, cuticle oil and a strengthening base. No colour.',
      durationMinutes: 30,
      bufferAfterMinutes: 10,
      priceCents: 2800,
    },
  ],
} satisfies Preset;
