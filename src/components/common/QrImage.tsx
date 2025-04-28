// components/common/QrImage.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type Props = {
    value: string;
    size?: number;
    backgroundColor?: string;
    padding?: number;
};

export default function QrImage({
                                    value,
                                    size = 160,
                                    backgroundColor = 'white',
                                    padding = 10,
                                }: Props) {
    return (
        <View style={[styles.container, { backgroundColor, padding }]}>
            <QRCode value={value} size={size} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        alignSelf: 'center',
    },
});
