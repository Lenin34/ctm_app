import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    KeyboardAvoidingView,
    Platform,
    Animated,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useAuth} from '../context/AuthContext';
import BaseScreen from '../components/BaseScreen';
import styles from '../styles/changePasswordStyle';
import {Ionicons} from '@expo/vector-icons';
import {usePasswordValidation} from '../hooks/usePasswordValidation';
import {changePassword} from '../services/userService';

export default function ChangePassword({navigation}: any) {
    const {authState} = useAuth();
    const userId = authState.user?.user_id;

    const [form, setForm] = useState({current: '', new: '', confirm: ''});
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [showCurrent, setShowCurrent] = useState(false);

    const {errors, validate} = usePasswordValidation();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({...prev, [key]: value}));
    };

    const handleSubmit = async () => {
        if (!userId) {
            showMessage({message: 'Error', description: 'Usuario no identificado', type: 'danger'});
            return;
        }

        const isValid = validate({
            current: form.current,
            newPassword: form.new,
            confirm: form.confirm,
        });

        if (!isValid) {
            Vibration.vibrate();
            return;
        }

        const result = await changePassword(userId, {
            current_password: form.current,
            new_password: form.new,
        });

        if (result.error) {
            Vibration.vibrate();
            return showMessage({
                message: 'Error',
                description: result.msg,
                type: 'danger',
            });
        }

        showMessage({
            message: 'Contraseña actualizada',
            description: 'Tu contraseña se cambió exitosamente.',
            type: 'success',
        });

        navigation.goBack();
    };


    return (
        <BaseScreen>
            <Animated.View style={[styles.card, {opacity: fadeAnim}]}>
                <Text style={styles.title}>CAMBIAR CONTRASEÑA</Text>

                <Text style={styles.label}>CONTRASEÑA ACTUAL</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!showCurrent}
                        value={form.current}
                        onChangeText={(text) => handleChange('current', text)}
                        placeholder="••••••••"
                    />
                    <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)} style={styles.eyeIcon}>
                        <Ionicons name={showCurrent ? 'eye-off' : 'eye'} size={20} color="#666" />
                    </TouchableOpacity>
                </View>
                {errors.current ? <Text style={styles.errorText}>{errors.current}</Text> : null}


                <Text style={styles.label}>NUEVA CONTRASEÑA</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!showNew}
                        value={form.new}
                        onChangeText={(text) => handleChange('new', text)}
                        placeholder="••••••••"
                    />
                    <TouchableOpacity onPress={() => setShowNew(!showNew)} style={styles.eyeIcon}>
                        <Ionicons name={showNew ? 'eye-off' : 'eye'} size={20} color="#666"/>
                    </TouchableOpacity>
                </View>
                {errors.new ? <Text style={styles.errorText}>{errors.new}</Text> : null}

                <Text style={styles.label}>REPETIR CONTRASEÑA</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!showConfirm}
                        value={form.confirm}
                        onChangeText={(text) => handleChange('confirm', text)}
                        placeholder="••••••••"
                    />
                    <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
                        <Ionicons name={showConfirm ? 'eye-off' : 'eye'} size={20} color="#666"/>
                    </TouchableOpacity>
                </View>
                {errors.confirm ? <Text style={styles.errorText}>{errors.confirm}</Text> : null}
                {errors.mismatch ? <Text style={styles.errorText}>{errors.mismatch}</Text> : null}

                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Confirmar</Text>
                </TouchableOpacity>
            </Animated.View>
        </BaseScreen>
    );
}
