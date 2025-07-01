import getStyle from "../components/StyleSheet"
import {View, Text} from "react-native";
import useSettings from "../contexts/SettingsContext.js";
import { useTranslation } from 'react-i18next';

export default function LocationScreen() {

    const {t} = useTranslation();

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('LOCATION_TITLE')}</Text>
        </View>
    );

}
