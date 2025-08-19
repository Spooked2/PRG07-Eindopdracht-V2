import getStyle from "../../components/StyleSheet"
import {View, Text} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import i18next from "i18next";
import DropDownPicker from "react-native-dropdown-picker";
import {useLocations} from "../../contexts/LocationsContext";

export default function NotesScreen({route}) {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    const [locationId, setLocationId] = useState(route.params?.locationId ?? 0);

    const [openLocation, setOpenLocation] = useState(false);
    const [locationValue, setLocationValue] = useState(locationId);
    const [locationItems, setLocationItems] = useState([]);

    const {locations} = useLocations();

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.getParent().setOptions({title: t('NOTES.TITLE')});
    }, [settings]);

    useEffect(() => {

        if (locations) {

            let parsedLocations = [];

            for (const location of locations) {

                parsedLocations.push({label: location.name, value: location.id})

            }

            setLocationItems(parsedLocations);

        }

    }, [locations]);

    useFocusEffect(
        useCallback(() => {

            if (route.params) {
                setLocationId(route.params.locationId);
                setLocationValue(route.params.locationId);
            }

        }, [route.params])
    );


    return (
        <View style={styles.container}>

            <Text style={styles.text}>{t('NOTES.TITLE')}</Text>

            <DropDownPicker
                setValue={setLocationValue}
                value={locationValue}
                items={locationItems}
                setItems={setLocationItems}
                open={openLocation}
                setOpen={setOpenLocation}
            />

        </View>
    );

}
