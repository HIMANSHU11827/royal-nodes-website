import React, { useEffect, useState } from 'react';
import { CheckCircle2, Server, ArrowRight, Info, ChevronLeft, MapPin } from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';
import { findCoupon, getSettings } from '../lib/store';
import { SERVICE_CATEGORIES } from '../data/catalog';
import { gatewayStatus, payWithRazorpay, isTestKey } from '../lib/payments';

const ORDER_STORAGE_KEY = 'rn_orders';

export const CheckoutPage = ({ selectedItem, user }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const isDomain = selectedItem?.category === 'domain';
  const [datacenter, setDatacenter] = useState('mumbai');
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [order, setOrder] = useState(null);
  const [gateway, setGateway] = useState({ enabled: false });
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

  useEffect(() => {
    gatewayStatus().then(setGateway);
  }, []);

  if (!selectedItem) {
    return (
      <main className="w-full bg-[#000000] text-white">
        <section className="relative isolate overflow-hidden border-b border-[#1E293B] px-4 py-20 sm:px-6 lg:px-8">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <GlowOrbs />
          </div>
          <div className="relative z-10 mx-auto max-w-[700px] text-center">
            <SectionLabel>Checkout</SectionLabel>
            <h1 className="text-3xl sm:text-4xl font-black mt-5">No plan selected</h1>
            <p className="text-sm text-gray-400 mt-3">Choose a plan first, then come back to checkout.</p>
            <a href="/pricing" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">
              Browse plans <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
    );
  }

  const basePrice =
    billingCycle === 'annual'
      ? selectedItem.priceAnnual || Math.round(selectedItem.price * 0.8)
      : selectedItem.price;
  const cycleMonths = billingCycle === 'annual' ? 12 : 1;
  const subtotal = Math.round(basePrice * cycleMonths);
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const taxableAmount = subtotal - discountAmount;
  const taxRate = Number(getSettings().taxRate ?? 18);
  const category = SERVICE_CATEGORIES.find((c) => c.id === selectedItem.category);
  const locationOptions = (category && category.locations && category.locations.length
    ? category.locations
    : ['Mumbai', 'Frankfurt', 'Singapore']
  ).map((name) => ({ id: name.toLowerCase(), name }));
  const selectedLocation = locationOptions.some((l) => l.id === datacenter) ? datacenter : (locationOptions[0]?.id || 'mumbai');
  const gstAmount = Math.round(taxableAmount * (taxRate / 100));
  const grandTotal = taxableAmount + gstAmount;

  const applyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = coupon.trim().toUpperCase();
    const found = findCoupon(code);
    if (found) setAppliedDiscount((Number(found.percent) || 0) / 100);
    else setCouponError('Invalid or inactive coupon code.');
  };

  const saveOrder = (status, extra = {}) => {
    const record = {
      id: 'RN-' + Date.now().toString(36).toUpperCase(),
      plan: selectedItem.name || 'Custom plan',
      billingCycle,
      location: selectedLocation,
      customer: user?.email || user?.name || 'Guest',
      paymentMethod,
      subtotal,
      discount: discountAmount,
      gst: gstAmount,
      total: grandTotal,
      status,
      createdAt: new Date().toISOString(),
      ...extra
    };
    try {
      const previous = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([record, ...previous]));
    } catch {
      // storage unavailable
    }
    setOrder(record);
    if (selectedItem.id === 'cart') {
      try { localStorage.removeItem('rn_cart'); } catch { /* ignore */ }
      window.dispatchEvent(new CustomEvent('rn:cart-clear'));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const submitOrder = async () => {
    setPayError('');
    if (!gateway?.enabled) {
      saveOrder('pending_payment');
      return;
    }

    setPaying(true);
    try {
      await payWithRazorpay({
        amountPaise: Math.round(grandTotal * 100),
        receipt: 'RN-' + Date.now().toString(36).toUpperCase(),
        plan: `${category?.name || 'Plan'} — ${selectedItem.name}`,
        user,
        onSuccess: (payment) => {
          setPaying(false);
          saveOrder('paid', { paymentId: payment.razorpay_payment_id, gateway: 'razorpay' });
        },
        onFailure: (err) => {
          setPaying(false);
          setPayError(err.message || 'Payment failed.');
        },
        onDismiss: () => {
          setPaying(false);
          setPayError('Payment cancelled.');
        }
      });
    } catch (err) {
      setPaying(false);
      setPayError(err.message || 'Could not start the payment.');
    }
  };

  if (order) {
    return (
      <main className="w-full bg-[#000000] text-white">
        <section className="relative isolate overflow-hidden border-b border-[#1E293B] px-4 py-16 sm:px-6 lg:px-8">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <GlowOrbs />
          </div>
          <div className="relative z-10 mx-auto max-w-[700px] text-center">
            <div className="w-14 h-14 mx-auto bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mt-6">{order.status === 'paid' ? 'Payment successful' : 'Order request received'}</h1>
            <p className="text-sm text-gray-400 mt-3">
              {order.status === 'paid' ? 'Payment verified. Your service is now queued for provisioning.' : 'Your order is saved. Payment is confirmed manually, then your service is provisioned.'}
            </p>

            <div className="mt-8 text-left border border-[#1E293B] bg-[#0D1522] p-5 space-y-3 text-sm">
              {[
                ['Order ID', order.id],
                ['Plan', order.plan],
                ['Location', order.location],
                ['Total', `₹${order.total}`],
                ['Status', 'Pending payment confirmation']
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-[#1E293B] pb-2 last:border-b-0 last:pb-0">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-white font-bold capitalize">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href="/billing" className="px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">
                Go to billing
              </a>
              <a href="/pricing" className="px-5 py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm">
                Buy something else
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="relative isolate overflow-hidden border-b border-[#1E293B] px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/80 to-[#000000]" />
          <GlowOrbs />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px]">
          <a href="/pricing" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" /> Back to plans
          </a>
          <div className="mt-5 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center border border-[#1769FF]/40 bg-[#1769FF]/10 text-[#48B7FF]">
              <Server className="w-4 h-4" />
            </span>
            <SectionLabel>Checkout</SectionLabel>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4">Review your order</h1>
          <p className="text-sm text-gray-400 mt-3 max-w-2xl">
            Choose your term and location, then submit the order. {gateway?.enabled ? 'Pay securely with Razorpay — UPI, cards or netbanking.' : 'Payment is confirmed manually before provisioning.'}
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-8">
          <div className="space-y-6">
            <Reveal>
              <div className="border border-[#1E293B] bg-[#0D1522] p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">Selected plan</div>
                <div className="flex items-start justify-between gap-4 mt-2">
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedItem.name}</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      {selectedItem.ram || selectedItem.spec || 'Configured plan'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-white">₹{selectedItem.price}<span className="text-xs text-gray-400 font-normal">/mo</span></div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500 mb-2">{isDomain ? 'Registration term' : 'Billing term'}</div>
                {isDomain ? (
                  <div className="p-4 border border-[#1769FF] bg-[#1769FF]/10">
                    <div className="flex justify-between text-sm text-white font-bold"><span>1 year</span><span className="text-xs text-gray-400 font-normal">Registration</span></div>
                    <div className="text-sm font-bold text-white mt-2">₹{selectedItem.price} / year</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setBillingCycle('monthly')} className={`p-4 text-left border transition ${billingCycle === 'monthly' ? 'border-[#1769FF] bg-[#1769FF]/10' : 'border-[#1E293B] bg-[#0D1522] hover:border-[#1769FF]'}`}>
                      <div className="flex justify-between text-sm text-white font-bold"><span>Monthly</span><span className="text-xs text-gray-400 font-normal">Standard</span></div>
                      <div className="text-sm font-bold text-white mt-2">₹{selectedItem.price} / mo</div>
                    </button>
                    <button type="button" onClick={() => setBillingCycle('annual')} className={`p-4 text-left border transition ${billingCycle === 'annual' ? 'border-[#1769FF] bg-[#1769FF]/10' : 'border-[#1E293B] bg-[#0D1522] hover:border-[#1769FF]'}`}>
                      <div className="flex justify-between text-sm text-white font-bold"><span>12 months</span><span className="text-xs text-emerald-400">SAVE 20%</span></div>
                      <div className="text-sm font-bold text-white mt-2">₹{Math.round(selectedItem.price * 0.8)} / mo</div>
                    </button>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500 mb-2">Datacenter location</div>
                <div className="flex flex-wrap gap-2">
                  {locationOptions.map((loc) => (
                    <button key={loc.id} type="button" onClick={() => setDatacenter(loc.id)} className={`flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold border transition ${selectedLocation === loc.id ? 'border-[#1769FF] bg-[#1769FF]/10 text-white' : 'border-[#1E293B] bg-[#0D1522] text-gray-300 hover:border-[#1769FF]'}`}>
                      <MapPin className="w-3.5 h-3.5" /> {loc.name}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <form onSubmit={applyCoupon}>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500 mb-2">Coupon code</div>
                <div className="flex gap-2">
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="ROYAL20" className="flex-1 bg-[#0D1522] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]" />
                  <button type="submit" className="px-5 py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-sm font-bold text-white">Apply</button>
                </div>
                {appliedDiscount > 0 && <p className="text-xs text-emerald-400 mt-2">Promo applied: {appliedDiscount * 100}% off</p>}
                {couponError && <p className="text-xs text-rose-400 mt-2">{couponError}</p>}
              </form>
            </Reveal>

            <Reveal delay={180}>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">Preferred payment method</div>
                  <span className="text-[10px] font-bold text-emerald-400">UPI selected by default</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                  {[
                    { id: 'upi', name: 'UPI / QR', note: 'Most customers pay with this', recommended: true },
                    { id: 'razorpay', name: 'Cards / NetBanking', note: 'Visa, Mastercard, RuPay' },
                    { id: 'bank', name: 'Bank transfer', note: 'NEFT / IMPS' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-3 text-left border transition ${
                        paymentMethod === m.id
                          ? 'border-[#1769FF] bg-[#1769FF]/10'
                          : 'border-[#1E293B] bg-[#0D1522] hover:border-[#1769FF]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold ${paymentMethod === m.id ? 'text-white' : 'text-gray-300'}`}>{m.name}</span>
                        {m.recommended && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 uppercase">
                            Recommended
                          </span>
                        )}
                      </div>
                      <span className="block text-[10px] text-gray-500 mt-1">{m.note}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 mt-2">
                  UPI is pre-selected. You can switch to cards or bank transfer at any time.
                </p>
              </div>
            </Reveal>

            <Reveal delay={220}>
              {gateway?.enabled ? (
                <div className="flex items-start gap-2 border border-emerald-500/30 bg-emerald-500/5 p-3 text-[11px] text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Secure payment via Razorpay — UPI, cards and netbanking. Every payment is verified on our server before the order is marked paid.
                    {isTestKey(gateway?.keyId) && (
                      <span className="block mt-1 text-amber-200">
                        Test mode is active. Pay with UPI ID <strong>success@razorpay</strong> or card <strong>4111 1111 1111 1111</strong> (any future expiry, CVV 123). A real UPI app cannot pay a test-mode QR.
                      </span>
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2 border border-amber-500/30 bg-amber-500/5 p-3 text-[11px] text-amber-200">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Payment gateway is not configured on this server yet. Submitting creates an order request that our team confirms manually.</span>
                </div>
              )}
              {payError && <p className="mt-2 text-[11px] text-rose-300">{payError}</p>}
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="lg:sticky lg:top-24 border border-[#1E293B] bg-[#0D1522] p-5">
              <h2 className="text-sm font-bold text-white">Order summary</h2>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400"><span>Subtotal ({cycleMonths} {cycleMonths === 1 ? 'month' : 'months'})</span><span>₹{subtotal}</span></div>
                {discountAmount > 0 && <div className="flex justify-between text-emerald-400"><span>Discount ({appliedDiscount * 100}%)</span><span>-₹{discountAmount}</span></div>}
                <div className="flex justify-between text-gray-400"><span>GST ({taxRate}%)</span><span>₹{gstAmount}</span></div>
                <div className="pt-3 border-t border-[#1E293B] flex justify-between items-center text-sm font-bold text-white"><span>Total</span><span className="text-[#48B7FF]">₹{grandTotal}</span></div>
              </div>
              <button type="button" onClick={submitOrder} disabled={paying} className="mt-5 w-full py-3 bg-[#1769FF] hover:bg-[#0d5be6] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2">
                <span>{paying ? 'Opening payment…' : gateway?.enabled ? `Pay ₹${grandTotal} securely` : `Submit order (₹${grandTotal})`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-gray-500 mt-3">You can review and download the invoice from your billing page afterwards.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
