import { SERVICE_CATEGORIES } from '../data/catalog';

export const KEYS = {
  accounts: 'rn_accounts',
  session: 'rn_session',
  orders: 'rn_orders',
  tickets: 'rn_tickets',
  reviews: 'rn_reviews',
  prices: 'rn_price_overrides',
  settings: 'rn_settings',
  services: 'rn_services',
  invoices: 'rn_invoices',
  coupons: 'rn_coupons',
  announcements: 'rn_announcements',
  kb: 'rn_kb',
  audit: 'rn_audit',
  deals: 'rn_deals'
};

export const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

export const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable
  }
};

/* ---------------- Dynamic catalogue ---------------- */

const CATALOGUE_KEY = 'rn_catalogue';
const DEFAULT_CATALOGUE = JSON.parse(JSON.stringify(SERVICE_CATEGORIES));
const VISIBLE_KEY = 'rn_catalogue_vis';
const VISIBLE_VERSION = 2;

export function loadCatalogue() {
  if (typeof window === 'undefined') return;
  const saved = read(CATALOGUE_KEY, null);
  if (Array.isArray(saved) && saved.length) {
    SERVICE_CATEGORIES.splice(0, SERVICE_CATEGORIES.length, ...saved);
  }
  if (read(VISIBLE_KEY, 0) !== VISIBLE_VERSION) {
    SERVICE_CATEGORIES.forEach((cat) => {
      const def = DEFAULT_CATALOGUE.find((c) => c.id === cat.id);
      if (def && typeof def.hidden === 'boolean') cat.hidden = def.hidden;
    });
    write(VISIBLE_KEY, VISIBLE_VERSION);
  }

  SERVICE_CATEGORIES.forEach((cat) => {
    const base = DEFAULT_CATALOGUE.find((c) => c.id === cat.id);
    if (!base || !Array.isArray(cat.tiers)) return;
    const byName = new Map((base.plans || []).map((p) => [p.name, p]));
    cat.tiers.forEach((tier) => {
      (tier.plans || []).forEach((plan) => {
        if (plan.spec || plan.cpu || plan.ram || plan.storage) return;
        const original = byName.get(plan.name);
        if (original?.spec) plan.spec = original.spec;
      });
    });
  });
}

export function saveCatalogue(next) {
  next.forEach((c) => { if (Array.isArray(c.tiers)) delete c.plans; });
  SERVICE_CATEGORIES.splice(0, SERVICE_CATEGORIES.length, ...next);
  write(CATALOGUE_KEY, SERVICE_CATEGORIES);
}

export function ensureTiers() {
  if (typeof window === 'undefined') return;
  SERVICE_CATEGORIES.forEach((c) => {
    if (Array.isArray(c.tiers)) return;
    const groups = [];
    (c.plans || []).forEach((p) => {
      const name = p.tier || 'Standard';
      let group = groups.find((g) => g.name === name);
      if (!group) {
        group = { id: slugify(name) + '-' + groups.length, name, plans: [] };
        groups.push(group);
      }
      group.plans.push({
        name: p.name,
        price: Number(p.price) || 0,
        ...(p.spec ? { spec: p.spec } : {}),
        ...(Array.isArray(p.features) ? { features: p.features } : {}),
        ...(p.cpu ? { cpu: p.cpu } : {}),
        ...(p.ram ? { ram: p.ram } : {}),
        ...(p.storage ? { storage: p.storage } : {})
      });
    });
    if (groups.length === 0) groups.push({ id: 'standard', name: 'Standard', plans: [] });
    c.tiers = groups;
    delete c.plans;
  });
}

export function resetCatalogue() {
  try { localStorage.removeItem(CATALOGUE_KEY); } catch {}
}

export const slugify = (value) =>
  String(value || 'item').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'item';

/* ---------------- Price overrides ---------------- */

export function getPriceOverrides() {
  return read(KEYS.prices, {});
}

