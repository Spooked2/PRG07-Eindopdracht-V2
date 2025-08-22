import {createStackNavigator} from "@react-navigation/stack";
import {createStaticNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/locations/HomeScreen";
import LocationScreen from "./screens/locations/LocationScreen";
import MapScreen from "./screens/MapScreen";
import NotesScreen from "./screens/notes/NotesScreen";
import PhotosScreen from "./screens/photos/PhotosScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NoteDetailScreen from "./screens/notes/NoteDetailScreen";
import PhotoDetailScreen from "./screens/photos/PhotoDetailScreen";
import SettingsContextProvider from "./contexts/SettingsContext";
import LocationsContextProvider from "./contexts/LocationsContext";
import NoteCreateScreen from "./screens/notes/NoteCreateScreen";
import NotesContextProvider from "./contexts/NotesContext";

const HomeStack = createStackNavigator({
    screens: {
        Home: HomeScreen,
        LocationDetail: LocationScreen,
    },
    screenOptions: {
        headerShown: false
    }
});

const NoteStack = createStackNavigator({
    screens: {
        Notes: NotesScreen,
        NoteDetail: NoteDetailScreen,
        NoteCreate: NoteCreateScreen
    },
    screenOptions: {
        headerShown: false
    }
});

const PhotoStack = createStackNavigator({
    screens: {
        Photos: PhotosScreen,
        PhotoDetail: PhotoDetailScreen
    },
    screenOptions: {
        headerShown: false
    }
});

const RootTabs = createBottomTabNavigator({
    screens: {
        HomeScreens: HomeStack,
        Map: MapScreen,
        NoteScreens: NoteStack,
        PhotoScreens: PhotoStack,
        Settings: SettingsScreen,
    },
    screenOptions: {
        lazy: false,
        headerTitleAlign: 'center'
    }
});

const Navigation = createStaticNavigation(RootTabs);

export default function App() {

    return (
        <NotesContextProvider>
            <LocationsContextProvider>
                <SettingsContextProvider>
                    <Navigation/>
                </SettingsContextProvider>
            </LocationsContextProvider>
        </NotesContextProvider>
    );

}