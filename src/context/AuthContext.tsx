import React, { createContext, useContext, useEffect, useState } from 'react';
import { saveItem, getItem, deleteItem } from '../utils/SecureStoreWrapper';
import axios from 'axios';
import { API_URL } from '../constants/config';
import { getProfile, registerUser } from '../services/authService';
import type { RegisterPayload } from '../services/authService';
import jwtDecode from 'jwt-decode';
import { ImageSourcePropType } from 'react-native';

interface AuthContextProps {
    authState: AuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
    login: (email: string, password: string) => Promise<any>;
    register: (payload: RegisterPayload) => Promise<any>;
    logout: () => Promise<void>;
    loginWithToken: (token: string) => Promise<void>;
}

interface AuthState {
    token: string | null;
    user: {
        photo: ImageSourcePropType | undefined;
        company_name: any;
        email: string;
        phone_number: string;
        last_name: string;
        name: string;
        user_id: any;
        company_id: any;
        employee_number: any;
        curp: string;
        id: number;
    } | null;
    authenticated: boolean;
    loading: boolean;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const USER_ID_KEY = 'user_id';
const COMPANY_ID_KEY = 'company_id';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
export const useAuth = () => useContext(AuthContext);

interface JwtPayload {
    exp: number;
    [key: string]: any;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        user: null,
        authenticated: false,
        loading: true,
    });

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const token = await getItem(TOKEN_KEY);
                const userRaw = await getItem(USER_KEY);

                console.log('🔐 Cargando sesión almacenada:', { token, userRaw });

                if (token && userRaw) {
                    const decoded = jwtDecode<JwtPayload>(token);
                    const currentTime = Date.now() / 1000;

                    if (decoded.exp < currentTime) {
                        console.warn('⚠️ Token expirado. Cerrando sesión automáticamente.');
                        await logout();
                        return;
                    }

                    const user = JSON.parse(userRaw);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setAuthState({
                        token,
                        user,
                        authenticated: true,
                        loading: false,
                    });
                } else {
                    setAuthState({ token: null, user: null, authenticated: false, loading: false });
                }
            } catch (error) {
                console.error('❌ Error al cargar sesión:', error);
                setAuthState({ token: null, user: null, authenticated: false, loading: false });
            }
        };

        loadAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            console.log('🔐 Iniciando login...');
            const { data } = await axios.post(`${API_URL}/login`, { email, password });
            const token = data.token;

            if (!token) {
                console.warn('❌ No se recibió el token');
                return { error: true, msg: 'Credenciales incorrectas o token faltante' };
            }

            await saveItem(USER_ID_KEY, String(data.user_id));
            await saveItem(COMPANY_ID_KEY, String(data.company_id));

            console.log('✅ Login exitoso. Token:', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const profileResponse = await getProfile();
            if (profileResponse.error) {
                return { error: true, msg: 'No se pudo obtener el perfil del usuario.' };
            }

            const userProfile = {
                ...profileResponse.profile,
                id: profileResponse.profile.user_id,
            };

            await saveItem(TOKEN_KEY, token);
            await saveItem(USER_KEY, JSON.stringify(userProfile));

            setAuthState({
                token,
                user: userProfile,
                authenticated: true,
                loading: false,
            });

            return { token, user: userProfile };
        } catch (error: any) {
            console.error('❌ Error en login:', error.response?.data || error.message);
            return {
                error: true,
                msg: error.response?.data?.message || 'Error al iniciar sesión',
            };
        }
    };

    const loginWithToken = async (token: string) => {
        try {
            console.log('🔐 Iniciando sesión con token...');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const profileResponse = await getProfile();
            if (profileResponse.error) {
                throw new Error('No se pudo obtener el perfil del usuario.');
            }

            const userProfile = {
                ...profileResponse.profile,
                id: profileResponse.profile.user_id,
            };

            await saveItem(TOKEN_KEY, token);
            await saveItem(USER_KEY, JSON.stringify(userProfile));

            setAuthState({
                token,
                user: userProfile,
                authenticated: true,
                loading: false,
            });

            console.log('✅ Sesión con token establecida');
        } catch (error) {
            console.error('❌ Error al iniciar sesión con token:', error);
            await logout();
        }
    };

    const register = async (payload: RegisterPayload) => {
        console.log('REGISTER');
        return await registerUser(payload);
    };

    const logout = async () => {
        await deleteItem(TOKEN_KEY);
        await deleteItem(USER_KEY);
        await deleteItem(USER_ID_KEY);
        await deleteItem(COMPANY_ID_KEY);
        delete axios.defaults.headers.common['Authorization'];
        setAuthState({ token: null, user: null, authenticated: false, loading: false });
        console.log('🚪 Sesión cerrada');
    };

    return (
        <AuthContext.Provider value={{ authState, setAuthState, login, logout, register, loginWithToken }}>
            {children}
        </AuthContext.Provider>
    );
};
