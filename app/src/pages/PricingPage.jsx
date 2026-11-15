import React, { useEffect, useState } from 'react';
import { ArrowRight, ShoppingCart, MapPin } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/catalog';
import { specChips } from '../lib/specs';
import { tiersOf } from '../lib/store';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export const PricingPage = ({ onSelectPlan, onBuyNow, onAddToCart, initialCategory }) => {
  const [billingTerm, setBillingTerm] = useState('monthly');
  const [category, setCategory] = useState(initialCategory || 'minecraft');

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  const visibleCategories = SERVICE_CATEGORIES.filter((c) => !c.hidden);
  const isDomain = category === 'domain';
  const active = visibleCategories.find((c) => c.id === category) || visibleCategories[0] || SERVICE_CATEGORIES[0];
  const tiers = tiersOf(active);
  const priceFor = (plan) => (billingTerm === 'annual' ? Math.round((Number(plan.price) || 0) * 0.8) : Number(plan.price) || 0);

  const buildPlan = (tier, plan) => ({
    id: `${active.id}-${tier.id}-${plan.name}`,
    name: `${active.name} — ${tier.name} — ${plan.name}`,
    price: Number(plan.price) || 0,
    category: active.id,
    tier: tier.name
  });

  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="relative isolate overflow-hidden border-b border-[#1E293B] px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/80 to-[#000000]" />
          <GlowOrbs />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] text-center">
          <SectionLabel>Plans &amp; pricing</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-5">Choose your plan</h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mt-4">
            Pick a product, then a tier, then a plan. Prices are per month.
          </p>

          <div className="no-scrollbar flex justify-start sm:justify-center gap-2 pt-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`shrink-0 whitespace-nowrap px-3 py-2 text-xs font-bold border transition ${
                  category === cat.id
                    ? 'bg-[#1769FF] border-[#1769FF] text-white'
                    : 'bg-[#131E2E] border-[#1E293B] text-gray-300 hover:border-[#1769FF]'
                }`}
              >
                {cat.short || cat.name}
              </button>
            ))}
          </div>

          {!isDomain && (
            <div className="inline-flex items-center p-1 bg-[#131E2E] border border-[#1E293B] text-xs font-semibold mt-6">
              <button type="button" onClick={() => setBillingTerm('monthly')} className={`px-4 py-1.5 ${billingTerm === 'monthly' ? 'bg-[#1769FF] text-white' : 'text-gray-300'}`}>Monthly</button>
              <button type="button" onClick={() => setBillingTerm('annual')} className={`px-4 py-1.5 flex items-center ${billingTerm === 'annual' ? 'bg-[#1769FF] text-white' : 'text-gray-300'}`}>
                <span>12 months</span><span className="text-[10px] text-emerald-400 font-bold ml-1.5">SAVE 20%</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="w-full bg-[#0D1522] border-b border-[#1E293B] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{active.name}</h2>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {(active.locations || []).map((loc) => (
                  <span key={loc} className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#131E2E] border border-[#1E293B] text-[11px] text-gray-300">
                    <MapPin className="w-3 h-3 text-[#48B7FF]" />{loc}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-xs text-gray-500">{tiers.length} tiers</span>
          </div>

          <div className="space-y-10">
            {tiers.map((tier, ti) => (
              <div key={tier.id}>
                <Reveal delay={ti * 50} className="flex items-center gap-4 mb-4">
                  <h3 className="text-xl font-black text-white uppercase tracking-wide">{tier.name}</h3>
                  <div className="glow-line flex-1" aria-hidden="true" />
                  <span className="text-[11px] text-gray-500">{tier.plans.length} plans</span>
                </Reveal>

                {tier.plans.length === 0 ? (
                  <p className="text-sm text-gray-500">No plans in this tier yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tier.plans.map((plan, i) => (
                      <Reveal key={`${tier.id}-${plan.name}-${i}`} delay={(i % 3) * 60}>
                        <div className="h-full border border-[#1E293B] bg-[#000000] p-6 card-lift tilt-card spotlight flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="text-base font-bold text-white">{plan.name}</h4>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#48B7FF]">{tier.name}</span>
                          </div>

                          <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-3xl font-black text-white">{inr(priceFor(plan))}</span>
                            <span className="text-xs text-gray-400">{isDomain ? '/year' : '/mo'}</span>
                          </div>
                          {billingTerm === 'annual' && !isDomain && (
                            <p className="text-[11px] text-emerald-400 mt-1">Billed {inr(priceFor(plan) * 12)}/year</p>
                          )}

                          {specChips(plan, active.id).length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {specChips(plan, active.id).map((chip) => (
                                <span key={chip} className="px-2 py-1 border border-[#1E293B] bg-[#0D1522] text-[10px] font-bold text-gray-300">
                                  {chip}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="mt-5 grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => (onBuyNow || onSelectPlan)(buildPlan(tier, plan))}
                              className="py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-xs flex items-center justify-center gap-1.5"
                            >
                              Buy now <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onAddToCart && onAddToCart(buildPlan(tier, plan))}
                              disabled={!onAddToCart}
                              className="py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-40"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" /> Cart
                            </button>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#000000] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Not sure which tier?</h2>
          <p className="text-sm text-gray-400 mt-3">
            Start with a lower tier and move up later. You can switch tiers at any time from your account.
          </p>
          <a href="/tickets" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm">
            Ask us <ArrowRight className="w-4 h-4 text-[#48B7FF]" />
          </a>
        </div>
      </section>
    </main>
  );
};
