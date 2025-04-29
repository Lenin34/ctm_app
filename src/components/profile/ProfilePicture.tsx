import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolateColor,
    Easing,
} from 'react-native-reanimated';

interface ProfilePictureProps {
    photoUri?: string;
    onPressChangePhoto: () => void;
}

export default function ProfilePicture({ photoUri, onPressChangePhoto }: ProfilePictureProps) {
    const colorAnim = useSharedValue(0);
    const glowAnim = useSharedValue(1);

    const animatedBorderStyle = useAnimatedStyle(() => {
        const borderColor = interpolateColor(
            colorAnim.value,
            [0, 1],
            ['#F8931E', '#4FC6C0']
        );

        return {
            borderColor: photoUri ? '#02AF14' : borderColor,
            borderWidth: 3,
        };
    });

    const animatedGlowStyle = useAnimatedStyle(() => {
        return {
            shadowColor: photoUri ? '#02AF14' : '#F8931E',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: photoUri ? 0.5 : 0.8,
            shadowRadius: glowAnim.value * 12,
            elevation: glowAnim.value * 6, // Android
        };
    });

    React.useEffect(() => {
        if (!photoUri) {
            colorAnim.value = withRepeat(
                withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
                -1,
                true
            );
            glowAnim.value = withRepeat(
                withTiming(1.5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
                -1,
                true
            );
        } else {
            colorAnim.value = withTiming(0, { duration: 300 });
            glowAnim.value = withTiming(1, { duration: 300 });
        }
    }, [photoUri]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.pictureWrapper, animatedBorderStyle, animatedGlowStyle]}>
                <TouchableOpacity onPress={onPressChangePhoto}>
                    <Image
                        source={photoUri ? { uri: photoUri } : require('../../../assets/images/avatar-default.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        alignItems: 'center',
    },
    pictureWrapper: {
        borderRadius: 80,
        padding: 3,
        backgroundColor: '#fff',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ccc',
    },
});
