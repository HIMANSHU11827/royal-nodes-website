import React, { useEffect, useState } from 'react';
import { LifeBuoy, Plus, CheckCircle2, Clock, ChevronDown, MessageSquare, ArrowRight, Send } from 'lucide-react';
import { Reveal, SectionLabel, GlowOrbs } from '../components/Motion';
import { listTickets, addTicketReply } from '../lib/store';

const TICKETS_KEY = 'rn_tickets';

const CATEGORIES = ['Billing', 'Technical', 'Sales', 'Abuse', 'Other'];
const PRIORITIES = ['Low', 'Normal', 'High', 'Urgent'];

const priorityStyle = (priority) => {
  switch (priority) {
    case 'Urgent': return 'text-red-300 border-red-500/30 bg-red-500/10';
    case 'High': return 'text-amber-300 border-amber-500/30 bg-amber-500/10';
    case 'Low': return 'text-gray-400 border-[#1E293B] bg-[#131E2E]';
    default: return 'text-[#48B7FF] border-[#1769FF]/40 bg-[#1769FF]/10';
  }
};

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
};

const Avatar = ({ name, self }) => (
  <div className={`w-11 h-11 shrink-0 flex items-center justify-center text-xs font-black ${self ? 'bg-[#1769FF] text-white' : 'bg-[#1769FF]/20 border border-[#1769FF]/40 text-[#48B7FF]'}`}>
    {(name || '?').slice(0, 2).toUpperCase()}
  </div>
);

const Bubble = ({ text, author, at, self, role }) => (
  <div className={`flex gap-2.5 ${self ? 'justify-end' : 'justify-start'}`}>
    {!self && <Avatar name={author} self={false} />}
    <div className={`max-w-[95%] border p-5 ${self ? 'bg-[#1769FF]/15 border-[#1769FF]/40' : 'bg-[#0D1522] border-[#1E293B]'}`}>
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider">
        <span className="font-bold text-gray-200">{author}</span>
        {role && <span className={role === 'customer' ? 'text-gray-500' : 'text-[#48B7FF]'}>{role}</span>}
        <span className="text-gray-600">·</span>
        <span className="text-gray-500">{fmtDate(at)}</span>
      </div>
      <p className="text-base sm:text-[17px] text-gray-100 mt-2.5 whitespace-pre-wrap leading-relaxed">{text}</p>
    </div>
    {self && <Avatar name={author} self />}
  </div>
);

