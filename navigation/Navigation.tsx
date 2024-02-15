import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../components/screens/Favorites";
import Details from "../components/screens/Details";
import Home from "../components/screens/Home";
import {
  MainBottomTabParamList,
  MainStackParamList,
  TarBarIcon,
  TabScreenOptionType,
} from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from "../components/screens/Login";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { userActions } from "../store/reducers/userReducer";

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

  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      dispatch(userActions.saveUser(user));
    });
    return unsub;
  }, [])

  const { user } = useAppSelector((state) => state.userReducer);
  console.log(JSON.stringify(user, null, 2));
  if (!user) { return <Login /> }

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
                {/* <MainStack.Group screenOptions={{ presentation: 'modal' }}>
                  <MainStack.Screen name="ImagePreview" component={ImagePreview} />
                </MainStack.Group> */}
              </MainStack.Group>
            </MainStack.Navigator>
          )}
        </MainBottomTab.Screen>
        <MainBottomTab.Screen name="Favorites" component={Favorites} />
      </MainBottomTab.Navigator>
    </NavigationContainer>
  );
}
