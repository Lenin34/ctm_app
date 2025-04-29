import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function ActivityOverlay() {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#4FC6C0" />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
});
