'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type Locale, getTranslation, type TranslationKeys, LOCALE_DIRS } from '@/lib/i18n';

interface I18nContextType {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  dir: string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'es',
  t: getTranslation('es'),
  setLocale: () => {},
  dir: 'ltr',
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    const saved = localStorage.getItem('verinews-locale') as Locale | null;
    if (saved && ['es', 'en', 'pt', 'fr', 'ar', 'zh'].includes(saved)) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = LOCALE_DIRS[saved];
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('verinews-locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = LOCALE_DIRS[newLocale];
  };

  const t = getTranslation(locale);
  const dir = LOCALE_DIRS[locale];

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
