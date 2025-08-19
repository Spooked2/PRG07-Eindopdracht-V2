import getStyle from "../../components/StyleSheet"
import {View, Text, KeyboardAvoidingView, TextInput, Pressable} from "react-native";
import {useSettings} from "../../contexts/SettingsContext.js";
import { useTranslation } from 'react-i18next';
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import i18next from "i18next";

export default function NoteCreateScreen({ route }) {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {locationId} = route.params;

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    const [formData, setFormData] = useState({
        text: '',
        locationId: locationId,
        id: Math.floor(Date.now() * Math.random()),
        favorite: false
    });

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.setOptions({title: t('NOTES.CREATE.TITLE')});
    }, [settings]);

    const updateInput = (newInput) => {
        setFormData({...formData, ...{text: newInput}});
    }

    const submitForm = () => {
        console.log(formData);
    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <TextInput style={styles.text} multiline={true} onChangeText={updateInput}/>

            <Pressable onPress={submitForm}>
                <Text style={styles.text}>{t('NOTES.CREATE.SUBMIT')}</Text>
            </Pressable>

        </KeyboardAvoidingView>
    );

}