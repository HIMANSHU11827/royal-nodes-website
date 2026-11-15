const ACCOUNTS_KEY = 'rn_accounts';
const SESSION_KEY = 'rn_session';

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable
  }
};

async function hash(password) {
  const data = new TextEncoder().encode(password);
  if (globalThis.crypto && crypto.subtle) {
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  let h = 5381;
  for (let i = 0; i < data.length; i += 1) h = (h * 33) ^ data[i];
  return 'f' + (h >>> 0).toString(16);
}

const publicUser = (account) =>
  account
    ? {
        id: account.id,
        name: account.name,
        username: account.username,
        email: account.email || '',
        phone: account.phone || '',
        role: account.role || 'user',
        status: account.status || 'active',
        createdAt: account.createdAt
      }
    : null;

const validEmail = (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
const normalizePhone = (value) => (value || '').replace(/[\s()-]/g, '');
const validPhone = (value) => /^\+?\d{7,15}$/.test(normalizePhone(value));
const normalizeUsername = (value) => (value || '').trim().toLowerCase();

const ADMIN_SEED = {
  id: 'RN-U-ADMIN',
  name: 'Royal Nodes Admin',
  username: 'admin',
  email: 'himanshugola118@gmail.com',
  phone: '',
  passwordHash: '7676aaafb027c825bd9abab78b234070e702752f625b752e55e55b48e607e358',
  role: 'admin',
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z'
};

const DEMO_STAFF = {
  id: 'RN-U-STAFF',
  name: 'Royal Nodes Staff',
  username: 'staff',
  email: 'staff@royalnodes.com',
  phone: '',
  passwordHash: 'b5465d786a2b98bbd4b8b798da4f86b34c52f64dc9a382b50c0fdb0f73f8baf1',
  role: 'staff',
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z'
};

const DEMO_USER = {
  id: 'RN-U-DEMO',
  name: 'Demo Customer',
  username: 'demo',
  email: 'user@royalnodes.com',
  phone: '',
  passwordHash: 'dcb694aa0322f143ed970e275c807bf123bd5db4f73140b94ccc757f42dc8043',
  role: 'user',
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z'
};

function seedAdmin() {
  if (typeof window === 'undefined') return;
  const list = read(ACCOUNTS_KEY, []);
  const existing = list.find((a) => a.id === ADMIN_SEED.id);
  if (!existing) {
    write(ACCOUNTS_KEY, [ADMIN_SEED, ...list]);
  } else if (existing.email === 'admin@royalnodes.local') {
    write(ACCOUNTS_KEY, [ADMIN_SEED, ...list.filter((a) => a.id !== ADMIN_SEED.id)]);
  }

  const latest = read(ACCOUNTS_KEY, []);
  const withDemos = [...latest];
  [DEMO_STAFF, DEMO_USER].forEach((seed) => {
    if (!withDemos.some((a) => a.id === seed.id)) withDemos.push(seed);
  });
  if (withDemos.length !== latest.length) write(ACCOUNTS_KEY, withDemos);
}
seedAdmin();

export function currentUser() {
  const id = read(SESSION_KEY, null);
  const list = read(ACCOUNTS_KEY, []);
  return publicUser(list.find((a) => a.id === id));
}

export async function signup({ name, username, email, phone, password }) {
  if (!name || !name.trim()) throw new Error('Enter your full name.');

  const uname = normalizeUsername(username);
  if (!uname) throw new Error('Choose a username.');
  if (!/^[a-z0-9_]{3,20}$/.test(uname)) {
    throw new Error('Username must be 3–20 characters: letters, numbers or underscore.');
  }

  const normalizedEmail = (email || '').trim().toLowerCase();
  const normalizedPhoneNum = normalizePhone(phone);
  if (!normalizedEmail && !normalizedPhoneNum) {
    throw new Error('Enter an email address or a phone number.');
  }
  if (normalizedEmail && !validEmail(normalizedEmail)) throw new Error('Enter a valid email address.');
  if (normalizedPhoneNum && !validPhone(normalizedPhoneNum)) throw new Error('Enter a valid phone number.');

  if (!password || password.length < 8) throw new Error('Password must be at least 8 characters.');

  if (uname === 'admin') throw new Error('That username is taken.');
  if (normalizedEmail === 'himanshugola118@gmail.com') throw new Error('That email is already in use.');

  const list = read(ACCOUNTS_KEY, []);
  if (list.some((a) => a.username === uname)) throw new Error('That username is taken.');
  if (normalizedEmail && list.some((a) => a.email === normalizedEmail)) {
    throw new Error('An account with this email already exists.');
  }
  if (normalizedPhoneNum && list.some((a) => a.phone === normalizedPhoneNum)) {
    throw new Error('An account with this phone number already exists.');
  }

  const account = {
    id: 'RN-U-' + Date.now().toString(36).toUpperCase(),
    name: name.trim(),
    username: uname,
    email: normalizedEmail,
    phone: normalizedPhoneNum,
    passwordHash: await hash(password),
    role: 'user',
    status: 'active',
    createdAt: new Date().toISOString()
  };

  write(ACCOUNTS_KEY, [account, ...list]);
  write(SESSION_KEY, account.id);
  return publicUser(account);
}

export async function login({ identifier, password }) {
  const raw = (identifier || '').trim();
  if (!raw) throw new Error('Enter your email, phone number or username.');

  const normalizedEmail = raw.toLowerCase();
  const normalizedPhoneNum = normalizePhone(raw);
  const normalizedUser = normalizeUsername(raw);

  const list = read(ACCOUNTS_KEY, []);
  const account = list.find(
    (a) =>
      (a.email && a.email === normalizedEmail) ||
      (a.phone && a.phone === normalizedPhoneNum) ||
      (a.username && a.username === normalizedUser)
  );

  if (!account) throw new Error('No account found for that email, phone or username.');
  if (account.status === 'suspended') throw new Error('This account is suspended. Contact support.');
  if ((await hash(password)) !== account.passwordHash) throw new Error('Incorrect password.');

  write(SESSION_KEY, account.id);
  return publicUser(account);
}

export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

async function updateAccount(id, patch) {
  const list = read(ACCOUNTS_KEY, []);
  const next = list.map((a) => (a.id === id ? { ...a, ...patch } : a));
  write(ACCOUNTS_KEY, next);
  return publicUser(next.find((a) => a.id === id));
}

export async function updateEmail(id, newEmail) {
  const normalized = (newEmail || '').trim().toLowerCase();
  if (!normalized) throw new Error('Enter an email address.');
  if (!validEmail(normalized)) throw new Error('Enter a valid email address.');
  const list = read(ACCOUNTS_KEY, []);
  if (list.some((a) => a.id !== id && a.email === normalized)) {
    throw new Error('That email is already in use.');
  }
  return updateAccount(id, { email: normalized });
}

export async function updatePhone(id, newPhone) {
  const normalized = normalizePhone(newPhone);
  if (!normalized) throw new Error('Enter a phone number.');
  if (!validPhone(normalized)) throw new Error('Enter a valid phone number.');
  const list = read(ACCOUNTS_KEY, []);
  if (list.some((a) => a.id !== id && a.phone === normalized)) {
    throw new Error('That phone number is already in use.');
  }
  return updateAccount(id, { phone: normalized });
}

export async function updateName(id, name) {
  if (!name || !name.trim()) throw new Error('Enter your full name.');
  return updateAccount(id, { name: name.trim() });
}

export async function updateUsername(id, newUsername) {
  const uname = normalizeUsername(newUsername);
  if (!/^[a-z0-9_]{3,20}$/.test(uname)) {
    throw new Error('Username must be 3–20 characters: letters, numbers or underscore.');
  }
  const list = read(ACCOUNTS_KEY, []);
  if (list.some((a) => a.id !== id && a.username === uname)) {
    throw new Error('That username is taken.');
  }
  return updateAccount(id, { username: uname });
}

export async function updatePassword(id, current, next) {
  const list = read(ACCOUNTS_KEY, []);
  const account = list.find((a) => a.id === id);
  if (!account) throw new Error('Account not found.');
  if ((await hash(current)) !== account.passwordHash) throw new Error('Current password is incorrect.');
  if (!next || next.length < 8) throw new Error('New password must be at least 8 characters.');
  return updateAccount(id, { passwordHash: await hash(next) });
}
