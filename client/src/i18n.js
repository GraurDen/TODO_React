import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/translationEN.json';
import translationRU from './locales/translationRU.json';

import './i18n';

const resources = {
    en: {
        translation: translationEN,
    },
    ru: {
        translation: translationRU,
    },
};

i18n
    // Подключение бэкенда i18next
    .use(Backend)
    // Автоматическое определение языка
    .use(LanguageDetector)
    // модуль инициализации
    .use(initReactI18next)
    .init({
        resources,
        // Стандартный язык
        fallbackLng: 'en',
        lng: 'en',
        preload: ['en', 'ru'],
        ns: 'translation',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
