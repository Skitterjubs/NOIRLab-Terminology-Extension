import { createContext, useEffect, useState, type ReactNode } from "react";
import browser from "webextension-polyfill";
import { type LanguageCode, LANGUAGE } from "@/types/language";
import { BROWSER_MESSAGE_TYPES } from "@/lib/constants";

export const LanguageContext = createContext<{
  lang: LanguageCode;
  toggleLanguage: () => Promise<void>;
}>({ lang: LANGUAGE.ENG, toggleLanguage: async () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LanguageCode>(LANGUAGE.ENG);

  useEffect(() => {
    async function getLanguage() {
      const { language }: { language: LanguageCode } =
        await browser.runtime.sendMessage({
          type: BROWSER_MESSAGE_TYPES.GET_LANGUAGE,
        });

      return language;
    }
    getLanguage().then((language) => setLang(language));
  }, []);

  async function toggleLanguage() {
    const { language }: { language: LanguageCode } =
      await browser.runtime.sendMessage({
        type: BROWSER_MESSAGE_TYPES.TOGGLE_LANGUAGE,
      });

    setLang(language);
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
