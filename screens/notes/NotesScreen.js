import getStyle from "../../components/StyleSheet"
import {View, Text} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import { useTranslation } from 'react-i18next';
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";

export default function NotesScreen() {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    useEffect(() => {
        navigator.setOptions({title: t('NOTES.TITLE')});
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('NOTES.TITLE')}</Text>
        </View>
    );

}
