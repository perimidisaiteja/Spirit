import React from 'react';

export type BadgeVariant = 'central' | 'state' | 'verified' | 'open' | 'closed' | 'yellow' | 'red' | 'blue' | 'neutral';

interface BauhausBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export const BauhausBadge: React.FC<BauhausBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    central: 'bg-[#1040C0] text-white border-[#121212]',
    state: 'bg-[#D02020] text-white border-[#121212]',
    verified: 'bg-[#F0C020] text-[#121212] border-[#121212]',
    open: 'bg-[#121212] text-[#F0C020] border-[#121212]',
    closed: 'bg-[#E0E0E0] text-[#121212] border-[#121212]',
    yellow: 'bg-[#F0C020] text-[#121212] border-[#121212]',
    red: 'bg-[#D02020] text-white border-[#121212]',
    blue: 'bg-[#1040C0] text-white border-[#121212]',
    neutral: 'bg-white text-[#121212] border-[#121212]',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 border shadow-[2px_2px_0_#121212]',
    md: 'text-xs px-2.5 py-1 border-2 shadow-[2px_2px_0_#121212]',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1 font-black uppercase tracking-wider select-none ${variantStyles[variant]} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
};
