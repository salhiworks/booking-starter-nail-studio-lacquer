import { Fragment } from 'react';

/** The owner's text with *asterisks* turned into italics — still rendered as text, never as HTML. */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}
