'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SCHEMES_DATABASE, Scheme } from '@/data/schemes';
import { getSavedSchemeIds, toggleSaveScheme, getMergedSchemes } from '@/lib/storage';
import { SchemeCard } from '@/components/schemes/SchemeCard';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { Bookmark, Trash2, ArrowRight, Printer } from 'lucide-react';

export default function SavedSchemesPage() {
  const [allSchemes, setAllSchemes] = useState<Scheme[]>(SCHEMES_DATABASE);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setAllSchemes(getMergedSchemes());
    const update = () => {
      setSavedIds(getSavedSchemeIds());
    };
    update();
    window.addEventListener('jansaathi_storage_changed', update);
    return () => window.removeEventListener('jansaathi_storage_changed', update);
  }, []);

  const savedSchemes = allSchemes.filter((s) => savedIds.includes(s.id));

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all saved schemes?')) {
      savedIds.forEach((id) => toggleSaveScheme(id));
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

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
                  PERSONAL BOOKMARKS & REMINDERS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212]">
                SAVED SCHEMES ({savedSchemes.length})
              </h1>
              <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-2 max-w-2xl leading-relaxed">
                Keep track of schemes you plan to apply for. Your bookmarks are preserved securely on your device for immediate offline reference.
              </p>
            </div>

            {savedSchemes.length > 0 && (
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn-bauhaus text-xs px-4 py-2.5 bg-white text-black border-2 md:border-3 border-black shadow-hard-sm hover:bg-[#F0C020]"
                >
                  <Printer className="w-4 h-4 mr-1.5" /> PRINT LIST
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="btn-bauhaus text-xs px-4 py-2.5 bg-white text-[#D02020] border-2 md:border-3 border-black shadow-hard-sm hover:bg-[#D02020] hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" /> CLEAR ALL
                </button>
              </div>
            )}
          </div>
        </div>

        {savedSchemes.length === 0 ? (
          <div className="bg-white border-4 border-black p-12 text-center shadow-hard-md">
            <div className="w-16 h-16 bg-[#FFF9D6] border-3 border-black mx-auto mb-4 flex items-center justify-center">
              <Bookmark className="w-8 h-8 text-[#D02020]" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-2">No Saved Schemes Yet</h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto mb-6">
              When exploring schemes, click the bookmark icon on any card to save it here for convenient follow-up.
            </p>
            <BauhausButton href="/discover" variant="red">
              EXPLORE SCHEMES DIRECTORY
            </BauhausButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedSchemes.map((scheme, i) => (
              <SchemeCard key={scheme.id} scheme={scheme} cornerIndex={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
