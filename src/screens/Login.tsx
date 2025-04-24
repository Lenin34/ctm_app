import React, {useState} from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    View,
    StyleSheet, SafeAreaView, Dimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';

import {loginStyles as styles} from '../styles/loginStyles';
import {Gradients} from '../constants/theme';
import {useValidation, ValidationErrors} from '../hooks/useValidation';
import LogoCTM from '../components/svg/LogoCTM';
import FondoAzul from "../components/svg/fondoAzul";
import {mvs, vs} from 'react-native-size-matters';
import LogoSN from "../components/svg/LogoSN";
import AvisoPrivacidad from "./AvisoPrivacidad";
import { useAuth } from '../context/AuthContext';
import { Alert } from 'react-native';


export default function Login({navigation}: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const {validateLogin} = useValidation();
    const {width, height} = Dimensions.get('window');
    const {login} = useAuth();

    const handleLogin = async () => {
        const validationErrors = validateLogin({ email, password });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const result = await login(email.trim(), password);

            console.log('Login...');

            if (!result?.token) {
                Alert.alert('Error', result?.msg || 'Error al iniciar sesión');
            }
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#0B3F61'}} edges={['top']}>

            <View style={StyleSheet.absoluteFill}>
                <LinearGradient
                    colors={Gradients.blue}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={{position: 'absolute', bottom: 0}}>
                    <FondoAzul width={width}/>
                </View>
            </View>


            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

            >
                <View style={styles.wrapper}>
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        <LogoSN size="md"/>

                        <Text style={styles.title}>LOGIN</Text>

                        <Text style={styles.label}>USUARIO</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (errors.email) setErrors({...errors, email: undefined});
                            }}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#aaa"
                            autoCapitalize="none"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <Text style={styles.label}>CONTRASEÑA</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input]}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (errors.password) setErrors({...errors, password: undefined});
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
                                    size={vs(15)}
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

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: vs(15),
                            alignItems: 'center'
                        }}>
                            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.registerLink}>Regístrate</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{alignSelf: 'center', bottom: 0, position: 'absolute', marginBottom: mvs(30)}}>
                            <TouchableOpacity onPress={() => navigation.navigate('AvisoPrivacidad')}>
                                <Text style={styles.link}>Aviso de privacidad</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
