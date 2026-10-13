import { Check, FileSpreadsheet, FileText, Play, Sparkles, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Coded product fragments. Each is a faithful slice of VEXU UI, drawn in HTML so it
 * stays crisp, themeable and light, instead of exported screenshots.
 */

export function LiveCommandsFragment() {
  return (
    <div className="instrument p-5 sm:p-6" role="img" aria-label="Mid-call, the user silently texts VEXU 'Offer Thursday instead' and VEXU offers the caller Thursday at 2:30 PM.">
      <div aria-hidden="true">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <p className="font-semibold">Sarah Mitchell</p>
            <p className="mt-0.5 flex items-center gap-2 text-sm text-paper/55">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_rgba(0,200,100,0.9)]" /> VEXU is on the call
            </p>
          </div>
          <span className="tnum text-sm text-paper/45">1:12</span>
        </div>
        <div className="mt-5 grid gap-3 text-[15px]">
          <Bubble who="Sarah">Could we move tomorrow's meeting?</Bubble>
          <Bubble who="VEXU" tone="vexu">
            I can help with that. Let me check what's free.
          </Bubble>
          <div className="ml-auto max-w-[80%] text-right">
            <p className="mb-1 text-xs text-paper/45">Your silent command</p>
            <p className="inline-block rounded-2xl rounded-br-md bg-signal px-4 py-2.5 text-left font-medium text-ink">Offer Thursday instead</p>
          </div>
          <Bubble who="VEXU" tone="vexu">
            Thursday at 2:30 PM is open. Shall I book it?
          </Bubble>
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-sm text-paper/35">
          <Zap className="h-4 w-4" /> Type a command. The caller never hears it.
        </div>
      </div>
    </div>
  );
}

function Bubble({ who, tone, children }: { who: string; tone?: 'vexu'; children: ReactNode }) {
  return (
    <div className="max-w-[85%]">
      <p className={`mb-1 text-xs ${tone === 'vexu' ? 'text-signal' : 'text-paper/45'}`}>{who}</p>
      <p className={`rounded-2xl rounded-bl-md px-4 py-2.5 ${tone === 'vexu' ? 'bg-signal/[0.12] text-paper' : 'bg-white/[0.07] text-paper/90'}`}>{children}</p>
    </div>
  );
}

