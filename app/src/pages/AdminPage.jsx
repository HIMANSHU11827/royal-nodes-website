import React, { useEffect, useRef, useState } from 'react';
import {
  Shield, LayoutDashboard, Users, Receipt, LifeBuoy, Star, Settings,
  Save, Trash2, CheckCircle2, RotateCcw, Ban, Search, Plus, Package,
  Server, FileText, Ticket, Megaphone, BookOpen, BarChart3, ScrollText, Tag, Flame
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/catalog';
import {
  listAccounts, setAccountRole, setAccountStatus, deleteAccount,
  listOrders, updateOrder, listTickets, updateTicket, deleteTicket,
  listReviews, deleteReview, getSettings, saveSettings,
  saveCatalogue, resetCatalogue, slugify,
  listServices, addService, updateService, deleteService, renewService, daysLeft, isExpired,
  listInvoices, addInvoice, updateInvoice, deleteInvoice,
  listCoupons, addCoupon, updateCoupon, deleteCoupon,
  listAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
  listKb, addKb, deleteKb,
  listAudit, logAudit, listDeals, addDeal, updateDeal, deleteDeal, tiersOf, addTicketReply
} from '../lib/store';

const TABS = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'users', label: 'Customers', icon: Users },
  { id: 'orders', label: 'Orders', icon: Receipt },
  { id: 'deals', label: 'Deals', icon: Flame },
  { id: 'services', label: 'Services', icon: Server },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'coupons', label: 'Coupons', icon: Tag },
  { id: 'tickets', label: 'Tickets', icon: LifeBuoy },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'kb', label: 'Knowledge base', icon: BookOpen },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'audit', label: 'Audit log', icon: ScrollText },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const STAFF_TABS = ['users', 'orders', 'tickets', 'reviews'];

const btn = 'px-3 py-1.5 text-[11px] font-bold border transition';
const btnGhost = 'border-[#1E293B] text-gray-300 hover:border-[#1769FF] hover:text-white';
const btnPrimary = 'border-[#1769FF] bg-[#1769FF] text-white hover:bg-[#0d5be6]';
const btnDanger = 'border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20';
const inputCls = 'w-full bg-[#000000] border border-[#1E293B] px-2.5 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]';
const th = 'px-3 py-2';
const td = 'px-3 py-2';

const cloneCatalogue = () => JSON.parse(JSON.stringify(SERVICE_CATEGORIES));

