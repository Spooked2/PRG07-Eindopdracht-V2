import {View, Text, FlatList} from "react-native";
import {useSettings} from "../contexts/SettingsContext";
import getStyle from "./StyleSheet";

export default function LocationItemSmall({location, navigator}) {

    const {settings} = useSettings();

    const styles = getStyle(settings.theme);

    const goToDetail = () => {

        navigator.navigate('LocationDetail', {params: {location}})

    }

    return (
        <View style={styles.container} onTouchEnd={goToDetail}>

            <Text style={styles.text}>{location.name}</Text>

            <View>

                <FlatList
                    data={location.institutions}
                    renderItem={({item}) => <Text style={styles.text}>{item}</Text>}
                />

            </View>

        </View>
    );

}