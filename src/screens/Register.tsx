import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import { registerStyles as styles } from '../styles/registerStyles';
import LogoSN from "../components/svg/LogoSN";
import { useAuth } from '../context/AuthContext';
import {showApiErrorAlert, showErrorAlert} from '../utils/alertUtils';
import CompanySelector from '../components/common/CompanySelector';
import { mvs, vs } from "react-native-size-matters";
import ActivityOverlay from '../components/common/ActivityOverlay';

export default function Register({ navigation }: any) {
    const [form, setForm] = useState({
        company: 'GRUPO TORRES',
        workerId: '',
        curp: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleChange = (key: string, value: any) => {
        setForm({ ...form, [key]: value });
        if (errors[key]) setErrors({ ...errors, [key]: undefined });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!form.workerId.trim()) newErrors.workerId = 'Campo requerido';
        if (!form.curp.trim()) newErrors.curp = 'Campo requerido';
        if (!form.phone.trim()) newErrors.phone = 'Campo requerido';
        if (!form.email.trim()) newErrors.email = 'Campo requerido';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Correo inválido';
        if (!form.password.trim()) newErrors.password = 'Campo requerido';
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        return newErrors;
    };

    const handleNext = async () => {
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            const timeout = setTimeout(() => {
                setLoading(false);
                showApiErrorAlert('La solicitud está tardando demasiado. Verifica tu conexión e intenta de nuevo.');
                console.error('⏰ Tiempo de espera agotado en el registro.');
            }, 10000); // 10 segundos

            try {
                console.log('⏳ Intentando registrar:', form);

                const payload = {
                    curp: form.curp.trim(),
                    email: form.email.trim(),
                    password: form.password,
                    phone_number: form.phone.trim(),
                    employee_number: form.workerId.trim(),
                    company_id: 1,
                };

                const response = await register(payload);

                clearTimeout(timeout);

                console.log('✅ Respuesta de registro:', response);

                if (response?.error) {
                    console.error('❌ Error al registrar:', response);
                    showErrorAlert(response);
                } else {
                    navigation.navigate('Login', { userId: response.user_id });
                }
            } catch (error) {
                clearTimeout(timeout); // 👈 Limpia también si falla
                console.error('❌ Excepción capturada:', error);
                showErrorAlert({ error: { code: 'GENERIC_ERROR', message: 'Error inesperado.' } });
            } finally {
                setLoading(false);
            }
        }
    };



    return (
        <BaseScreen>
            <View style={{ alignItems: 'center' }}>
                <View style={{ marginTop: vs(10) }}>
                    <LogoSN size="md" />
                </View>

                <Text style={styles.title}>REGISTRO</Text>

                {/* Empresa */}
                <Text style={styles.label}>EMPRESA</Text>
                <CompanySelector
                    value={form.company}
                    onSelect={(val) => handleChange('company', val)}
                />

                {/* Número de trabajador */}
                <Text style={styles.label}>N° DE TRABAJADOR</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0218889"
                    value={form.workerId}
                    onChangeText={(val) => handleChange('workerId', val)}
                />
                {errors.workerId && <Text style={styles.errorText}>{errors.workerId}</Text>}

                {/* CURP */}
                <Text style={styles.label}>CURP</Text>
                <TextInput
                    style={styles.input}
                    placeholder="CURP"
                    value={form.curp}
                    onChangeText={(val) => handleChange('curp', val)}
                />
                {errors.curp && <Text style={styles.errorText}>{errors.curp}</Text>}

                {/* Teléfono */}
                <Text style={styles.label}>NÚMERO CELULAR</Text>
                <TextInput
                    style={styles.input}
                    placeholder="+52..."
                    keyboardType="phone-pad"
                    value={form.phone}
                    onChangeText={(val) => handleChange('phone', val)}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                {/* Correo */}
                <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
                <TextInput
                    style={styles.input}
                    placeholder="correo@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={form.email}
                    onChangeText={(val) => handleChange('email', val)}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                {/* Contraseña */}
                <Text style={styles.label}>CONTRASEÑA</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    secureTextEntry
                    value={form.password}
                    onChangeText={(val) => handleChange('password', val)}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                {/* Confirmar Contraseña */}
                <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    secureTextEntry
                    value={form.confirmPassword}
                    onChangeText={(val) => handleChange('confirmPassword', val)}
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                {/* Botón de Siguiente */}
                <TouchableOpacity style={styles.registerBtn} onPress={handleNext} disabled={loading}>
                    <Text style={styles.registerText}>
                        {loading ? 'Registrando...' : 'SIGUIENTE ➝'}
                    </Text>
                </TouchableOpacity>

                {/* Aviso de Privacidad */}
                <View style={{ alignSelf: 'center', marginBottom: mvs(30) }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AvisoPrivacidad')}>
                        <Text style={styles.link}>Aviso de privacidad</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Overlay de carga */}
            {loading && <ActivityOverlay />}
        </BaseScreen>
    );
}
