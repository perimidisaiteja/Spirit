'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { Lock, Mail, User, ShieldCheck } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('jansaathi_user', JSON.stringify({ name, email, signedInAt: new Date().toISOString() }));
    }
    router.push('/profile');
  };

  return (
    <div className="flex-1 w-full bg-[#F0F0F0] py-16 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-white border-4 border-[#121212] p-8 shadow-hard-lg">
          <div className="text-center mb-8">
            <span className="bg-[#1040C0] text-white text-xs font-black uppercase px-3 py-1 border border-black shadow-[2px_2px_0_#121212]">
              CREATE CITIZEN PROFILE
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#121212] mt-4 mb-2">
              SIGN UP
            </h1>
            <p className="text-xs text-neutral-600 font-medium">
              Create a free account to receive deadline updates and sync eligibility results.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                FULL NAME
              </label>
              <div className="flex border-3 border-black bg-white">
                <div className="p-3 bg-[#F0F0F0] border-r-2 border-black flex items-center text-black">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sai Teja"
                  className="w-full p-3 font-bold text-xs sm:text-sm focus:outline-none"
                />
              </div>
            </div>

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
                CREATE PASSWORD
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

            <div className="pt-3">
              <BauhausButton type="submit" variant="blue" size="md" fullWidth>
                CREATE CITIZEN ACCOUNT
              </BauhausButton>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t-2 border-black text-center text-xs font-bold text-neutral-600">
            Already have an account?{' '}
            <Link href="/auth/sign-in" className="text-[#D02020] font-black underline uppercase">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
