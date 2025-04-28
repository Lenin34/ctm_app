// screens/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FondoAzul from '../components/svg/fondoAzul';
import { Gradients } from '../constants/theme';
import { forgotPasswordStyles as styles } from '../styles/forgotPasswordStyles';
import Title from '../components/common/Title';

export default function ForgotPasswordScreen({ navigation }: any) {
    const [phone, setPhone] = useState('');
    const { width } = Dimensions.get('window');

    const handleRecover = () => {
        console.log('Recuperar contraseña de', phone);
        // Tu lógica aquí
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0B3F61' }}>
            <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <LinearGradient colors={Gradients.blue} style={{ flex: 1 }} />
                <View style={{ position: 'absolute', bottom: 0 }}>
                    <FondoAzul width={width} />
                </View>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
                <View style={styles.card}>
                    <Title text="Recuperar contraseña" />

                    <TextInput
                        style={styles.input}
                        placeholder="Ej: 5512345678"
                        placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleRecover}>
                        <Title text="Continuar" color="#fff" size="md" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
