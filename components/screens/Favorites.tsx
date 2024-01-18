import { StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import PhotoList from "../UIcomponents/PhotoList";
import { MainBottomTabScreenProps } from "../../navigation/types";

export default function Favorites({
  navigation,
}: MainBottomTabScreenProps<"Favorites">) {
  const { favorites } = useAppSelector((state) => state.favoriteReducer);
  const handleItemPress = (itemId: number) =>
    navigation.navigate("Details", { itemId: itemId });

  return (
    <PhotoList
      data={favorites}
      handleItemPress={handleItemPress}
      numColumns={2}
      isLoading={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
