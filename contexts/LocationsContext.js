import {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";

const LocationsContext = createContext();

export default function LocationsContextProvider({ children }) {

    const {isConnected } = useNetInfo();
    const [locations, setLocations] = useState(false);

    const getLocations = async () => {

        const storedLocationsJson = await AsyncStorage.getItem('locations');
        const storedLocationsStoreTime = await AsyncStorage.getItem('locationsStoreTime');

        //Refresh the location data every 2 weeks
        //Only do this if there is an internet connection
        if (!storedLocationsJson || (Date.now() - parseInt(storedLocationsStoreTime ?? `${Date.now()}`)) >= 1209600000 && isConnected) {

            const data = await fetch('https://project.hosted.hr.nl/2023_2024/ressys_t14/PRG07-Backend/');

            const jsonData = await data.json();

            await AsyncStorage.setItem('locations', JSON.stringify(jsonData));
            await AsyncStorage.setItem('locationsStoreTime', `${Date.now()}`);

            return jsonData;

        } else if (!storedLocationsJson && !isConnected) {

            return false;

        }

        return JSON.parse(storedLocationsJson);

    }

    useEffect(() => {

        const loadLocations = async () => {
            const gotLocations = await getLocations();
            setLocations(gotLocations);
        }

        loadLocations();

    }, []);

    return (

        <LocationsContext.Provider value={{locations: locations, setLocations: setLocations}}>
            {children}
        </LocationsContext.Provider>

    );
}

export const useLocations = () => {
  return useContext(LocationsContext);
};
