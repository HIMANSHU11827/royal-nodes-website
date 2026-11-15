import React, { useState } from 'react';
import { X, CheckCircle2, Server, ArrowRight, Info } from 'lucide-react';

const ORDER_STORAGE_KEY = 'rn_orders';

export const CheckoutModal = ({ isOpen, onClose, selectedItem, onOrderComplete }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [datacenter, setDatacenter] = useState('mumbai');
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [step, setStep] = useState('checkout');
  const [order, setOrder] = useState(null);

  const basePrice = selectedItem
    ? billingCycle === 'annual'
      ? selectedItem.priceAnnual || Math.round(selectedItem.price * 0.8)
      : selectedItem.price
    : 50;
  const cycleMonths = billingCycle === 'annual' ? 12 : 1;
  const subtotal = Math.round(basePrice * cycleMonths);
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.18);
  const grandTotal = taxableAmount + gstAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = coupon.trim().toUpperCase();
    if (code === 'ROYAL20') {
      setAppliedDiscount(0.2);
    } else if (code === 'LAUNCH50') {
      setAppliedDiscount(0.5);
    } else {
      setCouponError('Invalid coupon code. Try ROYAL20 or LAUNCH50');
    }
  };

  const handleSubmitOrder = () => {
    const record = {
      id: 'RN-' + Date.now().toString(36).toUpperCase(),
      plan: selectedItem?.name || 'Custom plan',
      billingCycle,
      location: datacenter,
      paymentMethod,
      subtotal,
      discount: discountAmount,
      gst: gstAmount,
      total: grandTotal,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
    };

    try {
      const previous = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([record, ...previous]));
    } catch {
      // Storage unavailable: the order still shows on screen.
    }

    setOrder(record);
    setStep('submitted');
    if (onOrderComplete) onOrderComplete(record);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0D1522] border border-[#1E293B] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B] bg-[#131E2E]">
          <div className="flex items-center space-x-3">
            <span className="p-1.5 bg-[#1769FF]/20 text-[#48B7FF] rounded border border-[#1769FF]/40">
              <Server className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-white text-base tracking-wide">
                ROYAL NODES™ ORDER
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Review your plan and submit an order request
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#1E293B] transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {step === 'checkout' && (
            <>
              <div className="bg-[#131E2E] border border-[#1E293B] p-4 rounded-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#1769FF]/20 text-[#48B7FF] border border-[#1769FF]/30 uppercase tracking-wider">
                    Selected plan
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1">
                    {selectedItem?.name || 'Minecraft Starter'}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {selectedItem?.ram || '2 GB'} RAM • {selectedItem?.cpu || '1 vCPU'} • {selectedItem?.disk || '25 GB NVMe'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#48B7FF]">
                    ₹{basePrice}
                    <span className="text-xs text-gray-400 font-normal">/mo</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Billing term
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`p-3 text-left border rounded transition ${
                      billingCycle === 'monthly'
                        ? 'border-[#1769FF] bg-[#1769FF]/10 text-white font-semibold'
                        : 'border-[#1E293B] bg-[#131E2E] text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>Monthly</span>
                      <span className="text-xs text-gray-400">Standard</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">
                      ₹{selectedItem?.price || 50} / mo
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`p-3 text-left border rounded transition ${
                      billingCycle === 'annual'
                        ? 'border-[#1769FF] bg-[#1769FF]/10 text-white font-semibold'
                        : 'border-[#1E293B] bg-[#131E2E] text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>12 months</span>
                      <span className="text-xs text-emerald-400 font-bold">SAVE 20%</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">
                      ₹{Math.round((selectedItem?.price || 50) * 0.8)} / mo
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Datacenter location
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'mumbai', name: 'Mumbai, IN' },
                    { id: 'frankfurt', name: 'Frankfurt, DE' },
                    { id: 'singapore', name: 'Singapore, SG' },
                  ].map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setDatacenter(loc.id)}
                      className={`p-2.5 border rounded text-left transition ${
                        datacenter === loc.id
                          ? 'border-[#48B7FF] bg-[#48B7FF]/10 text-white font-semibold'
                          : 'border-[#1E293B] bg-[#131E2E] text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Coupon code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="ROYAL20"
                    className="flex-1 bg-[#131E2E] border border-[#1E293B] rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#1769FF]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1E293B] hover:bg-[#2d3f5a] text-white font-medium rounded text-xs transition"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount > 0 && (
                  <p className="text-xs text-emerald-400 font-medium">
                    Promo applied: {appliedDiscount * 100}% off
                  </p>
                )}
                {couponError && <p className="text-xs text-rose-400">{couponError}</p>}
              </form>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Preferred payment method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', name: 'UPI / QR' },
                    { id: 'razorpay', name: 'Cards / NetBanking' },
                    { id: 'bank', name: 'Bank transfer' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-3 border rounded text-left transition text-xs font-semibold ${
                        paymentMethod === m.id
                          ? 'border-[#1769FF] bg-[#1769FF]/10 text-white'
                          : 'border-[#1E293B] bg-[#131E2E] text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#131E2E] border border-[#1E293B] p-4 rounded-md space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cycleMonths} {cycleMonths === 1 ? 'month' : 'months'})</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedDiscount * 100}%)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>GST (18%)</span>
                  <span>₹{gstAmount}</span>
                </div>
                <div className="pt-2 border-t border-[#1E293B] flex justify-between items-center text-sm font-bold text-white">
                  <span>Total</span>
                  <span className="text-base text-[#48B7FF]">₹{grandTotal}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2 bg-[#131E2E] border border-amber-500/30 p-3 rounded text-[11px] text-amber-200">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Online payment is not connected yet. Submitting creates an order request that our team
                  confirms manually before your service is provisioned.
                </span>
              </div>

              <button
                type="button"
                onClick={handleSubmitOrder}
                className="w-full py-3.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold rounded flex items-center justify-center space-x-2 shadow-lg shadow-[#1769FF]/30 transition"
              >
                <span>Submit order (₹{grandTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'submitted' && (
            <div className="py-6 text-center space-y-6">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">Order request received</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Your order is saved. Payment is confirmed manually, then your service is provisioned.
                </p>
              </div>

              <div className="bg-[#131E2E] border border-[#1E293B] p-4 rounded text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1E293B]">
                  <span className="text-gray-400">Order ID</span>
                  <span className="font-mono font-bold text-white">{order?.id}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E293B]">
                  <span className="text-gray-400">Plan</span>
                  <span className="text-white">{order?.plan}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E293B]">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white capitalize">{order?.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1E293B]">
                  <span className="text-gray-400">Total</span>
                  <span className="text-white font-bold">₹{order?.total}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Status</span>
                  <span className="text-amber-300 font-bold">Pending payment confirmation</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold rounded transition text-xs"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
