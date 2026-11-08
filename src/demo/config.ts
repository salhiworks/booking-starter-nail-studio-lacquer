import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'nail-studio-lacquer',
  preset: sitePreset,
  business: {
    name: 'Lunula Nail Studio',
    timezone: 'America/Los_Angeles',
    email: 'hello@lunula.example',
    phone: '+1 323-555-0164',
    address: '2219 Hyperion Lane, Suite 2, Los Angeles, CA 90027',
  },
  ownerEmail: 'owner@lunula.example',
  referencePrefix: 'LN',
  sampleNotes: [
    'Wearing gel from another salon — please include removal.',
    'Short squoval, a sheer milky pink. Reference photo to follow.',
    'Chrome on the ring fingers only, please.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Camila Reyes', email: 'camila.reyes@example.com', phone: '+1 323 555 0112' },
    { name: 'Jordan Blake', email: 'jordan.blake@example.com', phone: '+1 323 555 0125' },
    { name: 'Aiko Tanaka', email: 'aiko.tanaka@example.com', phone: '+1 323 555 0134' },
    { name: 'Simone Laurent', email: 'simone.l@example.com', phone: '+1 323 555 0141' },
    { name: 'Priya Natarajan', email: 'priya.n@example.com', phone: '+1 323 555 0157' },
    { name: 'Maya Goldberg', email: 'maya.goldberg@example.com', phone: '+1 323 555 0163' },
    { name: 'Tessa Moreau', email: 'tessa.moreau@example.com', phone: '+1 323 555 0178' },
    { name: 'Nia Okafor', email: 'nia.okafor@example.com', phone: '+1 323 555 0186' },
    { name: 'Lucía Fernández', email: 'lucia.f@example.com', phone: '+1 323 555 0194' },
    { name: 'Hannah Park', email: 'hannah.park@example.com', phone: '+1 323 555 0109' },
  ],
};
