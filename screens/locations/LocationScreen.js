import getStyle from "../../components/StyleSheet"
import {View, Text} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import { useTranslation } from 'react-i18next';
import {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import i18next from "i18next";
import TitledList from "../../components/TitledList";

export default function LocationScreen({route}) {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {location} = route.params;

    if (!location) {
        navigator.navigate('HomeScreens', {screen: 'Home'});
    }

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.setOptions({title: t('LOCATION.TITLE')});
    }, [settings]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{location.name}</Text>

            <TitledList items={location.facilities} title={t('LOCATION.FACILITIES')} translateItems={true}/>

            <TitledList items={location.institutions} title={t('LOCATION.INSTITUTIONS')}/>

        </View>
    );

}
