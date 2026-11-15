import React, { useState } from 'react';
import {
  Sparkles, ArrowRight, Check, Zap, Shield, Cpu, Terminal,
  RefreshCw, Clock, Database, Lock, Activity, ChevronDown, ChevronUp
} from 'lucide-react';
import { AGENT_PLANS } from '../data/catalog';
import { Reveal, OrbitRings } from '../components/Motion';

const CAPABILITIES = [
  {
    icon: Zap,
    title: 'Self-healing',
    desc: 'Watches memory, workers and error logs, then restarts or patches what has stalled before users notice.'
  },
  {
    icon: Shield,
    title: 'Security hardening',
    desc: 'Enforces SSH keys, blocks brute-force attempts and keeps firewall rules current.'
  },
  {
    icon: Activity,
    title: 'Performance tuning',
    desc: 'Compresses assets, enables caching and flags slow queries on a schedule.'
  },
  {
    icon: RefreshCw,
    title: 'Zero-downtime migrations',
    desc: 'Moves files, databases and DNS in one run while the site stays online.'
  },
  {
    icon: Database,
    title: 'Backups and recovery',
    desc: 'Runs backups on your schedule and verifies each archive can be restored.'
  },
  {
    icon: Lock,
    title: 'Isolated execution',
    desc: 'Every job runs in a separate container. Your code and data are never used for training.'
  }
];

const STEPS = [
  { title: 'Connect a server', desc: 'Point the agent at any Royal Nodes server, VPS or VDS.' },
  { title: 'Choose what it may do', desc: 'Enable the routines you want: healing, security, performance, backups.' },
  { title: 'Let it run', desc: 'The agent works on a schedule and reports every action it takes.' }
];

const ROUTINES = [
  {
    id: 'health',
    title: 'Health check',
    lines: [
      'Reading CPU, memory and worker state',
      'Found one stalled worker process',
      'Restarting worker on an isolated container',
      'Health check complete'
    ]
  },
  {
    id: 'security',
    title: 'Security sweep',
    lines: [
      'Scanning open ports and SSH configuration',
      'Checking firewall rules against blocklists',
      'No exposed services found',
      'Security sweep complete'
    ]
  },
  {
    id: 'performance',
    title: 'Performance pass',
    lines: [
      'Reviewing asset sizes and cache headers',
      'Flagging uncompressed images',
      'Recommending cache rules for review',
      'Performance pass complete'
    ]
  },
  {
    id: 'backup',
    title: 'Backup verify',
    lines: [
      'Locating the latest archive',
      'Checking archive integrity',
      'Recording result in the audit log',
      'Backup verify complete'
    ]
  }
];

const FAQS = [
  {
    q: 'What does the agent actually change?',
    a: 'Only the routines you enable. Each action is written to an audit log with what changed, when, and why. Anything outside its permissions is reported for you to approve.'
  },
  {
    q: 'Which servers can it manage?',
    a: 'Any Royal Nodes Minecraft node, VPS, VDS or web hosting plan. It uses the same control panel and API your account already has access to.'
  },
  {
    q: 'Does it need my code?',
    a: 'No. The agent operates on the server, not your source. Your code and databases are never sent to a third party or used to train models.'
  },
  {
    q: 'Can I turn it off?',
    a: 'Yes. Enable or disable any routine at any time, or stop the agent entirely. Your servers keep running either way.'
  }
];

