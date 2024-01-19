import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureResponderEvent, StyleProp, TextStyle } from "react-native";
import React from "react";

import Animated from "react-native-reanimated";

interface AnimatedIconsComponentProps {
  size: number;
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  animatedStyles?: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>>;
  onPress: ((event: GestureResponderEvent) => void) | Animated.SharedValue<((event: GestureResponderEvent) => void) | undefined> | undefined;
}

const AnimatedIcons = Animated.createAnimatedComponent(MaterialCommunityIcons);

function AnimatedIconsComponent({
  onPress,
  name,
  size,
  animatedStyles = {},
}: AnimatedIconsComponentProps) {

  console.log(`render heart as pure component`)
  return (
    <AnimatedIcons
      onPress={onPress}
      style={animatedStyles}
      name={name}
      size={size}
    />
  );
}

export default React.memo(AnimatedIconsComponent);
