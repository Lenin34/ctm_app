import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoCTM from './LogoCTM';

type Props = {
    onLogout?: () => void;
};

export default function Header({ onLogout }: Props) {
    const handleLogout = () => {
        Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas salir?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Cerrar sesión', onPress: onLogout },
        ]);
    };

    return (
        <View style={styles.container}>
            <LogoCTM size="sm" />
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={45} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        right: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        paddingTop: 45,
        zIndex: 10,
    },
    logoutText: {
        color: '#fff',
        marginLeft: 6,
        fontWeight: 'bold',
    }

});
