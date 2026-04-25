'use client';

import { useI18n } from '@/lib/i18n-context';
import { type Locale, LOCALE_LABELS, LOCALE_FLAGS } from '@/lib/i18n';

const LOCALES: Locale[] = ['es', 'en', 'pt', 'fr', 'ar', 'zh'];

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-0.5">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={`px-1 py-0.5 rounded text-[10px] font-medium transition-colors ${
            locale === loc
              ? 'text-neon bg-neon/10'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
          }`}
          title={LOCALE_LABELS[loc]}
        >
          {LOCALE_FLAGS[loc]}
        </button>
      ))}
    </div>
  );
}
