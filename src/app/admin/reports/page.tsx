'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getIssueReports } from '@/lib/storage';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    setReports(getIssueReports());
  }, []);

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
          <span className="bg-[#D02020] text-white text-xs font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0_#121212]">
            COMMUNITY AUDIT DESK
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#121212] mt-3">
            CITIZEN ISSUE & CORRECTION REPORTS ({reports.length})
          </h1>
          <p className="text-xs text-neutral-600 font-medium mt-1">
            Review user-submitted corrections regarding broken government URLs, updated income ceilings, and newly gazetted schemes.
          </p>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white border-4 border-black p-12 text-center shadow-hard-md">
            <div className="w-16 h-16 bg-[#FFF9D6] border-3 border-black mx-auto mb-4 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-700 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-black uppercase mb-2">Zero Open Discrepancies</h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto">
              All community-reported discrepancies have been investigated and resolved against official gazette notifications.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white border-3 md:border-4 border-black p-6 shadow-hard-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-neutral-200 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#D02020] text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                      {report.issueType}
                    </span>
                    <span className="text-xs font-bold text-neutral-500">
                      Filed: {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-xs font-black uppercase px-2.5 py-0.5 bg-[#FFF9D6] border border-black">
                    Status: {report.status}
                  </span>
                </div>

                <h3 className="text-lg font-black uppercase text-black mb-2">
                  Scheme: {report.schemeName}
                </h3>
                <p className="text-xs text-neutral-700 leading-relaxed font-medium bg-[#F8F8F8] p-3 border border-neutral-300 mb-3">
                  {report.description}
                </p>

                {report.contactEmail && (
                  <div className="text-[11px] font-bold text-neutral-500 uppercase">
                    Contact Email: {report.contactEmail}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
