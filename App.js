import {createStackNavigator} from '@react-navigation/stack';
import {createStaticNavigation} from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen";

const stack = createStackNavigator({
    screens: {
        Home: HomeScreen,
    }
});

const Navigation = createStaticNavigation(stack);

export default function App() {

    return <Navigation/>;

}