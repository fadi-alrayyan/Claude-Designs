import { useRef, useState, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useActions } from '../components/Actions';
import { Faq } from '../components/Faq';
import { SectionHeading } from '../components/Section';
import { usePageMeta, useStructuredData } from '../components/usePageMeta';
import { isAvailable, launch } from '../config/launch';

type Plan = { name: string; for: string; intro?: string; includes: string[]; featured?: boolean; demo?: boolean };

const products = {
  app: {
    label: 'VEXU App',
    note: 'For you and your own number.',
    footer: 'No new number. Cancel any time. Early access members keep launch pricing for their first year.',
    plans: [
      { name: 'Starter', for: 'For everyday personal calls.', includes: ['AI call answering on your existing number', 'Smart summary after every call', 'Conversation timeline and playback', 'Smart notifications'] },
      {
        name: 'Plus',
        for: 'For professionals who live on their phone.',
        intro: 'Everything in Starter, and',
        includes: ['Memory: callers remembered, context kept', 'Meeting scheduling and calendar sync', 'Live commands: steer VEXU mid-call', 'Voice design: your assistant, your voice'],
        featured: true,
      },
      { name: 'Pro', for: 'For people whose calls are their business.', intro: 'Everything in Plus, and', includes: ['The most AI minutes each month', 'Caller rules for every group of contacts', 'First access to new features'] },
    ] as Plan[],
  },
  portal: {
    label: 'VEXU Portal',
    note: 'For your business and your team.',
    footer: 'Portal pricing is shared in your demo, built around your channels, volume and workflows.',
    plans: [
      { name: 'Launch', for: 'For your first AI agent.', includes: ['One AI agent and the visual workflow builder', 'Phone, WhatsApp, website widget and webhook channels', 'Knowledge base with semantic search'] },
      {
        name: 'Growth',
        for: 'For teams automating their front line.',
        intro: 'Everything in Launch, and',
        includes: ['Multiple agents and workflows', 'Calendar sync with Outlook and Google', 'Automated actions: email, WhatsApp, HTTP and more', 'Analytics and spend dashboard'],
        featured: true,
      },
      {
        name: 'Enterprise',
        for: 'For organisations at scale.',
        intro: 'Everything in Growth, and',
        includes: ['Volume credits and custom limits', 'Custom integrations and Python actions', 'Dedicated support and onboarding', 'Security review and compliance support'],
        demo: true,
      },
    ] as Plan[],
  },
};
type ProductId = keyof typeof products;

const faqs: [string, string][] = [
  ["Why aren't prices listed yet?", `We reveal pricing at launch. Early access members see it before anyone else, and whatever the launch price is, they keep it for a full year.`],
  ['Can I use both the App and the Portal?', "Yes. They're one ecosystem. Many professionals run the app for themselves while their business runs the Portal."],
  ['What exactly is a credit?', 'One credit is one voice minute or four messaging conversations. Every Portal plan uses the same unit, so comparing plans never needs a calculator.'],
  ['What do early access members get?', `First download access in ${launch.market}, a first look at pricing, and launch pricing locked for their first year.`],
];

export function PricingPage() {
  const { openEarlyAccess, openDemo } = useActions();
  const [product, setProduct] = useState<ProductId>('app');
  const tabRefs = useRef<Record<ProductId, HTMLButtonElement | null>>({ app: null, portal: null });
  usePageMeta('VEXU pricing: app plans and Portal credits', 'Simple plans for the VEXU app and transparent credits for the VEXU Portal. Early access members see launch pricing first and keep it for a year.');
  useStructuredData('vexu-pricing-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
  });

  const ids = Object.keys(products) as ProductId[];
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const next = ids[(ids.indexOf(product) + (event.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length];
    setProduct(next);
    tabRefs.current[next]?.focus();
  };

  const current = products[product];

  return (
    <>
      <section className="pb-20 pt-28 sm:pt-36 lg:pb-28">
        <div className="shell">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <h1 className="h1">Pick your VEXU.</h1>
              <p className="lede mt-6">
                Start with the app for yourself. Scale to the Portal for your business.
                {!isAvailable && ' Early access members see launch pricing first and keep it for a full year.'}
              </p>
            </div>
            <div role="tablist" aria-label="Product" className="inline-flex self-start rounded-full border border-ink/10 bg-paper p-1 lg:self-auto">
              {ids.map((id) => (
                <button
                  key={id}
                  ref={(node) => {
                    tabRefs.current[id] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={product === id}
                  aria-controls="plans-panel"
                  tabIndex={product === id ? 0 : -1}
                  onClick={() => setProduct(id)}
                  onKeyDown={onTabKey}
                  className={`relative rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${product === id ? 'text-paper' : 'text-slate hover:text-ink'}`}
                >
                  {product === id && <motion.span layoutId="pricing-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 450, damping: 36 }} />}
                  <span className="relative">{products[id].label}</span>
                </button>
              ))}
            </div>
          </div>

          <div id="plans-panel" role="tabpanel" aria-labelledby={`tab-${product}`} className="mt-14">
            <p className="text-slate">{current.note}</p>
            <div className="mt-5 grid overflow-hidden rounded-[28px] border border-line bg-paper lg:grid-cols-3">
              {current.plans.map((plan, index) => (
                <article
                  key={`${product}-${plan.name}`}
                  className={`flex flex-col p-7 sm:p-9 ${plan.featured ? 'bg-ink text-paper' : ''} ${index > 0 && !plan.featured && !current.plans[index - 1].featured ? 'border-t border-line lg:border-l lg:border-t-0' : ''}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="wide text-[1.6rem] font-semibold tracking-[-0.03em]">{plan.name}</h2>
                    {plan.featured && <span className="rounded-full bg-signal px-3 py-1 text-xs font-semibold text-ink">Most popular</span>}
                  </div>
                  <p className={`mt-2 ${plan.featured ? 'text-paper/65' : 'text-slate'}`}>{plan.for}</p>
                  <p className={`mt-7 border-y py-4 text-sm ${plan.featured ? 'border-white/10 text-paper/70' : 'border-line text-slate'}`}>
                    {plan.demo ? 'Custom pricing for your volume' : isAvailable ? 'See pricing in the app' : 'Launch price revealed to early access first'}
                  </p>
                  {plan.intro && <p className={`mt-6 text-sm font-medium ${plan.featured ? 'text-paper/55' : 'text-slate'}`}>{plan.intro}</p>}
                  <ul className={`grid gap-3 ${plan.intro ? 'mt-3' : 'mt-6'}`}>
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-snug">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? 'text-signal' : 'text-signal-deep'}`} strokeWidth={2.5} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-9">
                    <button
                      type="button"
                      onClick={plan.demo || product === 'portal' ? openDemo : openEarlyAccess}
                      className={`w-full ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {plan.demo || product === 'portal' ? 'Book a demo' : 'Get early access'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate">
              {current.footer}
              {product === 'portal' && ' Everything runs on one unit: 1 credit is 1 voice minute or 4 messaging conversations.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="faq-title">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="faq-title" title="Fair questions. Straight answers." />
          <Faq items={faqs} />
        </div>
      </section>

      <section className="section bg-mist" aria-labelledby="cta-title">
        <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="cta-title" className="h2">
              The best price VEXU will ever have.
            </h2>
            <p className="lede mt-5">Launch pricing is the lowest it gets, and early access members keep it for a year.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={openEarlyAccess} className="btn-primary">
              Get early access
            </button>
            <button type="button" onClick={openDemo} className="btn-secondary">
              Book a demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
