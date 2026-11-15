import React, { useState } from 'react';
import {
  ArrowRight, Check, Zap, Shield, Server, Globe, Cpu, HardDrive, Terminal,
  Sparkles, MapPin, Clock, Bot, Database, Lock, Activity, Rocket, Layers,
  ChevronDown, ChevronUp, Play, Code2
} from 'lucide-react';
import { SERVICE_CATEGORIES, MINECRAFT_PLANS, FAQS } from '../data/catalog';
import { plansOf, minPriceOf } from '../lib/store';
import { Reveal, Counter, SectionLabel, GlowOrbs, NetworkGraph, WaveDivider } from '../components/Motion';

const CATEGORY_ICONS = {
  minecraft: Zap,
  wordpress: Globe,
  web: Globe,
  vps: Server,
  vds: HardDrive,
  vm: Server,
  dedicated: Server,
  docker: Cpu,
  kubernetes: Layers,
  bot: Bot,
  agents: Sparkles,
  model: Cpu,
  os: Terminal,
  domain: Globe,
  email: Globe,
  ssl: Lock
};

const FEATURES = [
  { icon: Zap, title: 'Deploy in seconds', desc: 'Minecraft nodes come online automatically once payment is confirmed.' },
  { icon: Shield, title: 'DDoS protected', desc: 'Multi-terabit mitigation in front of every game and web node.' },
  { icon: HardDrive, title: 'NVMe everywhere', desc: 'Gen4 NVMe storage and high-frequency AMD cores on every plan.' },
  { icon: Globe, title: 'Multiple regions', desc: 'India, Singapore, Frankfurt and US East — pick the closest.' },
  { icon: Lock, title: 'Isolated containers', desc: 'Every service runs in its own container with strict limits.' },
  { icon: Activity, title: 'Full control panel', desc: 'Console, files, backups, schedules, databases and subusers.' }
];

const STEPS = [
  { n: '01', title: 'Pick a product', desc: 'Choose from Minecraft, VPS, VDS, Docker, Kubernetes, WordPress and more.' },
  { n: '02', title: 'Choose a plan', desc: 'Each product has its own tiers — compare specs side by side.' },
  { n: '03', title: 'Place your order', desc: 'Submit an order request and our team confirms payment.' },
  { n: '04', title: 'Get your server', desc: 'Once confirmed, your service is provisioned and ready to use.' }
];

const REGIONS = [
  { name: 'Mumbai, India', code: 'IN', tag: 'Primary', desc: 'Best latency for India and South Asia.' },
  { name: 'Singapore', code: 'SG', tag: 'Asia Pacific', desc: 'Low latency across South-East Asia.' },
  { name: 'Frankfurt, Germany', code: 'DE', tag: 'Europe', desc: 'Central European coverage.' },
  { name: 'Ashburn, US East', code: 'US', tag: 'Americas', desc: 'East-coast US coverage.' }
];

const USE_CASES = [
  { icon: Zap, title: 'Gaming communities', desc: 'High-tickrate Minecraft nodes from 2 GB up to 12 GB with Bedrock crossplay.' },
  { icon: Code2, title: 'Developers', desc: 'KVM VPS, Docker and Kubernetes with full root access and APIs.' },
  { icon: Globe, title: 'Agencies', desc: 'Host client sites on isolated web hosting with staging and SSL.' },
  { icon: Rocket, title: 'Startups', desc: 'Start small, upgrade resources without downtime as traffic grows.' }
];

const POPULAR_IDS = ['minecraft', 'vps', 'vds', 'web', 'docker', 'domain'];

