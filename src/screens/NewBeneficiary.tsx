import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useAuth} from '../context/AuthContext';
import {createBeneficiario, updateBeneficiario} from '../services/beneficiarioService';
import {showErrorAlert, showSuccessAlert} from '../utils/alertUtils';
import BaseScreen from '../components/BaseScreen';
import {nuevoBeneficiarioStyles as styles} from '../styles/nuevoBeneficiarioStyles';
import {Ionicons} from '@expo/vector-icons';
import GenderSelectorModal from '../components/beneficiarios/GenderSelectorModal';
import DatePickerModal from '../components/common/DatePickerModal';

export default function NuevoBeneficiarioScreen({navigation, route}: any) {
    const {authState} = useAuth();
    const [loading, setLoading] = useState(false);
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);

    const beneficiario = route.params?.beneficiario;

    const [form, setForm] = useState({
        name: '',
        last_name: '',
        maternal_last_name: '',
        kinship: '',
        birthday: '',
        gender: '',
        education: '',
        curp: '',
        photo: '',
    });

    useEffect(() => {
        if (beneficiario) {
            setForm({
                name: beneficiario.name || '',
                last_name: beneficiario.last_name || '',
                maternal_last_name: beneficiario.maternal_last_name || '',
                kinship: beneficiario.kinship || '',
                birthday: beneficiario.birthday?.split(' ')[0] || '',
                gender: beneficiario.gender || '',
                education: beneficiario.education || '',
                curp: beneficiario.curp || '',
                photo: beneficiario.photo || '',
            });
        }
    }, [beneficiario]);

    const handleChange = (key: string, value: string) => {
        const uppercased = value.toUpperCase();
        setForm((prev) => ({...prev, [key]: uppercased}));
    };

    const validateForm = () => {
        const requiredFields = ['name', 'last_name', 'kinship', 'birthday', 'gender', 'education', 'curp'];
        for (const field of requiredFields) {
            if (!form[field as keyof typeof form]) {
                showErrorAlert({
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: `El campo ${field.toUpperCase()} es obligatorio.`
                    }
                });
                return false;
            }
        }

        const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!fechaRegex.test(form.birthday)) {
            showErrorAlert({error: {code: 'FECHA_INVALIDA', message: 'La fecha debe tener el formato YYYY-MM-DD.'}});
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setLoading(true);

        const userId = authState.user?.user_id;
        if (!userId) {
            showErrorAlert({error: {code: 'NO_USER_ID', message: 'Usuario no identificado'}});
            setLoading(false);
            return;
        }

        const payload = {...form};

        let result;
        if (beneficiario?.id) {
            result = await updateBeneficiario(userId, beneficiario.id, payload);
        } else {
            result = await createBeneficiario(userId, payload);
        }

        if (result.error) {
            showErrorAlert({error: {code: 'SAVE_ERROR', message: result.msg}});
        } else {
            showSuccessAlert('✅ Beneficiario guardado', 'Se ha guardado correctamente.');
            navigation.goBack();
        }

        setLoading(false);
    };

    // ⛔ El return debe estar aquí afuera, en el cuerpo principal del componente
    return (
        <BaseScreen scroll>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="image-outline" size={36} color="white"/>
                    </View>
                    <TouchableOpacity style={styles.photoButton}>
                        <Text style={styles.photoButtonText}>AGREGAR FOTO</Text>
                    </TouchableOpacity>
                </View>

                <TextInput placeholder="NOMBRE" value={form.name} onChangeText={(text) => handleChange('name', text)}
                           style={styles.input}/>
                <TextInput placeholder="APELLIDO PATERNO" value={form.last_name}
                           onChangeText={(text) => handleChange('last_name', text)} style={styles.input}/>
                <TextInput placeholder="APELLIDO MATERNO" value={form.maternal_last_name}
                           onChangeText={(text) => handleChange('maternal_last_name', text)} style={styles.input}/>
                <TextInput placeholder="PARENTESCO" value={form.kinship}
                           onChangeText={(text) => handleChange('kinship', text)} style={styles.input}/>
                <TouchableOpacity style={styles.input} onPress={() => setShowDateModal(true)}>
                    <Text style={{color: form.birthday ? '#000' : '#999'}}>
                        {form.birthday || 'SELECCIONAR FECHA DE NACIMIENTO'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} onPress={() => setShowGenderModal(true)}>
                    <Text style={{color: form.gender ? '#000' : '#999'}}>
                        {form.gender || 'SELECCIONAR GÉNERO'}
                    </Text>
                </TouchableOpacity>
                <TextInput placeholder="EDUCACIÓN" value={form.education}
                           onChangeText={(text) => handleChange('education', text)} style={styles.input}/>
                <TextInput placeholder="CURP" value={form.curp} onChangeText={(text) => handleChange('curp', text)}
                           style={styles.input}/>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff"/>
                    ) : (
                        <Text style={styles.saveButtonText}>GUARDAR</Text>
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.regresar} onPress={() => navigation.goBack()}>
                <Text style={styles.regresarText}>← Regresar</Text>
            </TouchableOpacity>

            <GenderSelectorModal
                visible={showGenderModal}
                onSelect={(selectedGender) => {
                    handleChange('gender', selectedGender);
                    setShowGenderModal(false);
                }}
                onClose={() => setShowGenderModal(false)}
            />

            <DatePickerModal
                visible={showDateModal}
                onSelect={(selectedDate) => {
                    handleChange('birthday', selectedDate);
                    setShowDateModal(false);
                }}
                onClose={() => setShowDateModal(false)}
            />



        </BaseScreen>


    );
}
