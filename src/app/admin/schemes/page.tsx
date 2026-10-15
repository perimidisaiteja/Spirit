'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SCHEMES_DATABASE, Scheme } from '@/data/schemes';
import { SCHEME_CATEGORIES } from '@/data/categories';
import { INDIAN_STATES } from '@/data/states';
import { getMergedSchemes, addCustomScheme } from '@/lib/storage';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { Plus, Trash2, Edit3, CheckCircle2, ArrowLeft, Search, Eye } from 'lucide-react';

export default function AdminSchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>(SCHEMES_DATABASE);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Scheme Form State
  const [newScheme, setNewScheme] = useState({
    name: '',
    shortName: '',
    ministry: '',
    level: 'Central' as 'Central' | 'State',
    stateCode: 'ALL',
    categoryId: 'cat-1',
    description: '',
    benefitAmountDisplay: '',
    eligibilitySummary: '',
    documentsRequired: '',
    officialPortalUrl: '',
    officialApplicationUrl: '',
    deadline: 'Always Open',
  });

  useEffect(() => {
    setSchemes(getMergedSchemes());
  }, []);

  const handleCreateScheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScheme.name || !newScheme.description) return;

    const slug = newScheme.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const cat = SCHEME_CATEGORIES.find((c) => c.id === newScheme.categoryId);

    const created: Scheme = {
      id: 'custom-' + Date.now(),
      slug,
      name: newScheme.name,
      shortName: newScheme.shortName || newScheme.name.slice(0, 15),
      ministry: newScheme.ministry || 'Government of India',
      level: newScheme.level,
      stateCode: newScheme.stateCode,
      stateName: newScheme.level === 'State' ? INDIAN_STATES.find((s) => s.code === newScheme.stateCode)?.name : undefined,
      categoryId: newScheme.categoryId,
      categorySlug: cat ? cat.slug : 'education-scholarships',
      categoryName: cat ? cat.name : 'Education & Scholarships',
      targetBeneficiaries: ['General Citizens'],
      description: newScheme.description,
      detailedBenefits: [newScheme.benefitAmountDisplay || 'Financial assistance provided as per gazette rules.'],
      benefitAmountDisplay: newScheme.benefitAmountDisplay || 'Statutory Grant',
      eligibility: { ruralUrban: 'All' },
      eligibilitySummary: newScheme.eligibilitySummary.split('\n').filter(Boolean),
      documentsRequired: newScheme.documentsRequired.split('\n').filter(Boolean),
      applicationProcess: ['Apply through designated official government portal'],
      officialPortalUrl: newScheme.officialPortalUrl || 'https://services.india.gov.in',
      officialApplicationUrl: newScheme.officialApplicationUrl || newScheme.officialPortalUrl || 'https://services.india.gov.in',
      verificationStatus: 'Verified',
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      deadline: newScheme.deadline || 'Always Open',
      applicationStatus: 'Open',
      tags: ['verified', 'gazette', newScheme.level.toLowerCase()],
    };

    addCustomScheme(created);
    setSchemes(getMergedSchemes());
    setIsModalOpen(false);
    alert('Scheme successfully published to directory!');
  };

  const filtered = schemes.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.ministry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation Header */}
        <div className="mb-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-[#1040C0]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            &larr; BACK TO ADMIN OVERVIEW
          </Link>
        </div>

        <div className="bg-white border-4 border-[#121212] p-6 sm:p-8 mb-8 shadow-hard-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-[#1040C0] text-white text-xs font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0_#121212]">
                GAZETTE CATALOGUE GOVERNANCE
              </span>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#121212] mt-3">
                SCHEME REPOSITORY ({schemes.length})
              </h1>
              <p className="text-xs text-neutral-600 font-medium mt-1">
                Author, update, and manage official eligibility criteria across Union Ministries and State Departments.
              </p>
            </div>

            <BauhausButton onClick={() => setIsModalOpen(true)} variant="red" size="md">
              <Plus className="w-4 h-4 mr-1.5 stroke-[3]" /> ADD NEW SCHEME
            </BauhausButton>
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex border-3 border-black bg-white shadow-hard-sm">
            <div className="p-3 bg-white text-black flex items-center">
              <Search className="w-4 h-4 stroke-[3]" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by scheme name or ministry..."
              className="w-full p-2.5 font-bold text-xs sm:text-sm uppercase focus:outline-none"
            />
          </div>
        </div>

        {/* Schemes Table */}
        <div className="bg-white border-4 border-[#121212] shadow-hard-lg overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#121212] text-white border-b-4 border-black text-xs font-black uppercase tracking-wider">
                <th className="p-4 border-r-2 border-neutral-700">Scheme Name</th>
                <th className="p-4 border-r-2 border-neutral-700">Jurisdiction</th>
                <th className="p-4 border-r-2 border-neutral-700">Benefit</th>
                <th className="p-4 border-r-2 border-neutral-700">Last Verified</th>
                <th className="p-4 border-r-2 border-neutral-700">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#121212] text-xs font-bold text-black uppercase">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-[#FFF9D6] transition-colors">
                  <td className="p-4 border-r-2 border-[#121212] max-w-xs">
                    <div className="font-black text-sm uppercase line-clamp-1">{s.name}</div>
                    <div className="text-[10px] text-neutral-500 font-normal">{s.ministry}</div>
                  </td>
                  <td className="p-4 border-r-2 border-[#121212]">
                    <BauhausBadge variant={s.level === 'Central' ? 'central' : 'state'} size="sm">
                      {s.level === 'Central' ? 'CENTRAL' : s.stateCode}
                    </BauhausBadge>
                  </td>
                  <td className="p-4 border-r-2 border-[#121212] text-[#D02020] font-black">
                    {s.benefitAmountDisplay}
                  </td>
                  <td className="p-4 border-r-2 border-[#121212] text-neutral-600">
                    {s.lastVerifiedDate}
                  </td>
                  <td className="p-4 border-r-2 border-[#121212]">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 border border-green-800">
                      {s.verificationStatus}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/schemes/${s.slug}`}
                        className="p-1.5 bg-white border border-black hover:bg-[#1040C0] hover:text-white"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Scheme Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border-4 border-black p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-hard-xl my-8">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
                <h3 className="text-xl font-black uppercase text-black">
                  CREATE NEW STATUTORY SCHEME RECORD
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 border-2 border-black bg-[#D02020] text-white font-black px-2 hover:bg-black"
                >
                  X
                </button>
              </div>

              <form onSubmit={handleCreateScheme} className="space-y-4 text-xs font-bold uppercase">
                <div>
                  <label className="block text-black mb-1">OFFICIAL SCHEME FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={newScheme.name}
                    onChange={(e) => setNewScheme({ ...newScheme, name: e.target.value })}
                    placeholder="e.g. National Apprenticeship Promotion Scheme (NAPS-2)"
                    className="w-full p-2.5 border-2 border-black focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-black mb-1">GOVERNMENT LEVEL</label>
                    <select
                      value={newScheme.level}
                      onChange={(e) => setNewScheme({ ...newScheme, level: e.target.value as any })}
                      className="w-full p-2.5 border-2 border-black focus:outline-none"
                    >
                      <option value="Central">Central Government</option>
                      <option value="State">State Government</option>
                    </select>
                  </div>

                  {newScheme.level === 'State' && (
                    <div>
                      <label className="block text-black mb-1">STATE JURISDICTION</label>
                      <select
                        value={newScheme.stateCode}
                        onChange={(e) => setNewScheme({ ...newScheme, stateCode: e.target.value })}
                        className="w-full p-2.5 border-2 border-black focus:outline-none"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st.code} value={st.code}>
                            {st.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-black mb-1">CATEGORY DOMAIN</label>
                    <select
                      value={newScheme.categoryId}
                      onChange={(e) => setNewScheme({ ...newScheme, categoryId: e.target.value })}
                      className="w-full p-2.5 border-2 border-black focus:outline-none"
                    >
                      {SCHEME_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-black mb-1">NODAL MINISTRY / DEPARTMENT</label>
                  <input
                    type="text"
                    required
                    value={newScheme.ministry}
                    onChange={(e) => setNewScheme({ ...newScheme, ministry: e.target.value })}
                    placeholder="e.g. Ministry of Skill Development and Entrepreneurship"
                    className="w-full p-2.5 border-2 border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-black mb-1">KEY FINANCIAL ENTITLEMENT DISPLAY *</label>
                  <input
                    type="text"
                    required
                    value={newScheme.benefitAmountDisplay}
                    onChange={(e) => setNewScheme({ ...newScheme, benefitAmountDisplay: e.target.value })}
                    placeholder="e.g. Rs 1,500 / month stipend directly via DBT"
                    className="w-full p-2.5 border-2 border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-black mb-1">SCHEME DESCRIPTION</label>
                  <textarea
                    rows={3}
                    required
                    value={newScheme.description}
                    onChange={(e) => setNewScheme({ ...newScheme, description: e.target.value })}
                    placeholder="Detailed explanation of the scheme's purpose and scope..."
                    className="w-full p-2.5 border-2 border-black focus:outline-none normal-case font-medium"
                  />
                </div>

                <div>
                  <label className="block text-black mb-1">KEY ELIGIBILITY CRITERIA (ONE PER LINE)</label>
                  <textarea
                    rows={3}
                    value={newScheme.eligibilitySummary}
                    onChange={(e) => setNewScheme({ ...newScheme, eligibilitySummary: e.target.value })}
                    placeholder="Resident of India&#10;Age between 18-35&#10;Income under Rs 2.5 Lakh"
                    className="w-full p-2.5 border-2 border-black focus:outline-none normal-case font-medium"
                  />
                </div>

                <div>
                  <label className="block text-black mb-1">OFFICIAL APPLICATION URL (.GOV.IN / .NIC.IN)</label>
                  <input
                    type="url"
                    required
                    value={newScheme.officialApplicationUrl}
                    onChange={(e) => setNewScheme({ ...newScheme, officialApplicationUrl: e.target.value })}
                    placeholder="https://www.apprenticeshipindia.gov.in/"
                    className="w-full p-2.5 border-2 border-black focus:outline-none normal-case font-medium"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t-2 border-black">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border-2 border-black bg-white hover:bg-[#F0F0F0]"
                  >
                    Cancel
                  </button>
                  <BauhausButton type="submit" variant="red" size="md">
                    PUBLISH VERIFIED SCHEME
                  </BauhausButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
