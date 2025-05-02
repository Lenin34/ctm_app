// src/screens/NewPasswordScreen.tsx

import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FondoAzul from '../components/svg/fondoAzul';
import { Gradients } from '../constants/theme';
import Title from '../components/common/Title';
import { Feather } from '@expo/vector-icons';
import ActivityOverlay from '../components/common/ActivityOverlay';
import { resetPassword } from '../services/emailVerificationService';
import { showApiErrorAlert, showSuccessAlert } from '../utils/alertUtils';
import { newPasswordStyles as styles } from '../styles/newPasswordStyles';

export default function NewPasswordScreen({ route, navigation }: any) {
    const { userId } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { width } = Dimensions.get('window');

    const handleSave = async () => {
        if (newPassword.length < 6) {
            showApiErrorAlert('La nueva contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (newPassword !== confirmPassword) {
            showApiErrorAlert('Las contraseñas no coinciden.');
            return;
        }

        try {
            setLoading(true);

            const result = await resetPassword(userId, newPassword);

            if (result.success) {
                showSuccessAlert('✅ Contraseña actualizada', 'Ahora puedes iniciar sesión con tu nueva contraseña.');

                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }, 1500); // solo una pequeña pausa tras la alerta
            } else {
                showApiErrorAlert(result.message || 'No se pudo cambiar la contraseña.');
            }
        } catch (error) {
            console.error('❌ Error en handleSave:', error);
            showApiErrorAlert('Ocurrió un error inesperado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#0B3F61' }}>
                <View style={StyleSheet.absoluteFill}>
                    <LinearGradient colors={Gradients.blue} style={StyleSheet.absoluteFillObject} />
                    <View style={{ position: 'absolute', bottom: 0 }}>
                        <FondoAzul width={width} />
                    </View>
                </View>

                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
                    <View style={styles.card}>
                        <Title text="Nueva contraseña" />

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.enhancedInput]}
                                placeholder="Nueva contraseña"
                                placeholderTextColor="#aaa"
                                secureTextEntry={!showPassword}
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Feather name={showPassword ? 'eye-off' : 'eye'} size={22} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.enhancedInput]}
                                placeholder="Confirmar contraseña"
                                placeholderTextColor="#aaa"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={styles.eyeIcon}
                            >
                                <Feather name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && { opacity: 0.6 }]}
                            onPress={handleSave}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Title text={loading ? 'Guardando...' : 'Guardar'} color="#fff" size="md" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>

            {loading && <ActivityOverlay />}
        </>
    );
}
