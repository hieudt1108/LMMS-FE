import { Locale } from "date-fns";
import en from "date-fns/locale/en-US";
import vi from "date-fns/locale/vi";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const locales: { [key: string]: Locale } = { en, vi };

export function useDateLocale(): Locale | undefined {
  const [locale, setLocale] = useState<Locale | undefined>(undefined);
  const { i18n } = useTranslation();
  useEffect(() => {
    setLocale(locales[i18n.language]);
  }, [i18n.language]);
  return locale;
}
