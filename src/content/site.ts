import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Services, prices, durations, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 */
const ITALIC_HELP = 'Wrap a few words in *asterisks* to set them in italic.';
const GALLERY_PHOTO_HELP = 'A set you made, in portrait (4:5). Shown with a “Sample” label until you replace it. Remove a photo to show fewer.';
const GALLERY_CAPTION_HELP = 'The look, then “·” and the treatment — for example “Noir almond · Gel manicure”. Optional.';

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the lacquer colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and footer, and set very large across the bottom of the first screen. One or two short words read best.',
          default: 'Lunula',
          maxLength: 24,
          required: true,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide logo in a light colour on a transparent background; it replaces the name mark in the header. The large name across the first screen stays.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Lacquer colour',
          help: 'The colour of the first screen, the booking band, buttons and the booking calendar. A deep polish colour — cherry, oxblood, plum, bottle green or navy — suits the design best; light text must stay readable on it.',
          default: '#7a1424',
          contrastWith: '#f6efe8',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'editorial',
          options: [
            { value: 'editorial', label: 'Editorial serif', description: 'Fraunces with soft italics — the original design.' },
            { value: 'sharp', label: 'Sharp serif', description: 'Fraunces, crisper and a little lighter.' },
            { value: 'sans', label: 'Modern sans', description: 'Instrument Sans, clean and confident.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Lunula Nail Studio — manicures, gel & nail art in Los Angeles',
          maxLength: 70,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'A small nail studio in Silver Lake, Los Angeles: manicures, gel, builder gel and hand-painted nail art. See the menu and prices, and book online in a minute.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description: 'The first screen: the headline, the button and two photos on your lacquer colour.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Nail studio · Silver Lake, Los Angeles',
          maxLength: 60,
        },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: ITALIC_HELP,
          default: 'Ten small canvases, *painted slowly.*',
          maxLength: 70,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'Manicures, gel and builder gel with careful prep, a clean station for every client and nail art drawn by hand — in a quiet room off Sunset Boulevard.',
          maxLength: 240,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Button', default: 'Book an appointment', maxLength: 28, required: true },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo',
          help: 'A close-up of finished nails, in portrait. Shown tall (4:5); keep the hands near the centre.',
          default: {
            src: '/photos/hero-cherry-1200.webp',
            alt: 'Hands with long, glossy cherry-red almond nails and silver rings crossed over a deep red satin slip.',
            width: 1200,
            height: 1500,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'image',
          id: 'hero.detail',
          label: 'Small photo',
          help: 'Optional. A detail laid over the corner of the main photo — the work in progress, a colour, a tool. Remove it for a single photo.',
          default: {
            src: '/photos/hero-detail-640.webp',
            alt: 'A close-up of glossy red almond nails catching the light.',
            width: 640,
            height: 800,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'menu',
      label: 'The menu',
      description:
        'Treatments, lengths and prices come from Services in this dashboard; the menu sorts them by the words in their names (manicure, builder gel or BIAB, art, pedicure, removal or care). Here: the words around them.',
      fields: [
        { type: 'text', id: 'menu.title', label: 'Title', help: ITALIC_HELP, default: 'The *menu*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'menu.intro',
          label: 'Introduction',
          default:
            'Every appointment starts with prep done properly: shaping, cuticle care and a clean, dry nail. The time shown is the time you’ll spend at the table.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'longText',
          id: 'menu.noteManicure',
          label: 'Note under “Manicure”',
          default: 'Classic polish lasts about a week; gel two to three. Wearing gel already? Book a gel manicure — removal is included.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'menu.noteBuilder',
          label: 'Note under “Builder gel”',
          default: 'Builder gel adds strength to your own nails — no tips, no extensions. Book an infill every three to four weeks to keep it balanced.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'menu.noteArt',
          label: 'Note under “Nail art”',
          default: 'Art is booked with its manicure, so the time is right. Send a reference after booking, or plan the design with us at the table.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'menu.notePedicure',
          label: 'Note under “Pedicure”',
          default: 'Wear open shoes or bring sandals if you choose gel or polish — and allow a few extra minutes to dry.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'menu.noteCare',
          label: 'Note under “Care”',
          default: 'For a break between sets: a gentle soak-off with no scraping, then oil and a strengthening base.',
          maxLength: 220,
          rows: 2,
        },
      ],
    },
    {
      id: 'gallery',
      label: 'Gallery',
      description:
        'Your recent work: up to six photos. Each sample photo carries a “Sample” label until you replace it with your own — always show sets you made yourself.',
      fields: [
        { type: 'text', id: 'gallery.title', label: 'Title', help: ITALIC_HELP, default: 'Recent *sets*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'gallery.intro',
          label: 'Introduction',
          default: 'Quiet nudes, glossy cherries, fine French and hand-painted detail. Show us a reference — or let us suggest something.',
          maxLength: 240,
          rows: 2,
        },
        {
          type: 'image',
          id: 'gallery.photo1',
          label: 'Photo 1',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/set-noir-800.webp', alt: 'A hand with long almond nails in glossy black and two thin silver rings, resting on white linen.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption1', label: 'Caption 1', help: GALLERY_CAPTION_HELP, default: 'Noir almond · Gel manicure', maxLength: 64 },
        {
          type: 'image',
          id: 'gallery.photo2',
          label: 'Photo 2',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/set-cherry-800.webp', alt: 'Short, rounded cherry-red nails on a hand resting across the open pages of a photography book.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption2', label: 'Caption 2', help: GALLERY_CAPTION_HELP, default: 'Cherry, kept short · Gel manicure', maxLength: 64 },
        {
          type: 'image',
          id: 'gallery.photo3',
          label: 'Photo 3',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/set-blush-art-800.webp', alt: 'A hand with dusky pink almond nails on a black background, one nail painted with a small dark flower.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption3', label: 'Caption 3', help: GALLERY_CAPTION_HELP, default: 'Dusk with one flower · Accent art', maxLength: 64 },
        {
          type: 'image',
          id: 'gallery.photo4',
          label: 'Photo 4',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/set-milk-800.webp', alt: 'Two hands with milky pink ombré nails, a few painted with fine white florals, against a soft blue sweater.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption4', label: 'Caption 4', help: GALLERY_CAPTION_HELP, default: 'Milk ombré & florals · Builder gel + art', maxLength: 64 },
        {
          type: 'image',
          id: 'gallery.photo5',
          label: 'Photo 5',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/set-speckle-800.webp', alt: 'Short nude nails flecked with black speckles over pastel yellow and blue, a hand holding a green leaf.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption5', label: 'Caption 5', help: GALLERY_CAPTION_HELP, default: 'Quail-egg speckle · Full art', maxLength: 64 },
        {
          type: 'image',
          id: 'gallery.photo6',
          label: 'Photo 6',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/set-pedi-800.webp', alt: 'Feet with toenails painted a soft milky white, standing on a speckled rug.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption6', label: 'Caption 6', help: GALLERY_CAPTION_HELP, default: 'Soft white · Gel pedicure', maxLength: 64 },
        {
          type: 'text',
          id: 'gallery.linkLabel',
          label: 'Link text (optional)',
          help: 'For example “More on Instagram”. Leave empty to hide the link.',
          default: '',
          maxLength: 40,
        },
        { type: 'link', id: 'gallery.linkUrl', label: 'Link address', help: 'Your Instagram or portfolio page, starting with https://', default: '' },
      ],
    },
    {
      id: 'studio',
      label: 'The studio',
      description: 'The room, the way you work and what clients can count on.',
      fields: [
        { type: 'text', id: 'studio.title', label: 'Title', help: ITALIC_HELP, default: 'A small room, *steady hands.*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'studio.text',
          label: 'Text',
          default:
            'Four tables by a tall window, good light and no rush. We work one client at a time per artist, take prep seriously, and would rather tell you your nails need a break than sell you another set.',
          maxLength: 480,
          rows: 4,
        },
        {
          type: 'image',
          id: 'studio.photo',
          label: 'Photo of the studio',
          help: 'The room or a table at work, ideally in daylight. Cropped to a tall frame.',
          default: {
            src: '/photos/studio-table-1200.webp',
            alt: 'A nail technician in a white shirt shaping a client’s nails with an electric file at a manicure table.',
            width: 1200,
            height: 1500,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'image',
          id: 'studio.detail',
          label: 'Detail photo',
          help: 'Optional. A close-up: your colours, tools, a finished hand.',
          default: {
            src: '/photos/studio-colours-800.webp',
            alt: 'A fan of nail colour swatches in reds, pinks and nudes spread on a white table.',
            width: 800,
            height: 600,
          },
          aspectRatio: 4 / 3,
        },
        {
          type: 'list',
          id: 'studio.promises',
          label: 'What clients can count on',
          itemLabel: 'Promise',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 48, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 240, rows: 3 },
          ],
          default: [
            {
              title: 'Clean tools, every time',
              text: 'Metal tools are cleaned and sterilised between clients; files and buffers are new for each set, and yours to take home.',
            },
            {
              title: 'Prep before polish',
              text: 'Most of a manicure that lasts happens before the colour: shaping, cuticle work and a nail that is properly clean and dry.',
            },
            {
              title: 'Honest about your nails',
              text: 'Thin or peeling after years of gel? We’ll say so, suggest a care appointment, and never file your natural nail away.',
            },
          ],
        },
      ],
    },
    {
      id: 'goodToKnow',
      label: 'Good to know',
      description: 'The practical questions clients ask before their first appointment.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Title', help: ITALIC_HELP, default: 'Good to *know*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 10,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'I’m wearing gel from another salon. What should I book?',
              answer:
                'Book the treatment you want next — a gel manicure includes removal of gel. If you only want it off, book Gel Removal & Nail Care. Acrylic or hard extensions need a little longer: call us first.',
            },
            {
              question: 'Gel or builder gel?',
              answer:
                'Gel is colour that lasts two to three weeks on nails that are already strong. Builder gel (BIAB) is a thicker layer that adds strength while your own nails grow, and is refreshed with an infill.',
            },
            {
              question: 'Can I bring a picture of a design?',
              answer:
                'Please do. Choose Accent Art for details on a few nails, Full Art for a design across all ten. Very detailed sets may take longer than booked — we’ll tell you before we start.',
            },
            {
              question: 'What if I’m running late or need to cancel?',
              answer:
                'Let us know as soon as you can. We’ll always try to fit the full treatment in, but appointments end on time so the next client isn’t kept waiting. Please give 24 hours’ notice to cancel.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: ITALIC_HELP, default: 'Your next *set*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a treatment, then a day and time that suit you. No account needed — it takes about a minute.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: ITALIC_HELP, default: 'Find the *studio*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Getting here',
          default:
            'We’re upstairs, above the flower shop — ring the bell marked Lunula. Metered parking on the street and in the lot behind the building. Need step-free access? Tell us when you book and we’ll meet you downstairs.',
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Manicures, gel & nail art in Silver Lake, Los Angeles.',
          maxLength: 100,
        },
      ],
    },
  ],
});
