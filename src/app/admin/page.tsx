'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SCHEMES_DATABASE, Scheme } from '@/data/schemes';
import { OFFICIAL_SOURCES } from '@/data/sources';
import { getIssueReports, getMergedSchemes } from '@/lib/storage';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import {
  ShieldCheck,
  FileText,
  UploadCloud,
  AlertTriangle,
  Database,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Plus,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [schemes, setSchemes] = useState<Scheme[]>(SCHEMES_DATABASE);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    setSchemes(getMergedSchemes());
    setReports(getIssueReports());
  }, []);

  const verifiedCount = schemes.filter((s) => s.verificationStatus === 'Verified').length;
  const pendingCount = schemes.filter((s) => s.verificationStatus === 'Pending Review').length;

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Navigation Bar */}
        <div className="bg-[#121212] text-white border-4 border-black p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-hard-lg">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-[#D02020] border border-white" />
            <h1 className="text-xl font-black uppercase tracking-wider text-white">
              JANSAATHI ADMIN CONSOLE
            </h1>
            <span className="bg-[#F0C020] text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black">
              SUPERINTENDENT DESK
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase">
            <Link href="/admin" className="px-3 py-1.5 bg-[#D02020] text-white border border-white">
              Overview
            </Link>
            <Link href="/admin/schemes" className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600">
              Schemes
            </Link>
            <Link href="/admin/imports" className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600">
              Import
            </Link>
            <Link href="/admin/sources" className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600">
              Sources
            </Link>
            <Link href="/admin/reports" className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600">
              Reports ({reports.length})
            </Link>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border-4 border-[#121212] p-6 shadow-hard-md">
            <div className="text-xs font-black uppercase tracking-wider text-neutral-600">
              TOTAL CATALOGUED SCHEMES
            </div>
            <div className="text-4xl font-black text-[#1040C0] uppercase mt-2">
              {schemes.length}
            </div>
            <div className="mt-2 text-[11px] font-bold text-neutral-500 uppercase">
              {verifiedCount} Verified &bull; {pendingCount} Pending
            </div>
          </div>

          <div className="bg-white border-4 border-[#121212] p-6 shadow-hard-md">
            <div className="text-xs font-black uppercase tracking-wider text-neutral-600">
              OFFICIAL DATA SOURCES
            </div>
            <div className="text-4xl font-black text-[#121212] uppercase mt-2">
              {OFFICIAL_SOURCES.length}
            </div>
            <div className="mt-2 text-[11px] font-bold text-neutral-500 uppercase">
              100% Primary Gazette Authority
            </div>
          </div>

          <div className="bg-white border-4 border-[#121212] p-6 shadow-hard-md">
            <div className="text-xs font-black uppercase tracking-wider text-neutral-600">
              COMMUNITY CORRECTIONS
            </div>
            <div className="text-4xl font-black text-[#D02020] uppercase mt-2">
              {reports.length}
            </div>
            <div className="mt-2 text-[11px] font-bold text-neutral-500 uppercase">
              Citizen audit reports filed
            </div>
          </div>

          <div className="bg-white border-4 border-[#121212] p-6 shadow-hard-md">
            <div className="text-xs font-black uppercase tracking-wider text-neutral-600">
              SYSTEM STATUS
            </div>
            <div className="text-2xl font-black text-green-700 uppercase mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-6 h-6 stroke-[3]" /> OPERATIONAL
            </div>
            <div className="mt-2 text-[11px] font-bold text-neutral-500 uppercase">
              PostgreSQL & Full-text search
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-[#FFF9D6] border-4 border-black p-6 mb-10 shadow-hard-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-base uppercase text-black">
              ADMINISTRATIVE WORKFLOW SHORTCUTS
            </h3>
            <p className="text-xs text-neutral-700 font-medium">
              Create a new official scheme entry or bulk import verified gazette data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <BauhausButton href="/admin/schemes" variant="red" size="sm">
              <Plus className="w-4 h-4 mr-1 stroke-[3]" /> NEW SCHEME ENTRY
            </BauhausButton>
            <BauhausButton href="/admin/imports" variant="blue" size="sm">
              <UploadCloud className="w-4 h-4 mr-1 stroke-[3]" /> JSON / CSV IMPORT
            </BauhausButton>
          </div>
        </div>

        {/* Two-Column Section: Gazette Verification Queue & Recent Citizen Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Verification Queue (7 cols) */}
          <div className="lg:col-span-7 bg-white border-4 border-black p-6 shadow-hard-md">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
              <h2 className="text-base font-black uppercase tracking-wider text-black flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#1040C0]" />
                GAZETTE VERIFICATION QUEUE
              </h2>
              <Link href="/admin/schemes" className="text-xs font-black uppercase text-[#1040C0] hover:underline">
                Manage All &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {schemes.slice(0, 5).map((s) => (
                <div
                  key={s.id}
                  className="p-4 border-2 border-black bg-[#F8F8F8] flex items-center justify-between gap-3 shadow-[2px_2px_0_#121212]"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BauhausBadge variant={s.level === 'Central' ? 'central' : 'state'} size="sm">
                        {s.level}
                      </BauhausBadge>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase">
                        Verified: {s.lastVerifiedDate}
                      </span>
                    </div>
                    <div className="font-black text-xs uppercase text-black line-clamp-1">{s.name}</div>
                    <div className="text-[10px] font-bold text-[#D02020] uppercase">{s.benefitAmountDisplay}</div>
                  </div>

                  <Link
                    href={`/schemes/${s.slug}`}
                    className="p-1.5 bg-white border-2 border-black hover:bg-[#F0C020] text-xs font-black uppercase"
                    title="Inspect Public Listing"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Reports Queue (5 cols) */}
          <div className="lg:col-span-5 bg-white border-4 border-black p-6 shadow-hard-md">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
              <h2 className="text-base font-black uppercase tracking-wider text-black flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#D02020]" />
                CITIZEN CORRECTION REPORTS
              </h2>
              <Link href="/admin/reports" className="text-xs font-black uppercase text-[#D02020] hover:underline">
                View All &rarr;
              </Link>
            </div>

            {reports.length === 0 ? (
              <div className="p-8 text-center text-xs font-bold text-neutral-500 uppercase">
                No open community discrepancy reports.
              </div>
            ) : (
              <div className="space-y-3">
                {reports.slice(0, 4).map((r) => (
                  <div key={r.id} className="p-3 border-2 border-black bg-[#FFF9D6] text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black uppercase text-[#D02020]">{r.issueType}</span>
                      <span className="text-[10px] text-neutral-500 font-bold">{r.status}</span>
                    </div>
                    <div className="font-bold text-black uppercase mb-1">{r.schemeName}</div>
                    <p className="text-[11px] text-neutral-700 line-clamp-2 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
