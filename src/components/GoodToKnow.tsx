import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';

/** The practical questions before a first appointment, as native disclosure rows (keyboard and screen-reader ready). */
export function GoodToKnow({ values }: { values: SiteValues }) {
  const items = values['faq.items'];
  if (items.length === 0) return null;
  return (
    <section id="good-to-know" className="section faq" aria-labelledby="faq-title">
      <div className="page faq__grid">
        <header className="section-head faq__head">
          <p className="index" aria-hidden="true">
            04
          </p>
          <h2 id="faq-title">
            <Emphasis text={values['faq.title']} />
          </h2>
        </header>
        <div className="faq__list">
          {items.map((item, i) => (
            <details className="qa" key={`${i}-${item.question}`} open={i === 0}>
              <summary>
                <span className="qa__q">{item.question}</span>
                <span className="qa__icon" aria-hidden="true" />
              </summary>
              {item.answer && <p className="qa__a prewrap">{item.answer}</p>}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
