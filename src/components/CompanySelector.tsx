import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { registerStyles as styles } from '../styles/registerStyles';

const companies = [
    'GRUPO TORRES',
    'INDUSTRIA ÁGUILA',
    'CTM TRANSPORTES',
    'FÁBRICA LUZ Y FUERZA',
];

type Props = {
    value: string;
    onSelect: (company: string) => void;
};

export default function CompanySelector({ value, onSelect }: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (company: string) => {
        onSelect(company);
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={[styles.input, styles.selectInput]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.selectText}>
                    {value || 'Selecciona una empresa'}
                </Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Selecciona tu empresa</Text>
                        <FlatList
                            data={companies}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.modalItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
