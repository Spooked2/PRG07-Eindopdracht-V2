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

            <Text style={[styles.text, styles.header2, styles.centeredText]}>{title}</Text>

            <View style={styles.sidewaysList}>

                <FlatList
                    horizontal={true}
                    data={items}
                    renderItem={({item}) => <SidewaysListItem key={item.id} item={item} type={title}/>}

                />

                <Pressable onPress={goToIndex} style={styles.roundButton}>
                    <Text style={[styles.text, styles.centeredText, styles.header3]}>···</Text>
                </Pressable>

            </View>

        </View>
    )

}