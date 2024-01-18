import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface SearchElementProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function SearchElement({
  searchText,
  setSearchText,
  style = {},
}: SearchElementProps) {
  const windowWidth = useWindowDimensions().width;
  const textInputWidth = useSharedValue(0);
  const [active, setActive] = useState(false);
  const onPress = () => {
    cancelAnimation(textInputWidth);
    active
      ? (textInputWidth.value = withTiming(0))
      : (textInputWidth.value = withTiming(windowWidth * 0.5));
    setActive((prevState) => !prevState);
  };
  const animatedStyles = useAnimatedStyle(() => ({
    width: textInputWidth.value,
  }));
  return (
    <Animated.View style={[styles.container, style]}>
      <LinearGradient colors={['#ffffffff', '#ffffffee', '#ffffffee']} style={styles.gradient} />
      <TouchableOpacity onPress={onPress}>
        <Image
          source={require("../../assets/icon_search.png")}
          style={[styles.image]}
        />
      </TouchableOpacity>
      <AnimatedTextInput
        value={searchText}
        onChangeText={setSearchText}
        style={[styles.searchInput, animatedStyles]}
        autoCapitalize="none"
        placeholder="Enter text here"
        inputMode="search"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    padding: 10,
  },
  gradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    tintColor: "red",
    width: 30,
    height: 30,
  },
  searchInput: {
    fontSize: 18,
    paddingVertical: 3,
    borderBottomWidth: 1,
  },
});
