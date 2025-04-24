// src/services/authService.ts
import axios from 'axios';
import { API_URL } from '../constants/config';
import { ApiResponse } from './profileService';

export interface RegisterPayload {
    curp: string;
    email: string;
    password: string;
    phone_number: string;
    employee_number: string;
    company_id: string | number;
}

/**
 * Iniciar sesión con email y password.
 */
export async function loginUser(email: string, password: string) {
    try {
        const { data } = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });

        const token = data.token;
        if (!token) throw new Error('Token no recibido');

        console.log('✅ Token recibido:', token);

        return { token };
    } catch (error: any) {
        console.error('❌ Error en loginUser:', error.response?.data || error.message);
        return { error: true, msg: 'Error al iniciar sesión' };
    }
}

/**
 * Registrar nuevo usuario.
 */
export const registerUser = async (payload: RegisterPayload) => {
    try {
        const { data } = await axios.post(`${API_URL}/register`, payload);
        return { success: true, user_id: data.user_id };
    } catch (error: any) {
        console.error('❌ Error al registrar:', error.response?.data || error.message);
        return {
            error: true,
            msg: error.response?.data?.message || 'No se pudo registrar',
        };
    }
};

/**
 * Obtener el perfil del usuario autenticado (GET /users/me/profile).
 */
export const getProfile = async (): Promise<ApiResponse> => {
    try {
        const { data } = await axios.get(`${API_URL}/users/me/profile`);
        return {
            error: false,
            profile: data.profile
        };
    } catch (error: any) {
        console.error("❌ Error al obtener el perfil:", error.response?.data || error.message);
        return {
            error: true,
            msg: "No se pudo obtener el perfil."
        };
    }
};


/**
 * Iniciar sesión con Google y plataforma actual.
 */
export async function loginWithGoogle(idToken: string, platform: string) {
    try {
        const { data } = await axios.post(`${API_URL}/google_login`, {
            token: idToken,
            platform,
        });

        return {
            token: data.token,
            user: data.user,
        };
    } catch (error: any) {
        console.error('❌ Error en loginWithGoogle:', error.response?.data || error.message);
        return { error: true, msg: 'Error con Google Login' };
    }
}
