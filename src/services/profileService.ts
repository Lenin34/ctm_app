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
 * Limpia un objeto eliminando las claves con valores `undefined`
 */
const cleanPayload = (data: Record<string, any>) =>
    Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));

export const updateProfile = async (userId: number, formData: Record<string, any>) => {
    try {
        console.log('🟡 Enviando actualización de perfil...');
        console.log('➡️  ID de usuario:', userId);
        console.log('📦 Datos originales:', formData);

        const cleanedFormData = cleanPayload(formData);

        console.log('📦 Datos limpiados (sin undefined):', cleanedFormData);


        const response = await axios.post(`${API_URL}/users/${userId}/profile`, cleanedFormData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('✅ Respuesta del servidor:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('❌ Error al actualizar perfil:', error.message);
        console.log('📛 Respuesta del servidor (error):', error?.response?.data);
        return {
            error: true,
            msg: error?.response?.data?.message || 'Error desconocido',
        };
    }
};
