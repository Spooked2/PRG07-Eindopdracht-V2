import getStyle from "../../components/StyleSheet"
import {View, Text} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import { useTranslation } from 'react-i18next';
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import i18next from "i18next";

export default function NotesScreen({ route }) {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {locationId} = route.params;

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.getParent().setOptions({title: t('NOTES.TITLE')});
    }, [settings]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('NOTES.TITLE')}</Text>
        </View>
    );

}
