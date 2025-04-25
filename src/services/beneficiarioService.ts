import axios from 'axios';
import { API_URL } from '../constants/config';

export const getBeneficiarios = async (userId: number) => {
    try {
        const { data } = await axios.get(`${API_URL}/users/${userId}/beneficiaries`);
        return { error: false, data: data.beneficiaries };
    } catch (error: any) {
        return {
            error: true,
            msg: error?.response?.data?.message || 'Error al obtener beneficiarios',
        };
    }
};