export const HomePage = ({ onSelectPlan, onBuyNow, onAddToCart }) => {
  const [openFaq, setOpenFaq] = useState(0);
  const buy = onBuyNow || onSelectPlan;

  return (
    <main className="w-full bg-[#000000] text-white">
      {/* HERO */}
      <section className="relative w-full border-b border-[#1E293B] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-16 hidden w-[480px] opacity-30 lg:block">
          <NetworkGraph className="h-auto w-full" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 opacity-50">
          <div className="blob h-full w-full" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="beam" style={{ left: '12%', animationDelay: '0s' }} />
          <span className="beam" style={{ left: '38%', animationDelay: '2.4s' }} />
          <span className="beam" style={{ left: '72%', animationDelay: '4.1s' }} />
          <span className="beam" style={{ left: '88%', animationDelay: '1.3s' }} />
          <span className="particle" style={{ left: '18%', top: '22%', animationDelay: '0s' }} />
          <span className="particle" style={{ left: '64%', top: '16%', animationDelay: '1.2s' }} />
          <span className="particle" style={{ left: '82%', top: '58%', animationDelay: '2.6s' }} />
          <span className="particle" style={{ left: '34%', top: '70%', animationDelay: '3.4s' }} />
          <span className="particle" style={{ left: '52%', top: '44%', animationDelay: '4.2s' }} />
        </div>
        <GlowOrbs />
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="animate-fade-up">
                <SectionLabel>
                  <span className="pulse-dot mr-2" />
                  Infrastructure · India &amp; global
                </SectionLabel>
              </div>

              <h1 className="animate-fade-up text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.98] mt-6">
                Your infrastructure.
                <br />
                <span className="text-gradient">Your control.</span>
              </h1>

              <p className="animate-fade-up text-base sm:text-lg text-gray-300 max-w-xl mt-6 leading-relaxed">
                Minecraft servers, VPS, VDS, Docker, Kubernetes, AI agents, WordPress and domains —
                one account, one panel, one invoice.
              </p>

              <div className="animate-fade-up flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => buy(MINECRAFT_PLANS[3])}
                  className="px-6 py-3 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center space-x-2 hover-glow transition"
                >
                  <span>Deploy a server</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="/pricing"
                  className="px-6 py-3 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm flex items-center justify-center transition"
                >
                  See all plans
                </a>
              </div>

              <div className="animate-fade-up mt-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-2">Popular products</div>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_CATEGORIES.filter((cat) => !cat.hidden && POPULAR_IDS.includes(cat.id)).map((cat) => (
                    <a
                      key={cat.id}
                      href={`/pricing?cat=${cat.id}`}
                      className="px-3 py-1.5 border border-[#1E293B] bg-[#0D1522] hover:border-[#1769FF] hover:bg-[#131E2E] text-xs font-bold text-gray-200 transition"
                    >
                      {cat.short || cat.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="animate-fade-up flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-xs text-gray-400">
                <span className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-[#48B7FF]" /><span>NVMe storage</span></span>
                <span className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-[#48B7FF]" /><span>DDoS protected</span></span>
                <span className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-[#48B7FF]" /><span>24/7 support</span></span>
              </div>
            </div>

            {/* Console panel */}
            <div className="animate-scale-in relative">
              <div className="absolute -inset-3 bg-[#1769FF]/10 blur-2xl" aria-hidden="true" />
              <div className="relative bg-[#0D1522] border border-[#1E293B] scanlines">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E293B]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-500/70" />
                    <span className="w-2 h-2 bg-amber-500/70" />
                    <span className="w-2 h-2 bg-emerald-500/70" />
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 ml-2">royal-nodes — panel</span>
                  </div>
                  <span className="flex items-center space-x-1.5 text-[10px] text-emerald-400 font-bold">
                    <span className="pulse-dot" />
                    <span>ONLINE</span>
                  </span>
                </div>

                <div className="p-4 space-y-3 font-mono text-[11px]">
                  <div className="text-gray-500">$ royalnodes deploy --plan netherite --region mumbai</div>
                  <div className="flex items-center space-x-2 text-gray-300"><span className="text-[#48B7FF]">›</span><span>Order created · awaiting payment confirmation</span></div>
                  <div className="flex items-center space-x-2 text-gray-300"><span className="text-[#48B7FF]">›</span><span>Payment confirmed · allocating resources</span></div>
                  <div className="flex items-center space-x-2 text-gray-300"><span className="text-[#48B7FF]">›</span><span>12 GB RAM · 6 vCPU · 200 GB NVMe</span></div>
                  <div className="flex items-center space-x-2 text-emerald-400"><span>›</span><span>Server ready · panel access issued</span><span className="animate-caret">▋</span></div>
                </div>

                <div className="grid grid-cols-3 border-t border-[#1E293B]">
                  {[
                    { label: 'CPU', value: '6 vCPU' },
                    { label: 'Memory', value: '12 GB' },
                    { label: 'Disk', value: '200 GB' }
                  ].map((m) => (
                    <div key={m.label} className="p-3 border-r border-[#1E293B] last:border-r-0">
                      <div className="text-[9px] uppercase tracking-wider text-gray-500">{m.label}</div>
                      <div className="text-sm font-bold text-white mt-1">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* STATS */}
      <section className="w-full border-b border-[#1E293B] bg-[#0D1522]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { to: 16, suffix: '+', label: 'Product categories' },
            { to: 4, suffix: '', label: 'Hosting regions' },
            { to: 15, prefix: '<', suffix: 's', label: 'Minecraft deploy' },
            { to: 24, suffix: '/7', label: 'Support window' }
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center md:text-left">
              <div className="text-3xl sm:text-4xl font-black text-white">
                <Counter to={s.to} prefix={s.prefix || ''} suffix={s.suffix} />
              </div>
              <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TICKER */}
      <section className="w-full border-b border-[#1E293B] bg-[#000000] py-3 overflow-hidden marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8">
              {['Minecraft', 'VPS', 'VDS', 'Docker', 'Kubernetes', 'AI Agents', 'WordPress', 'Domains', 'Email', 'SSL', 'Model Hosting', 'OS Hosting'].map((label) => (
                <span key={`${dup}-${label}`} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gray-500 whitespace-nowrap">
                  <span className="w-1 h-1 bg-[#1769FF]" />
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="w-full border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="max-w-2xl">
            <SectionLabel>Everything we host</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
              One platform, every workload
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-3">
              Each category has its own locations and its own plan levels.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
            {SERVICE_CATEGORIES.filter((cat) => !cat.hidden).map((cat, i) => {
              const Icon = CATEGORY_ICONS[cat.id] || Server;
              const cheapest = minPriceOf(cat);
              return (
                <Reveal key={cat.id} delay={(i % 4) * 70}>
                  <a
                    href={`/pricing?cat=${cat.id}`}
                    className="group block h-full bg-[#0D1522] border border-[#1E293B] p-5 card-lift tilt-card spotlight"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 bg-[#1769FF]/15 border border-[#1769FF]/30 text-[#48B7FF] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-500">{plansOf(cat).length} plans</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-4 group-hover:text-[#48B7FF] transition">{cat.name}</h3>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{cat.desc}</p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {cat.locations.slice(0, 3).map((loc) => (
                        <span key={loc} className="px-1.5 py-0.5 bg-[#131E2E] border border-[#1E293B] text-[10px] text-gray-300">
                          {loc}
                        </span>
                      ))}
                      {cat.locations.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-gray-500">+{cat.locations.length - 3}</span>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs">
                      <span className="text-gray-400">from <span className="text-white font-bold">₹{cheapest}</span>/mo</span>
                      <span className="text-[#48B7FF] flex items-center space-x-1 font-semibold">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MINECRAFT */}
      <section className="relative w-full bg-[#0D1522] border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <Reveal>
              <SectionLabel>Minecraft hosting</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
                From Dirt to Netherite
              </h2>
              <p className="text-sm text-gray-400 mt-3 max-w-xl">
                High-frequency AMD cores, NVMe storage and a full control panel on every tier.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <a href="/pricing?cat=minecraft" className="inline-flex items-center space-x-2 text-sm font-bold text-[#48B7FF] hover:underline">
                <span>All Minecraft plans</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {MINECRAFT_PLANS.map((plan, i) => (
              <Reveal key={plan.id} delay={(i % 3) * 80}>
                <div className={`h-full bg-[#000000] border p-5 card-lift tilt-card spotlight ${plan.recommended ? 'border-[#1769FF]' : 'border-[#1E293B]'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{plan.name}</h3>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-[#1769FF]/20 text-[#48B7FF] uppercase">{plan.badge}</span>
                  </div>
                  <div className="flex items-baseline space-x-1 mt-3">
                    <span className="text-3xl font-black text-white">₹{plan.price}</span>
                    <span className="text-xs text-gray-400">/mo</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => buy(plan)}
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AGENT */}
      <section className="w-full border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionLabel>Royal Nodes Agent</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
              An AI agent that runs your servers
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-4 leading-relaxed">
              Monitor, repair, secure and back up your infrastructure automatically. You decide what it
              may touch, and every action is logged.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-300">
              {['Self-healing routines', 'Security sweeps', 'Scheduled backups', 'Zero-downtime migrations'].map((f) => (
                <li key={f} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#48B7FF]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="/agent" className="mt-7 inline-flex items-center space-x-2 px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">
              <span>Explore the Agent</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-[#0D1522] border border-[#1E293B] p-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Agent activity</span>
                <span className="flex items-center space-x-1.5 text-[10px] text-emerald-400 font-bold"><span className="pulse-dot" /><span>IDLE</span></span>
              </div>
              <div className="mt-4 space-y-2 font-mono text-[11px] text-gray-300">
                <div className="flex items-start space-x-2"><span className="text-[#48B7FF]">›</span><span>Health check · workers healthy</span></div>
                <div className="flex items-start space-x-2"><span className="text-[#48B7FF]">›</span><span>Backup verified · restore point saved</span></div>
                <div className="flex items-start space-x-2"><span className="text-[#48B7FF]">›</span><span>Firewall rules refreshed</span></div>
                <div className="flex items-start space-x-2 text-emerald-400"><span>›</span><span>All routines complete</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1E293B] text-[10px] text-gray-500">
                Illustrative activity — real routines are configured per server.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full bg-[#0D1522] border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="max-w-2xl">
            <SectionLabel>Why Royal Nodes</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
              Built like infrastructure should be
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1E293B] border border-[#1E293B] mt-10">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 3) * 70} className="bg-[#0D1522]">
                  <div className="p-6 h-full hover:bg-[#131E2E] transition">
                    <Icon className="w-6 h-6 text-[#48B7FF]" />
                    <h3 className="text-base font-bold text-white mt-4">{f.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="w-full border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="max-w-2xl">
            <SectionLabel>Locations</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
              Deploy close to your users
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {REGIONS.map((r, i) => (
              <Reveal key={r.name} delay={i * 70}>
                <div className="bg-[#0D1522] border border-[#1E293B] p-5 card-lift tilt-card spotlight">
                  <div className="flex items-center justify-between">
                    <MapPin className="w-5 h-5 text-[#48B7FF]" />
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#131E2E] border border-[#1E293B] text-gray-300">{r.code}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-4">{r.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-1">{r.tag}</p>
                  <p className="text-xs text-gray-400 mt-2">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full bg-[#0D1522] border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="max-w-2xl">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
              From order to server
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="border-t-2 border-[#1769FF] pt-5">
                  <div className="text-2xl font-black text-[#1769FF]/60">{s.n}</div>
                  <h3 className="text-base font-bold text-white mt-2">{s.title}</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="w-full border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="max-w-2xl">
            <SectionLabel>Who it is for</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">
              Built for every workload
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {USE_CASES.map((u, i) => {
              const Icon = u.icon;
              return (
                <Reveal key={u.title} delay={i * 70}>
                  <div className="h-full bg-[#0D1522] border border-[#1E293B] p-5 card-lift tilt-card spotlight">
                    <Icon className="w-6 h-6 text-[#48B7FF]" />
                    <h3 className="text-sm font-bold text-white mt-4">{u.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{u.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[#0D1522] border-b border-[#1E293B] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[900px] mx-auto">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 mb-8">
              Questions, answered
            </h2>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={faq.q} delay={Math.min(i, 4) * 50}>
                  <div className="bg-[#000000] border border-[#1E293B]">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-white hover:text-[#48B7FF] transition"
                    >
                      <span>{faq.q}</span>
                      {open ? <ChevronUp className="w-4 h-4 text-[#48B7FF]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {open && (
                      <div className="px-4 pb-4 text-sm text-gray-300 leading-relaxed border-t border-[#1E293B]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <GlowOrbs />
        <div className="relative max-w-[900px] mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Ready to deploy?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-4">
            Start with a Minecraft node, a VPS, or join the Agent waitlist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              type="button"
              onClick={() => buy(MINECRAFT_PLANS[3])}
              className="px-6 py-3 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center space-x-2"
            >
              <span>Deploy a server</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a href="/pricing" className="px-6 py-3 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm flex items-center justify-center">
              See all plans
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
