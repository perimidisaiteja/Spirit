'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Save active session locally
    if (typeof window !== 'undefined') {
      localStorage.setItem('jansaathi_user', JSON.stringify({ email, signedInAt: new Date().toISOString() }));
    }
    router.push('/profile');
  };

  const handleGuestContinue = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jansaathi_user', JSON.stringify({ email: 'citizen.guest@jansaathi.in', isGuest: true }));
    }
    router.push('/profile');
  };

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-16 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-white border-4 border-[#121212] p-8 shadow-hard-lg">
          <div className="text-center mb-8">
            <span className="bg-[#D02020] text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#121212]">
              CITIZEN PORTAL ACCESS
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-2">
              SIGN IN
            </h1>
            <p className="text-xs text-neutral-600 font-medium">
              Access your saved schemes, deadline alerts, and family assessment history.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                EMAIL ADDRESS
              </label>
              <div className="flex border-3 border-black bg-white">
                <div className="p-3 bg-[#F0F0F0] border-r-2 border-black flex items-center text-black">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@example.com"
                  className="w-full p-3 font-bold text-xs sm:text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                PASSWORD
              </label>
              <div className="flex border-3 border-black bg-white">
                <div className="p-3 bg-[#F0F0F0] border-r-2 border-black flex items-center text-black">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 font-bold text-xs sm:text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <BauhausButton type="submit" variant="red" size="md" fullWidth>
                SIGN IN TO DASHBOARD
              </BauhausButton>
            </div>
          </form>

          {/* Guest Access Option */}
          <div className="mt-6 pt-6 border-t-2 border-black space-y-3">
            <button
              type="button"
              onClick={handleGuestContinue}
              className="w-full py-3 px-4 border-2 border-black text-xs font-black uppercase tracking-wider bg-[#FFF9D6] hover:bg-[#F0C020] text-black shadow-hard-sm transition-colors flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 stroke-[2.5]" />
              CONTINUE AS GUEST CITIZEN
            </button>

            <div className="text-center text-xs font-bold text-neutral-600">
              Don&apos;t have an account?{' '}
              <Link href="/auth/sign-up" className="text-[#1040C0] font-black underline uppercase">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
