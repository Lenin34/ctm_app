// screens/BeneficiariosScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import { useAuth } from '../context/AuthContext';
import { getBeneficiarios } from '../services/beneficiarioService';
import { showErrorAlert } from '../utils/alertUtils';

export default function BeneficiariosScreen({ navigation }: any) {
    const { authState } = useAuth();
    const [beneficiarios, setBeneficiarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = authState.user?.user_id;
                if (!userId) throw new Error('Usuario no identificado');

                const response = await getBeneficiarios(userId);

                if (response.error) {
                    showErrorAlert({ error: { code: 'FETCH_BENEFICIARIOS', message: response.msg } });
                } else {
                    setBeneficiarios(response.data);
                }
            } catch (error: any) {
                showErrorAlert({ error: { code: 'UNEXPECTED_ERROR', message: error.message } });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <BaseScreen scroll>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>👥 Tus Beneficiarios</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#00aa88" />
            ) : (
                <FlatList
                    data={beneficiarios}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ padding: 12, backgroundColor: '#f1f1f1', marginBottom: 8, borderRadius: 8 }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                            <Text>{item.relationship}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text>No hay beneficiarios registrados.</Text>}
                />
            )}

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                <Text style={{ color: '#00aa88' }}>← Volver</Text>
            </TouchableOpacity>
        </BaseScreen>
    );
}
