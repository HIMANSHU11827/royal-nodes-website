import React, { useEffect, useState } from 'react';
import { Receipt, Download, CheckCircle2, Clock, AlertCircle, CreditCard, ArrowRight } from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';
import { listServices, renewService, daysLeft, isExpired } from '../lib/store';

const ORDERS_KEY = 'rn_orders';

const statusStyle = (status) => {
  if (status === 'paid') return { label: 'Paid', cls: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', Icon: CheckCircle2 };
  if (status === 'pending_payment') return { label: 'Pending payment', cls: 'text-amber-300 border-amber-500/30 bg-amber-500/10', Icon: Clock };
  return { label: status || 'Unknown', cls: 'text-gray-300 border-[#1E293B] bg-[#131E2E]', Icon: AlertCircle };
};

const fmtDate = (iso) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
};

export const BillingPage = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'));
    } catch {
      setOrders([]);
    }
    setServices(listServices());
  }, []);

  const myServices = services.filter((s) => user && (s.customer === user.email || s.customer === user.name));
  const myOrders = orders.filter((o) => (user ? (o.customer === user.email || o.customer === user.name) : o.customer === 'Guest'));

  const pending = myOrders.filter((o) => o.status === 'pending_payment');
  const totalValue = myOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const monthly = myOrders.reduce((sum, o) => sum + (o.subtotal || o.total || 0), 0);

  const downloadInvoice = (order) => {
    const lines = [
      'ROYAL NODES — INVOICE',
      `Invoice: INV-${order.id}`,
      `Date: ${fmtDate(order.createdAt)}`,
      '',
      `Plan: ${order.plan}`,
      `Billing term: ${order.billingCycle || 'monthly'}`,
      `Location: ${order.location || '—'}`,
      '',
      `Subtotal: ₹${order.subtotal ?? order.total}`,
      `Discount: ₹${order.discount ?? 0}`,
      `GST (18%): ₹${order.gst ?? 0}`,
      `Total: ₹${order.total}`,
      '',
      `Status: ${statusStyle(order.status).label}`
    ].join('\n');
    const blob = new Blob([lines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `INV-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="relative isolate w-full overflow-hidden border-b border-[#1E293B] px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/80 to-[#000000]" />
          <GlowOrbs />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px]">
          <Reveal><SectionLabel>Billing</SectionLabel></Reveal>
          <Reveal delay={80} as="h1" className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Billing &amp; invoices
          </Reveal>
          <Reveal delay={140} as="p" className="mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Every order you submit appears here with its invoice. Payment is confirmed manually before a
            service is provisioned.
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-[#0D1522] border-b border-[#1E293B] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Orders', value: myOrders.length },
            { label: 'Pending payment', value: pending.length },
            { label: 'Monthly total', value: `₹${monthly}` },
            { label: 'Lifetime value', value: `₹${totalValue}` }
          ].map((card, i) => (
            <Reveal key={card.label} delay={i * 60}>
              <div className="border border-[#1E293B] bg-[#131E2E] p-5 tilt-card">
                <div className="text-[11px] uppercase tracking-wider text-gray-500">{card.label}</div>
                <div className="text-2xl font-black text-white mt-2">{card.value}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white">Orders &amp; invoices</h2>
            <a href="/tickets" className="text-xs font-bold text-[#48B7FF] hover:underline inline-flex items-center gap-1">
              Need help? Open a ticket <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </Reveal>

          {myOrders.length === 0 ? (
            <Reveal className="border border-[#1E293B] bg-[#131E2E] p-8 text-center">
              <Receipt className="w-8 h-8 text-gray-600 mx-auto" />
              <p className="text-sm text-gray-400 mt-3">No orders yet.</p>
              <p className="text-xs text-gray-500 mt-1">Choose a plan and submit an order to see it here.</p>
              <a href="/pricing" className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">
                Browse plans <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>
          ) : (
            <div className="border border-[#1E293B] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#131E2E] text-gray-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-bold">Invoice</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {myOrders.map((order) => {
                    const s = statusStyle(order.status);
                    const Icon = s.Icon;
                    const open = expanded === order.id;
                    return (
                      <React.Fragment key={order.id}>
                        <tr className="bg-[#0D1522] hover:bg-[#131E2E] transition">
                          <td className="px-4 py-3 font-mono text-white whitespace-nowrap">INV-{order.id}</td>
                          <td className="px-4 py-3 text-gray-200">{order.plan}</td>
                          <td className="px-4 py-3 text-gray-400 capitalize">{order.location || '—'}</td>
                          <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{fmtDate(order.createdAt)}</td>
                          <td className="px-4 py-3 text-white font-bold whitespace-nowrap">₹{order.total}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 border text-[10px] font-bold uppercase ${s.cls}`}>
                              <Icon className="w-3 h-3" /> {s.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setExpanded(open ? null : order.id)}
                                className="px-2.5 py-1.5 border border-[#1E293B] text-gray-300 hover:border-[#1769FF] hover:text-white text-[11px] font-bold"
                              >
                                {open ? 'Hide' : 'View'}
                              </button>
                              <button
                                onClick={() => downloadInvoice(order)}
                                className="p-1.5 border border-[#1E293B] text-gray-400 hover:border-[#1769FF] hover:text-white"
                                aria-label="Download invoice"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {open && (
                          <tr className="bg-[#0D1522]">
                            <td colSpan={7} className="px-4 py-4">
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px]">
                                <div><div className="text-gray-500">Subtotal</div><div className="text-white font-bold">₹{order.subtotal ?? order.total}</div></div>
                                <div><div className="text-gray-500">Discount</div><div className="text-white font-bold">₹{order.discount ?? 0}</div></div>
                                <div><div className="text-gray-500">GST (18%)</div><div className="text-white font-bold">₹{order.gst ?? 0}</div></div>
                                <div><div className="text-gray-500">Billing term</div><div className="text-white font-bold capitalize">{order.billingCycle || 'monthly'}</div></div>
                              </div>
                              <p className="mt-3 text-[11px] text-gray-500">
                                Payment method preference: {order.paymentMethod || '—'}. Payment is verified by our team before provisioning.
                              </p>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-white">Your services</h2>
            <span className="text-xs text-gray-500">{myServices.length} active</span>
          </Reveal>

          {myServices.length === 0 ? (
            <Reveal className="border border-[#1E293B] bg-[#131E2E] p-6 text-center">
              <p className="text-sm text-gray-400">No services yet.</p>
              <p className="text-xs text-gray-500 mt-1">Services appear here after an order is confirmed.</p>
              <a href="/pricing" className="inline-block mt-4 text-xs font-bold text-[#48B7FF] hover:underline">Browse plans</a>
            </Reveal>
          ) : (
            <div className="border border-[#1E293B] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#131E2E] text-gray-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Expires</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {myServices.map((s) => (
                    <tr key={s.id} className="bg-[#0D1522]">
                      <td className="px-4 py-3 text-white font-bold">{s.name}</td>
                      <td className="px-4 py-3 text-gray-300">{s.plan}</td>
                      <td className="px-4 py-3">
                        {s.expiresAt ? (
                          <span className={isExpired(s.expiresAt) ? 'text-red-300' : 'text-gray-300'}>
                            {new Date(s.expiresAt).toLocaleDateString('en-IN')}
                            <span className="text-gray-500"> ({daysLeft(s.expiresAt)}d left)</span>
                          </span>
                        ) : <span className="text-gray-500">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={isExpired(s.expiresAt) || s.status !== 'active' ? 'text-amber-300' : 'text-emerald-400'}>
                          {isExpired(s.expiresAt) ? 'expired' : s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => { renewService(s.id, 30); setServices(listServices()); }}
                          className="px-3 py-1.5 border border-[#1E293B] hover:border-[#1769FF] text-[11px] font-bold text-gray-300 hover:text-white"
                        >
                          Renew +30d
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Reveal className="mt-8 flex items-start gap-3 border border-[#1E293B] bg-[#131E2E] p-4">
            <CreditCard className="w-4 h-4 text-[#48B7FF] mt-0.5 shrink-0" />
            <p className="text-xs text-gray-400 leading-relaxed">
              Online payment is not connected yet. Orders are stored in your browser and confirmed manually.
              Invoices are generated from each order and can be downloaded above.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
