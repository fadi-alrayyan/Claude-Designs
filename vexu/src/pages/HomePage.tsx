import { Link } from 'react-router-dom';
import { ArrowUpRight, BookUser, Brain, Mic, MessageSquareText, PhoneIncoming, SlidersHorizontal } from 'lucide-react';
import { useActions } from '../components/Actions';
import { CallConsole } from '../components/CallConsole';
import { EarlyAccessForm } from '../components/Forms';
import { FlowGraph } from '../components/FlowGraph';
import { LiveCommandsFragment } from '../components/Fragments';
import { SectionHeading, Tag } from '../components/Section';
import { StoreBadges } from '../components/StoreBadges';
import { usePageMeta } from '../components/usePageMeta';
import { isAvailable, launch } from '../config/launch';

const facts = ['Works on any carrier', 'No new number, no SIM swap', 'On in about a minute', 'International patent pending'];

const steps = [
  { title: 'Download VEXU', copy: 'Choose how your assistant sounds, how it greets people, and what it can help with.' },
  { title: 'Turn on forwarding', copy: 'One guided step for your carrier. Your number, phone and plan stay exactly as they are.' },
  { title: 'Get on with your day', copy: "VEXU answers the calls you can't take and sends you what happened, seconds after they hang up." },
];

const features = [
  { icon: PhoneIncoming, title: 'Real conversations', copy: 'Callers talk to an assistant that understands them. No voicemail beep, no phone menu.' },
  { icon: MessageSquareText, title: 'Summaries you can act on', copy: 'Who called, what they wanted and what was handled, in three lines.' },
  { icon: SlidersHorizontal, title: 'Live commands', copy: 'Text VEXU during the call to steer it. The caller never knows.' },
  { icon: Brain, title: 'Memory', copy: 'Returning callers are recognised, and the context of past calls carries over.' },
  { icon: Mic, title: 'Voice design', copy: 'Describe the voice you want in plain words. VEXU speaks with it.' },
  { icon: BookUser, title: 'Caller rules', copy: 'Your mother, your biggest client and a robocall each get handled differently.' },
];

export function HomePage() {
  const { openEarlyAccess } = useActions();
  usePageMeta(
    'VEXU: AI that answers your phone, on your number',
    `VEXU is the AI assistant that answers calls on your existing phone number. Real conversations, instant summaries, live control. Launching in ${launch.market}.`,
  );

  return (
    <>
      {/* Hero: the live call is the first thing you see. */}
      <section className="relative overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1fr_1.02fr] lg:gap-16">
          <div>
            <Tag>{isAvailable ? `Available now in ${launch.market}` : `Launching in ${launch.market}, ${launch.date}`}</Tag>
            <h1 className="h1 mt-7">
              Keep your number.
              <br />
              Add AI.
            </h1>
            <p className="lede mt-7">
              VEXU answers your existing phone number when you can't. It holds a real conversation, then tells you who called, what they
              wanted and what it already handled.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button type="button" onClick={openEarlyAccess} className="btn-primary">
                Get early access
              </button>
              <a href="#how-it-works" className="btn-secondary">
                How it works
              </a>
            </div>
            <div className="mt-8">
              <StoreBadges />
            </div>
          </div>
          <CallConsole />
        </div>

        <div className="shell mt-20">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-7 text-[15px] text-slate lg:grid-cols-4">
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-deep" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
        </div>
      </section>

      {/* How it works: a genuine three-step sequence. */}
      <section id="how-it-works" className="section bg-paper" aria-labelledby="how-title">
        <div className="shell">
          <SectionHeading
            id="how-title"
            title="On in a minute. Off in a second."
            lede="No new number, no hardware, no second app on the caller's side. VEXU uses call forwarding, a feature every carrier already has, and you can switch it off any time."
          />
          <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <div className="flex items-center gap-4">
                  <span className="wide flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-[15px] font-semibold">
                    {index + 1}
                  </span>
                  {index < steps.length - 1 && <span className="hidden h-px flex-1 bg-line md:block" aria-hidden="true" />}
                </div>
                <h3 className="h3 mt-6">{step.title}</h3>
                <p className="mt-2 max-w-sm text-slate">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for + capabilities as a quiet list, not a card grid. */}
      <section className="section" aria-labelledby="features-title">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="features-title"
              title="For people whose calls are worth money."
              lede="Every unanswered call is a client deciding to try someone else. Consultants, brokers, doctors and founders use VEXU so the call they miss is still a call they took."
            />
            <Link to="/app" className="link mt-8 inline-flex items-center gap-1.5">
              See every app feature <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {features.map(({ icon: Icon, title, copy }) => (
              <li key={title} className="grid grid-cols-[2.75rem_1fr] gap-4 py-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-signal-deep">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="h3">{title}</h3>
                  <p className="mt-1.5 text-slate">{copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Live commands spotlight */}
      <section className="section bg-ink text-paper" aria-labelledby="commands-title">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Tag tone="dark">International patent pending</Tag>
            <h2 id="commands-title" className="h2 mt-7">
              Steer the call without joining it.
            </h2>
            <p className="lede mt-6 text-paper/65">
              While VEXU is talking, you see the conversation live. Text it a quiet instruction: offer Thursday instead, take a message, put
              them through. It adjusts on the spot, and the caller never hears you type.
            </p>
          </div>
          <LiveCommandsFragment />
        </div>
      </section>

      {/* Portal teaser */}
      <section className="section" aria-labelledby="portal-title">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              id="portal-title"
              title="For your business, a whole front line."
              lede="The VEXU Portal lets you build AI agents for calls, WhatsApp and web chat on a visual canvas, without code, running on the same engine that answers your own phone."
            />
            <Link to="/portal" className="btn-ink shrink-0">
              Explore the Portal
            </Link>
          </div>
          <div className="mt-14">
            <FlowGraph />
          </div>
        </div>
      </section>

      {/* Closing CTA with the form inline: one step, no modal. */}
      <section className="section bg-mist" aria-labelledby="cta-title">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h2 id="cta-title" className="h2">
              Make this the last call you miss.
            </h2>
            <p className="lede mt-5">
              Early access members download first and keep launch pricing for their first year.{' '}
              <Link to="/pricing" className="link">
                See plans
              </Link>
            </p>
          </div>
          <EarlyAccessForm />
        </div>
      </section>
    </>
  );
}
