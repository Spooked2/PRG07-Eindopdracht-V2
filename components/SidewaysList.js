import {FlatList, Pressable, Text, View} from "react-native";
import {useSettings} from "../contexts/SettingsContext";
import getStyle from "./StyleSheet";
import SidewaysListItem from "./SidewaysListItem";


export default function SidewaysList({title, items, locationId, indexScreen, navigator}) {

    const {settings} = useSettings();

    const styles = getStyle(settings.theme);

    const goToIndex = () => {

        navigator.navigate((indexScreen + 'Screens'), {screen: (indexScreen + 's'), params: {locationId: locationId}});

    }

    return (
        <View style={styles.container}>

            <Text style={styles.text}>{title}</Text>

            <View style={styles.container}>

                <FlatList
                    horizontal={true}
                    data={items}
                    renderItem={({item}) => <SidewaysListItem key={item.id} item={item} type={title}/>}

                />

                <Pressable onPress={goToIndex}>
                    <Text style={styles.text}>...</Text>
                </Pressable>

            </View>

        </View>
    )

}