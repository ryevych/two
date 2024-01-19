import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IPhotoItem } from "../interfaces";
import { favoritesActions } from "../../store/reducers/favoriteReducer";
import { StyleProp, TextStyle } from "react-native";
import React, { useCallback } from "react";

import Animated, {
  FadeIn,
  Layout,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { ITEM_FADEIN_DURATION } from "../../config/appConfig";
import AnimatedIconsComponent from "./AnimatedIconsComponent";

interface IFavoritesComponentProps {
  item: IPhotoItem;
  style?: StyleProp<TextStyle>;
  size?: number;
  animated?: boolean;
}

const MAX_SCALE = 1.15;
const INIT_SCALE = 1;
const AnimatedMaterialCommunityIcons = Animated.createAnimatedComponent(MaterialCommunityIcons);

function FavoritesComponent({
  item,
  style = {},
  size = 25,
  animated = true,
}: IFavoritesComponentProps) {
  const { favorites } = useAppSelector((state) => state.favoriteReducer);

  const isFavorite = favorites.findIndex((el) => el.id === item.id) > -1;

  const scaleValue = useSharedValue(INIT_SCALE);

  const dispatch = useAppDispatch();
  const handleIconPress = useCallback(() => {
    isFavorite
      ? dispatch(favoritesActions.removeFromFavorites(item.id))
      : dispatch(favoritesActions.addToFavorites(item));
    if (animated) {
      cancelAnimation(scaleValue);
      scaleValue.value = INIT_SCALE;
      scaleValue.value = withRepeat(withTiming(MAX_SCALE), 3, true);
    }
  }, [isFavorite]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  console.log(`render heart with id ${item.id}`)
  return (
    <Animated.View
      style={[style]}
      layout={Layout}
      entering={FadeIn.duration(ITEM_FADEIN_DURATION)}
    >
      {/* <AnimatedMaterialCommunityIcons
        onPress={handleIconPress}
        name={isFavorite ? "heart" : "heart-outline"}
        size={size}
        style={animatedStyles}
      /> */}
      <AnimatedIconsComponent
        onPress={handleIconPress}
        name={isFavorite ? "heart" : "heart-outline"}
        size={size}
      // style={animatedStyles} 
      />
    </Animated.View>
  );
}

export default React.memo(FavoritesComponent);
