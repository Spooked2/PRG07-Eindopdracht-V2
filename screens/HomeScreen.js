import getStyle from "../components/StyleSheet"
import {View, Text} from "react-native";
import useSettings from "../contexts/SettingsContext.js";
import I18n from "../lang/i18n";

export default function HomeScreen() {

    const t = I18n.t;

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('HOME_TITLE')}</Text>
        </View>
    );

}
