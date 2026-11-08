import type { SiteImage } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

interface GalleryProps {
  values: SiteValues;
  /** Fields the owner has set — a photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
}

/**
 * Recent sets, on the night background so the colour of the nails carries the
 * page: a staggered three-column wall on wide screens, a swipeable rail of large
 * frames on phones (nail detail needs size more than it needs a grid).
 */
export function Gallery({ values, ownerFields }: GalleryProps) {
  const items = looks(values, ownerFields);
  const sample = items.some((item) => item.sample);
  const linkLabel = values['gallery.linkLabel'].trim();
  const linkUrl = values['gallery.linkUrl'].trim();
  if (items.length === 0) return null;
  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <div className="page">
        <header className="section-head gallery__head">
          <p className="index" aria-hidden="true">
            02
          </p>
          <h2 id="gallery-title">
            <Emphasis text={values['gallery.title']} />
          </h2>
          {values['gallery.intro'] && <p className="section-intro">{values['gallery.intro']}</p>}
          {sample && (
            <p className="sample-note sample-note--night">
              <span className="tag">Sample photos</span>
              Stock images stand in until the studio adds its own work.
            </p>
          )}
        </header>
      </div>
      <div className="gallery__viewport" role="region" aria-label="Recent sets — scroll sideways for more" tabIndex={0}>
        <ol className="gallery__wall page" role="list" data-count={items.length}>
          {items.map((item, i) => (
            <li className="look" key={`${i}-${item.photo.src}`}>
              <figure>
                <div className="look__frame">
                  <Photo image={item.photo} sizes="(min-width: 960px) 28vw, (min-width: 720px) 46vw, 76vw" className="look__photo" />
                  {item.sample && <span className="tag tag--on-photo">Sample</span>}
                </div>
                {(item.caption || item.treatment) && (
                  <figcaption className="look__caption">
                    <span className="look__n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.caption && <span className="look__name">{item.caption}</span>}
                    {item.treatment && <span className="look__treatment">{item.treatment}</span>}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ol>
      </div>
      {linkLabel && linkUrl && (
        <div className="page gallery__more">
          <a className="link-button link-button--night" href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </section>
  );
}

interface Look {
  photo: SiteImage;
  caption: string;
  treatment: string;
  /** Still the starter's stock photo: labelled until the owner replaces it. */
  sample: boolean;
}

const SLOTS = [1, 2, 3, 4, 5, 6] as const;

/** The six photo fields in order, skipping removed ones; "Look · Treatment" captions split in two. */
function looks(values: SiteValues, ownerFields: string[]): Look[] {
  return SLOTS.flatMap((n) => {
    const photo = values[`gallery.photo${n}`];
    if (!photo) return [];
    const [caption = '', ...rest] = values[`gallery.caption${n}`].split(/\s+·\s+/);
    return [{ photo, caption: caption.trim(), treatment: rest.join(' · ').trim(), sample: !ownerFields.includes(`gallery.photo${n}`) }];
  });
}