export const TicketsPage = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Technical');
  const [priority, setPriority] = useState('Normal');
  const [message, setMessage] = useState('');
  const [openId, setOpenId] = useState(null);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    setTickets(listTickets());
  }, []);

  const persist = (next) => {
    setTickets(next);
    try {
      localStorage.setItem(TICKETS_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setError('Add a subject and a message.');
      return;
    }
    const ticket = {
      id: 'TKT-' + Date.now().toString(36).toUpperCase(),
      subject: subject.trim(),
      category,
      priority,
      message: message.trim(),
      customer: user?.name || 'You',
      status: 'Open',
      replies: [],
      createdAt: new Date().toISOString()
    };
    persist([ticket, ...tickets]);
    setSubject('');
    setMessage('');
    setCategory('Technical');
    setPriority('Normal');
    setError('');
    setOpenId(ticket.id);
  };

  const closeTicket = (id) => {
    persist(tickets.map((t) => (t.id === id ? { ...t, status: 'Closed' } : t)));
  };

  const sendReply = (ticket) => {
    const text = (replyDrafts[ticket.id] || '').trim();
    if (!text) return;
    addTicketReply(ticket.id, { author: user?.name || 'You', role: 'customer', text });
    setTickets(listTickets());
    setReplyDrafts((prev) => ({ ...prev, [ticket.id]: '' }));
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
          <Reveal><SectionLabel>Support</SectionLabel></Reveal>
          <Reveal delay={80} as="h1" className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Support tickets
          </Reveal>
          <Reveal delay={140} as="p" className="mt-4 max-w-2xl text-sm text-gray-400 sm:text-base">
            Open a ticket and chat with our team. Every message is stored in your browser until the support backend is connected.
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-[#0D1522] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8">
          <Reveal>
            <form onSubmit={submit} className="border border-[#1E293B] bg-[#131E2E] p-5 sm:p-6 tilt-card">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#48B7FF]" />
                <h2 className="text-sm font-bold text-white">Open a new ticket</h2>
              </div>

              <label className="block mt-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Subject</span>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Short summary"
                  className="mt-1.5 w-full bg-[#0D1522] border border-[#1E293B] px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]"
                />
              </label>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Category</span>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1.5 w-full bg-[#0D1522] border border-[#1E293B] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1769FF]">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Priority</span>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1.5 w-full bg-[#0D1522] border border-[#1E293B] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1769FF]">
                    {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </label>
              </div>

              <label className="block mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Message</span>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Describe the issue" className="mt-1.5 w-full bg-[#0D1522] border border-[#1E293B] px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF] resize-y" />
              </label>

              {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

              <button type="submit" className="mt-5 w-full py-2.5 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-sm flex items-center justify-center gap-2">
                <span>Submit ticket</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">Your tickets</h2>
              <span className="text-[11px] text-gray-500">{tickets.length} total</span>
            </div>

            {tickets.length === 0 ? (
              <div className="border border-[#1E293B] bg-[#131E2E] p-8 text-center">
                <LifeBuoy className="w-8 h-8 text-gray-600 mx-auto" />
                <p className="text-sm text-gray-400 mt-3">No tickets yet.</p>
                <p className="text-xs text-gray-500 mt-1">Use the form to open your first ticket.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {tickets.map((ticket) => {
                  const open = openId === ticket.id;
                  const replies = ticket.replies || [];
                  return (
                    <li key={ticket.id} className="border border-[#1E293B] bg-[#131E2E]">
                      <button type="button" onClick={() => setOpenId(open ? null : ticket.id)} className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-[#0D1522] transition">
                        <span className="min-w-0">
                          <span className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-gray-500">{ticket.id}</span>
                            <span className={`px-1.5 py-0.5 border text-[9px] font-bold uppercase ${priorityStyle(ticket.priority)}`}>{ticket.priority}</span>
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${ticket.status === 'Closed' ? 'text-gray-500' : 'text-emerald-400'}`}>
                              {ticket.status === 'Closed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              {ticket.status}
                            </span>
                            <span className="text-[10px] text-gray-500">{1 + replies.length} messages</span>
                          </span>
                          <span className="block text-base font-bold text-white mt-1 truncate">{ticket.subject}</span>
                          <span className="block text-[11px] text-gray-500 mt-0.5">{ticket.category} · {fmtDate(ticket.createdAt)}</span>
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                      </button>

                      {open && (
                        <div className="p-4 border-t border-[#1E293B]">
                          <div className="border border-[#1E293B] bg-[#0D1522]">
                            <div className="min-h-[340px] max-h-[min(60vh,520px)] overflow-y-auto p-5 sm:p-6 space-y-5">
                              <Bubble text={ticket.message} author={ticket.customer || 'You'} role="customer" at={ticket.createdAt} self />
                              {replies.map((r) => (
                                <Bubble key={r.id} text={r.text} author={r.author} role={r.role} at={r.at} self={r.role === 'customer'} />
                              ))}
                            </div>

                            {ticket.status !== 'Closed' && (
                              <form onSubmit={(e) => { e.preventDefault(); sendReply(ticket); }} className="flex gap-2 border-t border-[#1E293B] p-3">
                                <input
                                  value={replyDrafts[ticket.id] || ''}
                                  onChange={(e) => setReplyDrafts((prev) => ({ ...prev, [ticket.id]: e.target.value }))}
                                  placeholder="Type a message…"
                                  className="flex-1 bg-[#000000] border border-[#1E293B] px-4 py-4 text-base text-white placeholder-gray-600 focus:outline-none focus:border-[#1769FF]"
                                />
                                <button type="submit" className="px-6 bg-[#1769FF] hover:bg-[#0d5be6] text-white font-bold text-base inline-flex items-center gap-2">
                                  <Send className="w-4 h-4" />
                                </button>
                              </form>
                            )}
                          </div>

                          {ticket.status !== 'Closed' && (
                            <div className="mt-3 flex justify-end">
                              <button onClick={() => closeTicket(ticket.id)} className="px-3 py-1.5 border border-[#1E293B] hover:border-[#1769FF] text-[11px] font-bold text-gray-300 hover:text-white">
                                Mark as closed
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-6 border border-[#1E293B] bg-[#131E2E] p-4 flex items-start gap-3">
              <MessageSquare className="w-4 h-4 text-[#48B7FF] mt-0.5 shrink-0" />
              <p className="text-xs text-gray-400 leading-relaxed">
                Replies from our team appear here. Tickets are stored locally in this browser until the support backend is connected.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};
