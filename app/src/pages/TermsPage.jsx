import React from 'react';
import { ScrollText, ArrowRight } from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

const LAST_UPDATED = '4 November 2026';
const COMPANY = 'Royal Nodes';
const CONTACT_EMAIL = 'support@royalnodes.com';

const SECTIONS = [
  {
    id: 'agreement',
    title: '1. Agreement to these terms',
    body: [
      `These Terms and Conditions ("Terms") govern your access to and use of the ${COMPANY} website, client area, control panel and hosting services (together, the "Services").`,
      'By creating an account, submitting an order, or using the Services, you agree to these Terms. If you do not agree, do not use the Services.'
    ]
  },
  {
    id: 'who-we-are',
    title: '2. Who we are',
    body: [
      `${COMPANY} is a hosting and infrastructure provider offering game servers, virtual and dedicated servers, container and cluster hosting, web hosting, AI agent hosting and related services.`,
      'Company registration details, registered address and tax identifiers will be published here once finalised. Until then, contact us using the details at the end of this page.'
    ]
  },
  {
    id: 'eligibility',
    title: '3. Eligibility and accounts',
    body: [
      'You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account and enter into these Terms.',
      'You must provide accurate account information, including a valid name, username and at least one contact method (email address or phone number). You are responsible for keeping this information current.',
      'You are responsible for all activity that occurs under your account and for keeping your password confidential. Notify us immediately if you believe your account has been compromised.',
      'One person or organisation may not maintain multiple accounts to circumvent limits, suspensions or these Terms.'
    ]
  },
  {
    id: 'orders',
    title: '4. Orders, pricing and payment',
    body: [
      'Prices are displayed in Indian Rupees (INR) unless stated otherwise, and exclude applicable taxes unless explicitly included.',
      'Submitting an order creates an order request. A contract for the Services is formed only when we confirm the order and receive verified payment.',
      'Where online payment is not yet enabled, orders are confirmed manually by our team. We may contact you to complete payment before provisioning.',
      'You authorise us to verify payments through the payment provider used. Redirects, screenshots or payment confirmations shown to you are not proof of payment; only verified confirmation on our side authorises provisioning.',
      'Renewal prices may differ from introductory prices. The price applicable to a renewal is the price shown in your client area at the time of renewal.',
      'We may correct pricing errors. If a corrected price is higher than the price you were shown, you may cancel the affected order before provisioning.'
    ]
  },
  {
    id: 'delivery',
    title: '5. Service delivery and provisioning',
    body: [
      'Services are provisioned after order confirmation and, where applicable, after payment verification. Provisioning times stated on the website are estimates, not guarantees.',
      'We may refuse or delay an order where we cannot verify the order, where the requested configuration is unavailable, or where fulfilling it would breach these Terms or applicable law.',
      'You are responsible for configuring and securing your service after delivery, including application-level access control, passwords, firewalls and updates, unless you have purchased a managed service that states otherwise.'
    ]
  },
  {
    id: 'acceptable-use',
    title: '6. Acceptable use',
    body: [
      'You agree to use the Services lawfully and in a way that does not harm us, other customers or third parties.',
      'You must not: (a) send spam or unsolicited bulk messages; (b) conduct phishing, fraud or scams; (c) distribute malware, ransomware or exploits; (d) attack, scan or probe systems you do not own or have permission to test; (e) host illegal content; (f) infringe intellectual property rights; (g) evade resource limits or abuse promotional offers; or (h) resell the Services unless your plan permits it.',
      'You must comply with the acceptable use policies of our upstream providers and networks, and with the laws of India and the jurisdictions in which our infrastructure operates.'
    ]
  },
  {
    id: 'prohibited',
    title: '7. Prohibited content',
    body: [
      'The following content is prohibited on any service: content that sexualises minors; content that incites violence or hatred; content that promotes terrorism; stolen data; malware distribution points; and content that infringes copyright, trademark or other rights.',
      'We may remove or suspend prohibited content immediately and without prior notice, and may report it to the relevant authorities where required by law.'
    ]
  },
  {
    id: 'resources',
    title: '8. Resource limits and fair use',
    body: [
      'Each plan includes the CPU, memory, storage, bandwidth, ports and other resources described on its plan page. You must not exceed those limits or attempt to circumvent them.',
      'Where a plan is described as unmetered or unlimited, that description is subject to fair use: you must not use the service in a way that degrades the platform, affects other customers, or is disproportionate to the plan you purchased.',
      'We may throttle, suspend or require an upgrade where usage materially exceeds what the plan is designed for.'
    ]
  },
  {
    id: 'data',
    title: '9. Backups and your data',
    body: [
      'Where a plan includes backups, they are provided as a convenience. You remain responsible for maintaining independent backups of data that is important to you.',
      `We are not liable for data loss, corruption or deletion except where caused by our wilful misconduct. Keep your own copies, especially before migrations, upgrades or reinstalls.`,
      'You must not store unlawful data on our systems. We may remove data where required by law or where it breaches these Terms.'
    ]
  },
  {
    id: 'availability',
    title: '10. Availability, maintenance and support',
    body: [
      'We aim to keep the Services available at all times, but we do not guarantee uninterrupted service unless you have purchased a plan with an explicit written service level agreement (SLA).',
      'We may perform scheduled maintenance, and we may perform emergency maintenance without notice where needed to protect the platform.',
      'Support is provided through the support ticket system, our Discord community and email. Response times are targets, not guarantees, unless stated in an SLA.'
    ]
  },
  {
    id: 'suspension',
    title: '11. Suspension and termination',
    body: [
      'We may suspend or terminate a service immediately if: payment is not received when due; the service is used in breach of these Terms; the service is used for prohibited content; or suspension is required by law or by an upstream provider.',
      'We may suspend a service pending investigation of abuse reports. We will restore it if the report is not substantiated.',
      'You may cancel a service at any time from your client area. Cancellation takes effect at the end of the current billing period unless otherwise stated.'
    ]
  },
  {
    id: 'refunds',
    title: '12. Cancellation and refunds',
    body: [
      'If a money-back guarantee is offered on a plan, it applies only within the stated period and only to the first purchase of that plan. It does not apply to renewals, add-ons, domain registrations, licences or third-party fees.',
      'Refunds are not available where the service has been used in breach of these Terms, where prohibited content was hosted, or where the service was suspended for abuse.',
      'Domain registrations, SSL certificates, software licences and similar third-party items are generally non-refundable once issued.',
      'Approved refunds are returned using the original payment method where possible. Processing times depend on the payment provider and your bank.'
    ]
  },
  {
    id: 'ip',
    title: '13. Intellectual property',
    body: [
      `The ${COMPANY} name, logo, website, control panel and documentation are owned by us or our licensors. These Terms do not grant you any right to use our branding without written permission.`,
      'You retain ownership of the content and applications you host. You grant us the limited licence needed to store, transmit and process that content in order to provide the Services.'
    ]
  },
  {
    id: 'third-party',
    title: '14. Third-party services',
    body: [
      'The Services may rely on third-party providers, including data centres, payment processors, domain registrars and software vendors. Their terms may also apply to your use of certain features.',
      'We are not responsible for outages, acts or omissions of third parties, though we will make reasonable efforts to restore service and to work with those providers.'
    ]
  },
  {
    id: 'privacy',
    title: '15. Privacy',
    body: [
      'We collect the information you provide when you create an account, submit an order or contact us, and technical information needed to operate the Services.',
      'We use this information to provide the Services, to verify payments, to prevent abuse and to communicate with you. We do not sell your personal information.',
      'Where services rely on third parties, we share only the information needed to deliver the service. You may request access to, correction of, or deletion of your personal information by contacting us.'
    ]
  },
  {
    id: 'disclaimers',
    title: '16. Disclaimers',
    body: [
      'The Services are provided "as is" and "as available". To the maximum extent permitted by law, we disclaim all implied warranties, including fitness for a particular purpose, merchantability and non-infringement.',
      'We do not warrant that the Services will be error-free, uninterrupted, or that they will meet your specific requirements.'
    ]
  },
  {
    id: 'liability',
    title: '17. Limitation of liability',
    body: [
      'To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential or punitive damages, or for loss of profits, revenue, data, goodwill or business opportunity.',
      'Our total liability arising out of or relating to the Services is limited to the amount you paid us for the affected service in the twelve months preceding the event giving rise to the claim.',
      'Nothing in these Terms limits liability that cannot be limited under applicable law.'
    ]
  },
  {
    id: 'indemnity',
    title: '18. Indemnity',
    body: [
      'You agree to indemnify and hold us harmless from claims, damages, losses and expenses (including reasonable legal fees) arising from your use of the Services, your content, or your breach of these Terms or applicable law.'
    ]
  },
  {
    id: 'changes',
    title: '19. Changes to these Terms',
    body: [
      'We may update these Terms from time to time. We will publish the updated version on this page with a new "last updated" date. Material changes will be notified through the client area or by email where appropriate.',
      'Continued use of the Services after changes take effect constitutes acceptance of the updated Terms.'
    ]
  },
  {
    id: 'law',
    title: '20. Governing law and disputes',
    body: [
      'These Terms are governed by the laws of India. The courts of India have exclusive jurisdiction over disputes arising from these Terms or the Services, subject to any mandatory consumer protections that apply to you.',
      'Before starting formal proceedings, you agree to contact us and attempt to resolve the dispute in good faith.'
    ]
  },
  {
    id: 'contact',
    title: '21. Contact',
    body: [
      `Questions about these Terms can be sent to ${CONTACT_EMAIL}, through the support ticket system, or through the community Discord.`
    ]
  }
];

