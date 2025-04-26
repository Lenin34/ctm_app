// components/common/UserAvatar.tsx

import React from 'react';
import {Image, StyleSheet, TouchableOpacity, ImageStyle} from 'react-native';

type Props = {
    uri?: string | null;
    size?: number;
    style?: ImageStyle;
    onPress?: () => void;
};

export default function UserAvatar({uri, size = 100, style, onPress}: Props) {
    const avatar = (
        <Image
            source={
                uri
                    ? {uri}
                    : require('../../../assets/images/avatar-default.png') // Cambia por tu imagen default si quieres
            }
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: '#ccc',
                },
                style,
            ]}
        />
    );

    if (onPress) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                {avatar}
            </TouchableOpacity>
        );
    }

    return avatar;
}
