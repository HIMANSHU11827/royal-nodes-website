import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { AgentPage } from './pages/AgentPage';
import { OpenClawPage } from './pages/OpenClawPage';
import { HermesAgentPage } from './pages/HermesAgentPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartModal } from './components/CartModal';
import { ScrollProgress } from './components/Motion';
import { ResourcesPage } from './pages/ResourcesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { DevelopersPage } from './pages/DevelopersPage';
import { BillingPage } from './pages/BillingPage';
import { TicketsPage } from './pages/TicketsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AccountPage } from './pages/AccountPage';
import { DealsPage } from './pages/DealsPage';
import { DiscordPage } from './pages/DiscordPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';
import { loadCatalogue, ensureTiers, getSettings, activeAnnouncement } from './lib/store';
import { currentUser, login, signup, logout, updateEmail, updatePhone, updateName, updateUsername, updatePassword } from './lib/auth';
import { MINECRAFT_PLANS, WEB_PLANS } from './data/catalog';

loadCatalogue();
ensureTiers();

function basePathFor(pathname) {
  if (pathname.startsWith('/pricing')) return '/pricing';
  if (pathname.startsWith('/solutions')) return '/solutions';
  if (pathname.startsWith('/developers')) return '/developers';
  if (pathname.startsWith('/resources')) return '/resources';
  if (pathname.startsWith('/billing')) return '/billing';
  if (pathname.startsWith('/tickets')) return '/tickets';
  if (pathname.startsWith('/checkout')) return '/checkout';
  if (pathname.startsWith('/login')) return '/login';
  if (pathname.startsWith('/signup')) return '/signup';
  if (pathname.startsWith('/account')) return '/account';
  if (pathname.startsWith('/deals')) return '/deals';
  if (pathname.startsWith('/discord')) return '/discord';
  if (pathname.startsWith('/reviews')) return '/reviews';
  if (pathname.startsWith('/terms')) return '/terms';
  if (pathname.startsWith('/admin')) return '/admin';
  if (pathname.startsWith('/managed-openclaw')) return '/managed-openclaw';
  if (pathname.startsWith('/managed-hermes-agent')) return '/managed-hermes-agent';
  if (pathname.startsWith('/agent')) return '/agent';
  return '/';
}