export function applyPriceOverrides() {
  const overrides = getPriceOverrides();
  SERVICE_CATEGORIES.forEach((category) => {
    const perCat = overrides[category.id];
    if (!perCat) return;
    category.plans.forEach((plan) => {
      if (typeof perCat[plan.name] === 'number') plan.price = perCat[plan.name];
    });
  });
}

export function savePrice(categoryId, planName, price) {
  const overrides = getPriceOverrides();
  if (!overrides[categoryId]) overrides[categoryId] = {};
  overrides[categoryId][planName] = price;
  write(KEYS.prices, overrides);
  applyPriceOverrides();
}

export function resetPrices() {
  write(KEYS.prices, {});
}

/* ---------------- Settings ---------------- */

const DEFAULT_SETTINGS = {
  banner: 'Biggest deals of the year. 30-day money-back guarantee. Up to 85% off. 24/7 support. Don\'t miss out',
  bannerShort: 'Launch deals — up to 85% off',
  supportEmail: 'support@royalnodes.com',
  discordInvite: 'https://discord.gg/royalnodes',
  currency: '₹',
  taxRate: 18,
  maintenance: false
};

export function getSettings() {
  return { ...DEFAULT_SETTINGS, ...read(KEYS.settings, {}) };
}

export function saveSettings(patch) {
  const next = { ...getSettings(), ...patch };
  write(KEYS.settings, next);
  return next;
}

/* ---------------- Accounts ---------------- */

export function listAccounts() {
  return read(KEYS.accounts, []).map((a) => ({
    id: a.id,
    name: a.name,
    username: a.username,
    email: a.email || '',
    phone: a.phone || '',
    role: a.role || 'user',
    status: a.status || 'active',
    createdAt: a.createdAt
  }));
}

export function setAccountRole(id, role) {
  const list = read(KEYS.accounts, []);
  write(KEYS.accounts, list.map((a) => (a.id === id ? { ...a, role } : a)));
}

export function setAccountStatus(id, status) {
  const list = read(KEYS.accounts, []);
  write(KEYS.accounts, list.map((a) => (a.id === id ? { ...a, status } : a)));
}

export function deleteAccount(id) {
  const list = read(KEYS.accounts, []).filter((a) => a.id !== id);
  write(KEYS.accounts, list);
}

/* ---------------- Orders ---------------- */

export function listOrders() {
  return read(KEYS.orders, []);
}

export function updateOrder(id, patch) {
  const list = read(KEYS.orders, []);
  write(KEYS.orders, list.map((o) => (o.id === id ? { ...o, ...patch } : o)));
}

/* ---------------- Tickets ---------------- */

export function listTickets() {
  return read(KEYS.tickets, []);
}

