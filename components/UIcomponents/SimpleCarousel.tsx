import React, { useRef, useState } from "react";
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import Image from 'react-native-image-progress';

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
}

const DOT_DIAMETR = 10;
const DOT_SPACING = 12;
const DOT_INDICATOR_DIAMETR = DOT_DIAMETR + DOT_SPACING;

function SimpleCarousel({
    data,
    horizontal = false,
    itemWidth,
    itemHeight,
    onStateChange = (state) => { }
}: ISimpleCarouselProps) {
    const scrollX = useSharedValue(0);

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollX.value = e.nativeEvent.contentOffset.x;
        const index = Math.round(scrollX.value / itemWidth);
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

    return (
        <View>
            <FlatList
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
                        <Image
                            source={{ uri: item.original }}
                            style={[styles.image, { width: itemWidth, height: itemHeight }]}
                        />
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
    image: { resizeMode: "cover" },
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
});
