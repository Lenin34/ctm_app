import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { profileStyle as styles } from '../../styles/profileStyles';

type FormData = {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    telefono: string;
    correo: string;
};

type Props = {
    formData: FormData;
    isEditing: boolean;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function ProfileForm({ formData, isEditing, setFormData }: Props) {
    return (
        <>
            {Object.entries(formData).map(([key, value], index) => (
                <View key={index} style={styles.fieldContainer}>
                    <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
                    <View style={styles.inputBox}>
                        {isEditing ? (
                            <TextInput
                                style={styles.inputText}
                                value={value}
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
            ))}
        </>
    );
}