export function updateTicket(id, patch) {
  const list = read(KEYS.tickets, []);
  write(KEYS.tickets, list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
}

export function deleteTicket(id) {
  write(KEYS.tickets, read(KEYS.tickets, []).filter((t) => t.id !== id));
}

export function addTicketReply(id, { author, role, text }) {
  const list = read(KEYS.tickets, []);
  const reply = { id: 'MSG-' + Date.now().toString(36).toUpperCase(), author, role, text, at: new Date().toISOString() };
  write(KEYS.tickets, list.map((t) => (t.id === id ? { ...t, replies: [...(t.replies || []), reply] } : t)));
  return reply;
}

/* ---------------- Reviews ---------------- */

export function listReviews() {
  return read(KEYS.reviews, []);
}

export function deleteReview(id) {
  write(KEYS.reviews, read(KEYS.reviews, []).filter((r) => r.id !== id));
}


/* ---------------- Services ---------------- */

export function listServices() { return read(KEYS.services, []); }
export function addService(service) {
  const list = read(KEYS.services, []);
  const next = { id: 'SVC-' + Date.now().toString(36).toUpperCase(), status: 'active', createdAt: new Date().toISOString(), ...service };
  write(KEYS.services, [next, ...list]);
  return next;
}
export function updateService(id, patch) { write(KEYS.services, read(KEYS.services, []).map((s) => (s.id === id ? { ...s, ...patch } : s))); }

export function renewService(id, days = 30) {
  const list = read(KEYS.services, []);
  const now = new Date();
  write(KEYS.services, list.map((s) => {
    if (s.id !== id) return s;
    const base = s.expiresAt && new Date(s.expiresAt) > now ? new Date(s.expiresAt) : now;
    return { ...s, status: 'active', expiresAt: new Date(base.getTime() + days * 86400000).toISOString() };
  }));
}
export function deleteService(id) { write(KEYS.services, read(KEYS.services, []).filter((s) => s.id !== id)); }

/* ---------------- Invoices ---------------- */

export function listInvoices() { return read(KEYS.invoices, []); }
export function addInvoice(invoice) {
  const list = read(KEYS.invoices, []);
  const next = { id: 'INV-' + Date.now().toString(36).toUpperCase(), status: 'unpaid', createdAt: new Date().toISOString(), ...invoice };
  write(KEYS.invoices, [next, ...list]);
  return next;
}
export function updateInvoice(id, patch) { write(KEYS.invoices, read(KEYS.invoices, []).map((i) => (i.id === id ? { ...i, ...patch } : i))); }
export function deleteInvoice(id) { write(KEYS.invoices, read(KEYS.invoices, []).filter((i) => i.id !== id)); }

/* ---------------- Coupons ---------------- */

const DEFAULT_COUPONS = [
  { id: 'CP-ROYAL20', code: 'ROYAL20', percent: 20, active: true },
  { id: 'CP-LAUNCH50', code: 'LAUNCH50', percent: 50, active: true }
];

export function listCoupons() {
  const saved = read(KEYS.coupons, null);
  if (!Array.isArray(saved) || saved.length === 0) {
    write(KEYS.coupons, DEFAULT_COUPONS);
    return DEFAULT_COUPONS;
  }
  return saved;
}
export function addCoupon({ code, percent, days }) {
  const list = listCoupons();
  const validDays = Number(days) || 0;
  const next = {
    id: 'CP-' + Date.now().toString(36).toUpperCase(),
    code: String(code || '').toUpperCase().trim(),
    percent: Number(percent) || 0,
    active: true,
    createdAt: new Date().toISOString(),
    expiresAt: validDays > 0 ? new Date(Date.now() + validDays * 86400000).toISOString() : null
  };
  write(KEYS.coupons, [next, ...list]);
  return next;
}
export function updateCoupon(id, patch) { write(KEYS.coupons, listCoupons().map((c) => (c.id === id ? { ...c, ...patch } : c))); }
export function deleteCoupon(id) { write(KEYS.coupons, listCoupons().filter((c) => c.id !== id)); }
export function findCoupon(code) {
  const normalized = String(code || '').toUpperCase().trim();
  return listCoupons().find((c) => {
    if (!c.active || c.code !== normalized) return false;
    if (c.expiresAt && new Date(c.expiresAt).getTime() < Date.now()) return false;
    return true;
  }) || null;
}

export const daysLeft = (iso) => {
  if (!iso) return null;
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000);
};

export const isExpired = (iso) => !!iso && new Date(iso).getTime() < Date.now();

/* ---------------- Announcements ---------------- */

export function listAnnouncements() { return read(KEYS.announcements, []); }
export function addAnnouncement({ text }) {
  const next = { id: 'AN-' + Date.now().toString(36).toUpperCase(), text: String(text || '').trim(), active: true, createdAt: new Date().toISOString() };
  write(KEYS.announcements, [next, ...listAnnouncements()]);
  return next;
}
export function updateAnnouncement(id, patch) { write(KEYS.announcements, listAnnouncements().map((a) => (a.id === id ? { ...a, ...patch } : a))); }
export function deleteAnnouncement(id) { write(KEYS.announcements, listAnnouncements().filter((a) => a.id !== id)); }
export function activeAnnouncement() { return listAnnouncements().find((a) => a.active && a.text) || null; }

