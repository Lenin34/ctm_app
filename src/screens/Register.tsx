import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import BaseScreen from '../components/BaseScreen';
import {registerStyles as styles} from '../styles/registerStyles';
import {useValidation, ValidationErrors} from '../hooks/useValidation';
import LogoSN from "../components/LogoSN";
// @ts-ignore
import logoCTM from '../../assets/images/logo_ctm.png';
import CompanySelector from '../components/CompanySelector';
import LogoCTM from "../components/LogoCTM";
import {vs} from "react-native-size-matters";

export default function Register({navigation}: any) {
    const [form, setForm] = useState({
        company: 'GRUPO TORRES',
        workerId: '',
        curp: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleChange = (key: string, value: string) => {
        setForm({...form, [key]: value});
        if (errors[key]) setErrors({...errors, [key]: undefined});
    };

    const validateForm = () => {
        const newErrors: ValidationErrors = {};
        if (!form.workerId.trim()) newErrors.workerId = 'Campo requerido';
        if (!form.curp.trim()) newErrors.curp = 'Campo requerido';
        if (!form.phone.trim()) newErrors.phone = 'Campo requerido';
        if (!form.email.trim()) newErrors.email = 'Campo requerido';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email = 'Correo inválido';

        if (!form.password.trim()) newErrors.password = 'Campo requerido';
        if (form.password !== form.confirmPassword)
            newErrors.confirmPassword = 'Las contraseñas no coinciden';

        return newErrors;
    };

    const handleNext = () => {
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Formulario válido:', form);
            navigation.navigate('Validate');
        }
    };

    return (
        <BaseScreen>
            <View style={{alignItems: 'center'}}>
                <View style={{ marginTop: vs(10)}}>
                    <LogoSN size={"md"}/>
                </View>
                <Text style={styles.title}>REGISTRO</Text>

                <Text style={styles.label}>EMPRESA</Text>
                <CompanySelector
                    value={form.company}
                    onSelect={(val) => handleChange('company', val)}
                />

                <Text style={styles.label}>N° DE TRABAJADOR</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0218889"
                    value={form.workerId}
                    onChangeText={(val) => handleChange('workerId', val)}
                />
                {errors.workerId && <Text style={styles.errorText}>{errors.workerId}</Text>}

                <Text style={styles.label}>CURP</Text>
                <TextInput
                    style={styles.input}
                    placeholder="CURP"
                    value={form.curp}
                    onChangeText={(val) => handleChange('curp', val)}
                />
                {errors.curp && <Text style={styles.errorText}>{errors.curp}</Text>}

                <Text style={styles.label}>NÚMERO CELULAR</Text>
                <TextInput
                    style={styles.input}
                    placeholder="+52..."
                    keyboardType="phone-pad"
                    value={form.phone}
                    onChangeText={(val) => handleChange('phone', val)}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

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

                <Text style={styles.label}>CONTRASEÑA</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    secureTextEntry
                    value={form.password}
                    onChangeText={(val) => handleChange('password', val)}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
                <TextInput
                    style={styles.input}
                    placeholder="********"
                    secureTextEntry
                    value={form.confirmPassword}
                    onChangeText={(val) => handleChange('confirmPassword', val)}
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                <TouchableOpacity style={styles.registerBtn} onPress={handleNext}>
                    <Text style={styles.registerText}>SIGUIENTE ➝</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.link}>AVISO DE PRIVACIDAD</Text>
                </TouchableOpacity>
            </View>
        </BaseScreen>
    );
}
