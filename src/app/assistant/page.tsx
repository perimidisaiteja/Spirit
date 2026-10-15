'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SaathiChat } from '@/components/assistant/SaathiChat';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { Bot, Sparkles, ShieldCheck, ExternalLink, HelpCircle } from 'lucide-react';

function AssistantContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Poster */}
        <div className="bg-white border-4 border-[#121212] p-6 sm:p-10 mb-8 shadow-hard-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-[#1040C0] border border-black" />
                <span className="text-xs font-black uppercase tracking-widest text-[#1040C0]">
                  CONVERSATIONAL PUBLIC SERVICE DISCOVERY
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212]">
                SAATHI AI ASSISTANT
              </h1>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-2 max-w-2xl leading-relaxed">
                Describe your unique household circumstances in plain language. Saathi cross-checks verified eligibility rules, highlights disqualifying criteria, and provides official .gov.in links.
              </p>
            </div>

            <div className="p-4 bg-[#FFF9D6] border-2 border-black text-xs font-bold uppercase shrink-0 shadow-hard-sm">
              <div className="text-[10px] text-neutral-600 mb-0.5">STATUTORY INTEGRITY</div>
              <div className="text-[#D02020] font-black">Zero Hallucinations Policy</div>
              <div className="text-[10px] text-neutral-500 font-normal normal-case">Grounded in official Gazette rules only</div>
            </div>
          </div>
        </div>

        {/* Chat UI */}
        <div className="mb-10">
          <SaathiChat initialPrompt={initialQ} compact={false} />
        </div>

        {/* Trust & Citation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-3 border-black p-5 shadow-hard-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1040C0]" />
              HOW RETRIEVAL WORKS
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Saathi queries our structured PostgreSQL database of central and state gazettes to find verified matching programs before constructing answers.
            </p>
          </div>

          <div className="bg-white border-3 border-black p-5 shadow-hard-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4 text-[#D02020]" />
              OFFICIAL APPLICATION ONLY
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              We never process applications or collect payments. Saathi provides direct links to official government submission portals.
            </p>
          </div>

          <div className="bg-white border-3 border-black p-5 shadow-hard-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#F0C020]" />
              MULTILINGUAL QUERIES
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Feel free to ask questions in Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, Marathi, or English.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full bg-[#F0F0F0] py-20 flex items-center justify-center">
          <div className="bg-white border-4 border-black p-8 shadow-hard-md font-black uppercase text-sm">
            Initializing Saathi AI...
          </div>
        </div>
      }
    >
      <AssistantContent />
    </Suspense>
  );
}
