import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/constants/language";

async function loadResources() {
  const en = await import("./locales/en/translation.json");
  const ko = await import("./locales/ko/translation.json");

  return {
    en: { translation: en.default },
    ko: { translation: ko.default },
  };
}

const resources = await loadResources();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
    },
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
