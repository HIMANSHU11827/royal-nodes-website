import React, { useState } from 'react';
import { LogIn, ArrowRight, KeyRound, User, Eye, EyeOff } from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

export const LoginPage = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await onLogin({ identifier, password });
    } catch (err) {
      setError(err.message || 'Could not sign in.');
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

      <div className="relative z-10 mx-auto max-w-[1000px] px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <SectionLabel>Account</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-5">Welcome back</h1>
          <p className="text-sm text-gray-400 mt-4 max-w-md">
            Sign in with your email, phone number or username.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-gray-400">
            <li>• View invoices and orders</li>
            <li>• Open and track support tickets</li>
            <li>• Update your email, phone and password</li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={submit} className="border border-[#1E293B] bg-[#0D1522] p-6">
            <div className="flex items-center gap-2 mb-5">
              <LogIn className="w-4 h-4 text-[#48B7FF]" />
              <h2 className="text-sm font-bold">Sign in</h2>
            </div>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Email, phone or username</span>
              <div className="mt-1.5 flex items-center bg-[#000000] border border-[#1E293B] focus-within:border-[#1769FF]">
                <User className="w-4 h-4 text-gray-500 ml-3" />
                <input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="you@example.com · +91… · yourhandle"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none"
                />
              </div>
            </label>

            <label className="block mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Password</span>
              <div className="mt-1.5 flex items-center bg-[#000000] border border-[#1E293B] focus-within:border-[#1769FF]">
                <KeyRound className="w-4 h-4 text-gray-500 ml-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="px-2.5 text-gray-500 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </label>

            {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="mt-5 w-full py-3 bg-[#1769FF] hover:bg-[#0d5be6] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <span>{busy ? 'Signing in…' : 'Sign in'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="mt-4 text-xs text-gray-500 text-center">
              No account?{' '}
              <a href="/signup" className="text-[#48B7FF] font-bold hover:underline">Create one</a>
            </p>
          </form>
        </Reveal>
      </div>
    </main>
  );
};
