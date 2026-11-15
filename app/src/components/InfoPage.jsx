import React from 'react';
import {
  ArrowRight, Check, ChevronLeft, BookOpen, Code2, Cpu, Database,
  Globe, Layers, Rocket, Server, Shield, Sparkles, Terminal, Zap, FileText
} from 'lucide-react';
import { Reveal, Counter, SectionLabel, GlowOrbs } from './Motion';

const ICONS_BY_BASE = {
  solutions: [Rocket, Globe, Zap, Layers, Shield, Sparkles],
  developers: [Code2, Terminal, Server, Database, Cpu, Layers],
  resources: [BookOpen, FileText, Globe, Layers, Shield, Sparkles]
};

const iconFor = (base, index) => {
  const set = ICONS_BY_BASE[base] || ICONS_BY_BASE.resources;
  return set[index % set.length];
};

const pad = (n) => String(n + 1).padStart(2, '0');

const Backdrop = ({ withGrid = true }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    {withGrid && <div className="absolute inset-0 grid-bg opacity-40" />}
    <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/80 to-[#000000]" />
    <GlowOrbs />
  </div>
);

/* ------------------------------------------------------------------ */
/* Section-specific heroes                                             */
/* ------------------------------------------------------------------ */

function SolutionsHero({ title, subtitle, items }) {
  return (
    <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div>
        <Reveal><SectionLabel>Solutions</SectionLabel></Reveal>
        <Reveal delay={80} as="h1" className="mt-6 text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
          <span className="text-gradient">{title}</span>
        </Reveal>
        <Reveal delay={150} as="p" className="mt-5 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
          {subtitle}
        </Reveal>
        <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
          <a href="#browse" className="px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm inline-flex items-center gap-2">
            <span>Find your goal</span><ArrowRight className="w-4 h-4" />
          </a>
          <a href="/pricing" className="px-5 py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm">
            See plans
          </a>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="border border-[#1E293B] bg-[#0D1522]">
          <div className="px-4 py-3 border-b border-[#1E293B] text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">
            Goals you can start today
          </div>
          <ul className="divide-y divide-[#1E293B]">
            {items.slice(0, 6).map((item, i) => (
              <li key={item.slug}>
                <a href={`/solutions/${item.slug}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#131E2E] transition group">
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-[11px] text-[#48B7FF]">{pad(i)}</span>
                    <span className="text-sm text-gray-200 truncate group-hover:text-white">{item.title}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#48B7FF] transition" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

function DevelopersHero({ title, subtitle }) {
  return (
    <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <Reveal><SectionLabel>Developers</SectionLabel></Reveal>
        <Reveal delay={80} as="h1" className="mt-6 text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
          <span className="text-gradient">{title}</span>
        </Reveal>
        <Reveal delay={150} as="p" className="mt-5 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
          {subtitle}
        </Reveal>
        <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
          <a href="#browse" className="px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm inline-flex items-center gap-2">
            <span>Browse tools</span><ArrowRight className="w-4 h-4" />
          </a>
          <a href="/pricing?cat=developer" className="px-5 py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm">
            Developer plans
          </a>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="border border-[#1E293B] bg-[#080D14]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E293B]">
            <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-gray-500">~/royal-nodes</span>
            <span className="flex gap-1.5">
              <span className="w-2 h-2 bg-red-500/60" />
              <span className="w-2 h-2 bg-amber-500/60" />
              <span className="w-2 h-2 bg-emerald-500/60" />
            </span>
          </div>
          <div className="p-5 font-mono text-[11px] leading-relaxed text-gray-300 space-y-1.5">
            <div><span className="text-[#48B7FF]">$</span> royalnodes auth login</div>
            <div className="text-gray-500"># authenticated</div>
            <div><span className="text-[#48B7FF]">$</span> royalnodes deploy --plan kvm-2</div>
            <div className="text-gray-500"># order created, awaiting confirmation</div>
            <div><span className="text-[#48B7FF]">$</span> royalnodes list</div>
            <div className="text-emerald-400">kvm-2 · mumbai · ready<span className="animate-caret">▋</span></div>
          </div>
          <div className="px-4 py-2.5 border-t border-[#1E293B] text-[10px] text-gray-600">
            Illustrative example of the developer workflow.
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function ResourcesHero({ title, subtitle, items }) {
  return (
    <div className="relative z-10 mx-auto max-w-[900px] text-center">
      <Reveal className="flex justify-center"><SectionLabel>Resources</SectionLabel></Reveal>
      <Reveal delay={80} as="h1" className="mt-6 text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
        <span className="text-gradient">{title}</span>
      </Reveal>
      <Reveal delay={150} as="p" className="mt-5 text-sm leading-relaxed text-gray-400 sm:text-base">
        {subtitle}
      </Reveal>
      <Reveal delay={220} className="mt-7 flex flex-wrap justify-center gap-2">
        {items.slice(0, 8).map((item) => (
          <a key={item.slug} href={`/resources/${item.slug}`} className="px-3 py-1.5 border border-[#1E293B] bg-[#131E2E] text-[11px] font-semibold text-gray-300 hover:border-[#1769FF] hover:text-white transition">
            {item.title}
          </a>
        ))}
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Index                                                               */
/* ------------------------------------------------------------------ */

function IndexPage({ base, label, title, subtitle, items }) {
  const isDev = base === 'developers';
  const isRes = base === 'resources';

  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="relative isolate w-full overflow-hidden border-b border-[#1E293B] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
        <Backdrop />
        {base === 'solutions' && <SolutionsHero title={title} subtitle={subtitle} items={items} />}
        {base === 'developers' && <DevelopersHero title={title} subtitle={subtitle} />}
        {isRes && <ResourcesHero title={title} subtitle={subtitle} items={items} />}
      </section>

      <section id="browse" className="w-full bg-[#0D1522] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <h2 className="text-lg font-black tracking-tight text-white sm:text-xl">Browse {label}</h2>
              <p className="mt-1 text-xs text-gray-500">
                {items.length} {items.length === 1 ? 'entry' : 'entries'} · <Counter to={items.length} /> available
              </p>
            </div>
            <div className="glow-line hidden flex-1 sm:block" aria-hidden="true" />
          </Reveal>

          {isDev ? (
            <div className="border border-[#1E293B]">
              {items.map((item, i) => (
                <Reveal key={item.slug} delay={Math.min(i, 8) * 50}>
                  <a
                    href={`/${base}/${item.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 border-b border-[#1E293B] last:border-b-0 hover:bg-[#131E2E] transition"
                  >
                    <span className="font-mono text-[11px] text-gray-600 group-hover:text-[#48B7FF]">{pad(i)}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-white group-hover:text-[#48B7FF] transition">{item.title}</span>
                      <span className="block text-xs text-gray-400 mt-0.5 truncate">{item.desc}</span>
                    </span>
                    <span className="hidden sm:inline font-mono text-[10px] text-gray-600 group-hover:text-gray-300">/{base}/{item.slug}</span>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#48B7FF] transition" />
                  </a>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${isRes ? 'lg:grid-cols-3' : 'lg:grid-cols-3'}`}>
              {items.map((item, i) => {
                const Icon = iconFor(base, i);
                return (
                  <Reveal key={item.slug} delay={Math.min(i, 9) * 60} className="h-full">
                    <a
                      href={`/${base}/${item.slug}`}
                      className="group relative flex h-full flex-col border border-[#1E293B] bg-[#131E2E] p-6 card-lift tilt-card spotlight"
                    >
                      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-[#1769FF] to-[#48B7FF] transition-all duration-300 group-hover:w-full" />
                      <span className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-10 w-10 items-center justify-center border border-[#1E293B] bg-[#0D1522] text-[#48B7FF] group-hover:border-[#1769FF]/60 group-hover:bg-[#1769FF]/10 transition">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="font-mono text-[11px] text-gray-600 group-hover:text-[#48B7FF]/70">{pad(i)}</span>
                      </span>
                      <h3 className="mt-5 text-base font-bold text-white group-hover:text-[#48B7FF] transition">{item.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400 line-clamp-3">{item.desc}</p>
                      <span className="mt-6 flex items-center justify-between border-t border-[#1E293B] pt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500 group-hover:text-white">
                        <span>{isRes ? 'Read' : 'Open'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#48B7FF] group-hover:translate-x-0.5 transition" />
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Detail                                                              */
/* ------------------------------------------------------------------ */

function DetailPage({ base, label, item, items }) {
  const index = items.findIndex((i) => i.slug === item.slug);
  const Icon = iconFor(base, index < 0 ? 0 : index);
  const points = Array.isArray(item.points) ? item.points : [];
  const others = items.filter((i) => i.slug !== item.slug);
  const isDev = base === 'developers';
  const isRes = base === 'resources';

  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="relative isolate w-full overflow-hidden border-b border-[#1E293B] px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
        <Backdrop />
        <div className="relative z-10 mx-auto max-w-[900px]">
          <nav aria-label={`${label} breadcrumb`}>
            <a href={`/${base}`} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400 hover:text-white transition">
              <ChevronLeft className="h-4 w-4" /> All {label}
            </a>
          </nav>

          <Reveal delay={60} className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center border border-[#1769FF]/40 bg-[#1769FF]/10 text-[#48B7FF]">
              <Icon className="h-4 w-4" />
            </span>
            <SectionLabel>{label}</SectionLabel>
            <span className="hidden text-[11px] uppercase tracking-[0.16em] text-gray-600 sm:inline">/{item.slug}</span>
          </Reveal>

          <Reveal delay={130} as="h1" className="mt-5 max-w-3xl text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            {item.title}
          </Reveal>

          <Reveal delay={200} as="p" className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            {item.desc}
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-[#0D1522] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[900px]">
          {item.body && (
            <Reveal className="mb-10 space-y-4">
              {String(item.body).split('\n\n').map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-gray-300 sm:text-base">{para}</p>
              ))}
            </Reveal>
          )}

          {points.length > 0 && (
            <>
              <Reveal className="flex items-center gap-4">
                <h2 className="shrink-0 text-lg font-black tracking-tight sm:text-xl">
                  {isDev ? 'What you can do' : 'What you get'}
                </h2>
                <div className="glow-line flex-1" aria-hidden="true" />
              </Reveal>
              <Reveal delay={80} className="mt-6">
                <ul className={`grid grid-cols-1 gap-px border border-[#1E293B] bg-[#1E293B] ${isDev ? '' : 'sm:grid-cols-2'}`}>
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3 bg-[#131E2E] p-4 sm:p-5">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-[#1769FF]/40 bg-[#1769FF]/10 text-[#48B7FF]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm leading-relaxed text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </>
          )}

          {isDev && (
            <Reveal delay={100} className="mt-8">
              <div className="border border-[#1E293B] bg-[#080D14]">
                <div className="px-4 py-2.5 border-b border-[#1E293B] text-[10px] font-mono uppercase tracking-[0.16em] text-gray-500">
                  example
                </div>
                <pre className="p-5 text-[11px] leading-relaxed font-mono text-gray-300 overflow-x-auto">
{`# illustrative workflow
royalnodes auth login
royalnodes deploy --plan kvm-2 --region mumbai
royalnodes list`}
                </pre>
              </div>
            </Reveal>
          )}

          {!points.length && !item.body && (
            <Reveal className="border border-[#1E293B] bg-[#131E2E] p-5 sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#48B7FF]">In progress</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400">
                The write-up for {item.title} is not published yet. The short version is above.
              </p>
            </Reveal>
          )}

          {item.href && (
            <Reveal delay={80} className="mt-8">
              <div className="flex flex-col gap-5 border border-[#1E293B] bg-[#131E2E] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="text-sm font-bold text-white">Next step</p>
                  <p className="mt-1 max-w-md text-xs leading-relaxed text-gray-400">
                    Compare the plans that cover {item.title}.
                  </p>
                </div>
                <a href={item.href} className="inline-flex shrink-0 items-center justify-center gap-2 border border-[#1769FF] bg-[#1769FF] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0d5be6] hover:border-[#0d5be6]">
                  <span>{item.cta || 'View plans'}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          )}

          {others.length > 0 && (
            <div className="mt-14 border-t border-[#1E293B] pt-8">
              <Reveal className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">More in {label}</h2>
                <a href={`/${base}`} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#48B7FF] hover:text-white transition">
                  All {label}<ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Reveal>
              <div className={`mt-5 grid grid-cols-1 gap-3 ${isRes ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {others.map((other, i) => (
                  <Reveal key={other.slug} delay={Math.min(i, 8) * 50} className="h-full">
                    <a href={`/${base}/${other.slug}`} className="group flex h-full items-start justify-between gap-4 border border-[#1E293B] bg-[#131E2E] p-4 hover:border-[#1769FF] transition">
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-white group-hover:text-[#48B7FF] transition">{other.title}</span>
                        <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-gray-400">{other.desc}</span>
                      </span>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-600 group-hover:text-[#48B7FF] transition" />
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export const InfoPage = ({ base, label, title, subtitle, items, slug }) => {
  const list = Array.isArray(items) ? items : [];
  const item = slug ? list.find((i) => i.slug === slug) : null;

  if (item) return <DetailPage base={base} label={label} item={item} items={list} />;
  return <IndexPage base={base} label={label} title={title} subtitle={subtitle} items={list} />;
};
