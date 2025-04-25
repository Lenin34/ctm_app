import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { profileStyle as styles } from '../../styles/profileStyles';

type FormData = {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    telefono: string;
    correo: string;
    birthday?: string | null;
};

type Props = {
    formData: FormData;
    isEditing: boolean;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Fecha no disponible';
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
};

export default function ProfileForm({ formData, isEditing, setFormData }: Props) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setFormData((prev) => ({ ...prev, birthday: formattedDate }));
        }
    };

    return (
        <>
            {Object.entries(formData).map(([key, value], index) => {
                if (key === 'birthday') {
                    return (
                        <View key={index} style={styles.fieldContainer}>
                            <Text style={styles.label}>FECHA DE NACIMIENTO</Text>
                            <TouchableOpacity
                                style={styles.inputBox}
                                onPress={() => isEditing && setShowDatePicker(true)}
                                disabled={!isEditing}
                            >
                                <Text style={styles.inputText}>
                                    {value ? formatDate(value) : 'Selecciona tu fecha'}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={value ? new Date(value) : new Date()}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={handleDateChange}
                                    maximumDate={new Date()}
                                />
                            )}
                        </View>
                    );
                }

                return (
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
                        <View style={styles.inputBox}>
                            {isEditing ? (
                                <TextInput
                                    style={styles.inputText}
                                    value={value ?? ''}
                                    onChangeText={(text) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [key as keyof FormData]: text,
                                        }))
                                    }
                                />
                            ) : (
                                <Text style={styles.inputText}>{value}</Text>
                            )}
                        </View>
                    </View>
                );
            })}
        </>
    );
}
