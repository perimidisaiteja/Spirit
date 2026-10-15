import React from 'react';
import Link from 'next/link';
import { BauhausLogo } from '@/components/bauhaus/BauhausLogo';
import { BauhausCircle, BauhausSquare, BauhausTriangle } from '@/components/bauhaus/BauhausPrimitives';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { ShieldCheck, Users, Eye, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Poster */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 mb-10 shadow-hard-lg">
          <span className="bg-[#D02020] text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#121212]">
            OUR ARCHITECTURAL PHILOSOPHY
          </span>
          <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-3">
            ABOUT JANSAATHI AI
          </h1>
          <p className="text-base sm:text-lg font-medium text-neutral-700 leading-relaxed max-w-3xl">
            JanSaathi AI is an India-wide public interest platform built to ensure that no citizen misses out on legitimate government entitlements due to administrative opacity, complex legal terminology, or digital exclusion.
          </p>
        </div>

        {/* The Bauhaus Design Foundation Section */}
        <div className="bg-[#1040C0] text-white border-4 border-black p-8 sm:p-10 mb-10 shadow-hard-lg">
          <div className="flex items-center gap-3 mb-4">
            <BauhausCircle color="red" size={24} borderWidth={2} />
            <BauhausSquare color="yellow" size={24} borderWidth={2} />
            <BauhausTriangle color="white" size={24} borderWidth={2} />
            <span className="text-xs font-black uppercase tracking-widest text-[#F0C020]">
              WHY WE EMBRACE THE BAUHAUS DESIGN SYSTEM
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">
            FORM FOLLOWS FUNCTION: HONEST DIGITAL PUBLIC SERVICE
          </h2>
          <div className="space-y-4 text-sm sm:text-base font-medium text-neutral-100 leading-relaxed max-w-3xl">
            <p>
              Traditional public service portals are cluttered with distracting banners, nested dropdowns, and confusing bureaucratic jargon. We rejected soft gradients, glassmorphism, and pastel templates in favor of the revolutionary Bauhaus ethos:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Geometric Clarity:</strong> Square corners, bold black framing, and primary colors (red, blue, yellow) provide unmistakable visual hierarchy for every screen size.</li>
              <li><strong>Tactile Authenticity:</strong> Hard black offset shadows evoke physical paper posters and official gazette leaflets.</li>
              <li><strong>Radical Transparency:</strong> Clear eligibility conditions, income thresholds, and direct links to authorized government portals without commercial intermediaries.</li>
            </ul>
          </div>
        </div>

        {/* Core Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border-4 border-black p-6 shadow-hard-md">
            <h3 className="font-black text-lg uppercase mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#D02020]" />
              INCLUSIVE CITIZEN DIGNITY
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              We design for everyone: smallholder farmers, construction workers, college scholars, women entrepreneurs, gig workers, and persons with disabilities across all 36 Indian States and Union Territories.
            </p>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-hard-md">
            <h3 className="font-black text-lg uppercase mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#1040C0]" />
              ZERO FABRICATION & PRIVACY FIRST
            </h3>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              We never fabricate scheme amounts or deadlines. We never collect Aadhaar numbers, biometric data, or bank OTPs. Your privacy is guaranteed by architectural design.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#F0C020] border-4 border-black p-8 text-center shadow-hard-md">
          <h3 className="text-2xl font-black uppercase text-black mb-3">
            START YOUR DISCOVERY JOURNEY TODAY
          </h3>
          <p className="text-xs font-bold uppercase tracking-wide text-neutral-800 max-w-md mx-auto mb-6">
            Explore 1,450+ verified Central and State programs in your mother tongue.
          </p>
          <div className="flex justify-center gap-4">
            <BauhausButton href="/discover" variant="red" size="md">
              DISCOVER SCHEMES
            </BauhausButton>
            <BauhausButton href="/assistant" variant="dark" size="md">
              TALK TO SAATHI AI
            </BauhausButton>
          </div>
        </div>
      </div>
    </div>
  );
}