export function VoiceDesignFragment({ name = 'Avery' }: { name?: string }) {
  const bars = [0.3, 0.55, 0.8, 0.45, 0.9, 0.6, 0.35, 0.75, 1, 0.5, 0.65, 0.4, 0.85, 0.55, 0.3, 0.7, 0.95, 0.45, 0.6, 0.35, 0.8, 0.5, 0.25, 0.6];
  return (
    <div className="panel p-5 shadow-[0_30px_60px_-30px_rgba(16,32,26,0.25)] sm:p-7" role="img" aria-label={`Voice design: a plain-language brief generates a voice called ${name}.`}>
      <div aria-hidden="true">
        <p className="text-sm font-medium text-slate">Describe the voice</p>
        <p className="mt-2 rounded-2xl bg-porcelain p-4 text-[15px] leading-relaxed text-ink">
          “Warm, confident and polished. Calm pacing, like a trusted executive assistant.”
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm text-signal-deep">
          <Sparkles className="h-4 w-4" /> Voice generated
        </div>
        <div className="mt-5 flex items-center gap-4 rounded-2xl border border-line p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
            <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <p className="font-semibold">{name}</p>
              <p className="tnum text-xs text-slate">0:24</p>
            </div>
            <div className="mt-2 flex h-7 items-center gap-[3px]">
              {bars.map((height, index) => (
                <span key={index} className={`flex-1 rounded-full ${index < 9 ? 'bg-signal' : 'bg-ink/15'}`} style={{ height: `${height * 100}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Warm', 'Polished', 'Confident'].map((tag) => (
            <span key={tag} className="rounded-full bg-mist px-3 py-1 text-sm text-ink">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function KnowledgeFragment() {
  const files = [
    { icon: FileText, name: 'Services overview.pdf', meta: '18 pages' },
    { icon: FileSpreadsheet, name: 'Product catalogue.xlsx', meta: '42 rows' },
    { icon: FileText, name: 'Support handbook.docx', meta: '26 pages' },
  ];
  return (
    <div className="panel p-5 shadow-[0_30px_60px_-30px_rgba(16,32,26,0.25)] sm:p-7" role="img" aria-label="Three uploaded documents are indexed, and the agent answers a question citing the services overview.">
      <div aria-hidden="true">
        <p className="text-sm font-medium text-slate">Knowledge base</p>
        <ul className="mt-3 divide-y divide-line rounded-2xl border border-line">
          {files.map(({ icon: Icon, name, meta }) => (
            <li key={name} className="flex items-center gap-3 px-4 py-3">
              <Icon className="h-4 w-4 shrink-0 text-slate" />
              <span className="min-w-0 flex-1 truncate text-[15px]">{name}</span>
              <span className="hidden text-sm text-slate sm:inline">{meta}</span>
              <span className="flex items-center gap-1 text-sm text-signal-deep">
                <Check className="h-3.5 w-3.5" /> Indexed
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-2xl bg-ink p-4 text-paper">
          <p className="text-sm text-paper/55">Caller: “Does Enterprise include onboarding?”</p>
          <p className="mt-2 text-[15px] leading-relaxed">“Yes. The Enterprise plan includes priority onboarding and custom integrations.”</p>
          <p className="mt-3 text-xs text-signal-soft">Source: Services overview.pdf, page 4</p>
        </div>
      </div>
    </div>
  );
}

export function CalendarFragment() {
  const slots = [
    { time: '9:00', label: 'Team stand-up', state: 'busy' },
    { time: '11:00', label: 'Investor update', state: 'busy' },
    { time: '1:00', label: 'Open', state: 'free' },
    { time: '2:30', label: 'Sarah Mitchell, project review', state: 'booked' },
    { time: '4:00', label: 'Open', state: 'free' },
  ] as const;
  return (
    <div className="panel p-5 shadow-[0_30px_60px_-30px_rgba(16,32,26,0.25)] sm:p-7" role="img" aria-label="Thursday's calendar: VEXU booked Sarah Mitchell at 2:30 PM in an open slot.">
      <div aria-hidden="true">
        <div className="flex items-baseline justify-between">
          <p className="wide text-xl font-semibold">Thursday</p>
          <p className="text-sm text-slate">Synced with Outlook</p>
        </div>
        <ul className="mt-5 grid gap-2">
          {slots.map((slot) => (
            <li key={slot.time} className="grid grid-cols-[3rem_1fr] items-center gap-3">
              <span className="tnum text-sm text-slate">{slot.time}</span>
              <span
                className={`rounded-xl px-4 py-3 text-[15px] ${
                  slot.state === 'booked'
                    ? 'bg-signal font-medium text-ink'
                    : slot.state === 'busy'
                      ? 'bg-porcelain text-slate'
                      : 'border border-dashed border-line text-slate/70'
                }`}
              >
                {slot.label}
                {slot.state === 'booked' && <span className="mt-0.5 block text-xs font-normal text-ink/70">Booked by VEXU during the call. Invite sent.</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ActionsFragment() {
  const steps = [
    ['Send email', 'Proposal follow-up'],
    ['WhatsApp message', 'Confirmation sent'],
    ['Calendar event', 'Demo on Friday, 10:00 AM'],
    ['HTTP request', 'CRM lead marked qualified'],
  ];
  return (
    <div className="panel p-5 shadow-[0_30px_60px_-30px_rgba(16,32,26,0.25)] sm:p-7" role="img" aria-label="After a customer asks for a proposal, the agent sends an email and WhatsApp message, creates a calendar event and updates the CRM.">
      <div aria-hidden="true">
        <p className="text-sm font-medium text-slate">When</p>
        <p className="mt-1 text-[1.1rem] font-semibold">A customer asks for a proposal</p>
        <ol className="relative mt-6 grid gap-4 border-l border-line pl-6">
          {steps.map(([title, detail]) => (
            <li key={title} className="relative">
              <span className="absolute -left-[33px] top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-signal text-ink">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-slate">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function AnalyticsFragment() {
  const weeks = [42, 55, 49, 63, 71, 66, 80, 92];
  const max = Math.max(...weeks);
  return (
    <div className="panel p-5 shadow-[0_30px_60px_-30px_rgba(16,32,26,0.25)] sm:p-7" role="img" aria-label="Sample workspace dashboard: conversations handled are rising week over week, and spend is on track against budget.">
      <div aria-hidden="true">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium text-slate">Sample workspace, last 30 days</p>
          <p className="flex items-center gap-1.5 text-sm text-signal-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Live
          </p>
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-3">
          {[
            ['Calls', '1,284'],
            ['Messages', '3,912'],
            ['Meetings', '146'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-porcelain p-3.5">
              <dt className="text-sm text-slate">{label}</dt>
              <dd className="tnum wide mt-1 text-[1.4rem] font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex h-28 items-end gap-2">
          {weeks.map((value, index) => (
            <span key={index} className={`flex-1 rounded-t-md ${index === weeks.length - 1 ? 'bg-signal' : 'bg-ink/[0.12]'}`} style={{ height: `${(value / max) * 100}%` }} />
          ))}
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-sm">
            <span className="text-slate">Spend this month</span>
            <span className="tnum font-medium">412 of 600 credits</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-porcelain">
            <div className="h-full w-[69%] rounded-full bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}
