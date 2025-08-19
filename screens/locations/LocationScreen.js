import getStyle from "../../components/StyleSheet"
import {View, Text, Pressable} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import { useTranslation } from 'react-i18next';
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import i18next from "i18next";
import TitledList from "../../components/TitledList";
import SidewaysList from "../../components/SidewaysList";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LocationScreen({route}) {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {location} = route.params;

    if (!location) {
        navigator.navigate('HomeScreens', {screen: 'Home'});
    }

    const {notes, setNotes} = useState([]);
    const {photos, setPhotos} = useState([]);

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    const goToMap = () => {

        navigator.navigate('Map', {location: location});

    }

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.setOptions({title: t('LOCATION.TITLE')});
    }, [settings]);

    useEffect(() => {

        const fetchAsyncStorageData = async () => {

            const fetchedNotesJSON = await AsyncStorage.getItem('notes');
            const fetchedPhotosJSON = await AsyncStorage.getItem('photos');

            const fetchedNotes = JSON.parse(fetchedNotesJSON ?? '[]');
            const fetchedPhotos = JSON.parse(fetchedPhotosJSON ?? '[]');

            const filteredNotes = fetchedNotes.filter((note) => note.locationId === location.id);
            const filteredPhotos = fetchedPhotos.filter((photo) => photo.locationId === location.id);

            const sortAsyncStorageData = (a, b) => {

                if (a.favorite && !b.favorite) {
                    return -1;
                }

                if (!a.favorite && b.favorite) {
                    return 1;
                }

                return 0;

            }

            const sortedNotes = filteredNotes.toSorted(sortAsyncStorageData);
            const sortedPhotos = filteredPhotos.toSorted(sortAsyncStorageData);

            setNotes(sortedNotes);
            setPhotos(sortedPhotos);

        }

        fetchAsyncStorageData();

    }, []);

    return (
        <View style={styles.locationContainer}>
            <Text style={styles.text}>{location.name}</Text>

            <TitledList items={location.facilities} title={t('LOCATION.FACILITIES')} translateItems={true}/>

            <TitledList items={location.institutions} title={t('LOCATION.INSTITUTIONS')}/>

            <SidewaysList
                items={notes}
                indexScreen={'Note'}
                locationId={location.id}
                navigator={navigator}
                title={'NOTES'}
            />

            <SidewaysList
                items={photos}
                indexScreen={'Photo'}
                locationId={location.id}
                navigator={navigator}
                title={'PHOTOS'}
            />

            <Pressable onPress={goToMap}>
                <Text style={styles.text}>{t('LOCATION.MAP_BUTTON')}</Text>
            </Pressable>

        </View>
    );

}