const TicketBubble = ({ text, author, role, at, self }) => (
  <div className={`flex ${self ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[88%] border p-4 ${self ? 'bg-[#1769FF]/15 border-[#1769FF]/40' : 'bg-[#000000] border-[#1E293B]'}`}>
      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider">
        <span className="font-bold text-gray-300">{author}</span>
        <span className={role === 'customer' ? 'text-gray-500' : 'text-[#48B7FF]'}>{role}</span>
        <span className="text-gray-600">·</span>
        <span className="text-gray-500">{new Date(at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <p className="text-sm text-gray-100 mt-2 whitespace-pre-wrap leading-relaxed">{text}</p>
    </div>
  </div>
);

export const AdminPage = ({ user }) => {
  const isAdmin = user && user.role === 'admin';
  const [tab, setTab] = useState(isAdmin ? 'overview' : 'users');

  const [accounts, setAccounts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [kb, setKb] = useState([]);
  const [deals, setDeals] = useState([]);
  const [dealDraft, setDealDraft] = useState({ festival: '', categoryId: '', planName: '', price: '', expiresAt: '' });
  const [staffReplyDrafts, setStaffReplyDrafts] = useState({});
  const [audit, setAudit] = useState([]);
  const [settings, setSettings] = useState(getSettings());
  const [catalogue, setCatalogue] = useState(cloneCatalogue);

  const [planDrafts, setPlanDrafts] = useState({});
  const [tierDrafts, setTierDrafts] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productQuery, setProductQuery] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', short: '', desc: '', location: 'Mumbai' });
  const [serviceDraft, setServiceDraft] = useState({ name: '', customer: '', plan: '', price: '' });
  const [invoiceDraft, setInvoiceDraft] = useState({ customer: '', amount: '' });
  const [couponDraft, setCouponDraft] = useState({ code: '', percent: 20, days: 30, noExpiry: true });
  const [announcementDraft, setAnnouncementDraft] = useState('');
  const [kbDraft, setKbDraft] = useState({ title: '', category: 'General', body: '' });
  const [query, setQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [flash, setFlash] = useState('');

  const refresh = () => {
    setAccounts(listAccounts());
    setOrders(listOrders());
    setTickets(listTickets());
    setReviews(listReviews());
    setServices(listServices());
    setInvoices(listInvoices());
    setCoupons(listCoupons());
    setAnnouncements(listAnnouncements());
    setKb(listKb());
    setAudit(listAudit());
    setDeals(listDeals());
    setSettings(getSettings());
    setCatalogue(cloneCatalogue());
  };

  useEffect(() => { refresh(); }, []);

  const notify = (msg) => {
    setFlash(msg);
    setTimeout(() => setFlash(''), 2400);
  };

  const sendStaffReply = (ticket) => {
    const text = (staffReplyDrafts[ticket.id] || '').trim();
    if (!text) return;
    addTicketReply(ticket.id, { author: user.name, role: user.role, text });
    setTickets(listTickets());
    setStaffReplyDrafts((prev) => ({ ...prev, [ticket.id]: '' }));
  };

  const patchDeal = (id, patch) => {
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
    updateDeal(id, patch);
  };

  const act = (failure, success) => {
    logAudit(failure, user?.username || 'admin');
    notify(success);
    refresh();
  };

  if (!user || (user.role !== 'admin' && user.role !== 'staff')) {
    return (
      <main className="w-full min-h-[60vh] bg-[#000000] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Page not found</h1>
          <p className="text-sm text-gray-500 mt-2">The page you requested does not exist.</p>
          <a href="/" className="inline-block mt-5 text-sm font-bold text-[#48B7FF] hover:underline">Back to home</a>
        </div>
      </main>
    );
  }

  const visibleTabs = isAdmin ? TABS : TABS.filter((t) => STAFF_TABS.includes(t.id));
  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const openTickets = tickets.filter((t) => t.status !== 'Closed').length;
  const totalPlans = catalogue.reduce((s, c) => s + (c.tiers || []).reduce((a, t) => a + (t.plans || []).length, 0), 0);
  const activeServices = services.filter((s) => s.status === 'active').length;
  const unpaidInvoices = invoices.filter((i) => i.status !== 'paid').length;

  const catalogueMounted = useRef(false);
  useEffect(() => {
    if (!catalogueMounted.current) {
      catalogueMounted.current = true;
      return;
    }
    const timer = setTimeout(() => saveCatalogue(catalogue), 300);
    return () => clearTimeout(timer);
  }, [catalogue]);

  /* ---------- catalogue ---------- */
  const setCat = (cid, patch) => setCatalogue((prev) => prev.map((c) => (c.id === cid ? { ...c, ...patch } : c)));

  const setLocations = (cid, locations) => {
    const next = catalogue.map((c) => (c.id === cid ? { ...c, locations } : c));
    setCatalogue(next);
    saveCatalogue(next);
  };

  const toggleHidden = (cid) => {
    const next = catalogue.map((c) => (c.id === cid ? { ...c, hidden: !c.hidden } : c));
    setCatalogue(next);
    saveCatalogue(next);
    const target = next.find((c) => c.id === cid);
    act(`${target?.hidden ? 'hidden' : 'shown'} product ${target?.name}`, 'Catalogue saved');
    notify(target?.hidden ? 'Product hidden from the live site.' : 'Product is live again.');
  };

  const addTier = (cid, name) => {
    if (!name || !name.trim()) return notify('Enter a tier name.');
    setCatalogue((prev) => prev.map((c) => (c.id === cid ? { ...c, tiers: [...(c.tiers || []), { id: `${slugify(name)}-${Date.now().toString(36)}`, name: name.trim(), plans: [] }] } : c)));
    setTierDrafts((prev) => ({ ...prev, [cid]: '' }));
    notify('Tier added — add plans inside it.');
  };
  const removeTier = (cid, tierId) => {
    if (!confirm('Remove this tier and all its plans?')) return;
    setCatalogue((prev) => prev.map((c) => (c.id === cid ? { ...c, tiers: (c.tiers || []).filter((t) => t.id !== tierId) } : c)));
  };
  const renameTier = (cid, tierId, name) => setCatalogue((prev) => prev.map((c) => (c.id === cid ? { ...c, tiers: (c.tiers || []).map((t) => (t.id === tierId ? { ...t, name } : t)) } : c)));
  const updatePlan = (cid, tierId, idx, field, value) => setCatalogue((prev) => prev.map((c) => (c.id === cid ? { ...c, tiers: (c.tiers || []).map((t) => (t.id === tierId ? { ...t, plans: t.plans.map((p, i) => (i === idx ? { ...p, [field]: field === 'price' ? Number(value) || 0 : value } : p)) } : t)) } : c)));
  const removePlan = (cid, tierId, idx) => setCatalogue((prev) => prev.map((c) => (c.id === cid ? { ...c, tiers: (c.tiers || []).map((t) => (t.id === tierId ? { ...t, plans: t.plans.filter((_, i) => i !== idx) } : t)) } : c)));
  const addPlan = (cid, tierId) => {
    const key = `${cid}:${tierId}`;
    const draft = planDrafts[key] || { name: '', price: '' };
    if (!draft.name.trim()) return notify('Enter a plan name.');
    setCatalogue((prev) => prev.map((c) => (c.id === cid ? { ...c, tiers: (c.tiers || []).map((t) => (t.id === tierId ? { ...t, plans: [...t.plans, { name: draft.name.trim(), price: Number(draft.price) || 0 }] } : t)) } : c)));
    setPlanDrafts((prev) => ({ ...prev, [key]: { name: '', price: '' } }));
  };
  const removeCategory = (cid) => { if (confirm('Remove this product and all its tiers?')) setCatalogue((prev) => prev.filter((c) => c.id !== cid)); };
  const addProduct = () => {
    if (!newProduct.name.trim()) return notify('Product name is required.');
    setCatalogue((prev) => [...prev, { id: `${slugify(newProduct.name)}-${Date.now().toString(36)}`, name: newProduct.name.trim(), short: newProduct.short.trim() || newProduct.name.trim(), desc: newProduct.desc.trim() || 'New product', locations: [newProduct.location.trim() || 'Mumbai'], tiers: [] }]);
    setNewProduct({ name: '', short: '', desc: '', location: 'Mumbai' });
    notify('Product added — add tiers and plans.');
  };
  const saveAll = () => { saveCatalogue(catalogue); act('catalogue saved', 'Catalogue saved — live site updated.'); };
  const resetAll = () => { if (confirm('Reset catalogue to defaults? This reloads the page.')) { resetCatalogue(); logAudit('catalogue reset', user.username); window.location.href = '/admin'; window.location.reload(); } };

  const filteredAccounts = accounts.filter((a) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (a.name || '').toLowerCase().includes(q) || (a.email || '').toLowerCase().includes(q) || (a.username || '').includes(q);
  });

  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="border-b border-[#1E293B] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#48B7FF]">
              <Shield className="w-4 h-4" /> {isAdmin ? 'Admin control' : 'Staff control'}
            </div>
            <h1 className="text-3xl font-black mt-3">Command center</h1>
            <p className="text-sm text-gray-400 mt-1">Signed in as {user.name} (@{user.username})</p>
          </div>
          {flash && <div className="text-xs font-bold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">{flash}</div>}
        </div>
      </section>

      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-6">
        <div className="no-scrollbar flex gap-2 border-b border-[#1E293B] pb-4 overflow-x-auto flex-nowrap sm:flex-wrap">
          {visibleTabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold border transition ${
                  tab === t.id ? 'border-[#1769FF] bg-[#1769FF]/15 text-white' : 'border-[#1E293B] text-gray-400 hover:text-white hover:border-[#1769FF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* DASHBOARD */}
        {tab === 'overview' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { label: 'Revenue', value: `₹${revenue}` },
                { label: 'Orders', value: orders.length },
                { label: 'Customers', value: accounts.length },
                { label: 'Services', value: `${activeServices}/${services.length}` },
                { label: 'Unpaid invoices', value: unpaidInvoices },
                { label: 'Open tickets', value: openTickets }
              ].map((s) => (
                <div key={s.label} className="border border-[#1E293B] bg-[#0D1522] p-4">
                  <div className="text-[10px] uppercase tracking-wider text-gray-500">{s.label}</div>
                  <div className="text-xl font-black mt-2">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border border-[#1E293B] bg-[#0D1522] p-5">
                <h2 className="text-sm font-bold">Recent orders</h2>
                <ul className="mt-3 divide-y divide-[#1E293B]">
                  {orders.slice(0, 6).map((o) => (
                    <li key={o.id} className="py-2 flex items-center justify-between text-xs">
                      <span className="font-mono text-gray-400">{o.id}</span>
                      <span className="text-gray-200 truncate mx-2">{o.plan}</span>
                      <span className="font-bold">₹{o.total}</span>
                    </li>
                  ))}
                  {orders.length === 0 && <li className="py-3 text-xs text-gray-500">No orders yet.</li>}
                </ul>
              </div>
              <div className="border border-[#1E293B] bg-[#0D1522] p-5">
                <h2 className="text-sm font-bold">Latest tickets</h2>
                <ul className="mt-3 divide-y divide-[#1E293B]">
                  {tickets.slice(0, 6).map((t) => (
                    <li key={t.id} className="py-2 flex items-center justify-between text-xs">
                      <span className="text-gray-200 truncate">{t.subject}</span>
                      <span className={t.status === 'Closed' ? 'text-gray-500' : 'text-emerald-400'}>{t.status}</span>
                    </li>
                  ))}
                  {tickets.length === 0 && <li className="py-3 text-xs text-gray-500">No tickets yet.</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <div className="mt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-400">Any number of tiers, any names. Add plans inside each tier.</p>
              <div className="flex gap-2">
                <button onClick={resetAll} className={`${btn} ${btnGhost}`}><RotateCcw className="inline w-3 h-3 mr-1" />Reset catalogue</button>
                <button onClick={saveAll} className={`${btn} ${btnPrimary}`}><Save className="inline w-3 h-3 mr-1" />Save catalogue</button>
              </div>
            </div>

            <div className="border border-[#1769FF]/40 bg-[#0D1522] p-4">
              <div className="flex items-center gap-2 text-sm font-bold"><Plus className="w-4 h-4 text-[#48B7FF]" /> Add product</div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-3">
                <input className={inputCls} placeholder="Product name (e.g. Minecraft Servers)" value={newProduct.name} onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))} />
                <input className={inputCls} placeholder="Short name (menu)" value={newProduct.short} onChange={(e) => setNewProduct((p) => ({ ...p, short: e.target.value }))} />
                <input className={inputCls} placeholder="Description" value={newProduct.desc} onChange={(e) => setNewProduct((p) => ({ ...p, desc: e.target.value }))} />
                <input className={inputCls} placeholder="Location (Mumbai)" value={newProduct.location} onChange={(e) => setNewProduct((p) => ({ ...p, location: e.target.value }))} />
              </div>
              <button onClick={addProduct} className={`${btn} ${btnPrimary} mt-3`}><Plus className="inline w-3 h-3 mr-1" />Add product</button>
            </div>

            <div className="border border-[#1E293B] bg-[#0D1522] p-4">
              <div className="flex items-center gap-2 text-sm font-bold mb-3"><Search className="w-4 h-4 text-[#48B7FF]" /> Choose a product</div>
              <input className={`${inputCls} max-w-sm`} placeholder="Search products…" value={productQuery} onChange={(e) => setProductQuery(e.target.value)} />
              <div className="flex flex-wrap gap-1.5 mt-3">
                {catalogue
                  .filter((c) => c.name.toLowerCase().includes(productQuery.toLowerCase()))
                  .map((c) => {
                    const isSel = (selectedProductId || catalogue[0]?.id) === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedProductId(c.id)}
                        className={`px-3 py-2 text-xs font-bold border transition ${
                          isSel ? 'border-[#1769FF] bg-[#1769FF]/15 text-white' : 'border-[#1E293B] bg-[#000000] text-gray-300 hover:border-[#1769FF]'
                        }`}
                      >
                        {c.name}
                        <span className="ml-2 text-[10px] text-gray-500">{(c.tiers || []).length} tiers</span>
                        {c.hidden && <span className="ml-2 text-[10px] text-amber-300">hidden</span>}
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="space-y-4">
              {catalogue
                .filter((c) => c.id === (selectedProductId || catalogue[0]?.id))
                .map((cat) => {
                const tiers = cat.tiers || [];
                return (
                  <div key={cat.id} className={`border border-[#1E293B] bg-[#0D1522] p-4 ${cat.hidden ? 'opacity-60' : ''}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Package className="w-4 h-4 text-[#48B7FF] shrink-0" />
                        <input className={`${inputCls} max-w-[220px] font-bold`} value={cat.name} onChange={(e) => setCat(cat.id, { name: e.target.value })} />
                        <span className="text-[10px] text-gray-500 whitespace-nowrap">{tiers.length} tiers</span>
                        <input className={`${inputCls} max-w-[240px]`} value={(cat.locations || []).join(', ')} onChange={(e) => setLocations(cat.id, e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} placeholder="Locations (Mumbai, Frankfurt)" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => toggleHidden(cat.id)} className={`${btn} ${btnGhost}`}>
                          {cat.hidden ? 'Show product' : 'Hide product'}
                        </button>
                        <button onClick={() => removeCategory(cat.id)} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3 mr-1" />Remove product</button>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <input className={`${inputCls} max-w-[280px]`} placeholder="New tier name (e.g. Starter, Pro, Elite)" value={tierDrafts[cat.id] || ''} onChange={(e) => setTierDrafts((prev) => ({ ...prev, [cat.id]: e.target.value }))} />
                      <button onClick={() => addTier(cat.id, tierDrafts[cat.id] || '')} className={`${btn} ${btnPrimary}`}><Plus className="inline w-3 h-3 mr-1" />Add tier</button>
                      <span className="text-[10px] text-gray-500">Any name, any number of tiers</span>
                    </div>

                    <div className="mt-3 space-y-3">
                      {tiers.map((tier) => {
                        const key = `${cat.id}:${tier.id}`;
                        const draft = planDrafts[key] || { name: '', price: '' };
                        return (
                          <div key={tier.id} className="border border-[#1E293B] bg-[#000000] p-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <input className={`${inputCls} max-w-[220px] font-bold`} value={tier.name} onChange={(e) => renameTier(cat.id, tier.id, e.target.value)} placeholder="Tier name" />
                              <span className="text-[10px] text-gray-500">{tier.plans.length} plans</span>
                              <button onClick={() => removeTier(cat.id, tier.id)} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3 mr-1" />Remove tier</button>
                            </div>

                            <div className="mt-2 space-y-1.5">
                              {tier.plans.map((plan, idx) => (
                                <div key={`${tier.id}-${idx}`} className="grid grid-cols-2 sm:grid-cols-[1.5fr_0.6fr_0.6fr_0.6fr_0.6fr_auto] gap-2 items-center">
                                  <input className={inputCls} value={plan.name} onChange={(e) => updatePlan(cat.id, tier.id, idx, 'name', e.target.value)} placeholder="Plan name" />
                                  <div className="flex items-center gap-1"><span className="text-gray-500 text-xs">₹</span><input type="number" min="0" className={inputCls} value={plan.price} onChange={(e) => updatePlan(cat.id, tier.id, idx, 'price', e.target.value)} /></div>
                                  <input className={inputCls} value={plan.cpu ?? ''} onChange={(e) => updatePlan(cat.id, tier.id, idx, 'cpu', e.target.value)} placeholder="CPU %" aria-label="CPU percent" />
                                  <input className={inputCls} value={plan.ram ?? ''} onChange={(e) => updatePlan(cat.id, tier.id, idx, 'ram', e.target.value)} placeholder="RAM GB" aria-label="RAM in GB" />
                                  <input className={inputCls} value={plan.storage ?? ''} onChange={(e) => updatePlan(cat.id, tier.id, idx, 'storage', e.target.value)} placeholder="Disk GB" aria-label="Storage in GB" />
                                  <button onClick={() => removePlan(cat.id, tier.id, idx)} className={`${btn} ${btnDanger}`} aria-label="Remove plan"><Trash2 className="inline w-3 h-3" /></button>
                                </div>
                              ))}
                              {tier.plans.length === 0 && <p className="text-[11px] text-gray-500">No plans in this tier yet.</p>}
                            </div>

                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-[1.6fr_0.7fr_auto] gap-2 items-center">
                              <input className={inputCls} placeholder="New plan name" value={draft.name} onChange={(e) => setPlanDrafts((prev) => ({ ...prev, [key]: { ...draft, name: e.target.value } }))} />
                              <div className="flex items-center gap-1"><span className="text-gray-500 text-xs">₹</span><input type="number" min="0" className={inputCls} placeholder="0" value={draft.price} onChange={(e) => setPlanDrafts((prev) => ({ ...prev, [key]: { ...draft, price: e.target.value } }))} /></div>
                              <button onClick={() => addPlan(cat.id, tier.id)} className={`${btn} ${btnPrimary}`}><Plus className="inline w-3 h-3 mr-1" />Add plan</button>
                            </div>
                          </div>
                        );
                      })}
                      {tiers.length === 0 && <p className="text-[11px] text-gray-500">No tiers yet — add one below.</p>}
                    </div>


                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-gray-500">Changes apply after you press <span className="text-gray-300 font-bold">Save catalogue</span>.</p>
          </div>
        )}

        {/* CUSTOMERS */}
        {tab === 'users' && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 flex-1 max-w-sm bg-[#0D1522] border border-[#1E293B] px-3">
                <Search className="w-3.5 h-3.5 text-gray-500" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email or username" className="w-full bg-transparent py-2 text-xs text-white placeholder-gray-600 focus:outline-none" />
              </div>
              <span className="text-xs text-gray-500">{filteredAccounts.length} accounts</span>
            </div>
            <div className="border border-[#1E293B] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#131E2E] text-gray-400 uppercase text-[10px]"><tr><th className={th}>User</th><th className={`${th} hidden sm:table-cell`}>Contact</th><th className={th}>Role</th><th className={th}>Status</th><th className={th}>Actions</th></tr></thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {filteredAccounts.map((a) => (
                    <tr
                      key={a.id}
                      onClick={() => setSelectedCustomer(selectedCustomer === a.id ? null : a.id)}
                      className="bg-[#0D1522] hover:bg-[#131E2E] transition cursor-pointer"
                    >
                      <td className={td}><div className="text-white font-bold">{a.name}</div><div className="text-gray-500 font-mono">@{a.username}</div></td>
                      <td className={`${td} text-gray-400 hidden sm:table-cell`}><div>{a.email || '—'}</div><div className="text-gray-600">{a.phone || ''}</div></td>
                      <td className={td} onClick={(e) => e.stopPropagation()}>
                        {isAdmin ? (
                          <select value={a.role} onChange={(e) => { setAccountRole(a.id, e.target.value); logAudit(`role ${a.username} -> ${e.target.value}`, user.username); notify(`${a.name} is now ${e.target.value}.`); refresh(); }} className="bg-[#000000] border border-[#1E293B] px-2 py-1 text-xs text-white" disabled={a.id === user.id}>
                            <option value="user">user</option><option value="staff">staff</option><option value="admin">admin</option>
                          </select>
                        ) : (
                          <span className="text-gray-300 uppercase text-[10px]">{a.role}</span>
                        )}
                      </td>
                      <td className={td}><span className={a.status === 'suspended' ? 'text-red-300' : 'text-emerald-400'}>{a.status}</span></td>
                      <td className={td} onClick={(e) => e.stopPropagation()}>
                        {isAdmin ? (
                          <div className="flex gap-1.5">
                            <button onClick={() => { setAccountStatus(a.id, a.status === 'suspended' ? 'active' : 'suspended'); logAudit(`${a.status === 'suspended' ? 'activated' : 'suspended'} ${a.username}`, user.username); refresh(); }} className={`${btn} ${btnGhost}`} disabled={a.id === user.id}><Ban className="inline w-3 h-3 mr-1" />{a.status === 'suspended' ? 'Activate' : 'Suspend'}</button>
                            <button onClick={() => { if (confirm(`Delete ${a.name}?`)) { deleteAccount(a.id); logAudit(`deleted account ${a.username}`, user.username); notify('Account deleted.'); refresh(); } }} className={`${btn} ${btnDanger}`} disabled={a.id === user.id}><Trash2 className="inline w-3 h-3" /></button>
                          </div>
                        ) : (
                          <span className="text-[#48B7FF] text-lg">{selectedCustomer === a.id ? '▾' : '›'}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredAccounts.length === 0 && <tr><td colSpan={5} className="px-3 py-6 text-center text-gray-500">No accounts match.</td></tr>}
                </tbody>
              </table>
            </div>

            {selectedCustomer && (() => {
              const acc = accounts.find((a) => a.id === selectedCustomer);
              if (!acc) return null;
              const myOrders = orders.filter((o) => o.customer === acc.email || o.customer === acc.name);
              const myServices = services.filter((sv) => sv.customer === acc.email || sv.customer === acc.name);
              const spent = myOrders.reduce((sum, o) => sum + (o.total || 0), 0);
              return (
                <div className="mt-4 border border-[#1769FF]/40 bg-[#0D1522] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold text-white">{acc.name} <span className="text-gray-500 font-mono">@{acc.username}</span></div>
                      <div className="text-[11px] text-gray-400 mt-1">{acc.email || '—'} · {acc.phone || 'no phone'} · role {acc.role}</div>
                    </div>
                    <button onClick={() => setSelectedCustomer(null)} className={`${btn} ${btnGhost}`}>Close</button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {[
                      { label: 'Orders', value: myOrders.length },
                      { label: 'Total spent', value: `₹${spent}` },
                      { label: 'Services', value: myServices.length },
                      { label: 'Joined', value: acc.createdAt ? new Date(acc.createdAt).toLocaleDateString('en-IN') : '—' }
                    ].map((stat) => (
                      <div key={stat.label} className="border border-[#1E293B] bg-[#000000] p-3">
                        <div className="text-[10px] uppercase tracking-wider text-gray-500">{stat.label}</div>
                        <div className="text-lg font-black text-white mt-1">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <div className="border border-[#1E293B] bg-[#000000] p-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Orders</div>
                      <ul className="divide-y divide-[#1E293B]">
                        {myOrders.map((o) => (
                          <li key={o.id} className="py-2 flex items-center justify-between text-xs">
                            <span className="font-mono text-gray-400">{o.id}</span>
                            <span className="text-gray-200 truncate mx-2">{o.plan}</span>
                            <span className="text-white font-bold">₹{o.total}</span>
                          </li>
                        ))}
                        {myOrders.length === 0 && <li className="py-2 text-xs text-gray-500">No orders.</li>}
                      </ul>
                    </div>
                    <div className="border border-[#1E293B] bg-[#000000] p-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Services</div>
                      <ul className="divide-y divide-[#1E293B]">
                        {myServices.map((sv) => (
                          <li key={sv.id} className="py-2 flex items-center justify-between text-xs">
                            <span className="text-gray-200 truncate">{sv.name}</span>
                            <span className="text-gray-400">{sv.expiresAt ? new Date(sv.expiresAt).toLocaleDateString('en-IN') : '—'}</span>
                            <span className={sv.status === 'active' ? 'text-emerald-400' : 'text-amber-300'}>{sv.status}</span>
                          </li>
                        ))}
                        {myServices.length === 0 && <li className="py-2 text-xs text-gray-500">No services.</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div className="mt-6 border border-[#1E293B] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#131E2E] text-gray-400 uppercase text-[10px]"><tr><th className={th}>Order</th><th className={th}>Plan</th><th className={th}>Total</th><th className={th}>Status</th><th className={th}>Actions</th></tr></thead>
              <tbody className="divide-y divide-[#1E293B]">
                {orders.map((o) => (
                  <tr key={o.id} className="bg-[#0D1522]">
                    <td className={`${td} font-mono text-gray-300`}>{o.id}</td>
                    <td className={`${td} text-gray-200`}>{o.plan}</td>
                    <td className={`${td} font-bold`}>₹{o.total}</td>
                    <td className={`${td} text-gray-400`}>{o.status}</td>
                    <td className={td}>
                      <div className="flex gap-1.5">
                        <button onClick={() => { updateOrder(o.id, { status: 'paid' }); addService({ name: o.plan, customer: o.customer || 'Unassigned', plan: o.plan, price: o.total, expiresAt: new Date(Date.now() + (o.billingCycle === 'annual' ? 365 : 30) * 86400000).toISOString() }); addInvoice({ customer: o.customer || 'Unassigned', amount: o.total, orderId: o.id, status: 'paid' }); logAudit(`order ${o.id} marked paid + service created`, user.username); notify('Order paid · service and invoice created.'); refresh(); }} className={`${btn} ${btnGhost}`}><CheckCircle2 className="inline w-3 h-3 mr-1" />Paid</button>
                        {isAdmin && (
                          <>
                            <button onClick={() => { updateOrder(o.id, { status: 'refunded' }); logAudit(`order ${o.id} refunded`, user.username); notify('Order refunded.'); refresh(); }} className={`${btn} ${btnGhost}`}>Refund</button>
                            <button onClick={() => { updateOrder(o.id, { status: 'cancelled' }); logAudit(`order ${o.id} cancelled`, user.username); notify('Order cancelled.'); refresh(); }} className={`${btn} ${btnDanger}`}>Cancel</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan={5} className="px-3 py-6 text-center text-gray-500">No orders yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* SERVICES */}
        {tab === 'services' && (
          <div className="mt-6 space-y-4">
            <div className="border border-[#1769FF]/40 bg-[#0D1522] p-4">
              <div className="flex items-center gap-2 text-sm font-bold"><Plus className="w-4 h-4 text-[#48B7FF]" /> Add service manually</div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-3">
                <input className={inputCls} placeholder="Service name" value={serviceDraft.name} onChange={(e) => setServiceDraft((d) => ({ ...d, name: e.target.value }))} />
                <input className={inputCls} placeholder="Customer (email)" value={serviceDraft.customer} onChange={(e) => setServiceDraft((d) => ({ ...d, customer: e.target.value }))} />
                <input className={inputCls} placeholder="Plan" value={serviceDraft.plan} onChange={(e) => setServiceDraft((d) => ({ ...d, plan: e.target.value }))} />
                <div className="flex items-center gap-1"><span className="text-gray-500 text-xs">₹</span><input type="number" className={inputCls} placeholder="Price" value={serviceDraft.price} onChange={(e) => setServiceDraft((d) => ({ ...d, price: e.target.value }))} /></div>
              </div>
              <button onClick={() => { if (!serviceDraft.name.trim()) return notify('Service name required.'); addService({ name: serviceDraft.name, customer: serviceDraft.customer, plan: serviceDraft.plan, price: Number(serviceDraft.price) || 0, expiresAt: new Date(Date.now() + 30 * 86400000).toISOString() }); logAudit(`service added ${serviceDraft.name}`, user.username); setServiceDraft({ name: '', customer: '', plan: '', price: '' }); notify('Service added.'); refresh(); }} className={`${btn} ${btnPrimary} mt-3`}><Plus className="inline w-3 h-3 mr-1" />Add service</button>
            </div>
            <div className="border border-[#1E293B] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#131E2E] text-gray-400 uppercase text-[10px]"><tr><th className={th}>ID</th><th className={th}>Service</th><th className={th}>Customer</th><th className={th}>Plan</th><th className={th}>Price</th><th className={th}>Expiry</th><th className={th}>Status</th><th className={th}>Actions</th></tr></thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {services.map((s) => (
                    <tr key={s.id} className="bg-[#0D1522]">
                      <td className={`${td} font-mono text-gray-400`}>{s.id}</td>
                      <td className={`${td} text-white`}>{s.name}</td>
                      <td className={`${td} text-gray-300`}>{s.customer}</td>
                      <td className={`${td} text-gray-300`}>{s.plan}</td>
                      <td className={`${td} font-bold`}>₹{s.price}</td>
                      <td className={td}>
                        {s.expiresAt ? (
                          <span className={isExpired(s.expiresAt) ? 'text-red-300' : 'text-gray-300'}>
                            {new Date(s.expiresAt).toLocaleDateString('en-IN')}
                            <span className="text-gray-500"> ({daysLeft(s.expiresAt)}d)</span>
                          </span>
                        ) : <span className="text-gray-500">—</span>}
                      </td>
                      <td className={td}><span className={s.status === 'active' ? 'text-emerald-400' : 'text-amber-300'}>{s.status}</span></td>
                      <td className={td}>
                        <div className="flex gap-1.5">
                          <button onClick={() => { renewService(s.id, 30); logAudit(`service ${s.id} renewed +30d`, user.username); notify('Service renewed +30 days.'); refresh(); }} className={`${btn} ${btnGhost}`}>Renew</button>
                          <button onClick={() => { updateService(s.id, { status: s.status === 'active' ? 'suspended' : 'active' }); logAudit(`service ${s.id} -> ${s.status === 'active' ? 'suspended' : 'active'}`, user.username); refresh(); }} className={`${btn} ${btnGhost}`}>{s.status === 'active' ? 'Suspend' : 'Activate'}</button>
                          <button onClick={() => { deleteService(s.id); logAudit(`service ${s.id} deleted`, user.username); refresh(); }} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {services.length === 0 && <tr><td colSpan={7} className="px-3 py-6 text-center text-gray-500">No services yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* INVOICES */}
        {tab === 'invoices' && (
          <div className="mt-6 space-y-4">
            <div className="border border-[#1769FF]/40 bg-[#0D1522] p-4">
              <div className="flex items-center gap-2 text-sm font-bold"><Plus className="w-4 h-4 text-[#48B7FF]" /> Create invoice</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                <input className={inputCls} placeholder="Customer" value={invoiceDraft.customer} onChange={(e) => setInvoiceDraft((d) => ({ ...d, customer: e.target.value }))} />
                <div className="flex items-center gap-1"><span className="text-gray-500 text-xs">₹</span><input type="number" className={inputCls} placeholder="Amount" value={invoiceDraft.amount} onChange={(e) => setInvoiceDraft((d) => ({ ...d, amount: e.target.value }))} /></div>
                <button onClick={() => { if (!invoiceDraft.customer.trim()) return notify('Customer required.'); addInvoice({ customer: invoiceDraft.customer, amount: Number(invoiceDraft.amount) || 0 }); logAudit(`invoice created for ${invoiceDraft.customer}`, user.username); setInvoiceDraft({ customer: '', amount: '' }); notify('Invoice created.'); refresh(); }} className={`${btn} ${btnPrimary}`}><Plus className="inline w-3 h-3 mr-1" />Create</button>
              </div>
            </div>
            <div className="border border-[#1E293B] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#131E2E] text-gray-400 uppercase text-[10px]"><tr><th className={th}>Invoice</th><th className={th}>Customer</th><th className={th}>Amount</th><th className={th}>Status</th><th className={th}>Actions</th></tr></thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {invoices.map((i) => (
                    <tr key={i.id} className="bg-[#0D1522]">
                      <td className={`${td} font-mono text-gray-300`}>{i.id}</td>
                      <td className={`${td} text-white`}>{i.customer}</td>
                      <td className={`${td} font-bold`}>₹{i.amount}</td>
                      <td className={`${td} ${i.status === 'paid' ? 'text-emerald-400' : 'text-amber-300'}`}>{i.status}</td>
                      <td className={td}>
                        <div className="flex gap-1.5">
                          <button onClick={() => { updateInvoice(i.id, { status: i.status === 'paid' ? 'unpaid' : 'paid' }); logAudit(`invoice ${i.id} -> ${i.status === 'paid' ? 'unpaid' : 'paid'}`, user.username); refresh(); }} className={`${btn} ${btnGhost}`}>{i.status === 'paid' ? 'Mark unpaid' : 'Mark paid'}</button>
                          <button onClick={() => { deleteInvoice(i.id); logAudit(`invoice ${i.id} deleted`, user.username); refresh(); }} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {invoices.length === 0 && <tr><td colSpan={5} className="px-3 py-6 text-center text-gray-500">No invoices yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COUPONS */}
        {tab === 'coupons' && (
          <div className="mt-6 space-y-4">
            <div className="border border-[#1769FF]/40 bg-[#0D1522] p-4">
              <div className="flex items-center gap-2 text-sm font-bold"><Plus className="w-4 h-4 text-[#48B7FF]" /> Create coupon</div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.5fr_1.1fr_auto] gap-2 mt-3 items-center">
                <input className={inputCls} placeholder="CODE" value={couponDraft.code} onChange={(e) => setCouponDraft((d) => ({ ...d, code: e.target.value }))} />
                <div className="flex items-center gap-1"><input type="number" min="1" max="90" className={inputCls} placeholder="Percent off" value={couponDraft.percent} onChange={(e) => setCouponDraft((d) => ({ ...d, percent: e.target.value }))} /><span className="text-gray-500 text-xs">%</span></div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-[11px] text-gray-300 whitespace-nowrap">
                    <input type="checkbox" checked={couponDraft.noExpiry} onChange={(e) => setCouponDraft((d) => ({ ...d, noExpiry: e.target.checked }))} className="w-4 h-4 accent-[#1769FF]" />
                    Never expires
                  </label>
                  {!couponDraft.noExpiry && (
                    <div className="flex items-center gap-1">
                      <input type="number" min="1" className={inputCls} placeholder="Days" value={couponDraft.days} onChange={(e) => setCouponDraft((d) => ({ ...d, days: e.target.value }))} />
                      <span className="text-gray-500 text-xs">days</span>
                    </div>
                  )}
                </div>
                <button onClick={() => {
                  if (!couponDraft.code.trim()) return notify('Coupon code required.');
                  if (!(Number(couponDraft.percent) > 0 && Number(couponDraft.percent) <= 90)) return notify('Percent must be between 1 and 90.');
                  addCoupon({ code: couponDraft.code, percent: couponDraft.percent, days: couponDraft.noExpiry ? 0 : couponDraft.days });
                  logAudit(`coupon created ${couponDraft.code}`, user.username);
                  setCouponDraft({ code: '', percent: 20, days: 30, noExpiry: true });
                  notify('Coupon created.');
                  refresh();
                }} className={`${btn} ${btnPrimary}`}><Plus className="inline w-3 h-3 mr-1" />Create</button>
              </div>
            </div>
            <div className="border border-[#1E293B] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#131E2E] text-gray-400 uppercase text-[10px]"><tr><th className={th}>Code</th><th className={th}>Discount</th><th className={th}>Expires</th><th className={th}>Status</th><th className={th}>Actions</th></tr></thead>
                <tbody className="divide-y divide-[#1E293B]">
                  {coupons.map((c) => (
                    <tr key={c.id} className="bg-[#0D1522]">
                      <td className={`${td} font-mono text-white`}>{c.code}</td>
                      <td className={`${td} text-gray-300`}>{c.percent}%</td>
                      <td className={td}>
                        {c.expiresAt ? (
                          <span className={isExpired(c.expiresAt) ? 'text-red-300' : 'text-gray-300'}>
                            {new Date(c.expiresAt).toLocaleDateString('en-IN')}
                            <span className="text-gray-500"> ({daysLeft(c.expiresAt)}d)</span>
                          </span>
                        ) : <span className="text-gray-500">never</span>}
                      </td>
                      <td className={`${td} ${c.active && !isExpired(c.expiresAt) ? 'text-emerald-400' : 'text-gray-500'}`}>{c.active ? (isExpired(c.expiresAt) ? 'expired' : 'active') : 'inactive'}</td>
                      <td className={td}>
                        <div className="flex gap-1.5">
                          <button onClick={() => { updateCoupon(c.id, { active: !c.active }); logAudit(`coupon ${c.code} ${c.active ? 'disabled' : 'enabled'}`, user.username); refresh(); }} className={`${btn} ${btnGhost}`}>{c.active ? 'Disable' : 'Enable'}</button>
                          <button onClick={() => { deleteCoupon(c.id); logAudit(`coupon ${c.code} deleted`, user.username); refresh(); }} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {coupons.length === 0 && <tr><td colSpan={5} className="px-3 py-6 text-center text-gray-500">No coupons.</td></tr>}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-500">Coupons are validated at checkout. Disabled coupons are rejected.</p>
          </div>
        )}

        {/* DEALS */}
        {tab === 'deals' && (
          <div className="mt-6 space-y-4">
            <div className="border border-[#1769FF]/40 bg-[#0D1522] p-4">
              <div className="flex items-center gap-2 text-sm font-bold"><Flame className="w-4 h-4 text-[#48B7FF]" /> Add festival deal</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                <input className={inputCls} placeholder="Festival name (Diwali, Black Friday)" value={dealDraft.festival} onChange={(e) => setDealDraft((d) => ({ ...d, festival: e.target.value }))} />
                <select className={inputCls} value={dealDraft.categoryId} onChange={(e) => setDealDraft((d) => ({ ...d, categoryId: e.target.value, planName: '' }))}>
                  <option value="">Product…</option>
                  {catalogue.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <select className={inputCls} value={dealDraft.planName} onChange={(e) => setDealDraft((d) => ({ ...d, planName: e.target.value }))} disabled={!dealDraft.categoryId}>
                  <option value="">Plan…</option>
                  {dealDraft.categoryId && tiersOf(catalogue.find((c) => c.id === dealDraft.categoryId) || {}).flatMap((t) => t.plans.map((p) => `${t.name} — ${p.name}`)).map((label) => (
                    <option key={label} value={label}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <div className="flex items-center gap-1"><span className="text-gray-500 text-xs">₹</span><input type="number" className={inputCls} placeholder="Deal price" value={dealDraft.price} onChange={(e) => setDealDraft((d) => ({ ...d, price: e.target.value }))} /></div>
                <input type="datetime-local" className={inputCls} value={dealDraft.expiresAt} onChange={(e) => setDealDraft((d) => ({ ...d, expiresAt: e.target.value }))} />
                <button onClick={() => {
                  if (!dealDraft.festival.trim() || !dealDraft.categoryId || !dealDraft.planName) return notify('Festival, product and plan are required.');
                  addDeal({
                    festival: dealDraft.festival,
                    categoryId: dealDraft.categoryId,
                    planName: dealDraft.planName,
                    price: Number(dealDraft.price) || 0,
                    expiresAt: dealDraft.expiresAt ? new Date(dealDraft.expiresAt).toISOString() : undefined
                  });
                  logAudit(`deal added ${dealDraft.festival}`, user.username);
                  setDealDraft({ festival: '', categoryId: '', planName: '', price: '', expiresAt: '' });
                  notify('Deal created.');
                  refresh();
                }} className={`${btn} ${btnPrimary}`}><Plus className="inline w-3 h-3 mr-1" />Add deal</button>
              </div>
            </div>

            <div className="space-y-2">
              {deals.map((d) => (
                <div key={d.id} className="border border-[#1E293B] bg-[#0D1522] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_0.5fr_1fr_auto_auto] gap-2 items-center">
                  <input className={inputCls} value={d.festival} onChange={(e) => patchDeal(d.id, { festival: e.target.value })} placeholder="Festival name" />
                  <select className={inputCls} value={d.categoryId} onChange={(e) => patchDeal(d.id, { categoryId: e.target.value, planName: '' })}>
                    {catalogue.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <select className={inputCls} value={d.planName} onChange={(e) => patchDeal(d.id, { planName: e.target.value })}>
                    {(() => {
                      const cat = catalogue.find((c) => c.id === d.categoryId);
                      const labels = cat ? tiersOf(cat).flatMap((t) => (t.plans || []).map((pl) => `${t.name} — ${pl.name}`)) : [];
                      if (d.planName && !labels.includes(d.planName)) labels.unshift(d.planName);
                      return labels.map((label) => <option key={label} value={label}>{label}</option>);
                    })()}
                  </select>
                  <div className="flex items-center gap-1"><span className="text-gray-500 text-xs">₹</span><input type="number" className={inputCls} value={d.price} onChange={(e) => patchDeal(d.id, { price: Number(e.target.value) || 0 })} /></div>
                  <input type="datetime-local" className={inputCls} value={d.expiresAt ? d.expiresAt.slice(0, 16) : ''} onChange={(e) => patchDeal(d.id, { expiresAt: e.target.value ? new Date(e.target.value).toISOString() : null })} />
                  <label className="flex items-center gap-2 text-[11px] text-gray-300">
                    <input type="checkbox" checked={d.active} onChange={(e) => patchDeal(d.id, { active: e.target.checked })} className="w-4 h-4 accent-[#1769FF]" />
                    {d.active ? (isExpired(d.expiresAt) ? 'expired' : 'live') : 'off'}
                  </label>
                  <button onClick={() => { deleteDeal(d.id); logAudit(`deal deleted ${d.festival}`, user.username); refresh(); }} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3" /></button>
                </div>
              ))}
              {deals.length === 0 && <p className="text-sm text-gray-500">No deals yet.</p>}
            </div>
            <p className="text-[11px] text-gray-500">Deals appear on the /deals page with a live countdown. Expired deals are hidden.</p>
          </div>
        )}

        {/* TICKETS */}
        {tab === 'tickets' && (
          <div className="mt-6 space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="border border-[#1E293B] bg-[#0D1522] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-gray-500">{t.id}</span>
                      <span className="text-[10px] uppercase text-[#48B7FF]">{t.category}</span>
                      <span className="text-[10px] uppercase text-amber-300">{t.priority}</span>
                      <span className={t.status === 'Closed' ? 'text-[10px] text-gray-500' : 'text-[10px] text-emerald-400'}>{t.status}</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">{t.subject}</div>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => { updateTicket(t.id, { status: t.status === 'Closed' ? 'Open' : 'Closed' }); logAudit(`ticket ${t.id} -> ${t.status === 'Closed' ? 'Open' : 'Closed'}`, user.username); refresh(); }} className={`${btn} ${btnGhost}`}>{t.status === 'Closed' ? 'Reopen' : 'Resolve'}</button>
                    <button onClick={() => { deleteTicket(t.id); logAudit(`ticket ${t.id} deleted`, user.username); refresh(); }} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3" /></button>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <TicketBubble text={t.message} author={t.customer || 'Customer'} role="customer" at={t.createdAt} self={false} />
                  {(t.replies || []).map((r) => (
                    <TicketBubble key={r.id} text={r.text} author={r.author} role={r.role} at={r.at} self={r.role !== 'customer'} />
                  ))}
                </div>

                {t.status !== 'Closed' && (
                  <form onSubmit={(e) => { e.preventDefault(); sendStaffReply(t); }} className="mt-3 flex gap-2">
                    <input
                      value={staffReplyDrafts[t.id] || ''}
                      onChange={(e) => setStaffReplyDrafts((prev) => ({ ...prev, [t.id]: e.target.value }))}
                      placeholder="Write a reply…"
                      className="flex-1 bg-[#000000] border border-[#1E293B] px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]"
                    />
                    <button type="submit" className="px-5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">Send</button>
                  </form>
                )}
              </div>
            ))}
            {tickets.length === 0 && <p className="text-sm text-gray-500">No tickets yet.</p>}
          </div>
        )}

        {/* REVIEWS */}
        {tab === 'reviews' && (
          <div className="mt-6 space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="border border-[#1E293B] bg-[#0D1522] p-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-300 text-sm">{'★'.repeat(r.rating)}<span className="text-gray-700">{'★'.repeat(5 - r.rating)}</span></span>
                    <span className="text-sm font-bold text-white">{r.title}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{r.body}</p>
                  <div className="text-[11px] text-gray-500 mt-2">{r.name}{r.plan ? ` · ${r.plan}` : ''}</div>
                </div>
                <button onClick={() => { deleteReview(r.id); logAudit(`review ${r.id} deleted`, user.username); refresh(); }} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3" /></button>
              </div>
            ))}
            {reviews.length === 0 && <p className="text-sm text-gray-500">No reviews yet.</p>}
          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {tab === 'announcements' && (
          <div className="mt-6 space-y-4">
            <div className="border border-[#1769FF]/40 bg-[#0D1522] p-4">
              <div className="flex items-center gap-2 text-sm font-bold"><Megaphone className="w-4 h-4 text-[#48B7FF]" /> New announcement</div>
              <div className="flex gap-2 mt-3">
                <input className={inputCls} placeholder="Message shown across the site" value={announcementDraft} onChange={(e) => setAnnouncementDraft(e.target.value)} />
                <button onClick={() => { if (!announcementDraft.trim()) return notify('Write a message.'); addAnnouncement({ text: announcementDraft }); logAudit('announcement added', user.username); setAnnouncementDraft(''); notify('Announcement published.'); refresh(); }} className={`${btn} ${btnPrimary} shrink-0`}><Plus className="inline w-3 h-3 mr-1" />Publish</button>
              </div>
            </div>
            <div className="space-y-2">
              {announcements.map((a) => (
                <div key={a.id} className="border border-[#1E293B] bg-[#0D1522] p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm text-white">{a.text}</div>
                    <div className={`text-[10px] uppercase mt-1 ${a.active ? 'text-emerald-400' : 'text-gray-500'}`}>{a.active ? 'live' : 'hidden'}</div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={() => { updateAnnouncement(a.id, { active: !a.active }); refresh(); }} className={`${btn} ${btnGhost}`}>{a.active ? 'Hide' : 'Show'}</button>
                    <button onClick={() => { deleteAnnouncement(a.id); refresh(); }} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3" /></button>
                  </div>
                </div>
              ))}
              {announcements.length === 0 && <p className="text-sm text-gray-500">No announcements.</p>}
            </div>
          </div>
        )}

        {/* KNOWLEDGE BASE */}
        {tab === 'kb' && (
          <div className="mt-6 space-y-4">
            <div className="border border-[#1769FF]/40 bg-[#0D1522] p-4">
              <div className="flex items-center gap-2 text-sm font-bold"><BookOpen className="w-4 h-4 text-[#48B7FF]" /> New article</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                <input className={inputCls} placeholder="Title" value={kbDraft.title} onChange={(e) => setKbDraft((d) => ({ ...d, title: e.target.value }))} />
                <input className={inputCls} placeholder="Category" value={kbDraft.category} onChange={(e) => setKbDraft((d) => ({ ...d, category: e.target.value }))} />
              </div>
              <textarea className={`${inputCls} mt-2`} rows={3} placeholder="Article body" value={kbDraft.body} onChange={(e) => setKbDraft((d) => ({ ...d, body: e.target.value }))} />
              <button onClick={() => { if (!kbDraft.title.trim()) return notify('Title required.'); addKb(kbDraft); logAudit(`kb article added ${kbDraft.title}`, user.username); setKbDraft({ title: '', category: 'General', body: '' }); notify('Article added.'); refresh(); }} className={`${btn} ${btnPrimary} mt-2`}><Plus className="inline w-3 h-3 mr-1" />Add article</button>
            </div>
            <div className="space-y-2">
              {kb.map((k) => (
                <div key={k.id} className="border border-[#1E293B] bg-[#0D1522] p-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-white">{k.title}</div>
                    <div className="text-[10px] uppercase text-[#48B7FF] mt-1">{k.category}</div>
                    <p className="text-xs text-gray-400 mt-2 whitespace-pre-wrap">{k.body}</p>
                  </div>
                  <button onClick={() => { deleteKb(k.id); logAudit(`kb deleted ${k.title}`, user.username); refresh(); }} className={`${btn} ${btnDanger}`}><Trash2 className="inline w-3 h-3" /></button>
                </div>
              ))}
              {kb.length === 0 && <p className="text-sm text-gray-500">No articles yet.</p>}
            </div>
          </div>
        )}

        {/* REPORTS */}
        {tab === 'reports' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Gross revenue', value: `₹${revenue}` },
                { label: 'Average order', value: orders.length ? `₹${Math.round(revenue / orders.length)}` : '₹0' },
                { label: 'Paid invoices', value: invoices.filter((i) => i.status === 'paid').length },
                { label: 'Active services', value: activeServices }
              ].map((s) => (
                <div key={s.label} className="border border-[#1E293B] bg-[#0D1522] p-5">
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">{s.label}</div>
                  <div className="text-2xl font-black mt-2">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border border-[#1E293B] bg-[#0D1522] p-5">
                <h2 className="text-sm font-bold">Orders by status</h2>
                <ul className="mt-3 space-y-2 text-xs">
                  {['pending_payment', 'paid', 'refunded', 'cancelled'].map((st) => (
                    <li key={st} className="flex items-center justify-between">
                      <span className="text-gray-400 capitalize">{st.replace('_', ' ')}</span>
                      <span className="font-bold text-white">{orders.filter((o) => o.status === st).length}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-[#1E293B] bg-[#0D1522] p-5">
                <h2 className="text-sm font-bold">Catalogue</h2>
                <ul className="mt-3 space-y-2 text-xs">
                  <li className="flex items-center justify-between"><span className="text-gray-400">Products</span><span className="font-bold text-white">{catalogue.length}</span></li>
                  <li className="flex items-center justify-between"><span className="text-gray-400">Plans</span><span className="font-bold text-white">{totalPlans}</span></li>
                  <li className="flex items-center justify-between"><span className="text-gray-400">Average plan price</span><span className="font-bold text-white">₹{totalPlans ? Math.round(catalogue.reduce((s, c) => s + (c.tiers || []).reduce((a, t) => a + (t.plans || []).reduce((x, p) => x + (Number(p.price) || 0), 0), 0), 0) / totalPlans) : 0}</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* AUDIT */}
        {tab === 'audit' && (
          <div className="mt-6 border border-[#1E293B] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#131E2E] text-gray-400 uppercase text-[10px]"><tr><th className={th}>When</th><th className={th}>Actor</th><th className={th}>Action</th></tr></thead>
              <tbody className="divide-y divide-[#1E293B]">
                {audit.map((a) => (
                  <tr key={a.id} className="bg-[#0D1522]">
                    <td className={`${td} text-gray-500 whitespace-nowrap`}>{new Date(a.at).toLocaleString('en-IN')}</td>
                    <td className={`${td} text-gray-300 font-mono`}>{a.actor}</td>
                    <td className={`${td} text-white`}>{a.action}</td>
                  </tr>
                ))}
                {audit.length === 0 && <tr><td colSpan={3} className="px-3 py-6 text-center text-gray-500">No actions logged yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'settings' && (
          <div className="mt-6 max-w-2xl space-y-4">
            <div className="border border-[#1E293B] bg-[#0D1522] p-5 space-y-4">
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Top banner text</span>
                <input value={settings.banner} onChange={(e) => setSettings((s) => ({ ...s, banner: e.target.value }))} className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#1769FF]" />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Short banner (mobile)</span>
                <input value={settings.bannerShort} onChange={(e) => setSettings((s) => ({ ...s, bannerShort: e.target.value }))} className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#1769FF]" />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Support email</span>
                <input value={settings.supportEmail} onChange={(e) => setSettings((s) => ({ ...s, supportEmail: e.target.value }))} className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#1769FF]" />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Discord invite</span>
                <input value={settings.discordInvite} onChange={(e) => setSettings((s) => ({ ...s, discordInvite: e.target.value }))} className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#1769FF]" />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Currency</span>
                  <input value={settings.currency} onChange={(e) => setSettings((s) => ({ ...s, currency: e.target.value }))} className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#1769FF]" />
                </label>
                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Tax rate (%)</span>
                  <input type="number" value={settings.taxRate} onChange={(e) => setSettings((s) => ({ ...s, taxRate: Number(e.target.value) || 0 }))} className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#1769FF]" />
                </label>
              </div>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={!!settings.maintenance} onChange={(e) => setSettings((s) => ({ ...s, maintenance: e.target.checked }))} className="w-4 h-4 accent-[#1769FF]" />
                <span className="text-sm text-white">Maintenance mode (only admin/staff can view the site)</span>
              </label>
              <button onClick={() => { saveSettings(settings); logAudit('settings saved', user.username); notify('Settings saved.'); refresh(); }} className={`${btn} ${btnPrimary}`}><Save className="inline w-3 h-3 mr-1" />Save settings</button>
            </div>
            <p className="text-[11px] text-gray-500">Settings are stored in this browser until the backend is connected.</p>
          </div>
        )}
      </div>
    </main>
  );
};
