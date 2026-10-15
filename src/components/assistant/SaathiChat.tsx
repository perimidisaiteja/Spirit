'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Scheme } from '@/data/schemes';
import { BauhausButton } from '@/components/bauhaus/BauhausButton';
import { BauhausBadge } from '@/components/bauhaus/BauhausBadge';
import { Send, Sparkles, Bot, User, ArrowRight, ExternalLink, RotateCcw } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  schemes?: Scheme[];
  timestamp: string;
}

const QUICK_PROMPTS = [
  "I am a farmer looking for equipment subsidies.",
  "My father is 68. What pension schemes may apply to him?",
  "I am unemployed and need free skill training.",
  "I run a small shop and want to know about government business assistance.",
  "I am a first-year engineering student in Andhra Pradesh looking for fee assistance."
];

interface SaathiChatProps {
  initialPrompt?: string;
  compact?: boolean;
}

export const SaathiChat: React.FC<SaathiChatProps> = ({ initialPrompt = '', compact = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Namaste! I am Saathi, your inclusive AI guide to Indian government schemes.\n\nTell me about your situation (e.g. occupation, age, state, or the specific financial or welfare assistance you need), and I will cross-reference verified Central and State programs for you.`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: ChatMessage = {
          id: 'assistant-' + Date.now(),
          role: 'assistant',
          content: data.reply,
          schemes: data.groundedSchemes,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('Response error');
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: 'assistant-' + Date.now(),
        role: 'assistant',
        content: `I experienced a temporary network issue. However, you can explore schemes by category or state directly using our search directory.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'init-reset',
        role: 'assistant',
        content: `Chat history cleared. How may I assist you today? Feel free to ask about scholarships, farming grants, loans, or pensions.`,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className={`flex flex-col bg-white border-4 border-[#121212] shadow-hard-lg overflow-hidden ${compact ? 'h-[500px]' : 'h-[680px]'}`}>
      {/* Bauhaus Chat Header */}
      <div className="bg-[#1040C0] text-white p-4 border-b-4 border-[#121212] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F0C020] border-2 border-black flex items-center justify-center text-black font-black shadow-[2px_2px_0_#121212]">
            <Bot className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-lg uppercase tracking-wider text-white">SAATHI AI</h3>
              <span className="bg-[#D02020] text-white text-[10px] font-black uppercase px-1.5 py-0.5 border border-black">
                CITIZEN ASSISTANT
              </span>
            </div>
            <p className="text-[11px] font-bold tracking-wide text-neutral-200 uppercase">
              GROUNDED IN 1,450+ VERIFIED CENTRAL & STATE SCHEMES
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearChat}
          className="p-1.5 bg-white text-black hover:bg-[#F0C020] border-2 border-black shadow-[2px_2px_0_#121212] transition-colors"
          title="Reset Conversation"
          aria-label="Reset Conversation"
        >
          <RotateCcw className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="bg-[#F0F0F0] border-b-2 border-black p-2.5 overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#121212] shrink-0">
          QUICK QUESTIONS:
        </span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="text-xs font-bold uppercase px-2.5 py-1 bg-white border-2 border-black shadow-[2px_2px_0_#121212] hover:bg-[#F0C020] transition-colors shrink-0 text-left"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 bg-[#F8F8F8]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                {msg.role === 'user' ? 'YOU (CITIZEN)' : 'SAATHI VERIFIED ASSISTANT'}
              </span>
              <span className="text-[9px] text-neutral-400 font-bold">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-3xl p-4 md:p-5 border-3 border-[#121212] text-sm md:text-base leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#1040C0] text-white shadow-hard-md'
                  : 'bg-white text-[#121212] shadow-hard-md'
              }`}
            >
              {/* Message text with basic markdown formatting */}
              <div className="whitespace-pre-wrap font-sans">
                {msg.content}
              </div>

              {/* Matched Scheme Cards rendered directly in chat */}
              {msg.schemes && msg.schemes.length > 0 && (
                <div className="mt-4 pt-4 border-t-2 border-black space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-[#121212]">
                    VERIFIED SCHEMES MATCHED IN DIRECTORY:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {msg.schemes.map((s) => (
                      <div
                        key={s.id}
                        className="bg-[#FFF9D6] border-2 border-black p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[2px_2px_0_#121212]"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <BauhausBadge variant={s.level === 'Central' ? 'central' : 'state'} size="sm">
                              {s.level}
                            </BauhausBadge>
                            <span className="text-xs font-black uppercase text-[#D02020]">
                              {s.benefitAmountDisplay}
                            </span>
                          </div>
                          <h4 className="font-black text-sm uppercase text-black line-clamp-1">
                            {s.name}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            href={`/schemes/${s.slug}`}
                            className="btn-bauhaus text-xs px-3 py-1.5 bg-[#D02020] text-white border-2 border-black shadow-hard-sm"
                          >
                            Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Link>
                          <a
                            href={s.officialPortalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-white border-2 border-black hover:bg-[#F0C020] shadow-hard-sm"
                            title="Visit Official Portal"
                          >
                            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-2">
            <div className="p-4 bg-white border-3 border-black shadow-hard-sm flex items-center gap-3">
              <div className="w-3 h-3 bg-[#D02020] animate-bounce" />
              <div className="w-3 h-3 bg-[#1040C0] animate-bounce [animation-delay:0.15s]" />
              <div className="w-3 h-3 bg-[#F0C020] animate-bounce [animation-delay:0.3s]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#121212]">
                Cross-referencing verified government criteria...
              </span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Chat Input Field */}
      <div className="p-4 bg-white border-t-4 border-[#121212]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question in English, Telugu, Hindi, etc... (e.g. I am a small artisan needing loans)"
            disabled={loading}
            className="flex-1 px-4 py-3 border-3 border-[#121212] bg-[#F0F0F0] text-black font-medium text-sm md:text-base placeholder:text-neutral-500 focus:bg-white focus:outline-none"
            aria-label="Saathi AI Question Input"
          />
          <BauhausButton
            type="button"
            onClick={() => handleSend()}
            disabled={loading || !inputValue.trim()}
            variant="red"
            size="md"
            icon={<Send className="w-4 h-4 stroke-[3]" />}
            iconPosition="right"
          >
            ASK
          </BauhausButton>
        </div>
        <div className="mt-2 text-[10px] uppercase font-bold text-neutral-500 tracking-wider flex items-center justify-between">
          <span>Official scheme retrieval • No personal data saved to external LLMs</span>
          <span>OpenAI / Grounded Heuristics</span>
        </div>
      </div>
    </div>
  );
};
