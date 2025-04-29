import {Image, Text, TouchableOpacity, View} from "react-native";
import {homeStyles as styles} from "../../styles/homeStyle";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/AppNavigator";



interface Benefit {
    id: string;
    title: string;
    description: string;
    validity_start_date: string;
    validity_end_date: string;
    image: string;
}

export default function Descuentos({descuentos}){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'BenefitDetails'>>();

    const handleModal = (item: Benefit) => {

        navigation.navigate('BenefitDetails', {descuento: item})
    }

    return(
        <View style={styles.gridContainer}>
            {descuentos.map((item, idx) => (
                <View key={idx} style={styles.gridItem}>
                    <TouchableOpacity onPress={() => handleModal(item)}>
                        <Image source={{uri: item.image}} style={styles.cardImage} resizeMode="cover" />
                    </TouchableOpacity>
                    <View style={styles.cardOverlay}>
                        <Text style={styles.cardText}>{item.title}</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}