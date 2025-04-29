import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FondoAzul from '../components/svg/fondoAzul';
import { Gradients } from '../constants/theme';
import { forgotPasswordStyles as styles } from '../styles/forgotPasswordStyles';
import Title from '../components/common/Title';
import { resendEmailVerification } from '../services/emailVerificationService';
import * as SecureStore from 'expo-secure-store';
import { showApiErrorAlert, showSuccessAlert } from '../utils/alertUtils';

export default function ForgotPasswordScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { width } = Dimensions.get('window');

    const handleRecover = async () => {
        if (!email.trim() || !email.includes('@')) {
            showApiErrorAlert('Por favor ingresa un correo válido.');
            return;
        }

        setLoading(true);

        try {
            const userIdStr = await SecureStore.getItemAsync('user_id');
            if (!userIdStr) {
                showApiErrorAlert('No se encontró el ID de usuario. Inicia sesión nuevamente.');
                return;
            }
            const userId = parseInt(userIdStr, 10);

            const response = await resendEmailVerification(userId);

            if (!response.success) {
                showApiErrorAlert(response.message || 'No se pudo enviar el código.');
            } else {
                showSuccessAlert('✅ Código enviado', 'Hemos enviado un código de verificación a tu correo.');
                navigation.navigate('ValidateCode', { email });
            }
        } catch (error) {
            console.error('❌ Error en handleRecover:', error);
            showApiErrorAlert('Ocurrió un problema inesperado. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0B3F61' }}>
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient
                    colors={Gradients.blue}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={{ position: 'absolute', bottom: 0 }}>
                    <FondoAzul width={width} />
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.wrapper}
            >
                <View style={styles.container}>
                    <Title text="Recuperar contraseña" />

                    <TextInput
                        style={styles.input}
                        placeholder="Ej: usuario@email.com"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRecover}
                        disabled={loading}
                    >
                        <Title
                            text={loading ? 'Enviando...' : 'Continuar'}
                            color="#fff"
                            size="md"
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
