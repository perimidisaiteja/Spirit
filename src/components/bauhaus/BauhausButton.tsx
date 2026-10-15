import React from 'react';
import Link from 'next/link';

export type ButtonVariant = 'red' | 'blue' | 'yellow' | 'outline' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface BauhausButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

export const BauhausButton: React.FC<BauhausButtonProps> = ({
  children,
  variant = 'red',
  size = 'md',
  href,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles: Record<ButtonVariant, string> = {
    red: 'bg-[#D02020] text-white hover:bg-[#b01818]',
    blue: 'bg-[#1040C0] text-white hover:bg-[#0c329c]',
    yellow: 'bg-[#F0C020] text-[#121212] hover:bg-[#d8ac1c]',
    outline: 'bg-white text-[#121212] hover:bg-[#F0F0F0]',
    dark: 'bg-[#121212] text-white hover:bg-[#252525]',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 border-2 shadow-hard-sm tracking-wide font-bold',
    md: 'text-sm px-5 py-2.5 border-2 md:border-3 shadow-hard-md tracking-wider font-bold',
    lg: 'text-base px-7 py-3.5 border-3 md:border-4 shadow-hard-md tracking-widest font-extrabold',
    xl: 'text-lg md:text-xl px-9 py-4 border-4 shadow-hard-lg tracking-widest font-black',
  };

  const baseClasses = `
    btn-bauhaus border-[#121212] uppercase rounded-none select-none inline-flex items-center justify-center gap-2
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
    ${className}
  `;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
};
