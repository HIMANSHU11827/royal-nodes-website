import React from 'react';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

export const CartModal = ({ isOpen, items, onClose, onRemove, onCheckout }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0D1522] border border-[#1E293B] max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E293B]">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4 text-[#48B7FF]" />
            <h3 className="font-bold text-white text-sm">Your cart</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#1769FF]/20 text-[#48B7FF] border border-[#1769FF]/30">
              {items.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white" aria-label="Close cart">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="w-8 h-8 text-gray-600 mx-auto" />
              <p className="text-sm text-gray-400 mt-3">Your cart is empty.</p>
              <a href="/pricing" onClick={onClose} className="inline-block mt-4 text-xs font-bold text-[#48B7FF] hover:underline">
                Browse plans
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-[#1E293B] border border-[#1E293B]">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 p-3 bg-[#131E2E]">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">{item.name}</div>
                    <div className="text-[11px] text-gray-400">
                      ₹{item.price}/mo
                      {item.category ? ` · ${item.category}` : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-5 py-4 border-t border-[#1E293B] space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Monthly total</span>
            <span className="font-bold text-white">₹{total}/mo</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full py-3 bg-[#1769FF] hover:bg-[#0d5be6] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center space-x-2"
          >
            <span>Checkout ({items.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
