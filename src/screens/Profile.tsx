import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import Header from '../components/Header';
import { profileStyle as styles } from '../styles/profileStyles';
import { getProfile, updateProfile } from '../services/profileService';
import { useAuth } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileActions from '../components/profile/ProfileActions';
import { showErrorAlert, showApiErrorAlert,showSuccessAlert } from '../utils/alertUtils';
import ChangePassword from "./ChangePassword";

export default function Profile({ navigation }: any) {
    const { authState, setAuthState } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        telefono: '',
        correo: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getProfile();

            if (!response.error && response.profile) {
                setFormData({
                    nombre: response.profile.name || '',
                    apellidoPaterno: response.profile.last_name || '',
                    apellidoMaterno: '',
                    telefono: response.profile.phone_number || '',
                    correo: response.profile.email || '',
                });
            } else {
                showErrorAlert({
                    error: {
                        code: 'PROFILE_FETCH_ERROR',
                        message: response.msg || 'No se pudo cargar el perfil del usuario.',
                    },
                });
            }
        };

        fetchProfile();
    }, []);

    const handleSaveProfile = async () => {
        const userId = authState.user?.user_id;

        if (!userId) {
            showErrorAlert({ error: { code: 'NO_USER_ID', message: 'No se pudo identificar al usuario' } });
            return;
        }

        const payload = {
            name: formData.nombre,
            last_name: formData.apellidoPaterno,
            phone_number: formData.telefono,
            email: formData.correo,
            employee_number: authState.user?.employee_number,
            company_id: authState.user?.company_id,
        };

        const result = await updateProfile(userId, payload);

        if (result.error) {
            showErrorAlert({ error: { code: 'UPDATE_ERROR', message: result.msg } });
            return;
        }

        const refreshedProfile = await getProfile();

        if (refreshedProfile.error) {
            showErrorAlert({
                error: {
                    code: 'REFRESH_ERROR',
                    message: 'Los cambios se guardaron, pero no se pudo actualizar el perfil local.',
                },
            });
            return;
        }

        await SecureStore.setItemAsync('user', JSON.stringify(refreshedProfile.profile));

        setAuthState((prev) => ({
            ...prev,
            user: {
                user_id: refreshedProfile.profile.user_id,
                name: refreshedProfile.profile.name,
                last_name: refreshedProfile.profile.last_name,
                phone_number: refreshedProfile.profile.phone_number,
                email: refreshedProfile.profile.email,
                company_id: refreshedProfile.profile.company_id,
                employee_number: refreshedProfile.profile.employee_number,
                curp: refreshedProfile.profile.curp,
                id: refreshedProfile.profile.user_id,
            },
        }));

        showSuccessAlert('✅ Perfil actualizado', 'Los cambios se guardaron correctamente.');
        setIsEditing(false);
    };

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <BaseScreen scroll>
            <Header onLogout={handleLogout} />
            <View style={styles.profileBox}>
                <ProfileHeader />
                <ProfileForm
                    formData={formData}
                    isEditing={isEditing}
                    setFormData={setFormData}
                />
                <ProfileActions
                    isEditing={isEditing}
                    onEditToggle={() => setIsEditing(true)}
                    onSaveProfile={handleSaveProfile}
                    onChangePassword={() => navigation.navigate('ChangePassword')}
                    onViewBeneficiaries={() => navigation.navigate('Beneficiarios')}
                    onViewCredential={() => navigation.navigate('Credencial')}
                />
            </View>
        </BaseScreen>
    );
}
