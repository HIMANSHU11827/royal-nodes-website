import React, { useEffect, useState } from 'react';
import { ArrowRight, Flame, Sparkles, ShoppingCart, Clock } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/catalog';
import { listDeals, isExpired } from '../lib/store';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

const STEPS = [
  { title: 'Claim the deal', desc: 'Pick an offer on this page.' },
  { title: 'Review your order', desc: 'Choose the term and datacenter on checkout.' },
  { title: 'Get provisioned', desc: 'Once payment is confirmed, your service is set up.' }
];

const Countdown = ({ expiresAt }) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  if (!expiresAt) return null;
  const ms = new Date(expiresAt).getTime() - now;
  if (ms <= 0) return <span className="text-red-300 font-bold">Expired</span>;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return (
    <span className="inline-flex items-center gap-1.5 font-mono font-bold text-amber-300">
      <Clock className="w-3.5 h-3.5" />
      {d}d {String(h).padStart(2, '0')}h {String(m).padStart(2, '0')}m {String(s).padStart(2, '0')}s
    </span>
  );
};

export const DealsPage = ({ onBuyNow, onAddToCart }) => {
  const [deals] = useState(() => listDeals());
  const live = deals.filter((d) => d.active && !isExpired(d.expiresAt));

  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="relative isolate overflow-hidden border-b border-[#1E293B] px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-[#000000]/80 to-[#000000]" />
          <GlowOrbs />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] text-center">
          <Reveal className="flex justify-center">
            <SectionLabel><Flame className="w-3.5 h-3.5 mr-2" /> Festival deals</SectionLabel>
          </Reveal>
          <Reveal delay={80} as="h1" className="mt-6 text-4xl sm:text-6xl font-black tracking-tight">
            <span className="text-gradient">Live offers</span>
          </Reveal>
          <Reveal delay={150} as="p" className="mt-5 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Limited-time festival deals. Claim one before the timer runs out.
          </Reveal>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          {live.length === 0 ? (
            <Reveal className="border border-[#1E293B] bg-[#0D1522] p-10 text-center">
              <Flame className="w-8 h-8 text-gray-600 mx-auto" />
              <p className="text-sm text-gray-400 mt-3">No live deals right now.</p>
              <a href="/pricing" className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm">
                See all plans <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {live.filter((deal) => { const c = SERVICE_CATEGORIES.find((x) => x.id === deal.categoryId); return !c || !c.hidden; }).map((deal, i) => {
                const category = SERVICE_CATEGORIES.find((c) => c.id === deal.categoryId);
                const planObj = {
                  id: deal.id,
                  name: `${deal.festival} — ${deal.planName}`,
                  price: deal.price,
                  category: deal.categoryId
                };
                return (
                  <Reveal key={deal.id} delay={(i % 3) * 70}>
                    <div className="h-full border border-[#1E293B] bg-[#0D1522] p-6 card-lift tilt-card spotlight flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#48B7FF]">{category?.name || 'Deal'}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300">
                            <Flame className="w-3 h-3" /> {deal.festival}
                          </span>
                        </div>
                        <h2 className="text-lg font-bold text-white mt-3">{deal.planName}</h2>
                        <p className="text-xs text-gray-400 mt-1">{deal.festival}</p>

                        <div className="flex items-baseline gap-1 mt-4">
                          <span className="text-3xl font-black text-white">₹{deal.price}</span>
                          <span className="text-xs text-gray-400">/mo</span>
                        </div>

                        <div className="mt-4 text-xs">
                          <Countdown expiresAt={deal.expiresAt} />
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => onBuyNow && onBuyNow(planObj)} className="py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-xs">
                          Claim deal
                        </button>
                        <button type="button" onClick={() => onAddToCart && onAddToCart(planObj)} className="py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-xs inline-flex items-center justify-center gap-1.5">
                          <ShoppingCart className="w-3.5 h-3.5" /> Cart
                        </button>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="w-full bg-[#0D1522] border-y border-[#1E293B] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="max-w-2xl">
            <SectionLabel>How claiming works</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold mt-4">Three steps</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="border-t-2 border-[#1769FF] pt-5">
                  <div className="text-2xl font-black text-[#1769FF]/60">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-base font-bold text-white mt-2">{s.title}</h3>
                  <p className="text-xs text-gray-400 mt-2">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <Sparkles className="w-6 h-6 text-[#48B7FF] mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-bold mt-4">Want a different plan?</h2>
          <p className="text-sm text-gray-400 mt-3">Every category has its own tiers, plans and locations.</p>
          <a href="/pricing" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">
            All plans <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
};
