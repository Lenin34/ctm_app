import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../constants/config";
import {useFocusEffect} from "@react-navigation/native";



interface Benefit {
    id: string;
    title: string;
    description: string;
    validity_start_date: string;
    validity_end_date: string;
    image: string;
}

interface ApiResponse {
    code:   number;
    benefits: Benefit[];
}

interface Props {
    companyId: string;
    amount: number;
    start: number;
    token: string;
    setBenefits: (benefit: (prevBenefits) => any[]) => void;
    setAmount: (amount: number) => void;
}

export function useBenefits({companyId, amount, start, token, setBenefits, setAmount}: Props){
    const [loadingBenefits, setLoading] = useState(true);
    const [errorBenefits, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        console.log("📡 Fetching benefits…", "amount", amount, "start", start);

        axios.get<ApiResponse>(`${API_URL}/benefits`,{
            params: {
                company_id: companyId,
                amount,
                start
            },
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(({data}) => {
                setBenefits(prevBenefits => {
                    const beneficiosExistentes = new Set(prevBenefits.map(benefit => benefit.id));
                    const nuevosBenefits = data.benefits.filter(benefit => !beneficiosExistentes.has(benefit.id));
                    return [...prevBenefits, ...nuevosBenefits]
                });
            })
            .catch(err => setError(err.message || "Error cargando beneficios"))
            .finally(() => setLoading(false))


    }, [start, amount]);

    return {loadingBenefits, errorBenefits};

}