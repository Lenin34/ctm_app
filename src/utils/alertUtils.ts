// src/utils/alert.utils.ts
import { Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Vibration } from 'react-native';

export function showApiErrorAlert(message?: string) {
    Alert.alert(
        '⚠️ Algo salió mal',
        message || 'No se pudo completar la acción. Intenta más tarde.'
    );
}

export function showErrorAlert(apiError: any) {
    const code = apiError?.error?.code || 'GENERIC';
    const message = apiError?.error?.message || 'Ocurrió un error inesperado.';

    let description = '';

    switch (code) {
        case 'AC-001':
            description = 'Ya existe una cuenta activa con este correo.';
            break;
        case 'AC-002':
            description = 'La CURP no coincide con ningún registro.';
            break;
        case 'AC-003':
            description = 'Falló la verificación del teléfono. Intenta de nuevo.';
            break;
        case 'AC-004':
            description = 'La empresa no está activa.';
            break;
        case 'AC-005':
            description = 'Ya estás verificado. Inicia sesión directamente.';
            break;
        default:
            description = message;
    }

    showMessage({
        message: '😕 Ocurrió un error',
        description,
        type: 'danger',
        icon: 'auto',
        duration: 4000,
        floating: true,
    });
}

/**
 * ✅ Mostrar un mensaje bonito de éxito
 */
export function showSuccessAlert(message: string, description?: string) {
    Vibration.vibrate(100);

    showMessage({
        message,
        description: description || '',
        type: 'success',
        icon: 'auto',
        duration: 3500,
        floating: true,
    });
}
