import React, { useEffect, useState } from 'react';
import { LogOut, Mail, KeyRound, Receipt, LifeBuoy, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
};

export const AccountPage = ({ user, onLogout, onUpdateEmail, onUpdatePhone, onUpdateName, onUpdateUsername, onUpdatePassword }) => {
  const [email, setEmail] = useState(user?.email || '');
  const [emailMsg, setEmailMsg] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [phoneMsg, setPhoneMsg] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [fullName, setFullName] = useState(user?.name || '');
  const [usernameDraft, setUsernameDraft] = useState(user?.username || '');
  const [profileMsg, setProfileMsg] = useState('');
  const [profileErr, setProfileErr] = useState('');

  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');

  const [orderCount, setOrderCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    try {
      setOrderCount(JSON.parse(localStorage.getItem('rn_orders') || '[]').length);
    } catch { setOrderCount(0); }
    try {
      setTicketCount(JSON.parse(localStorage.getItem('rn_tickets') || '[]').length);
    } catch { setTicketCount(0); }
  }, [user]);

  useEffect(() => {
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setFullName(user?.name || '');
    setUsernameDraft(user?.username || '');
  }, [user]);

  if (!user) {
    return (
      <main className="relative isolate w-full min-h-[60vh] bg-[#000000] text-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <GlowOrbs />
        </div>
        <div className="relative z-10 mx-auto max-w-[700px] px-4 py-20 text-center">
          <SectionLabel>Account</SectionLabel>
          <h1 className="text-3xl sm:text-4xl font-black mt-5">Sign in to continue</h1>
          <p className="text-sm text-gray-400 mt-3">You need an account to view this page.</p>
          <div className="flex gap-3 justify-center mt-6">
            <a href="/login" className="px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">Sign in</a>
            <a href="/signup" className="px-5 py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm">Create account</a>
          </div>
        </div>
      </main>
    );
  }

  const submitProfile = async (e) => {
    e.preventDefault();
    setProfileErr('');
    setProfileMsg('');
    try {
      await onUpdateName(fullName);
      await onUpdateUsername(usernameDraft);
      setProfileMsg('Profile updated.');
    } catch (err) {
      setProfileErr(err.message || 'Could not update profile.');
    }
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    setEmailErr('');
    setEmailMsg('');
    try {
      await onUpdateEmail(email);
      setEmailMsg('Email updated.');
    } catch (err) {
      setEmailErr(err.message || 'Could not update email.');
    }
  };

  const submitPhone = async (e) => {
    e.preventDefault();
    setPhoneErr('');
    setPhoneMsg('');
    try {
      await onUpdatePhone(phone);
      setPhoneMsg('Phone number updated.');
    } catch (err) {
      setPhoneErr(err.message || 'Could not update phone number.');
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    setPassErr('');
    setPassMsg('');
    if (next !== confirm) {
      setPassErr('New passwords do not match.');
      return;
    }
    try {
      await onUpdatePassword(current, next);
      setPassMsg('Password updated.');
      setCurrent('');
      setNext('');
      setConfirm('');
    } catch (err) {
      setPassErr(err.message || 'Could not update password.');
    }
  };

  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="relative isolate overflow-hidden border-b border-[#1E293B] px-4 pb-12 pt-12 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/40 via-[#000000]/80 to-[#000000]" />
          <GlowOrbs />
        </div>
        <div className="relative z-10 mx-auto max-w-[1100px] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <SectionLabel>Account</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-4">{user.name}</h1>
            <p className="text-sm text-gray-400 mt-2">{user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#1E293B] hover:border-red-500/50 hover:text-red-300 text-sm font-bold text-white"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </section>

      <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Reveal className="lg:col-span-2 space-y-6">
            <div className="border border-[#1E293B] bg-[#0D1522] p-5">
              <h2 className="text-sm font-bold text-white">Profile</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">Name</div>
                  <div className="text-white font-bold mt-1">{user.name}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">Username</div>
                  <div className="text-[#48B7FF] font-mono mt-1">@{user.username || '—'}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">Account ID</div>
                  <div className="text-white font-mono mt-1">{user.id}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">Email</div>
                  <div className="text-white mt-1">{user.email || '—'}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">Phone</div>
                  <div className="text-white mt-1">{user.phone || '—'}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-500">Member since</div>
                  <div className="text-white mt-1">{fmtDate(user.createdAt)}</div>
                </div>
              </div>
            </div>

            <form onSubmit={submitProfile} className="border border-[#1E293B] bg-[#0D1522] p-5">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#48B7FF]" />
                <h2 className="text-sm font-bold text-white">Profile details</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]"
                />
                <input
                  value={usernameDraft}
                  onChange={(e) => setUsernameDraft(e.target.value)}
                  placeholder="username"
                  className="bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]"
                />
              </div>
              <button type="submit" className="mt-3 px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">Save profile</button>
              {profileMsg && <p className="mt-2 text-xs text-emerald-400">{profileMsg}</p>}
              {profileErr && <p className="mt-2 text-xs text-rose-400">{profileErr}</p>}
            </form>

            <form onSubmit={submitEmail} className="border border-[#1E293B] bg-[#0D1522] p-5">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#48B7FF]" />
                <h2 className="text-sm font-bold text-white">Change email</h2>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#1769FF]"
                />
                <button type="submit" className="px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">Save email</button>
              </div>
              {emailMsg && <p className="mt-2 text-xs text-emerald-400">{emailMsg}</p>}
              {emailErr && <p className="mt-2 text-xs text-rose-400">{emailErr}</p>}
            </form>

            <form onSubmit={submitPhone} className="border border-[#1E293B] bg-[#0D1522] p-5">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#48B7FF]" />
                <h2 className="text-sm font-bold text-white">Change phone number</h2>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="flex-1 bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]"
                />
                <button type="submit" className="px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">Save phone</button>
              </div>
              {phoneMsg && <p className="mt-2 text-xs text-emerald-400">{phoneMsg}</p>}
              {phoneErr && <p className="mt-2 text-xs text-rose-400">{phoneErr}</p>}
            </form>

            <form onSubmit={submitPassword} className="border border-[#1E293B] bg-[#0D1522] p-5">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#48B7FF]" />
                <h2 className="text-sm font-bold text-white">Change password</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="password"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  placeholder="Current password"
                  className="bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]"
                />
                <input
                  type="password"
                  value={next}
                  onChange={(e) => setNext(e.target.value)}
                  placeholder="New password"
                  className="bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]"
                />
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm new"
                  className="bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]"
                />
              </div>
              <button type="submit" className="mt-3 px-5 py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm">Update password</button>
              {passMsg && <p className="mt-2 text-xs text-emerald-400">{passMsg}</p>}
              {passErr && <p className="mt-2 text-xs text-rose-400">{passErr}</p>}
            </form>
          </Reveal>

          <Reveal delay={100} className="space-y-4">
            <a href="/billing" className="block border border-[#1E293B] bg-[#0D1522] p-5 hover:border-[#1769FF] transition">
              <Receipt className="w-5 h-5 text-[#48B7FF]" />
              <div className="text-sm font-bold text-white mt-3">Billing</div>
              <div className="text-xs text-gray-400 mt-1">{orderCount} order{orderCount === 1 ? '' : 's'} and invoices</div>
              <span className="inline-flex items-center gap-1 text-[#48B7FF] text-xs font-bold mt-3">Open <ArrowRight className="w-3.5 h-3.5" /></span>
            </a>
            <a href="/tickets" className="block border border-[#1E293B] bg-[#0D1522] p-5 hover:border-[#1769FF] transition">
              <LifeBuoy className="w-5 h-5 text-[#48B7FF]" />
              <div className="text-sm font-bold text-white mt-3">Support</div>
              <div className="text-xs text-gray-400 mt-1">{ticketCount} ticket{ticketCount === 1 ? '' : 's'} opened</div>
              <span className="inline-flex items-center gap-1 text-[#48B7FF] text-xs font-bold mt-3">Open <ArrowRight className="w-3.5 h-3.5" /></span>
            </a>
            <div className="border border-[#1E293B] bg-[#0D1522] p-5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div className="text-sm font-bold text-white mt-3">Security</div>
              <div className="text-xs text-gray-400 mt-1">Passwords are stored hashed. Change them anytime above.</div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
