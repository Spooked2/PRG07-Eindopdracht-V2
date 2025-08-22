import {StyleSheet} from 'react-native'
import * as themeColors from '../assets/themeColors.json';

export default function getStyle(theme) {

    const colors = themeColors[theme] ?? themeColors.standard;

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 10
        },
        text: {
            color: colors.text
        },
        containerText: {
            color: colors.containerText
        },
        header1: {
            fontSize: 20,
        },
        header2: {

        },
        header3: {

        },
        centeredText: {
            textAlign: 'center'
        },
        locationItemSmall: {
            flex: 1,
            backgroundColor: colors.containerBackground,
            padding: 20,
            marginBottom: 25,
            alignItems: "center",
            height: 150,
            maxWidth: '47%',
            overflow: "hidden",
            borderRadius: 6,
        },
        twoColumnList: {
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 25
        },
        map: {
            width: '100%',
            height: '100%'
        },
        titledList: {
            flex: 1,
            gap: 5,
            padding: 5,
            alignItems: 'center',
        },
        locationContainer: {
            flex: 1,
            alignItems: "center",
            padding: 25,
            gap: 5
        }
    });

}