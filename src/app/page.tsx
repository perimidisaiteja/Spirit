'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { SCHEME_CATEGORIES } from '@/data/categories';
import { CITIZEN_SITUATIONS } from '@/data/situations';
import { INDIAN_STATES } from '@/data/states';
import { SCHEMES_DATABASE } from '@/data/schemes';
import { SchemeCard } from '@/components/schemes/SchemeCard';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { BauhausCard } from '@/components/bauhaus/BauhausCard';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { BauhausCircle, BauhausSquare, BauhausTriangle, SectionDivider } from '@/components/bauhaus/BauhausPrimitives';
import {
  Search,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Sprout,
  Briefcase,
  HeartHandshake,
  Building2,
  Home,
  Activity,
  Clock,
  Accessibility,
  Users,
  Coins,
  ShieldCheck,
  Hammer,
  Store,
  Scissors,
  Wallet,
  Sparkles,
  Layers,
  FileCheck2,
  Compass,
} from 'lucide-react';

// Icon map for categories
const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6 stroke-[2.5]" />,
  Sprout: <Sprout className="w-6 h-6 stroke-[2.5]" />,
  Briefcase: <Briefcase className="w-6 h-6 stroke-[2.5]" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 stroke-[2.5]" />,
  Building2: <Building2 className="w-6 h-6 stroke-[2.5]" />,
  Home: <Home className="w-6 h-6 stroke-[2.5]" />,
  Activity: <Activity className="w-6 h-6 stroke-[2.5]" />,
  Clock: <Clock className="w-6 h-6 stroke-[2.5]" />,
  Accessibility: <Accessibility className="w-6 h-6 stroke-[2.5]" />,
  Users: <Users className="w-6 h-6 stroke-[2.5]" />,
  Coins: <Coins className="w-6 h-6 stroke-[2.5]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 stroke-[2.5]" />,
  Hammer: <Hammer className="w-5 h-5 stroke-[2.5]" />,
  Search: <Search className="w-5 h-5 stroke-[2.5]" />,
  Store: <Store className="w-5 h-5 stroke-[2.5]" />,
  Scissors: <Scissors className="w-5 h-5 stroke-[2.5]" />,
  Wallet: <Wallet className="w-5 h-5 stroke-[2.5]" />,
};

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedSituations, setSelectedSituations] = useState<string[]>([]);
  const [selectedStateCode, setSelectedStateCode] = useState<string>('AP');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/discover?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push('/discover');
    }
  };

  const toggleSituation = (sitId: string) => {
    setSelectedSituations((prev) =>
      prev.includes(sitId) ? prev.filter((id) => id !== sitId) : [...prev, sitId]
    );
  };

  // Filter schemes for the state selection preview
  const stateSchemes = SCHEMES_DATABASE.filter(
    (s) => s.stateCode === selectedStateCode || s.level === 'Central'
  );

  return (
    <div className="flex flex-col w-full bg-[#F0F0F0]">
      {/* ========================================================
          1. HERO SECTION: Asymmetrical Two-Column Bauhaus Poster
         ======================================================== */}
      <section className="w-full border-b-4 border-[#121212] overflow-hidden bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Left Column: Bold Typography & Search (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-16 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-[#121212] bg-[#FFFFFF] relative">
            {/* Top decorative micro tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 bg-[#D02020] border border-black" />
              <span className="text-xs font-black uppercase tracking-widest text-[#121212]">
                DEMOCRATIZING PUBLIC BENEFIT DISCOVERY
              </span>
            </div>

            {/* Massive Display Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase text-[#121212] leading-[0.9] tracking-tight mb-6">
              GOVERNMENT <br />
              <span className="text-[#D02020] underline decoration-[#F0C020] decoration-wavy decoration-4">
                BENEFITS.
              </span>
              <br />
              FOR EVERY INDIAN.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#121212] font-medium leading-relaxed max-w-xl mb-8">
              {t('heroSub')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <BauhausButton href="/eligibility" variant="red" size="lg">
                {t('findMySchemes')}
              </BauhausButton>
              <BauhausButton href="/categories" variant="blue" size="lg">
                {t('exploreCategories')}
              </BauhausButton>
            </div>

            {/* Large Interactive Search Box */}
            <form onSubmit={handleHeroSearch} className="w-full max-w-xl">
              <div className="flex flex-col sm:flex-row gap-0 border-4 border-[#121212] shadow-hard-md bg-white">
                <div className="flex items-center px-3 text-[#121212] bg-white">
                  <Search className="w-6 h-6 stroke-[3]" />
                </div>
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Tell us what support you need... (e.g. tractor, scholarship, pension)"
                  className="w-full py-4 px-3 text-sm md:text-base font-bold text-[#121212] placeholder:text-neutral-500 bg-white focus:outline-none"
                  aria-label="Direct scheme search query"
                />
                <button
                  type="submit"
                  className="px-6 py-4 bg-[#F0C020] text-[#121212] font-black uppercase tracking-wider text-sm border-t-2 sm:border-t-0 sm:border-l-4 border-black hover:bg-[#d8ac1c] transition-colors shrink-0"
                >
                  SEARCH
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Bauhaus Blue Architectural Canvas & Diverse Citizen Collage (5 cols) */}
          <div className="lg:col-span-5 bg-[#1040C0] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden text-white min-h-[460px]">
            {/* Geometric SVG Composition Layer (Pure Bauhaus) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20%" cy="30%" r="120" stroke="#FFFFFF" strokeWidth="6" fill="none" />
                <rect x="50%" y="60%" width="180" height="180" stroke="#F0C020" strokeWidth="6" fill="none" />
                <polygon points="350,40 450,220 250,220" stroke="#D02020" strokeWidth="6" fill="none" />
              </svg>
            </div>

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="bg-[#F0C020] text-[#121212] text-xs font-black uppercase px-3 py-1 border-2 border-black shadow-hard-sm">
                INCLUSIVE SOCIAL ARCHITECTURE
              </span>
              <div className="flex gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#D02020] border-2 border-black" />
                <div className="w-4 h-4 bg-[#F0C020] border-2 border-black" />
                <div className="w-4 h-4 bg-white border-2 border-black" />
              </div>
            </div>

            {/* Citizen Avatars and Occupations Representation Grid */}
            <div className="relative z-10 my-8">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#F0C020] mb-3">
                BUILT FOR 1.4 BILLION LIVES
              </h2>
              <p className="text-xs sm:text-sm text-neutral-100 font-medium mb-6 leading-relaxed">
                Empowering farmers, college scholars, street vendors, women entrepreneurs, gig workers, senior citizens, and persons with disabilities across all 28 states & 8 UTs.
              </p>

              {/* Bauhaus Citizen Archetype Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs font-black uppercase text-black">
                <div className="p-2.5 bg-white border-2 border-black shadow-[3px_3px_0_#121212] flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D02020]" />
                  <span>Farmers & Agrico</span>
                </div>
                <div className="p-2.5 bg-[#F0C020] border-2 border-black shadow-[3px_3px_0_#121212] flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#1040C0]" />
                  <span>College Students</span>
                </div>
                <div className="p-2.5 bg-[#FFF9D6] border-2 border-black shadow-[3px_3px_0_#121212] flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#1040C0]" />
                  <span>Women In Business</span>
                </div>
                <div className="p-2.5 bg-white border-2 border-black shadow-[3px_3px_0_#121212] flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#D02020]" />
                  <span>Street Vendors</span>
                </div>
                <div className="p-2.5 bg-[#E0E0E0] border-2 border-black shadow-[3px_3px_0_#121212] flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F0C020]" />
                  <span>Senior Citizens</span>
                </div>
                <div className="p-2.5 bg-white border-2 border-black shadow-[3px_3px_0_#121212] flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#121212]" />
                  <span>Divyangjan (PwD)</span>
                </div>
              </div>
            </div>

            {/* Bottom Proof Quote Box */}
            <div className="relative z-10 p-4 bg-[#121212] border-3 border-black text-white shadow-hard-md">
              <div className="text-[10px] font-black uppercase tracking-widest text-[#F0C020] mb-1">
                PUBLIC SERVICE INTEGRITY
              </div>
              <p className="text-xs font-bold uppercase leading-snug">
                &ldquo;Every scheme detail is verified from Gazette notifications, MyScheme, and National Scholarship Portal. Zero sponsored ads.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. STATISTICS SECTION: Solid Yellow 4-Column Bauhaus
         ======================================================== */}
      <section className="w-full bg-[#F0C020] border-b-4 border-[#121212] py-8 sm:py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Stat 1 */}
            <div className="bg-white border-3 md:border-4 border-[#121212] p-5 shadow-hard-md flex flex-col justify-between">
              <div className="text-3xl sm:text-5xl font-black text-[#D02020] uppercase tracking-tight">
                1,450+
              </div>
              <div className="mt-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#121212]">
                Verified Catalogued Schemes
              </div>
              <div className="mt-1 text-[11px] font-medium text-neutral-600">
                Central & State initiatives
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white border-3 md:border-4 border-[#121212] p-5 shadow-hard-md flex flex-col justify-between">
              <div className="text-3xl sm:text-5xl font-black text-[#1040C0] uppercase tracking-tight">
                36
              </div>
              <div className="mt-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#121212]">
                States & Union Territories
              </div>
              <div className="mt-1 text-[11px] font-medium text-neutral-600">
                100% Nationwide coverage
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white border-3 md:border-4 border-[#121212] p-5 shadow-hard-md flex flex-col justify-between">
              <div className="text-3xl sm:text-5xl font-black text-[#121212] uppercase tracking-tight">
                12
              </div>
              <div className="mt-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#121212]">
                Citizen Need Categories
              </div>
              <div className="mt-1 text-[11px] font-medium text-neutral-600">
                Education to Agriculture & Pension
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white border-3 md:border-4 border-[#121212] p-5 shadow-hard-md flex flex-col justify-between">
              <div className="text-3xl sm:text-5xl font-black text-[#D02020] uppercase tracking-tight">
                8
              </div>
              <div className="mt-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#121212]">
                Official Indian Languages
              </div>
              <div className="mt-1 text-[11px] font-medium text-neutral-600">
                English, Hindi, Telugu, Tamil, etc.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. CITIZEN PROFILE SECTION: "START WITH YOUR SITUATION"
         ======================================================== */}
      <section className="w-full py-16 md:py-24 border-b-4 border-[#121212] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BauhausSquare color="blue" size={16} borderWidth={2} />
                <span className="text-xs font-black uppercase tracking-widest text-[#1040C0]">
                  DIRECT PERSONA MATCHING
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#121212] tracking-tight">
                {t('startWithSituation')}
              </h2>
            </div>
            <p className="text-sm font-medium text-neutral-600 max-w-md mt-4 md:mt-0">
              Select one or more profiles to filter schemes instantly. These shortcuts guide your search without assuming final legal eligibility.
            </p>
          </div>

          {/* 12 Interactive Situation Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CITIZEN_SITUATIONS.map((sit) => {
              const isSelected = selectedSituations.includes(sit.id);

              return (
                <button
                  key={sit.id}
                  type="button"
                  onClick={() => toggleSituation(sit.id)}
                  className={`
                    p-4 border-3 md:border-4 border-[#121212] text-left transition-all select-none flex items-center justify-between
                    ${
                      isSelected
                        ? 'bg-[#1040C0] text-white shadow-hard-md translate-x-1 translate-y-1'
                        : 'bg-white text-[#121212] shadow-hard-sm hover:bg-[#FFF9D6]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 border-2 border-black flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#F0C020] text-black' : 'bg-[#F0F0F0] text-[#121212]'
                      }`}
                    >
                      {ICON_MAP[sit.iconName] || <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <span className="font-black text-sm uppercase tracking-wide">
                      {sit.label}
                    </span>
                  </div>

                  <div
                    className={`w-5 h-5 border-2 border-black shrink-0 ml-2 flex items-center justify-center ${
                      isSelected ? 'bg-[#F0C020]' : 'bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 bg-black" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Action Bar when profiles selected */}
          {selectedSituations.length > 0 && (
            <div className="mt-8 p-4 bg-[#FFF9D6] border-3 border-black shadow-hard-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm font-black uppercase text-[#121212]">
                {selectedSituations.length} profile situation(s) active
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSituations([])}
                  className="text-xs font-bold uppercase underline hover:text-[#D02020]"
                >
                  Clear Selection
                </button>
                <BauhausButton
                  href={`/discover?situations=${selectedSituations.join(',')}`}
                  variant="red"
                  size="sm"
                >
                  VIEW MATCHING SCHEMES ({selectedSituations.length})
                </BauhausButton>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          4. CITIZEN DISCOVERY SECTION: 12 Category Posters
         ======================================================== */}
      <section className="w-full py-16 md:py-24 border-b-4 border-[#121212] bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BauhausTriangle color="red" size={16} borderWidth={2} />
                <span className="text-xs font-black uppercase tracking-widest text-[#D02020]">
                  COMPREHENSIVE SOCIAL DOMAINS
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#121212] tracking-tight">
                {t('whatSupportNeed')}
              </h2>
            </div>
            <Link
              href="/categories"
              className="mt-4 md:mt-0 font-black text-sm uppercase tracking-wider text-[#1040C0] hover:underline flex items-center gap-1"
            >
              All Categories &rarr;
            </Link>
          </div>

          {/* 12 Categories Grid in deliberate Bauhaus color alternation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SCHEME_CATEGORIES.map((cat, idx) => {
              const bgColors = {
                red: 'bg-[#D02020] text-white',
                blue: 'bg-[#1040C0] text-white',
                yellow: 'bg-[#F0C020] text-[#121212]',
                white: 'bg-white text-[#121212]',
              }[cat.bgColor];

              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className={`
                    group p-6 border-3 md:border-4 border-[#121212] shadow-hard-md hover:-translate-y-1 hover:shadow-hard-lg transition-all flex flex-col justify-between h-full relative select-none
                    ${bgColors}
                  `}
                >
                  {/* Top corner shape */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 border-2 border-black flex items-center justify-center bg-white text-black shadow-[2px_2px_0_#121212]">
                      {ICON_MAP[cat.iconName]}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 border border-black bg-white text-black">
                      {cat.schemeCount}+ SCHEMES
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="text-xl font-black uppercase leading-tight mb-2 group-hover:underline">
                      {cat.name}
                    </h3>
                    <p className="text-xs leading-relaxed opacity-90 line-clamp-3">
                      {cat.shortDesc}
                    </p>
                  </div>

                  {/* Bottom Explore Link */}
                  <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-black uppercase tracking-wider">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. GOVERNMENT COVERAGE SECTION: Split Central vs State
         ======================================================== */}
      <section className="w-full py-16 md:py-24 border-b-4 border-[#121212] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-3 h-3 bg-[#D02020]" />
              <span className="w-3 h-3 bg-[#1040C0]" />
              <span className="w-3 h-3 bg-[#F0C020]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#121212]">
                FEDERAL SCHEME ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#121212] tracking-tight">
              CENTRAL & STATE GOVERNANCE
            </h2>
            <p className="text-sm font-medium text-neutral-600 mt-2">
              Discover schemes launched directly by Central Union Ministries or explore localized schemes in any of India’s 28 States and 8 Union Territories.
            </p>
          </div>

          {/* Split Color Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Central Government Panel - Bauhaus Blue */}
            <div className="bg-[#1040C0] text-white border-4 border-[#121212] p-8 shadow-hard-lg flex flex-col justify-between">
              <div>
                <span className="bg-white text-black text-xs font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0_#121212]">
                  UNION GOVERNMENT OF INDIA
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-4 mb-2 text-white">
                  CENTRAL GOVERNMENT SCHEMES
                </h3>
                <p className="text-sm text-neutral-100 font-medium leading-relaxed mb-6">
                  Flagship nationwide DBT programs including PM-KISAN, Ayushman Bharat PM-JAY, PM Awas Yojana, PM Vishwakarma, and National Scholarships. Applicable across every Indian district.
                </p>
              </div>

              <div className="pt-4 border-t-2 border-white/50 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#F0C020]">
                  120+ NATIONWIDE PROGRAMS
                </span>
                <BauhausButton href="/discover?level=Central" variant="yellow" size="sm">
                  EXPLORE CENTRAL
                </BauhausButton>
              </div>
            </div>

            {/* State Government Panel - Bauhaus Red */}
            <div className="bg-[#D02020] text-white border-4 border-[#121212] p-8 shadow-hard-lg flex flex-col justify-between">
              <div>
                <span className="bg-white text-black text-xs font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0_#121212]">
                  REGIONAL WELFARE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-4 mb-2 text-white">
                  STATE & UNION TERRITORY SCHEMES
                </h3>
                <p className="text-sm text-neutral-100 font-medium leading-relaxed mb-6">
                  Targeted state assistance including Rythu Bharosa (Telangana), Talliki Vandanam (AP), Magalir Urimai (Tamil Nadu), Yuva Nidhi (Karnataka), and Ladki Bahin (Maharashtra).
                </p>
              </div>

              <div className="pt-4 border-t-2 border-white/50 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#F0C020]">
                  36 STATES & UNION TERRITORIES
                </span>
                <BauhausButton href="/states" variant="outline" size="sm">
                  BROWSE ALL STATES
                </BauhausButton>
              </div>
            </div>
          </div>

          {/* Interactive State Selector Strip */}
          <div className="bg-[#F0F0F0] border-4 border-[#121212] p-6 shadow-hard-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="font-black text-base uppercase text-[#121212]">
                SELECT A STATE TO PREVIEW LOCALIZED SCHEMES:
              </div>
              <select
                value={selectedStateCode}
                onChange={(e) => setSelectedStateCode(e.target.value)}
                className="px-4 py-2 bg-white border-3 border-black font-black text-xs sm:text-sm uppercase focus:outline-none"
                aria-label="Filter schemes by state"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Schemes Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t-2 border-black">
              {stateSchemes.slice(0, 3).map((sch, i) => (
                <SchemeCard key={sch.id} scheme={sch} cornerIndex={i} />
              ))}
            </div>

            <div className="text-center pt-6">
              <BauhausButton
                href={`/states/${selectedStateCode.toLowerCase()}`}
                variant="blue"
                size="md"
              >
                VIEW ALL SCHEMES FOR {INDIAN_STATES.find((s) => s.code === selectedStateCode)?.name.toUpperCase()} &rarr;
              </BauhausButton>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. BENEFITS & TRUST SECTION: Solid Red Background
         ======================================================== */}
      <section className="w-full bg-[#D02020] text-white border-b-4 border-[#121212] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-[#F0C020] text-black text-xs font-black uppercase px-3 py-1 border-2 border-black shadow-hard-sm">
              PUBLIC TRUST STANDARDS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-4 mb-3">
              DESIGNED FOR CITIZEN DIGNITY
            </h2>
            <p className="text-sm sm:text-base font-medium text-neutral-100">
              We eliminate administrative ambiguity by presenting legal eligibility criteria with complete source transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Trust Point 1 */}
            <div className="bg-white text-black p-6 border-3 md:border-4 border-black shadow-hard-md">
              <div className="w-8 h-8 rounded-full bg-[#F0C020] border-2 border-black flex items-center justify-center font-black mb-4">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3]" />
              </div>
              <h3 className="font-black text-lg uppercase mb-2">CLEAR ELIGIBILITY GUIDANCE</h3>
              <p className="text-xs leading-relaxed text-neutral-700 font-medium">
                We clearly spell out age thresholds, landholding rules, income limits, and required caste certificates before you apply.
              </p>
            </div>

            {/* Trust Point 2 */}
            <div className="bg-white text-black p-6 border-3 md:border-4 border-black shadow-hard-md">
              <div className="w-8 h-8 rounded-full bg-[#F0C020] border-2 border-black flex items-center justify-center font-black mb-4">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3]" />
              </div>
              <h3 className="font-black text-lg uppercase mb-2">OFFICIAL SOURCE ATTRIBUTION</h3>
              <p className="text-xs leading-relaxed text-neutral-700 font-medium">
                Every scheme links directly to authorized `.gov.in` and `.nic.in` portals such as MyScheme, PM-KISAN, and NSP.
              </p>
            </div>

            {/* Trust Point 3 */}
            <div className="bg-white text-black p-6 border-3 md:border-4 border-black shadow-hard-md">
              <div className="w-8 h-8 rounded-full bg-[#F0C020] border-2 border-black flex items-center justify-center font-black mb-4">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3]" />
              </div>
              <h3 className="font-black text-lg uppercase mb-2">STATE-SPECIFIC ACCURACY</h3>
              <p className="text-xs leading-relaxed text-neutral-700 font-medium">
                No false promises. Regional schemes are strictly categorized so citizens only see benefits relevant to their domicile state.
              </p>
            </div>

            {/* Trust Point 4 */}
            <div className="bg-white text-black p-6 border-3 md:border-4 border-black shadow-hard-md">
              <div className="w-8 h-8 rounded-full bg-[#F0C020] border-2 border-black flex items-center justify-center font-black mb-4">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3]" />
              </div>
              <h3 className="font-black text-lg uppercase mb-2">MULTILINGUAL ASSISTANCE</h3>
              <p className="text-xs leading-relaxed text-neutral-700 font-medium">
                Full visual and content support in English, Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, and Marathi scripts.
              </p>
            </div>

            {/* Trust Point 5 */}
            <div className="bg-white text-black p-6 border-3 md:border-4 border-black shadow-hard-md">
              <div className="w-8 h-8 rounded-full bg-[#F0C020] border-2 border-black flex items-center justify-center font-black mb-4">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3]" />
              </div>
              <h3 className="font-black text-lg uppercase mb-2">TRANSPARENT VERIFICATION DATES</h3>
              <p className="text-xs leading-relaxed text-neutral-700 font-medium">
                Every record carries a visible &ldquo;Last Verified Date&rdquo; indicating when administrators verified government gazette updates.
              </p>
            </div>

            {/* Trust Point 6 */}
            <div className="bg-white text-black p-6 border-3 md:border-4 border-black shadow-hard-md">
              <div className="w-8 h-8 rounded-full bg-[#F0C020] border-2 border-black flex items-center justify-center font-black mb-4">
                <CheckCircle2 className="w-5 h-5 text-black stroke-[3]" />
              </div>
              <h3 className="font-black text-lg uppercase mb-2">NO GUARANTEE OF APPROVAL</h3>
              <p className="text-xs leading-relaxed text-neutral-700 font-medium">
                We operate with absolute honesty. Matching indicates potential eligibility. Competent government officers make final approval determinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. HOW IT WORKS: Rotated Yellow Squares & Connecting Lines
         ======================================================== */}
      <section id="how-it-works" className="w-full py-16 md:py-24 border-b-4 border-[#121212] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BauhausCircle color="yellow" size={16} borderWidth={2} />
              <span className="text-xs font-black uppercase tracking-widest text-[#121212]">
                FOUR STEP DISCOVERY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#121212] tracking-tight">
              {t('howItWorksHeading')}
            </h2>
          </div>

          <div className="relative">
            {/* Black Connecting Line on Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[#121212] -translate-y-12 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="bg-white p-6 border-4 border-[#121212] shadow-hard-md flex flex-col items-center text-center">
                {/* Rotated yellow square with counter-rotated inner number */}
                <div className="w-16 h-16 bg-[#F0C020] border-3 border-black rotate-12 flex items-center justify-center mb-6 shadow-hard-sm">
                  <span className="-rotate-12 font-black text-2xl text-black">1</span>
                </div>
                <h3 className="font-black text-lg uppercase mb-2">{t('step1Title')}</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                  {t('step1Desc')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 border-4 border-[#121212] shadow-hard-md flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F0C020] border-3 border-black rotate-12 flex items-center justify-center mb-6 shadow-hard-sm">
                  <span className="-rotate-12 font-black text-2xl text-black">2</span>
                </div>
                <h3 className="font-black text-lg uppercase mb-2">{t('step2Title')}</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                  {t('step2Desc')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 border-4 border-[#121212] shadow-hard-md flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F0C020] border-3 border-black rotate-12 flex items-center justify-center mb-6 shadow-hard-sm">
                  <span className="-rotate-12 font-black text-2xl text-black">3</span>
                </div>
                <h3 className="font-black text-lg uppercase mb-2">{t('step3Title')}</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                  {t('step3Desc')}
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-6 border-4 border-[#121212] shadow-hard-md flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#F0C020] border-3 border-black rotate-12 flex items-center justify-center mb-6 shadow-hard-sm">
                  <span className="-rotate-12 font-black text-2xl text-black">4</span>
                </div>
                <h3 className="font-black text-lg uppercase mb-2">{t('step4Title')}</h3>
                <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                  {t('step4Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. FINAL CALL TO ACTION: Solid Yellow with Oversized Shapes
         ======================================================== */}
      <section className="w-full bg-[#F0C020] border-b-4 border-[#121212] py-20 relative overflow-hidden select-none">
        {/* Decorative oversized Bauhaus shapes at reduced opacity */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border-8 border-black opacity-10 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rotate-45 border-8 border-black opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="bg-[#121212] text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-hard-sm">
            EVERY CITIZEN. EVERY OPPORTUNITY.
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase text-[#121212] tracking-tight mt-6 mb-4 leading-none">
            YOUR NEXT OPPORTUNITY <br />
            STARTS HERE.
          </h2>
          <p className="text-sm sm:text-base font-bold text-neutral-800 max-w-xl mx-auto mb-8 uppercase tracking-wide">
            Take the 2-minute eligibility check or ask our AI assistant to find matching scholarships, farming incentives, and pensions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <BauhausButton href="/eligibility" variant="red" size="xl">
              FIND MY SCHEMES NOW
            </BauhausButton>
            <BauhausButton href="/assistant" variant="dark" size="xl">
              CHAT WITH SAATHI AI
            </BauhausButton>
          </div>
        </div>
      </section>
    </div>
  );
}
