import React from 'react';
import Link from 'next/link';
import { SCHEME_CATEGORIES } from '@/data/categories';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { BauhausCard } from '@/components/bauhaus/BauhausCard';
import {
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
  ArrowRight,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-8 h-8 stroke-[2.5]" />,
  Sprout: <Sprout className="w-8 h-8 stroke-[2.5]" />,
  Briefcase: <Briefcase className="w-8 h-8 stroke-[2.5]" />,
  HeartHandshake: <HeartHandshake className="w-8 h-8 stroke-[2.5]" />,
  Building2: <Building2 className="w-8 h-8 stroke-[2.5]" />,
  Home: <Home className="w-8 h-8 stroke-[2.5]" />,
  Activity: <Activity className="w-8 h-8 stroke-[2.5]" />,
  Clock: <Clock className="w-8 h-8 stroke-[2.5]" />,
  Accessibility: <Accessibility className="w-8 h-8 stroke-[2.5]" />,
  Users: <Users className="w-8 h-8 stroke-[2.5]" />,
  Coins: <Coins className="w-8 h-8 stroke-[2.5]" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8 stroke-[2.5]" />,
};

export default function CategoriesPage() {
  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Poster */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 mb-12 shadow-hard-lg">
          <span className="bg-[#1040C0] text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#121212]">
            STRUCTURED CITIZEN BENEFIT DOMAINS
          </span>
          <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-3">
            ALL 12 SCHEME CATEGORIES
          </h1>
          <p className="text-sm sm:text-base font-medium text-neutral-600 max-w-3xl leading-relaxed">
            Every Indian welfare program is organized into twelve fundamental human-need domains. Browse through education fellowships, agricultural subsidies, health covers, enterprise loans, and senior safety nets.
          </p>
        </div>

        {/* 12 Category Posters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SCHEME_CATEGORIES.map((cat, i) => {
            const bgClass = {
              red: 'bg-[#D02020] text-white',
              blue: 'bg-[#1040C0] text-white',
              yellow: 'bg-[#F0C020] text-[#121212]',
              white: 'bg-white text-[#121212]',
            }[cat.bgColor];

            return (
              <div
                key={cat.id}
                className={`border-4 border-[#121212] p-8 shadow-hard-md flex flex-col justify-between ${bgClass}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-white text-black border-3 border-black flex items-center justify-center shadow-[3px_3px_0_#121212]">
                      {ICON_MAP[cat.iconName]}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 bg-white text-black border-2 border-black">
                      {cat.schemeCount}+ SCHEMES
                    </span>
                  </div>

                  <h2 className="text-2xl font-black uppercase tracking-tight mb-3">
                    {cat.name}
                  </h2>
                  <p className="text-sm font-medium opacity-90 leading-relaxed mb-6">
                    {cat.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-current flex items-center justify-between">
                  <BauhausButton
                    href={`/categories/${cat.slug}`}
                    variant={cat.bgColor === 'white' ? 'red' : 'outline'}
                    size="sm"
                    icon={<ArrowRight className="w-4 h-4 stroke-[3]" />}
                    iconPosition="right"
                  >
                    EXPLORE SCHEMES
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
