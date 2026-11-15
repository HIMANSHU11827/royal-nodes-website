import React, { useState } from 'react';
import {
  MessageCircle, Users, Megaphone, Wrench, ArrowRight, CheckCircle2,
  Mail, LifeBuoy, Send, Headphones, Sparkles, HelpCircle, Bug, Lightbulb,
  Gamepad2, BookOpen, Shield, ChevronDown, ChevronUp, Gift, MessagesSquare
} from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

const DISCORD_INVITE = 'https://discord.gg/royalnodes';
const TICKETS_KEY = 'rn_tickets';

const PERKS = [
  { icon: Headphones, title: 'Ask for help', desc: 'Post a question and get answers from staff and experienced members.' },
  { icon: Megaphone, title: 'Announcements', desc: 'New products, maintenance windows and release notes first.' },
  { icon: Users, title: 'Find people', desc: 'Look for teammates, staff, builders or collaborators.' },
  { icon: Wrench, title: 'Custom work', desc: 'Need something non-standard? Post it and we scope it with you.' }
];

const THINGS = [
  { icon: HelpCircle, title: 'Ask doubts', desc: 'Any question is welcome — setup, billing, specs or configuration.' },
  { icon: LifeBuoy, title: 'Get support', desc: 'Staff and members help troubleshoot directly in the server.' },
  { icon: Users, title: 'Meet people', desc: 'Find players, developers, builders and server owners.' },
  { icon: Gamepad2, title: 'Share your setup', desc: 'Show your server, world, bot or project and get feedback.' },
  { icon: BookOpen, title: 'Modpacks & plugins', desc: 'Recommendations, configs and compatibility notes.' },
  { icon: Bug, title: 'Report bugs', desc: 'Flag issues with steps to reproduce so we can fix them fast.' },
  { icon: Lightbulb, title: 'Suggest features', desc: 'Tell us what to build next and vote on other ideas.' },
  { icon: Gift, title: 'Events & giveaways', desc: 'Community events, launches and occasional drops.' },
  { icon: MessagesSquare, title: 'Off-topic', desc: 'Talk about anything outside hosting, in its own channel.' },
  { icon: Shield, title: 'Safety', desc: 'Moderated channels, clear rules and a report path.' }
];

const ROLES = ['Member', 'Verified', 'Helper', 'Contributor', 'Partner'];

const RULES = [
  'Be respectful — no harassment, hate speech or personal attacks.',
  'No spam, unsolicited ads or referral links.',
  'Post in the right channel so answers stay findable.',
  'No abuse, exploitation or illegal content.',
  'Follow the Discord Terms of Service and Community Guidelines.'
];

const DISCORD_FAQ = [
  {
    q: 'Do I need an account to join?',
    a: 'Yes, you need a Discord account. It is free and works on desktop, web and mobile.'
  },
  {
    q: 'Is the community free?',
    a: 'Yes. Joining the server and asking questions is free. Paid services are separate and optional.'
  },
  {
    q: 'Can I get support there instead of tickets?',
    a: 'You can ask anything there, but official account and billing issues should go through a ticket so they are tracked.'
  },
  {
    q: 'Can I request custom work?',
    a: 'Yes. Use the custom-requests channel or the form on this page. We will scope it with you.'
  },
  {
    q: 'What if I see rule breaking?',
    a: 'Report it to a moderator in the server. Do not engage publicly — reports are handled privately.'
  }
];

