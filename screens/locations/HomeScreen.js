import getStyle from "../../components/StyleSheet"
import {View, Text, FlatList} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import i18next from 'i18next';
import LocationItemSmall from "../../components/LocationItemSmall";
import {useLocations} from "../../contexts/LocationsContext";

export default function HomeScreen() {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();

    const styles = getStyle(settings.theme);

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.getParent().setOptions({title: t('HOME_TITLE')});
    }, [settings]);

    const {locations} = useLocations();

    return (
        <View style={styles.container}>


                {
                    locations ? (
                        <FlatList
                            data={locations}
                            numColumns={2}
                            columnWrapperStyle={styles.twoColumnList}
                            renderItem={({item}) => <LocationItemSmall navigator={navigator} key={item.id} location={item}/>}/>
                        )
                        :
                        (
                            <Text style={styles.text}>{t('HOME.LOADING')}</Text>
                        )
                }


        </View>
    );

}
