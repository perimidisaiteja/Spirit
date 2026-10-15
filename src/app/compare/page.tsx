'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SCHEMES_DATABASE, Scheme } from '@/data/schemes';
import { getComparisonIds, toggleComparison, getMergedSchemes } from '@/lib/storage';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { Scale, X, Plus, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ComparePage() {
  const [allSchemes, setAllSchemes] = useState<Scheme[]>(SCHEMES_DATABASE);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);

  useEffect(() => {
    setAllSchemes(getMergedSchemes());
    const update = () => {
      setCompareIds(getComparisonIds());
    };
    update();
    window.addEventListener('jansaathi_storage_changed', update);
    return () => window.removeEventListener('jansaathi_storage_changed', update);
  }, []);

  const comparedSchemes = allSchemes.filter((s) => compareIds.includes(s.id));

  const handleRemove = (id: string) => {
    toggleComparison(id);
  };

  const handleAdd = (id: string) => {
    toggleComparison(id);
    setAddDropdownOpen(false);
  };

  const availableToAdd = allSchemes.filter((s) => !compareIds.includes(s.id));

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Poster */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-10 mb-8 shadow-hard-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-[#1040C0] border border-black" />
                <span className="text-xs font-black uppercase tracking-widest text-[#1040C0]">
                  SIDE-BY-SIDE EVALUATION
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212]">
                COMPARE SCHEMES ({comparedSchemes.length}/3)
              </h1>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-2 max-w-2xl leading-relaxed">
                Compare benefits, eligibility ceilings, and document requirements across up to three central or state government welfare programs simultaneously.
              </p>
            </div>

            {compareIds.length < 3 && (
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setAddDropdownOpen(!addDropdownOpen)}
                  className="btn-bauhaus text-xs px-5 py-3 bg-[#F0C020] text-black border-3 border-black shadow-hard-sm hover:bg-[#d8ac1c]"
                >
                  <Plus className="w-4 h-4 mr-1.5 stroke-[3]" /> ADD SCHEME TO COMPARE
                </button>

                {addDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border-3 border-black shadow-hard-lg z-30 max-h-72 overflow-y-auto">
                    <div className="p-3 bg-[#F0F0F0] border-b-2 border-black text-xs font-black uppercase tracking-wider">
                      Select Scheme to Add:
                    </div>
                    {availableToAdd.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleAdd(s.id)}
                        className="w-full p-3 text-left border-b border-neutral-200 last:border-none hover:bg-[#FFF9D6] transition-colors"
                      >
                        <div className="font-black text-xs uppercase text-black line-clamp-1">{s.name}</div>
                        <div className="text-[10px] text-neutral-600 uppercase font-bold">{s.level} &bull; {s.benefitAmountDisplay}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {comparedSchemes.length === 0 ? (
          <div className="bg-white border-4 border-black p-12 text-center shadow-hard-md">
            <div className="w-16 h-16 bg-[#F0F0F0] border-3 border-black mx-auto mb-4 flex items-center justify-center">
              <Scale className="w-8 h-8 text-[#1040C0]" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-2">No Schemes Selected for Comparison</h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6">
              Browse our directory and click the scale/compare icon on any scheme to compare criteria side-by-side.
            </p>
            <BauhausButton href="/discover" variant="red">
              BROWSE SCHEMES DIRECTORY
            </BauhausButton>
          </div>
        ) : (
          /* Bauhaus Comparison Table */
          <div className="bg-white border-4 border-[#121212] shadow-hard-lg overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#121212] text-white border-b-4 border-black">
                  <th className="p-5 text-xs font-black uppercase tracking-wider border-r-2 border-neutral-700 w-1/4">
                    COMPARISON CRITERIA
                  </th>
                  {comparedSchemes.map((s) => (
                    <th key={s.id} className="p-5 border-r-2 border-neutral-700 last:border-r-0 align-top w-1/4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <BauhausBadge variant={s.level === 'Central' ? 'central' : 'state'} size="sm">
                          {s.level}
                        </BauhausBadge>
                        <button
                          type="button"
                          onClick={() => handleRemove(s.id)}
                          className="p-1 bg-white text-black hover:bg-[#D02020] hover:text-white border border-black shadow-[2px_2px_0_#FFF]"
                          title="Remove from comparison"
                          aria-label="Remove scheme from comparison"
                        >
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                      <Link href={`/schemes/${s.slug}`} className="font-black text-sm uppercase text-white hover:text-[#F0C020] block leading-snug">
                        {s.name}
                      </Link>
                    </th>
                  ))}
                  {Array.from({ length: 3 - comparedSchemes.length }).map((_, i) => (
                    <th key={`empty-${i}`} className="p-5 border-r-2 border-neutral-700 last:border-r-0 align-middle text-center bg-neutral-900 text-neutral-500">
                      <span className="text-xs uppercase font-bold tracking-wider">Empty Slot</span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y-2 divide-[#121212] text-xs font-bold text-black uppercase">
                {/* Row 1: Key Benefit */}
                <tr className="bg-[#FFF9D6]">
                  <td className="p-4 font-black border-r-2 border-[#121212] text-neutral-900">
                    KEY ASSISTANCE / BENEFIT
                  </td>
                  {comparedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-r-2 border-[#121212] text-[#D02020] font-black text-sm">
                      {s.benefitAmountDisplay}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedSchemes.length }).map((_, i) => (
                    <td key={`empty-val-${i}`} className="p-4 border-r-2 border-[#121212] bg-neutral-100" />
                  ))}
                </tr>

                {/* Row 2: Ministry / Dept */}
                <tr className="bg-white">
                  <td className="p-4 font-black border-r-2 border-[#121212] text-neutral-900">
                    DEPARTMENT / MINISTRY
                  </td>
                  {comparedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-r-2 border-[#121212] text-neutral-700">
                      {s.ministry}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedSchemes.length }).map((_, i) => (
                    <td key={`empty-val-${i}`} className="p-4 border-r-2 border-[#121212] bg-neutral-100" />
                  ))}
                </tr>

                {/* Row 3: Age Ceiling */}
                <tr className="bg-[#F8F8F8]">
                  <td className="p-4 font-black border-r-2 border-[#121212] text-neutral-900">
                    AGE ELIGIBILITY
                  </td>
                  {comparedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-r-2 border-[#121212]">
                      {s.eligibility.minAge !== undefined && s.eligibility.maxAge !== undefined
                        ? `${s.eligibility.minAge} to ${s.eligibility.maxAge} years`
                        : s.eligibility.minAge !== undefined
                        ? `Min ${s.eligibility.minAge} years`
                        : 'No specific age barrier'}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedSchemes.length }).map((_, i) => (
                    <td key={`empty-val-${i}`} className="p-4 border-r-2 border-[#121212] bg-neutral-100" />
                  ))}
                </tr>

                {/* Row 4: Maximum Income Ceiling */}
                <tr className="bg-white">
                  <td className="p-4 font-black border-r-2 border-[#121212] text-neutral-900">
                    ANNUAL INCOME LIMIT
                  </td>
                  {comparedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-r-2 border-[#121212]">
                      {s.eligibility.maxAnnualIncome
                        ? `Up to Rs ${s.eligibility.maxAnnualIncome.toLocaleString('en-IN')} / year`
                        : 'No income ceiling specified'}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedSchemes.length }).map((_, i) => (
                    <td key={`empty-val-${i}`} className="p-4 border-r-2 border-[#121212] bg-neutral-100" />
                  ))}
                </tr>

                {/* Row 5: Required Documents */}
                <tr className="bg-[#F8F8F8]">
                  <td className="p-4 font-black border-r-2 border-[#121212] text-neutral-900">
                    MANDATORY DOCUMENTS
                  </td>
                  {comparedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-r-2 border-[#121212]">
                      <ul className="space-y-1 list-disc list-inside">
                        {s.documentsRequired.slice(0, 3).map((d, idx) => (
                          <li key={idx} className="line-clamp-1">{d}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedSchemes.length }).map((_, i) => (
                    <td key={`empty-val-${i}`} className="p-4 border-r-2 border-[#121212] bg-neutral-100" />
                  ))}
                </tr>

                {/* Row 6: Official Application Actions */}
                <tr className="bg-white">
                  <td className="p-4 font-black border-r-2 border-[#121212] text-neutral-900">
                    APPLICATION ACTIONS
                  </td>
                  {comparedSchemes.map((s) => (
                    <td key={s.id} className="p-4 border-r-2 border-[#121212]">
                      <div className="space-y-2">
                        <Link
                          href={`/schemes/${s.slug}`}
                          className="btn-bauhaus text-[11px] px-3 py-1.5 bg-[#D02020] text-white border-2 border-black shadow-hard-sm block text-center"
                        >
                          View Details &rarr;
                        </Link>
                        <a
                          href={s.officialApplicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-black uppercase text-[#1040C0] hover:underline flex items-center gap-1 justify-center"
                        >
                          Official Portal <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedSchemes.length }).map((_, i) => (
                    <td key={`empty-val-${i}`} className="p-4 border-r-2 border-[#121212] bg-neutral-100" />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
