import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Pause, Play, RotateCcw } from 'lucide-react';

/**
 * The hero's live call: a scripted conversation driven by a single clock `t` (ms).
 * Everything on screen (status, timer, waveform, words spoken, captured details,
 * summary) is derived from `t`, so pause/replay are just "stop the clock" / "t = 0".
 */

type Speaker = 'vexu' | 'caller';
type Line = { speaker: Speaker; text: string; capture?: [string, string] };

const CALLER = { name: 'Sarah Mitchell', initials: 'SM', company: 'Northstar Advisory' };

const script: Line[] = [
  { speaker: 'vexu', text: "Hi Sarah. Fadi's in a meeting right now. I'm VEXU, his assistant. How can I help?" },
  { speaker: 'caller', text: "I'm calling about a partnership. I'd like to set up a meeting with Fadi.", capture: ['Reason', 'Partnership'] },
  { speaker: 'vexu', text: 'Of course. What would the partnership cover?' },
  { speaker: 'caller', text: "We help tech companies launch in the US. We'd love to support VEXU's launch.", capture: ['Context', 'US launch support'] },
  { speaker: 'vexu', text: 'Understood. When would suit you to meet?' },
  { speaker: 'caller', text: 'Tuesday or Wednesday afternoon works for me.', capture: ['Prefers', 'Tue or Wed, afternoon'] },
  { speaker: 'vexu', text: 'Fadi is free Wednesday at 3:00 PM. Shall I send the invite to your usual email?' },
  { speaker: 'caller', text: 'Perfect. Thank you!', capture: ['Booked', 'Wed, 3:00 PM'] },
];

const RING = 2000;
const GAP = 520;
const WORD_MS = { vexu: 235, caller: 265 };
const END_HOLD = 1300;
const SUMMARY_HOLD = 7000;

type TimedLine = Line & { start: number; end: number; words: string[] };

function buildTimeline() {
  let cursor = RING + 400;
  const lines: TimedLine[] = script.map((line) => {
    const words = line.text.split(' ');
    const start = cursor;
    const end = start + words.length * WORD_MS[line.speaker];
    cursor = end + GAP;
    return { ...line, start, end, words };
  });
  const callEnd = cursor;
  const summaryAt = callEnd + END_HOLD;
  return { lines, callEnd, summaryAt, total: summaryAt + SUMMARY_HOLD };
}

const stages = ['Answer', 'Understand', 'Act', 'Summarize'] as const;
const BARS = 48;

