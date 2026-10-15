'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INDIAN_STATES } from '@/data/states';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { Search, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

export default function StatesPage() {
  const [filterType, setFilterType] = useState<'ALL' | 'State' | 'UT'>('ALL');
  const [searchState, setSearchState] = useState('');

  const filtered = INDIAN_STATES.filter((st) => {
    if (filterType !== 'ALL' && st.type !== filterType) return false;
    if (searchState.trim()) {
      const q = searchState.toLowerCase();
      return st.name.toLowerCase().includes(q) || st.code.toLowerCase().includes(q) || st.capital.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Poster */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 mb-10 shadow-hard-lg">
          <span className="bg-[#D02020] text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#121212]">
            FEDERAL WELFARE DISTRIBUTION
          </span>
          <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-3">
            ALL 28 STATES & 8 UNION TERRITORIES
          </h1>
          <p className="text-sm sm:text-base font-medium text-neutral-600 max-w-3xl leading-relaxed mb-8">
            Every Indian State and Union Territory maintains specialized citizen welfare departments alongside Central DBT programs. Select your state of residence to explore verified state benefits.
          </p>

          {/* Search & Type Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex border-3 border-black bg-white shadow-hard-sm">
              <div className="p-3 bg-white text-black flex items-center">
                <Search className="w-5 h-5 stroke-[3]" />
              </div>
              <input
                type="text"
                value={searchState}
                onChange={(e) => setSearchState(e.target.value)}
                placeholder="Search state, union territory, or capital (e.g. Telangana, Amaravati, Delhi)..."
                className="w-full p-3 font-bold text-xs sm:text-sm uppercase focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              {(['ALL', 'State', 'UT'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilterType(t)}
                  className={`px-4 py-3 border-3 border-black text-xs font-black uppercase tracking-wider transition-colors shadow-hard-sm ${
                    filterType === t ? 'bg-[#1040C0] text-white' : 'bg-white text-black hover:bg-[#F0C020]'
                  }`}
                >
                  {t === 'ALL' ? 'ALL 36 JURISDICTIONS' : t === 'State' ? '28 STATES' : '8 UNION TERRITORIES'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((state) => (
            <Link
              key={state.code}
              href={`/states/${state.code.toLowerCase()}`}
              className="group bg-white border-3 md:border-4 border-[#121212] p-5 shadow-hard-sm hover:-translate-y-1 hover:shadow-hard-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 border-2 border-black bg-[#F0C020] text-black font-black text-sm flex items-center justify-center shadow-[2px_2px_0_#121212]">
                    {state.code}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border border-black bg-[#F0F0F0]">
                    {state.type}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase text-black group-hover:text-[#1040C0] transition-colors leading-tight mb-1">
                  {state.name}
                </h3>
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-1 mb-4">
                  <MapPin className="w-3.5 h-3.5" /> Capital: {state.capital}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-black uppercase">
                <span className="text-[#D02020]">{state.schemeCount}+ SCHEMES</span>
                <span className="flex items-center gap-1 text-[#1040C0] group-hover:translate-x-1 transition-transform">
                  EXPLORE &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
