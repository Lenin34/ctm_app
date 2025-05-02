import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, SharedValue } from "react-native-reanimated";
import { Feather } from '@expo/vector-icons';
import { mvs } from "react-native-size-matters";

type Props = {
    progress: SharedValue<number>;
};

const RotableChevronDown = ({ progress }: Props) => {
    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${progress.value * -180}deg` }],
    }));

    return (
        <Animated.View style={iconStyle}>
            <Feather name="chevron-down" size={mvs(20)} color="white" />
        </Animated.View>
    );
};

export default RotableChevronDown;
