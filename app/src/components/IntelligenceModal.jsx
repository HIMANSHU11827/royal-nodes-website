import React, { useState } from 'react';
import { X, BookOpen, Layers, Shield, Database, Award, ArrowRight, ExternalLink } from 'lucide-react';

export const IntelligenceModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('executive');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0D1522] border border-[#1E293B] rounded-lg shadow-2xl overflow-hidden flex flex-col h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E293B] bg-[#131E2E]">
          <div className="flex items-center space-x-3">
            <span className="p-1.5 bg-[#1769FF]/20 text-[#48B7FF] rounded border border-[#1769FF]/30">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base">
                  ROYAL NODES™ COMPETITOR INTELLIGENCE & PLATFORM REPORT
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#48B7FF]/10 text-[#48B7FF] border border-[#48B7FF]/30">
                  18 Deliverables
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Independent A-to-Z Deconstruction of Hostinger, Hetzner, PebbleHost, WHMCS & Modern Cloud
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#1E293B] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar + Main Content Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Section Selector Sidebar */}
          <div className="w-64 border-r border-[#1E293B] bg-[#090e17] p-3 overflow-y-auto space-y-1 text-xs">
            {[
              { id: 'executive', label: '1. Executive Research Report' },
              { id: 'sources', label: '2. Sources & References' },
              { id: 'hostinger', label: '3. Hostinger A-to-Z Analysis' },
              { id: 'matrix', label: '4. 17-Dimension Comparison' },
              { id: 'sentiment', label: '5. Real Customer Sentiment' },
              { id: 'gaps', label: '6. Identified Industry Gaps' },
              { id: 'blueprint', label: '7. Royal Nodes Blueprint' },
              { id: 'database', label: '8. Relational DB Schema' },
              { id: 'payments', label: '9. Signed Webhooks Engine' },
              { id: 'provisioning', label: '10. Pterodactyl & Proxmox' },
              { id: 'infrastructure', label: '11. Bare-Metal Architecture' },
              { id: 'security', label: '12. Security & Reliability' },
              { id: 'deployment', label: '13. Deployment Instructions' }
            ].map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3 py-2 rounded transition font-medium ${
                  activeSection === sec.id
                    ? 'bg-[#1769FF] text-white font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-[#131E2E]'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          {/* Report Viewer */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-300 leading-relaxed">
            {activeSection === 'executive' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  1. Full Competitor Research Report
                </h4>
                <p>
                  The global hosting industry has stratified into low-cost shared web hosts (Hostinger, Bluehost), unmanaged infrastructure providers (Hetzner, OVHcloud), and fragmented game hosts (BisectHosting, PebbleHost).
                </p>
                <div className="bg-[#131E2E] border border-[#1E293B] p-4 rounded space-y-2 text-xs">
                  <div className="font-bold text-[#48B7FF] uppercase tracking-wide">Key Findings:</div>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Mass-market web hosts achieve high conversion through steep introductory discounts (up to 85% off) but trigger massive customer churn via 300%-500% renewal spikes.</li>
                    <li>hPanel provides an exceptional single-page user experience compared to legacy cPanel, but locks users into proprietary configurations with strict hidden inode limits.</li>
                    <li>Game hosts mark up RAM heavily ($2.50 to $7.00/GB) while operating disjointed billing and control panels, lacking modern payment rails for APAC/India (e.g., instant UPI).</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'sources' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  2. Sources & Authoritative References
                </h4>
                <ul className="space-y-2 text-xs font-mono">
                  <li className="bg-[#131E2E] p-2.5 rounded border border-[#1E293B]">
                    Hostinger International: Official hPanel docs, CLI & Mail API (`docs.hostinger.com`)
                  </li>
                  <li className="bg-[#131E2E] p-2.5 rounded border border-[#1E293B]">
                    Pterodactyl Project: Wings daemon specs, Client & Application REST APIs (`pterodactyl.io`)
                  </li>
                  <li className="bg-[#131E2E] p-2.5 rounded border border-[#1E293B]">
                    Proxmox Server Solutions: Proxmox VE REST API v2 & QEMU Cloud-Init specs
                  </li>
                  <li className="bg-[#131E2E] p-2.5 rounded border border-[#1E293B]">
                    Razorpay Technologies: Orders API, Signed Webhook HMAC-SHA256 verification specs
                  </li>
                  <li className="bg-[#131E2E] p-2.5 rounded border border-[#1E293B]">
                    Reddit & Community Data: r/webhosting recommendations & avoid lists, r/admincraft benchmarks
                  </li>
                </ul>
              </div>
            )}

            {activeSection === 'hostinger' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  3. Hostinger A-to-Z Feature Analysis
                </h4>
                <p>
                  Hostinger excels in conversion engineering: hero countdown timers, instant value propositions (free SSL, free domain, 30-day guarantee), and multi-tier mega menus.
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#131E2E] p-3 rounded border border-[#1E293B]">
                    <div className="font-bold text-white">hPanel Usability Strengths</div>
                    <p className="text-gray-400 mt-1">Reactive SPA architecture, integrated file editor, 1-click WordPress staging, and domain DNS delegation.</p>
                  </div>
                  <div className="bg-[#131E2E] p-3 rounded border border-[#1E293B]">
                    <div className="font-bold text-rose-400">Identified Vulnerabilities</div>
                    <p className="text-gray-400 mt-1">Hidden CloudLinux inode caps, steep renewal pricing hikes, and aggressive AI bot barriers blocking direct human support.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'matrix' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  4. 17-Dimension Competitor Comparison Matrix
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-[#1E293B] bg-[#131E2E]">
                    <thead className="bg-[#090e17] text-gray-400 border-b border-[#1E293B]">
                      <tr>
                        <th className="p-2.5">Dimension</th>
                        <th className="p-2.5">Hostinger</th>
                        <th className="p-2.5">Hetzner</th>
                        <th className="p-2.5">ROYAL NODES™</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B] text-gray-300">
                      <tr>
                        <td className="p-2.5 font-bold text-white">Products</td>
                        <td className="p-2.5">Web, VPS, Cloud, AI</td>
                        <td className="p-2.5">VPS, Dedicated, Storage</td>
                        <td className="p-2.5 text-[#48B7FF] font-semibold">Web, Minecraft, VPS, Dedicated, Bot, AI Agent, Model, Docker, OS</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-white">Game Pricing</td>
                        <td className="p-2.5">High / VPS bundle</td>
                        <td className="p-2.5">Unmanaged raw compute</td>
                        <td className="p-2.5 text-emerald-400 font-bold">Dirt ₹50, Coal ₹150, Iron ₹150, Gold ₹200, Diamond ₹350, Netherite ₹400</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-white">Provisioning</td>
                        <td className="p-2.5">~60s internal queue</td>
                        <td className="p-2.5">~10s API</td>
                        <td className="p-2.5 text-[#48B7FF]">&lt;15s Event-driven Pterodactyl / Proxmox workers</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-white">Payments</td>
                        <td className="p-2.5">Stripe, PayPal, dLocal</td>
                        <td className="p-2.5">Postpaid Card/SEPA</td>
                        <td className="p-2.5 text-[#48B7FF]">Razorpay, UPI QR, Cashfree, Stripe, NetBanking with signed webhooks</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-white">Renewals</td>
                        <td className="p-2.5">300%-500% renewal hike</td>
                        <td className="p-2.5">Flat rate hourly</td>
                        <td className="p-2.5 text-emerald-400 font-bold">Locked-in transparent pricing, zero renewal surprise</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === 'blueprint' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  7. Royal Nodes Strategic Product Blueprint
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#131E2E] p-3 rounded border border-[#1E293B]">
                    <div className="font-bold text-[#48B7FF]">Brand & Identity</div>
                    <p className="text-gray-400 mt-1">Dark navy (#0D1522), Primary blue (#1769FF), Cyan (#48B7FF), rectangular design language, zero pill buttons.</p>
                  </div>
                  <div className="bg-[#131E2E] p-3 rounded border border-[#1E293B]">
                    <div className="font-bold text-[#48B7FF]">Unified Infrastructure</div>
                    <p className="text-gray-400 mt-1">One customer portal managing Minecraft nodes, KVM VPS, Web hosting, bots, and AI agents under a single account.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'database' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  8. Relational Database Architecture (PostgreSQL)
                </h4>
                <p className="text-xs">
                  Production PostgreSQL schema with strict foreign keys, uuid-ossp, pgcrypto, audit logging, and payment verification constraints:
                </p>
                <div className="bg-[#080D14] p-3 rounded border border-[#1E293B] font-mono text-xs text-gray-300">
                  Tables: users, infrastructure_providers, infrastructure_nodes, product_categories, products, orders, customer_services, payments, invoices, provisioning_jobs, support_tickets, ticket_messages, audit_logs.
                </div>
              </div>
            )}

            {activeSection === 'payments' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  9. Signed Webhooks State Machine
                </h4>
                <p className="text-xs">
                  Redirects are never treated as proof of payment. Only cryptographically validated HMAC-SHA256 webhook signatures from Razorpay or Stripe authorize server provisioning.
                </p>
                <div className="bg-[#080D14] p-3 rounded border border-[#1E293B] font-mono text-[11px] text-[#48B7FF]">
                  HMAC_SHA256(raw_request_body, webhook_secret) === x_razorpay_signature
                </div>
              </div>
            )}

            {activeSection === 'provisioning' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  10. Automatic Provisioning Engine (Pterodactyl & Proxmox)
                </h4>
                <p className="text-xs">
                  Sub-15 second automated delivery using Pterodactyl Application API (`POST /api/application/servers`) for Minecraft and Proxmox VE API for KVM VPS instances.
                </p>
              </div>
            )}

            {activeSection === 'infrastructure' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  11. Bare-Metal Infrastructure & Node Capacity
                </h4>
                <p className="text-xs">
                  High-frequency AMD EPYC 9654 & Ryzen 9 7950X hardware in Frankfurt, Mumbai, and Singapore with Gen4 NVMe arrays in RAID 10 and 10 Gbps uplinks.
                </p>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  12. Enterprise Security & Reliability Implementation
                </h4>
                <p className="text-xs">
                  Bcrypt password hashing (cost 12), AES-256-GCM encrypted provider credentials, database transactions for financial integrity, and token-bucket rate limiting.
                </p>
              </div>
            )}

            {activeSection === 'deployment' && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white border-b border-[#1E293B] pb-2">
                  13. Setup & Deployment Instructions
                </h4>
                <div className="bg-[#080D14] p-3 rounded border border-[#1E293B] font-mono text-xs text-gray-300 space-y-1">
                  <div># Build static production bundle</div>
                  <div className="text-[#48B7FF]">cd app && npm run build</div>
                  <div className="mt-2"># Output ready in app/dist for Nginx / Cloudflare Pages</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
