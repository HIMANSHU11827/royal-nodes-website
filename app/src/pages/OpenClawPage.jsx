import React, { useState } from 'react';
import {
  Zap, Clock, Globe, Shield, Lock, HardDrive, ArrowRight,
  ChevronDown, ChevronUp, Terminal, Server
} from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

const CAPABILITIES = [
  {
    icon: Zap,
    title: 'Always on, never idle',
    desc: 'OpenClaw keeps running after you close the laptop. No sleep timers, no waking a home machine to finish a job.'
  },
  {
    icon: Clock,
    title: 'Scheduled routines',
    desc: 'Cron-style schedules for scraping, reports and recurring scripts, executed inside your own instance.'
  },
  {
    icon: Globe,
    title: 'Webhook and API triggers',
    desc: 'Fire a workflow from your own service with a single HTTP call instead of babysitting a terminal.'
  },
  {
    icon: Shield,
    title: 'Isolated container',
    desc: 'Every instance runs in its own container with reserved RAM and CPU. Nothing is shared with other users.'
  },
  {
    icon: Lock,
    title: 'Encrypted secrets',
    desc: 'Inject API keys and tokens as encrypted environment variables instead of scattering them through code.'
  },
  {
    icon: HardDrive,
    title: 'Persistent disk',
    desc: 'NVMe storage that survives restarts, so your files, queues and job state are still there tomorrow.'
  }
];

const STEPS = [
  {
    title: 'Pick a resource tier',
    desc: 'Choose the RAM and vCPU that matches your workload — a light personal assistant, or a tier sized for browser automation and parallel jobs.'
  },
  {
    title: 'Add your secrets and triggers',
    desc: 'Drop in your LLM keys and webhook endpoints as encrypted variables, then point the assistant at the tasks it should own.'
  },
  {
    title: 'Leave it running',
    desc: 'OpenClaw stays online with a restart supervisor and health checks, so a crashed process does not become your problem at 3 AM.'
  }
];

const STATUS_LINES = [
  { key: 'runtime', value: 'active · 24/7' },
  { key: 'container', value: 'isolated · dedicated resources' },
  { key: 'scheduler', value: 'cron jobs enabled' },
  { key: 'secrets', value: 'encrypted env vars' },
  { key: 'disk', value: 'persistent NVMe' },
  { key: 'watchdog', value: 'auto-restart on failure' }
];

const FAQS = [
  {
    q: 'What is Managed OpenClaw on Royal Nodes?',
    a: 'An always-on, containerised assistant for repetitive work: scheduled scripts, scraping pipelines and API integrations. We run the runtime and the health checks; you own the tasks and the credentials.'
  },
  {
    q: 'How is this different from a plain VPS?',
    a: 'On a plain VPS you still install Docker, pin system dependencies, wire a reverse proxy and handle TLS yourself. Managed OpenClaw arrives already configured, with a restart supervisor in front of it.'
  },
  {
    q: 'Can I connect my own model keys?',
    a: 'Yes. Your own provider keys are stored as encrypted environment variables on your instance, and you can rotate or remove them at any time.'
  },
  {
    q: 'Is my instance isolated from other customers?',
    a: 'Yes. Each OpenClaw instance runs in its own container with reserved RAM and CPU, and it is not used to train any model.'
  }
];

const SPECS = [
  { value: '24/7', label: 'Always running' },
  { value: 'Isolated', label: 'Own container' },
  { value: 'Logged', label: 'Every run' }
];

export const OpenClawPage = ({ onOpenCheckout }) => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="w-full bg-[#000000] text-white">
      {/* ============ HERO ============ */}
      <section className="relative w-full overflow-hidden border-b border-[#1E293B] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-40" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(23,105,255,0.16),transparent_62%)]"
        />
        <GlowOrbs />

        <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="animate-fade-up">
              <SectionLabel>OpenClaw · Managed Runtime</SectionLabel>
            </div>

            <h1
              className="animate-fade-up text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.05] mt-6"
              style={{ animationDelay: '80ms' }}
            >
              Your personal AI assistant,
              <br />
              <span className="text-gradient">always on</span>
            </h1>

            <p
              className="animate-fade-up text-base sm:text-lg text-gray-300 max-w-xl mt-6 leading-relaxed"
              style={{ animationDelay: '160ms' }}
            >
              Run background scripts, scrape data and trigger workflows around the clock without keeping
              your own computer awake. OpenClaw lives in a dedicated container that you configure once.
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
                <span>Deploy OpenClaw</span>
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

          {/* Console panel */}
          <div className="animate-scale-in bg-[#0D1522]/90 border border-[#1E293B] backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E293B]">
              <div className="flex items-center space-x-2">
                <span className="pulse-dot" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Instance status
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                illustrative
              </span>
            </div>

            <div className="px-4 py-4 font-mono text-[11px] sm:text-xs space-y-2">
              <div className="text-[#48B7FF] flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>openclaw status</span>
              </div>
              {STATUS_LINES.map((line, i) => (
                <div
                  key={line.key}
                  className="animate-fade-up flex items-start justify-between gap-4 text-gray-400"
                  style={{ animationDelay: `${220 + i * 110}ms` }}
                >
                  <span className="text-gray-500">{line.key}</span>
                  <span className="text-gray-300 text-right">{line.value}</span>
                </div>
              ))}
              <div className="pt-2 text-[#48B7FF]">
                <span>ready for the next job</span>
                <span className="animate-caret ml-1">▌</span>
              </div>
            </div>

            <div className="h-1 shimmer opacity-60" aria-hidden="true" />

            <div className="px-4 py-3 border-t border-[#1E293B] flex items-center justify-between text-[10px] uppercase tracking-wider text-gray-500">
              <span className="flex items-center space-x-1.5">
                <Server className="w-3 h-3" />
                <span>Royal Nodes container</span>
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
              What OpenClaw actually does for you
            </h2>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              A pre-configured assistant runtime with the boring operational parts — isolation, scheduling,
              secrets, restarts — already handled.
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
              Deployed in three steps
            </h2>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              No Dockerfiles, no reverse proxy, no TLS certificates to renew by hand.
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
              Managed OpenClaw FAQs
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
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,105,255,0.18),transparent_65%)]"
          />
          <div aria-hidden="true" className="glow-line absolute inset-x-0 top-0" />

          <div className="relative z-10">
            <div className="flex justify-center">
              <SectionLabel>Ship it</SectionLabel>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-5 tracking-tight">
              Set up your OpenClaw today
            </h2>
            <p className="text-sm text-gray-300 max-w-xl mx-auto mt-4 leading-relaxed">
              Automate the recurring work once, then let it run. Change tiers or tear the instance down
              whenever you want.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <button
                type="button"
                onClick={onOpenCheckout}
                className="hover-glow px-7 py-3.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center space-x-2 transition"
              >
                <span>Launch OpenClaw</span>
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
