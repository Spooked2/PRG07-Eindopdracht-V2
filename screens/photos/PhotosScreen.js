import getStyle from "../../components/StyleSheet"
import {View, Text} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import { useTranslation } from 'react-i18next';
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";

export default function PhotosScreen() {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    useEffect(() => {
        navigator.setOptions({title: t('PHOTOS.TITLE')});
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('PHOTOS.TITLE')}</Text>
        </View>
    );

}
