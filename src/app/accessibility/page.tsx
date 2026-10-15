import React from 'react';
import Link from 'next/link';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { CheckCircle2, Eye, Keyboard, Volume2 } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 mb-8 shadow-hard-lg">
          <div className="flex items-center gap-2 mb-2">
            <BauhausBadge variant="verified" size="sm">WCAG 2.2 AA CONFORMANCE</BauhausBadge>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212]">
            ACCESSIBILITY STATEMENT
          </h1>
          <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-2 leading-relaxed">
            JanSaathi AI is committed to ensuring full digital inclusion for all citizens, including persons with visual, auditory, cognitive, or physical impairments.
          </p>
        </div>

        <div className="bg-white border-4 border-black p-8 shadow-hard-md space-y-6 text-sm text-neutral-800 leading-relaxed">
          <div>
            <h3 className="font-black text-lg uppercase text-black mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#1040C0]" />
              HIGH CONTRAST & VISUAL STANDARDS
            </h3>
            <p className="font-medium">
              Our Bauhaus palette enforces high contrast ratios exceeding the WCAG 2.2 AA minimum requirement of 4.5:1. Primary black borders (#121212) against #FFFFFF and #F0F0F0 backgrounds ensure crisp readability without blurred edges.
            </p>
          </div>

          <div className="border-t-2 border-black pt-6">
            <h3 className="font-black text-lg uppercase text-black mb-2 flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-[#D02020]" />
              KEYBOARD NAVIGATION & FOCUS INDICATORS
            </h3>
            <p className="font-medium">
              Every interactive element, filter, button, and accordion is fully operable using keyboard navigation alone (Tab, Shift+Tab, Enter, Space). Visible 4px solid Bauhaus blue focus outlines ensure that keyboard users always know their active control point.
            </p>
          </div>

          <div className="border-t-2 border-black pt-6">
            <h3 className="font-black text-lg uppercase text-black mb-2 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#F0C020]" />
              SCREEN READER OPTIMIZATION
            </h3>
            <p className="font-medium">
              All decorative Bauhaus geometric primitives are marked with <code>aria-hidden=&quot;true&quot;</code> to prevent audio clutter. All form inputs and buttons have explicit semantic <code>aria-label</code> tags.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
