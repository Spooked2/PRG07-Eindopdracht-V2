import {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsContext = createContext();

export default function SettingsContextProvider({ children }) {

    const [settings, setSettings] = useState({theme: 'standard', language: 'en'});

    const getSettings = async () => {

        const storedSettingsJson = await AsyncStorage.getItem('settings');

        if (!storedSettingsJson) {
            return {
                theme: 'standard',
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

    return (

        <SettingsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingsContext.Provider>

    );
}

export const useSettings = () => {
  return useContext(SettingsContext);
};
