'use client';

import { Scheme, SCHEMES_DATABASE } from '@/data/schemes';

export interface UserSavedScheme {
  schemeId: string;
  savedAt: string;
  notes?: string;
}

export interface UserPreferences {
  fullName?: string;
  stateCode?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  annualIncome?: number;
  caste?: string;
  isDisability?: boolean;
}

const SAVED_KEY = 'jansaathi_saved_schemes';
const COMPARE_KEY = 'jansaathi_compare_schemes';
const USER_PREFS_KEY = 'jansaathi_user_prefs';
const CUSTOM_SCHEMES_KEY = 'jansaathi_custom_schemes';
const ISSUE_REPORTS_KEY = 'jansaathi_issue_reports';

export const getSavedSchemeIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const toggleSaveScheme = (schemeId: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const ids = getSavedSchemeIds();
    let updated: string[];
    let isSaved = false;
    if (ids.includes(schemeId)) {
      updated = ids.filter((id) => id !== schemeId);
      isSaved = false;
    } else {
      updated = [...ids, schemeId];
      isSaved = true;
    }
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('jansaathi_storage_changed'));
    return isSaved;
  } catch {
    return false;
  }
};

export const getComparisonIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const toggleComparison = (schemeId: string): { success: boolean; message: string; items: string[] } => {
  if (typeof window === 'undefined') return { success: false, message: 'Browser environment only', items: [] };
  try {
    const ids = getComparisonIds();
    if (ids.includes(schemeId)) {
      const filtered = ids.filter((id) => id !== schemeId);
      localStorage.setItem(COMPARE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event('jansaathi_storage_changed'));
      return { success: true, message: 'Removed from comparison', items: filtered };
    }
    if (ids.length >= 3) {
      return { success: false, message: 'You can compare a maximum of 3 schemes at a time.', items: ids };
    }
    const updated = [...ids, schemeId];
    localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('jansaathi_storage_changed'));
    return { success: true, message: 'Added to comparison', items: updated };
  } catch {
    return { success: false, message: 'Failed to update comparison', items: [] };
  }
};

export const getUserPreferences = (): UserPreferences => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(USER_PREFS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const saveUserPreferences = (prefs: UserPreferences): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_PREFS_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new Event('jansaathi_storage_changed'));
  } catch (err) {
    console.error('Failed to save preferences:', err);
  }
};

export const getMergedSchemes = (): Scheme[] => {
  if (typeof window === 'undefined') return SCHEMES_DATABASE;
  try {
    const raw = localStorage.getItem(CUSTOM_SCHEMES_KEY);
    const custom: Scheme[] = raw ? JSON.parse(raw) : [];
    // Deduplicate by id or slug
    const customIds = new Set(custom.map((s) => s.id));
    const defaults = SCHEMES_DATABASE.filter((s) => !customIds.has(s.id));
    return [...custom, ...defaults];
  } catch {
    return SCHEMES_DATABASE;
  }
};

export const addCustomScheme = (newScheme: Scheme): void => {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CUSTOM_SCHEMES_KEY);
    const existing: Scheme[] = raw ? JSON.parse(raw) : [];
    const updated = [newScheme, ...existing.filter((s) => s.id !== newScheme.id)];
    localStorage.setItem(CUSTOM_SCHEMES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('jansaathi_storage_changed'));
  } catch (err) {
    console.error('Failed to add custom scheme:', err);
  }
};

export const saveIssueReport = (report: { schemeId?: string; schemeName?: string; issueType: string; description: string; contactEmail?: string }): void => {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(ISSUE_REPORTS_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const newEntry = {
      ...report,
      id: 'rep-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'Under Review',
    };
    localStorage.setItem(ISSUE_REPORTS_KEY, JSON.stringify([newEntry, ...existing]));
  } catch (err) {
    console.error('Failed to save issue report:', err);
  }
};

export const getIssueReports = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ISSUE_REPORTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
