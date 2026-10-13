import { CalendarCheck, PhoneIncoming, ShieldX } from 'lucide-react';

const calls = [
  { name: 'Sarah Mitchell', summary: 'Partnership for the US launch. Meeting booked Wed, 3:00 PM.', time: '2:41 PM', icon: CalendarCheck, tag: 'Booked' },
  { name: 'Dr. Amir Haddad', summary: 'Moving Friday follow-up to next week. Asked for a call back.', time: '1:15 PM', icon: PhoneIncoming, tag: 'Call back' },
  { name: 'Mom', summary: 'Put straight through, as your rules say.', time: '12:02 PM', icon: PhoneIncoming, tag: 'Put through' },
  { name: 'Unknown number', summary: 'Extended warranty offer. Politely declined.', time: '11:48 AM', icon: ShieldX, tag: 'Blocked' },
  { name: 'James Okafor', summary: 'Wants the revised term sheet before Thursday.', time: '10:20 AM', icon: PhoneIncoming, tag: 'Message' },
];

/** A coded phone showing the VEXU app's call inbox. */
export function PhoneAppScreen() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem]">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,100,0.2),transparent)] blur-2xl" />
      <div
        className="rounded-[3.2rem] bg-ink p-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_50px_90px_-35px_rgba(16,32,26,0.6)]"
        role="img"
        aria-label="The VEXU app inbox: five calls handled today, each with a one-line summary and outcome such as meeting booked, call back or blocked."
      >
        <div className="relative overflow-hidden rounded-[2.6rem] bg-porcelain" aria-hidden="true">
          <div className="absolute left-1/2 top-2.5 h-7 w-24 -translate-x-1/2 rounded-full bg-ink" />
          <div className="px-5 pb-6 pt-14">
            <p className="text-sm text-slate">Thursday</p>
            <p className="wide mt-0.5 text-[1.7rem] font-semibold tracking-[-0.03em]">Today</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-ink p-3 text-paper">
                <p className="tnum wide text-2xl font-semibold">5</p>
                <p className="text-xs text-paper/60">calls handled</p>
              </div>
              <div className="rounded-2xl bg-signal p-3 text-ink">
                <p className="tnum wide text-2xl font-semibold">1</p>
                <p className="text-xs text-ink/70">meeting booked</p>
              </div>
            </div>
            <ul className="mt-4 grid gap-2">
              {calls.map(({ name, summary, time, icon: Icon, tag }) => (
                <li key={name} className="rounded-2xl bg-paper p-3.5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-signal-deep" />
                    <p className="flex-1 truncate text-sm font-semibold">{name}</p>
                    <p className="tnum text-[11px] text-slate">{time}</p>
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-slate">{summary}</p>
                  <p className="mt-2 inline-block rounded-full bg-mist px-2 py-0.5 text-[11px] font-medium text-ink">{tag}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
