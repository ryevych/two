import React, { useRef, useState } from "react";
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import Animated, {
    SharedValue,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";
// import Image from 'react-native-image-progress';

interface IItem {
    thumbnail: string;
    original: string;
}

interface ISimpleCarouselProps {
    data: IItem[];
    horizontal?: boolean;
    itemWidth: number;
    itemHeight: number;
    onStateChange?: (state: number) => void;
    containerStyle?: ViewStyle | ViewStyle[];
    decreaseFor?: SharedValue<number>;
}

const DOT_DIAMETR = 10;
const DOT_SPACING = 12;
const DOT_INDICATOR_DIAMETR = DOT_DIAMETR + DOT_SPACING;

// const AnimatedImage = Animated.createAnimatedComponent(Image);

function SimpleCarousel({
    data,
    horizontal = false,
    itemWidth,
    itemHeight,
    onStateChange = (state) => { },
    containerStyle = [],
    decreaseFor = useSharedValue(0),
}: ISimpleCarouselProps) {
    const scrollX = useSharedValue(0);
    const animatedItemWidth = useDerivedValue(() => itemWidth - decreaseFor.value)
    const animatedItemHeight = useDerivedValue(() => itemHeight - decreaseFor.value)

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollX.value = e.nativeEvent.contentOffset.x;
        const index = Math.round(scrollX.value / animatedItemWidth.value);
        setCurrentIndex(index);
        onStateChange(index);
    };

    const dotIndicatorAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(
                    scrollX.value,
                    [0, itemWidth],
                    [0, DOT_SPACING + DOT_DIAMETR]
                ),
            },
        ],
    }));

    const listRef = useRef<FlatList<IItem>>(null);

    const onDotPress = (index: number) => {
        listRef.current?.scrollToIndex({ index });
        setCurrentIndex(index);
        onStateChange(index);
    }

    const [currentIndex, setCurrentIndex] = useState(0);

    const animatedImageStyle = useAnimatedStyle(() => {
        return {
            width: animatedItemWidth.value,
            height: animatedItemHeight.value,
        }
    })
    console.log(itemWidth);
    return (
        <View style={[styles.imageContainer, containerStyle]}>
            <Animated.FlatList
                data={data}
                ref={listRef}
                horizontal={horizontal}
                snapToInterval={itemWidth}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={handleScroll}
                renderItem={({ item }) => {
                    return (
                        <Animated.View style={[styles.imageContainer, { width: itemWidth, height: animatedItemHeight }]}>
                            <Animated.Image
                                source={{ uri: item.original }}
                                style={[styles.image, animatedImageStyle]}
                            />
                        </Animated.View>
                    );
                }}
                keyExtractor={(_, index) => index.toString()}
            />
            <View style={styles.pagination}>
                {data.map((_, index) => {
                    return <TouchableOpacity key={index} style={[styles.dot]} onPress={() => onDotPress(index)} />;
                })}
                <Animated.View
                    style={[styles.dotIndicator, dotIndicatorAnimatedStyle]}
                />
            </View>
        </View>
    );
}

export default SimpleCarousel;

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    image: {
        overflow: 'hidden',
        resizeMode: "cover",
    },
    pagination: {
        position: "absolute",
        bottom: 15,
        flexDirection: "row",
        alignSelf: "center",
    },
    dot: {
        width: DOT_DIAMETR,
        height: DOT_DIAMETR,
        borderRadius: DOT_DIAMETR,
        backgroundColor: "red",
        marginRight: DOT_SPACING,
    },
    dotIndicator: {
        width: DOT_INDICATOR_DIAMETR,
        height: DOT_INDICATOR_DIAMETR,
        borderRadius: DOT_INDICATOR_DIAMETR,
        borderWidth: 2,
        borderColor: "red",
        position: "absolute",
        top: (DOT_DIAMETR - DOT_INDICATOR_DIAMETR) / 2,
        left: (DOT_DIAMETR - DOT_INDICATOR_DIAMETR) / 2,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // backgroundColor: 'rgba(255,255,255,0.2)',
    },
});
