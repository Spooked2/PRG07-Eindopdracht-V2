import {FlatList, Text, View} from "react-native";
import {useSettings} from "../contexts/SettingsContext";
import getStyle from "./StyleSheet";
import {useTranslation} from "react-i18next";

export default function TitledList({title, items, translateItems = false}) {

    const {t} = useTranslation();

    const {settings} = useSettings();

    const styles = getStyle(settings.theme);

    return (
        <View style={styles.container}>

            <Text style={styles.text}>{title}</Text>

            <FlatList
                data={items}
                renderItem={({item}) => <Text style={styles.text}>{translateItems ? t(item) : item}</Text>}
            />


        </View>
    );

}