export function App({ initialRoute }) {
  const getInitialPath = () => {
    if (initialRoute) return initialRoute;
    if (typeof window !== 'undefined') return window.location.pathname;
    return '/';
  };

  const initialPath = getInitialPath();
  const [path, setPath] = useState(initialPath);
  const [route, setRoute] = useState(basePathFor(initialPath));
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(MINECRAFT_PLANS[0]);
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rn_cart') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(() => currentUser());
  const [pricingCategory, setPricingCategory] = useState(() => {
    if (typeof window === 'undefined') return null;
    return new URLSearchParams(window.location.search).get('cat');
  });

  const segments = path.split('/').filter(Boolean);
  const slug = segments.length > 1 ? segments[1] : null;

  const handleNavigate = (target) => {
    const [baseWithSlug, query] = target.split('?');
    if (query) {
      const cat = new URLSearchParams(query).get('cat');
      if (cat) setPricingCategory(cat);
    }
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', target);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    setPath(baseWithSlug);
    setRoute(basePathFor(baseWithSlug));
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    handleNavigate('/checkout');
  };

  const handleLogin = async ({ identifier, password }) => {
    const nextUser = await login({ identifier, password });
    setUser(nextUser);
    handleNavigate('/account');
  };

  const handleSignup = async ({ name, username, email, phone, password }) => {
    const nextUser = await signup({ name, username, email, phone, password });
    setUser(nextUser);
    handleNavigate('/account');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    handleNavigate('/');
  };

  const handleUpdateEmail = async (newEmail) => {
    const nextUser = await updateEmail(user.id, newEmail);
    setUser(nextUser);
  };

  const handleUpdateName = async (name) => {
    const nextUser = await updateName(user.id, name);
    setUser(nextUser);
  };

  const handleUpdateUsername = async (username) => {
    const nextUser = await updateUsername(user.id, username);
    setUser(nextUser);
  };

  const handleUpdatePhone = async (newPhone) => {
    const nextUser = await updatePhone(user.id, newPhone);
    setUser(nextUser);
  };

  const handleUpdatePassword = async (current, next) => {
    await updatePassword(user.id, current, next);
  };

  useEffect(() => {
    try {
      localStorage.setItem('rn_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    const clear = () => setCart([]);
    window.addEventListener('rn:cart-clear', clear);
    return () => window.removeEventListener('rn:cart-clear', clear);
  }, []);

  const addToCart = (plan) => {
    setCart((prev) => (prev.some((item) => item.id === plan.id) ? prev : [...prev, plan]));
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const checkoutCart = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    setSelectedPlan({
      id: 'cart',
      name: `Cart — ${cart.length} item${cart.length > 1 ? 's' : ''}`,
      price: total
    });
    setCartOpen(false);
    handleNavigate('/checkout');
  };

  const settings = getSettings();
  const announcement = activeAnnouncement();
  const isStaffOrAdmin = user && (user.role === 'admin' || user.role === 'staff');

  if (settings.maintenance && !isStaffOrAdmin) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#48B7FF]">Maintenance</div>
        <h1 className="text-3xl sm:text-4xl font-black mt-4">We'll be right back</h1>
        <p className="text-sm text-gray-400 mt-3 max-w-md">The site is temporarily under maintenance. Please check back shortly.</p>
      </div>
    );
  }

  return (
    <div data-route={route} data-path={path} data-slug={slug || ''} className="relative isolate min-h-screen bg-[#000000] text-white flex flex-col font-sans selection:bg-[#1769FF] selection:text-white">
      <ScrollProgress />
      <Header
        currentPath={route}
        onNavigate={handleNavigate}
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
        user={user}
        onOpenLogin={() => handleNavigate('/login')}
        onOpenAccount={() => handleNavigate('/account')}
        onOpenCheckout={() => {
          setSelectedPlan(MINECRAFT_PLANS[0]);
          handleNavigate('/checkout');
        }}
      />

      {announcement && (
        <div className="w-full border-b border-[#1769FF]/30 bg-[#1769FF]/10 px-4 py-2 text-center text-xs font-semibold text-[#9ecbff]">
          {announcement.text}
        </div>
      )}

      <div className="flex-1">
        {route === '/' && (
          <HomePage onSelectPlan={handleSelectPlan} onBuyNow={handleSelectPlan} onAddToCart={addToCart} />
        )}
        {route === '/pricing' && (
          <PricingPage onSelectPlan={handleSelectPlan} onBuyNow={handleSelectPlan} onAddToCart={addToCart} initialCategory={pricingCategory} />
        )}
        {route === '/resources' && (
          <ResourcesPage slug={slug} />
        )}
        {route === '/solutions' && (
          <SolutionsPage slug={slug} />
        )}
        {route === '/developers' && (
          <DevelopersPage slug={slug} />
        )}
        {route === '/billing' && (
          <BillingPage user={user} />
        )}
        {route === '/tickets' && (
          <TicketsPage user={user} />
        )}
        {route === '/checkout' && (
          <CheckoutPage selectedItem={selectedPlan} user={user} />
        )}
        {route === '/login' && (
          <LoginPage onLogin={handleLogin} />
        )}
        {route === '/signup' && (
          <SignupPage onSignup={handleSignup} />
        )}
        {route === '/account' && (
          <AccountPage
            user={user}
            onLogout={handleLogout}
            onUpdateEmail={handleUpdateEmail}
            onUpdatePhone={handleUpdatePhone}
            onUpdateName={handleUpdateName}
            onUpdateUsername={handleUpdateUsername}
            onUpdatePassword={handleUpdatePassword}
          />
        )}
        {route === '/deals' && (
          <DealsPage onBuyNow={handleSelectPlan} onAddToCart={addToCart} />
        )}
        {route === '/discord' && (
          <DiscordPage user={user} />
        )}
        {route === '/reviews' && (
          <ReviewsPage user={user} />
        )}
        {route === '/terms' && (
          <TermsPage />
        )}
        {route === '/admin' && (
          <AdminPage user={user} />
        )}
        {route === '/agent' && (
          <AgentPage onOpenCheckout={() => handleSelectPlan(WEB_PLANS[1])} onSelectPlan={handleSelectPlan} onBuyNow={handleSelectPlan} onAddToCart={addToCart} />
        )}
        {route === '/managed-openclaw' && (
          <OpenClawPage onOpenCheckout={() => handleSelectPlan(WEB_PLANS[2])} />
        )}
        {route === '/managed-hermes-agent' && (
          <HermesAgentPage onOpenCheckout={() => handleSelectPlan(WEB_PLANS[3])} />
        )}
      </div>

      <Footer />

      <CartModal
        isOpen={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={checkoutCart}
      />

    </div>
  );
}

export default App;
