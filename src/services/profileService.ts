// src/services/userService.ts
import axios from 'axios';
import { API_URL } from '../constants/config';

export interface ApiResponse {
    error: boolean;
    profile?: {
        curp: string;
        employee_number: any;
        company_id: any;
        user_id: any;
        name?: string;
        last_name?: string;
        phone_number?: string;
        email?: string;
    };
    msg?: string;
}


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
 * Actualiza el perfil del usuario.
 */
export const updateProfile = async (userId: number, payload: any) => {
    try {
        const { data } = await axios.put(`${API_URL}/users/${userId}/profile`, payload);
        return { error: false, data };
    } catch (error: any) {
        console.error('❌ Error al actualizar perfil:', error.response?.data || error.message);
        return {
            error: true,
            msg: error.response?.data?.message || 'No se pudo actualizar el perfil.',
        };
    }
};