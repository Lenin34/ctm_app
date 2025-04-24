import { API_URL } from '../constants/config';
import axios from 'axios';

export const changePassword = async (userId: number, payload: { current_password: string; new_password: string }) => {
    try {
        const { data } = await axios.patch(`${API_URL}/users/${userId}/password`, payload);
        return { error: false, data };
    } catch (error: any) {
        console.error('❌ Error al cambiar contraseña:', error.response?.data || error.message);
        return {
            error: true,
            msg: error.response?.data?.message || 'No se pudo cambiar la contraseña.',
        };
    }
};
export const verifyCode = async (userId: number, code: string) => {
    try {
        await axios.patch(`${API_URL}/users/${userId}/phone-verification`, {
            verification_code: code,
        });
        return { error: false };
    } catch (error: any) {
        console.error('❌ Error verificando código:', error.response?.data || error.message);
        return { error: true, msg: error.response?.data?.message || 'Error de verificación' };
    }
};

export const resendCode = async (userId: number) => {
    try {
        await axios.post(`${API_URL}/users/${userId}/phone-verification/resend`);
        return { error: false };
    } catch (error: any) {
        console.error('❌ Error reenviando código:', error.response?.data || error.message);
        return { error: true, msg: error.response?.data?.message || 'Error al reenviar' };
    }
};

