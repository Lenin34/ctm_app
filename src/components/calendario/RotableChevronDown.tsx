import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, SharedValue } from "react-native-reanimated";
import { ChevronDown } from "lucide-react-native";
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
            <ChevronDown color="white" size={mvs(20, 0.75)} strokeWidth={3} />
        </Animated.View>
    );
};

export default RotableChevronDown;
