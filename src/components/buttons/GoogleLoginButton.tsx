import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Image, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '../../context/AuthContext';
import { API_URL, WEB_CLIENT_ID, ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '../../constants/config';
import axios from 'axios';
import { googleLoginButtonStyles as styles } from '../../styles/googleLoginButtonStyles';
// @ts-ignore
import googleLogo from '../../../assets/images/icons/google.png';
import { makeRedirectUri } from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginButton() {
    const [loading, setLoading] = useState(false);
    const { loginWithToken } = useAuth();
    const navigation = useNavigation();

    const redirectUri = makeRedirectUri({ scheme: 'sntmovil' });
    console.log('🧭 Redirect URI generada:', redirectUri);

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        webClientId: WEB_CLIENT_ID,
        redirectUri,
        scopes: ['openid', 'email', 'profile'],
        responseType: 'id_token',
    });


    useEffect(() => {
        console.log('🌀 useEffect activado →', response);

        if (response?.type === 'success') {
            let idToken = response.authentication?.idToken;

            if (!idToken && response.params?.id_token) {
                console.log('🌐 Obteniendo id_token desde params en web...');
                idToken = response.params.id_token;
            }

            if (idToken) {
                console.log('✅ Google ID Token recibido:', idToken);
                handleLogin(idToken);
            } else {
                console.warn('⚠️ No se recibió idToken de Google (ni en auth ni en params)');
            }
        } else if (response?.type === 'error') {
            console.error('❌ Error en autenticación con Google:', response.error);
        }
    }, [response]);


    const handleLogin = async (idToken: string) => {
        try {
            setLoading(true);
            console.log('📡 Enviando ID Token a backend:', idToken);
            const res = await axios.post(`${API_URL}/auth/google`, { credential_google: idToken });

            if (res.data?.token) {
                console.log('✅ JWT del sistema recibido:', res.data.token);
                await loginWithToken(res.data.token);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                console.warn('⚠️ No se recibió un token válido del backend');
                alert('No se pudo iniciar sesión con Google.');
            }
        } catch (error) {
            console.error('❌ Error en login con Google:', error);
            alert('Ocurrió un error al iniciar sesión con Google.');
        } finally {
            setLoading(false);
        }
    };


    const handlePress = () => {
        console.log('👆 Se presionó el botón de Google. Solicitando autenticación...');
        promptAsync();
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress} disabled={loading}>
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={googleLogo} style={styles.icon} onError={(e) => console.error('🖼️ Error cargando logo de Google:', e.nativeEvent.error)} />
                    <Text style={styles.text}>Ingresar con Google</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}
