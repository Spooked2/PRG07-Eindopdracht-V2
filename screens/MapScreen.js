import getStyle from "../components/StyleSheet"
import {View, Text} from "react-native";
import {useSettings} from "../contexts/SettingsContext.js";
import {useTranslation} from 'react-i18next';
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import i18next from "i18next";
import MapView from "react-native-maps";
import {Marker} from "react-native-maps";
import {useLocations} from "../contexts/LocationsContext";

export default function MapScreen() {

    const {t} = useTranslation();

    const navigator = useNavigation();

    const {settings} = useSettings();

    const {theme} = settings;

    const styles = getStyle(theme);

    const {locations} = useLocations();

    useEffect(() => {
        i18next.changeLanguage(settings.language);
        navigator.setOptions({title: t('MAP.TITLE')});
    }, [settings]);

    return locations ? (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 51.91720484564559,
                    longitude: 4.4840949657534805,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >

                {locations.map((location, index) => (
                        <Marker
                            key={index}
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