export const DiscordPage = ({ user }) => {
  const [subject, setSubject] = useState('');
  const [contact, setContact] = useState(user?.email || user?.phone || '');
  const [details, setDetails] = useState('');
  const [done, setDone] = useState(null);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!subject.trim() || !details.trim()) {
      setError('Add a short subject and describe what you need.');
      return;
    }
    const ticket = {
      id: 'TKT-' + Date.now().toString(36).toUpperCase(),
      subject: subject.trim(),
      category: 'Custom',
      priority: 'High',
      message: `${details.trim()}\n\nContact: ${contact.trim() || 'not provided'}`,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    try {
      const previous = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
      localStorage.setItem(TICKETS_KEY, JSON.stringify([ticket, ...previous]));
    } catch {
      // storage unavailable
    }
    setDone(ticket.id);
    setSubject('');
    setDetails('');
  };

  return (
    <main className="w-full bg-[#000000] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-[#1E293B] px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-[#000000]/80 to-[#000000]" />
          <GlowOrbs />
        </div>
        <div className="relative z-10 mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal><SectionLabel><MessageCircle className="w-3.5 h-3.5 mr-2" /> Community</SectionLabel></Reveal>
            <Reveal delay={80} as="h1" className="mt-6 text-4xl sm:text-6xl font-black tracking-tight">
              Join our <span className="text-gradient">Discord</span>
            </Reveal>
            <Reveal delay={150} as="p" className="mt-5 text-sm sm:text-base text-gray-400 max-w-xl">
              A friendly place to ask doubts, get help, meet people and talk hosting. Custom requests,
              modpacks, bots, GPUs — anything goes in the right channel.
            </Reveal>
            <Reveal delay={220} className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold text-sm inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Join the Discord
              </a>
              <a href="/tickets" className="px-6 py-3 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm inline-flex items-center justify-center">
                Open a ticket instead
              </a>
            </Reveal>
            <Reveal delay={280} as="p" className="mt-4 text-[11px] text-gray-500">
              Opens Discord in a new tab.
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="border border-[#1E293B] bg-[#0D1522] p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Channels</span>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold"><span className="pulse-dot" /> OPEN</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {['#announcements', '#help-and-questions', '#showcase', '#custom-requests', '#modpacks', '#off-topic'].map((channel) => (
                  <li key={channel} className="flex items-center justify-between border border-[#1E293B] bg-[#131E2E] px-3 py-2">
                    <span className="font-mono text-xs text-[#48B7FF]">{channel}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] text-gray-500">Channels are illustrative — the real list appears after joining.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="w-full bg-[#0D1522] border-b border-[#1E293B] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="max-w-2xl">
            <SectionLabel>Why join</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold mt-4">More than support</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <Reveal key={perk.title} delay={i * 70}>
                  <div className="border border-[#1E293B] bg-[#131E2E] p-5 card-lift tilt-card spotlight h-full">
                    <Icon className="w-6 h-6 text-[#48B7FF]" />
                    <h3 className="text-base font-bold text-white mt-4">{perk.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{perk.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* THINGS YOU CAN DO */}
      <section className="w-full border-b border-[#1E293B] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="max-w-2xl">
            <SectionLabel>Inside the server</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold mt-4">Things you can do</h2>
            <p className="text-sm text-gray-400 mt-3">
              Ask doubts, get help, meet people, share work — and more.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {THINGS.map((t, i) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.title} delay={(i % 3) * 60}>
                  <div className="h-full border border-[#1E293B] bg-[#0D1522] p-5 card-lift tilt-card spotlight">
                    <Icon className="w-5 h-5 text-[#48B7FF]" />
                    <h3 className="text-sm font-bold text-white mt-3">{t.title}</h3>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{t.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROLES + RULES */}
      <section className="w-full bg-[#0D1522] border-b border-[#1E293B] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Reveal>
            <SectionLabel>Roles</SectionLabel>
            <h2 className="text-2xl font-bold mt-4">Earn your role</h2>
            <div className="mt-6 space-y-2">
              {ROLES.map((role, i) => (
                <div key={role} className="flex items-center justify-between border border-[#1E293B] bg-[#131E2E] px-4 py-3">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm font-bold text-white">{role}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#48B7FF]">Obtainable</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SectionLabel>Rules</SectionLabel>
            <h2 className="text-2xl font-bold mt-4">Keep it friendly</h2>
            <ul className="mt-6 space-y-3">
              {RULES.map((rule) => (
                <li key={rule} className="flex items-start gap-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-[#48B7FF] mt-0.5 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CONTACT + CUSTOM */}
      <section className="w-full px-4 py-14 sm:px-6 lg:px-8 border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <Reveal>
            <SectionLabel>Direct contact</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold mt-4">Reach us directly</h2>
            <p className="text-sm text-gray-400 mt-3">
              Prefer not to use Discord? Every option below reaches the same team.
            </p>
            <div className="mt-6 space-y-3">
              <a href="/tickets" className="flex items-center justify-between border border-[#1E293B] bg-[#0D1522] p-4 hover:border-[#1769FF] transition">
                <span className="flex items-center gap-3"><LifeBuoy className="w-4 h-4 text-[#48B7FF]" /><span className="text-sm font-bold text-white">Support tickets</span></span>
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </a>
              <a href="mailto:support@royalnodes.com" className="flex items-center justify-between border border-[#1E293B] bg-[#0D1522] p-4 hover:border-[#1769FF] transition">
                <span className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#48B7FF]" /><span className="text-sm font-bold text-white">support@royalnodes.com</span></span>
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </a>
              <a href="mailto:sales@royalnodes.com" className="flex items-center justify-between border border-[#1E293B] bg-[#0D1522] p-4 hover:border-[#1769FF] transition">
                <span className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-[#48B7FF]" /><span className="text-sm font-bold text-white">sales@royalnodes.com</span></span>
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            {done ? (
              <div className="border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h2 className="text-lg font-bold text-white mt-3">Request received</h2>
                <p className="text-sm text-gray-400 mt-2">
                  Your custom request was saved as ticket <span className="font-mono text-white">{done}</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
                  <a href="/tickets" className="px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">View ticket</a>
                  <button onClick={() => setDone(null)} className="px-5 py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm">Send another</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="border border-[#1E293B] bg-[#0D1522] p-6">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#48B7FF]" />
                  <h2 className="text-sm font-bold text-white">Custom request</h2>
                </div>
                <p className="text-xs text-gray-400 mt-2">Need something we do not list? Describe it and we will scope it.</p>

                <label className="block mt-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Subject</span>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What do you need?" className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]" />
                </label>

                <label className="block mt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Contact (email or phone)</span>
                  <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="you@example.com" className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]" />
                </label>

                <label className="block mt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Details</span>
                  <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={5} placeholder="Hardware, software, timeline, budget — anything useful." className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF] resize-y" />
                </label>

                {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

                <button type="submit" className="mt-5 w-full py-3 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center gap-2">
                  <span>Send request</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[#0D1522] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[900px]">
          <Reveal>
            <SectionLabel>Discord FAQ</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold mt-4 mb-8">Before you join</h2>
          </Reveal>
          <div className="space-y-3">
            {DISCORD_FAQ.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={faq.q} delay={Math.min(i, 4) * 50}>
                  <div className="border border-[#1E293B] bg-[#000000]">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-white hover:text-[#48B7FF] transition"
                    >
                      <span>{faq.q}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-[#48B7FF]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {open && (
                      <div className="px-4 pb-4 text-sm text-gray-300 leading-relaxed border-t border-[#1E293B]">{faq.a}</div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};
