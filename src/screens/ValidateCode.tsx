import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import { validateStyles as styles } from '../styles/validateStyles';
import LogoCTM from '../components/LogoCTM';

export default function ValidateCode({ navigation }: any) {
    const [code, setCode] = useState('');

    const handleValidate = () => {
        if (code === '123456') {
            navigation.navigate('Success');
        } else {
            Alert.alert('❌ Código incorrecto', 'Verifica el código e intenta nuevamente.');
        }
    };

    return (
        <BaseScreen scroll={true}>
            <LogoCTM size="md" />
            <Text style={styles.title}>VERIFICACIÓN DE CÓDIGO</Text>
            <Text style={styles.description}>
                Hemos enviado un código de 6 dígitos a tu número registrado.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ingresa el código"
                keyboardType="numeric"
                maxLength={6}
                value={code}
                onChangeText={setCode}
            />

            <TouchableOpacity style={styles.validateBtn} onPress={handleValidate}>
                <Text style={styles.validateText}>VALIDAR</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.link}>¿No recibiste el código?</Text>
            </TouchableOpacity>
        </BaseScreen>
    );
}
