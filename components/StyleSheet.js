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
        }
    });

}