import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** The room and the way the studio works: a tall photo, a detail, the text and what clients can count on. */
export function Studio({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const photo = values['studio.photo'];
  const detail = values['studio.detail'];
  const promises = values['studio.promises'];
  const samplePhoto = !ownerFields.includes('studio.photo');
  return (
    <section id="studio" className="section studio" aria-labelledby="studio-title">
      <div className={`page studio__grid ${photo ? '' : 'studio__grid--text-only'}`}>
        {photo && (
          <figure className="studio__figure">
            <Photo image={photo} sizes="(min-width: 960px) 38vw, calc(100vw - 2.5rem)" className="studio__photo" />
            {detail && <Photo image={detail} sizes="(min-width: 960px) 18vw, 46vw" className="studio__detail" />}
            {samplePhoto && <figcaption className="tag tag--on-photo">Sample photo</figcaption>}
          </figure>
        )}
        <div className="studio__text">
          <header className="section-head">
            <p className="index" aria-hidden="true">
              03
            </p>
            <h2 id="studio-title">
              <Emphasis text={values['studio.title']} />
            </h2>
          </header>
          {values['studio.text'] && <p className="studio__lede prewrap">{values['studio.text']}</p>}
          {promises.length > 0 && (
            <ol className="promises" role="list">
              {promises.map((promise, i) => (
                <li className="promise" key={`${i}-${promise.title}`}>
                  <span className="promise__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="promise__title">{promise.title}</h3>
                  {promise.text && <p className="promise__text prewrap">{promise.text}</p>}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
