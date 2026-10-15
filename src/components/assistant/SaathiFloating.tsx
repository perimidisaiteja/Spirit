'use client';

import React, { useState } from 'react';
import { Bot, X, MessageSquare, Sparkles } from 'lucide-react';
import { SaathiChat } from './SaathiChat';

export const SaathiFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {isOpen ? (
        <div className="w-[92vw] sm:w-[460px] md:w-[520px] shadow-hard-xl">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 z-50 p-2 bg-[#D02020] text-white border-3 border-black shadow-hard-sm hover:bg-black transition-colors"
              aria-label="Close Saathi Chat"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </button>
            <SaathiChat compact={true} />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 px-4 py-3 bg-[#1040C0] text-white border-4 border-[#121212] shadow-hard-lg hover:-translate-y-1 hover:shadow-hard-xl transition-all"
          aria-label="Open Saathi AI Scheme Assistant"
        >
          {/* Geometric Icon cluster */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-[#D02020] border-2 border-black" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#F0C020] border-2 border-black" />
            <Bot className="w-5 h-5 text-white stroke-[2.5] relative z-10 drop-shadow-[1px_1px_0_#121212]" />
          </div>

          <div className="text-left">
            <div className="text-xs font-black uppercase tracking-widest text-[#F0C020] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#F0C020]" />
              ASK SAATHI AI
            </div>
            <div className="text-sm font-black uppercase tracking-wider text-white">
              SCHEME ASSISTANT
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
