import i18next from 'i18next';
import {initReactI18next} from "react-i18next";
import translationEn from './en/translation.json';
import translationNl from './nl/translation.json';
import translationFr from './fr/translation.json';

i18next.use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: translationEn
            },
            nl: {
                translation: translationNl
            },
            fr: {
                translation: translationFr
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        supportedLngs: ['en', 'nl', 'fr'],
        interpolation: {
            escapeValue: false,
        },
        cleanCode: true,
        ns: ['translation'],
        defaultNS: 'translation',
        compatibilityJSON: 'v3'
    });
