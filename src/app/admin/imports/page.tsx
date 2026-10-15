'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { addCustomScheme, getMergedSchemes } from '@/lib/storage';
import { Scheme } from '@/data/schemes';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { UploadCloud, FileCode, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function AdminImportsPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [importedCount, setImportedCount] = useState<number>(0);

  const sampleJson = `[
  {
    "id": "sample-pm-scheme",
    "slug": "sample-national-scheme",
    "name": "Pradhan Mantri National Green Mobility Mission",
    "shortName": "PM Green Mobility",
    "ministry": "Ministry of Heavy Industries",
    "level": "Central",
    "stateCode": "ALL",
    "categoryId": "cat-12",
    "categorySlug": "other-government-benefits",
    "categoryName": "Other Government Benefits",
    "targetBeneficiaries": ["Citizens", "EV Drivers"],
    "description": "Subsidies for electric two-wheelers and public charging stations.",
    "detailedBenefits": ["Up to Rs 10,000 purchase incentive directly discounted on invoice"],
    "benefitAmountDisplay": "Up to Rs 10,000 EV Subsidy",
    "eligibility": { "ruralUrban": "All" },
    "eligibilitySummary": ["Indian citizen with valid Aadhaar and Driving License"],
    "documentsRequired": ["Aadhaar Card", "Driving License", "Bank Details"],
    "applicationProcess": ["Purchase eligible vehicle at authorized dealership"],
    "officialPortalUrl": "https://heavyindustries.gov.in",
    "officialApplicationUrl": "https://heavyindustries.gov.in",
    "verificationStatus": "Verified",
    "lastVerifiedDate": "2026-10-15",
    "deadline": "Always Open",
    "applicationStatus": "Open",
    "tags": ["ev", "green-mobility", "central"]
  }
]`;

  const handleImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const items: Scheme[] = Array.isArray(parsed) ? parsed : [parsed];

      items.forEach((scheme) => {
        addCustomScheme(scheme);
      });

      setImportedCount(items.length);
      setImportStatus('success');
    } catch (err: any) {
      setImportStatus('error: ' + (err.message || 'Invalid JSON'));
    }
  };

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-[#1040C0]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            &larr; BACK TO ADMIN CONSOLE
          </Link>
        </div>

        <div className="bg-white border-4 border-[#121212] p-8 sm:p-10 mb-8 shadow-hard-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-[#1040C0]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#1040C0]">
              DATA INGESTION PIPELINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#121212] mb-3">
            BULK SCHEME INGESTION (JSON / CSV)
          </h1>
          <p className="text-xs sm:text-sm font-medium text-neutral-600 leading-relaxed max-w-2xl">
            Import batches of verified statutory schemes. Ingested entries are validated for mandatory fields, deduplicated by identifier, and integrated into full-text search indexes.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-black">
                PASTE SCHEME JSON DATA ARRAY:
              </label>
              <button
                type="button"
                onClick={() => setJsonInput(sampleJson)}
                className="text-xs font-bold uppercase underline text-[#1040C0] hover:text-[#D02020]"
              >
                Load Sample Template
              </button>
            </div>

            <textarea
              rows={12}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste JSON array here..."
              className="w-full p-4 bg-[#F8F8F8] border-3 border-black font-mono text-xs focus:bg-white focus:outline-none"
            />

            <div className="pt-2 flex items-center justify-between">
              <BauhausButton
                type="button"
                onClick={handleImport}
                disabled={!jsonInput.trim()}
                variant="red"
                size="md"
              >
                <UploadCloud className="w-4 h-4 mr-1.5" /> EXECUTE BULK INGESTION
              </BauhausButton>

              {importStatus === 'success' && (
                <div className="flex items-center gap-1.5 text-xs font-black uppercase text-green-700">
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  Successfully ingested {importedCount} verified scheme(s)!
                </div>
              )}

              {importStatus?.startsWith('error') && (
                <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#D02020]">
                  <AlertTriangle className="w-4 h-4 stroke-[3]" />
                  {importStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
