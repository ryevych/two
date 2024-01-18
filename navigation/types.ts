import {
  NavigatorScreenParams,
  CompositeScreenProps,
  RouteProp,
} from "@react-navigation/native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type {
  BottomTabScreenProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export type TarBarIcon = {
  [screen: string]: keyof typeof MaterialCommunityIcons.glyphMap;
};

export type MainStackParamList = {
  Home: undefined;
  Details: { itemId: number };
  ImagePreview: { url: string };
};

export type MainBottomTabParamList = {
  HomeTab: NavigatorScreenParams<MainStackParamList>;
  Favorites: undefined;
};

export type MainBottomTabScreenProps<T extends keyof MainBottomTabParamList> =
  BottomTabScreenProps<MainBottomTabParamList, T>;

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainStackParamList, T>,
    MainBottomTabScreenProps<keyof MainBottomTabParamList>
  >;

export type NavigatioContainerRouteProp = RouteProp<MainBottomTabParamList>;

export type TabScreenOptionType =
  | BottomTabNavigationOptions
  | ((props: {
    route: RouteProp<MainBottomTabParamList, keyof MainBottomTabParamList>;
    navigation: any;
  }) => BottomTabNavigationOptions)
  | undefined;

// export const StackScreens = {
//   Home: undefined,
//   Details: { itemId: "" },
// };
// export const BottomTabScreens = {
//   HomeTab: StackScreens,
//   Favorites: undefined,
// };

// export type MainStackParamList = {
//   [K in keyof typeof StackScreens]: (typeof StackScreens)[K];
// };
// export type MainBottomTabParamList = {
//   [K in keyof typeof BottomTabScreens]: (typeof BottomTabScreens)[K];
// };
