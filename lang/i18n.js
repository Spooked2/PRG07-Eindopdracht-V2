import I18n from 'ex-react-native-i18n';
import en from './en.js';
import nl from './nl.js';
import fr from './fr.js';

I18n.fallbacks = true

I18n.translations = {
    en,
    nl,
    fr
}

export default I18n

