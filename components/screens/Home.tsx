import { StyleSheet } from "react-native";
import { MainStackScreenProps } from "../../navigation/types";
import { useGetAllPhotosQuery } from "../../store/reducers/photosApi";
import ErrorMessage from "../UIcomponents/ErrorMessage";
import PhotoList from "../UIcomponents/PhotoList";
import { useState } from "react";
import SearchElement from "../UIcomponents/SearchElement";
import { IPhotoItem } from "../interfaces";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { clamp } from "../../worklets/worklets";

const SEARCH_HEIGHT = 50;
const PHOTO_PLACEHOLDER_DATA: IPhotoItem[] = Array(6).fill({}).map((_, index) => ({ id: index, title: "", thumbnailUrl: "" }));

export default function Home({ navigation }: MainStackScreenProps<"Home">) {

  const { data: photos, isError, isLoading } = useGetAllPhotosQuery(100);
  const handleItemPress = (itemId: number) => {
    navigation.navigate("Details", { itemId: itemId });
  };
  const [searchText, setSearchText] = useState("");

  const scrollY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler<{ prevY?: number }>({
    onBeginDrag: (event, ctx) => {
      ctx.prevY = event.contentOffset.y;
    },
    onScroll: (event, ctx) => {
      let { y } = event.contentOffset;
      if (y < 0) {
        y = 0;
      }
      const dy = y - (ctx?.prevY ?? 0);
      scrollY.value = clamp(scrollY.value + dy, 0, SEARCH_HEIGHT);
      ctx.prevY = y;
    },
  });

  const searchAnimatedStyles = useAnimatedStyle(() => {
    return {
      top: -scrollY.value,
    };
  });

  if (isError) {
    return <ErrorMessage />;
  }
  console.log(`render Home `);

  return (
    <Animated.View style={[styles.container]} >
      <PhotoList
        data={
          photos
            ? photos.filter((item) => item.title.includes(searchText.trim()))
            : PHOTO_PLACEHOLDER_DATA
        }
        handleItemPress={handleItemPress}
        numColumns={2}
        isLoading={isLoading}
        onScroll={handleScroll}
        contentContainerStyle={{ paddingTop: SEARCH_HEIGHT }}
      />
      {!isLoading && <SearchElement style={[styles.searchInput, searchAnimatedStyles]} searchText={searchText} setSearchText={setSearchText} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchInput: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
