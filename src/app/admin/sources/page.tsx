'use client';

import React from 'react';
import Link from 'next/link';
import { OFFICIAL_SOURCES } from '@/data/sources';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { ArrowLeft, ExternalLink, ShieldCheck, Plus } from 'lucide-react';

export default function AdminSourcesPage() {
  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-[#1040C0]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            &larr; BACK TO ADMIN CONSOLE
          </Link>
        </div>

        <div className="bg-white border-4 border-[#121212] p-8 mb-8 shadow-hard-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-[#1040C0] text-white text-xs font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0_#121212]">
                STATUTORY REPOSITORIES
              </span>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#121212] mt-3">
                OFFICIAL SOURCE REGISTRY ({OFFICIAL_SOURCES.length})
              </h1>
              <p className="text-xs text-neutral-600 font-medium mt-1">
                Authorized government portals, gazette feeds, and supplementary discovery sources monitored by our crawlers.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {OFFICIAL_SOURCES.map((source) => (
            <div
              key={source.id}
              className="bg-white border-3 md:border-4 border-black p-6 shadow-hard-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <BauhausBadge variant="blue" size="sm">{source.type}</BauhausBadge>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#FFF9D6] border border-black">
                    {source.verifiedStatus}
                  </span>
                  <span className="text-xs text-neutral-500 font-bold">
                    Last Synced: {source.lastSync}
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase text-black">{source.name}</h3>
                <p className="text-xs text-neutral-600 font-medium mt-1 max-w-2xl">{source.description}</p>
                <div className="mt-2 text-[11px] font-bold text-[#1040C0] uppercase">
                  Coverage: {source.coverage}
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bauhaus text-xs px-4 py-2.5 bg-white text-black border-2 border-black hover:bg-[#F0C020] shadow-hard-sm"
                >
                  VISIT PORTAL <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
