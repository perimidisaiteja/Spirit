export interface CitizenSituation {
  id: string;
  label: string;
  targetCategory: string;
  iconName: string;
  badgeColor: 'red' | 'blue' | 'yellow' | 'white';
  criteriaKey: string;
  criteriaVal: string;
}

export const CITIZEN_SITUATIONS: CitizenSituation[] = [
  {
    id: 'sit-farmer',
    label: 'I am a farmer.',
    targetCategory: 'farmers-agriculture',
    iconName: 'Sprout',
    badgeColor: 'yellow',
    criteriaKey: 'occupation',
    criteriaVal: 'Farmer',
  },
  {
    id: 'sit-student',
    label: 'I am a student.',
    targetCategory: 'education-scholarships',
    iconName: 'GraduationCap',
    badgeColor: 'blue',
    criteriaKey: 'occupation',
    criteriaVal: 'Student',
  },
  {
    id: 'sit-daily-wage',
    label: 'I am a daily-wage worker.',
    targetCategory: 'employment-skill-training',
    iconName: 'Hammer',
    badgeColor: 'red',
    criteriaKey: 'occupation',
    criteriaVal: 'Daily-wage Worker',
  },
  {
    id: 'sit-jobseeker',
    label: 'I am looking for a job.',
    targetCategory: 'employment-skill-training',
    iconName: 'Search',
    badgeColor: 'blue',
    criteriaKey: 'occupation',
    criteriaVal: 'Job Seeker',
  },
  {
    id: 'sit-small-business',
    label: 'I run a small business.',
    targetCategory: 'business-entrepreneurship',
    iconName: 'Store',
    badgeColor: 'yellow',
    criteriaKey: 'occupation',
    criteriaVal: 'Small Business Owner',
  },
  {
    id: 'sit-woman',
    label: 'I am a woman seeking support.',
    targetCategory: 'women-child-welfare',
    iconName: 'HeartHandshake',
    badgeColor: 'white',
    criteriaKey: 'gender',
    criteriaVal: 'Female',
  },
  {
    id: 'sit-senior',
    label: 'I am a senior citizen.',
    targetCategory: 'pensions-senior-citizens',
    iconName: 'Clock',
    badgeColor: 'red',
    criteriaKey: 'ageGroup',
    criteriaVal: 'Senior (60+)',
  },
  {
    id: 'sit-disability',
    label: 'I am a person with a disability.',
    targetCategory: 'disability-support',
    iconName: 'Accessibility',
    badgeColor: 'blue',
    criteriaKey: 'disability',
    criteriaVal: 'Yes',
  },
  {
    id: 'sit-family',
    label: 'I am supporting my family.',
    targetCategory: 'family-social-welfare',
    iconName: 'Users',
    badgeColor: 'yellow',
    criteriaKey: 'supportType',
    criteriaVal: 'Family Welfare',
  },
  {
    id: 'sit-artisan',
    label: 'I am an artisan or street vendor.',
    targetCategory: 'business-entrepreneurship',
    iconName: 'Scissors',
    badgeColor: 'red',
    criteriaKey: 'occupation',
    criteriaVal: 'Artisan / Vendor',
  },
  {
    id: 'sit-salaried',
    label: 'I am a salaried employee.',
    targetCategory: 'financial-inclusion',
    iconName: 'Wallet',
    badgeColor: 'white',
    criteriaKey: 'occupation',
    criteriaVal: 'Salaried',
  },
  {
    id: 'sit-housing-health',
    label: 'I need housing or healthcare assistance.',
    targetCategory: 'housing-basic-needs',
    iconName: 'Home',
    badgeColor: 'blue',
    criteriaKey: 'supportType',
    criteriaVal: 'Housing / Health',
  },
];
