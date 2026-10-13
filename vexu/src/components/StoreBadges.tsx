import { isAvailable, launch } from '../config/launch';
import { useActions } from './Actions';

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.6c.03 2.86 2.5 3.81 2.53 3.82-.02.07-.4 1.36-1.3 2.69-.78 1.15-1.6 2.3-2.88 2.32-1.26.02-1.66-.75-3.1-.75-1.44 0-1.88.73-3.08.77-1.23.05-2.17-1.24-2.96-2.38-1.6-2.33-2.83-6.58-1.18-9.45.82-1.43 2.28-2.33 3.87-2.35 1.21-.02 2.35.82 3.09.82.74 0 2.13-1.01 3.59-.86.61.03 2.33.25 3.43 1.86-.09.06-2.05 1.2-2.01 3.51ZM14.02 5.6c.65-.79 1.09-1.89.97-2.98-.94.04-2.07.63-2.75 1.41-.6.7-1.13 1.82-.99 2.89 1.05.08 2.12-.53 2.77-1.32Z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M4.2 2.6 13.6 12l-9.4 9.4a1.3 1.3 0 0 1-.5-1V3.6c0-.4.2-.8.5-1Z" fill="#00C864" />
      <path d="m16.7 8.9-3.1 3.1-9.4-9.4c.3-.3.9-.4 1.4-.1l11.1 6.4Z" fill="#8BE6B4" />
      <path d="m16.7 15.1-11.1 6.4c-.5.3-1.1.2-1.4-.1l9.4-9.4 3.1 3.1Z" fill="#00824A" />
      <path d="m20.2 10.9-3.5-2-3.1 3.1 3.1 3.1 3.5-2c.8-.5.8-1.7 0-2.2Z" fill="#E7EEE9" />
    </svg>
  );
}

export function StoreBadges({ tone = 'ink' }: { tone?: 'ink' | 'paper' }) {
  const { openEarlyAccess } = useActions();
  const stores = [
    { name: 'App Store', kicker: 'Download on the', url: launch.appStoreUrl, glyph: <AppleGlyph /> },
    { name: 'Google Play', kicker: 'Get it on', url: launch.googlePlayUrl, glyph: <PlayGlyph /> },
  ];
  const base =
    tone === 'paper'
      ? 'border-white/15 text-paper hover:border-white/40'
      : 'border-ink/15 bg-paper text-ink hover:border-ink/40';

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {stores.map((store) => {
        const content = (
          <>
            {store.glyph}
            <span className="text-left leading-none">
              <span className="block text-[10px] opacity-60">{isAvailable ? store.kicker : 'Coming soon to'}</span>
              <span className="mt-1 block text-[13px] font-semibold">{store.name}</span>
            </span>
          </>
        );
        const className = `inline-flex items-center gap-2.5 rounded-xl border px-3.5 py-2 transition-colors ${base}`;
        return isAvailable && store.url ? (
          <a key={store.name} href={store.url} target="_blank" rel="noreferrer" className={className}>
            {content}
          </a>
        ) : (
          <button key={store.name} type="button" onClick={openEarlyAccess} className={className} aria-label={`${store.name}: coming soon. Get early access`}>
            {content}
          </button>
        );
      })}
    </div>
  );
}
