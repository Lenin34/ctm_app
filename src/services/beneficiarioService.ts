import axios from 'axios';
import {API_URL} from '../constants/config';

export const getBeneficiarios = async (userId: number) => {
    try {
        const {data} = await axios.get(`${API_URL}/users/${userId}/beneficiary`);
        console.log(data);
        return {error: false, data: data.beneficiaries};
    } catch (error: any) {
        return {
            error: true,
            msg: error?.response?.data?.message || 'Error al obtener beneficiarios',
        };
    }
};

export const createBeneficiario = async (userId: number, payload: any) => {
    try {
        const {data} = await axios.post(`${API_URL}/users/${userId}/beneficiary`, payload);
        return {error: false, data};
    } catch (error: any) {
        return {
            error: true,
            msg: error?.response?.data?.message || 'Error al crear beneficiario',
        };
    }
};

export const updateBeneficiario = async (userId: number, beneficiarioId: number, payload: any) => {
    try {
        const {data} = await axios.post(`${API_URL}/users/${userId}/beneficiary/${beneficiarioId}`, payload);
        return {error: false, data};
    } catch (error: any) {
        return {
            error: true,
            msg: error?.response?.data?.message || 'Error al actualizar beneficiario',
        };
    }
};

export const deleteBeneficiario = async (userId: number, beneficiarioId: number, token: string) => {
    try {
        console.log(token)
        const response = await fetch(`${API_URL}/users/${userId}/beneficiary/${beneficiarioId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return {
            error: !response.ok,
            msg: data.message || 'Error inesperado',
        };
    } catch (error) {
        return {
            error: true,
            msg: 'Error de red o servidor',
        };
    }
};

