import getStyle from "../components/StyleSheet"
import {View, Text} from "react-native";
import {useSettings} from "../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import themeColors from '../assets/themeColors.json';
import i18next from 'i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings, setSettings} = useSettings();

    const fetchedStyles = getStyle(settings.theme);
    const [styles, setStyles] = useState(fetchedStyles);

    const themes = [];

    for (const key in themeColors) {
        themes.push({label: key, value: key});
    }

    const [settingsLoaded, setSettingsLoaded] = useState(false);
    const [openTheme, setOpenTheme] = useState(false);
    const [themeValue, setThemeValue] = useState(settings.theme);
    const [themeItems, setThemeItems] = useState(themes);

    const [openLanguage, setOpenLanguage] = useState(false);
    const [languageValue, setLanguageValue] = useState(settings.language);
    const [languageItems, setLanguageItems] = useState([
        {label: 'English', value: 'en'},
        {label: 'Nederlands', value: 'nl'},
        {label: 'Français', value: 'fr'}
    ]);

    useEffect(() => {

        const getSettings = async () => {

            const storedSettingsJson = await AsyncStorage.getItem('settings');

            if (!storedSettingsJson) {
                setSettings({
                    theme: 'standard',
                    language: 'en'
                });
            }

            setSettings(JSON.parse(storedSettingsJson));
            setSettingsLoaded(true);

        }

        getSettings();

    }, []);

    useEffect(() => {

        if (settingsLoaded) {

            setThemeValue(settings.theme);
            setLanguageValue(settings.language);

        }

    }, [settingsLoaded]);

    useEffect(() => {

        if (settingsLoaded) {
            setSettings({theme: themeValue, language: languageValue});
        }

    }, [themeValue, languageValue]);

    useEffect(() => {

        const saveSettings = async () => {

            await AsyncStorage.setItem('settings', JSON.stringify(settings));
            setStyles(getStyle(settings.theme));

        }

        if (settingsLoaded) {
            saveSettings();
            i18next.changeLanguage(settings.language);
            navigator.setOptions({title: t('SETTINGS.TITLE')});
        }

    }, [settings]);

    const onOpenThemeDropdown = useCallback(() => {
        setOpenLanguage(false);
    }, []);

    const onOpenLanguageDropdown = useCallback(() => {
        setOpenTheme(false);
    }, []);

    return (
        <View style={styles.settingsContainer}>

            <View style={styles.setting}>

                <Text style={[styles.text, styles.header2]}>{t('SETTINGS.THEME')}</Text>

                <DropDownPicker
                    setValue={setThemeValue}
                    value={themeValue}
                    items={themeItems}
                    setItems={setThemeItems}
                    open={openTheme}
                    setOpen={setOpenTheme}
                    onOpen={onOpenThemeDropdown}
                    zIndex={3}
                />

            </View>

            <View style={styles.setting}>

                <Text style={[styles.text, styles.header2]}>{t('SETTINGS.LANGUAGE')}</Text>

                <DropDownPicker
                    setValue={setLanguageValue}
                    value={languageValue}
                    items={languageItems}
                    setItems={setLanguageItems}
                    open={openLanguage}
                    setOpen={setOpenLanguage}
                    onOpen={onOpenLanguageDropdown}
                    zIndex={2}
                />

            </View>

        </View>
    );

}
