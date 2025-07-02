import {View, Text, FlatList} from "react-native";
import {useSettings} from "../contexts/SettingsContext";
import getStyle from "./StyleSheet";

export default function LocationItemSmall({location}) {

    const {settings} = useSettings();

    const styles = getStyle(settings.theme);

    return (
        <View style={styles.container}>

            <Text style={styles.text}>{location.name}</Text>

            <View>

                <FlatList
                    data={location.institutions}
                    renderItem={({item}) => <Text>{item}</Text>}
                />

            </View>

        </View>
    );

}