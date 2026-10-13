import { useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { submitLead, type LeadKind } from '../config/leads';
import { launch } from '../config/launch';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function useLead(kind: LeadKind) {
  const [status, setStatus] = useState<Status>('idle');
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    // Honeypot: people never see this field, bots usually fill it.
    if (form.get('website')) return setStatus('sent');
    const data: Record<string, string> = {};
    form.forEach((value, key) => {
      if (key !== 'website') data[key] = String(value);
    });
    setStatus('sending');
    try {
      await submitLead(kind, data);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };
  return { status, submit };
}

function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function SubmitButton({ status, children, className = 'btn-primary' }: { status: Status; children: ReactNode; className?: string }) {
  return (
    <button type="submit" disabled={status === 'sending'} className={`${className} shrink-0 disabled:opacity-70`}>
      {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

function ErrorNote({ status }: { status: Status }) {
  if (status !== 'error') return null;
  return (
    <p role="alert" className="mt-3 text-sm text-[#B42318]">
      That didn't go through. Check your connection and send it again.
    </p>
  );
}

export function Confirmation({ title, body, onDone, tone = 'light' }: { title: string; body: string; onDone?: () => void; tone?: 'light' | 'dark' }) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal text-ink">
        <Check className="h-5 w-5" strokeWidth={2.5} />
      </span>
      <div>
        <p className={`text-lg font-semibold ${tone === 'dark' ? 'text-paper' : 'text-ink'}`}>{title}</p>
        <p className={`mt-1 text-[15px] ${tone === 'dark' ? 'text-paper/65' : 'text-slate'}`}>{body}</p>
        {onDone && (
          <button type="button" onClick={onDone} className="btn-ink mt-5 px-5 py-2.5 text-sm">
            Done
          </button>
        )}
      </div>
    </motion.div>
  );
}

/** Email-only early access signup. `tone="dark"` for use on ink backgrounds. */
export function EarlyAccessForm({ onDone, tone = 'light' }: { onDone?: () => void; tone?: 'light' | 'dark' }) {
  const { status, submit } = useLead('early-access');
  if (status === 'sent') {
    return (
      <Confirmation
        tone={tone}
        title="You're on the list"
        body={`We'll email your download link the moment VEXU launches in ${launch.market}.`}
        onDone={onDone}
      />
    );
  }
  return (
    <form onSubmit={submit} className="relative">
      <Honeypot />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`early-email-${tone}`}>
          Email address
        </label>
        <input
          id={`early-email-${tone}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={
            tone === 'dark'
              ? 'field rounded-full border-white/15 bg-white/5 px-5 text-paper placeholder:text-paper/40 focus:border-signal focus:ring-signal/20'
              : 'field rounded-full px-5'
          }
        />
        <SubmitButton status={status}>Get early access</SubmitButton>
      </div>
      <ErrorNote status={status} />
    </form>
  );
}

export function DemoForm({ onDone }: { onDone?: () => void }) {
  const { status, submit } = useLead('demo');
  if (status === 'sent') {
    return <Confirmation title="Demo requested" body="A VEXU specialist will email you within one business day to set a time." onDone={onDone} />;
  }
  return (
    <form onSubmit={submit} className="relative grid gap-4">
      <Honeypot />
      <label>
        <span className="label">Work email</span>
        <input name="email" type="email" required autoComplete="email" className="field" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="label">Your name</span>
          <input name="name" required autoComplete="name" className="field" />
        </label>
        <label>
          <span className="label">Company</span>
          <input name="company" required autoComplete="organization" className="field" />
        </label>
      </div>
      <SubmitButton status={status} className="btn-primary mt-1 w-full">
        Request a demo
      </SubmitButton>
      <ErrorNote status={status} />
    </form>
  );
}

const subjects = ['Early access', 'Partnership', 'Enterprise', 'Press', 'Something else'];

export function ContactForm() {
  const { status, submit } = useLead('contact');
  if (status === 'sent') {
    return (
      <div className="panel flex min-h-[26rem] items-center p-8 sm:p-10">
        <Confirmation title="Message sent" body="Thanks for writing. A person on the VEXU team will reply by email, usually within a day." />
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="panel relative grid gap-5 p-6 sm:grid-cols-2 sm:p-9">
      <Honeypot />
      <label>
        <span className="label">Name</span>
        <input name="name" required autoComplete="name" className="field" />
      </label>
      <label>
        <span className="label">Email</span>
        <input name="email" type="email" required autoComplete="email" className="field" />
      </label>
      <label>
        <span className="label">
          Company <span className="text-slate/70">(optional)</span>
        </span>
        <input name="company" autoComplete="organization" className="field" />
      </label>
      <label>
        <span className="label">What's it about?</span>
        <span className="relative block">
          <select name="subject" required defaultValue="" className="field appearance-none pr-10">
            <option value="" disabled>
              Choose a topic
            </option>
            {subjects.map((subject) => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" aria-hidden="true" />
        </span>
      </label>
      <label className="sm:col-span-2">
        <span className="label">Message</span>
        <textarea name="message" required rows={5} className="field resize-y" />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate">A person reads every message.</p>
        <SubmitButton status={status}>Send message</SubmitButton>
      </div>
      <div className="sm:col-span-2">
        <ErrorNote status={status} />
      </div>
    </form>
  );
}
