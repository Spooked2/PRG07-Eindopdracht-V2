import getStyle from "../components/StyleSheet"
import {View, Text} from "react-native";
import {useSettings} from "../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import i18next from 'i18next';

export default function HomeScreen() {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();

    const styles = getStyle(settings.theme);

    useEffect(() => {
        navigator.setOptions({title: t('HOME_TITLE')});
    }, [settings]);

    useEffect(() => {
        i18next.changeLanguage(settings.language);
    }, [settings]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('HOME_TITLE')}</Text>
        </View>
    );

}
