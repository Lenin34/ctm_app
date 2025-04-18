import React, { useState } from 'react';
import {Text, TextInput, TouchableOpacity, Alert, View} from 'react-native';
import BaseScreen from '../components/BaseScreen';
import { validateStyles as styles } from '../styles/validateStyles';
import LogoCTM from '../components/svg/LogoCTM';
import LogoSN from "../components/svg/LogoSN";
import {Ionicons} from "@expo/vector-icons";
import {vs} from "react-native-size-matters";

export default function ValidateCode({ navigation }: any) {
    const [code, setCode] = useState('');

    const handleValidate = () => {
        if (code === '123456') {
            navigation.navigate('Success');
        } else {
            Alert.alert('❌ Código incorrecto', 'Verifica el código e intenta nuevamente.');
        }
    };

    return (
        <BaseScreen scroll={true}>
            <View style={{alignItems: 'center'}}>
                <LogoSN size="md" />
                <Text style={styles.title}>VERIFICACIÓN DE CÓDIGO</Text>
                <View style={styles.green}>
                    <Ionicons name={"checkmark-circle-outline"} size={vs(25)} color={'#02AF14'}/>
                    <Text style={styles.description}>
                        Te hemos enviado un codigo de verificación a tu celular
                    </Text>
                </View>

                <Text style={styles.indicaciones}>
                    ingresa el código enviado a tu número celular
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Ingresa el código"
                    keyboardType="numeric"
                    maxLength={6}
                    value={code}
                    onChangeText={setCode}
                />

                <TouchableOpacity style={styles.validateBtn} onPress={handleValidate}>
                    <Text style={styles.validateText}>VALIDAR</Text>
                </TouchableOpacity>
                
            </View>
        </BaseScreen>
    );
}
