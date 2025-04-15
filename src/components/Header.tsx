import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoCTM from './LogoCTM';
import {scale, vs, moderateScale, moderateVerticalScale, mvs} from 'react-native-size-matters';
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
                <Ionicons name="log-out-outline" size={mvs(40, 0.5)} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: vs(5),
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoutBtn: {
        flexDirection: 'row',
    },

});
