import React, { useState } from 'react';
import {
  Database, Layers, RefreshCw, Sliders, Clock, Lock, ArrowRight,
  ChevronDown, ChevronUp, Activity, Cpu
} from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

const CAPABILITIES = [
  {
    icon: Database,
    title: 'Long-term memory',
    desc: 'Past incidents, configuration changes and decisions stay available, so the next run starts with context instead of a blank prompt.'
  },
  {
    icon: Layers,
    title: 'Multi-step planning',
    desc: 'An objective is broken into steps the agent works through in order, and picks up again after a restart rather than starting over.'
  },
  {
    icon: RefreshCw,
    title: 'Continuous operation',
    desc: 'Hermes reacts to live signals on a schedule instead of waiting for you to type a prompt each time.'
  },
  {
    icon: Sliders,
    title: 'Scoped permissions',
    desc: 'You declare what it may touch. Anything outside that scope is reported for approval before it happens.'
  },
  {
    icon: Clock,
    title: 'Long-running task queue',
    desc: 'Work that takes hours is queued with retries, so a dropped connection or a crash does not lose the objective.'
  },
  {
    icon: Lock,
    title: 'Isolated and private',
    desc: 'Each agent runs in its own container. Your code, logs and databases are never used to train a model.'
  }
];

const STEPS = [
  {
    title: 'Deploy the runtime',
    desc: 'Provision Hermes on a Royal Nodes agent plan. The container, runtime and restart policy are handled for you.'
  },
  {
    title: 'Teach it your environment',
    desc: 'Point it at the services it should watch and write down the rules it should follow — runbooks, escalation paths, what it must never do.'
  },
  {
    title: 'Let it keep working',
    desc: 'Hermes plans and executes within that scope, remembers the outcome, and reports what it changed and why.'
  }
];

const TIMELINE = [
  { tag: 'objective', value: 'keep the checkout service healthy' },
  { tag: 'recall', value: 'prior incident · stalled payment worker' },
  { tag: 'plan', value: 'verify → restart → confirm' },
  { tag: 'context', value: 'runbook + last 30 decisions loaded' },
  { tag: 'result', value: 'written to long-term memory' }
];

const FAQS = [
  {
    q: 'What is Hermes Agent?',
    a: 'A persistent, context-aware agent for work that never really finishes: watching services, following up on incidents, and executing recurring multi-step procedures on a schedule.'
  },
  {
    q: 'How does it keep context between runs?',
    a: 'Hermes stores memory on its own persistent disk, alongside a task queue. Each run reads back what earlier runs learned — incidents, configurations and decisions — instead of starting cold.'
  },
  {
    q: 'How much resources does it need?',
    a: 'It depends on how much work you give it. Agent plans start small for a single workflow and scale up to a dedicated VM for multi-agent teams. Exact specs are on the pricing page.'
  },
  {
    q: 'What happens when it hits something outside its scope?',
    a: 'It stops and reports. Nothing outside the permissions you granted is executed, and every action it does take is written to a log you can read.'
  }
];

const SPECS = [
  { value: 'Memory', label: 'Across runs' },
  { value: 'Scoped', label: 'You set limits' },
  { value: 'Audited', label: 'Every action' }
];

