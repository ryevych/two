import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const MAX_ROTATE = 5, INIT_ROTATE = 0;
const MAX_SCALE = 1.1, INIT_SCALE = 1;
const ANIMATION_DURATION = 150;

export default function useItemAnimation() {
  const rotateValue = useSharedValue(INIT_ROTATE);
  const scaleValue = useSharedValue(INIT_SCALE);

  const startAnimations = () => {
    stopAnimations();
    scaleValue.value = withRepeat(withTiming(MAX_SCALE, { duration: ANIMATION_DURATION }), 2, true);
    rotateValue.value = withSequence(withTiming(-MAX_ROTATE, { duration: ANIMATION_DURATION / 4 }), withTiming(INIT_ROTATE, { duration: ANIMATION_DURATION / 4 }), withTiming(MAX_ROTATE, { duration: ANIMATION_DURATION / 4 }), withTiming(INIT_ROTATE, { duration: ANIMATION_DURATION / 4 }));
  };

  const stopAnimations = () => {
    cancelAnimation(rotateValue);
    cancelAnimation(scaleValue);
    rotateValue.value = INIT_ROTATE;
    scaleValue.value = INIT_SCALE;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: rotateValue.value.toString() + 'deg' }, { scale: scaleValue.value }],
  }));

  return {
    startAnimations,
    stopAnimations,
    animatedStyle,
  };
}
