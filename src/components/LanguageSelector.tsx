'use client';

import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { type Locale, LOCALE_LABELS, LOCALE_FLAGS } from '@/lib/i18n';

const LOCALES: Locale[] = ['es', 'en', 'pt', 'fr', 'ar', 'zh'];

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-1.5 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Select language"
      >
        <span>{LOCALE_FLAGS[locale]}</span>
        <span className="hidden sm:inline text-[10px] uppercase font-medium">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-xl z-[100] py-1 min-w-[160px]">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setLocale(loc);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs hover:bg-muted/50 transition-colors ${
                locale === loc ? 'text-neon font-semibold' : 'text-foreground'
              }`}
            >
              <span>{LOCALE_FLAGS[loc]}</span>
              <span>{LOCALE_LABELS[loc]}</span>
              {locale === loc && (
                <span className="ml-auto text-neon text-[10px]">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
