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
import { newPasswordStyles as styles } from '../styles/newPasswordStyles';
import { resetPassword } from '../services/emailVerificationService';
import { showApiErrorAlert, showSuccessAlert } from '../utils/alertUtils';
import { Eye, EyeOff } from 'lucide-react-native';
import ActivityOverlay from '../components/common/ActivityOverlay';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function NewPasswordScreen({ route, navigation }: any) {
    const { userId } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

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
                setShowConfetti(true);

                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }, 3000); // Espera 3 segundos para ver el confetti
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
                                style={styles.input}
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
                                {showPassword ? <EyeOff size={22} color="#000" /> : <Eye size={22} color="#000" />}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
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
                                {showConfirmPassword ? <EyeOff size={22} color="#000" /> : <Eye size={22} color="#000" />}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSave}
                            disabled={loading}
                        >
                            <Title text={loading ? 'Guardando...' : 'Guardar'} color="#fff" size="md" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                {showConfetti && (
                    <ConfettiCannon
                        count={100}
                        origin={{ x: width / 2, y: 0 }}
                        fallSpeed={3000}
                        fadeOut
                    />
                )}
            </SafeAreaView>

            {loading && <ActivityOverlay />}
        </>
    );
}
