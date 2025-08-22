import getStyle from "../../components/StyleSheet"
import {View, Text, Pressable} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import i18next from "i18next";
import TitledList from "../../components/TitledList";
import SidewaysList from "../../components/SidewaysList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNotes} from "../../contexts/NotesContext";

export default function LocationScreen({route}) {

    const {t} = useTranslation();

    const navigator = useNavigation();

    if (!route.params?.location) {
        navigator.navigate('HomeScreens', {screen: 'Home'});
    }

    const {location} = route.params;

    const {notes} = useNotes();

    const [locationNotes, setLocationNotes] = useState([]);
    // const [photos, setPhotos] = useState([]);

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    const sortAsyncStorageData = (a, b) => {

        if (a.favorite && !b.favorite) {
            return -1;
        }

        if (!a.favorite && b.favorite) {
            return 1;
        }

        return 0;

    }

    const goToMap = () => {

        navigator.navigate('Map', {location: location});

    }

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.setOptions({title: t('LOCATION.TITLE')});
    }, [settings]);

    useFocusEffect(
        useCallback(() => {

            const fetchAsyncStorageData = async () => {

                // const fetchedPhotosJSON = await AsyncStorage.getItem('photos');
                //
                // const fetchedPhotos = JSON.parse(fetchedPhotosJSON ?? '[]');

                const filteredNotes = notes.filter((note) => note.locationId === location.id);
                // const filteredPhotos = fetchedPhotos.filter((photo) => photo.locationId === location.id);

                //React native doesn't support the Array.toSorted method, but doesn't give any sort of error
                //It just stops running code past this and doesn't say anything
                //Why
                let sortedNotes = [...filteredNotes].sort(sortAsyncStorageData);
                // const sortedPhotos = [...filteredPhotos].sort(sortAsyncStorageData);

                sortedNotes = sortedNotes.slice(0, 3);

                setLocationNotes(sortedNotes);
                // setPhotos(sortedPhotos);

            }

            fetchAsyncStorageData();

        }, [notes])
    );


    return (
        <View style={styles.locationContainer}>

            <Text style={[styles.text, styles.header1]}>{location.name}</Text>

            <TitledList items={location.facilities} title={t('LOCATION.FACILITIES_TITLE')} translateItems={true}/>

            <TitledList items={location.institutions} title={t('LOCATION.INSTITUTIONS')}/>

            <SidewaysList
                items={locationNotes}
                indexScreen={'Note'}
                locationId={location.id}
                navigator={navigator}
                title={t('LOCATION.NOTES')}
            />

            {/*<SidewaysList*/}
            {/*    items={photos}*/}
            {/*    indexScreen={'Photo'}*/}
            {/*    locationId={location.id}*/}
            {/*    navigator={navigator}*/}
            {/*    title={'PHOTOS'}*/}
            {/*/>*/}

            <Pressable onPress={goToMap} style={styles.button}>
                <Text style={styles.containerText}>{t('LOCATION.MAP_BUTTON')}</Text>
            </Pressable>

        </View>
    );

}
