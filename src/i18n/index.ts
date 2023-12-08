import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./en.json";
import hiTranslation from "./hi.json";
import urTranslation from "./ur.json";
import arTranslation from "./ar.json";

export const resources = {
  en: {
    translation: enTranslation,
  },
  ur: {
    translation: urTranslation,
  },
  ar: {
    translation: arTranslation,
  },
  hi: {
    translation: hiTranslation,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
  resources,
});

export { i18n }