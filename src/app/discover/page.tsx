'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SCHEMES_DATABASE, Scheme } from '@/data/schemes';
import { SCHEME_CATEGORIES } from '@/data/categories';
import { INDIAN_STATES } from '@/data/states';
import { SchemeCard } from '@/components/schemes/SchemeCard';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { BauhausCard } from '@/components/bauhaus/BauhausCard';
import { getMergedSchemes } from '@/lib/storage';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'ALL';
  const initialLevel = searchParams.get('level') || 'ALL';
  const initialState = searchParams.get('state') || 'ALL';

  const [schemes, setSchemes] = useState<Scheme[]>(SCHEMES_DATABASE);
  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSchemes(getMergedSchemes());
  }, []);

  const filteredSchemes = useMemo(() => {
    return schemes
      .filter((s) => {
        // Search term
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const match =
            s.name.toLowerCase().includes(q) ||
            s.shortName.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q) ||
            s.ministry.toLowerCase().includes(q) ||
            s.tags.some((t) => t.toLowerCase().includes(q));
          if (!match) return false;
        }

        // Category filter
        if (selectedCategory !== 'ALL' && s.categorySlug !== selectedCategory && s.categoryId !== selectedCategory) {
          return false;
        }

        // Level filter
        if (selectedLevel !== 'ALL' && s.level !== selectedLevel) {
          return false;
        }

        // State filter
        if (selectedState !== 'ALL') {
          if (s.level === 'State' && s.stateCode !== selectedState) {
            return false;
          }
        }

        // Application status filter
        if (selectedStatus !== 'ALL' && s.applicationStatus !== selectedStatus) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return new Date(b.lastVerifiedDate).getTime() - new Date(a.lastVerifiedDate).getTime();
      });
  }, [schemes, searchTerm, selectedCategory, selectedLevel, selectedState, selectedStatus, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setSelectedLevel('ALL');
    setSelectedState('ALL');
    setSelectedStatus('ALL');
  };

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header Poster */}
        <div className="bg-white border-4 border-[#121212] p-6 sm:p-10 mb-8 shadow-hard-lg relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-[#D02020] border border-black" />
                <span className="text-xs font-black uppercase tracking-widest text-[#121212]">
                  CENTRAL & 36 STATE/UT SCHEMES
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212]">
                SCHEMES DIRECTORY
              </h1>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-2 max-w-2xl">
                Filter by citizen category, domicile state, or administrative level. All criteria are cross-checked against official gazettes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <BauhausButton href="/assistant" variant="blue" size="md">
                <Sparkles className="w-4 h-4 mr-1.5" /> ASK SAATHI AI
              </BauhausButton>
              <BauhausButton href="/eligibility" variant="red" size="md">
                ELIGIBILITY CHECK
              </BauhausButton>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row border-3 border-black shadow-hard-md bg-white">
              <div className="flex items-center px-4 bg-white text-black">
                <Search className="w-5 h-5 stroke-[3]" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by scheme name, keywords (e.g. farmer subsidy, sc scholarship, business loan, pension)..."
                className="w-full py-3.5 px-3 text-sm md:text-base font-bold text-black placeholder:text-neutral-500 focus:outline-none"
                aria-label="Filter schemes"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="px-4 text-xs font-black uppercase hover:bg-[#F0C020] border-l-2 border-black"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-white p-4 border-3 border-black shadow-hard-sm">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 font-black text-sm uppercase"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <span className="text-xs font-black uppercase text-[#D02020]">
              {filteredSchemes.length} Results
            </span>
          </div>

          {/* Sidebar Filters */}
          <div
            className={`
              lg:block space-y-6
              ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}
            `}
          >
            <div className="bg-white border-4 border-[#121212] p-5 shadow-hard-md space-y-6">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                <h3 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2">
                  <Filter className="w-4 h-4" /> FILTERS
                </h3>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[11px] font-bold uppercase underline text-[#D02020] hover:text-black flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Filter 1: Government Level */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  GOVERNMENT LEVEL
                </label>
                <div className="space-y-1.5 text-xs font-bold uppercase">
                  {['ALL', 'Central', 'State'].map((lvl) => (
                    <label
                      key={lvl}
                      className={`flex items-center justify-between p-2 border-2 border-black cursor-pointer transition-colors ${
                        selectedLevel === lvl ? 'bg-[#1040C0] text-white' : 'bg-white hover:bg-[#F0F0F0]'
                      }`}
                    >
                      <span>{lvl === 'ALL' ? 'All Levels' : `${lvl} Government`}</span>
                      <input
                        type="radio"
                        name="level"
                        checked={selectedLevel === lvl}
                        onChange={() => setSelectedLevel(lvl)}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter 2: Citizen Category */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  CITIZEN CATEGORY
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 bg-[#F0F0F0] border-2 border-black text-xs font-black uppercase focus:bg-white focus:outline-none"
                >
                  <option value="ALL">All 12 Categories</option>
                  {SCHEME_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter 3: Domicile State / UT */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  DOMICILE STATE / UT
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-2.5 bg-[#F0F0F0] border-2 border-black text-xs font-black uppercase focus:bg-white focus:outline-none"
                >
                  <option value="ALL">All States & UTs (Nationwide)</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name} ({st.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter 4: Application Status */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  APPLICATION STATUS
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2.5 bg-[#F0F0F0] border-2 border-black text-xs font-black uppercase focus:bg-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Open">Currently Open</option>
                  <option value="Always Open">Always Open (Year-Round)</option>
                  <option value="Upcoming">Upcoming Cycles</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Schemes Results Content (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Controls Bar: Total Count, Sort, Grid/List Toggle */}
            <div className="bg-white border-3 md:border-4 border-[#121212] p-4 shadow-hard-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm font-black uppercase text-[#121212]">
                SHOWING <span className="text-[#D02020]">{filteredSchemes.length}</span> VERIFIED SCHEMES
              </div>

              <div className="flex items-center gap-3">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs font-black uppercase">
                  <span>SORT:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
                    className="p-1.5 bg-[#F0F0F0] border-2 border-black text-xs font-bold uppercase focus:outline-none"
                  >
                    <option value="date">Latest Verified</option>
                    <option value="name">Alphabetical (A-Z)</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center border-2 border-black">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}
                    title="Grid View"
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 ${viewMode === 'list' ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}
                    title="List View"
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scheme Cards Display */}
            {filteredSchemes.length === 0 ? (
              <div className="bg-white border-4 border-black p-12 text-center shadow-hard-md">
                <div className="w-16 h-16 bg-[#FFF9D6] border-3 border-black mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-black uppercase mb-2">No Matching Schemes Found</h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6">
                  Try broadening your search keywords or resetting your state and category filters.
                </p>
                <BauhausButton onClick={resetFilters} variant="yellow" size="sm">
                  RESET ALL FILTERS
                </BauhausButton>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSchemes.map((scheme, i) => (
                  <SchemeCard key={scheme.id} scheme={scheme} cornerIndex={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSchemes.map((scheme, i) => (
                  <SchemeCard key={scheme.id} scheme={scheme} cornerIndex={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full bg-[#F0F0F0] py-20 flex items-center justify-center">
          <div className="bg-white border-4 border-black p-8 shadow-hard-md font-black uppercase text-sm">
            Loading Verified Directory...
          </div>
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}
