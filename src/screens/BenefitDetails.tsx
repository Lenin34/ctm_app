import {Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {mvs, vs} from "react-native-size-matters";
import React, {useEffect, useRef} from "react";
import BaseScreen from "../components/BaseScreen";
import Header from "../components/common/Header";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "../navigation/AppNavigator";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import * as Animatable from "react-native-animatable";
import WhatsApp from "../components/svg/WhatsApp";

export default function BenefitDetails() {
    const route = useRoute<RouteProp<RootStackParamList, 'BenefitScreen'>>();
    const {descuento} = route.params;
    if (!descuento) return null;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'BenefitScreen'>>();
    const scrollRef = useRef<ScrollView>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;


    useEffect(() => {
        // auto-scroll posts
        let scrollX = 0;
        const scrollInterval = setInterval(() => {
            scrollX += 300;
            scrollRef.current?.scrollTo({x: scrollX, animated: true});
        }, 4000);

        return () => clearInterval(scrollInterval);
    }, []);

    useEffect(() => {
        // scale animation for banner
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.03,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <BaseScreen>
            <Header/>
            <Animatable.View animation="fadeInUp" duration={800} delay={200} style={styles.container}>

                <Image source={{uri: descuento.image}} style={styles.img} />

                <View>
                    <Text style={styles.title}>{descuento.title}</Text>
                    <Text style={styles.vigencia}> Vigencia hasta {descuento.validity_end_date}</Text>
                </View>
                <ScrollView style={styles.condicionesContainer}>
                    <Text style={styles.condicionesHeader}>Condiciones</Text>
                    <Text style={styles.condicionesBody}>{descuento.description}</Text>
                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.solicitar}>
                        <WhatsApp/>
                        <Text style={styles.solicitarText}>SOLICITAR POR WHATSAPP </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Ionicons name="reload" size={mvs(18, 0.5)} color="#fff"/>
                        <Text style={styles.buttonText}>Regresar</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </BaseScreen>

    )
}


const styles = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(209,209,209,0.5)',
            paddingVertical: vs(14),
            width: '80%',
            marginHorizontal: 'auto',
            marginTop: vs(100),
            borderRadius: 20,
            alignItems: "center",
            paddingTop: vs(115),
            justifyContent: "space-evenly",
        },
        img: {
            width: vs(150),
            height: vs(150),
            objectFit: 'fill',
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
            width: vs(200),
            maxHeight: vs(110),
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
            flexDirection: "row",
            alignItems: "center"
        },
        buttonText: {
            fontSize: vs(14),
            paddingLeft: vs(5),
            color: '#FFF'
        },
        solicitar: {
            backgroundColor: '#02AF14',
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: vs(8),
            width: vs(200),
            borderRadius: 20,
            marginBottom: vs(10),
            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: {width: 2, height: 2},
        },
    solicitarText: {
            fontSize: vs(10),
        textAlign: "center",
        width: '50%',
        color: '#FFF',
        fontWeight: '900'
    }

    },
);