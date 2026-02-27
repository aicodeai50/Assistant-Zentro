"use client";

import { useMemo } from "react";
import { useOSState } from "@/components/os/useOSState";

export type Locale =
  | "en"
  | "es"
  | "fr"
  | "pt"
  | "de"
  | "it"
  | "nl"
  | "tr"
  | "ar"
  | "hi"
  | "zh"
  | "ja"
  | "ko";

type I18n = Partial<Record<Locale, string>>;

export function useOSLocale() {
  const [locale, setLocale] = useOSState<Locale>("os.locale", "en");
  return { locale, setLocale };
}

export default function OSSub({
  en,
  i18n,
  showEnglish = true,
}: {
  en: string;
  i18n?: I18n;
  showEnglish?: boolean;
}) {
  const { locale } = useOSLocale();

  const translated = useMemo(() => {
    if (!i18n) return "";
    if (locale === "en") return "";
    return i18n[locale] || "";
  }, [i18n, locale]);

  return (
    <div className="space-y-1">
      {showEnglish ? <div className="text-sm text-white/60">{en}</div> : null}
      {translated ? (
        <div className="text-xs text-white/45">
          {translated}
        </div>
      ) : null}
    </div>
  );
}
