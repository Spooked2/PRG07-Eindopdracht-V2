import getStyle from "../components/StyleSheet"
import {View, Text, FlatList} from "react-native";
import {useSettings} from "../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import i18next from 'i18next';
import LocationItemSmall from "../components/LocationItemSmall";

export default function HomeScreen() {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();

    const styles = getStyle(settings.theme);

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.setOptions({title: t('HOME_TITLE')});
    }, [settings]);

    const [locations, setLocations] = useState(false);

    useEffect(() => {

        const fetchLocations = async () => {

            const data = await fetch('https://project.hosted.hr.nl/2023_2024/ressys_t14/PRG07-Backend/');

            const jsonData = await data.json();

            setLocations(jsonData);

        }

        fetchLocations();

    }, []);

    return (
        <View style={styles.container}>

            <Text style={styles.text}>{t('HOME_TITLE')}</Text>

            <View style={styles.container}>

                {
                    locations ? (
                        <FlatList
                            data={locations}
                            renderItem={({item}) => <LocationItemSmall navigator={navigator} key={item.id} location={item}/>}/>
                        )
                        :
                        (
                            <Text style={styles.text}>{t('HOME.LOADING')}</Text>
                        )
                }

            </View>

        </View>
    );

}
