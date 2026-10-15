'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SCHEMES_DATABASE } from '@/data/schemes';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { Calendar, Clock, ExternalLink, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function DeadlinesPage() {
  const [filter, setFilter] = useState<'ALL' | 'Expiring' | 'Always Open'>('ALL');

  const filtered = SCHEMES_DATABASE.filter((s) => {
    if (filter === 'Always Open') return s.deadline === 'Always Open';
    if (filter === 'Expiring') return s.deadline !== 'Always Open';
    return true;
  });

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Poster */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-10 mb-8 shadow-hard-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-[#D02020] border border-black" />
                <span className="text-xs font-black uppercase tracking-widest text-[#D02020]">
                  APPLICATION SCHEDULE MONITOR
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212]">
                VERIFIED APPLICATION DEADLINES
              </h1>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-2 max-w-2xl leading-relaxed">
                Stay updated on scholarship enrollment windows, agricultural subsidy application cycles, and welfare portal closing dates verified from government notifications.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {(['ALL', 'Expiring', 'Always Open'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFilter(opt)}
                  className={`px-3 py-2 border-2 border-black text-xs font-black uppercase tracking-wider transition-colors shadow-hard-sm ${
                    filter === opt ? 'bg-[#1040C0] text-white' : 'bg-white text-black hover:bg-[#F0C020]'
                  }`}
                >
                  {opt === 'ALL' ? 'ALL SCHEDULES' : opt === 'Expiring' ? 'DATE-BOUND' : 'YEAR-ROUND (OPEN)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filtered.map((scheme) => {
            const isAlways = scheme.deadline === 'Always Open';

            return (
              <div
                key={scheme.id}
                className="bg-white border-3 md:border-4 border-[#121212] p-6 shadow-hard-sm hover:shadow-hard-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {/* Status Indicator Box */}
                  <div
                    className={`w-14 h-14 border-2 border-black flex flex-col items-center justify-center shrink-0 ${
                      isAlways ? 'bg-[#FFF9D6] text-black' : 'bg-[#D02020] text-white'
                    }`}
                  >
                    <Calendar className="w-5 h-5 mb-0.5 stroke-[2.5]" />
                    <span className="text-[9px] font-black uppercase">
                      {isAlways ? 'OPEN' : 'DATE'}
                    </span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <BauhausBadge variant={scheme.level === 'Central' ? 'central' : 'state'} size="sm">
                        {scheme.level}
                      </BauhausBadge>
                      <span className="text-xs font-bold uppercase text-neutral-600">
                        {scheme.ministry}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black uppercase text-black hover:text-[#1040C0]">
                      <Link href={`/schemes/${scheme.slug}`}>{scheme.name}</Link>
                    </h3>
                    <p className="text-xs font-bold text-[#D02020] uppercase mt-0.5">
                      Entitlement: {scheme.benefitAmountDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t-2 md:border-t-0 pt-3 md:pt-0 border-neutral-200 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">
                      OFFICIAL CLOSING
                    </span>
                    <span className="text-sm font-black uppercase text-black">
                      {scheme.deadline}
                    </span>
                  </div>

                  <BauhausButton href={`/schemes/${scheme.slug}`} variant="red" size="sm">
                    DETAILS <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </BauhausButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
