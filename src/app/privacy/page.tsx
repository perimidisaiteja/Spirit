import React from 'react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 mb-8 shadow-hard-lg">
          <span className="bg-[#1040C0] text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#121212]">
            PRIVACY & DATA PROTECTION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-2">
            PRIVACY POLICY
          </h1>
          <p className="text-xs sm:text-sm font-medium text-neutral-600 leading-relaxed">
            Effective Date: October 15, 2026 &bull; Compliant with Digital Personal Data Protection (DPDP) Act.
          </p>
        </div>

        <div className="bg-white border-4 border-black p-8 shadow-hard-md space-y-6 text-sm text-neutral-800 leading-relaxed font-medium">
          <div>
            <h3 className="font-black text-lg uppercase text-black mb-2 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-[#D02020]" />
              1. ABSOLUTE ZERO FINANCIAL / BIOMETRIC DATA COLLECTION
            </h3>
            <p>
              JanSaathi AI explicitly never asks for, records, processes, or transmits:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 pl-2 text-black font-bold">
              <li>Aadhaar numbers or UIDAI biometric credentials.</li>
              <li>Bank account numbers, IFSC codes, credit/debit card numbers, or UPI PINs.</li>
              <li>One-Time Passwords (OTPs) or government login passwords.</li>
            </ul>
          </div>

          <div className="border-t-2 border-black pt-6">
            <h3 className="font-black text-lg uppercase text-black mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#1040C0]" />
              2. LOCAL BROWSER STORAGE FOR CITIZEN PREFERENCES
            </h3>
            <p>
              Your saved bookmarks, comparison items, and language preference are stored locally in your web browser (<code>localStorage</code>). We do not sell, track, or share your browsing habits with third-party advertising brokers.
            </p>
          </div>

          <div className="border-t-2 border-black pt-6">
            <h3 className="font-black text-lg uppercase text-black mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#F0C020]" />
              3. AI ASSISTANT CONVERSATION INTEGRITY
            </h3>
            <p>
              Conversations with Saathi AI are processed solely to retrieve and format scheme criteria. Queries are not used to train global generative AI foundation models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
