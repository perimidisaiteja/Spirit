'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BauhausLogo } from '@/components/bauhaus/BauhausLogo';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { useLanguage } from '@/lib/LanguageContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/lib/i18n';
import { getSavedSchemeIds, getComparisonIds } from '@/lib/storage';
import { Globe, Menu, X, Bookmark, Scale, Sparkles, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    const updateCounters = () => {
      setSavedCount(getSavedSchemeIds().length);
      setCompareCount(getComparisonIds().length);
    };
    updateCounters();
    window.addEventListener('jansaathi_storage_changed', updateCounters);
    return () => window.removeEventListener('jansaathi_storage_changed', updateCounters);
  }, []);

  const navLinks = [
    { label: t('home'), href: '/' },
    { label: t('discover'), href: '/discover' },
    { label: t('categories'), href: '/categories' },
    { label: t('stateSchemes'), href: '/states' },
    { label: t('howItWorks'), href: '/#how-it-works' },
    { label: 'Assistant', href: '/assistant', icon: <Sparkles className="w-3.5 h-3.5 text-[#D02020]" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b-4 border-[#121212] select-none shadow-[0_4px_0_#121212]">
      {/* Top Banner Alert / Public Transparency Strip */}
      <div className="bg-[#121212] text-[#F0C020] text-xs font-bold py-1 px-4 border-b-2 border-black flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D02020] animate-pulse" />
          <span className="tracking-wide">
            PUBLIC DIRECTORY: 1,450+ VERIFIED CENTRAL & 36 STATE/UT SCHEMES GROUNDED IN OFFICIAL GAZETTES
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-white text-[11px]">
          <Link href="/data-sources" className="hover:text-[#F0C020] underline">
            Official Data Sources
          </Link>
          <span>|</span>
          <Link href="/admin" className="hover:text-[#F0C020]">
            Admin Portal
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Bauhaus Brand Identity */}
          <div className="flex items-center">
            <BauhausLogo size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-3 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors border-2 border-transparent
                    ${active ? 'bg-[#F0F0F0] border-[#121212] shadow-hard-sm text-[#121212]' : 'text-[#121212] hover:bg-[#F0F0F0]'}
                  `}
                >
                  <span className="flex items-center gap-1.5">
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Utilities: Saved, Compare, Language, Sign In, CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Compare Pill */}
            <Link
              href="/compare"
              className="relative p-2 border-2 border-[#121212] bg-white hover:bg-[#1040C0] hover:text-white transition-colors shadow-hard-sm"
              title="Compare Schemes"
              aria-label="Compare schemes"
            >
              <Scale className="w-4 h-4 stroke-[2.5]" />
              {compareCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1040C0] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-black">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Saved Schemes Pill */}
            <Link
              href="/saved"
              className="relative p-2 border-2 border-[#121212] bg-white hover:bg-[#D02020] hover:text-white transition-colors shadow-hard-sm"
              title="Saved Schemes"
              aria-label="Saved schemes"
            >
              <Bookmark className="w-4 h-4 stroke-[2.5]" />
              {savedCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D02020] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-black">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-[#121212] bg-white shadow-hard-sm text-xs font-black uppercase hover:bg-[#F0C020] transition-colors"
                aria-expanded={langDropdownOpen}
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{SUPPORTED_LANGUAGES.find((l) => l.code === language)?.name.substring(0, 3)}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border-3 border-[#121212] shadow-hard-md z-50">
                  <div className="p-2 border-b-2 border-black bg-[#F0F0F0] text-[10px] font-black uppercase tracking-wider">
                    Select Language / భాష / भाषा
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold uppercase transition-colors flex items-center justify-between border-b border-neutral-200 last:border-none ${
                          language === lang.code ? 'bg-[#D02020] text-white' : 'hover:bg-[#F0C020]'
                        }`}
                      >
                        <span>{lang.name}</span>
                        <span className="text-[11px] font-normal">{lang.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sign In Link */}
            <Link
              href="/auth/sign-in"
              className="text-xs font-black uppercase tracking-wider text-[#121212] hover:text-[#1040C0] px-2 py-1 flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5 stroke-[2.5]" />
              {t('signIn')}
            </Link>

            {/* Mandatory Red "FIND MY SCHEMES" Button */}
            <BauhausButton href="/eligibility" variant="red" size="sm">
              {t('findMySchemes')}
            </BauhausButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/saved"
              className="relative p-2 border-2 border-black bg-white shadow-hard-sm"
              aria-label="Saved Schemes"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D02020] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-black">
                  {savedCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-black bg-[#F0C020] shadow-hard-sm focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-4 border-[#121212] bg-[#FFFFFF] p-6 shadow-hard-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-black uppercase tracking-wider border-2 border-[#121212] ${
                  isActive(link.href) ? 'bg-[#1040C0] text-white shadow-hard-sm' : 'bg-white hover:bg-[#F0F0F0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </div>
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 border-2 border-black text-center text-xs font-black uppercase bg-[#F0F0F0] shadow-hard-sm"
              >
                Compare ({compareCount})
              </Link>
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 border-2 border-black text-center text-xs font-black uppercase bg-[#F0F0F0] shadow-hard-sm"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Language Grid */}
            <div className="pt-2">
              <div className="text-xs font-black uppercase tracking-wider mb-2">Select Language:</div>
              <div className="grid grid-cols-4 gap-1.5">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 text-xs font-black uppercase border-2 border-black ${
                      language === lang.code ? 'bg-[#D02020] text-white' : 'bg-white'
                    }`}
                  >
                    {lang.name.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <BauhausButton
                href="/eligibility"
                variant="red"
                size="md"
                fullWidth
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('findMySchemes')}
              </BauhausButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
