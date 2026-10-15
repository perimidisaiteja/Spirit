export interface SchemeEligibility {
  minAge?: number;
  maxAge?: number;
  gender?: 'Any' | 'Female' | 'Male' | 'Transgender';
  maxAnnualIncome?: number; // In INR, e.g. 250000, 800000
  occupations?: string[];
  educationLevels?: string[];
  casteCategories?: string[];
  disabilityRequired?: boolean;
  minDisabilityPercentage?: number;
  ruralUrban?: 'All' | 'Rural' | 'Urban';
  landholdingCriteria?: string;
}

export interface Scheme {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  ministry: string;
  level: 'Central' | 'State';
  stateCode: string; // 'ALL' or 2-letter state code like 'AP', 'TS', 'TN', 'MH', 'KA', 'UP', 'WB', 'DL'
  stateName?: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  targetBeneficiaries: string[];
  description: string;
  detailedBenefits: string[];
  benefitAmountDisplay: string;
  eligibility: SchemeEligibility;
  eligibilitySummary: string[];
  documentsRequired: string[];
  applicationProcess: string[];
  officialPortalUrl: string;
  officialApplicationUrl: string;
  supplementaryUrl?: string;
  verificationStatus: 'Verified' | 'Pending Review';
  lastVerifiedDate: string;
  deadline: string; // e.g. 'Always Open', '2026-12-31', '2026-11-30'
  applicationStatus: 'Open' | 'Always Open' | 'Upcoming' | 'Closed';
  tags: string[];
  fundingRatio?: string; // e.g. '100% Central' or '60:40 Central-State'
}

