import {createStackNavigator} from "@react-navigation/stack";
import {createStaticNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen";
import LocationScreen from "./screens/LocationScreen";
import MapScreen from "./screens/MapScreen";
import NotesScreen from "./screens/notes/NotesScreen";
import PhotosScreen from "./screens/photos/PhotosScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NoteDetailScreen from "./screens/notes/NoteDetailScreen";
import PhotoDetailScreen from "./screens/photos/PhotoDetailScreen";
import SettingsContextProvider from "./contexts/SettingsContext";

const Tabs = createBottomTabNavigator({
    screens: {
        Home: HomeScreen,
        Map: MapScreen,
        Notes: NotesScreen,
        Photos: PhotosScreen,
        Settings: SettingsScreen,
    }
});

const RootStack = createStackNavigator({
    screens: {
        Tabs: {
            screen: Tabs,
            options: {
                headerShown: false
            }
        },
        Home: HomeScreen,
        Map: MapScreen,
        Notes: NotesScreen,
        Photos: PhotosScreen,
        Settings: SettingsScreen,
        LocationDetail: LocationScreen,
        NoteDetail: NoteDetailScreen,
        PhotoDetail: PhotoDetailScreen
    }
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {

    return (
        <SettingsContextProvider>
            <Navigation/>
        </SettingsContextProvider>
    );

}