export const AgentPage = ({ onOpenCheckout, onSelectPlan, onBuyNow, onAddToCart }) => {
  const [activeRoutine, setActiveRoutine] = useState(ROUTINES[0].id);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const preview = (routineId) => {
    setActiveRoutine(routineId);
    setRunning(true);
    const routine = ROUTINES.find((r) => r.id === routineId);
    setLog([]);
    let index = 0;
    const timer = setInterval(() => {
      if (index < routine.lines.length) {
        setLog((prev) => [...prev, routine.lines[index]]);
        index += 1;
      } else {
        clearInterval(timer);
        setRunning(false);
      }
    }, 550);
  };

  const choose = (plan) => {
    if (onSelectPlan) onSelectPlan(plan);
    else if (onOpenCheckout) onOpenCheckout();
  };

  return (
    <main className="w-full bg-[#000000] text-white">
      {/* HERO */}
      <Reveal as="section" className="w-full border-b border-[#1E293B] pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1769FF]/15 border border-[#1769FF]/40 text-[#48B7FF] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Royal Nodes Agent</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mt-6 leading-none">
              An AI agent that
              <br />
              runs your servers
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl mt-6 leading-relaxed">
              Monitor, repair, secure and back up your infrastructure automatically. You decide what it may touch — every action is logged.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => choose(AGENT_PLANS[1])}
                className="px-6 py-3 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center space-x-2 transition"
              >
                <span>Start with Agent Plus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="/pricing?cat=agents"
                className="px-6 py-3 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm flex items-center justify-center transition"
              >
                Compare plans
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-[#1E293B]">
              <div>
                <div className="text-lg font-bold text-white">24/7</div>
                <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">Always on</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">Audited</div>
                <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">Every action</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">Scoped</div>
                <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">You set limits</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-[#0D1522] border border-[#1E293B] p-6">
            <OrbitRings />
            <div className="relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                Agent activity
              </span>
              <span className={`text-[10px] font-bold ${running ? 'text-amber-400' : 'text-emerald-400'}`}>
                {running ? 'RUNNING' : 'IDLE'}
              </span>
            </div>
            <div className="mt-4 space-y-2 font-mono text-[11px] text-gray-300 min-h-[140px]">
              {log.length === 0 && (
                <div className="text-gray-500">Preview only — choose a routine to see what the agent would do.</div>
              )}
              {log.map((line, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <span className="text-[#48B7FF]">›</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[#1E293B] flex flex-wrap gap-2">
              {ROUTINES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => preview(r.id)}
                  className={`px-3 py-1.5 text-[11px] font-semibold border transition ${
                    activeRoutine === r.id
                      ? 'border-[#1769FF] bg-[#1769FF]/15 text-white'
                      : 'border-[#1E293B] bg-[#131E2E] text-gray-300 hover:border-[#1769FF]'
                  }`}
                >
                  {r.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>
      </Reveal>

      {/* CAPABILITIES */}
      <Reveal as="section" className="w-full bg-[#0D1522] border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What it handles</h2>
            <p className="text-sm text-gray-400 mt-3">
              Routine operations, handled on a schedule or on demand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1E293B] border border-[#1E293B] mt-10">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div key={cap.title} className="bg-[#0D1522] p-6">
                  <Icon className="w-6 h-6 text-[#48B7FF]" />
                  <h3 className="text-base font-bold text-white mt-4">{cap.title}</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* HOW IT WORKS */}
      <Reveal as="section" className="w-full border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {STEPS.map((step, i) => (
              <div key={step.title} className="border-t-2 border-[#1769FF] pt-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#48B7FF]">
                  Step {i + 1}
                </div>
                <h3 className="text-base font-bold text-white mt-2">{step.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* PLANS */}
      <Reveal as="section" className="w-full bg-[#0D1522] border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Agent plans</h2>
            <p className="text-sm text-gray-400 mt-3">
              Every tier includes the full agent. The difference is how much it can run.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {AGENT_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`bg-[#131E2E] border p-6 flex flex-col justify-between ${
                  plan.recommended ? 'border-[#1769FF]' : 'border-[#1E293B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{plan.name}</h3>
                    {plan.recommended && (
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-[#1769FF] text-white uppercase">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline space-x-1 mt-3">
                    <span className="text-3xl font-black text-white">₹{plan.price}</span>
                    <span className="text-xs text-gray-400">/mo</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{plan.executions}</p>

                  <ul className="mt-5 space-y-2 text-xs text-gray-300">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#48B7FF] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => (onBuyNow || choose)(plan)}
                    className="py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-xs transition"
                  >
                    Buy now
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddToCart && onAddToCart(plan)}
                    disabled={!onAddToCart}
                    className="py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-xs transition disabled:opacity-40"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* FAQ */}
      <Reveal as="section" className="w-full border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="bg-[#0D1522] border border-[#1E293B]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-white hover:text-[#48B7FF] transition"
                  >
                    <span>{faq.q}</span>
                    {open ? (
                      <ChevronUp className="w-4 h-4 text-[#48B7FF]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {open && (
                    <div className="px-4 pb-4 text-sm text-gray-300 leading-relaxed border-t border-[#1E293B]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" className="w-full bg-[#0D1522] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Put the agent on your servers
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            Start with Agent Plus, or compare every tier first.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
            <button
              type="button"
              onClick={() => choose(AGENT_PLANS[1])}
              className="px-6 py-3 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center space-x-2"
            >
              <span>Start with Agent Plus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/pricing?cat=agents"
              className="px-6 py-3 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm flex items-center justify-center"
            >
              Compare plans
            </a>
          </div>
        </div>
      </Reveal>
    </main>
  );
};
