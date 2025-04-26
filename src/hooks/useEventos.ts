import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { API_URL } from '../constants/config';
import { useAuth } from '../context/AuthContext';
import {LocaleConfig} from "react-native-calendars";
import formatYMD from "./formatYMD";
import formatYMDWithOffset from "./formatYMD";

interface Props {
    companyId: string;
    start_date: string;
    end_date:   string;
    amount:    string;
}

export interface Evento {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date:   string;
    image:      string;
}

interface ApiResponse {
    code:   number;
    events: Evento[];
}

export function useEventos({ companyId, start_date, end_date, amount }: Props) {
    const { authState } = useAuth();
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        setLoading(true);
        setError(null);
        console.log("📡 Fetching events…", start_date, end_date);
        axios.get<ApiResponse>(`${API_URL}/events`, {
            params: {
                company_id: companyId,
                start_date: start_date,
                end_date: end_date,
                amount: amount,
            },
            headers: { Authorization: `Bearer ${authState.token}` },
        })
            .then(({ data }) => setEventos(data.events))
            .catch(err => setError(err.message || 'Error cargando eventos'))
            .finally(() => setLoading(false));
    }, [companyId, start_date, end_date, amount, authState.token]);

    console.log(eventos)
    return { eventos, loading, error };
}