/* ---------------- Knowledge base ---------------- */

export function listKb() { return read(KEYS.kb, []); }
export function addKb({ title, body, category }) {
  const next = { id: 'KB-' + Date.now().toString(36).toUpperCase(), title: String(title || '').trim(), body: String(body || '').trim(), category: category || 'General', createdAt: new Date().toISOString() };
  write(KEYS.kb, [next, ...listKb()]);
  return next;
}
export function updateKb(id, patch) { write(KEYS.kb, listKb().map((k) => (k.id === id ? { ...k, ...patch } : k))); }
export function deleteKb(id) { write(KEYS.kb, listKb().filter((k) => k.id !== id)); }

/* ---------------- Audit log ---------------- */

export function listAudit() { return read(KEYS.audit, []); }
export function logAudit(action, actor) {
  const entry = { id: 'AUD-' + Date.now().toString(36).toUpperCase(), action, actor: actor || 'system', at: new Date().toISOString() };
  write(KEYS.audit, [entry, ...listAudit()].slice(0, 300));
  return entry;
}


/* ---------------- Tiers ---------------- */

export const plansOf = (category) => {
  if (Array.isArray(category?.tiers)) {
    return category.tiers.flatMap((t) =>
      (t.plans || []).map((p) => ({ ...p, tier: t.name, tierId: t.id }))
    );
  }
  return (category?.plans || []).map((p) => ({ ...p, tier: p.tier || 'Standard' }));
};

export const minPriceOf = (category) => {
  const list = plansOf(category);
  return list.length ? Math.min(...list.map((p) => Number(p.price) || 0)) : 0;
};

export const tiersOf = (category) => {
  if (Array.isArray(category?.tiers)) return category.tiers;
  const list = plansOf(category);
  const names = [];
  list.forEach((p) => { if (!names.includes(p.tier)) names.push(p.tier); });
  return (names.length ? names : ['Standard']).map((name, i) => ({
    id: slugify(name) + '-' + i,
    name,
    plans: list.filter((p) => p.tier === name).map((p) => ({ name: p.name, price: p.price }))
  }));
};


/* ---------------- Festival deals ---------------- */

const DEFAULT_DEALS = () => [
  { id: 'DL-DIWALI', festival: 'Diwali Sale', categoryId: 'minecraft', planName: 'Gold', price: 160, active: true, expiresAt: new Date(Date.now() + 7 * 86400000).toISOString() },
  { id: 'DL-BLACKFRIDAY', festival: 'Black Friday', categoryId: 'vps', planName: 'KVM 2', price: 599, active: true, expiresAt: new Date(Date.now() + 3 * 86400000).toISOString() }
];

export function listDeals() {
  const saved = read(KEYS.deals, null);
  if (!Array.isArray(saved)) {
    const seed = DEFAULT_DEALS();
    write(KEYS.deals, seed);
    return seed;
  }
  return saved;
}
export function addDeal({ festival, categoryId, planName, price, expiresAt }) {
  const next = {
    id: 'DL-' + Date.now().toString(36).toUpperCase(),
    festival: String(festival || '').trim() || 'Sale',
    categoryId,
    planName,
    price: Number(price) || 0,
    expiresAt: expiresAt || new Date(Date.now() + 7 * 86400000).toISOString(),
    active: true
  };
  write(KEYS.deals, [next, ...listDeals()]);
  return next;
}
export function updateDeal(id, patch) { write(KEYS.deals, listDeals().map((d) => (d.id === id ? { ...d, ...patch } : d))); }
export function deleteDeal(id) { write(KEYS.deals, listDeals().filter((d) => d.id !== id)); }
