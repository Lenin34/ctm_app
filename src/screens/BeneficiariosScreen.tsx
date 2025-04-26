// screens/BeneficiariosScreen.tsx

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import BaseScreen from '../components/BaseScreen';
import {useAuth} from '../context/AuthContext';
import {getBeneficiarios} from '../services/beneficiarioService';
import {showErrorAlert, showSuccessAlert} from '../utils/alertUtils';
import {SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { Alert } from 'react-native';

import BeneficiarioCard from '../components/beneficiarios/BeneficiarioCard';
import Header from "../components/common/Header";
import {nuevoBeneficiarioStyles as styles} from "../styles/nuevoBeneficiarioStyles";
import { deleteBeneficiario } from '../services/beneficiarioService'; // asegúrate de tenerlo


export default function BeneficiariosScreen({navigation}: any) {
    const {authState} = useAuth();
    const [beneficiarios, setBeneficiarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = authState.token;

    const handleDelete = async (beneficiarioId: number) => {
        const userId = authState.user?.user_id;
        if (!userId || !token) {
            showErrorAlert({ error: { code: 'AUTH_ERROR', message: 'Usuario no autenticado' } });
            return;
        }

        const response = await deleteBeneficiario(userId, beneficiarioId, token);

        if (response.error) {
            showErrorAlert({ error: { code: 'DELETE_ERROR', message: response.msg } });
        } else {
            setBeneficiarios(prev => prev.filter(b => b.id !== beneficiarioId));
            showSuccessAlert('Beneficiario eliminado', 'Se eliminó correctamente.');
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = authState.user?.user_id;
                if (!userId) throw new Error('Usuario no identificado');

                const response = await getBeneficiarios(userId);

                console.log(response.data);

                if (response.error) {
                    showErrorAlert({error: {code: 'FETCH_BENEFICIARIOS', message: response.msg}});
                } else {
                    console.log(response.data);
                    setBeneficiarios(response.data);
                }

            } catch (error: any) {
                showErrorAlert({error: {code: 'UNEXPECTED_ERROR', message: error.message}});
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <BaseScreen scroll={false}>
            <Header />

            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 16 }}>

                </Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#00aa88" />
                ) : (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 120 }}
                        data={beneficiarios}
                        keyExtractor={(item: any) => item.id.toString()}
                        renderItem={({ item }) => (
                            <BeneficiarioCard
                                nombre={`${item.name} ${item.last_name}`}
                                relacion={item.kinship}
                                fechaNacimiento={item.birthday}
                                foto={item.photo}
                                onEdit={() =>
                                    navigation.navigate('NuevoBeneficiario', { beneficiario: item })
                                }
                                onDelete={() =>
                                    Alert.alert(
                                        '¿Eliminar beneficiario?',
                                        'Esta acción no se puede deshacer.',
                                        [
                                            { text: 'Cancelar', style: 'cancel' },
                                            {
                                                text: 'Eliminar',
                                                style: 'destructive',
                                                onPress: () => handleDelete(item.id),
                                            },
                                        ]
                                    )
                                }
                            />
                        )}
                        ListEmptyComponent={
                            <Text style={{ textAlign: 'center', marginTop: 40 }}>
                                No hay beneficiarios registrados.
                            </Text>
                        }
                    />
                )}

                <TouchableOpacity style={styles.regresar} onPress={() => navigation.goBack()}>
                    <Text style={styles.regresarText}>← Regresar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 30,
                    backgroundColor: '#42c967',
                    borderRadius: 30,
                    padding: 16,
                    elevation: 5,
                    zIndex: 10,
                }}
                onPress={() => navigation.navigate('NuevoBeneficiario')}
            >
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
        </BaseScreen>
    );

}

