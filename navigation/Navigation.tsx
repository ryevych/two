import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../components/screens/Favorites";
import Details from "../components/screens/Details";
import Home from "../components/screens/Home";
import ImagePreview from "../components/screens/ImagePreview";
import {
  MainBottomTabParamList,
  MainStackParamList,
  TarBarIcon,
  TabScreenOptionType,
} from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Navigation() {
  const MainStack = createNativeStackNavigator<MainStackParamList>();
  const MainBottomTab = createBottomTabNavigator<MainBottomTabParamList>();

  const tabBarIconFocused: TarBarIcon = {
    HomeTab: "picture-in-picture-bottom-right",
    Favorites: "heart",
  };
  const tabBarIconUnfocused: TarBarIcon = {
    HomeTab: "picture-in-picture-bottom-right-outline",
    Favorites: "heart-outline",
  };

  const tabScreenOptions: TabScreenOptionType = ({ route }) => {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        const name = focused
          ? tabBarIconFocused[route.name]
          : tabBarIconUnfocused[route.name];
        return <MaterialCommunityIcons name={name} size={size} color={color} />;
      },
      tabBarLabelStyle: { fontSize: 14 },
    };
  };

  return (
    <NavigationContainer>
      <MainBottomTab.Navigator screenOptions={tabScreenOptions}>
        <MainBottomTab.Screen
          name="HomeTab"
          options={{
            headerShown: false,
            title: "Home",
          }}
        >
          {() => (
            <MainStack.Navigator>
              <MainStack.Group>
                <MainStack.Screen name="Home" component={Home} />
                <MainStack.Screen name="Details" component={Details} />
                <MainStack.Group screenOptions={{ presentation: 'modal' }}>
                  <MainStack.Screen name="ImagePreview" component={ImagePreview} />
                </MainStack.Group>
              </MainStack.Group>
            </MainStack.Navigator>
          )}
        </MainBottomTab.Screen>
        <MainBottomTab.Screen name="Favorites" component={Favorites} />
      </MainBottomTab.Navigator>
    </NavigationContainer>
  );
}
