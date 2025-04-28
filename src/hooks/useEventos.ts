import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { API_URL } from '../constants/config';
import { useAuth } from '../context/AuthContext';
import {LocaleConfig} from "react-native-calendars";
import formatYMD from "./formatYMD";
import formatYMDWithOffset from "./formatYMD";
import {generateMarkedDates} from "./markedDates";
import * as events from "node:events";

interface Props {
    companyId: string;
    token: string;
    start_date: string;
    end_date:   string;
    amount:    string;
    memory: string[];
    setMemory: (memory: (prevMemory) => any[]) => void;
    eventos: Evento[];
    setEventos: (evento: (prevEventos) => any[]) => void;
    setAccumulatedMarkedDates: (markedDates: (prevAccumulated) => any[]) => void;
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

export function useEventos({ companyId, token, start_date, end_date, amount, memory, setMemory, eventos, setEventos, setAccumulatedMarkedDates }: Props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const alreadyFetched = memory.includes(start_date);

        if (alreadyFetched) {
            setLoading(false);
            return;
        }

        console.log("📡 Fetching events…", start_date, end_date);

        setLoading(true);
        setError(null);

        axios.get<ApiResponse>(`${API_URL}/events`, {
            params: {
                company_id: companyId,
                start_date,
                end_date,
                amount,
            },
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(({ data }) => {
                setEventos(prevEventos => {
                    const eventosExistentes = new Set(prevEventos.map(evt => evt.id));
                    const nuevosEventos = data.events.filter(evt => !eventosExistentes.has(evt.id));
                    return [...prevEventos, ...nuevosEventos];
                });

                setAccumulatedMarkedDates(prevAccumulated => {
                    const newMarked = generateMarkedDates(data.events);
                    return { ...prevAccumulated, ...newMarked };
                });

                setMemory(prevMemory => [...prevMemory, start_date]);
            })

            .catch(err => setError(err.message || 'Error cargando eventos'))
            .finally(() => setLoading(false));
    }, [companyId, start_date, end_date, amount, token]);

    return { loading, error };
}