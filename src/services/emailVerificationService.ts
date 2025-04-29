// src/services/emailVerificationService.ts

import { API_URL } from '../constants/config';
import { axiosPublic } from '../services/axiosPublic';

/**
 * Reenvía un nuevo código de verificación al correo del usuario.
 */
export const resendEmailVerification = async (userId: number) => {
    try {
        const { data } = await axiosPublic.post(`/users/${userId}/email-verification/resend`);
        return { success: true };
    } catch (error: any) {
        console.error('❌ Error al reenviar el código:', error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.error?.message || 'No se pudo reenviar el código'
        };
    }
};

/**
 * Verifica si el código de verificación ingresado es correcto.
 */
export const verifyEmailCode = async (userId: number, verificationCode: string) => {
    try {
        const { data } = await axiosPublic.patch(`/users/${userId}/email-verification`, {
            verification_code: verificationCode,
        });
        return { success: true };
    } catch (error: any) {
        console.error('❌ Error al verificar el código:', error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.error?.message || 'Código inválido'
        };
    }
};

/**
 * Cambia la contraseña del usuario después de verificar su correo.
 */
export const resetPassword = async (userId: number, newPassword: string) => {
    try {
        const { data } = await axiosPublic.patch(`/users/${userId}/reset-password`, {
            new_password: newPassword,
        });
        return { success: true };
    } catch (error: any) {
        console.error('❌ Error en resetPassword:', error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || 'No se pudo restablecer la contraseña' };
    }
};
