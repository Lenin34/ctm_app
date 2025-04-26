// components/common/PhotoPickerModal.tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Props = {
    visible: boolean;
    onClose: () => void;
    onPick: (uri: string) => void;
};

export default function PhotoPickerModal({ visible, onClose, onPick }: Props) {
    const handleCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            onPick(result.assets[0].uri);
        }

        onClose();
    };

    const handleGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            onPick(result.assets[0].uri);
        }

        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Selecciona una opción</Text>

                    <TouchableOpacity style={styles.button} onPress={handleCamera}>
                        <Text style={styles.buttonText}>📸 Tomar foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleGallery}>
                        <Text style={styles.buttonText}>🖼️ Elegir de galería</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
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
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 20,
        width: 280,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0B3F61',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 10,
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
});
