import getStyle from "../../components/StyleSheet"
import {View, Text, KeyboardAvoidingView, TextInput, Pressable, Switch} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import i18next from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLocations} from "../../contexts/LocationsContext";
import {useNotes} from "../../contexts/NotesContext";
import * as LocalAuthentication from 'expo-local-authentication';

export default function NoteCreateScreen({route}) {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {locationId} = route.params;

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    const {locations} = useLocations();
    const {notes, setNotes} = useNotes();

    const [formData, setFormData] = useState({
        text: '',
        locationId: locationId,
        id: Math.floor(Date.now() * Math.random()),
        favorite: false
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.setOptions({title: t('NOTES.CREATE.TITLE')});
    }, [settings]);

    const updateInput = (newInput) => {
        setFormData({...formData, ...{text: newInput}});
    };

    const toggleFavorite = () => {
        setFormData({...formData, ...{favorite: !formData.favorite}});
    };

    const submitForm = async () => {

        if (formData.text === '') {
            return;
        }

        const {success} = await LocalAuthentication.authenticateAsync({biometricsSecurityLevel: 'weak'});

        if (!success) {
            console.log('User could not be authenticated');
            return;
        }

        console.log('User has been authenticated');

        setNotes([...notes, formData]);

        setIsSubmitted(true);

    };

    useEffect(() => {

        const saveNotes = async () => {

            await AsyncStorage.setItem('notes', JSON.stringify(notes));

            const location = locations.find((loc) => loc.id === locationId);

            navigator.navigate('HomeScreens', {screen: 'LocationDetail', params: {location: location}});

        }

        if (isSubmitted) {

            saveNotes();

        }

    }, [notes]);

    return (
        <KeyboardAvoidingView style={styles.createNoteContainer}>

            <View style={styles.setting}>

                <Text style={[styles.text, styles.header1]}>{t('NOTES.CREATE.TEXT_LABEL')}</Text>

                <TextInput
                    style={[styles.containerText, styles.input]}
                    multiline={true}
                    onChangeText={updateInput}
                    placeholder={t('NOTES.CREATE.PLACEHOLDER')}
                />

            </View>

            <View style={styles.setting}>

                <Text style={[styles.text, styles.header2]}>{t('NOTES.CREATE.FAVORITE_LABEL')}</Text>

                <Switch onValueChange={toggleFavorite} value={formData.favorite}/>

            </View>

            <Pressable style={styles.button} onPress={submitForm}>
                <Text style={[styles.containerText, styles.centeredText, styles.header2]}>{t('NOTES.CREATE.SUBMIT')}</Text>
            </Pressable>

        </KeyboardAvoidingView>
    );

}