export const HermesAgentPage = ({ onOpenCheckout }) => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="w-full bg-[#000000] text-white">
      {/* ============ HERO ============ */}
      <section className="relative w-full overflow-hidden border-b border-[#1E293B] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-40" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(72,183,255,0.14),transparent_62%)]"
        />
        <GlowOrbs />

        <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="animate-fade-up">
              <SectionLabel>Hermes Agent · Persistent Context</SectionLabel>
            </div>

            <h1
              className="animate-fade-up text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.05] mt-6"
              style={{ animationDelay: '80ms' }}
            >
              An agent that
              <br />
              <span className="text-gradient">remembers</span>
            </h1>

            <p
              className="animate-fade-up text-base sm:text-lg text-gray-300 max-w-xl mt-6 leading-relaxed"
              style={{ animationDelay: '160ms' }}
            >
              Hermes keeps context between runs: what happened last time, what it changed, what it still
              owes you. That is what makes continuous automation possible instead of a pile of one-off prompts.
            </p>

            <div
              className="animate-fade-up flex flex-col sm:flex-row gap-3 mt-8"
              style={{ animationDelay: '240ms' }}
            >
              <button
                type="button"
                onClick={onOpenCheckout}
                className="hover-glow px-6 py-3.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center space-x-2 transition"
              >
                <span>Deploy Hermes Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/pricing?cat=agents"
                className="px-6 py-3.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm flex items-center justify-center transition"
              >
                Compare agent plans
              </a>
            </div>

            <div
              className="animate-fade-up grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-[#1E293B]"
              style={{ animationDelay: '320ms' }}
            >
              {SPECS.map((spec) => (
                <div key={spec.label}>
                  <div className="text-lg font-bold text-white">{spec.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Memory timeline panel */}
          <div className="animate-scale-in bg-[#0D1522]/90 border border-[#1E293B] backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E293B]">
              <div className="flex items-center space-x-2">
                <span className="pulse-dot" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Agent trace
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                illustrative
              </span>
            </div>

            <div className="px-4 py-4 font-mono text-[11px] sm:text-xs space-y-2.5">
              <div className="text-[#48B7FF] flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5" />
                <span>hermes recall --current-objective</span>
              </div>
              {TIMELINE.map((line, i) => (
                <div
                  key={line.tag}
                  className="animate-fade-up grid grid-cols-[74px_1fr] gap-2 text-gray-400"
                  style={{ animationDelay: `${220 + i * 120}ms` }}
                >
                  <span className="text-gray-600">{line.tag}</span>
                  <span className="text-gray-300">{line.value}</span>
                </div>
              ))}
              <div className="pt-2 text-[#48B7FF]">
                <span>context restored</span>
                <span className="animate-caret ml-1">▌</span>
              </div>
            </div>

            <div className="h-1 shimmer opacity-60" aria-hidden="true" />

            <div className="px-4 py-3 border-t border-[#1E293B] flex items-center justify-between text-[10px] uppercase tracking-wider text-gray-500">
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-3 h-3" />
                <span>Persistent runtime</span>
              </span>
              <span>managed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="w-full border-b border-[#1E293B] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="max-w-2xl">
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mt-5 tracking-tight">
              What Hermes Agent can do for you
            </h2>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Built for work that spans days rather than a single conversation: persistent memory,
              bounded permissions, and a record of everything it touched.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1E293B] border border-[#1E293B] mt-10">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <Reveal
                  key={cap.title}
                  delay={i * 70}
                  className="group relative bg-[#0D1522] hover:bg-[#131E2E] p-6 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="w-6 h-6 text-[#48B7FF] group-hover:text-white transition-colors" strokeWidth={1.5} />
                    <span className="font-mono text-[10px] text-gray-600">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-5">{cap.title}</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{cap.desc}</p>
                  <div className="glow-line mt-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="relative w-full bg-[#0D1522] border-b border-[#1E293B] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1769FF] to-transparent opacity-70"
        />
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="max-w-2xl">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mt-5 tracking-tight">
              From deployed to dependable
            </h2>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Hermes is only as useful as the context and limits you give it. Both take minutes to set.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="relative border-t-2 border-[#1769FF] pt-6">
                <div className="flex items-baseline space-x-3">
                  <span className="font-mono text-3xl font-black text-[#1769FF]/40">0{i + 1}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#48B7FF]">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-4">{step.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="w-full border-b border-[#1E293B] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[900px] mx-auto">
          <Reveal>
            <SectionLabel>Questions</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-5 tracking-tight">
              Hermes Agent FAQs
            </h2>
          </Reveal>

          <div className="mt-8 space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={faq.q} delay={i * 60} className="bg-[#0D1522] border border-[#1E293B]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-[#48B7FF] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {open ? (
                      <ChevronUp className="w-4 h-4 text-[#48B7FF] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                    )}
                  </button>
                  {open && (
                    <div className="px-4 sm:px-5 pb-5 pt-3 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-[#1E293B]">
                      {faq.a}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Reveal className="relative max-w-[1200px] mx-auto overflow-hidden border border-[#1E293B] bg-[#0D1522] px-6 sm:px-12 py-14 text-center">
          <div aria-hidden="true" className="absolute inset-0 dot-bg opacity-30" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(72,183,255,0.16),transparent_65%)]"
          />
          <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0" />

          <div className="relative z-10">
            <div className="flex justify-center">
              <SectionLabel>Ship it</SectionLabel>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-5 tracking-tight">
              Launch Hermes Agent today
            </h2>
            <p className="text-sm text-gray-300 max-w-xl mx-auto mt-4 leading-relaxed">
              Give it a scope, give it a schedule, and read exactly what it did. Persistent context,
              bounded permissions, no black box.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <button
                type="button"
                onClick={onOpenCheckout}
                className="hover-glow px-7 py-3.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center space-x-2 transition"
              >
                <span>Deploy Hermes Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/pricing?cat=agents"
                className="px-7 py-3.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm flex items-center justify-center transition"
              >
                See agent plans
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};
