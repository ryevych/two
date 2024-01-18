import {
  TouchableOpacity,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import React from "react";
import { IPhotoItem } from "../interfaces";
import FavoritesComponent from "./FavoritesComponent";
import useItemAnimation from "../../hooks/animation";
import { Skeleton } from "moti/skeleton";
import Animated, {
  FadeIn,
  Layout,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { DEFAULT_SHADOW, ITEM_FADEIN_DURATION } from "../../config/appConfig";

interface IPhotoItemProps {
  item: IPhotoItem;
  handleItemPress: (itemId: number) => void;
  animateItemOnLongPress: boolean;
  itemWidth: number;
  gap?: number;
  isLoading: boolean;
  viewableItems: Animated.SharedValue<ViewToken[]>;
}
const skeletonCommonProps = {
  colorMode: "light",
  backgroundColor: "#d4d4d4",
  transition: {
    type: "timing",
    duration: 2000,
  },
} as const;

function PhotoItem({
  item,
  handleItemPress,
  animateItemOnLongPress,
  itemWidth,
  gap = 0,
  isLoading,
  viewableItems,
}: IPhotoItemProps) {
  const { animatedStyle, startAnimations, stopAnimations } = useItemAnimation();
  const whloleItemAnimatedSTyle = useAnimatedStyle(() => {
    const iSVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((vitem) => vitem.item.id === item.id)
    );
    return {
      opacity: withTiming(iSVisible ? 1 : 0, { duration: 500 }),
      transform: [
        { scale: withTiming(iSVisible ? 1 : 0.9, { duration: 500 }) },
      ],
    };
  }, []);
  console.log(`render item ${item.id} ${isLoading}`);

  return (
    <Animated.View
      style={[
        whloleItemAnimatedSTyle,
      ]}
    >
      <TouchableOpacity
        style={[
          styles.container,
          DEFAULT_SHADOW,
          { width: itemWidth, margin: gap / 2 },
        ]}
        onLongPress={() => {
          if (animateItemOnLongPress) {
            startAnimations();
          }
        }}
        onPress={() => {
          if (animateItemOnLongPress) {
            stopAnimations();
          }
          handleItemPress(item.id);
        }}>
        <Skeleton.Group show={isLoading}>
          <Skeleton
            width={itemWidth * 0.8}
            height={itemWidth * 0.8}
            radius={"square"}
            {...skeletonCommonProps}
          >
            {!isLoading ? (
              <Animated.Image
                style={[styles.image, animateItemOnLongPress && animatedStyle]}
                source={{ uri: item.thumbnailUrl }}
                layout={Layout}
                entering={FadeIn.duration(ITEM_FADEIN_DURATION)}
              />
            ) : null}
          </Skeleton>
          <View style={styles.infoBlock}>
            <View style={[styles.textContainer, { width: itemWidth * 0.6 }]}>
              <Skeleton
                width={itemWidth * 0.6}
                height={40}
                {...skeletonCommonProps}
              >
                {!isLoading ? (
                  <Animated.Text
                    style={styles.text}
                    numberOfLines={2}
                    layout={Layout}
                    entering={FadeIn.duration(ITEM_FADEIN_DURATION)}
                  >
                    {item.title}
                  </Animated.Text>
                ) : null}
              </Skeleton>
            </View>
            <Skeleton
              width={35}
              height={35}
              radius={17.5}
              {...skeletonCommonProps}
            >
              {!isLoading ? (
                <FavoritesComponent item={item} style={styles.favorites} />
              ) : null}
            </Skeleton>
          </View>
        </Skeleton.Group>
      </TouchableOpacity>
    </Animated.View>
  );
}

// export default PhotoItem;
export default React.memo(PhotoItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  image: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
  infoBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    paddingTop: 5,
  },
  textContainer: {},
  text: {},
  favorites: {
    flexGrow: 0,
    width: 35,
    height: 35,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
