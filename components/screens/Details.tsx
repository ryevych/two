import {
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  View,
} from "react-native";
import { MainStackScreenProps } from "../../navigation/types";
import { useGetPhotoInfoQuery } from "../../store/reducers/photosApi";
import Loading from "../UIcomponents/Loading";
import ErrorMessage from "../UIcomponents/ErrorMessage";
import { IFullPhotoItem } from "../interfaces";
import FavoritesComponent from "../UIcomponents/FavoritesComponent";
import { useState } from "react";
import ImageView from "react-native-image-viewing";
import { ImageSource } from "react-native-image-viewing/dist/@types";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { IMG_TEST_ARRAY } from "../../config/appConfig";
import SimpleCarousel from "../UIcomponents/SimpleCarousel";

interface IImage {
  original: string;
}
const FAVORITES_SIZE = 44;

const AnimateTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Details({ route }: MainStackScreenProps<"Details">) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const {
    data: photo = {} as IFullPhotoItem,
    isError,
    isLoading,
  } = useGetPhotoInfoQuery(route.params.itemId);

  const { url, title } = photo;
  const images = [{ original: url, thumbnail: url }].concat(IMG_TEST_ARRAY);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);

  const getImageSource = (images: IImage[]): ImageSource[] =>
    images.map((image) =>
      typeof image.original === "number"
        ? image.original
        : { uri: image.original as string }
    );

  const handleImagePress = () => {
    setImagePreviewVisible(true);
  };

  const [imageIndex, setImageIndex] = useState(0);
  const handleCarouselState = (index: number) => {
    setImageIndex(index);
  }
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        entering={FadeInLeft.duration(500).delay(300)}>
        <SimpleCarousel
          data={images}
          itemWidth={windowWidth}
          itemHeight={windowWidth}
          horizontal={true}
          onStateChange={handleCarouselState}
        />
        <FavoritesComponent
          item={photo}
          style={[styles.favorites]}
          size={FAVORITES_SIZE}
        />
        <TouchableOpacity style={styles.zoomContainer}
          onPress={handleImagePress}>
          <Image style={styles.zoomImage} source={require("../../assets/icon_zoom.png")} />
        </TouchableOpacity>
        <ImageView
          images={getImageSource(images)}
          imageIndex={imageIndex}
          keyExtractor={(imageSrc, index) => imageSrc + index.toString()}
          visible={imagePreviewVisible}
          onRequestClose={() => setImagePreviewVisible(false)}
        />
      </Animated.View>
      <ScrollView>
        <Animated.Text
          style={styles.title}
          entering={FadeInLeft.duration(500).delay(400)}
        >
          {title}
        </Animated.Text>
        <Animated.Text
          style={styles.description}
          entering={FadeInLeft.duration(500).delay(600)}
        >
          {title} {title} {title} {title}{title} {title} {title}
        </Animated.Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
  },
  image: {
    resizeMode: "contain",
    flex: 1,
    aspectRatio: 1,
    borderRadius: 5,
  },
  favorites: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#ffffff50",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff90",
  },
  zoomContainer: {
    position: "absolute",
    right: 10,
    backgroundColor: "#ffffff50",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff90",
    bottom: 10,
  },
  zoomImage: {
    width: FAVORITES_SIZE,
    height: FAVORITES_SIZE,
    resizeMode: "contain",
    tintColor: 'black',
  },
  title: {
    fontSize: 30,
    paddingRight: 10,
    paddingLeft: 20,
    marginBottom: 10
  },
  description: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
