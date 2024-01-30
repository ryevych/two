import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureResponderEvent, StyleProp, TextStyle, View } from "react-native";
import React from "react";
import Animated, { SharedValue, cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

const MAX_SCALE = 1.15;
const INIT_SCALE = 1;

export interface AnimatedIconsComponentPartitionalProps {
  size?: number;
  style?: StyleProp<TextStyle>;
  animated?: boolean;
}
interface AnimatedIconsComponentProps extends AnimatedIconsComponentPartitionalProps {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: ((event: GestureResponderEvent) => void) | SharedValue<((event: GestureResponderEvent) => void)>;
}

const AnimatedIcons = Animated.createAnimatedComponent(MaterialCommunityIcons);

function AnimatedIconsComponent({
  name,
  size = 25,
  style = {},
  animated = true,
  onPress,
}: AnimatedIconsComponentProps) {

  const scaleValue = useSharedValue(INIT_SCALE);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  const startAnimation = () => {
    if (animated) {
      cancelAnimation(scaleValue);
      scaleValue.value = INIT_SCALE;
      scaleValue.value = withRepeat(withTiming(MAX_SCALE), 2, true);
    }
  }

  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      if (typeof onPress === 'function') {
        onPress(e);
      } else if (typeof onPress.value === 'function') {
        onPress.value(e);
      }
    }
    startAnimation();
  }

  console.log(`render heart as pure component`)
  return (
    <View
      style={[style]}
    >
      <AnimatedIcons
        onPress={handlePress}
        style={animatedStyles}
        name={name}
        size={size}
      />
    </View>
  );
}

export default React.memo(AnimatedIconsComponent);
