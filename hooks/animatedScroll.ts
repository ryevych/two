import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { clamp } from "../worklets/worklets";

export default function useAnimatedScrollValueFor(length: number, direction = 'y' as 'x' | 'y') {
    const animatedValue = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler<{ prev?: number }>({
        onBeginDrag: (event, ct) => {
            ct.prev = event.contentOffset[direction];
        },
        onScroll: (event, ct) => {
            let offsetInDirection = event.contentOffset[direction];
            if (offsetInDirection < 0) {
                offsetInDirection = 0;
            }
            const delta = offsetInDirection - (ct?.prev ?? 0);
            animatedValue.value = clamp(animatedValue.value + delta, 0, length);
            ct.prev = offsetInDirection;
        },
    });

    return {
        animatedValue,
        handleScroll
    }
}