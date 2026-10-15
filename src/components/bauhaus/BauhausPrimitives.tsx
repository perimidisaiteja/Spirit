import React from 'react';

// Bauhaus Circle
interface CircleProps {
  color?: 'red' | 'blue' | 'yellow' | 'black' | 'white';
  size?: number | string;
  borderWidth?: number;
  className?: string;
}

export const BauhausCircle: React.FC<CircleProps> = ({
  color = 'red',
  size = 48,
  borderWidth = 3,
  className = '',
}) => {
  const bgMap = {
    red: 'bg-[#D02020]',
    blue: 'bg-[#1040C0]',
    yellow: 'bg-[#F0C020]',
    black: 'bg-[#121212]',
    white: 'bg-[#FFFFFF]',
  };

  const dim = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      style={{ width: dim, height: dim, borderWidth: `${borderWidth}px` }}
      className={`rounded-full shrink-0 border-[#121212] ${bgMap[color]} ${className}`}
      aria-hidden="true"
    />
  );
};

// Bauhaus Square
interface SquareProps {
  color?: 'red' | 'blue' | 'yellow' | 'black' | 'white';
  size?: number | string;
  borderWidth?: number;
  className?: string;
  rotate?: number;
}

export const BauhausSquare: React.FC<SquareProps> = ({
  color = 'blue',
  size = 48,
  borderWidth = 3,
  className = '',
  rotate = 0,
}) => {
  const bgMap = {
    red: 'bg-[#D02020]',
    blue: 'bg-[#1040C0]',
    yellow: 'bg-[#F0C020]',
    black: 'bg-[#121212]',
    white: 'bg-[#FFFFFF]',
  };

  const dim = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      style={{
        width: dim,
        height: dim,
        borderWidth: `${borderWidth}px`,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
      className={`rounded-none shrink-0 border-[#121212] ${bgMap[color]} ${className}`}
      aria-hidden="true"
    />
  );
};

// Bauhaus Triangle
interface TriangleProps {
  color?: 'red' | 'blue' | 'yellow' | 'black' | 'white';
  size?: number;
  borderWidth?: number;
  className?: string;
  rotate?: number;
}

export const BauhausTriangle: React.FC<TriangleProps> = ({
  color = 'yellow',
  size = 48,
  borderWidth = 3,
  className = '',
  rotate = 0,
}) => {
  const fillMap = {
    red: '#D02020',
    blue: '#1040C0',
    yellow: '#F0C020',
    black: '#121212',
    white: '#FFFFFF',
  };

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <polygon
          points="20,4 36,36 4,36"
          fill={fillMap[color]}
          stroke="#121212"
          strokeWidth={borderWidth}
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
};

// Geometric Decorative Pattern
export const GeometricPattern: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`} aria-hidden="true">
      <div className="w-3.5 h-3.5 rounded-full bg-[#D02020] border-2 border-[#121212]" />
      <div className="w-3.5 h-3.5 bg-[#1040C0] border-2 border-[#121212]" />
      <div className="w-3.5 h-3.5">
        <svg viewBox="0 0 20 20" className="w-full h-full">
          <polygon points="10,2 18,18 2,18" fill="#F0C020" stroke="#121212" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

// Primary Color Panel
interface PanelProps {
  color: 'red' | 'blue' | 'yellow' | 'white' | 'muted';
  borderBottom?: boolean;
  borderTop?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const PrimaryColorPanel: React.FC<PanelProps> = ({
  color,
  borderBottom = true,
  borderTop = false,
  children,
  className = '',
}) => {
  const colorMap = {
    red: 'bg-[#D02020] text-white',
    blue: 'bg-[#1040C0] text-white',
    yellow: 'bg-[#F0C020] text-[#121212]',
    white: 'bg-[#FFFFFF] text-[#121212]',
    muted: 'bg-[#E0E0E0] text-[#121212]',
  };

  return (
    <section
      className={`w-full relative ${colorMap[color]} ${borderTop ? 'border-t-4 border-[#121212]' : ''} ${
        borderBottom ? 'border-b-4 border-[#121212]' : ''
      } ${className}`}
    >
      {children}
    </section>
  );
};

// Section Divider
interface DividerProps {
  label?: string;
  color?: 'red' | 'blue' | 'yellow' | 'black';
  className?: string;
}

export const SectionDivider: React.FC<DividerProps> = ({
  label,
  color = 'black',
  className = '',
}) => {
  const colorBar = {
    red: 'bg-[#D02020]',
    blue: 'bg-[#1040C0]',
    yellow: 'bg-[#F0C020]',
    black: 'bg-[#121212]',
  }[color];

  return (
    <div className={`w-full relative border-b-4 border-[#121212] ${className}`}>
      {label && (
        <div className="absolute -top-4 left-6 bg-[#121212] text-white text-xs font-black uppercase px-3 py-1 tracking-widest border border-white">
          {label}
        </div>
      )}
      <div className={`h-1.5 w-24 ${colorBar}`} />
    </div>
  );
};
