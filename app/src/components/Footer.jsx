import React from 'react';
import { Crown, Shield, Globe, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-[#1E293B] text-gray-400 text-xs py-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Tier Branding & Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#1E293B]">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-[#1769FF] flex items-center justify-center text-white font-bold">
                <Crown className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-wide">
                ROYAL<span className="text-[#48B7FF]">NODES</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Autonomous cloud infrastructure, high-frequency Minecraft nodes, KVM VPS, and agentic compute designed for uncompromising speed and control.
            </p>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-2 text-xs">
              Resources
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="/pricing" className="hover:text-white transition">All Hosting Plans & Comparisons</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-2 text-xs">
              Global Datacenter Nodes
            </div>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Mumbai, India (AMD EPYC 7763)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Frankfurt, Germany (AMD EPYC 9654)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Singapore (AMD Ryzen 9 7950X)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>US East, Ashburn (10 Gbps Uplink)</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-2 text-xs">
              Orders & Payment
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              Online payment is being connected. Until then, every order is reviewed and payment is confirmed manually by our team before provisioning.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-300">
              <span className="px-2 py-1 bg-[#131E2E] border border-[#1E293B] rounded">Order request</span>
              <span className="px-2 py-1 bg-[#131E2E] border border-[#1E293B] rounded">Manual confirmation</span>
              <span className="px-2 py-1 bg-[#131E2E] border border-[#1E293B] rounded">Invoice on request</span>
            </div>
          </div>
        </div>

        {/* 5-Column Navigation Grid matching captured layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <div className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Hosting</div>
            <ul className="space-y-2 text-xs">
              <li><a href="/pricing" className="hover:text-white transition">Web Hosting</a></li>
              <li><a href="/pricing" className="hover:text-white transition">WordPress Hosting</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Cloud Hosting</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Minecraft Hosting</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Business Hosting</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Agency Hosting</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3 text-xs uppercase tracking-wider">VPS & Cloud</div>
            <ul className="space-y-2 text-xs">
              <li><a href="/pricing" className="hover:text-white transition">KVM VPS Hosting</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Cloud VPS</a></li>
              <li><a href="/pricing" className="hover:text-white transition">CyberPanel VPS</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Minecraft VPS</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Node.js Hosting</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Docker Containers</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3 text-xs uppercase tracking-wider">AI & Agents</div>
            <ul className="space-y-2 text-xs">
              <li><a href="/agent" className="hover:text-white transition">Royal Nodes Agent Plus</a></li>
              <li><a href="/managed-openclaw" className="hover:text-white transition">Managed OpenClaw</a></li>
              <li><a href="/managed-hermes-agent" className="hover:text-white transition">Hermes Agent</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Self-hosted n8n</a></li>
              <li><a href="/pricing" className="hover:text-white transition">AI Website Builder</a></li>
              <li><a href="/pricing" className="hover:text-white transition">AI Visibility Checker</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Information</div>
            <ul className="space-y-2 text-xs">
              <li><a href="/reviews" className="hover:text-white transition">Customer Reviews</a></li>
              <li><a href="/discord" className="hover:text-white transition">Discord Community</a></li>
              <li><a href="/billing" className="hover:text-white transition">Billing & Invoices</a></li>
              <li><a href="/tickets" className="hover:text-white transition">Support Tickets</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Pricing Plans</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Changelog</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Roadmap</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Knowledge Base</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Tutorials</a></li>
              <li><a href="/pricing" className="hover:text-white transition">System Status</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Company & Legal</div>
            <ul className="space-y-2 text-xs">
              <li><a href="/pricing" className="hover:text-white transition">About Us</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Careers</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="/terms#privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="/terms#refunds" className="hover:text-white transition">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0">
          <div>
            © 2026 ROYAL NODES™ Cloud & Infrastructure Platform. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>30-Day Money-Back Guarantee</span>
            <span>•</span>
            <span>DDoS Protected</span>
            <span>•</span>
            <span>Free SSL Included</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
