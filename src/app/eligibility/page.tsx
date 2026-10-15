'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { INDIAN_STATES } from '@/data/states';
import { SCHEME_CATEGORIES } from '@/data/categories';
import { SCHEMES_DATABASE, Scheme } from '@/data/schemes';
import { SchemeCard } from '@/components/schemes/SchemeCard';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { BauhausCard } from '@/components/bauhaus/BauhausCard';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Info,
} from 'lucide-react';

interface FormData {
  stateCode: string;
  age: string;
  gender: string;
  occupation: string;
  education: string;
  incomeRange: string;
  residence: string;
  caste: string;
  isDisability: string;
  primarySupport: string;
}

export default function EligibilityPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [form, setForm] = useState<FormData>({
    stateCode: 'AP',
    age: '24',
    gender: 'Female',
    occupation: 'Student',
    education: 'Undergraduate',
    incomeRange: '150000',
    residence: 'Rural',
    caste: 'OBC',
    isDisability: 'No',
    primarySupport: 'cat-1',
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else {
      setHasSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  // Matching Engine
  const matchedResults = useMemo(() => {
    const ageNum = parseInt(form.age, 10) || 25;
    const incomeNum = parseInt(form.incomeRange, 10) || 200000;

    return SCHEMES_DATABASE.map((scheme) => {
      let score = 0;
      const reasons: string[] = [];
      const unknownConditions: string[] = [];

      // State check
      if (scheme.level === 'Central') {
        score += 25;
        reasons.push('Nationwide Central Government applicability.');
      } else if (scheme.stateCode === form.stateCode) {
        score += 35;
        reasons.push(`Direct match for your state domicile (${form.stateCode}).`);
      } else {
        return null; // Exclude non-matching state schemes
      }

      // Age check
      if (scheme.eligibility.minAge !== undefined && ageNum < scheme.eligibility.minAge) {
        return null; // Under minimum age
      }
      if (scheme.eligibility.maxAge !== undefined && ageNum > scheme.eligibility.maxAge) {
        return null; // Over maximum age
      }
      if (scheme.eligibility.minAge !== undefined || scheme.eligibility.maxAge !== undefined) {
        score += 20;
        reasons.push(`Your age (${ageNum} years) falls within the eligible range.`);
      }

      // Gender check
      if (scheme.eligibility.gender && scheme.eligibility.gender !== 'Any') {
        if (scheme.eligibility.gender === form.gender) {
          score += 25;
          reasons.push(`Gender criterion satisfied (${form.gender}).`);
        } else {
          return null; // Gender mismatch
        }
      }

      // Income check
      if (scheme.eligibility.maxAnnualIncome) {
        if (incomeNum <= scheme.eligibility.maxAnnualIncome) {
          score += 20;
          reasons.push(`Household income falls under maximum threshold (Rs ${scheme.eligibility.maxAnnualIncome.toLocaleString('en-IN')}).`);
        } else {
          return null; // Exceeds income limit
        }
      }

      // Occupation check
      if (scheme.eligibility.occupations && scheme.eligibility.occupations.length > 0) {
        const matchesOcc = scheme.eligibility.occupations.some(
          (occ) => occ.toLowerCase() === form.occupation.toLowerCase() || occ === 'Any'
        );
        if (matchesOcc) {
          score += 20;
          reasons.push(`Matches your occupational classification (${form.occupation}).`);
        }
      }

      // Disability check
      if (scheme.eligibility.disabilityRequired) {
        if (form.isDisability === 'Yes') {
          score += 30;
          reasons.push('Meets benchmark disability criteria (UDID required).');
        } else {
          return null; // Requires disability
        }
      }

      // Category / Support match
      if (scheme.categoryId === form.primarySupport) {
        score += 15;
        reasons.push('Matches your indicated primary support interest.');
      }

      return {
        scheme,
        score: Math.min(score, 100),
        reasons,
      };
    })
      .filter((item): item is { scheme: Scheme; score: number; reasons: string[] } => item !== null)
      .sort((a, b) => b.score - a.score);
  }, [form]);

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Poster */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-10 mb-8 shadow-hard-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-[#D02020] border border-black" />
            <span className="text-xs font-black uppercase tracking-widest text-[#121212]">
              TRANSPARENT ELIGIBILITY CHECK
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#121212]">
            FIND YOUR MATCHING SCHEMES
          </h1>
          <p className="text-xs sm:text-sm font-medium text-neutral-600 mt-2 max-w-2xl">
            Answer a few quick questions about your demographic and occupational situation. Our algorithm cross-references statutory rules across 1,450+ schemes.
          </p>

          {/* Privacy Guarantee Note */}
          <div className="mt-6 p-3 bg-[#FFF9D6] border-2 border-black flex items-center gap-2 text-xs font-bold text-neutral-800">
            <ShieldAlert className="w-4 h-4 text-[#D02020] shrink-0" />
            <span>
              <strong>Zero Sensitive Data:</strong> We never request Aadhaar numbers, bank account numbers, passwords, or OTPs. All computation occurs securely.
            </span>
          </div>
        </div>

        {!hasSubmitted ? (
          <div className="bg-white border-4 border-[#121212] p-6 sm:p-10 shadow-hard-lg">
            {/* Step Progress Bar with Rotated Bauhaus Badges */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b-3 border-black">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 border-2 border-black flex items-center justify-center font-black text-sm ${
                      step === s
                        ? 'bg-[#D02020] text-white rotate-6 shadow-hard-sm'
                        : step > s
                        ? 'bg-[#1040C0] text-white'
                        : 'bg-[#F0F0F0] text-neutral-400'
                    }`}
                  >
                    <span className={step === s ? '-rotate-6' : ''}>{s}</span>
                  </div>
                  <span className="hidden sm:inline text-xs font-black uppercase tracking-wider text-black">
                    {s === 1 ? 'Location & Age' : s === 2 ? 'Occupation' : s === 3 ? 'Income & Social' : 'Support Need'}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Location & Age */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight text-black border-b-2 border-black pb-2">
                  STEP 1: LOCATION & DEMOGRAPHICS
                </h3>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    YOUR RESIDENCE STATE / UNION TERRITORY *
                  </label>
                  <select
                    value={form.stateCode}
                    onChange={(e) => handleChange('stateCode', e.target.value)}
                    className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-bold text-sm uppercase focus:bg-white focus:outline-none"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st.code} value={st.code}>
                        {st.name} ({st.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                      AGE OF APPLICANT (IN YEARS) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="110"
                      value={form.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-bold text-sm focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                      GENDER IDENTIFICATION *
                    </label>
                    <select
                      value={form.gender}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-bold text-sm uppercase focus:bg-white focus:outline-none"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    AREA OF DOMICILE *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Rural', 'Urban'].map((res) => (
                      <button
                        key={res}
                        type="button"
                        onClick={() => handleChange('residence', res)}
                        className={`p-3 border-3 border-black font-black uppercase text-xs tracking-wider ${
                          form.residence === res ? 'bg-[#1040C0] text-white shadow-hard-sm' : 'bg-white hover:bg-[#F0F0F0]'
                        }`}
                      >
                        {res} Area
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Occupation & Education */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight text-black border-b-2 border-black pb-2">
                  STEP 2: OCCUPATION & EDUCATION
                </h3>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    PRIMARY OCCUPATION *
                  </label>
                  <select
                    value={form.occupation}
                    onChange={(e) => handleChange('occupation', e.target.value)}
                    className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-bold text-sm uppercase focus:bg-white focus:outline-none"
                  >
                    <option value="Farmer">Farmer / Agricultural Cultivator</option>
                    <option value="Student">Student (School / College)</option>
                    <option value="Daily-wage Worker">Daily-wage Worker / Construction / Unorganized</option>
                    <option value="Job Seeker">Unemployed / Job Seeker</option>
                    <option value="Small Business Owner">Small Business Owner / Shopkeeper</option>
                    <option value="Artisan / Vendor">Traditional Artisan / Craftsman / Street Vendor</option>
                    <option value="Salaried">Salaried Private / Contractual Employee</option>
                    <option value="Homemaker">Homemaker</option>
                    <option value="Any">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    HIGHEST LEVEL OF EDUCATION
                  </label>
                  <select
                    value={form.education}
                    onChange={(e) => handleChange('education', e.target.value)}
                    className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-bold text-sm uppercase focus:bg-white focus:outline-none"
                  >
                    <option value="Primary (1-8)">Primary School (Class 1-8)</option>
                    <option value="Secondary (9-10)">Secondary School (Class 9-10)</option>
                    <option value="11th/12th">Higher Secondary (Class 11-12)</option>
                    <option value="Diploma/ITI">ITI / Polytechnic Diploma</option>
                    <option value="Undergraduate">Undergraduate Degree (B.Tech, BA, B.Sc, B.Com, MBBS)</option>
                    <option value="Postgraduate">Postgraduate / Masters</option>
                    <option value="PhD/Doctorate">PhD / Doctorate Research</option>
                    <option value="No formal education">No Formal Education</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Income & Social Details */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight text-black border-b-2 border-black pb-2">
                  STEP 3: HOUSEHOLD INCOME & SOCIAL CRITERIA
                </h3>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                    ANNUAL FAMILY INCOME BRACKET (INR) *
                  </label>
                  <select
                    value={form.incomeRange}
                    onChange={(e) => handleChange('incomeRange', e.target.value)}
                    className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-bold text-sm uppercase focus:bg-white focus:outline-none"
                  >
                    <option value="100000">Below Rs 1,00,000 / year (BPL / Antyodaya)</option>
                    <option value="250000">Rs 1,00,000 – Rs 2,50,000 / year (EWS)</option>
                    <option value="500000">Rs 2,50,000 – Rs 5,00,000 / year</option>
                    <option value="800000">Rs 5,00,000 – Rs 8,00,000 / year (OBC-NCL limit)</option>
                    <option value="1200000">Above Rs 8,00,000 / year</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                      COMMUNITY / SOCIAL CATEGORY
                    </label>
                    <select
                      value={form.caste}
                      onChange={(e) => handleChange('caste', e.target.value)}
                      className="w-full p-3.5 bg-[#F0F0F0] border-3 border-black font-bold text-sm uppercase focus:bg-white focus:outline-none"
                    >
                      <option value="General">General (OC)</option>
                      <option value="OBC">Other Backward Classes (OBC)</option>
                      <option value="SC">Scheduled Castes (SC)</option>
                      <option value="ST">Scheduled Tribes (ST)</option>
                      <option value="EWS">Economically Weaker Section (EWS)</option>
                      <option value="Minority">Religious Minority</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
                      PERSON WITH BENCHMARK DISABILITY (PwD)?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['No', 'Yes'].map((ans) => (
                        <button
                          key={ans}
                          type="button"
                          onClick={() => handleChange('isDisability', ans)}
                          className={`p-3 border-3 border-black font-black uppercase text-xs ${
                            form.isDisability === ans ? 'bg-[#D02020] text-white shadow-hard-sm' : 'bg-white hover:bg-[#F0F0F0]'
                          }`}
                        >
                          {ans}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Primary Support Interest */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight text-black border-b-2 border-black pb-2">
                  STEP 4: PRIMARY SUPPORT INTEREST
                </h3>

                <p className="text-xs font-bold text-neutral-600 uppercase">
                  Select the main public service or financial benefit you are seeking:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SCHEME_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleChange('primarySupport', cat.id)}
                      className={`p-4 border-2 border-black text-left flex items-center justify-between transition-colors ${
                        form.primarySupport === cat.id ? 'bg-[#F0C020] text-black font-black shadow-hard-sm' : 'bg-white hover:bg-[#F0F0F0] font-bold text-xs'
                      }`}
                    >
                      <span className="uppercase">{cat.name}</span>
                      {form.primarySupport === cat.id && (
                        <CheckCircle2 className="w-5 h-5 text-black stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step Form Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t-3 border-black">
              {step > 1 ? (
                <BauhausButton onClick={handlePrev} variant="outline" size="md">
                  <ArrowLeft className="w-4 h-4 mr-2" /> PREVIOUS
                </BauhausButton>
              ) : (
                <div />
              )}

              <BauhausButton onClick={handleNext} variant="red" size="md">
                {step === totalSteps ? 'VIEW MATCHING SCHEMES' : 'NEXT STEP'} <ArrowRight className="w-4 h-4 ml-2" />
              </BauhausButton>
            </div>
          </div>
        ) : (
          /* Assessment Results View */
          <div className="space-y-8">
            <div className="bg-white border-4 border-[#121212] p-8 shadow-hard-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-3 border-black mb-6">
                <div>
                  <span className="bg-[#D02020] text-white text-xs font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0_#121212]">
                    ELIGIBILITY MATCH REPORT
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-[#121212] mt-3">
                    {matchedResults.length} POTENTIALLY MATCHING SCHEMES
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setHasSubmitted(false);
                    setStep(1);
                  }}
                  className="btn-bauhaus text-xs px-4 py-2 bg-[#F0F0F0] text-black border-2 border-black hover:bg-[#F0C020] shadow-hard-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> EDIT ANSWERS
                </button>
              </div>

              {/* Citizen Profile Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F8F8F8] border-2 border-black text-xs font-bold uppercase mb-6">
                <div>
                  <span className="text-[10px] text-neutral-500 block">STATE DOMICILE</span>
                  <span>{INDIAN_STATES.find((s) => s.code === form.stateCode)?.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block">OCCUPATION & AGE</span>
                  <span>{form.occupation} ({form.age} yrs)</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block">INCOME CEILING</span>
                  <span>Up to Rs {parseInt(form.incomeRange, 10).toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block">COMMUNITY</span>
                  <span>{form.caste} ({form.residence})</span>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                * Note: Matching results are computed algorithmically based on official criteria published in Gazette notifications. Final sanctioning is contingent upon physical scrutiny of documents and e-KYC on the respective government portal.
              </p>
            </div>

            {/* Matched Scheme Cards */}
            <div className="space-y-6">
              {matchedResults.map(({ scheme, score, reasons }, idx) => (
                <div key={scheme.id} className="bg-white border-4 border-[#121212] p-6 shadow-hard-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-black mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <BauhausBadge variant={scheme.level === 'Central' ? 'central' : 'state'} size="sm">
                          {scheme.level}
                        </BauhausBadge>
                        <span className="bg-[#FFF9D6] text-black text-xs font-black uppercase px-2 py-0.5 border border-black">
                          {score}% POTENTIAL CRITERIA FIT
                        </span>
                      </div>
                      <h3 className="text-2xl font-black uppercase text-[#121212]">
                        <Link href={`/schemes/${scheme.slug}`} className="hover:text-[#1040C0]">
                          {scheme.name}
                        </Link>
                      </h3>
                      <p className="text-xs font-bold text-neutral-600 uppercase mt-0.5">
                        {scheme.ministry}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <BauhausButton href={`/schemes/${scheme.slug}`} variant="red" size="sm">
                        VIEW SCHEME & APPLY &rarr;
                      </BauhausButton>
                    </div>
                  </div>

                  {/* Why it matches */}
                  <div className="mb-4">
                    <div className="text-xs font-black uppercase tracking-wider text-[#1040C0] mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                      WHY YOU APPEAR ELIGIBLE:
                    </div>
                    <ul className="space-y-1 text-xs font-bold text-black pl-5 list-disc">
                      {reasons.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefit & Official Link Box */}
                  <div className="p-3 bg-[#FFF9D6] border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-neutral-600 uppercase block text-[10px]">VERIFIED ENTITLEMENT:</span>
                      <span className="font-black text-sm uppercase text-[#D02020]">{scheme.benefitAmountDisplay}</span>
                    </div>
                    <div>
                      <span className="font-bold text-neutral-600 uppercase block text-[10px]">DEADLINE STATUS:</span>
                      <span className="font-black uppercase text-black">{scheme.deadline}</span>
                    </div>
                    <a
                      href={scheme.officialApplicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black uppercase text-[#1040C0] hover:underline"
                    >
                      Official Portal Link &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
