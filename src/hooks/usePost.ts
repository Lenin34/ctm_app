import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../constants/config";

interface Props {
    company_id: string;
    token: string;
    start_date: string;
    end_date: string;
    amount: number;
    setPost: (post: Post[]) => void;
}

interface Post {
    "id": number,
    "title": string,
    "description": string,
    "image": string,
    "url": string,
    "platform": string,
    "start_date": string,
    "end_date": string,
}

interface ApiResponse {
    social_media: Post[],
    code: number
}
export function usePost({company_id, token, start_date, end_date, amount, setPost}: Props){

    const [loadingPost, setLoading] = useState(true);
    const [errorPost, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true)

        axios.get<ApiResponse>(`${API_URL}/social-media`, {
            params: {
                company_id,
                start_date,
                end_date,
                amount
            },
            headers: { Authorization: `Bearer ${token}` },
        } )
            .then(({data}) => {
                setPost(data.social_media)
            })
            .catch(err => setError(err.message || "Error cargando beneficios"))
            .finally(() => setLoading(false))

    }, []);

    return{loadingPost, errorPost}

}