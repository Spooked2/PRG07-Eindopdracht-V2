import {View, Text, FlatList} from "react-native";
import {useSettings} from "../contexts/SettingsContext";
import getStyle from "./StyleSheet";

export default function LocationItemSmall({location, navigator}) {

    const {settings} = useSettings();

    const styles = getStyle(settings.theme);

    const goToDetail = () => {

        navigator.navigate('LocationDetail', {location: location})

    }

    return (
        <View style={styles.locationItemSmall} onTouchEnd={goToDetail}>

            <Text style={[styles.containerText, styles.header2, styles.centeredText]}>{location.name}</Text>

            <View>

                <FlatList
                    data={location.institutions}
                    renderItem={({item}) => <Text style={[styles.containerText, styles.centeredText]}>{item}</Text>}
                />

            </View>

        </View>
    );

}