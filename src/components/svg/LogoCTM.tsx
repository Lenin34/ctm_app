import React from 'react';
import { Image, StyleProp, ImageStyle, StyleSheet, Dimensions } from 'react-native';
// @ts-ignore
import logoCTM from '../../../assets/images/logo_ctm.png';
import { vs, mvs } from 'react-native-size-matters';
const { width } = Dimensions.get('window');

type Props = {
    size?: 'sm' | 'md' | 'lg';
    style?: StyleProp<ImageStyle>;
};

const sizes = {
    sm: mvs(50, 0.5),
    md: mvs(100, 0.5),
    lg: mvs(150, 0.5),
};

export default function LogoCTM({ size = 'md', style }: Props) {
    const dimension = sizes[size];

    return (
        <Image
            source={logoCTM}
            style={[styles.logo, { width: dimension, height: dimension }, style]}
            resizeMode="contain"
        />
    );
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
    },
});