export const TermsPage = () => {
  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="relative isolate overflow-hidden border-b border-[#1E293B] px-4 pb-12 pt-14 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-[#000000]/80 to-[#000000]" />
          <GlowOrbs />
        </div>
        <div className="relative z-10 mx-auto max-w-[1100px]">
          <Reveal><SectionLabel><ScrollText className="w-3.5 h-3.5 mr-2" /> Legal</SectionLabel></Reveal>
          <Reveal delay={80} as="h1" className="mt-5 text-4xl sm:text-5xl font-black tracking-tight">
            Terms &amp; Conditions
          </Reveal>
          <Reveal delay={140} as="p" className="mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            These Terms explain how {COMPANY} provides its services, what we expect from you, and what you can expect from us.
          </Reveal>
          <Reveal delay={200} as="p" className="mt-3 text-xs text-gray-500">
            Last updated: {LAST_UPDATED}
          </Reveal>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-[0.32fr_0.68fr] gap-10">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 border border-[#1E293B] bg-[#0D1522] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">On this page</div>
              <ul className="mt-3 space-y-1.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block text-xs text-gray-400 hover:text-[#48B7FF] leading-snug py-0.5">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {SECTIONS.map((section, i) => (
              <Reveal key={section.id} delay={Math.min(i, 5) * 40}>
                <section id={section.id} className="scroll-mt-24 border border-[#1E293B] bg-[#0D1522] p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-white">{section.title}</h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph, idx) => (
                      <p key={idx} className="text-sm text-gray-300 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}

            <Reveal>
              <div className="border border-[#1E293B] bg-[#131E2E] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-sm font-bold text-white">Questions about these Terms?</h2>
                  <p className="text-xs text-gray-400 mt-1">Open a ticket or reach us on Discord.</p>
                </div>
                <div className="flex gap-2">
                  <a href="/tickets" className="px-4 py-2 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-xs inline-flex items-center gap-1.5">
                    Open ticket <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a href="/discord" className="px-4 py-2 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-xs">
                    Discord
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
};
