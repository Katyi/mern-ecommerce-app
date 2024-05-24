import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nBackend from "i18next-http-backend";
import LanguageDetector from 'i18next-browser-languagedetector';

const bundledResources = {
  en: {
    translation: {
      shopTitle: "SHOP",
        navbarSearchPlaceholder: "Search",
        navbarAccount: "Your Account",
        navbarOut: "Out",
        navbarOpenWishList: "Wishlist",
        navbarOpenCart: "Cart",
        AnnouncementText: "Super Deal! Free Shipping on Orders Over $50",
    }
  },
  ru: {
    translation: {
      shopTitle: "МАГАЗИН",
      navbarSearchPlaceholder: "Поиск",
      navbarAccount: "Мой кабинет",
      navbarOut: "Выход",
      navbarOpenWishList: "Избранное",
      navbarOpenCart: "Корзина",
      AnnouncementText: "Супер предложение! Бесплатная доставка при заказе на сумму более 5000 Р"
    }
  },
};

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .use(LanguageDetector) // Autommatically detects the browser's language
  .init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true
    },
    backend: {
      loadPath: "http://localhost:5173/src/data/{{lng}}/translation.json",
    },
});

export default i18n;