// components/beneficiarios/GenderSelectorModal.tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    visible: boolean;
    onSelect: (gender: string) => void;
    onClose: () => void;
}

export default function GenderSelectorModal({ visible, onSelect, onClose }: Props) {
    return (
        <Modal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Selecciona el género</Text>

                    <TouchableOpacity style={styles.option} onPress={() => onSelect('MASCULINO')}>
                        <Text style={styles.optionText}>MASCULINO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option} onPress={() => onSelect('FEMENINO')}>
                        <Text style={styles.optionText}>FEMENINO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancel} onPress={onClose}>
                        <Text style={styles.cancelText}>Cancelar</Text>
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
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
    },
    cancel: {
        marginTop: 20,
    },
    cancelText: {
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
