'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SCHEMES_DATABASE } from '@/data/schemes';
import { saveIssueReport } from '@/lib/storage';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function ReportIssueContent() {
  const searchParams = useSearchParams();
  const defaultSchemeId = searchParams.get('schemeId') || '';
  const defaultSchemeName = searchParams.get('schemeName') || '';

  const [schemeId, setSchemeId] = useState(defaultSchemeId);
  const [issueType, setIssueType] = useState('Outdated Eligibility Criteria');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const matchedScheme = SCHEMES_DATABASE.find((s) => s.id === schemeId);

    saveIssueReport({
      schemeId,
      schemeName: matchedScheme ? matchedScheme.name : defaultSchemeName || 'General Directory Report',
      issueType,
      description,
      contactEmail,
    });

    setSubmitted(true);
  };

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-[#1040C0]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            &larr; BACK TO SCHEMES
          </Link>
        </div>

        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 shadow-hard-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-[#D02020]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#D02020]">
              COMMUNITY DATA AUDIT
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212] mb-3">
            REPORT SCHEME ISSUE OR CORRECTION
          </h1>
          <p className="text-xs sm:text-sm font-medium text-neutral-600 leading-relaxed mb-8">
            Help us maintain 100% accuracy for millions of Indian citizens. If an official gazette has revised an income limit, changed a deadline, or updated an application URL, report it here.
          </p>

          {submitted ? (
            <div className="p-6 bg-[#EAF8E6] border-3 border-black text-center space-y-4 shadow-hard-sm">
              <div className="w-12 h-12 bg-white border-2 border-black rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-700 stroke-[3]" />
              </div>
              <h3 className="text-xl font-black uppercase text-black">
                CORRECTION REPORT SUBMITTED
              </h3>
              <p className="text-xs font-medium text-neutral-700 max-w-md mx-auto">
                Thank you for contributing to public data accuracy. Our admin verification desk will cross-reference the official government gazette and update the catalog within 24 hours.
              </p>
              <div className="pt-2">
                <BauhausButton href="/discover" variant="red" size="sm">
                  CONTINUE BROWSING SCHEMES
                </BauhausButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  RELATED SCHEME (OPTIONAL)
                </label>
                <select
                  value={schemeId}
                  onChange={(e) => setSchemeId(e.target.value)}
                  className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-bold text-xs sm:text-sm uppercase focus:bg-white focus:outline-none"
                >
                  <option value="">General Platform Feedback / Unlisted Scheme</option>
                  {SCHEMES_DATABASE.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.level})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  NATURE OF CORRECTION / ISSUE *
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-bold text-xs sm:text-sm uppercase focus:bg-white focus:outline-none"
                >
                  <option value="Outdated Eligibility Criteria">Outdated Eligibility Criteria / Income Limit</option>
                  <option value="Broken Official Application URL">Broken or Changed Official Portal URL</option>
                  <option value="Revised Benefit Amount">Revised Financial or Subsidy Amount</option>
                  <option value="Application Deadline Passed or Extended">Application Deadline Passed or Extended</option>
                  <option value="New Government Scheme Not Catalogued">Suggest a New Central / State Scheme</option>
                  <option value="Other Discrepancy">Other Statutory Discrepancy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  DETAILED DESCRIPTION & OFFICIAL SOURCE LINK *
                </label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide the exact correction, citation, or paste the link to the official gazette / government notification order (e.g. Government Order G.O. Ms No. 42 dated 2026)..."
                  className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-medium text-xs sm:text-sm focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                  YOUR EMAIL (FOR VERIFICATION UPDATES - OPTIONAL)
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-medium text-xs sm:text-sm focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <BauhausButton type="submit" variant="red" size="lg" fullWidth>
                  SUBMIT CORRECTION FOR REVIEW
                </BauhausButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReportIssuePage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full bg-[#F0F0F0] py-20 flex items-center justify-center">
          <div className="bg-white border-4 border-black p-8 shadow-hard-md font-black uppercase text-sm">
            Loading Report Portal...
          </div>
        </div>
      }
    >
      <ReportIssueContent />
    </Suspense>
  );
}