export const SCHEMES_DATABASE: Scheme[] = [
  {
    id: 'sch-pmkisan',
    slug: 'pm-kisan-samman-nidhi',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    shortName: 'PM-KISAN',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-2',
    categorySlug: 'farmers-agriculture',
    categoryName: 'Farmers & Agriculture',
    targetBeneficiaries: ['Small and Marginal Farmers', 'Landholding Farmer Families'],
    description: 'Central sector scheme providing income support of Rs 6,000 per year in three equal 4-monthly installments directly into the Aadhaar-seeded bank accounts of all landholding farmer families across India.',
    detailedBenefits: [
      'Rs 6,000 direct benefit transfer (DBT) annually',
      'Paid in 3 equal installments of Rs 2,000 every 4 months (April-July, August-November, December-March)',
      '100% funding by Central Government of India',
      'Seamless link with Kisan Credit Card (KCC) for subsidized crop loans up to Rs 3 Lakh'
    ],
    benefitAmountDisplay: 'Rs 6,000 / year (Direct DBT)',
    eligibility: {
      minAge: 18,
      occupations: ['Farmer', 'Agricultural Worker'],
      maxAnnualIncome: undefined, // All cultivable landholders eligible except institutional and income tax payers
      ruralUrban: 'All',
      landholdingCriteria: 'Must own cultivable agricultural land registered in state revenue records'
    },
    eligibilitySummary: [
      'Farmer family owning cultivable land in their name',
      'Valid Aadhaar card linked with active bank account & mobile number',
      'Must complete e-KYC on PM-KISAN portal or CSC center',
      'Exclusion: Institutional landholders, serving/retired government officers, income tax payers of previous assessment year'
    ],
    documentsRequired: [
      'Aadhaar Card (seeded with bank account)',
      'Land Ownership Record (RoR / Khata / Patta copy)',
      'Bank Account Passbook / Statement with IFSC code',
      'Active Mobile Number for OTP verification'
    ],
    applicationProcess: [
      'Visit the official portal at pmkisan.gov.in',
      'Click on Farmers Corner > New Farmer Registration',
      'Enter Aadhaar Number, State, and Captcha code',
      'Fill rural/urban details, bank details, and land parcel survey numbers',
      'Upload land ownership deed and submit. Track status using Aadhaar'
    ],
    officialPortalUrl: 'https://pmkisan.gov.in/',
    officialApplicationUrl: 'https://pmkisan.gov.in/RegistrationFormNew.aspx',
    supplementaryUrl: 'https://www.myscheme.gov.in/schemes/pm-kisan',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-14',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['agriculture', 'farmers', 'dbt', 'cash-support', 'central'],
    fundingRatio: '100% Central Sector'
  },
  {
    id: 'sch-pmjay',
    slug: 'ayushman-bharat-pmjay',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    shortName: 'PM-JAY',
    ministry: 'Ministry of Health and Family Welfare / NHA',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-7',
    categorySlug: 'healthcare-assistance',
    categoryName: 'Healthcare Assistance',
    targetBeneficiaries: ['Economically Weaker Families', 'BPL Households', 'Rural Deprived & Urban Workers'],
    description: 'The world’s largest public health insurance initiative providing health cover of Rs 5,00,000 per family per year for secondary and tertiary hospitalization across 27,000+ empaneled public and private hospitals.',
    detailedBenefits: [
      'Rs 5,00,000 cashless health insurance cover per family per year',
      'Over 1,949 medical procedures covered including surgeries, oncology, cardiology, and orthopedics',
      'Pre-existing conditions covered from day one of enrollment',
      'Pre-hospitalization up to 3 days and post-hospitalization medicine expenses up to 15 days included'
    ],
    benefitAmountDisplay: 'Rs 5,00,000 / year Cashless Treatment',
    eligibility: {
      minAge: 0,
      maxAge: 100,
      gender: 'Any',
      maxAnnualIncome: 250000,
      ruralUrban: 'All',
      occupations: ['Daily-wage Worker', 'Artisan / Vendor', 'Domestic Worker', 'Transport Worker', 'Unorganized Worker']
    },
    eligibilitySummary: [
      'Families identified under SECC 2011 deprivation criteria (D1-D7) or active NFSA ration card',
      'All senior citizens aged 70 and above eligible for an additional Rs 5 Lakh top-up irrespective of income',
      'No cap on family size, gender, or age'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Ration Card (NFSA / BPL / Antyodaya)',
      'Active Mobile Number',
      'Government Photo ID'
    ],
    applicationProcess: [
      'Check eligibility on beneficiary.nha.gov.in with your mobile number & Aadhaar',
      'Generate Ayushman Card instantly via self-eKYC or visit any Ayushman Mitra desk at empaneled hospitals',
      'Download Ayushman PVC card on DigiLocker or Ayushman App'
    ],
    officialPortalUrl: 'https://pmjay.gov.in/',
    officialApplicationUrl: 'https://beneficiary.nha.gov.in/',
    supplementaryUrl: 'https://www.myscheme.gov.in/schemes/ab-pmjay',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-15',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['health', 'hospitalization', 'insurance', 'cashless', 'ayushman'],
    fundingRatio: '60:40 Central-State (90:10 for NE & Himalayan States)'
  },
  {
    id: 'sch-pmay-u',
    slug: 'pradhan-mantri-awas-yojana-urban',
    name: 'Pradhan Mantri Awas Yojana - Urban 2.0 (PMAY-U)',
    shortName: 'PMAY-Urban',
    ministry: 'Ministry of Housing and Urban Affairs',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-6',
    categorySlug: 'housing-basic-needs',
    categoryName: 'Housing & Basic Needs',
    targetBeneficiaries: ['Urban Poor', 'EWS', 'LIG', 'Slum Dwellers', 'Rental Families'],
    description: 'Comprehensive urban housing program providing interest subsidies up to Rs 1.8 Lakh or direct financial assistance of Rs 1.5 Lakh to Rs 2.5 Lakh for building or buying a pucca house in statutory towns.',
    detailedBenefits: [
      'Up to Rs 2.5 Lakh subsidy for beneficiary-led individual house construction (BLC)',
      'Interest subsidy of 4.0% for 12 years on home loans up to Rs 25 Lakh (ISS)',
      'Mandatory female co-ownership or sole ownership of the alloted house',
      'Basic civic amenities: water tap, sanitary toilet, and electricity connection included'
    ],
    benefitAmountDisplay: 'Up to Rs 2,50,000 Financial Grant / Subsidy',
    eligibility: {
      minAge: 18,
      maxAnnualIncome: 600000,
      ruralUrban: 'Urban',
      occupations: ['Any', 'Daily-wage Worker', 'Small Business Owner', 'Salaried']
    },
    eligibilitySummary: [
      'Beneficiary family must not own a pucca house anywhere in India',
      'Must reside in statutory urban areas or planning authorities',
      'EWS income limit: up to Rs 3 Lakh/year; LIG income limit: Rs 3 Lakh - Rs 6 Lakh/year'
    ],
    documentsRequired: [
      'Aadhaar card of all family members',
      'Income Certificate / ITR / Salary Slip',
      'Proof of land ownership or NOC from urban local body (for BLC)',
      'Bank Account Passbook with IFSC',
      'Affidavit confirming no other pucca house owned in India'
    ],
    applicationProcess: [
      'Apply online through pmaymis.gov.in or nearest Municipal Corporation Citizen Service Center',
      'Select Citizen Assessment and verify Aadhaar',
      'Fill personal, occupational, and bank information',
      'Municipal field team conducts physical geo-tagging inspection'
    ],
    officialPortalUrl: 'https://pmaymis.gov.in/',
    officialApplicationUrl: 'https://pmaymis.gov.in/Open/Check_Aadhar_Existence.aspx',
    supplementaryUrl: 'https://www.myscheme.gov.in/schemes/pmay-u',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-12',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['housing', 'urban', 'pucca-house', 'home-loan', 'subsidy'],
    fundingRatio: '60:40 Central-State'
  },
  {
    id: 'sch-pmvishwakarma',
    slug: 'pm-vishwakarma-yojana',
    name: 'PM Vishwakarma Kaushal Samman Scheme',
    shortName: 'PM Vishwakarma',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-5',
    categorySlug: 'business-entrepreneurship',
    categoryName: 'Business & Entrepreneurship',
    targetBeneficiaries: ['Traditional Artisans', 'Craftspeople', 'Blacksmiths', 'Potters', 'Carpenters', 'Weavers'],
    description: 'Flagship initiative for traditional trades providing end-to-end support including PM Vishwakarma Certificate & ID, basic skill training with Rs 500/day stipend, Rs 15,000 toolkit voucher, and collateral-free enterprise loans up to Rs 3 Lakh at 5% interest.',
    detailedBenefits: [
      'Recognition: PM Vishwakarma Certificate and Digital ID Card',
      'Skill Upgradation: 5-7 days basic training + 15+ days advanced training with Rs 500/day stipend',
      'Toolkit Incentive: Modern tool purchase voucher of Rs 15,000 via e-RUPI',
      'Enterprise Credit: Collateral-free loans — Tranche 1: Rs 1,00,000 (18 mo), Tranche 2: Rs 2,00,000 (30 mo) at concessional 5% interest rate',
      'Digital Incentive: Rs 1 per digital transaction up to 100 transactions/month'
    ],
    benefitAmountDisplay: 'Rs 15,000 Toolkit + Up to Rs 3 Lakh Concessional Loan @ 5%',
    eligibility: {
      minAge: 18,
      occupations: ['Artisan / Vendor', 'Carpenter', 'Boat Maker', 'Armourer', 'Blacksmith', 'Hammer & Tool Maker', 'Locksmith', 'Sculptor', 'Goldsmith', 'Potter', 'Cobbler', 'Mason', 'Basket/Mat/Broom Maker', 'Doll & Toy Maker', 'Barber', 'Garland Maker', 'Washerman', 'Tailor', 'Fishing Net Maker'],
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Must be engaged in one of the 18 traditional family-based crafts',
      'Minimum age 18 years on the date of registration',
      'Not availed similar credit-based schemes (PMEGP, PM SVANidhi, Mudra) in the past 5 years',
      'Only one member per household is eligible'
    ],
    documentsRequired: [
      'Aadhaar Card with biometric verification',
      'Active mobile number linked to Aadhaar',
      'Bank Account Passbook',
      'Ration Card / Family Declaration',
      'Proof of trade or certificate from Gram Panchayat / Urban Ward Member'
    ],
    applicationProcess: [
      'Registration must be completed at any Common Services Center (CSC)',
      'Biometric authentication and verification of trade details',
      'Stage 1: Gram Panchayat / Urban Local Body verification',
      'Stage 2: District Implementation Committee screening',
      'Stage 3: National Portal approval and batch scheduling for training'
    ],
    officialPortalUrl: 'https://pmvishwakarma.gov.in/',
    officialApplicationUrl: 'https://pmvishwakarma.gov.in/Home/HowToRegister',
    supplementaryUrl: 'https://www.myscheme.gov.in/schemes/pm-vishwakarma',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-14',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['artisans', 'craftsmen', 'skills', 'tools', 'loans', 'msme'],
    fundingRatio: '100% Central Sector'
  },
  {
    id: 'sch-nsp-postmatric',
    slug: 'post-matric-scholarship-sc-st-obc',
    name: 'Post Matric Scholarship for SC, ST & OBC Students',
    shortName: 'Post Matric Scholarship',
    ministry: 'Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-1',
    categorySlug: 'education-scholarships',
    categoryName: 'Education & Scholarships',
    targetBeneficiaries: ['Students in Class 11, 12, ITI, Diploma, Degree, Masters, PhD'],
    description: 'Centrally sponsored scholarship covering complete non-refundable tuition fees plus annual academic maintenance allowance up to Rs 13,500/year for eligible students studying in post-matriculation courses.',
    detailedBenefits: [
      '100% reimbursement of compulsory non-refundable college fees',
      'Annual maintenance allowance: Day Scholars Rs 4,000 - Rs 7,000; Hostellers Rs 8,000 - Rs 13,500 based on course group',
      'Additional study tour and thesis typing grants for postgraduate and professional research scholars',
      'Direct Benefit Transfer (DBT) into student bank account'
    ],
    benefitAmountDisplay: 'Full Tuition Fee + Up to Rs 13,500 / year Allowance',
    eligibility: {
      minAge: 15,
      maxAge: 35,
      maxAnnualIncome: 250000,
      occupations: ['Student'],
      educationLevels: ['11th/12th', 'Diploma/ITI', 'Undergraduate', 'Postgraduate', 'PhD/Doctorate'],
      casteCategories: ['SC', 'ST', 'OBC', 'EBC', 'DNT']
    },
    eligibilitySummary: [
      'Enrolled in recognized post-secondary institutions or universities',
      'Annual parental family income from all sources must not exceed Rs 2.5 Lakh',
      'Must have passed the previous qualifying examination without failing'
    ],
    documentsRequired: [
      'Aadhaar Card (linked with bank account via NPCI mapper)',
      'Community / Caste Certificate from Revenue Tehsildar',
      'Current Financial Year Income Certificate',
      'Previous Class Marksheet',
      'College Fee Receipt & Bonafide Student Certificate'
    ],
    applicationProcess: [
      'Register on National Scholarship Portal at scholarships.gov.in using OTR (One Time Registration)',
      'Complete Aadhaar e-KYC using Face Auth or OTP',
      'Select Post Matric Scholarship Scheme and submit institution code',
      'Upload verified documents and submit for Institute Nodal Officer (INO) verification'
    ],
    officialPortalUrl: 'https://scholarships.gov.in/',
    officialApplicationUrl: 'https://scholarships.gov.in/fresh/newstdRegfrmInstruction',
    supplementaryUrl: 'https://www.buddy4study.com/scholarships',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-13',
    deadline: '2026-11-30',
    applicationStatus: 'Open',
    tags: ['scholarship', 'students', 'education', 'sc-st', 'nsp', 'dbt'],
    fundingRatio: '60:40 Central-State (90:10 for NE)'
  },
  {
    id: 'sch-pmsvanidhi',
    slug: 'pm-svanidhi-street-vendors',
    name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    shortName: 'PM SVANidhi',
    ministry: 'Ministry of Housing and Urban Affairs',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-5',
    categorySlug: 'business-entrepreneurship',
    categoryName: 'Business & Entrepreneurship',
    targetBeneficiaries: ['Street Vendors', 'Hawkers', 'Thela Walas', 'Fruit & Veg Sellers', 'Chai Stall Owners'],
    description: 'Micro-credit facility enabling urban street vendors to access collateral-free working capital loans starting from Rs 10,000, progressing to Rs 20,000 and Rs 50,000 upon timely repayment, accompanied by 7% interest subsidy.',
    detailedBenefits: [
      '1st Loan: Rs 10,000 working capital loan (tenure 1 year)',
      '2nd Loan: Rs 20,000 upon timely repayment of 1st loan (tenure 1.5 years)',
      '3rd Loan: Rs 50,000 upon timely repayment of 2nd loan (tenure 3 years)',
      'Interest subsidy of 7% per annum credited quarterly directly into the bank account',
      'Cashback incentive on digital transactions up to Rs 1,200 annually'
    ],
    benefitAmountDisplay: 'Collateral-free Loan up to Rs 50,000 + 7% Interest Subsidy',
    eligibility: {
      minAge: 18,
      occupations: ['Artisan / Vendor', 'Street Vendor', 'Daily-wage Worker'],
      ruralUrban: 'Urban'
    },
    eligibilitySummary: [
      'Street vendors engaged in vending in urban areas on or before March 24, 2020',
      'Vendors possessing Certificate of Vending / ID card issued by Urban Local Body (ULB)',
      'Vendors identified in survey or possessing Letter of Recommendation (LoR) from Town Vending Committee'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Certificate of Vending (CoV) or Letter of Recommendation (LoR)',
      'Bank Account Passbook',
      'Active mobile number'
    ],
    applicationProcess: [
      'Visit pmsvanidhi.mohua.gov.in or download PM SVANidhi App',
      'Enter Aadhaar and authenticate via OTP',
      'Select your urban local body and lending bank partner',
      'Submit application. Banking correspondent inspects stall and disburses loan'
    ],
    officialPortalUrl: 'https://pmsvanidhi.mohua.gov.in/',
    officialApplicationUrl: 'https://pmsvanidhi.mohua.gov.in/Default/ViewFile?id=UserManual_Citizen.pdf',
    supplementaryUrl: 'https://www.myscheme.gov.in/schemes/pm-svanidhi',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-11',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['street-vendors', 'micro-credit', 'loans', 'working-capital', 'subsidy'],
    fundingRatio: '100% Central Sector'
  },
  {
    id: 'sch-atal-pension',
    slug: 'atal-pension-yojana-apy',
    name: 'Atal Pension Yojana (APY)',
    shortName: 'Atal Pension Yojana',
    ministry: 'Ministry of Finance / PFRDA',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-8',
    categorySlug: 'pensions-senior-citizens',
    categoryName: 'Pensions & Senior Citizens',
    targetBeneficiaries: ['Unorganized Sector Workers', 'Gig Workers', 'Daily Wage Earners', 'Self-employed Citizens'],
    description: 'Guaranteed monthly pension scheme administered by PFRDA delivering a fixed pension of Rs 1,000 to Rs 5,000 per month upon reaching 60 years of age, with continuation to spouse and return of pension corpus to nominee.',
    detailedBenefits: [
      'Guaranteed pension choice: Rs 1,000, Rs 2,000, Rs 3,000, Rs 4,000, or Rs 5,000 per month for life from age 60',
      'Same pension continues to surviving spouse upon demise of subscriber',
      '100% of the accumulated pension corpus returned to the legal nominee after demise of both subscriber & spouse',
      'Tax benefits under Section 80CCD(1B) up to Rs 50,000'
    ],
    benefitAmountDisplay: 'Rs 1,000 to Rs 5,000 / month Guaranteed Pension for Life',
    eligibility: {
      minAge: 18,
      maxAge: 40,
      occupations: ['Any', 'Daily-wage Worker', 'Farmer', 'Self-employed', 'Unorganized Worker'],
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Indian citizen between 18 and 40 years old',
      'Must have savings bank account or post office account',
      'Must not be an income tax payer as per current finance rules'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Bank Account Number (auto-debit mandate)',
      'Nominee Aadhaar & details',
      'Active mobile number'
    ],
    applicationProcess: [
      'Approach your bank branch or access net banking/mobile banking app',
      'Fill APY registration form with monthly contribution amount based on entry age',
      'PRAN (Permanent Retirement Account Number) generated instantly with auto-debit'
    ],
    officialPortalUrl: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    officialApplicationUrl: 'https://enps.nsdl.com/eNPS/ApySubRegistration.html',
    supplementaryUrl: 'https://www.myscheme.gov.in/schemes/apy',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-15',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['pension', 'senior-citizen', 'retirement', 'unorganized', 'financial-security'],
    fundingRatio: '100% Central / PFRDA'
  },
  {
    id: 'sch-pm-surya-ghar',
    slug: 'pm-surya-ghar-muft-bijli-yojana',
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    shortName: 'PM Surya Ghar',
    ministry: 'Ministry of New and Renewable Energy',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-6',
    categorySlug: 'housing-basic-needs',
    categoryName: 'Housing & Basic Needs',
    targetBeneficiaries: ['Residential Households', 'Homeowners', 'Urban & Rural Families'],
    description: 'National solar rooftop initiative providing up to Rs 78,000 direct central financial subsidy for installing rooftop solar panels, enabling households to get up to 300 units of free electricity every month.',
    detailedBenefits: [
      'Rs 30,000 subsidy for 1 kW rooftop solar system',
      'Rs 60,000 subsidy for 2 kW rooftop solar system',
      'Rs 78,000 maximum subsidy for 3 kW and higher rooftop solar systems',
      'Provides up to 300 free units of electricity per month and allows selling excess power back to the grid (DISCOM)',
      'Collateral-free low-interest solar bank loans up to Rs 2 Lakh available at ~7%'
    ],
    benefitAmountDisplay: 'Direct Subsidy up to Rs 78,000 + 300 Free Units Electricity/mo',
    eligibility: {
      minAge: 18,
      occupations: ['Any'],
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Must be an Indian citizen possessing a residential house with suitable roof space',
      'Must have a valid grid electricity connection in the applicant name',
      'Must not have availed any other central rooftop solar subsidy previously'
    ],
    documentsRequired: [
      'Recent Electricity Bill (with Consumer Number / CA Number)',
      'Aadhaar Card of Electricity Bill Holder',
      'Bank Account Passbook / Cancelled Cheque (for direct subsidy transfer)',
      'Photograph of Rooftop Space'
    ],
    applicationProcess: [
      'Register on the national portal at pmsuryaghar.gov.in',
      'Select your State, DISCOM, and enter Consumer Account Number',
      'Apply for rooftop solar and select registered empaneled vendor',
      'DISCOM technical feasibility check, installation, net meter setup, and subsidy disbursed within 30 days'
    ],
    officialPortalUrl: 'https://pmsuryaghar.gov.in/',
    officialApplicationUrl: 'https://pmsuryaghar.gov.in/consumerRegistration',
    supplementaryUrl: 'https://www.myscheme.gov.in/schemes/pmsurya-ghar',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-14',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['solar', 'electricity', 'subsidy', 'green-energy', 'rooftop'],
    fundingRatio: '100% Central Sector'
  },
  {
    id: 'sch-sukanya-samriddhi',
    slug: 'sukanya-samriddhi-yojana-ssy',
    name: 'Sukanya Samriddhi Yojana (Beti Bachao Beti Padhao)',
    shortName: 'Sukanya Samriddhi',
    ministry: 'Ministry of Finance / Department of Posts',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-4',
    categorySlug: 'women-child-welfare',
    categoryName: 'Women & Child Welfare',
    targetBeneficiaries: ['Girl Child aged 0-10 years', 'Parents & Legal Guardians of Girls'],
    description: 'Government-backed high-interest savings scheme offering guaranteed 8.2% annual compounded interest and complete triple tax exemption (EEE) under Section 80C to secure higher education and marriage funds for girls.',
    detailedBenefits: [
      'Attractive sovereign interest rate of 8.2% per annum (compounded annually)',
      'Triple tax exemption: Investment deduction (Sec 80C), Interest earned, and Maturity proceeds are 100% tax free',
      'Deposit flexibility: Minimum Rs 250 per year up to Rs 1.5 Lakh per year',
      'Partial withdrawal up to 50% allowed when the girl turns 18 for college admission fees'
    ],
    benefitAmountDisplay: '8.2% Sovereign Interest + Complete Tax-Free Maturity',
    eligibility: {
      minAge: 0,
      maxAge: 10,
      gender: 'Female',
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Account can be opened by biological or legal parents for a girl child under 10 years of age',
      'Maximum two accounts per family (three permitted in case of twins/triplets)',
      'Account matures 21 years from date of opening or on marriage after age 18'
    ],
    documentsRequired: [
      'Birth Certificate of the girl child',
      'Aadhaar card of parent or legal guardian',
      'Address proof of guardian',
      'Passport size photographs of child and parent'
    ],
    applicationProcess: [
      'Visit any India Post office branch or authorized public/private commercial bank',
      'Submit Form SSA-1 along with child birth certificate and guardian KYC',
      'Deposit minimum opening balance of Rs 250 in cash or cheque',
      'Passbook issued with account number and deposit schedule'
    ],
    officialPortalUrl: 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx',
    officialApplicationUrl: 'https://www.indiapost.gov.in/',
    supplementaryUrl: 'https://www.myscheme.gov.in/schemes/ssy',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-15',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['girl-child', 'savings', 'education', 'women', 'tax-free'],
    fundingRatio: 'Government of India Small Savings'
  },
  {
    id: 'sch-divyangjan-swavalamban',
    slug: 'divyangjan-swavalamban-yojana',
    name: 'National Divyangjan Swavalamban Yojana',
    shortName: 'Divyangjan Swavalamban',
    ministry: 'Ministry of Social Justice & Empowerment / NHFDC',
    level: 'Central',
    stateCode: 'ALL',
    categoryId: 'cat-9',
    categorySlug: 'disability-support',
    categoryName: 'Disability Support',
    targetBeneficiaries: ['Persons with Benchmark Disabilities (PwD)', 'Differently Abled Entrepreneurs'],
    description: 'Concessional credit scheme providing soft loans up to Rs 50 Lakh at nominal 5% to 8% interest with 0.5% special rebate for women with disabilities, supporting self-employment, vocational trades, and educational pursuits.',
    detailedBenefits: [
      'Self-employment loans up to Rs 50 Lakh for service, trading, and manufacturing units',
      'Educational loans up to Rs 20 Lakh for studies in India and Rs 40 Lakh for abroad at subsidized interest',
      'Special 0.5% interest rebate for women entrepreneurs with disabilities',
      'Repayment tenure up to 7 to 10 years including liberal moratorium period'
    ],
    benefitAmountDisplay: 'Subsidized Business Loans up to Rs 50 Lakh @ 5-8%',
    eligibility: {
      minAge: 18,
      maxAge: 65,
      disabilityRequired: true,
      minDisabilityPercentage: 40,
      occupations: ['Any', 'Self-employed', 'Job Seeker', 'Artisan / Vendor', 'Student'],
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Must be an Indian citizen with benchmark disability of 40% or more',
      'Valid UDID card (Unique Disability Identity Card) or medical board certificate',
      'Annual family income ceiling applies as per NHFDC norms'
    ],
    documentsRequired: [
      'Unique Disability ID (UDID) Card',
      'Aadhaar Card',
      'Business Project Proposal / Trade Estimate',
      'Bank Account details',
      'Income Certificate'
    ],
    applicationProcess: [
      'Apply online on the NHFDC portal at nhfdc.nic.in or through State Channelising Agencies (SCAs)',
      'Submit detailed project report for the proposed micro-enterprise or trade',
      'Screening by district committee and disbursement through RRBs or nationalized banks'
    ],
    officialPortalUrl: 'http://www.nhfdc.nic.in/',
    officialApplicationUrl: 'http://www.nhfdc.nic.in/schemes',
    supplementaryUrl: 'https://www.myscheme.gov.in/schemes/divyangjan-swavalamban',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-10',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['disability', 'pwd', 'udid', 'loans', 'entrepreneurship', 'accessibility'],
    fundingRatio: '100% Central / NHFDC'
  },
  {
    id: 'sch-ts-rythu-bharosa',
    slug: 'telangana-rythu-bharosa',
    name: 'Telangana Rythu Bharosa Investment Support Scheme',
    shortName: 'Rythu Bharosa Telangana',
    ministry: 'Department of Agriculture, Government of Telangana',
    level: 'State',
    stateCode: 'TS',
    stateName: 'Telangana',
    categoryId: 'cat-2',
    categorySlug: 'farmers-agriculture',
    categoryName: 'Farmers & Agriculture',
    targetBeneficiaries: ['Landowner Farmers', 'Tenant Farmers', 'Agricultural Laborers'],
    description: 'Telangana state investment support scheme providing direct financial assistance of Rs 15,000 per acre per year to farmers and Rs 12,000 per year to agricultural daily-wage laborers, disbursed across Kharif and Rabi crop seasons.',
    detailedBenefits: [
      'Rs 15,000 per acre per year direct benefit transfer for farmers',
      'Rs 12,000 per year dedicated support for agricultural daily-wage landless laborers',
      'Additional Rs 500 bonus per quintal for fine variety paddy procurement',
      'Insurance coverage under Rythu Bima for eligible farmer breadwinners'
    ],
    benefitAmountDisplay: 'Rs 15,000 / acre / year (Telangana)',
    eligibility: {
      minAge: 18,
      occupations: ['Farmer', 'Daily-wage Worker', 'Agricultural Worker'],
      ruralUrban: 'Rural'
    },
    eligibilitySummary: [
      'Must hold agricultural land in Telangana registered on Dharani portal',
      'Tenant farmers and landless farm laborers identified via Praja Palana applications',
      'Aadhaar-linked active bank account'
    ],
    documentsRequired: [
      'Pattadar Passbook / Dharani Land Record',
      'Aadhaar Card',
      'Telangana Ration Card (Food Security Card)',
      'Bank Account Passbook'
    ],
    applicationProcess: [
      'Applications verified through Praja Palana Grama Sabhas in rural mandals',
      'Agriculture Extension Officers (AEO) verify field crop status',
      'Direct DBT deposited into farmer bank accounts ahead of sowing season'
    ],
    officialPortalUrl: 'https://telangana.gov.in/',
    officialApplicationUrl: 'https://rythubandhu.telangana.gov.in/',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-14',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['telangana', 'state-scheme', 'farmers', 'dbt', 'rythu-bharosa'],
    fundingRatio: '100% State Government of Telangana'
  },
  {
    id: 'sch-ap-talliki-vandanam',
    slug: 'andhra-pradesh-talliki-vandanam',
    name: 'Andhra Pradesh Talliki Vandanam Scheme',
    shortName: 'Talliki Vandanam AP',
    ministry: 'Department of School Education, Government of Andhra Pradesh',
    level: 'State',
    stateCode: 'AP',
    stateName: 'Andhra Pradesh',
    categoryId: 'cat-1',
    categorySlug: 'education-scholarships',
    categoryName: 'Education & Scholarships',
    targetBeneficiaries: ['Mothers of School Students (Classes 1 to 12)'],
    description: 'Flagship education welfare scheme of Andhra Pradesh providing Rs 15,000 per year to mothers for each school-going child from Class 1 to Intermediate (12th), incentivizing zero dropouts and full school attendance.',
    detailedBenefits: [
      'Rs 15,000 per year direct transfer per school-going child',
      'Benefits every school-going child in the family (extended to all children without limit)',
      'Applicable across Government, Aided, and recognized Private schools',
      'Direct credit into the mother’s Aadhaar-seeded bank account'
    ],
    benefitAmountDisplay: 'Rs 15,000 / child / year to Mother',
    eligibility: {
      occupations: ['Student'],
      maxAnnualIncome: 250000,
      gender: 'Female',
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Mother or recognized guardian of student studying in Class 1 to 12 in Andhra Pradesh',
      'Student must maintain at least 75% school attendance',
      'Family must hold valid Rice Card or meet BPL criteria in AP'
    ],
    documentsRequired: [
      'Mother and Student Aadhaar Cards',
      'AP Rice Card / BPL Card',
      'Student School Bonafide Certificate with U-DISE Code',
      'Aadhaar-seeded Bank Account Passbook of the mother'
    ],
    applicationProcess: [
      'School headmasters submit student attendance and mother details via the Jnanabhumi / Child Info portal',
      'Village / Ward Secretariats (Sachivalayam) conduct social audit verification',
      'Payment transferred via DBT to eligible mothers before academic year commencement'
    ],
    officialPortalUrl: 'https://jnanabhumi.ap.gov.in/',
    officialApplicationUrl: 'https://jnanabhumi.ap.gov.in/',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-15',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['andhra-pradesh', 'education', 'mothers', 'students', 'state-scheme'],
    fundingRatio: '100% State Government of Andhra Pradesh'
  },
  {
    id: 'sch-tn-magalir-urimai',
    slug: 'tamil-nadu-kalaignar-magalir-urimai-thogai',
    name: 'Kalaignar Magalir Urimai Thogai Thittam',
    shortName: 'Magalir Urimai Tamil Nadu',
    ministry: 'Special Programme Implementation Department, Government of Tamil Nadu',
    level: 'State',
    stateCode: 'TN',
    stateName: 'Tamil Nadu',
    categoryId: 'cat-4',
    categorySlug: 'women-child-welfare',
    categoryName: 'Women & Child Welfare',
    targetBeneficiaries: ['Women Heads of Households', 'Homemakers', 'Unorganized Women Workers'],
    description: 'Tamil Nadu pioneering basic income initiative offering Rs 1,000 per month (Rs 12,000 annually) direct cash assistance to over 1.15 crore eligible women heads of families in recognition of their unpaid household labor.',
    detailedBenefits: [
      'Rs 1,000 direct benefit transfer credited every month (15th of each month)',
      'Financial autonomy for women homemakers and daily-wage earners',
      'Integrated with mobile SMS alerts and direct ATM withdrawal without deduction'
    ],
    benefitAmountDisplay: 'Rs 1,000 / month Direct Income (Rs 12,000/yr)',
    eligibility: {
      minAge: 21,
      gender: 'Female',
      maxAnnualIncome: 250000,
      occupations: ['Any', 'Homemaker', 'Daily-wage Worker', 'Artisan / Vendor', 'Farmer'],
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Female head of the family as designated on the Smart Ration Card',
      'Family annual income below Rs 2.5 Lakh and landholding under 5 acres wetland or 10 acres dryland',
      'Electricity consumption under 3,600 units per year'
    ],
    documentsRequired: [
      'Smart Ration Card (Family Card)',
      'Aadhaar Card of the woman head',
      'Electricity Consumer Number',
      'Bank Account Passbook with IFSC'
    ],
    applicationProcess: [
      'Special enrollment camps held at Ration Shops (PDS) across Tamil Nadu',
      'Biometric authentication and application registration on the dedicated mobile app',
      'Revenue field verification followed by automated DBT release on the 15th of every month'
    ],
    officialPortalUrl: 'https://kmut.tn.gov.in/',
    officialApplicationUrl: 'https://kmut.tn.gov.in/',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-12',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['tamil-nadu', 'women', 'basic-income', 'dbt', 'state-scheme'],
    fundingRatio: '100% State Government of Tamil Nadu'
  },
  {
    id: 'sch-ka-yuva-nidhi',
    slug: 'karnataka-yuva-nidhi-scheme',
    name: 'Karnataka Yuva Nidhi Scheme',
    shortName: 'Yuva Nidhi Karnataka',
    ministry: 'Department of Skill Development, Entrepreneurship and Livelihood, Karnataka',
    level: 'State',
    stateCode: 'KA',
    stateName: 'Karnataka',
    categoryId: 'cat-3',
    categorySlug: 'employment-skill-training',
    categoryName: 'Employment & Skill Training',
    targetBeneficiaries: ['Unemployed Graduates', 'Unemployed Diploma Holders'],
    description: 'Unemployment assistance scheme providing Rs 3,000 per month for degree graduates and Rs 1,500 per month for diploma holders for up to 2 years, combined with free skill development and employment placement linkages.',
    detailedBenefits: [
      'Rs 3,000 per month for unemployed graduates',
      'Rs 1,500 per month for unemployed diploma holders',
      'Benefit provided for up to 24 months or until securing employment/self-employment',
      'Free skill training certifications through Karnataka Skill Development Corporation (KSDC)'
    ],
    benefitAmountDisplay: 'Rs 3,000 / month (Graduates) | Rs 1,500 (Diploma)',
    eligibility: {
      minAge: 20,
      maxAge: 30,
      occupations: ['Job Seeker', 'Unemployed'],
      educationLevels: ['Diploma/ITI', 'Undergraduate', 'Postgraduate'],
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Domicile of Karnataka who completed Degree or Diploma in 2023 or later',
      'Must have remained unemployed for at least 180 days after graduation',
      'Not pursuing higher education or employed in private/government sector'
    ],
    documentsRequired: [
      'Karnataka Domicile Certificate',
      'Degree / Diploma Passing Certificate with marks card',
      'Aadhaar Card linked to bank account',
      'Declaration of unemployment status'
    ],
    applicationProcess: [
      'Register on the Seva Sindhu portal at sevasindhugs.karnataka.gov.in',
      'Log in using Aadhaar and Nadakacheri certificate number',
      'Enter university registration number to fetch degree verification digitally',
      'Submit self-declaration monthly on the portal to continue DBT disbursal'
    ],
    officialPortalUrl: 'https://sevasindhugs.karnataka.gov.in/',
    officialApplicationUrl: 'https://sevasindhugs.karnataka.gov.in/index.html',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-13',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['karnataka', 'youth', 'unemployment', 'allowance', 'state-scheme'],
    fundingRatio: '100% State Government of Karnataka'
  },
  {
    id: 'sch-wb-kanyashree',
    slug: 'west-bengal-kanyashree-prakalpa',
    name: 'West Bengal Kanyashree Prakalpa',
    shortName: 'Kanyashree Prakalpa',
    ministry: 'Department of Women & Child Development and Social Welfare, West Bengal',
    level: 'State',
    stateCode: 'WB',
    stateName: 'West Bengal',
    categoryId: 'cat-1',
    categorySlug: 'education-scholarships',
    categoryName: 'Education & Scholarships',
    targetBeneficiaries: ['Adolescent Girls in Schools & Colleges'],
    description: 'UN Public Service Award-winning conditional cash transfer program preventing early child marriage and promoting secondary and higher education among adolescent girls across West Bengal.',
    detailedBenefits: [
      'K1: Annual scholarship of Rs 1,000 for unmarried girls aged 13-18 enrolled in Class 8 to 12',
      'K2: One-time grant of Rs 25,000 upon reaching 18 years of age if remaining unmarried and enrolled in education',
      'K3: Science and Arts monthly fellowship for post-graduate higher education at universities'
    ],
    benefitAmountDisplay: 'Rs 1,000 / year (K1) + Rs 25,000 One-time Grant (K2)',
    eligibility: {
      minAge: 13,
      maxAge: 19,
      gender: 'Female',
      occupations: ['Student'],
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Unmarried female student studying in recognized school/college in West Bengal',
      'Enrolled in Class 8 or above or equivalent vocational/sports course',
      'Family income ceiling waived for girls with disabilities, orphans, or in juvenile homes'
    ],
    documentsRequired: [
      'Student Birth Certificate',
      'Unmarried Status Declaration endorsed by parent/guardian',
      'Institution Bonafide Certificate with admission number',
      'Student personal bank account passbook with IFSC'
    ],
    applicationProcess: [
      'Collect official Kanyashree Form from the educational institution head',
      'Submit completed form with parent signature to the school Kanyashree Nodal Teacher',
      'School enters data on wb.gov.in portal. BDO/SDO approves and DBT is released'
    ],
    officialPortalUrl: 'https://wbkanyashree.gov.in/',
    officialApplicationUrl: 'https://wbkanyashree.gov.in/kp_4.0/index.php',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-11',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['west-bengal', 'girls', 'scholarship', 'kanyashree', 'education'],
    fundingRatio: '100% State Government of West Bengal'
  },
  {
    id: 'sch-mh-ladki-bahin',
    slug: 'maharashtra-majhi-ladki-bahin-yojana',
    name: 'Mukhyamantri Majhi Ladki Bahin Yojana Maharashtra',
    shortName: 'Majhi Ladki Bahin',
    ministry: 'Women and Child Development Department, Government of Maharashtra',
    level: 'State',
    stateCode: 'MH',
    stateName: 'Maharashtra',
    categoryId: 'cat-4',
    categorySlug: 'women-child-welfare',
    categoryName: 'Women & Child Welfare',
    targetBeneficiaries: ['Women aged 21-65 years', 'Economically Weaker Women in Maharashtra'],
    description: 'Direct financial assistance program providing Rs 1,500 every month (Rs 18,000 per year) directly to the bank accounts of married, widowed, divorced, deserted, and destitute women in Maharashtra.',
    detailedBenefits: [
      'Rs 1,500 direct monthly cash deposit into bank account via DBT',
      'Financial support for health, nutrition, and personal economic empowerment',
      'Simplified verification via Nari Shakti Doot App and Anganwadi centers'
    ],
    benefitAmountDisplay: 'Rs 1,500 / month Direct Cash Assistance',
    eligibility: {
      minAge: 21,
      maxAge: 65,
      gender: 'Female',
      maxAnnualIncome: 250000,
      ruralUrban: 'All'
    },
    eligibilitySummary: [
      'Resident woman of Maharashtra holding yellow or orange ration card',
      'Family annual income from all sources must not exceed Rs 2.5 Lakh',
      'Must have Aadhaar-linked active bank account'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Maharashtra Domicile Certificate / Voter ID / 15-year Ration Card',
      'Income Certificate (or Yellow/Orange Ration Card)',
      'Bank Account Passbook (Aadhaar Seeded)'
    ],
    applicationProcess: [
      'Apply online via the Nari Shakti Doot Mobile App or ladkibahin.maharashtra.gov.in',
      'Assistance available through Setu Suvidha Kendra, Gram Sevak, and Anganwadi Sevikas',
      'Approval granted after municipal/Panchayat scrutiny and monthly DBT credited directly'
    ],
    officialPortalUrl: 'https://ladkibahin.maharashtra.gov.in/',
    officialApplicationUrl: 'https://ladkibahin.maharashtra.gov.in/',
    verificationStatus: 'Verified',
    lastVerifiedDate: '2026-10-14',
    deadline: 'Always Open',
    applicationStatus: 'Always Open',
    tags: ['maharashtra', 'women', 'financial-assistance', 'ladki-bahin', 'dbt'],
    fundingRatio: '100% State Government of Maharashtra'
  }
];
