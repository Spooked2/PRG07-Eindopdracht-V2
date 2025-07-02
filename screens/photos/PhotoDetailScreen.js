import getStyle from "../../components/StyleSheet"
import {View, Text} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import { useTranslation } from 'react-i18next';
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import i18next from "i18next";

export default function PhotoDetailScreen() {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.setOptions({title: t('PHOTOS.TITLE')});
    }, [settings]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('PHOTOS.TITLE')}</Text>
        </View>
    );

}
