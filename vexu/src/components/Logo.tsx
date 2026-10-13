export function Logo({ tone = 'ink' }: { tone?: 'ink' | 'paper' }) {
  return (
    <span className="inline-flex items-center gap-2">
      {/* The SVG carries its own drop-shadow padding, so it's scaled to sit optically at 32px. */}
      <img src="/vexu_logo.svg" alt="" width={44} height={44} className="-m-1.5 h-11 w-11" />
      <span className={`wide text-[1.4rem] font-semibold tracking-[-0.05em] ${tone === 'paper' ? 'text-paper' : 'text-ink'}`}>vexu</span>
    </span>
  );
}
