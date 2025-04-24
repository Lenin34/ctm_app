import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import { validateStyles as styles } from '../styles/validateStyles';
import LogoSN from '../components/svg/LogoSN';
import { Ionicons } from '@expo/vector-icons';
import { vs } from 'react-native-size-matters';
import { resendCode, verifyCode } from '../services/userService';
import { ActivityIndicator } from 'react-native';

export default function ValidateCode({ navigation, route }: any) {
    const userId = route.params?.userId;
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer === 0) {
            setCanResend(true);
            return;
        }
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleValidate = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const result = await verifyCode(userId, code);
        setLoading(false);

        if (result.error) {
            setError(result.msg || 'Código incorrecto');
            return;
        }

        setSuccess(true);
        setTimeout(() => navigation.navigate('Success'), 700);
    };

    const handleResend = async () => {
        setCanResend(false);
        setTimer(60);
        const result = await resendCode(userId);
        if (!result.error) {
            Alert.alert('Código reenviado', 'Revisa tu celular');
        } else {
            Alert.alert('Error', result.msg);
        }
    };

    return (
        <BaseScreen scroll>
            <View style={{ alignItems: 'center' }}>
                <LogoSN size="md" />
                <Text style={styles.title}>VERIFICACIÓN DE CÓDIGO</Text>

                <View style={styles.green}>
                    <Ionicons name="checkmark-circle-outline" size={vs(25)} color="#02AF14" />
                    <Text style={styles.description}>Te enviamos un código a tu celular</Text>
                </View>

                <Text style={styles.indicaciones}>
                    Ingresa el código enviado a tu número celular
                </Text>

                <TextInput
                    style={[
                        styles.input,
                        error ? styles.inputError : success ? styles.inputSuccess : null,
                    ]}
                    placeholder="Ingresa el código"
                    keyboardType="numeric"
                    maxLength={6}
                    value={code}
                    onChangeText={(text) => {
                        setCode(text);
                        setError(null);
                        setSuccess(false);
                    }}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
                {success && <Text style={styles.successText}>✅ ¡Código correcto!</Text>}

                <TouchableOpacity style={styles.validateBtn} onPress={handleValidate} disabled={loading}>
                    {loading ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <ActivityIndicator color="#fff" size="small" />
                            <Text style={styles.validateText}>Validando...</Text>
                        </View>
                    ) : (
                        <Text style={styles.validateText}>VALIDAR</Text>
                    )}
                </TouchableOpacity>


                <TouchableOpacity
                    disabled={!canResend}
                    onPress={handleResend}
                    style={[styles.resendBtn, !canResend && styles.disabledBtn]}
                >
                    <Text style={styles.resendText}>
                        {canResend ? 'Reenviar código' : `Reenviar en ${timer}s`}
                    </Text>
                </TouchableOpacity>
            </View>
        </BaseScreen>
    );
}
