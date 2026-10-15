import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-12 mb-8 shadow-hard-lg">
          <span className="bg-[#D02020] text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#121212]">
            LEGAL NOTICE & CITIZEN CHARTER
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-2">
            TERMS OF PUBLIC SERVICE
          </h1>
          <p className="text-xs sm:text-sm font-medium text-neutral-600 leading-relaxed">
            Please read these terms carefully before utilizing the JanSaathi AI discovery directory.
          </p>
        </div>

        <div className="bg-white border-4 border-black p-8 shadow-hard-md space-y-6 text-sm text-neutral-800 leading-relaxed font-medium">
          <div className="p-4 bg-[#FFF9D6] border-2 border-black flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-[#D02020] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-black text-sm uppercase text-black mb-1">
                NON-GOVERNMENTAL INDEPENDENT ENTITY DISCLAIMER
              </h4>
              <p className="text-xs text-neutral-800">
                JanSaathi AI is an independent software directory created in the public interest. JanSaathi AI is not operated by, contracted by, or affiliated with the Government of India, the Digital India Corporation, or any State/UT administrative department.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-black text-base uppercase text-black mb-2">
              1. NO GUARANTEE OF SCHEME SANCTION OR APPROVAL
            </h3>
            <p>
              The eligibility matching results provided by JanSaathi AI represent potential statutory compatibility based on published gazettes. They do not constitute an administrative guarantee or sanction. Official verification, field physical inspection, biometric e-KYC, and disbursement decisions rest exclusively with the designated government department.
            </p>
          </div>

          <div className="border-t-2 border-black pt-6">
            <h3 className="font-black text-base uppercase text-black mb-2">
              2. MANDATORY USE OF OFFICIAL PORTALS (.GOV.IN / .NIC.IN)
            </h3>
            <p>
              Users must always verify the current validity of application forms and submit applications directly on designated official government portals ending in .gov.in or .nic.in. JanSaathi AI is not liable for technical delays or modifications introduced by government portal servers.
            </p>
          </div>

          <div className="border-t-2 border-black pt-6">
            <h3 className="font-black text-base uppercase text-black mb-2">
              3. NO SERVICE FEES
            </h3>
            <p>
              JanSaathi AI is 100% free for all Indian citizens. Anyone demanding money or agent commissions claiming association with JanSaathi AI is engaged in fraud and should be reported to the police immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
