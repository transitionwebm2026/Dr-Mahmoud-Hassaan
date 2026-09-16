"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "dr-mahmoud-hassan-lang";

function persist(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore storage errors (private mode, disabled storage, etc.)
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    // Intentionally read + setState after mount rather than in a lazy
    // useState initializer: the server always renders the "ar" default,
    // so the first client render must match it exactly to avoid a
    // hydration mismatch. Updating here, after hydration, is the safe
    // pattern for a client-only persisted preference like this one.
    //
    // This effect only READS localStorage — it must never write here.
    // Persisting is handled by setLang/toggleLang instead, in response to
    // an explicit user action. Writing here too would race against this
    // same read on every mount (both effects fire in the same pass, before
    // this restore's state update has applied), permanently overwriting a
    // saved "en" preference with the still-default "ar" on any full page
    // reload — which is exactly what used to happen after navigating to a
    // route that doesn't exist yet and gets a real (non-SPA) 404 reload.
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "ar" || stored === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState(stored);
      }
    } catch {
      // localStorage unavailable — fall back to default "ar"
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persist(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      persist(next);
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      toggleLang,
      setLang,
    }),
    [lang, toggleLang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
