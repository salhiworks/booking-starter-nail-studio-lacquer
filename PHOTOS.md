# Photographs

Ten free photographs from Pexels, downloaded into the project (never hot-linked),
cropped for their one use and exported as AVIF + WebP at three widths by the
Lacquer photo pipeline. **This starter ships only those processed frames** — the
original downloads and the pipeline script stay with the source project, so the
repository never redistributes an unaltered copy. No image-generation tool was
used, and no inspiration screenshot was used as an image.

They are the website's **defaults** (`src/content/site.ts`): the owner replaces
each one in the dashboard (Website). **They are sample imagery, not Lunula Nail
Studio** (a fictional studio): nobody in them works at or visited the studio, the
nails were not done there, and nobody is named. On the page every gallery photo
and the studio photo carries a **"Sample"** label until the owner replaces that
photo, and the gallery says "Stock images stand in until the studio adds its own
work." Faces are kept out of frame (the hero is cropped below the chin; the studio
photo shows only the technician's lower face, labelled "Sample photo").

| Use (content field) | Files (`public/photos/`) | Source page | Photographer | Licence |
|---|---|---|---|---|
| Hero, main photo — long cherry almond nails, hands crossed over a red satin slip (`hero.photo`) | `hero-cherry-{800,1200,1600}` | https://www.pexels.com/photo/fashionable-woman-with-red-manicure-and-jewelry-30691552/ | Sofia Sapphire ([@sofia-sapphire-1119727181](https://www.pexels.com/@sofia-sapphire-1119727181/)) | Pexels License |
| Hero, detail print — glossy red almond nails, close (`hero.detail`) | `hero-detail-{400,640,960}` | https://www.pexels.com/photo/fingers-decorated-with-red-acrylic-nails-17010955/ | Andrea Mosti ([@andreamostiphotography](https://www.pexels.com/@andreamostiphotography/)) | Pexels License |
| Gallery 1 — black almond nails on white linen (`gallery.photo1`) | `set-noir-{480,800,1200}` | https://www.pexels.com/photo/hand-of-a-woman-with-rings-5525054/ | arteliusnis ([@arteliusnis-3541811](https://www.pexels.com/@arteliusnis-3541811/)) | Pexels License |
| Gallery 2 — short cherry nails on an open photography book (`gallery.photo2`) | `set-cherry-{480,800,1200}` | https://www.pexels.com/photo/woman-hand-on-page-with-pictures-14715895/ | Umay Karataş ([@umaykaratas](https://www.pexels.com/@umaykaratas/)) | Pexels License |
| Gallery 3 — dusky pink almond nails with one small painted flower, on black (`gallery.photo3`) | `set-blush-art-{480,800,1200}` | https://www.pexels.com/photo/hand-on-a-black-background-20694109/ | John Thon ([@john-thon-1096879738](https://www.pexels.com/@john-thon-1096879738/)) | Pexels License |
| Gallery 4 — milky pink ombré with white florals on a blue sweater (`gallery.photo4`) | `set-milk-{480,800,1200}` | https://www.pexels.com/photo/hands-with-professional-manicure-17471377/ | abolfazl zarghami ([@abolfazl-zarghami-465901605](https://www.pexels.com/@abolfazl-zarghami-465901605/)) | Pexels License |
| Gallery 5 — speckled pastel nail art, a hand holding a leaf (`gallery.photo5`) | `set-speckle-{480,800,1200}` | https://www.pexels.com/photo/a-hand-with-colorful-nail-art-holding-green-leaf-13277178/ | Дарина Ритомская ([@295715178](https://www.pexels.com/@295715178/)) | Pexels License |
| Gallery 6 — milky white pedicure on a speckled rug (`gallery.photo6`) | `set-pedi-{480,800,1200}` | https://www.pexels.com/photo/close-up-view-of-toes-on-carpet-4963822/ | Karolina Grabowska / Kaboompics ([@karola-g](https://www.pexels.com/@karola-g/)) | Pexels License |
| The studio — a technician shaping a client's nails with an electric file, labelled "Sample photo" (`studio.photo`) | `studio-table-{600,900,1200}` | https://www.pexels.com/photo/a-nail-technician-holding-a-nail-sander-14018564/ | Mehmet Turgut Kirkgoz ([@tkirkgoz](https://www.pexels.com/@tkirkgoz/)) | Pexels License |
| The studio, detail print — a fan of colour swatches (`studio.detail`) | `studio-colours-{480,800,1200}` | https://www.pexels.com/photo/artificial-nail-samples-3735624/ | Polina Tankilevitch ([@polina-tankilevitch](https://www.pexels.com/@polina-tankilevitch/)) | Pexels License |

Licences were checked on each photo's page on 8 November 2026 (each page reads
"Free to use"; licence: Pexels). The Pexels License does not require attribution;
it is recorded here anyway.

**Considered and rejected:** a nail-art photo whose 3D charms closely resemble a
fashion house's cross emblem (Pexels 18730147) — the Pexels License forbids implying
endorsement by brands, so it was not used.

## Processing

Each original was downloaded at 2400 px (Pexels' own resize), cropped to its
frame, converted to sRGB with metadata stripped, and exported as AVIF (q52) and
WebP (q78). No retouching, no colour grade — the set already shares warm,
natural light.

| Photo | Crop (from the original) | Widths |
|---|---|---|
| hero-cherry | 4:5, full width, from 20 % down (below the chin) | 800, 1200, 1600 |
| hero-detail | 4:5, the whole frame | 400, 640, 960 |
| set-noir | 4:5, full width, from 12 % down | 480, 800, 1200 |
| set-cherry, set-blush-art, set-speckle | 4:5, full width, from 10 % down | 480, 800, 1200 |
| set-milk | 4:5, full width, from 6 % down | 480, 800, 1200 |
| set-pedi | 4:5, full width, from 20 % down | 480, 800, 1200 |
| studio-table | 4:5 from the landscape original, from 22 % across | 600, 900, 1200 |
| studio-colours | 4:3, full height, left-aligned | 480, 800, 1200 |

The site's `<Photo>` component serves `<picture>` with AVIF then WebP sources
from `src/content/photoVariants.ts` (generated); the hero's AVIF is preloaded in
`index.html`. Owner uploads arrive resized by the engine and render as one `<img>`.

## Replacing a photo

In the dashboard → Website, each photo field shows its expected shape (4:5 for the
hero, gallery and studio; 4:3 for the studio detail). The page crops with
`object-fit: cover`, so any upload fits; keep the hands near the centre. Replacing
a gallery or studio photo removes its "Sample" label.
