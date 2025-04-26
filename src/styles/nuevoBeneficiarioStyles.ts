// styles/nuevoBeneficiarioStyles.ts

import { StyleSheet } from 'react-native';

export const nuevoBeneficiarioStyles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 16,
        marginTop: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatarText: {
        color: 'white',
        fontSize: 24,
    },
    photoButton: {
        backgroundColor: '#53A9FF',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    photoButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 12,
        fontSize: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#28A745',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 12,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    regresar: {
        marginTop: 20,
        alignItems: 'center',
    },
    regresarText: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 14,
    },
});
