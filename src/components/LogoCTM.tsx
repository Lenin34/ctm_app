import React from 'react';
import { Image, StyleProp, ImageStyle, StyleSheet, Dimensions } from 'react-native';
// @ts-ignore
import logoCTM from '../../assets/images/logo_ctm.png';

const { width } = Dimensions.get('window');

type Props = {
    size?: 'sm' | 'md' | 'lg';
    style?: StyleProp<ImageStyle>;
};

const sizes = {
    sm: width * 0.2,
    md: width * 0.3,
    lg: width * 0.4,
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
        marginBottom: 20,
    },
});
