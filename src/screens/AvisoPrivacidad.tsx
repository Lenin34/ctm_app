import BaseScreen from "../components/BaseScreen";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {mvs, vs} from "react-native-size-matters";
import React, {useState} from "react";

export default function AvisoPrivacidad({navigation}: any) {

    const [pressed, setPressed] = useState(false);
    return (
        <BaseScreen scroll={false}>
            <View style={styles.nav}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Ionicons name="reload" size={mvs(25, 0.5)} color="#fff"/>
                    <Text style={styles.buttonText}>Regresar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>AVISO DE PRIVACIDAD</Text>
                </View>
                <View style={styles.content}>
                    <ScrollView>
                        <Text style={styles.text}>AVISO DE PRIVACIDAD</Text>
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => (setPressed(!pressed))} style={{flexDirection: 'row'}}>
                    <Ionicons name={pressed ? 'square-outline' : 'checkbox'} color={'white'} size={vs(14)}/>
                    <Text style={styles.agreement}>ESTOY DE ACUERDO</Text>
                </TouchableOpacity>
            </View>
        </BaseScreen>
    )
}

const styles = StyleSheet.create({
        nav: {
            marginTop: vs(35),
            marginLeft: vs(20),
        },
        button: {
            flexDirection: "row",
            alignItems: "center"
        },
        buttonText: {
            fontSize: vs(14),
            paddingLeft: vs(5),
            color: '#FFF'
        },
        container: {
            width: '80%',
            height: vs(500),
            alignSelf: "center",
            backgroundColor: 'rgba(255,255,255,0.34)',
            marginVertical: vs(50),
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "space-evenly"

        },
        title: {
            fontSize: vs(16),
            color: '#FFF',

        },
        content: {
            width: '80%',
            height: '70%',
            backgroundColor: '#FFF',
            borderRadius: 20,
            padding: vs(20)
        },
        text: {
            fontSize: vs(9),
            textAlign: "justify",
        },
    agreement: {
            color: '#FFF',
        marginLeft: vs(5)
    }
    }
);