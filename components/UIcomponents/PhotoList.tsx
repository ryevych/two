import {
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
  StyleProp,
  ViewStyle,
} from "react-native";
import { IPhotoItem } from "../interfaces";
import React, { useCallback } from "react";
import Animated, { AnimatedStyle, useSharedValue } from "react-native-reanimated";
import PhotoItemSkeletoned from "./PhotoItemSkeletoned";

export interface IPhotoListProps {
  data: IPhotoItem[];
  handleItemPress: (itemId: number) => void;
  animateItemOnLongPress?: boolean;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  numColumns: number;
  isLoading: boolean;
  contentContainerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

function PhotoList({
  data,
  handleItemPress,
  animateItemOnLongPress = true,
  onScroll = (e) => { },
  numColumns,
  isLoading,
  contentContainerStyle,
}: IPhotoListProps) {
  console.log(`render Photo List`);
  const windowWidth = useWindowDimensions().width;
  const gap = 10;
  const itemWidth = windowWidth / numColumns - gap;
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const onViewableItemsChanged = useCallback(
    ({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
      viewableItems.value = vItems;
    },
    []
  );

  // const getItemLayout = (data: ArrayLike<IPhotoItem> | null | undefined, index: number) => (
  //   {
  //     index,
  //     length: 400,
  //     offset: 400 * index,
  //   }
  // )
  return (
    <Animated.FlatList
      data={data}
      contentContainerStyle={contentContainerStyle}
      numColumns={numColumns}
      initialNumToRender={6}
      // getItemLayout={getItemLayout}
      onViewableItemsChanged={onViewableItemsChanged}
      onScroll={onScroll}
      renderItem={({ item }) => (
        <PhotoItemSkeletoned
          item={item}
          handleItemPress={handleItemPress}
          animateItemOnLongPress={animateItemOnLongPress}
          itemWidth={itemWidth}
          gap={gap}
          isLoading={isLoading}
          viewableItems={viewableItems}
        />
      )}
      keyExtractor={(item) =>
        item ? item.id.toString() : Math.random().toString()
      }
    />
  );
}

export default PhotoList;
