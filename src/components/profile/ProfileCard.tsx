// src/components/profile/ProfileCard.tsx
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { profileStyle as styles } from '../../styles/profileStyles';

interface Props {
    label: string;
    value: string;
    editable: boolean;
    onChange: (value: string) => void;
}

export default function ProfileCard({ label, value, editable, onChange }: Props) {
    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputBox}>
                {editable ? (
                    <TextInput
                        style={styles.inputText}
                        value={value}
                        onChangeText={onChange}
                    />
                ) : (
                    <Text style={styles.inputText}>{value}</Text>
                )}
            </View>
        </View>
    );
}
