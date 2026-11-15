import React, { useEffect, useState } from 'react';
import { Star, Send, CheckCircle2, MessageSquareQuote, Trash2 } from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';

const REVIEWS_KEY = 'rn_reviews';

const Stars = ({ value = 5, size = 'text-base' }) => (
  <span className={`${size} tracking-wider text-amber-300`} aria-label={`${value} out of 5`}>
    {'★'.repeat(value)}
    <span className="text-gray-700">{'★'.repeat(5 - value)}</span>
  </span>
);

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
};

export const ReviewsPage = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState(user?.name || '');
  const [plan, setPlan] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      setReviews(JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]'));
    } catch {
      setReviews([]);
    }
  }, []);

  const persist = (next) => {
    setReviews(next);
    try {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable
    }
  };

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !title.trim() || !body.trim()) {
      setError('Add your name, a title and your review.');
      return;
    }
    const review = {
      id: 'RV-' + Date.now().toString(36).toUpperCase(),
      name: name.trim(),
      plan: plan.trim(),
      rating,
      title: title.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString()
    };
    persist([review, ...reviews]);
    setTitle('');
    setBody('');
    setPlan('');
    setRating(5);
    setDone(true);
  };

  const remove = (id) => persist(reviews.filter((r) => r.id !== id));

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <main className="w-full bg-[#000000] text-white">
      <section className="relative isolate overflow-hidden border-b border-[#1E293B] px-4 pb-14 pt-14 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/30 via-[#000000]/80 to-[#000000]" />
          <GlowOrbs />
        </div>
        <div className="relative z-10 mx-auto max-w-[1100px] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <Reveal><SectionLabel>Reviews</SectionLabel></Reveal>
            <Reveal delay={80} as="h1" className="mt-5 text-4xl sm:text-5xl font-black tracking-tight">
              What customers say
            </Reveal>
            <Reveal delay={140} as="p" className="mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
              Reviews written by people who use Royal Nodes. Only submitted reviews appear here — we do
              not publish invented testimonials.
            </Reveal>
          </div>
          <Reveal delay={200} className="text-right">
            <div className="text-4xl font-black text-white">{average ?? '—'}</div>
            <div className="mt-1"><Stars value={average ? Math.round(Number(average)) : 0} /></div>
            <div className="text-xs text-gray-500 mt-1">{reviews.length} review{reviews.length === 1 ? '' : 's'}</div>
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-[#0D1522] border-b border-[#1E293B] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8">
          {/* List */}
          <div>
            <Reveal className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent reviews</h2>
              <span className="text-xs text-gray-500">{reviews.length} total</span>
            </Reveal>

            {reviews.length === 0 ? (
              <Reveal className="border border-[#1E293B] bg-[#131E2E] p-8 text-center">
                <MessageSquareQuote className="w-8 h-8 text-gray-600 mx-auto" />
                <p className="text-sm text-gray-400 mt-3">No reviews yet.</p>
                <p className="text-xs text-gray-500 mt-1">Be the first to write one using the form.</p>
              </Reveal>
            ) : (
              <ul className="space-y-3">
                {reviews.map((review, i) => (
                  <Reveal key={review.id} delay={Math.min(i, 6) * 50}>
                    <li className="border border-[#1E293B] bg-[#131E2E] p-5 card-lift tilt-card spotlight">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <Stars value={review.rating} size="text-sm" />
                            {review.plan && <span className="text-[10px] uppercase tracking-wider text-gray-500">{review.plan}</span>}
                          </div>
                          <h3 className="text-sm font-bold text-white mt-2">{review.title}</h3>
                        </div>
                        <button
                          onClick={() => remove(review.id)}
                          className="p-1.5 text-gray-600 hover:text-red-400"
                          aria-label="Delete review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed mt-3 whitespace-pre-wrap">{review.body}</p>
                      <div className="mt-3 pt-3 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-gray-500">
                        <span className="font-bold text-gray-300">{review.name}</span>
                        <span>{fmtDate(review.createdAt)}</span>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>

          {/* Form */}
          <Reveal delay={100}>
            {done ? (
              <div className="border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h2 className="text-lg font-bold text-white mt-3">Thanks for the review</h2>
                <p className="text-sm text-gray-400 mt-2">It now appears in the list.</p>
                <button onClick={() => setDone(false)} className="mt-5 px-5 py-2.5 border border-[#1E293B] hover:border-[#1769FF] text-white font-bold text-sm">
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="border border-[#1E293B] bg-[#131E2E] p-6 lg:sticky lg:top-24">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#48B7FF]" />
                  <h2 className="text-sm font-bold">Write a review</h2>
                </div>

                <label className="block mt-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Your name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]" />
                </label>

                <label className="block mt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Plan used (optional)</span>
                  <input value={plan} onChange={(e) => setPlan(e.target.value)} placeholder="e.g. Minecraft Gold" className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]" />
                </label>

                <div className="mt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Rating</span>
                  <div className="mt-1.5 flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        className={`text-2xl leading-none ${n <= rating ? 'text-amber-300' : 'text-gray-700'} hover:text-amber-200`}
                        aria-label={`${n} star${n > 1 ? 's' : ''}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block mt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Title</span>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short summary" className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]" />
                </label>

                <label className="block mt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Review</span>
                  <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} placeholder="What was your experience?" className="mt-1.5 w-full bg-[#000000] border border-[#1E293B] px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF] resize-y" />
                </label>

                {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

                <button type="submit" className="mt-5 w-full py-3 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center gap-2">
                  <span>Publish review</span>
                  <Send className="w-4 h-4" />
                </button>
                <p className="mt-3 text-[11px] text-gray-500">
                  Reviews are stored in this browser until the reviews backend is connected.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </main>
  );
};
