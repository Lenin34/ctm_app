// src/components/profile/ProfileActions.tsx
import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {profileStyle as styles} from '../../styles/profileStyles';

interface Props {
    isEditing: boolean;
    onEditToggle: () => void;
    onSaveProfile: () => void;
    onChangePassword?: () => void;
    onViewBeneficiaries?: () => void;
    onViewCredential?: () => void;
}

export default function ProfileActions({
                                           isEditing,
                                           onEditToggle,
                                           onSaveProfile,
                                           onChangePassword,
                                           onViewBeneficiaries,
                                           onViewCredential,
                                       }: Props) {
    const handlePrimaryAction = () => {
        isEditing ? onSaveProfile() : onEditToggle();
    };

    return (
        <>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[
                        styles.updateButton,
                        isEditing && {backgroundColor: '#1ABC9C'}
                    ]}
                    onPress={handlePrimaryAction}
                >
                    <Ionicons name="create-outline" size={16} color="#fff"/>
                    <Text style={styles.buttonText}>
                        {isEditing ? 'GUARDAR' : 'ACTUALIZAR'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.passwordButton} onPress={onChangePassword}>
                    <Ionicons name="lock-closed-outline" size={16} color="#fff"/>
                    <Text style={styles.buttonText}>CAMBIAR CONTRASEÑA</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.greenButton} onPress={onViewBeneficiaries}>
                <Ionicons name="people-outline" size={16} color="#fff"/>
                <Text style={styles.buttonText}>VER BENEFICIARIOS</Text>

            </TouchableOpacity>


            <TouchableOpacity style={styles.blueButton} onPress={onViewCredential}>
                <Ionicons name="card-outline" size={16} color="#fff"/>
                <Text style={styles.buttonText}>VER CREDENCIAL DIGITAL</Text>
            </TouchableOpacity>
        </>
    );
}
