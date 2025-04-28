// components/common/Title.tsx

import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { ms } from 'react-native-size-matters';

type Props = {
    text: string;
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    center?: boolean;
};

export default function Title({ text, size = 'lg', color = '#001f2e', center = true }: Props) {
    const fontSize = size === 'sm' ? ms(16) : size === 'md' ? ms(20) : ms(24);

    const style: TextStyle = {
        fontSize,
        fontWeight: 'bold',
        color,
        textAlign: center ? 'center' : 'left',
        marginBottom: ms(16),
    };

    return <Text style={[styles.title, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
    title: {
        marginBottom: ms(10),
    },
});
