import BaseScreen from "../components/BaseScreen";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {mvs, vs} from "react-native-size-matters";
import React from "react";

export default function AvisoPrivacidad({navigation}: any){
    return(
        <BaseScreen scroll={false}>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Ionicons name="reload" size={mvs(25, 0.5)} color="#fff" />
                    <Text style={styles.buttonText}>Regresar</Text>
                </TouchableOpacity>
            </View>
            <View>

            </View>
        </BaseScreen>
    )
}

const styles = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(209,209,209,0.5)',
            paddingHorizontal: vs(30),
            paddingVertical: vs(14),
            width: '80%',
            marginHorizontal: 'auto',
            marginTop: vs(100),
            borderRadius: 20,
            alignItems: "center",
            paddingTop: vs(100),
            justifyContent: "space-evenly",
        },
        img: {
            width: vs(130),
            height: vs(130),
            backgroundColor: 'green',
            position: 'absolute',
            zIndex: 2,
            top: -vs(40),
            borderRadius: 10,
            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: {width: 2, height: 2},
        },
        title: {
            fontSize: vs(18),
            fontWeight: "bold",
            color: 'white',
            textAlign: "center"
        },
        vigencia: {
            fontSize: vs(10),
            color: 'white',
            marginTop: vs(3),
            marginBottom: vs(15),
        },
        condicionesContainer: {
            width: '100%',
            maxHeight: vs(100),
            backgroundColor: '#FFF',
            borderRadius: 20,
            padding: vs(15),
            marginBottom: vs(15)
        },
        condicionesHeader: {
            textAlign: "center",
            fontWeight: "bold",
            fontSize: vs(12),
            marginBottom: vs(5),
        },
        condicionesBody: {
            fontSize: vs(10),
            textAlign: "justify"
        },
        button: {
            flexDirection: "row"
        },
        buttonText: {
            fontSize: vs(14),
            paddingLeft: vs(5),
            color: '#FFF'
        }

    },
);