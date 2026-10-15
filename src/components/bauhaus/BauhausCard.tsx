import React from 'react';

export type CardBgColor = 'white' | 'red' | 'blue' | 'yellow' | 'muted';
export type CornerShape = 'circle' | 'square' | 'triangle' | 'none';

interface BauhausCardProps {
  children: React.ReactNode;
  bgColor?: CardBgColor;
  borderWidth?: 2 | 3 | 4;
  shadowSize?: 'sm' | 'md' | 'lg' | 'none';
  cornerShape?: CornerShape;
  cornerColor?: 'red' | 'blue' | 'yellow' | 'black';
  liftOnHover?: boolean;
  className?: string;
}

export const BauhausCard: React.FC<BauhausCardProps> = ({
  children,
  bgColor = 'white',
  borderWidth = 4,
  shadowSize = 'md',
  cornerShape = 'none',
  cornerColor = 'red',
  liftOnHover = true,
  className = '',
}) => {
  const bgStyles: Record<CardBgColor, string> = {
    white: 'bg-white text-[#121212]',
    red: 'bg-[#D02020] text-white',
    blue: 'bg-[#1040C0] text-white',
    yellow: 'bg-[#F0C020] text-[#121212]',
    muted: 'bg-[#E0E0E0] text-[#121212]',
  };

  const borderStyles = {
    2: 'border-2',
    3: 'border-3',
    4: 'border-2 md:border-4',
  }[borderWidth];

  const shadowStyles = {
    none: '',
    sm: 'shadow-hard-sm',
    md: 'shadow-hard-md',
    lg: 'shadow-hard-lg',
  }[shadowSize];

  return (
    <div
      className={`
        relative rounded-none border-[#121212] ${borderStyles} ${bgStyles[bgColor]} ${shadowStyles}
        ${liftOnHover ? 'card-bauhaus-lift' : ''}
        ${className}
      `}
    >
      {/* Optional Geometric Corner Accent */}
      {cornerShape !== 'none' && (
        <div className="absolute top-0 right-0 z-10 overflow-hidden w-8 h-8 pointer-events-none">
          {cornerShape === 'square' && (
            <div
              className={`w-5 h-5 ml-auto border-l-2 border-b-2 border-[#121212] ${
                cornerColor === 'red'
                  ? 'bg-[#D02020]'
                  : cornerColor === 'blue'
                  ? 'bg-[#1040C0]'
                  : cornerColor === 'yellow'
                  ? 'bg-[#F0C020]'
                  : 'bg-[#121212]'
              }`}
            />
          )}
          {cornerShape === 'circle' && (
            <div
              className={`w-6 h-6 -mr-2 -mt-2 ml-auto rounded-full border-2 border-[#121212] ${
                cornerColor === 'red'
                  ? 'bg-[#D02020]'
                  : cornerColor === 'blue'
                  ? 'bg-[#1040C0]'
                  : cornerColor === 'yellow'
                  ? 'bg-[#F0C020]'
                  : 'bg-[#121212]'
              }`}
            />
          )}
          {cornerShape === 'triangle' && (
            <svg viewBox="0 0 30 30" className="w-full h-full">
              <polygon
                points="0,0 30,0 30,30"
                fill={
                  cornerColor === 'red'
                    ? '#D02020'
                    : cornerColor === 'blue'
                    ? '#1040C0'
                    : cornerColor === 'yellow'
                    ? '#F0C020'
                    : '#121212'
                }
                stroke="#121212"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
