'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { INDIAN_STATES } from '@/data/states';
import { getUserPreferences, saveUserPreferences, getSavedSchemeIds } from '@/lib/storage';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { User, Bookmark, Settings, Trash2, LogOut, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState({
    fullName: 'Sai Teja',
    stateCode: 'AP',
    occupation: 'Student',
    age: 24,
    annualIncome: 150000,
  });
  const [savedCount, setSavedCount] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const existing = getUserPreferences();
    if (existing && Object.keys(existing).length > 0) {
      setPrefs((prev) => ({ ...prev, ...existing }));
    }
    setSavedCount(getSavedSchemeIds().length);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserPreferences(prefs);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jansaathi_user');
    }
    router.push('/');
  };

  const handleDeleteAccount = () => {
    if (confirm('Delete all local preferences and saved scheme data from this device?')) {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      router.push('/');
    }
  };

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-white border-4 border-[#121212] p-8 sm:p-10 mb-8 shadow-hard-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b-3 border-black">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#F0C020] border-3 border-black flex items-center justify-center font-black text-2xl text-black shadow-hard-sm">
                <User className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div>
                <span className="bg-[#1040C0] text-white text-[10px] font-black uppercase px-2 py-0.5 border border-black">
                  CITIZEN PROFILE
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase text-black mt-1">
                  {prefs.fullName}
                </h1>
                <p className="text-xs font-bold text-neutral-600 uppercase">
                  Domicile: {INDIAN_STATES.find((s) => s.code === prefs.stateCode)?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/saved"
                className="btn-bauhaus text-xs px-4 py-2 bg-[#FFF9D6] text-black border-2 border-black shadow-hard-sm"
              >
                <Bookmark className="w-4 h-4 mr-1.5" /> {savedCount} SAVED
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn-bauhaus text-xs px-4 py-2 bg-white text-black border-2 border-black hover:bg-[#F0C020] shadow-hard-sm"
              >
                <LogOut className="w-4 h-4 mr-1.5" /> SIGN OUT
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="mt-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2">
              <Settings className="w-4 h-4" /> CITIZEN DISCOVERY PREFERENCES
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  RESIDENCE STATE
                </label>
                <select
                  value={prefs.stateCode}
                  onChange={(e) => setPrefs({ ...prefs, stateCode: e.target.value })}
                  className="w-full p-3 bg-[#F0F0F0] border-3 border-black font-bold text-xs sm:text-sm uppercase focus:bg-white focus:outline-none"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name} ({st.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  PRIMARY OCCUPATION
                </label>
                <select
                  value={prefs.occupation}
                  onChange={(e) => setPrefs({ ...prefs, occupation: e.target.value })}
                  className="w-full p-3 bg-[#F0F0F0] border-3 border-black font-bold text-xs sm:text-sm uppercase focus:bg-white focus:outline-none"
                >
                  <option value="Student">Student</option>
                  <option value="Farmer">Farmer / Agricultural Worker</option>
                  <option value="Daily-wage Worker">Daily-wage Worker</option>
                  <option value="Small Business Owner">Small Business Owner</option>
                  <option value="Artisan / Vendor">Artisan / Street Vendor</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Salaried">Salaried Employee</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <BauhausButton type="submit" variant="red" size="md">
                SAVE PREFERENCES
              </BauhausButton>

              {savedSuccess && (
                <span className="text-xs font-black uppercase text-green-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
                </span>
              )}
            </div>
          </form>

          {/* Danger Zone: Account Deletion */}
          <div className="mt-12 pt-6 border-t-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-black uppercase text-[#D02020]">DATA PRIVACY & PURGE</h4>
              <p className="text-[11px] text-neutral-600">
                Instantly clear all session tokens, search history, and stored preferences from this browser.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="btn-bauhaus text-xs px-4 py-2 bg-white text-[#D02020] border-2 border-black hover:bg-[#D02020] hover:text-white shadow-hard-sm"
            >
              <Trash2 className="w-4 h-4 mr-1.5" /> PURGE MY DATA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
