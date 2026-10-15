import React from 'react';
import { OFFICIAL_SOURCES } from '@/data/sources';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { ShieldCheck, ExternalLink, Database, CheckCircle2, Lock, FileSearch } from 'lucide-react';

export default function DataSourcesPage() {
  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Poster */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 mb-10 shadow-hard-lg">
          <span className="bg-[#1040C0] text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#121212]">
            TRANSPARENCY & STATUTORY COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-3">
            OFFICIAL DATA SOURCES & VERIFICATION REGISTRY
          </h1>
          <p className="text-sm sm:text-base font-medium text-neutral-600 max-w-3xl leading-relaxed">
            JanSaathi AI enforces strict source-attribution. We prioritize primary Union and State Government gazettes, national discovery portals, and public service gateways. No fabricated or unverified claims are permitted in this catalog.
          </p>
        </div>

        {/* Verification Methodology Notice */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFF9D6] border-3 border-black p-6 shadow-hard-md">
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black mb-4">
              <Database className="w-5 h-5 text-[#1040C0]" />
            </div>
            <h3 className="font-black text-base uppercase mb-2">1. OFFICIAL GAZETTE GROUNDING</h3>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              Every scheme entry is verified against statutory ministry guidelines, government orders (G.O.), and gazette notifications.
            </p>
          </div>

          <div className="bg-white border-3 border-black p-6 shadow-hard-md">
            <div className="w-10 h-10 bg-[#D02020] text-white border-2 border-black flex items-center justify-center font-black mb-4">
              <FileSearch className="w-5 h-5" />
            </div>
            <h3 className="font-black text-base uppercase mb-2">2. REVISED REVENUE SCRUTINY</h3>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              Income thresholds and landholding rules are updated quarterly to prevent citizen disqualification during physical applications.
            </p>
          </div>

          <div className="bg-white border-3 border-black p-6 shadow-hard-md">
            <div className="w-10 h-10 bg-[#1040C0] text-white border-2 border-black flex items-center justify-center font-black mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-black text-base uppercase mb-2">3. DIRECT APPLICATION URLS</h3>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              We never act as intermediaries. All links navigate directly to authorized secure government domains ending in .gov.in and .nic.in.
            </p>
          </div>
        </div>

        {/* Sources Directory Table */}
        <div className="bg-white border-4 border-[#121212] p-6 sm:p-8 shadow-hard-lg mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6 flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-[#D02020]" />
            PRIMARY CATALOGUED PORTALS & AUTHORITIES
          </h2>

          <div className="space-y-6">
            {OFFICIAL_SOURCES.map((source) => (
              <div
                key={source.id}
                className="p-5 border-3 border-black bg-[#F8F8F8] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[2px_2px_0_#121212]"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-black uppercase px-2 py-0.5 bg-[#1040C0] text-white border border-black">
                      {source.type}
                    </span>
                    <span className="text-xs font-black uppercase px-2 py-0.5 bg-[#F0C020] text-black border border-black">
                      {source.verifiedStatus}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-bold">
                      Coverage: {source.coverage}
                    </span>
                  </div>

                  <h3 className="text-lg font-black uppercase text-black">
                    {source.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed font-medium">
                    {source.description}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-bauhaus text-xs px-4 py-2.5 bg-white text-black border-2 border-black hover:bg-[#F0C020] shadow-hard-sm"
                  >
                    ACCESS SOURCE <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buddy4Study Discovery Attribution */}
        <div className="bg-[#121212] text-white border-4 border-black p-8 shadow-hard-lg">
          <h3 className="text-xl font-black uppercase tracking-tight text-[#F0C020] mb-2">
            SUPPLEMENTARY SCHOLARSHIP DISCOVERY NOTICE
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium max-w-4xl">
            In compliance with open discovery standards, JanSaathi AI draws supplementary reference from Buddy4Study for cataloguing educational scholarships and corporate CSR grants. All legal eligibility clauses, income caps, and DBT mechanics are cross-verified with the National Scholarship Portal (NSP) and relevant State Higher Education Departments prior to publication.
          </p>
        </div>
      </div>
    </div>
  );
}
