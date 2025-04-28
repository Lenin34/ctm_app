// components/beneficiarios/BeneficiarioCard.tsx

import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {formatFecha} from '../../utils/dateUtils';

interface Props {
    nombre: string,
    kinship: string,
    fechaNacimiento: string,
    foto?: string,
    onEdit: () => void,
    onDelete: () => void,
    relacion?: string
}

export default function BeneficiarioCard({
                                             nombre,
                                             kinship,
                                             fechaNacimiento,
                                             foto,
                                             onEdit,
                                             onDelete,
                                             relacion
                                         }: Props) {
    return (
        <View style={styles.card}>
            <Image
                source={foto ? {uri: foto} : require('../../../assets/images/image (2).png')}
                style={styles.photo}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{nombre}</Text>
                <Text style={styles.relation}>{kinship ? kinship.toUpperCase() : 'SIN RELACIÓN'}</Text>

                <Text style={styles.birth}>{formatFecha(fechaNacimiento)}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity onPress={onEdit} style={styles.editBtn}>
                        <Text style={styles.btnText}>EDITAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
                        <Text style={styles.btnText}>ELIMINAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#e6edf4',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
    },
    photo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2,
    },
    relation: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    birth: {
        fontSize: 13,
        color: '#666',
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    editBtn: {
        backgroundColor: '#42c967',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    deleteBtn: {
        backgroundColor: '#e64848',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    btnText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
    },
});
