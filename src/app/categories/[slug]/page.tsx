'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { SCHEME_CATEGORIES } from '@/data/categories';
import { SCHEMES_DATABASE } from '@/data/schemes';
import { SchemeCard } from '@/components/schemes/SchemeCard';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { ArrowLeft, Sparkles, Filter } from 'lucide-react';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = SCHEME_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Category Not Found</h1>
        <BauhausButton href="/categories" variant="red">
          Return to All Categories
        </BauhausButton>
      </div>
    );
  }

  const categorySchemes = SCHEMES_DATABASE.filter(
    (s) => s.categorySlug === slug || s.categoryId === category.id
  );

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-[#1040C0]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            &larr; BACK TO ALL CATEGORIES
          </Link>
        </div>

        {/* Category Hero Banner */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 mb-10 shadow-hard-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="bg-[#F0C020] text-black text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#121212]">
                CATEGORY DIRECTORY
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-2">
                {category.name}
              </h1>
              <p className="text-sm sm:text-base font-medium text-neutral-600 max-w-2xl leading-relaxed">
                {category.shortDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <BauhausButton href="/assistant" variant="blue" size="md">
                <Sparkles className="w-4 h-4 mr-1.5" /> ASK SAATHI FOR {category.name.toUpperCase()}
              </BauhausButton>
            </div>
          </div>
        </div>

        {/* Schemes Results */}
        <div className="mb-6 flex items-center justify-between border-b-4 border-black pb-3">
          <h2 className="text-xl font-black uppercase tracking-tight text-[#121212]">
            VERIFIED SCHEMES ({categorySchemes.length})
          </h2>
          <Link
            href={`/discover?category=${category.slug}`}
            className="text-xs font-black uppercase tracking-wider text-[#1040C0] hover:underline"
          >
            Filter within category &rarr;
          </Link>
        </div>

        {categorySchemes.length === 0 ? (
          <div className="bg-white border-4 border-black p-12 text-center shadow-hard-md">
            <h3 className="text-xl font-black uppercase mb-2">Schemes Ingesting</h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6">
              Our automated crawlers are verifying incoming gazette rules for this domain.
            </p>
            <BauhausButton href="/discover" variant="yellow">
              BROWSE ALL SCHEMES
            </BauhausButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorySchemes.map((scheme, i) => (
              <SchemeCard key={scheme.id} scheme={scheme} cornerIndex={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
