// src/services/userService.ts
import axios from 'axios';
import { API_URL } from '../constants/config';
import * as SecureStore from 'expo-secure-store';

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
        const userId = await SecureStore.getItemAsync('user_id');

        if (!userId) {
            return {
                error: true,
                msg: 'No se encontró el ID del usuario en SecureStore.'
            };
        }

        const { data } = await axios.get(`${API_URL}/users/${userId}/profile`);
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
export const updateProfile = async (userId: number, payload: any): Promise<ApiResponse> => {
    try {
        const { data } = await axios.post(`${API_URL}/users/${userId}/profile`, payload);
        return {
            error: false,
            msg: data.message,
        };
    } catch (error: any) {
        return {
            error: true,
            msg: error?.response?.data?.message || 'Error al actualizar perfil',
        };
    }
};