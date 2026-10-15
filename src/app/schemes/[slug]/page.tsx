'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { SCHEMES_DATABASE, Scheme } from '@/data/schemes';
import { getMergedSchemes, toggleSaveScheme, getSavedSchemeIds, toggleComparison, getComparisonIds } from '@/lib/storage';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { BauhausAccordion } from '@/components/bauhaus/BauhausAccordion';
import { BauhausCard } from '@/components/bauhaus/BauhausCard';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Scale,
  Share2,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Building,
  FileText,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';

export default function SchemeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [allSchemes, setAllSchemes] = useState<Scheme[]>(SCHEMES_DATABASE);
  const [isSaved, setIsSaved] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [checkedCriteria, setCheckedCriteria] = useState<number[]>([]);

  useEffect(() => {
    setAllSchemes(getMergedSchemes());
  }, []);

  const scheme = allSchemes.find((s) => s.slug === slug);

  useEffect(() => {
    if (!scheme) return;
    const update = () => {
      setIsSaved(getSavedSchemeIds().includes(scheme.id));
      setIsInCompare(getComparisonIds().includes(scheme.id));
    };
    update();
    window.addEventListener('jansaathi_storage_changed', update);
    return () => window.removeEventListener('jansaathi_storage_changed', update);
  }, [scheme]);

  if (!scheme) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Scheme Not Found</h1>
        <BauhausButton href="/discover" variant="red">
          Return to Schemes Directory
        </BauhausButton>
      </div>
    );
  }

  const handleSave = () => {
    const res = toggleSaveScheme(scheme.id);
    setIsSaved(res);
  };

  const handleCompare = () => {
    const res = toggleComparison(scheme.id);
    if (!res.success && res.message) {
      alert(res.message);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const toggleCheck = (idx: number) => {
    setCheckedCriteria((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const accordionItems = [
    {
      id: 'step-by-step',
      title: 'STEP-BY-STEP APPLICATION INSTRUCTIONS',
      defaultOpen: true,
      content: (
        <ol className="space-y-3 list-decimal list-inside font-bold text-black">
          {scheme.applicationProcess.map((step, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="font-medium text-neutral-800">{step}</span>
            </li>
          ))}
        </ol>
      ),
    },
    {
      id: 'required-documents',
      title: 'MANDATORY VERIFICATION DOCUMENTS',
      defaultOpen: false,
      content: (
        <div className="space-y-2">
          <p className="text-xs font-bold text-neutral-600 uppercase mb-3">
            Keep clear original scanned copies ready before accessing the government portal:
          </p>
          <ul className="space-y-2 font-bold text-black">
            {scheme.documentsRequired.map((doc, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#D02020] border border-black" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'disqualification-rules',
      title: 'COMMON REASONS FOR REJECTION & EXCLUSIONS',
      defaultOpen: false,
      content: (
        <div className="space-y-2 text-neutral-800">
          <p>
            Applicants are routinely disqualified during automated Aadhaar verification or field revenue scrutiny for:
          </p>
          <ul className="list-disc list-inside space-y-1 font-medium mt-2">
            <li>Bank account not seeded with Aadhaar on the NPCI direct benefit transfer mapper.</li>
            <li>Incomplete land mutation records or mismatch between Aadhaar name and land title.</li>
            <li>Household income exceeding the notified annual ceiling certificate.</li>
            <li>Simultaneous receipt of duplicate credit subsidies under conflicting central programs.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-[#1040C0]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            &larr; BACK TO SCHEMES DIRECTORY
          </Link>

          {/* Social Utility Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className={`px-3 py-2 border-2 border-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-hard-sm transition-colors ${
                isSaved ? 'bg-[#D02020] text-white' : 'bg-white hover:bg-[#F0C020]'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              {isSaved ? 'SAVED' : 'SAVE SCHEME'}
            </button>

            <button
              type="button"
              onClick={handleCompare}
              className={`px-3 py-2 border-2 border-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-hard-sm transition-colors ${
                isInCompare ? 'bg-[#1040C0] text-white' : 'bg-white hover:bg-[#1040C0] hover:text-white'
              }`}
            >
              <Scale className="w-4 h-4" />
              {isInCompare ? 'IN COMPARE' : 'COMPARE'}
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-2 border-2 border-black bg-white hover:bg-[#F0F0F0] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-hard-sm"
              title="Share Scheme"
            >
              <Share2 className="w-4 h-4" />
              {shareCopied ? 'COPIED LINK!' : 'SHARE'}
            </button>

            <Link
              href={`/report-issue?schemeId=${scheme.id}&schemeName=${encodeURIComponent(scheme.name)}`}
              className="px-3 py-2 border-2 border-black bg-white hover:bg-[#D02020] hover:text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-hard-sm text-neutral-700"
              title="Report an error in this scheme"
            >
              <AlertTriangle className="w-4 h-4" />
              REPORT
            </Link>
          </div>
        </div>

        {/* Hero Scheme Detail Card */}
        <div className="bg-white border-4 border-[#121212] p-6 sm:p-10 mb-8 shadow-hard-lg">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <BauhausBadge variant={scheme.level === 'Central' ? 'central' : 'state'} size="md">
              {scheme.level === 'Central' ? 'CENTRAL SECTOR SCHEME' : `${scheme.stateName?.toUpperCase()} STATE`}
            </BauhausBadge>
            <BauhausBadge variant="neutral" size="md">
              {scheme.categoryName}
            </BauhausBadge>
            <BauhausBadge variant="verified" size="md">
              VERIFIED: {scheme.lastVerifiedDate}
            </BauhausBadge>
            <BauhausBadge variant="open" size="md">
              {scheme.applicationStatus}
            </BauhausBadge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212] leading-tight mb-2">
            {scheme.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-neutral-600 uppercase tracking-wider mb-6">
            <span className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-[#D02020]" />
              {scheme.ministry}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#1040C0]" />
              Deadline: {scheme.deadline}
            </span>
          </div>

          {/* Prominent Bauhaus Financial Assistance Panel */}
          <div className="bg-[#FFF9D6] border-3 border-black p-6 mb-8 shadow-hard-md">
            <div className="text-xs font-black uppercase tracking-widest text-[#121212] opacity-80 mb-1">
              KEY VERIFIED BENEFIT / ENTITLEMENT
            </div>
            <div className="text-2xl sm:text-4xl font-black uppercase text-[#D02020] leading-tight">
              {scheme.benefitAmountDisplay}
            </div>
          </div>

          {/* Scheme Overview */}
          <div className="prose max-w-none text-base text-[#121212] leading-relaxed mb-8">
            <p className="font-medium">{scheme.description}</p>
          </div>

          {/* Verified Official Application Action Row */}
          <div className="p-6 bg-[#F0F0F0] border-3 border-black flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#1040C0]" />
                OFFICIAL GOVERNMENT APPLICATION PORTAL
              </div>
              <p className="text-xs text-neutral-600">
                You will be redirected directly to the verified secure government server ({new URL(scheme.officialPortalUrl).hostname}).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={scheme.officialApplicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bauhaus text-sm px-6 py-3 bg-[#D02020] text-white border-3 border-black shadow-hard-sm hover:bg-[#b01818]"
              >
                APPLY ON OFFICIAL PORTAL <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bauhaus text-xs px-4 py-3 bg-white text-black border-2 border-black shadow-hard-sm hover:bg-[#F0C020]"
              >
                PORTAL GUIDELINES
              </a>
            </div>
          </div>
        </div>

        {/* Content Layout: Left Details + Right Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Detailed Benefits & Instructions Accordion */}
          <div className="lg:col-span-8 space-y-8">
            {/* Detailed Benefits List */}
            <div className="bg-white border-4 border-[#121212] p-6 sm:p-8 shadow-hard-md">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#121212] mb-6 flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#D02020]" />
                COMPLETE BENEFIT BREAKDOWN
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {scheme.detailedBenefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-4 border-2 border-black bg-[#F8F8F8] flex items-start gap-3 shadow-[2px_2px_0_#121212]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#1040C0] shrink-0 mt-0.5 stroke-[3]" />
                    <span className="text-sm font-bold text-black leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accordions */}
            <div>
              <BauhausAccordion items={accordionItems} allowMultiple={true} />
            </div>
          </div>

          {/* Right Column (4 cols): Interactive Self-Checklist & Quick Assistant */}
          <div className="lg:col-span-4 space-y-6">
            {/* Self-Assessment Eligibility Checklist */}
            <div className="bg-white border-4 border-[#121212] p-6 shadow-hard-md">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-black">
                  ELIGIBILITY CHECKLIST
                </h3>
                <span className="text-xs font-black px-2 py-0.5 bg-[#F0C020] border border-black">
                  {checkedCriteria.length} / {scheme.eligibilitySummary.length}
                </span>
              </div>

              <p className="text-xs text-neutral-600 mb-4 leading-relaxed font-medium">
                Check off conditions you satisfy to verify your fit before filling government forms:
              </p>

              <div className="space-y-3">
                {scheme.eligibilitySummary.map((crit, idx) => {
                  const isChecked = checkedCriteria.includes(idx);

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleCheck(idx)}
                      className={`w-full text-left p-3 border-2 border-black flex items-start gap-2.5 transition-colors select-none ${
                        isChecked ? 'bg-[#FFF9D6] border-black shadow-[2px_2px_0_#121212]' : 'bg-white hover:bg-[#F0F0F0]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 border-2 border-black shrink-0 mt-0.5 flex items-center justify-center ${
                          isChecked ? 'bg-[#D02020] text-white' : 'bg-white'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold text-black leading-snug">
                        {crit}
                      </span>
                    </button>
                  );
                })}
              </div>

              {checkedCriteria.length === scheme.eligibilitySummary.length && (
                <div className="mt-4 p-3 bg-[#EAF8E6] border-2 border-[#121212] text-xs font-bold text-neutral-900 leading-snug flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 stroke-[3]" />
                  <span>You appear to satisfy all core eligibility conditions!</span>
                </div>
              )}
            </div>

            {/* Supplementary Attribution Box */}
            <div className="bg-white border-3 border-black p-5 shadow-hard-sm text-xs text-neutral-700 space-y-3">
              <div className="font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#1040C0]" />
                DATA SOURCE TRANSPARENCY
              </div>
              <p className="leading-relaxed">
                Rules for this scheme were last audited by JanSaathi verifiers on <strong>{scheme.lastVerifiedDate}</strong> against the official portal guidelines of {scheme.ministry}.
              </p>
              {scheme.supplementaryUrl && (
                <a
                  href={scheme.supplementaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1040C0] font-black uppercase underline flex items-center gap-1"
                >
                  View Supplementary Verification Source &rarr;
                </a>
              )}
            </div>

            {/* Quick Ask AI Widget */}
            <div className="bg-[#1040C0] text-white border-4 border-black p-6 shadow-hard-md">
              <div className="text-xs font-black uppercase tracking-widest text-[#F0C020] mb-1">
                NEED CLARIFICATION?
              </div>
              <h4 className="text-lg font-black uppercase text-white mb-2">
                ASK SAATHI ABOUT THIS SCHEME
              </h4>
              <p className="text-xs text-neutral-200 mb-4 leading-relaxed font-medium">
                Our conversational assistant can answer questions regarding specific family criteria or missing certificates.
              </p>
              <BauhausButton
                href={`/assistant?q=Explain eligibility and requirements for ${scheme.name}`}
                variant="yellow"
                size="sm"
                fullWidth
              >
                ASK SAATHI NOW
              </BauhausButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
