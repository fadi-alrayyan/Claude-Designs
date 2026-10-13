import { useActions } from '../components/Actions';
import { ContactForm } from '../components/Forms';
import { SectionHeading, Tag } from '../components/Section';
import { usePageMeta, useStructuredData } from '../components/usePageMeta';
import { company, launch } from '../config/launch';

const values = [
  ['Simplicity', 'Technology should make life easier, not more complicated.'],
  ['Intelligence', 'AI should understand, not just respond.'],
  ['Privacy', 'Trust is built through transparency and security.'],
  ['Invention', "We're redefining what's possible in communication, and protecting it with patents pending internationally."],
];

export function CompanyPage() {
  const { openEarlyAccess, openDemo } = useActions();
  usePageMeta('About VEXU: reimagining communication through AI', `VEXU builds AI that answers, understands and acts on your calls. Built in the UAE, launching in ${launch.market}. Get in touch.`);
  useStructuredData('vexu-organization', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.legalName,
    url: 'https://vexu.ai',
    sameAs: company.socials.map((social) => social.href),
    address: { '@type': 'PostalAddress', streetAddress: 'Dubai CommerCity, Building B1, Office 501, Umm Ramool', addressLocality: 'Dubai', addressCountry: 'AE' },
  });

  return (
    <>
      <section className="pb-20 pt-28 sm:pt-40 lg:pb-28">
        <div className="shell">
          <Tag>Company</Tag>
          <h1 className="h1 mt-7 max-w-5xl">Reimagining how people talk, through AI.</h1>
          <p className="lede mt-8">
            VEXU started from a simple observation: your phone number is the most personal piece of technology you own, and it deserved an
            upgrade.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20" aria-label="Mission and vision">
        <div className="shell grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-sm font-medium text-slate">Our mission</h2>
            <p className="display mt-4 text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.1]">Make intelligent communication available to every professional and every business.</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-slate">Our vision</h2>
            <p className="display mt-4 text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.1]">A future where every conversation gets the attention it deserves.</p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-paper sm:py-20">
        <p className="shell display text-[clamp(1.7rem,3.6vw,3rem)] leading-[1.08]">
          Built in the UAE. Launching in {launch.market}. <span className="text-paper/45">Designed for every phone number on earth.</span>
        </p>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="shell">
          <SectionHeading id="values-title" title="Technology with a human point of view." />
          <dl className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([title, copy]) => (
              <div key={title} className="border-b border-line py-8 sm:pr-8">
                <dt className="h3">{title}</dt>
                <dd className="mt-2 text-slate">{copy}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="section bg-paper" aria-labelledby="contact-title">
        <div className="shell">
          <SectionHeading
            id="contact-title"
            title="We'd love to hear from you."
            lede="Exploring VEXU, interested in a partnership, or planning an enterprise rollout? Write to us and a person will reply."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <ContactForm />
            <aside className="instrument flex flex-col self-start p-7 sm:p-9" aria-label="Company details">
              <p className="text-lg font-semibold">{company.legalName}</p>
              <address className="mt-4 not-italic leading-relaxed text-paper/65">
                {company.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <div className="my-8 h-px bg-white/10" />
              <p className="text-sm text-paper/55">Find us as @vexuai on</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {company.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-paper/85 transition-colors hover:border-signal hover:text-paper"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-mist" aria-labelledby="cta-title">
        <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="cta-title" className="h2 max-w-2xl">
            The future of communication starts with one conversation.
          </h2>
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
