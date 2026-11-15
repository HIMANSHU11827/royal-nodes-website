import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Search, ShoppingCart, User, Menu as MenuIcon, 
  X, Server, Shield, Sparkles, ExternalLink, Globe, Sliders, BookOpen, Crown 
} from 'lucide-react';
import { 
  MEGA_MENU_PRODUCTS, MEGA_MENU_SOLUTIONS, 
  MEGA_MENU_DEVELOPERS, MEGA_MENU_RESOURCES,
  SERVICE_CATEGORIES
} from '../data/catalog';
import { getSettings } from '../lib/store';

const AGENT_MENU_ITEMS = [
  { title: 'Royal Nodes Agent', badge: 'New', desc: 'Ready-to-use AI team for daily business tasks.', href: '/agent' },
  { title: 'OpenClaw', badge: '', desc: 'Personal, always-on AI assistant for everyday automation.', href: '/managed-openclaw' },
  { title: 'Hermes Agent', badge: 'New', desc: 'Persistent, context-aware AI agent for continuous automations.', href: '/managed-hermes-agent' }
];

export const Header = ({ onOpenCheckout, onOpenCart, cartCount = 0, user, onOpenLogin, onOpenAccount, currentPath = '/', onNavigate }) => {
  const settings = getSettings();
  const [activeMenu, setActiveMenu] = useState(null); // 'Products' | 'Solutions' | 'Developers' | 'Resources' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAgentOpen, setMobileAgentOpen] = useState(false);
  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD'
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close menus on Esc or clicking outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
        setMobileAgentOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMenu = (menu) => {
    setActiveMenu(prev => (prev === menu ? null : menu));
  };

  const navigate = (path) => (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setActiveMenu(null);
      setMobileMenuOpen(false);
      setMobileAgentOpen(false);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#000000] border-b border-[#1E293B]">
      {/* Top Banner Ribbon */}
      <div className="w-full bg-[#0D1522] border-b border-[#1E293B]/70 py-2 px-4 text-center text-xs sm:text-sm font-medium text-gray-200">
        <a 
          href="/deals" 
          onClick={navigate('/deals')}
          className="inline-flex items-center space-x-2 hover:text-[#48B7FF] transition"
        >
          <span className="font-semibold text-white">
            <span className="hidden sm:inline">{settings.banner}</span>
            <span className="sm:hidden">{settings.bannerShort}</span>
          </span>
          <span className="hidden sm:inline-block text-[#48B7FF] underline font-bold ml-1">
            Claim Deal →
          </span>
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-6">
          <a href="/" onClick={navigate('/')} className="flex items-center space-x-2.5 text-white group" aria-label="homepage link">
            <div className="w-8 h-8 rounded bg-[#1769FF] flex items-center justify-center text-white shadow-md shadow-[#1769FF]/30 group-hover:scale-105 transition">
              <Crown className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-wider text-white">
                ROYAL<span className="text-[#48B7FF]">NODES</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold -mt-1">
                Your Infrastructure
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {/* Products Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMenu('Products')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded transition ${
                  activeMenu === 'Products' 
                    ? 'text-white bg-[#131E2E] border border-[#1E293B]' 
                    : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
                }`}
                aria-expanded={activeMenu === 'Products'}
                aria-label="Products"
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'Products' ? 'rotate-180 text-[#48B7FF]' : ''}`} />
              </button>

              {activeMenu === 'Products' && (
                <div 
                  className="absolute left-0 top-full mt-2 w-[920px] max-h-[75vh] overflow-y-auto bg-[#0D1522] border border-[#1E293B] rounded-lg shadow-2xl p-6 z-50 animate-fade-in"
                  role="menu"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {SERVICE_CATEGORIES.filter((cat) => !cat.hidden).map((cat) => ({ title: cat.name, badge: '', desc: cat.desc, href: `/pricing?cat=${cat.id}` })).map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href} onClick={navigate(item.href)}
                        className="p-2.5 rounded hover:bg-[#131E2E] transition border border-transparent hover:border-[#1E293B] block group"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-white group-hover:text-[#48B7FF] transition">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#1769FF]/20 text-[#48B7FF] border border-[#1769FF]/40">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 leading-snug">
                          {item.desc}
                        </p>
                      </a>
                    ))}
                  </div>

                  {/* Banner */}
                  <div className="mt-4 pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs bg-[#131E2E]/60 p-3 rounded">
                    <div>
                      <span className="font-bold text-white">Agentic AI hub:</span>
                      <span className="text-gray-400 ml-1.5">Use agents. Build agents. Host agents.</span>
                    </div>
                    <a href="/agent" onClick={navigate('/agent')} className="text-[#48B7FF] hover:underline font-bold flex items-center space-x-1">
                      <span>Explore Hub</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMenu('Solutions')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded transition ${
                  activeMenu === 'Solutions' 
                    ? 'text-white bg-[#131E2E] border border-[#1E293B]' 
                    : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
                }`}
                aria-expanded={activeMenu === 'Solutions'}
                aria-label="Solutions"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'Solutions' ? 'rotate-180 text-[#48B7FF]' : ''}`} />
              </button>

              {activeMenu === 'Solutions' && (
                <div 
                  className="absolute left-0 top-full mt-2 w-[600px] bg-[#0D1522] border border-[#1E293B] rounded-lg shadow-2xl p-6 z-50 animate-fade-in"
                  role="menu"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {MEGA_MENU_SOLUTIONS.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href} onClick={navigate(item.href)}
                        className="p-2.5 rounded hover:bg-[#131E2E] transition border border-transparent hover:border-[#1E293B] block group"
                      >
                        <div className="text-sm font-bold text-white group-hover:text-[#48B7FF] transition">
                          {item.title}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 leading-snug">
                          {item.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Developers Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMenu('Developers')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded transition ${
                  activeMenu === 'Developers' 
                    ? 'text-white bg-[#131E2E] border border-[#1E293B]' 
                    : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
                }`}
                aria-expanded={activeMenu === 'Developers'}
                aria-label="Developers"
              >
                <span>Developers</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'Developers' ? 'rotate-180 text-[#48B7FF]' : ''}`} />
              </button>

              {activeMenu === 'Developers' && (
                <div 
                  className="absolute left-0 top-full mt-2 w-[640px] bg-[#0D1522] border border-[#1E293B] rounded-lg shadow-2xl p-6 z-50 animate-fade-in"
                  role="menu"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {MEGA_MENU_DEVELOPERS.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href} onClick={navigate(item.href)}
                        className="p-2.5 rounded hover:bg-[#131E2E] transition border border-transparent hover:border-[#1E293B] block group"
                      >
                        <div className="text-sm font-bold text-white group-hover:text-[#48B7FF] transition">
                          {item.title}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 leading-snug">
                          {item.desc}
                        </p>
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs bg-[#131E2E]/60 p-2.5 rounded">
                    <div>
                      <span className="font-bold text-white">Open-source partners:</span>
                      <span className="text-gray-400 ml-1.5">Earn 20% commission by adding Deploy on Royal Nodes</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMenu('Resources')}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded transition ${
                  activeMenu === 'Resources' 
                    ? 'text-white bg-[#131E2E] border border-[#1E293B]' 
                    : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
                }`}
                aria-expanded={activeMenu === 'Resources'}
                aria-label="Resources"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'Resources' ? 'rotate-180 text-[#48B7FF]' : ''}`} />
              </button>

              {activeMenu === 'Resources' && (
                <div 
                  className="absolute left-0 top-full mt-2 w-[720px] bg-[#0D1522] border border-[#1E293B] rounded-lg shadow-2xl p-6 z-50 animate-fade-in"
                  role="menu"
                >
                  <div className="grid grid-cols-3 gap-3">
                    {MEGA_MENU_RESOURCES.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href} onClick={navigate(item.href)}
                        className="p-2 rounded hover:bg-[#131E2E] transition border border-transparent hover:border-[#1E293B] block group"
                      >
                        <div className="text-xs font-bold text-white group-hover:text-[#48B7FF] transition">
                          {item.title}
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">
                          {item.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Direct Link */}
            <a
              href="/pricing"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                currentPath === '/pricing' 
                  ? 'text-[#48B7FF] font-bold bg-[#131E2E]' 
                  : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
              }`}
            >
              Pricing
            </a>

            {/* Billing & Support */}
            <a
              href="/billing"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                currentPath === '/billing'
                  ? 'text-[#48B7FF] font-bold bg-[#131E2E]'
                  : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
              }`}
            >
              Billing
            </a>
            <a
              href="/tickets"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                currentPath === '/tickets'
                  ? 'text-[#48B7FF] font-bold bg-[#131E2E]'
                  : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
              }`}
            >
              Support
            </a>
            <a
              href="/discord"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                currentPath === '/discord'
                  ? 'text-[#48B7FF] font-bold bg-[#131E2E]'
                  : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
              }`}
            >
              Discord
            </a>
            <a
              href="/reviews"
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                currentPath === '/reviews'
                  ? 'text-[#48B7FF] font-bold bg-[#131E2E]'
                  : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
              }`}
            >
              Reviews
            </a>

            {/* Agent Direct Link */}
            <a
              href="/agent"
              className={`px-3 py-2 text-sm font-medium rounded transition flex items-center space-x-1.5 ${
                currentPath === '/agent'
                  ? 'text-[#48B7FF] font-bold bg-[#131E2E]'
                  : 'text-gray-300 hover:text-white hover:bg-[#131E2E]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#48B7FF]" />
              <span>Royal Nodes Agent</span>
            </a>
          </nav>
        </div>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Admin / Staff panel */}
          {(user?.role === 'admin' || user?.role === 'staff') && (
            <button
              type="button"
              onClick={() => onNavigate('/admin')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-[#1769FF]/15 hover:bg-[#1769FF]/25 text-[#48B7FF] border border-[#1769FF]/40 rounded transition"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{user.role === 'admin' ? 'Admin' : 'Staff'}</span>
            </button>
          )}

          {/* Account / Sign in */}
          <button
            type="button"
            onClick={user ? onOpenAccount : onOpenLogin}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-[#131E2E] hover:bg-[#1E293B] text-gray-300 hover:text-white border border-[#1E293B] rounded transition"
          >
            <User className="w-3.5 h-3.5 text-[#48B7FF]" />
            <span>{user ? user.name.split(' ')[0] : 'Sign in'}</span>
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={onOpenCart || onOpenCheckout}
            className="p-2 text-gray-300 hover:text-white rounded hover:bg-[#131E2E] transition relative"
            aria-label={`Shopping Cart (${cartCount} items)`}
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#1769FF] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Agent Dropdown Button (390px State-1) */}
          <button
            type="button"
            onClick={() => setMobileAgentOpen(!mobileAgentOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white rounded hover:bg-[#131E2E]"
            aria-label="Agent"
            aria-expanded={mobileAgentOpen}
          >
            <Sparkles className="w-5 h-5 text-[#48B7FF]" />
          </button>

          {/* Mobile Hamburger Button (390px State-2) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white rounded hover:bg-[#131E2E]"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Agent Dropdown Drawer (State-1 on 390px) */}
      {mobileAgentOpen && (
        <div className="lg:hidden border-t border-[#1E293B] bg-[#0D1522] p-4 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
            <span className="font-bold text-white text-sm flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#48B7FF]" />
              <span>Royal Nodes Agent Suite</span>
            </span>
            <button onClick={() => setMobileAgentOpen(false)} className="text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <a href="/agent" onClick={navigate('/agent')} className="block p-2 rounded bg-[#131E2E] text-white font-semibold">
              Royal Nodes Agent Plus (Autonomous Ops)
            </a>
            <a href="/managed-openclaw" onClick={navigate('/managed-openclaw')} className="block p-2 rounded bg-[#131E2E] text-white font-semibold">
              Managed OpenClaw Automation
            </a>
            <a href="/managed-hermes-agent" onClick={navigate('/managed-hermes-agent')} className="block p-2 rounded bg-[#131E2E] text-white font-semibold">
              Hermes Agent Persistent Runtime
            </a>
          </div>
        </div>
      )}

      {/* Full Mobile Hamburger Drawer (State-2 on 390px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1E293B] bg-[#0D1522] p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-fade-in">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Products</div>
            <div className="grid grid-cols-2 gap-1.5">
              {SERVICE_CATEGORIES.filter((cat) => !cat.hidden).map((cat) => (
                <a
                  key={cat.id}
                  href={`/pricing?cat=${cat.id}`}
                  onClick={navigate(`/pricing?cat=${cat.id}`)}
                  className="px-3 py-2 text-xs font-semibold text-gray-200 bg-[#131E2E] border border-[#1E293B] hover:border-[#1769FF] hover:text-white transition"
                >
                  {cat.short || cat.name}
                </a>
              ))}
            </div>
            <a
              href="/pricing"
              onClick={navigate('/pricing')}
              className="block py-2 text-sm font-semibold text-[#48B7FF] hover:text-white"
            >
              View all plans →
            </a>
          </div>

          <div className="pt-4 border-t border-[#1E293B] space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Navigation</div>
            <a href="/" className="block py-2 text-sm font-semibold text-white hover:text-[#48B7FF]">
              Home
            </a>
            <a href="/pricing" onClick={navigate('/pricing')} className="block py-2 text-sm font-semibold text-white hover:text-[#48B7FF]">
              Pricing & Comparison
            </a>
            <a href="/agent" onClick={navigate('/agent')} className="block py-2 text-sm font-semibold text-white hover:text-[#48B7FF]">
              Royal Nodes Agent
            </a>
            <a href="/managed-openclaw" onClick={navigate('/managed-openclaw')} className="block py-2 text-sm font-semibold text-white hover:text-[#48B7FF]">
              Managed OpenClaw
            </a>
            <a href="/managed-hermes-agent" onClick={navigate('/managed-hermes-agent')} className="block py-2 text-sm font-semibold text-white hover:text-[#48B7FF]">
              Managed Hermes Agent
            </a>
          </div>

          <div className="pt-4 border-t border-[#1E293B] space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Account</div>
            <a href={user ? '/account' : '/login'} onClick={navigate(user ? '/account' : '/login')} className="block py-2 text-sm font-semibold text-[#48B7FF] hover:text-white">
              {user ? `My account (${user.name.split(' ')[0]})` : 'Sign in / Create account'}
            </a>
            {(user?.role === 'admin' || user?.role === 'staff') && (
              <a href="/admin" onClick={navigate('/admin')} className="block py-2 text-sm font-semibold text-[#48B7FF] hover:text-white">
                {user.role === 'admin' ? 'Admin panel' : 'Staff panel'}
              </a>
            )}
            <a href="/pricing" onClick={navigate('/pricing')} className="block py-2 text-sm font-semibold text-white hover:text-[#48B7FF]">
              Plans & Pricing
            </a>
            <a href="/billing" onClick={navigate('/billing')} className="block py-2 text-sm font-semibold text-white hover:text-[#48B7FF]">
              Billing & Invoices
            </a>
            <a href="/tickets" onClick={navigate('/tickets')} className="block py-2 text-sm font-semibold text-white hover:text-[#48B7FF]">
              Support Tickets
            </a>
            <a href="/discord" onClick={navigate('/discord')} className="block py-2 text-sm font-semibold text-[#48B7FF] hover:text-white">
              Discord Community
            </a>
            <a href="/reviews" onClick={navigate('/reviews')} className="block py-2 text-sm font-semibold text-white hover:text-[#48B7FF]">
              Customer Reviews
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
