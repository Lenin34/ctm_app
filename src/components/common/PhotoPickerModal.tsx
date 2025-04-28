// src/components/common/PhotoPickerModal.tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Props {
    visible: boolean;
    onClose: () => void;
    onPhotoSelected: (uri: string) => void;
}

export default function PhotoPickerModal({ visible, onClose, onPhotoSelected }: Props) {
    const handleCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permiso de cámara denegado');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // 👈 aquí usamos MediaTypeOptions
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            onPhotoSelected(result.assets[0].uri);
        }

        onClose();
    };

    const handleGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permiso de galería denegado');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // 👈 aquí igual
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            onPhotoSelected(result.assets[0].uri);
        }

        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Selecciona una opción</Text>

                    <TouchableOpacity style={styles.button} onPress={handleCamera}>
                        <Text style={styles.buttonText}>Tomar Foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleGallery}>
                        <Text style={styles.buttonText}>Elegir de Galería</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0077cc',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 16,
    },
});
