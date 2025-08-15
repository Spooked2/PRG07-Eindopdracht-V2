import {StyleSheet} from 'react-native'
import * as themeColors from '../assets/themeColors.json';

export default function getStyle(theme) {

    const colors = themeColors[theme] ?? themeColors.standard;

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        text: {
            color: colors.text
        },
        locationItemSmall: {
            flex: 1,
            backgroundColor: colors.containerBackground,
            padding: 20,
            alignItems: "center",
            height: 150,
            width: 150,
            overflow: "hidden"
        },
        twoColumnList: {
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 25
        }
    });

}