import {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useSettings() {

    const [settings, setSettings] = useState({theme: 'light', language: 'en'});

    const getSettings = async () => {

        const storedSettingsJson = await AsyncStorage.getItem('settings');

        if (!storedSettingsJson) {
            return {
                theme: 'light',
                language: 'en'
            };
        }

        return JSON.parse(storedSettingsJson);

    }

    useEffect(() => {

        const loadSettings = async () => {
            const gotSettings = await getSettings();
            setSettings(gotSettings);
        }

        loadSettings();

    }, []);

    useEffect(() => {

        const saveSettings = async () => {

            await AsyncStorage.setItem('settings', JSON.stringify(settings));

        }

        saveSettings();

    }, [settings])

    return {settings, setSettings};
}
