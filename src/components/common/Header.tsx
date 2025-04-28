import React from 'react';
import {View, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import LogoSN from '../svg/LogoSN';
import {mvs, vs} from 'react-native-size-matters';
import {useAuth} from '../../context/AuthContext';


interface HeaderProps {
    onLogout?: () => void
}

export default function Header({onLogout}: HeaderProps) {
    const {logout} = useAuth();

    const handleLogout = () => {
        Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas salir?', [
            {text: 'Cancelar', style: 'cancel'},
            {text: 'Cerrar sesión', onPress: logout},
        ]);
    };

    return (
        <View style={styles.container}>
            <LogoSN size="sm"/>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={mvs(35, 0.5)} color="#fff"/>
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
