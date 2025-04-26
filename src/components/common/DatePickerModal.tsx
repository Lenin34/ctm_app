// components/beneficiarios/DatePickerModal.tsx
import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Platform } from 'react-native';

interface Props {
    visible: boolean;
    onSelect: (date: string) => void;
    onClose: () => void;
}

export default function DatePickerModal({ visible, onSelect, onClose }: Props) {
    const handleConfirm = (date: Date) => {
        const formatted = date.toISOString().split('T')[0];
        onSelect(formatted);
        onClose();
    };

    return (
        <DateTimePickerModal
            isVisible={visible}
            mode="date"
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={onClose}
            confirmTextIOS="Confirmar"
            cancelTextIOS="Cancelar"
            textColor="black"
            themeVariant={Platform.OS === 'ios' ? 'dark' : undefined}
        />
    );
}