function formatClock(ms: number) {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export function CallConsole() {
  const reducedMotion = useReducedMotion();
  const timeline = useMemo(buildTimeline, []);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Reduced motion: show the finished call, play only on request.
  useEffect(() => {
    if (reducedMotion) {
      setPlaying(false);
      setT(timeline.summaryAt);
    }
  }, [reducedMotion, timeline.summaryAt]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    let frame = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      const delta = Math.min(now - last, 100);
      last = now;
      acc += delta;
      if (acc >= 33) {
        const step = acc;
        acc = 0;
        setT((value) => {
          const next = value + step;
          if (next < timeline.total) return next;
          if (reducedMotion) {
            setPlaying(false);
            return timeline.summaryAt;
          }
          return 0;
        });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, visible, timeline, reducedMotion]);

  const phase: 'ringing' | 'live' | 'ended' | 'summary' =
    t < RING ? 'ringing' : t < timeline.callEnd ? 'live' : t < timeline.summaryAt ? 'ended' : 'summary';

  const activeLine = timeline.lines.find((line) => t >= line.start && t < line.end);
  const spoken = timeline.lines.filter((line) => t >= line.start);
  const captures = timeline.lines.filter((line) => line.capture && t >= line.end).map((line) => line.capture!);

  const stageIndex =
    phase === 'ringing' ? 0 : phase === 'summary' ? 3 : t >= timeline.lines[6].start ? 2 : t >= timeline.lines[1].start ? 1 : 0;

  const clock = phase === 'ringing' ? 0 : Math.min(t, timeline.callEnd) - RING;

  const replay = () => {
    setT(0);
    setPlaying(true);
  };

  return (
    <div ref={rootRef} className="relative">
      {/* A single soft field of signal light behind the instrument. */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,100,0.22),transparent)] blur-2xl" />

      <figure className="instrument" aria-label="Demonstration: VEXU answering a missed call, capturing details and booking a meeting">
        <p className="sr-only">
          A caller, Sarah Mitchell from Northstar Advisory, phones while Fadi is in a meeting. VEXU answers, learns she wants to discuss a
          partnership, books a meeting for Wednesday at 3:00 PM, and sends Fadi a summary of the call.
        </p>

        <div aria-hidden="true">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-5 sm:px-7 sm:pt-6">
            <StatusPill phase={phase} />
            <span className="tnum text-sm text-paper/55">{formatClock(clock)}</span>
          </div>

          {/* Caller */}
          <div className="mt-5 flex items-center gap-4 px-5 sm:px-7">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-3 text-[15px] font-semibold text-paper">
              {CALLER.initials}
              {phase === 'ringing' && !reducedMotion && (
                <>
                  <span className="absolute inset-0 animate-ping rounded-full border border-signal/60" />
                </>
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[1.05rem] font-semibold">{CALLER.name}</p>
              <p className="truncate text-sm text-paper/55">{CALLER.company}</p>
            </div>
            <span className="ml-auto hidden rounded-full border border-white/10 px-3 py-1 text-xs text-paper/60 sm:inline">Known contact</span>
          </div>

          <Waveform t={t} speaker={phase === 'live' ? activeLine?.speaker : undefined} />

          {/* Transcript or summary: fixed height so the page never jumps. */}
          <div className="relative h-[17.5rem] border-t border-white/[0.07] sm:h-[16.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              {phase === 'summary' ? (
                <Summary key="summary" />
              ) : (
                <motion.div
                  key="transcript"
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex flex-col justify-end gap-3.5 overflow-hidden px-5 pb-5 sm:px-7 [mask-image:linear-gradient(to_bottom,transparent,black_38%)]"
                >
                  {phase === 'ringing' && <p className="text-[15px] text-paper/55">You're in a meeting. VEXU is picking up for you.</p>}
                  {spoken.map((line) => (
                    <TranscriptLine key={line.start} line={line} t={t} />
                  ))}
                  {phase === 'ended' && <p className="text-sm text-paper/45">Call ended. Writing your summary.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Captured details */}
          <div className="flex h-[4.25rem] flex-nowrap items-center gap-2 overflow-hidden border-t border-white/[0.07] px-5 sm:px-7 [mask-image:linear-gradient(to_right,black_82%,transparent)]">
            {captures.length === 0 ? (
              <span className="text-sm text-paper/35">Details appear here as VEXU learns them.</span>
            ) : (
              [...captures].reverse().map(([label, value]) => (
                <motion.span
                  key={label}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex shrink-0 items-baseline gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-[13px]"
                >
                  <span className="text-paper/45">{label}</span>
                  <span className="font-medium text-paper">{value}</span>
                </motion.span>
              ))
            )}
          </div>
        </div>
      </figure>

      {/* Stage progress and controls, outside the instrument so they read as page UI. */}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => (phase === 'summary' && !playing ? replay() : setPlaying((value) => !value))}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition hover:border-ink/40"
          aria-label={playing ? 'Pause the call demo' : 'Play the call demo'}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
        <ol className="flex flex-1 items-center gap-1.5" aria-label="Call stages">
          {stages.map((stage, index) => (
            <li key={stage} className="flex-1" aria-current={index === stageIndex ? 'step' : undefined}>
              <span className={`block h-[3px] rounded-full transition-colors duration-500 ${index <= stageIndex ? 'bg-signal' : 'bg-ink/10'}`} />
              <span className={`mt-1.5 text-xs transition-colors ${index === stageIndex ? 'block font-medium text-ink' : 'hidden text-slate/70 sm:block'}`}>{stage}</span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={replay}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate transition hover:bg-mist hover:text-ink"
          aria-label="Replay the call demo from the start"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function StatusPill({ phase }: { phase: 'ringing' | 'live' | 'ended' | 'summary' }) {
  const label = { ringing: 'Incoming call', live: 'VEXU is on the call', ended: 'Call ended', summary: 'Summary ready' }[phase];
  const dot = phase === 'live' ? 'bg-signal shadow-[0_0_12px_rgba(0,200,100,0.9)]' : phase === 'ringing' ? 'bg-signal-soft animate-pulse' : 'bg-paper/40';
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-paper/85">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function Waveform({ t, speaker }: { t: number; speaker?: Speaker }) {
  const bars = Array.from({ length: BARS }, (_, i) => {
    if (!speaker) return 0.07 + 0.03 * Math.sin(t / 600 + i * 0.5);
    const s = t / 1000;
    // Layered sines give an organic, voice-like envelope without randomness.
    const envelope = Math.sin((i / BARS) * Math.PI) * 0.6 + 0.4;
    const energy = Math.abs(Math.sin(s * 7.3 + i * 0.9) * 0.55 + Math.sin(s * 13.1 + i * 2.1) * 0.3 + Math.sin(s * 3.7 + i * 0.35) * 0.35);
    return Math.min(1, 0.12 + energy * envelope);
  });
  const color = speaker === 'vexu' ? 'bg-signal' : speaker === 'caller' ? 'bg-paper/80' : 'bg-paper/25';
  return (
    <div className="flex h-16 items-center justify-between px-5 sm:px-7">
      {bars.map((height, index) => (
        <span key={index} className={`w-[3px] rounded-full ${color} transition-colors duration-300`} style={{ height: `${Math.max(6, height * 100)}%` }} />
      ))}
    </div>
  );
}

function TranscriptLine({ line, t }: { line: TimedLine; t: number }) {
  const elapsed = t - line.start;
  const count = Math.min(line.words.length, Math.floor(elapsed / WORD_MS[line.speaker]) + 1);
  const speaking = t < line.end;
  return (
    <div className="grid grid-cols-[3.75rem_1fr] gap-3 text-[15px] leading-snug">
      <span className={`pt-px text-[13px] font-medium ${line.speaker === 'vexu' ? 'text-signal' : 'text-paper/45'}`}>
        {line.speaker === 'vexu' ? 'VEXU' : 'Sarah'}
      </span>
      <p className="text-paper/90">
        {line.words.slice(0, count).join(' ')}
        {speaking && <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-paper/60" />}
      </p>
    </div>
  );
}

function Summary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex flex-col px-5 py-5 sm:px-7"
    >
      <p className="text-[13px] font-medium text-signal">Sent to Fadi, 2 seconds after the call</p>
      <p className="wide mt-2 text-[1.35rem] font-semibold leading-tight tracking-[-0.02em]">Sarah wants to talk partnership.</p>
      <p className="mt-3 text-[15px] leading-relaxed text-paper/70">
        Northstar Advisory helps tech companies launch in the US and would like to support VEXU's launch.
      </p>
      <div className="mt-auto flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal text-ink">
          <CalendarCheck className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0 text-sm">
          <p className="font-medium text-paper">Wednesday, 3:00 PM</p>
          <p className="truncate text-paper/55">Invite sent to sarah@northstaradvisory.com</p>
        </div>
      </div>
    </motion.div>
  );
}
