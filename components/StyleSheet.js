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
            fontSize: 24,
        },
        header2: {
            fontSize: 20,
        },
        header3: {
            fontSize: 16
        },
        centeredText: {
            textAlign: 'center'
        },
        button: {
            backgroundColor: colors.containerBackground,
            borderRadius: 6,
            paddingVertical: 5,
            paddingHorizontal: 50
        },
        roundButton: {
            backgroundColor: colors.background,
            borderRadius: 50,
            maxHeight: 25,
            minHeight: 25,
            maxWidth: 25,
            minWidth: 25,
            justifyContent: "center",
            alignContent: "center"
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
            padding: 10,
            alignItems: 'center',
            backgroundColor: colors.containerBackground,
            width: '50%',
            height: 250,
            borderRadius: 6
        },
        locationContainer: {
            flex: 1,
            alignItems: "center",
            padding: 25,
            gap: 5
        },
        sidewaysList: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: colors.containerBackground,
            alignItems: "center",
            maxWidth: '80%',
            minWidth: '80%',
            minHeight: 100,
            maxHeight: 100,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 6
        },
        sidewaysListItem: {
            flex: 1,
            backgroundColor: colors.background,
            maxWidth: 80,
            minWidth: 80,
            maxHeight: 80,
            minHeight: 80,
            borderRadius: 6,
            marginRight: 10,
            padding: 5
        }
    });

}