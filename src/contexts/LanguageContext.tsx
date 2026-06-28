import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { strings, type Lang, type StringKey } from '../i18n/strings';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: StringKey) => string;
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem('heirloom_lang', l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  }

  useEffect(() => {
    const saved = localStorage.getItem('heirloom_lang') as Lang | null;
    const initial = saved ?? 'ar';
    setLangState(initial);
    document.documentElement.dir = initial === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = initial;
  }, []);

  function t(key: StringKey): string {
    return strings[lang][key] as string;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isAr: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
