import React from 'react';
import Link from 'next/link';

interface BauhausLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  linkToHome?: boolean;
}

export const BauhausLogo: React.FC<BauhausLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  linkToHome = true,
}) => {
  const sizeClasses = {
    sm: {
      shapes: 'w-7 h-7',
      circle: 'w-4 h-4',
      square: 'w-3.5 h-3.5',
      triangle: 'w-4 h-4',
      title: 'text-xl',
      tagline: 'text-[9px]',
    },
    md: {
      shapes: 'w-10 h-10',
      circle: 'w-6 h-6',
      square: 'w-5 h-5',
      triangle: 'w-6 h-6',
      title: 'text-2xl',
      tagline: 'text-[10px]',
    },
    lg: {
      shapes: 'w-14 h-14',
      circle: 'w-8 h-8',
      square: 'w-7 h-7',
      triangle: 'w-8 h-8',
      title: 'text-3xl md:text-4xl',
      tagline: 'text-xs',
    },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Bauhaus Brand Mark: Red Circle, Blue Square, Yellow Triangle */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses.shapes}`}>
        {/* Red Circle */}
        <div className={`absolute -top-0.5 -left-0.5 rounded-full bg-[#D02020] border-2 border-[#121212] z-10 ${sizeClasses.circle}`} />
        {/* Blue Square */}
        <div className={`absolute bottom-0 right-0 rounded-none bg-[#1040C0] border-2 border-[#121212] z-20 ${sizeClasses.square}`} />
        {/* Yellow Triangle SVG */}
        <div className={`absolute top-1 right-1 z-30 ${sizeClasses.triangle}`}>
          <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[1px_1px_0_#121212]">
            <polygon points="12,2 22,22 2,22" fill="#F0C020" stroke="#121212" strokeWidth="2.5" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-[#121212] uppercase ${sizeClasses.title}`}>
            JANSAATHI
          </span>
          <span className="bg-[#D02020] text-white text-[11px] font-black px-1.5 py-0.5 border border-[#121212] shadow-[2px_2px_0_#121212]">
            AI
          </span>
        </div>
        {showTagline && (
          <span className={`font-bold tracking-widest text-[#121212] uppercase mt-1 opacity-90 ${sizeClasses.tagline}`}>
            EVERY CITIZEN. EVERY OPPORTUNITY.
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-block hover:opacity-95 transition-opacity" aria-label="JanSaathi AI Homepage">
        {content}
      </Link>
    );
  }

  return content;
};
