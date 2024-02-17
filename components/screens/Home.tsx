import { Button, StyleSheet } from "react-native";
import { MainStackScreenProps } from "../../navigation/types";
import { useGetAllPhotosQuery } from "../../store/reducers/photosApi";
import ErrorMessage from "../UIcomponents/ErrorMessage";
import PhotoList from "../UIcomponents/PhotoList";
import { useState } from "react";
import SearchElement from "../UIcomponents/SearchElement";
import { IPhotoItem } from "../interfaces";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import useAnimatedScrollValueFor from "../../hooks/animatedScroll";
// import { FIREBASE_AUTH } from "../../FirebaseConfig";
// import { useAppDispatch } from "../../hooks/redux";
// import { userActions } from "../../store/reducers/userReducer";
import auth from '@react-native-firebase/auth';

const SEARCH_HEIGHT = 50;
const PHOTO_PLACEHOLDER_DATA: IPhotoItem[] = Array(6)
  .fill({})
  .map((_, index) => ({ id: index, title: "", thumbnailUrl: "" }));

export default function Home({ navigation }: MainStackScreenProps<"Home">) {
  const { data: photos, isError, isLoading } = useGetAllPhotosQuery(100);
  const handleItemPress = (itemId: number) => {
    navigation.navigate("Details", { itemId: itemId });
  };
  const [searchText, setSearchText] = useState("");
  const { animatedValue: scrollY, handleScroll } =
    useAnimatedScrollValueFor(SEARCH_HEIGHT);
  const searchAnimatedStyles = useAnimatedStyle(() => {
    return {
      top: -scrollY.value,
    };
  });
  // const dispatch = useAppDispatch();
  const logOut = () => {
    // dispatch(userActions.saveUser(null))
    auth().signOut();
    // FIREBASE_AUTH.signOut();
  };

  if (isError) {
    return <ErrorMessage />;
  }

  console.log(`render Home `);
  return (
    <Animated.View style={styles.container}>
      <Button title="LogOut" onPress={logOut} />
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
      {!isLoading && (
        <SearchElement
          style={[styles.searchInput, searchAnimatedStyles]}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}
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
