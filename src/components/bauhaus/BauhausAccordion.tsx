'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface BauhausAccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export const BauhausAccordion: React.FC<BauhausAccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    return items.filter((it) => it.defaultOpen).map((it) => it.id);
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`border-3 md:border-4 border-[#121212] transition-all duration-150 ${
              isOpen ? 'shadow-hard-md' : 'shadow-hard-sm'
            }`}
          >
            {/* Header Button */}
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={`w-full flex items-center justify-between text-left p-4 md:p-5 font-black uppercase tracking-wider text-base md:text-lg transition-colors select-none ${
                isOpen
                  ? 'bg-[#D02020] text-white'
                  : 'bg-white text-[#121212] hover:bg-[#F0F0F0]'
              }`}
              aria-expanded={isOpen}
            >
              <span className="pr-4">{item.title}</span>
              <div
                className={`p-1 shrink-0 border-2 border-[#121212] transition-transform duration-200 ${
                  isOpen ? 'bg-[#F0C020] text-[#121212] rotate-180' : 'bg-white text-[#121212]'
                }`}
              >
                <ChevronDown className="w-5 h-5 stroke-[3]" />
              </div>
            </button>

            {/* Expanded Content: light yellow background with black text and black top border */}
            {isOpen && (
              <div className="bg-[#FFF9D6] border-t-3 md:border-t-4 border-[#121212] p-5 md:p-6 text-[#121212] text-sm md:text-base leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
