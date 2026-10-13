import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useActions } from '../components/Actions';
import { FlowGraph } from '../components/FlowGraph';
import { ActionsFragment, AnalyticsFragment, CalendarFragment, KnowledgeFragment, VoiceDesignFragment } from '../components/Fragments';
import { SectionHeading, Tag } from '../components/Section';
import { usePageMeta } from '../components/usePageMeta';

const goLive = [
  ['Build your agent', 'Drag, drop and describe what it should do. No code.'],
  ['Forward your number', 'One carrier setting. No hardware, no new phone system.'],
  ["You're live", 'Calls answered, meetings booked, everything logged.'],
];

const noProject = ['No IT infrastructure', 'No integration project', 'Keep your existing number', 'Live in a day'];

const actionTypes = ['HTTP request', 'Send email', 'WhatsApp message', 'Phone call', 'Calendar event', 'Google Drive', 'Custom Python', 'Log'];

function FeatureRow({ id, title, lede, children, reverse = false, extra }: { id: string; title: string; lede: string; children: ReactNode; reverse?: boolean; extra?: ReactNode }) {
  return (
    <section className="section" aria-labelledby={id}>
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className={reverse ? 'lg:order-last' : ''}>
          <SectionHeading id={id} title={title} lede={lede} size="md" />
          {extra}
        </div>
        {children}
      </div>
    </section>
  );
}

export function PortalPage() {
  const { openDemo, openEarlyAccess } = useActions();
  usePageMeta(
    'VEXU Portal: build AI voice and chat agents for your business, no code',
    'Design AI agents on a visual canvas. Answer calls, WhatsApp and web chat, connect your knowledge and calendars, and automate actions without code.',
  );

  return (
    <>
      <section className="overflow-hidden pb-16 pt-28 sm:pt-36">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <Tag>VEXU Portal, for business</Tag>
              <h1 className="h1 mt-7">Your AI front line. Built by you, without code.</h1>
            </div>
            <div>
              <p className="lede">
                Turn a visual canvas into working agents that answer calls, WhatsApp and web chat, armed with your knowledge, wired to your
                calendar, and taking real actions around the clock.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={openDemo} className="btn-primary">
                  Book a demo
                </button>
                <button type="button" onClick={openEarlyAccess} className="btn-secondary">
                  Get early access
                </button>
              </div>
            </div>
          </div>
          <figure className="relative mt-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] -bottom-10 top-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(0,200,100,0.18),transparent)] blur-2xl" />
            <img
              src="/portal-flow-builder.webp"
              width={1683}
              height={934}
              alt="The VEXU Portal flow builder: WhatsApp, phone, webhook and website channels connect to a Customer Care agent with a knowledge base, which branches through conditions into email and WhatsApp actions."
              className="w-full rounded-[20px] shadow-[0_0_0_1px_rgba(16,32,26,0.08),0_50px_100px_-40px_rgba(16,32,26,0.45)]"
            />
            <figcaption className="mt-4 text-sm text-slate">The flow builder in the VEXU Portal.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="golive-title">
        <div className="shell">
          <SectionHeading
            id="golive-title"
            title="No IT project. Forward your number and you're live."
            lede="Putting AI on a business line used to mean infrastructure, consultants and a six-month rollout. With VEXU you build your agent, switch on forwarding, and your AI front line is answering the same day."
          />
          <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {goLive.map(([title, copy], index) => (
              <li key={title}>
                <div className="flex items-center gap-4">
                  <span className="wide flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-[15px] font-semibold">
                    {index + 1}
                  </span>
                  {index < goLive.length - 1 && <span className="hidden h-px flex-1 bg-line md:block" aria-hidden="true" />}
                </div>
                <h3 className="h3 mt-6">{title}</h3>
                <p className="mt-2 max-w-sm text-slate">{copy}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-7 text-[15px] text-slate">
            {noProject.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-signal-deep" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="channels-title">
        <div className="shell">
          <SectionHeading
            id="channels-title"
            title="Four ways in. One brain behind them."
            lede="Connect a phone line through call forwarding, the official WhatsApp Business API, a chat and voice widget on your website, or a webhook from any system. Same agent, same knowledge, every channel."
          />
          <div className="mt-14">
            <FlowGraph />
          </div>
        </div>
      </section>

      <FeatureRow
        id="knowledge-title"
        title="Your documents become your agent's expertise."
        lede="Upload PDFs, Word documents and spreadsheets. VEXU turns them into searchable knowledge, so agents answer from your facts, not guesses, and can show where each answer came from."
      >
        <KnowledgeFragment />
      </FeatureRow>

      <div className="bg-paper">
        <FeatureRow
          id="calendar-title"
          reverse
          title="Connected to Outlook and Google. Booking in real time."
          lede="A caller asks for Thursday afternoon. The agent sees what's actually free, offers real times, books the meeting and sends the invite while the call is still going."
        >
          <CalendarFragment />
        </FeatureRow>
      </div>

      <FeatureRow
        id="actions-title"
        title="Agents that don't just answer. They act."
        lede="Trigger actions mid-conversation: update your CRM, send an email or WhatsApp message, place a call, create an event, save files to Google Drive, or run custom Python for anything else."
        extra={
          <ul className="mt-8 flex flex-wrap gap-2">
            {actionTypes.map((action) => (
              <li key={action} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm">
                {action}
              </li>
            ))}
          </ul>
        }
      >
        <ActionsFragment />
      </FeatureRow>

      <div className="bg-paper">
        <FeatureRow
          id="voice-title"
          reverse
          title="One voice for your brand, on every channel."
          lede="Warm and reassuring for a clinic, sharp and efficient for a brokerage. Describe it, preview it, save it to your voice library and assign it to any agent. Every customer hears the same brand."
        >
          <VoiceDesignFragment />
        </FeatureRow>
      </div>

      <FeatureRow
        id="analytics-title"
        title="Every call, message and credit on one dashboard."
        lede="Track conversations handled, usage trends, live system logs and your actual spend as it happens. No surprises at the end of the month."
      >
        <AnalyticsFragment />
      </FeatureRow>

      <section className="bg-ink py-20 text-paper sm:py-24" aria-labelledby="credits-title">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <h2 id="credits-title" className="h2">
              One unit. No hidden maths.
            </h2>
            <p className="lede mt-5 text-paper/65">
              Everything in the Portal runs on credits, so budgeting takes one line.{' '}
              <Link to="/pricing" className="font-semibold text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal">
                See Portal plans
              </Link>
            </p>
          </div>
          <dl className="display grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-3 text-[clamp(1.7rem,3.4vw,2.75rem)] leading-none">
            <dt className="sr-only">One credit equals</dt>
            <dd className="col-span-2">1 credit</dd>
            <dt className="text-signal" aria-label="or">=</dt>
            <dd>1 voice minute</dd>
            <dt className="text-signal" aria-label="or">=</dt>
            <dd>4 messaging chats</dd>
          </dl>
        </div>
      </section>

      <section className="section bg-mist" aria-labelledby="cta-title">
        <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="cta-title" className="h2">
              From your first agent to your whole front line.
            </h2>
            <p className="lede mt-5">Tell us how your business talks to customers. We'll show you what it looks like automated.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={openDemo} className="btn-primary">
              Book a demo
            </button>
            <button type="button" onClick={openEarlyAccess} className="btn-secondary">
              Get early access
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
