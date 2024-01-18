import {
  FlatList,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken,
  StyleProp,
  ViewStyle,
} from "react-native";
import PhotoItem from "./PhotoItem";
import { IPhotoItem } from "../interfaces";
import React, { useCallback } from "react";
import Animated, { AnimatedStyleProp, SharedValue, useSharedValue } from "react-native-reanimated";

export interface IPhotoListProps {
  data: IPhotoItem[];
  handleItemPress: (itemId: number) => void;
  animateItemOnLongPress?: boolean;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  numColumns: number;
  isLoading: boolean;
  contentContainerStyle?: StyleProp<ViewStyle> | SharedValue<StyleProp<ViewStyle>>;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<IPhotoItem>);
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
  return (
    <AnimatedFlatList
      data={data}
      contentContainerStyle={contentContainerStyle}
      numColumns={numColumns}
      initialNumToRender={6}
      onViewableItemsChanged={onViewableItemsChanged}
      onScroll={onScroll}
      renderItem={({ item }) => (
        <PhotoItem
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
// export default React.memo(PhotoList);
