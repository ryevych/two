import { Button, View } from "react-native";
import { MainStackScreenProps } from "../../navigation/types";
import ImageView from "react-native-image-viewing";
import { useState } from "react";

export default function ImagePreview({ route, navigation }: MainStackScreenProps<"ImagePreview">) {
    const [visible, setVisible] = useState(false)
    const images = [{
        uri: route.params.url
    }]
    const onRequestClose = () => {
        setVisible(false);
        // navigation.goBack();
    }
    return (
        <View>
            <ImageView
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={onRequestClose}
            />
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
    )
}