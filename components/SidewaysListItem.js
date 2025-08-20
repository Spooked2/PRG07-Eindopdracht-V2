import {Text, View} from "react-native";
import getStyle from "./StyleSheet";
import {useSettings} from "../contexts/SettingsContext";

export default function SidewaysListItem({item, type}) {

    const {settings} = useSettings();


    const {theme} = settings;

    const styles = getStyle(theme);

    return (
      <View style={styles.container}>

          <Text style={styles.text}>{item.text}</Text>

      </View>
    );

}