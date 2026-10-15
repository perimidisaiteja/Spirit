'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scheme } from '@/data/schemes';
import { BauhausCard, CornerShape } from '@/components/bauhaus/BauhausCard';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { toggleSaveScheme, getSavedSchemeIds, toggleComparison, getComparisonIds } from '@/lib/storage';
import { Bookmark, BookmarkCheck, ArrowRight, CheckCircle2, Scale, ExternalLink } from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
  cornerIndex?: number;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, cornerIndex = 0 }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);

  useEffect(() => {
    const updateStates = () => {
      setIsSaved(getSavedSchemeIds().includes(scheme.id));
      setIsInCompare(getComparisonIds().includes(scheme.id));
    };

    updateStates();
    window.addEventListener('jansaathi_storage_changed', updateStates);
    return () => window.removeEventListener('jansaathi_storage_changed', updateStates);
  }, [scheme.id]);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const state = toggleSaveScheme(scheme.id);
    setIsSaved(state);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = toggleComparison(scheme.id);
    if (!res.success && res.message) {
      alert(res.message);
    }
  };

  // Alternating Bauhaus corner geometry
  const shapes: CornerShape[] = ['square', 'circle', 'triangle'];
  const colors: Array<'red' | 'blue' | 'yellow'> = ['red', 'blue', 'yellow'];
  const shape = shapes[cornerIndex % shapes.length];
  const color = colors[cornerIndex % colors.length];

  return (
    <BauhausCard
      bgColor="white"
      borderWidth={4}
      shadowSize="md"
      cornerShape={shape}
      cornerColor={color}
      className="flex flex-col h-full p-5 md:p-6"
    >
      {/* Top Header: Level, Category, and Action Buttons */}
      <div className="flex items-center justify-between gap-2 mb-3 pr-6">
        <div className="flex flex-wrap items-center gap-1.5">
          <BauhausBadge variant={scheme.level === 'Central' ? 'central' : 'state'} size="sm">
            {scheme.level === 'Central' ? 'CENTRAL GOV' : scheme.stateName ? `${scheme.stateName.toUpperCase()}` : 'STATE GOV'}
          </BauhausBadge>
          <BauhausBadge variant="neutral" size="sm">
            {scheme.categoryName}
          </BauhausBadge>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleSave}
            title={isSaved ? 'Remove from Saved' : 'Save Scheme'}
            className={`p-1.5 border-2 border-[#121212] transition-colors select-none ${
              isSaved
                ? 'bg-[#D02020] text-white shadow-[2px_2px_0_#121212]'
                : 'bg-white text-[#121212] hover:bg-[#F0C020] shadow-[2px_2px_0_#121212]'
            }`}
            aria-label="Save scheme bookmark"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 stroke-[2.5]" /> : <Bookmark className="w-4 h-4 stroke-[2.5]" />}
          </button>

          {/* Compare Button */}
          <button
            type="button"
            onClick={handleCompare}
            title={isInCompare ? 'Remove from comparison' : 'Compare up to 3 schemes'}
            className={`p-1.5 border-2 border-[#121212] transition-colors select-none ${
              isInCompare
                ? 'bg-[#1040C0] text-white shadow-[2px_2px_0_#121212]'
                : 'bg-white text-[#121212] hover:bg-[#1040C0] hover:text-white shadow-[2px_2px_0_#121212]'
            }`}
            aria-label="Compare scheme"
          >
            <Scale className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Scheme Title & Ministry */}
      <div className="mb-4">
        <h3 className="text-xl md:text-2xl font-black uppercase text-[#121212] leading-tight line-clamp-2 hover:text-[#1040C0] transition-colors">
          <Link href={`/schemes/${scheme.slug}`}>
            {scheme.name}
          </Link>
        </h3>
        <p className="text-xs font-bold text-[#121212] opacity-75 uppercase tracking-wider mt-1">
          {scheme.ministry}
        </p>
      </div>

      {/* Prominent Benefit Amount Display Box */}
      <div className="bg-[#FFF9D6] border-2 border-[#121212] p-3 mb-4 shadow-[3px_3px_0_#121212]">
        <div className="text-[10px] font-black uppercase tracking-widest text-[#121212] opacity-75">
          KEY ASSISTANCE
        </div>
        <div className="text-base md:text-lg font-black text-[#D02020] uppercase leading-tight mt-0.5">
          {scheme.benefitAmountDisplay}
        </div>
      </div>

      {/* Short Description */}
      <p className="text-sm text-[#121212] line-clamp-3 mb-4 leading-relaxed flex-grow">
        {scheme.description}
      </p>

      {/* Eligibility Highlights */}
      <div className="border-t-2 border-[#121212] pt-3 mb-5 space-y-1.5">
        <div className="text-[11px] font-black uppercase tracking-wider text-[#121212] mb-1">
          ELIGIBILITY CRITERIA:
        </div>
        {scheme.eligibilitySummary.slice(0, 2).map((item, i) => (
          <div key={i} className="flex items-start gap-1.5 text-xs text-[#121212]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1040C0] shrink-0 mt-0.5 stroke-[3]" />
            <span className="line-clamp-1">{item}</span>
          </div>
        ))}
      </div>

      {/* Card Footer: Status & View Details Button */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t-2 border-[#121212]">
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-wider text-neutral-600">
            DEADLINE
          </span>
          <span className="text-xs font-black uppercase text-[#121212]">
            {scheme.deadline}
          </span>
        </div>

        <BauhausButton
          href={`/schemes/${scheme.slug}`}
          variant="red"
          size="sm"
          icon={<ArrowRight className="w-4 h-4 stroke-[3]" />}
          iconPosition="right"
        >
          DETAILS
        </BauhausButton>
      </div>
    </BauhausCard>
  );
};
