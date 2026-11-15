import React, { useState } from 'react';
import { UserPlus, ArrowRight, Mail, KeyRound, User, Phone, AtSign, Eye, EyeOff } from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

const Field = ({ icon: Icon, label, ...props }) => (
  <label className="block">
    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{label}</span>
    <div className="mt-1.5 flex items-center bg-[#000000] border border-[#1E293B] focus-within:border-[#1769FF]">
      <Icon className="w-4 h-4 text-gray-500 ml-3" />
      <input
        {...props}
        className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none"
      />
    </div>
  </label>
);

export const SignupPage = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() && !phone.trim()) {
      setError('Enter an email address or a phone number.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      await onSignup({ name, username, email, phone, password });
    } catch (err) {
      setError(err.message || 'Could not create the account.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative isolate w-full min-h-[70vh] bg-[#000000] text-white overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-[#000000]/80 to-[#000000]" />
        <GlowOrbs />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <Reveal>
          <SectionLabel>Create account</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-5">Start with Royal Nodes</h1>
          <p className="text-sm text-gray-400 mt-4 max-w-md">
            One account for every service. Sign up with an email address or a phone number — your username is always present.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-gray-400">
            <li>• Choose a username people can recognise</li>
            <li>• Use email or phone to sign in</li>
            <li>• Track orders, invoices and tickets</li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={submit} className="border border-[#1E293B] bg-[#0D1522] p-6">
            <div className="flex items-center gap-2 mb-5">
              <UserPlus className="w-4 h-4 text-[#48B7FF]" />
              <h2 className="text-sm font-bold">Create your account</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field icon={User} label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              <Field icon={AtSign} label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="yourhandle" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <Field icon={Mail} label="Email (optional)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              <Field icon={Phone} label="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <p className="text-[11px] text-gray-500 mt-2">Use at least one: email or phone.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <Field icon={KeyRound} label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8+ characters" />
              <Field icon={KeyRound} label="Confirm" type={showPassword ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat" />
            </div>

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPassword ? 'Hide passwords' : 'Show passwords'}
            </button>

            {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="mt-5 w-full py-3 bg-[#1769FF] hover:bg-[#0d5be6] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <span>{busy ? 'Creating…' : 'Create account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="mt-4 text-xs text-gray-500 text-center">
              Already have an account?{' '}
              <a href="/login" className="text-[#48B7FF] font-bold hover:underline">Sign in</a>
            </p>
          </form>
        </Reveal>
      </div>
    </main>
  );
};
