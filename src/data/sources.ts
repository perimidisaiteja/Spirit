export interface SchemeSource {
  id: string;
  name: string;
  type: 'Central Authority' | 'Scholarship Portal' | 'National Directory' | 'Supplementary Partner' | 'State Portal';
  url: string;
  description: string;
  verifiedStatus: 'Verified Authority' | 'Official Aggregator' | 'Supplementary Non-Gov Source';
  coverage: string;
  lastSync: string;
}

export const OFFICIAL_SOURCES: SchemeSource[] = [
  {
    id: 'src-myscheme',
    name: 'MyScheme Portal (Government of India)',
    type: 'National Directory',
    url: 'https://www.myscheme.gov.in/',
    description: 'National single-window platform launched by MeitY and Digital India Corporation hosting official citizen schemes across all union ministries and states.',
    verifiedStatus: 'Verified Authority',
    coverage: '1,450+ Central & State Schemes',
    lastSync: '2026-10-14',
  },
  {
    id: 'src-nsp',
    name: 'National Scholarship Portal (NSP)',
    type: 'Scholarship Portal',
    url: 'https://scholarships.gov.in/',
    description: 'Ministry of Electronics & Information Technology nodal portal for Pre-Matric, Post-Matric, UGC, AICTE, and State Minority Scholarships with DBT disbarment.',
    verifiedStatus: 'Verified Authority',
    coverage: '120+ Central & State Scholarships',
    lastSync: '2026-10-12',
  },
  {
    id: 'src-services-india',
    name: 'National Government Services Portal',
    type: 'Central Authority',
    url: 'https://services.india.gov.in/',
    description: 'National portal developed by NIC providing direct access to 13,000+ public citizen services, certificates, permits, and financial schemes.',
    verifiedStatus: 'Verified Authority',
    coverage: 'All Central Ministries & State Departments',
    lastSync: '2026-10-10',
  },
  {
    id: 'src-b4s',
    name: 'Buddy4Study (Supplementary Discovery Partner)',
    type: 'Supplementary Partner',
    url: 'https://www.buddy4study.com/',
    description: 'Independent scholarship discovery aggregator used as a supplementary reference for private, CSR, and supplementary state educational grants.',
    verifiedStatus: 'Supplementary Non-Gov Source',
    coverage: 'CSR Scholarships & Higher Education Grants',
    lastSync: '2026-10-08',
  },
  {
    id: 'src-pmkisan',
    name: 'PM-KISAN Official Samman Nidhi Portal',
    type: 'Central Authority',
    url: 'https://pmkisan.gov.in/',
    description: 'Ministry of Agriculture & Farmers Welfare direct beneficiary portal for landholder farmer family income transfers.',
    verifiedStatus: 'Verified Authority',
    coverage: 'Farmers & Agricultural Landholders nationwide',
    lastSync: '2026-10-14',
  },
  {
    id: 'src-pmjay',
    name: 'National Health Authority (PM-JAY)',
    type: 'Central Authority',
    url: 'https://pmjay.gov.in/',
    description: 'World’s largest public health insurance scheme providing cashless secondary and tertiary hospitalization cover of Rs 5,00,000 per family/year.',
    verifiedStatus: 'Verified Authority',
    coverage: 'Bottom 40% vulnerable citizen population nationwide',
    lastSync: '2026-10-15',
  },
];
