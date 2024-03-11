import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {},
});

export default i18n;