import getStyle from "../components/StyleSheet"
import {View} from "react-native";
import {useSettings} from "../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useRef, useState} from "react";
import i18next from "i18next";
import MapView, {Marker} from "react-native-maps";
import {useLocations} from "../contexts/LocationsContext";
import * as Location from 'expo-location';

export default function MapScreen({ route }) {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    const {locations} = useLocations();

    const [focusLocation, setFocusLocation] = useState(false);
    const [allowUserLocation, setAllowUserLocation] = useState(false);

    const mapRef = useRef();

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.setOptions({title: t('MAP.TITLE')});
    }, [settings]);

    useEffect(() => {

        const handlePermissions = async () => {

            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                setAllowUserLocation(true);
            }

        }

        handlePermissions();

    }, []);

    useEffect(() => {

        if (focusLocation) {

            mapRef.current?.animateToRegion({
                latitude: focusLocation.latitude,
                longitude: focusLocation.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002
            })


        }

    }, [focusLocation]);

    useFocusEffect(
        useCallback(() => {

            if (route.params?.location) {
                setFocusLocation(route.params.location.coordinates);
            }

        }, [route.params])
    );

    return locations ? (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 51.91720484564559,
                    longitude: 4.4840949657534805,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                }}
                mapType={"standard"}
                showsUserLocation={allowUserLocation}
                ref={mapRef}
            >

                {locations.map(location => (
                    <Marker
                        key={location.id}
                        coordinate={location.coordinates}
                        title={location.name}
                        description={''}
                    />
                ))}

            </MapView>

        </View>
    ) : (
        <View style={styles.container}>

        </View>
    );

}
