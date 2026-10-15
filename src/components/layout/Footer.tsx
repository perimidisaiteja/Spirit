import React from 'react';
import Link from 'next/link';
import { BauhausLogo } from '@/components/bauhaus/BauhausLogo';
import { BauhausCircle, BauhausSquare, BauhausTriangle } from '@/components/bauhaus/BauhausPrimitives';
import { ExternalLink, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121212] text-white border-t-4 border-black relative overflow-hidden">
      {/* Decorative Bauhaus Top Accents */}
      <div className="flex w-full h-2">
        <div className="w-1/3 bg-[#D02020]" />
        <div className="w-1/3 bg-[#1040C0]" />
        <div className="w-1/3 bg-[#F0C020]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-3 inline-block border-2 border-black shadow-[4px_4px_0_#D02020]">
              <BauhausLogo size="md" showTagline={true} />
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-md pt-2">
              An inclusive, non-partisan India-wide government scheme discovery platform designed under Bauhaus architectural principles. Empowering every citizen with verified information, transparent eligibility rules, and direct links to official government portals.
            </p>

            {/* Geometric Accent Row */}
            <div className="flex items-center gap-3 pt-2">
              <BauhausCircle color="red" size={24} borderWidth={2} />
              <BauhausSquare color="blue" size={24} borderWidth={2} />
              <BauhausTriangle color="yellow" size={24} borderWidth={2} />
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                Geometric Clarity • Zero Deception
              </span>
            </div>
          </div>

          {/* Col 1: Discovery Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F0C020] mb-4 border-b-2 border-neutral-700 pb-1">
              SCHEME DISCOVERY
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
              <li>
                <Link href="/discover" className="hover:text-white hover:underline flex items-center gap-1">
                  All Schemes Directory
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white hover:underline">
                  12 Citizen Categories
                </Link>
              </li>
              <li>
                <Link href="/states" className="hover:text-white hover:underline">
                  28 States & 8 UTs
                </Link>
              </li>
              <li>
                <Link href="/eligibility" className="hover:text-white hover:underline text-[#F0C020]">
                  Eligibility Assessment
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-white hover:underline">
                  Saathi AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/deadlines" className="hover:text-white hover:underline">
                  Application Deadlines
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white hover:underline">
                  Compare Schemes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Official Sources */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F0C020] mb-4 border-b-2 border-neutral-700 pb-1">
              OFFICIAL SOURCES
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
              <li>
                <a href="https://www.myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  MyScheme.gov.in <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  National Scholarship (NSP) <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a href="https://services.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  Services.India.gov.in <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  PM-KISAN Portal <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a href="https://pmjay.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  Ayushman PM-JAY <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <Link href="/data-sources" className="hover:text-[#F0C020] underline text-[11px] block pt-1">
                  Data Verification Policy &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F0C020] mb-4 border-b-2 border-neutral-700 pb-1">
              GOVERNANCE & TRUST
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
              <li>
                <Link href="/about" className="hover:text-white hover:underline">
                  About JanSaathi AI
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-white hover:underline">
                  WCAG 2.2 AA Accessibility
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white hover:underline">
                  Privacy & Data Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline">
                  Terms of Public Service
                </Link>
              </li>
              <li>
                <Link href="/report-issue" className="hover:text-[#D02020] hover:underline flex items-center gap-1 font-black">
                  Report Scheme Issue / Update
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-neutral-400 text-[11px] pt-1 block">
                  Officer Administration
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 p-4 bg-[#1f1f1f] border-2 border-neutral-700 text-xs text-neutral-400 leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#F0C020] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white uppercase font-bold tracking-wider">Independent Public Discovery Notice: </strong>
            JanSaathi AI is an independent, non-commercial public interest software system designed to simplify citizen awareness. JanSaathi AI is not affiliated with, authorized by, or an official representative of the Government of India or any State Government. We do not charge fees, collect sensitive financial/biometric identifiers, or guarantee application approval. Always submit official applications through authorized .gov.in or .nic.in portals.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-bold uppercase tracking-wider gap-4">
          <div>
            &copy; {new Date().getFullYear()} JANSAATHI AI • EVERY CITIZEN. EVERY OPPORTUNITY.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with Bauhaus Principles</span>
            <span>•</span>
            <span>Next.js • Supabase • Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
