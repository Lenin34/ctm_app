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
    pagination: {
        page: number,
        per_page: number,
        total_items: number,
        total_pages: number,
        has_next_page: boolean,
        has_previous_page: boolean,
    }
}

interface Props {
    companyId: string;
    page: number;
    token: string;
    setPagination?: (value: boolean) => void;
    setBenefits: (benefit: (prevBenefits) => any[]) => void;
}

export function useBenefits({companyId, page, token, setBenefits, setPagination,}: Props){
    const [loadingBenefits, setLoading] = useState(true);
    const [errorBenefits, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        console.log("📡 Fetching benefits…");

        axios.get<ApiResponse>(`${API_URL}/benefits`,{
            params: {
                company_id: companyId,
                per_page: 6,
                page
            },
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(({data}) => {

                setBenefits(prevBenefits => {
                    const beneficiosExistentes = new Set(prevBenefits.map(benefit => benefit.id));
                    const nuevosBenefits = data.benefits.filter(benefit => !beneficiosExistentes.has(benefit.id));
                    return [...prevBenefits, ...nuevosBenefits]
                });

                if (setPagination) setPagination(data.pagination.has_next_page);
            })
            .catch(err => setError(err.message || "Error cargando beneficios"))
            .finally(() => setLoading(false))
    }, [page]);

    return {loadingBenefits, errorBenefits};

}