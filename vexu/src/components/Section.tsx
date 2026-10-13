import type { ReactNode } from 'react';

/** Heading block used across sections: title, optional lede, no decorative eyebrows. */
export function SectionHeading({
  title,
  lede,
  align = 'left',
  id,
  size = 'lg',
}: {
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
  size?: 'lg' | 'md';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <h2 id={id} className={size === 'md' ? 'h2 !text-[clamp(1.9rem,3.2vw,2.7rem)]' : 'h2'}>
        {title}
      </h2>
      {lede && <p className={`lede mt-5 ${align === 'center' ? 'mx-auto' : ''}`}>{lede}</p>}
    </div>
  );
}

/** Small informational tag, e.g. launch status or patent note. Sentence case by design. */
export function Tag({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm ${
        tone === 'dark' ? 'border border-white/15 text-paper/75' : 'border border-ink/10 bg-paper/70 text-slate'
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
      {children}
    </span>
  );
}
