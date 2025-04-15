import React, { useState } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    View,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { loginStyles as styles } from '../styles/loginStyles';
import { Gradients } from '../constants/theme';
import { useValidation, ValidationErrors } from '../hooks/useValidation';
import LogoCTM from '../components/LogoCTM';

export default function Login({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const { validateLogin } = useValidation();

    const handleLogin = () => {
        const validationErrors = validateLogin({ email, password });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // Navega a la pantalla principal con Bottom Tabs
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.wrapper}>
                <LinearGradient
                    colors={Gradients.greenish}
                    style={StyleSheet.absoluteFillObject}
                />
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <LogoCTM />

                    <Text style={styles.title}>INICIO DE SESIÓN</Text>

                    <Text style={styles.label}>USUARIO</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#aaa"
                        autoCapitalize="none"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    <Text style={styles.label}>CONTRASEÑA</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { paddingRight: 40 }]}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (errors.password) setErrors({ ...errors, password: undefined });
                            }}
                            placeholder="Contraseña"
                            placeholderTextColor="#aaa"
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.iconOverlay}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={22}
                                color="#333"
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                        <Text style={styles.loginText}>INGRESAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.link}>Olvidé mi contraseña</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerLink}>Regístrate</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
