'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { INDIAN_STATES } from '@/data/states';
import { SCHEMES_DATABASE } from '@/data/schemes';
import { SchemeCard } from '@/components/schemes/SchemeCard';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { ArrowLeft, ExternalLink, Sparkles, MapPin } from 'lucide-react';

export default function StateDetailPage() {
  const params = useParams();
  const stateCodeRaw = (params?.state as string)?.toUpperCase();

  const stateInfo = INDIAN_STATES.find(
    (s) => s.code.toUpperCase() === stateCodeRaw || s.name.toLowerCase() === (params?.state as string)?.toLowerCase()
  );

  if (!stateInfo) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">State Not Found</h1>
        <BauhausButton href="/states" variant="red">
          Return to States Directory
        </BauhausButton>
      </div>
    );
  }

  // Schemes applicable: schemes specifically for this state + central schemes applicable across all states
  const stateSpecificSchemes = SCHEMES_DATABASE.filter(
    (s) => s.level === 'State' && s.stateCode === stateInfo.code
  );

  const centralSchemes = SCHEMES_DATABASE.filter(
    (s) => s.level === 'Central' && s.stateCode === 'ALL'
  );

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/states"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-[#1040C0]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            &larr; BACK TO ALL STATES & UTS
          </Link>
        </div>

        {/* State Banner */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 mb-10 shadow-hard-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-[#F0C020] text-black font-black text-sm flex items-center justify-center border-2 border-black">
                  {stateInfo.code}
                </span>
                <span className="bg-[#D02020] text-white text-xs font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0_#121212]">
                  {stateInfo.type === 'State' ? 'STATE GOVERNMENT DIRECTORY' : 'UNION TERRITORY ADMINISTRATION'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-2">
                {stateInfo.name}
              </h1>
              <p className="text-xs sm:text-sm font-bold text-neutral-600 uppercase tracking-wider flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#D02020]" />
                Capital: {stateInfo.capital} &bull; Over {stateInfo.schemeCount}+ verified welfare initiatives
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={stateInfo.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bauhaus text-xs px-4 py-2.5 bg-white text-black border-2 md:border-3 border-black shadow-hard-sm hover:bg-[#F0C020]"
              >
                OFFICIAL PORTAL <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
              <BauhausButton href={`/assistant?q=Schemes in ${stateInfo.name}`} variant="blue" size="md">
                <Sparkles className="w-4 h-4 mr-1.5" /> ASK SAATHI FOR {stateInfo.code}
              </BauhausButton>
            </div>
          </div>
        </div>

        {/* State Specific Schemes Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
              EXCLUSIVE {stateInfo.name.toUpperCase()} STATE SCHEMES ({stateSpecificSchemes.length})
            </h2>
          </div>

          {stateSpecificSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateSpecificSchemes.map((scheme, i) => (
                <SchemeCard key={scheme.id} scheme={scheme} cornerIndex={i} />
              ))}
            </div>
          ) : (
            <div className="bg-white border-3 border-black p-8 text-center shadow-hard-sm">
              <p className="text-xs font-bold uppercase text-neutral-600">
                State-specific schemes for {stateInfo.name} are currently undergoing administrative gazette verification. Explore nationwide Central schemes applicable in {stateInfo.name} below.
              </p>
            </div>
          )}
        </div>

        {/* Central Schemes Applicable in this State */}
        <div>
          <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212]">
              CENTRAL GOVERNMENT SCHEMES APPLICABLE IN {stateInfo.name.toUpperCase()} ({centralSchemes.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centralSchemes.slice(0, 6).map((scheme, i) => (
              <SchemeCard key={scheme.id} scheme={scheme} cornerIndex={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
