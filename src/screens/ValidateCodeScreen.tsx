import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { resendEmailVerification, verifyEmailCode } from '../services/emailVerificationService';
import BaseScreen from '../components/BaseScreen';
import Header from '../components/common/Header';
import Title from '../components/common/Title';
import { vs, s } from 'react-native-size-matters';
import { forgotPasswordStyles as styles } from '../styles/forgotPasswordStyles';
import * as SecureStore from 'expo-secure-store';
import { showErrorAlert, showApiErrorAlert, showSuccessAlert } from '../utils/alertUtils';

export default function ValidateCodeScreen({ navigation }: any) {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const userIdStr = await SecureStore.getItemAsync('user_id');
            if (userIdStr) {
                setUserId(parseInt(userIdStr, 10));
            }
        };
        fetchUserId();
    }, []);

    const handleVerify = async () => {
        if (!userId) {
            showApiErrorAlert('No se encontró el usuario. Inicia sesión de nuevo.');
            return;
        }

        if (!code.trim()) {
            showApiErrorAlert('Por favor ingresa el código de verificación.');
            return;
        }

        setLoading(true);
        const result = await verifyEmailCode(userId, code.trim());
        setLoading(false);

        if (result.success) {
            showSuccessAlert('✅ Verificado', '¡Correo electrónico confirmado!');
            navigation.navigate('NewPassword', { userId });
        } else {
            showApiErrorAlert(result.message || 'No se pudo verificar el código.');
        }
    };

    const handleResendCode = async () => {
        if (!userId) {
            showApiErrorAlert('No se encontró el usuario. Inicia sesión de nuevo.');
            return;
        }

        setLoading(true);
        const result = await resendEmailVerification(userId);
        setLoading(false);

        if (result.success) {
            showSuccessAlert('✅ Código reenviado', 'Revisa tu correo electrónico.');
        } else {
            showApiErrorAlert(result.message || 'No se pudo reenviar el código.');
        }
    };

    return (
        <BaseScreen>
            <Header />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1, justifyContent: 'center', paddingHorizontal: s(20) }}
            >
                <View style={styles.card}>
                    <Title text="Verificar correo electrónico" />

                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        placeholder="Código de 6 dígitos"
                        placeholderTextColor="#aaa"
                        value={code}
                        onChangeText={setCode}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleVerify}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Title text="Verificar" color="#fff" size="md" />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleResendCode}
                        disabled={loading}
                        style={{ marginTop: vs(12) }}
                    >
                        <Title text="¿No recibiste el código? Reenviar" color="#fff" size="sm" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </BaseScreen>
    );
}
