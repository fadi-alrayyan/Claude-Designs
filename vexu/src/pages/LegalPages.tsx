import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../components/usePageMeta';
import { company } from '../config/launch';

type TocItem = { id: string; label: string };

function LegalLayout({ title, toc, children }: { title: string; toc: TocItem[]; children: ReactNode }) {
  usePageMeta(`${title}: VEXU`);
  return (
    <section className="pb-24 pt-28 sm:pt-36">
      <div className="shell">
        <header className="max-w-3xl">
          <p className="text-slate">Legal</p>
          <h1 className="h2 mt-3">{title}</h1>
          {/* TODO: set the real date when legal review is complete. */}
          <p className="mt-6 rounded-2xl border border-line bg-paper px-4 py-3 text-[15px] text-slate">
            This document is under legal review and may change before launch.
          </p>
        </header>
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,44rem)_15rem] lg:justify-between">
          <article className="min-w-0 text-[1.02rem] leading-[1.75] text-ink/85 [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:text-[1.2rem] [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:text-ink [&_h3]:mt-16 [&_h3]:scroll-mt-28 [&_h3]:border-t [&_h3]:border-line [&_h3]:pt-8 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:text-signal-deep [&_p]:mt-4">
            {children}
          </article>
          {toc.length > 1 && (
            <nav aria-label="On this page" className="order-first lg:order-last">
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-medium text-slate">On this page</p>
                <ol className="mt-4 grid gap-2.5 border-l border-line pl-4 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-slate transition-colors hover:text-ink">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

const ContactLink = () => (
  <Link to="/company#contact" className="link">
    our contact form
  </Link>
);

const termsToc: TocItem[] = [
  { id: 'who-we-are', label: '1. Who we are' },
  { id: 'scope', label: '2. Scope of these terms' },
  { id: 'section-a', label: 'A. All Services' },
  { id: 'section-b', label: 'B. The VEXU App' },
  { id: 'section-c', label: 'C. The VEXU Portal' },
  { id: 'contact', label: 'Contact' },
];

export function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" toc={termsToc}>
      <h2 id="who-we-are">1. Who we are</h2>
      <p>
        These Terms & Conditions (“Terms”) govern your use of the VEXU website, the VEXU mobile application (the “App”), and the VEXU Portal (the
        “Portal”), together the “Services”, operated by {company.legalName}, {company.addressLines.join(', ')} (“VEXU”, “we”, “us”). By accessing
        or using any of the Services, you agree to these Terms.
      </p>

      <h2 id="scope">2. Scope of these terms</h2>
      <p>
        Section A applies to all Services. Section B applies additionally to the App. Section C applies additionally to the Portal. If you use the
        Services on behalf of a company, you confirm you are authorized to bind that company.
      </p>

      <h3 id="section-a">Section A: All Services</h3>

      <h2>3. The website & early access</h2>
      <p>
        The website provides information about VEXU and allows you to join our early access list. Early access registration does not guarantee
        access to the Services, specific pricing, or a launch date. Launch-pricing commitments communicated to early access members apply once the
        App is commercially available and are honored for twelve (12) months from your first paid subscription.
      </p>

      <h2>4. The “Talk to VEXU” widget</h2>
      <p>
        Our website includes an AI assistant you can chat or speak with. Conversations with this assistant, including voice audio and
        transcriptions, are processed by our systems to provide responses and improve the Services, as described in our Privacy Policy. Do not
        share sensitive personal information through the widget.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The Services, including software, design, text, graphics, logos, and underlying technology, are owned by VEXU and protected by applicable
        intellectual-property laws, including pending international patent applications. You may not copy, modify, reverse-engineer, or create
        derivative works from any part of the Services except as permitted by law.
      </p>

      <h2>6. Acceptable use</h2>
      <p>
        You agree not to use the Services to: violate any law; record or monitor communications without legally required consents; harass,
        defraud, or impersonate others; send spam or unlawful robocalls; interfere with or attempt to breach the security of the Services; or use
        the Services to build a competing product.
      </p>

      <h2>7. Disclaimers</h2>
      <p>
        The Services are provided “as is” and “as available.” AI-generated responses, summaries, and actions may contain errors; you are
        responsible for reviewing important information before relying on it. We do not warrant uninterrupted or error-free operation.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, VEXU shall not be liable for indirect, incidental, special, consequential, or punitive damages, or
        loss of profits, data, or business opportunities, arising from your use of the Services. Our aggregate liability shall not exceed the
        amounts you paid to VEXU in the twelve (12) months preceding the claim, or one hundred (100) USD if you have paid nothing.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai, without regard to conflict-of-law
        principles. Mandatory consumer protections of your country of residence remain unaffected where applicable.
      </p>

      <h3 id="section-b">Section B: The VEXU App</h3>

      <h2>10. The service</h2>
      <p>
        The App answers calls to your existing phone number using conditional call forwarding that you activate and control. You may pause or
        disable forwarding at any time through your carrier or the App.
      </p>

      <h2>11. Your responsibilities: call recording & consent</h2>
      <p>
        Calls handled by VEXU may be recorded, transcribed, and summarized. Laws on recording and monitoring calls vary by country and, in the
        United States, by state; some jurisdictions require the consent of all parties. You are responsible for using the App in compliance with
        the laws that apply to you and your callers, including any required notices or consents. VEXU provides configurable caller notification
        features to support compliance.
      </p>

      <h2>12. Voice features</h2>
      <p>
        Voice Design allows you to create a synthetic voice for your assistant, which may be based on your own voice. You confirm you own or
        control the rights to any voice you create and will not create a voice imitating another person without their consent.
      </p>

      <h2>13. Subscriptions & billing</h2>
      <p>
        App subscriptions are billed through the Apple App Store or Google Play under their respective terms. Plans renew automatically until
        cancelled. Usage allowances (such as included AI minutes) reset each billing cycle and do not roll over unless stated otherwise.
      </p>

      <h3 id="section-c">Section C: The VEXU Portal</h3>

      <h2>14. Business use</h2>
      <p>
        The Portal enables businesses to build and operate AI agents across voice, WhatsApp, web chat, and other channels. You are responsible for
        the behavior of agents you configure, the content of your knowledge bases, and your compliance with laws applicable to your communications
        with your own customers, including consent, telemarketing, and data-protection requirements.
      </p>

      <h2>15. Credits</h2>
      <p>
        Portal usage is measured in credits: one (1) credit equals one (1) voice minute or four (4) messaging conversations. Credits are consumed
        as used, expire as stated in your plan, and are non-refundable except where required by law.
      </p>

      <h2>16. Your data & your customers’ data</h2>
      <p>
        You retain ownership of the content you upload to the Portal. You grant VEXU a limited license to process it solely to provide the
        Services. Where you input personal data of your own customers, you act as the data controller and VEXU acts as a processor on your
        documented instructions, as further described in our Privacy Policy and any applicable data-processing terms.
      </p>

      <h2>17. Changes, suspension & termination</h2>
      <p>
        We may update these Terms, with material changes notified in advance where required. We may suspend or terminate access for breach of
        these Terms. You may stop using the Services at any time; sections that by their nature survive termination (including IP, disclaimers,
        and liability) continue to apply.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about these Terms: {company.legalName}, {company.addressLines.join(', ')}, or via <ContactLink />.
      </p>
    </LegalLayout>
  );
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" toc={[]}>
      <p>Our full Privacy Policy is being finalized for launch and will be published here.</p>
      <h2>What we collect today</h2>
      <p>
        Email addresses you submit for early access; and conversations (text and voice, with transcriptions) you choose to have with the Talk to
        VEXU widget, used to respond to you and improve our Services.
      </p>
      <p>We do not sell personal data.</p>
      <h2>Privacy requests</h2>
      <p>
        Contact us through <ContactLink /> for any privacy request.
      </p>
    </LegalLayout>
  );
}
