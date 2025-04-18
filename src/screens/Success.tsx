import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import { successStyles as styles } from '../styles/successStyles';
import * as Animatable from 'react-native-animatable';
// @ts-ignore
import logoCTM from '../../assets/images/logo_ctm.png';
import LogoCTM from "../components/svg/LogoCTM";

export default function Success({ navigation }: any) {
    return (
        <BaseScreen scroll={false}>
            <Animatable.View
                animation="bounceIn"
                duration={1500}
                style={styles.container}
            >
                <LogoCTM />
                <Text style={styles.title}>¡Registro exitoso!</Text>
                <Text style={styles.description}>
                    Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>IR A INICIAR SESIÓN</Text>
                </TouchableOpacity>
            </Animatable.View>
        </BaseScreen>
    );
}
