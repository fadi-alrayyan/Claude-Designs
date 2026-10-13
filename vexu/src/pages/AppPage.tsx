import {
  BellRing,
  BookUser,
  Brain,
  CalendarCheck,
  CalendarDays,
  History,
  MessageSquareText,
  Mic,
  PhoneIncoming,
  PlayCircle,
  ScanSearch,
  SlidersHorizontal,
} from 'lucide-react';
import { useActions } from '../components/Actions';
import { Faq } from '../components/Faq';
import { EarlyAccessForm } from '../components/Forms';
import { LiveCommandsFragment, VoiceDesignFragment } from '../components/Fragments';
import { PhoneAppScreen } from '../components/PhoneAppScreen';
import { SectionHeading, Tag } from '../components/Section';
import { StoreBadges } from '../components/StoreBadges';
import { usePageMeta, useStructuredData } from '../components/usePageMeta';
import { launch } from '../config/launch';

const steps = [
  ['Turn on forwarding', 'One guided step for your carrier, done once.'],
  ['VEXU picks up', "When you're busy, out of reach, or your phone is off."],
  ['You stay informed', 'Summaries and recordings arrive seconds after each call.'],
  ['You stay in control', 'Pause or resume any time. Your number stays yours.'],
];

const features = [
  { icon: PhoneIncoming, title: 'Call answering', copy: 'Real conversation. Not voicemail, not menus.' },
  { icon: Mic, title: 'Voice design', copy: 'Describe the voice you want and VEXU speaks with it.' },
  { icon: ScanSearch, title: 'Conversation intelligence', copy: 'Know why they called, not just that they called.' },
  { icon: MessageSquareText, title: 'Smart summaries', copy: 'The whole call, distilled to three lines you can act on.' },
  { icon: Brain, title: 'Memory', copy: 'Callers are remembered. Context never gets lost.' },
  { icon: PlayCircle, title: 'Call playback', copy: 'Every conversation, replayable in full.' },
  { icon: CalendarCheck, title: 'Meeting scheduling', copy: "Meetings booked while you're in meetings." },
  { icon: SlidersHorizontal, title: 'Live commands', copy: 'Text VEXU mid-call. It adjusts instantly.' },
  { icon: CalendarDays, title: 'Calendar sync', copy: 'Your schedule and your assistant, always in step.' },
  { icon: BellRing, title: 'Smart notifications', copy: 'Only what matters reaches you.' },
  { icon: BookUser, title: 'Caller rules', copy: 'Family, clients and robocalls each handled their own way.' },
  { icon: History, title: 'Conversation timeline', copy: 'Your whole call history, organised and searchable.' },
];

const faqs: [string, string][] = [
  ['Does VEXU replace my phone number?', 'No. VEXU works with your existing number through standard call forwarding. Nothing about your number changes.'],
  ['Do I need a new SIM or a second line?', 'No. No new SIM, no second number, no internet-calling app.'],
  ['Which carriers does VEXU support?', 'Any carrier that supports call forwarding, which is virtually all of them.'],
  ['Can I turn it off?', 'Yes, instantly and at any time, from the app.'],
  ['When does VEXU launch?', `${launch.date} in ${launch.market}, with more countries to follow. Early access members download first.`],
];

export function AppPage() {
  const { openEarlyAccess } = useActions();
  usePageMeta(
    'VEXU App: AI call answering on your existing number',
    'Forward your calls to VEXU and let AI answer in real conversation. Instant summaries, live commands, memory and scheduling, on any carrier.',
  );
  useStructuredData('vexu-app-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
  });

  return (
    <>
      <section className="overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28">
        <div className="shell grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Tag>The VEXU app</Tag>
            <h1 className="h1 mt-7">The assistant that lives on your number.</h1>
            <p className="lede mt-7">
              When you can't answer, your calls flow to VEXU and it answers as your assistant. Keep your number, keep your carrier, and stop
              missing the calls that matter.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button type="button" onClick={openEarlyAccess} className="btn-primary">
                Get early access
              </button>
              <StoreBadges />
            </div>
          </div>
          <PhoneAppScreen />
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="how-title">
        <div className="shell">
          <SectionHeading
            id="how-title"
            title="Built on call forwarding. Finished by AI."
            lede="Your phone has had call forwarding for decades. Point it at your personal VEXU line once, and every call you don't take is answered. The app doesn't need to be open, and callers don't need anything at all."
          />
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map(([title, copy], index) => (
              <li key={title}>
                <div className="flex items-center gap-4">
                  <span className="wide flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-[15px] font-semibold">
                    {index + 1}
                  </span>
                  {index < steps.length - 1 && <span className="hidden h-px flex-1 bg-line lg:block" aria-hidden="true" />}
                </div>
                <h3 className="h3 mt-6">{title}</h3>
                <p className="mt-2 text-slate">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="features-title">
        <div className="shell">
          <SectionHeading id="features-title" title="Twelve features. One promise: nothing slips through." />
          <ul className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, copy }) => (
              <li key={title} className="flex gap-4 border-b border-line py-7 sm:pr-8">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-signal-deep" aria-hidden="true" />
                <div>
                  <h3 className="text-[1.08rem] font-semibold">{title}</h3>
                  <p className="mt-1 text-slate">{copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="voice-title">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="voice-title"
              size="md"
              title="Your assistant. Your voice rules."
              lede="Skip the default robot. Describe the voice you want in plain words, preview it, refine it, and that's the voice every caller hears. Callers won't just be answered. They'll be impressed."
            />
          </div>
          <VoiceDesignFragment />
        </div>
      </section>

      <section className="section bg-ink text-paper" aria-labelledby="commands-title">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <LiveCommandsFragment />
          <div className="lg:order-first">
            <Tag tone="dark">International patent pending</Tag>
            <h2 id="commands-title" className="h2 mt-7">
              Steer the call without joining it.
            </h2>
            <p className="lede mt-6 text-paper/65">
              Mid-call, VEXU shows you what's happening and you redirect it by text: offer Thursday instead, take a message, put them through.
              The caller never knows you typed a word.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-title" title="Questions, answered." />
          <Faq items={faqs} />
        </div>
      </section>

      <section className="section bg-mist" aria-labelledby="cta-title">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h2 id="cta-title" className="h2">
              Your phone becomes more than a phone.
            </h2>
            <p className="lede mt-5">
              Early access members download first, in {launch.market}, with launch pricing locked for their first year.
            </p>
          </div>
          <EarlyAccessForm />
        </div>
      </section>
    </>
  );
}
