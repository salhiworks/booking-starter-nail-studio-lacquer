/**
 * This website's identity — the ONE place for its name, time zone and the
 * placeholder contact details shown in preview mode (`npm run dev` without
 * Supabase). Everything the owner manages (services, prices, hours, real
 * contact details, text and photos) lives in the dashboard at /admin/.
 */
export const SITE = {
  /** The business name. The dashboard's Business page overrides it once connected. */
  name: 'Lunula Nail Studio',
  /** IANA time zone of the business. */
  timezone: 'America/Los_Angeles',
  /** Fictional contact details for preview mode only. */
  previewContact: {
    email: 'hello@lunula.example',
    phone: '+1 323-555-0164',
    address: '2219 Hyperion Lane, Suite 2, Los Angeles, CA 90027',
  },
};
