import {Image, Text, TouchableOpacity, View} from "react-native";
import {homeStyles as styles} from "../../styles/homeStyle";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/AppNavigator";



interface Descuento{
    idDescuento: string;
    image: string;
    titulo: string;
    vigencia: string;
    condiciones: string;
}

export default function Descuentos({descuentos}){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

    const handleModal = (item: Descuento) => {

        navigation.navigate('BenefitDetails', {descuento: item})
    }

    return(
        <View style={styles.gridContainer}>
            {descuentos.map((item, idx) => (
                <View key={idx} style={styles.gridItem}>
                    <TouchableOpacity onPress={() => handleModal(item)}>
                        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                    </TouchableOpacity>
                    <View style={styles.cardOverlay}>
                        <Text style={styles.cardText}>{item.titulo}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}