import getStyle from "../../components/StyleSheet"
import {View, Text, Pressable, FlatList} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import i18next from "i18next";
import DropDownPicker from "react-native-dropdown-picker";
import {useLocations} from "../../contexts/LocationsContext";
import {useNotes} from "../../contexts/NotesContext";
import SidewaysListItem from "../../components/SidewaysListItem";

export default function NotesScreen({route}) {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();
    const {notes} = useNotes();

    const {theme} = settings;

    const styles = getStyle(theme);

    const [locationId, setLocationId] = useState(route.params?.locationId ?? 0);
    const [filteredNotes, setFilteredNotes] = useState([]);

    const [openLocation, setOpenLocation] = useState(false);
    const [locationValue, setLocationValue] = useState(locationId);
    const [locationItems, setLocationItems] = useState([]);

    const {locations} = useLocations();

    const goToCreateScreen = () => {
        navigator.navigate('NoteScreens', {screen: 'NoteCreate', params: {locationId: locationId}});
    }

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

    useEffect(() => {

        setFilteredNotes(notes.filter((note) => note.locationId === locationValue));

    }, [locationValue]);

    useFocusEffect(
        useCallback(() => {

            if (route.params) {
                setLocationId(route.params.locationId);
                setLocationValue(route.params.locationId);
            }

        }, [route.params])
    );


    return (
        <View style={styles.notesContainer}>

            <View style={styles.setting}>

                <Text style={[styles.text, styles.header2]}>{t('NOTES.LOCATION')}</Text>

                <DropDownPicker
                    setValue={setLocationValue}
                    value={locationValue}
                    items={locationItems}
                    setItems={setLocationItems}
                    open={openLocation}
                    setOpen={setOpenLocation}
                />

            </View>

            <FlatList
                data={filteredNotes}
                numColumns={2}
                columnWrapperStyle={styles.twoColumnList}
                renderItem={({item}) =>
                    <View key={item.id} style={styles.locationItemSmall}>
                        <Text style={styles.containerText}>{item.text}</Text>
                    </View>
            }
            />

            <Pressable style={styles.containerRoundButton} onPress={goToCreateScreen}>
                <Text style={[styles.containerText, styles.header2]}>+</Text>
            </Pressable>

        </View>
    );

}
