import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator} from 'react-native';
import BaseScreen from "../components/BaseScreen";
import Header from "../components/Header";
import Descuentos from "../components/benefits/Descuentos";
import {vs} from "react-native-size-matters";
import * as Animatable from 'react-native-animatable';
import {useAuth} from "../context/AuthContext";
import {useBenefits} from "../hooks/useBenefits";

interface Benefit {
    id: string;
    title: string;
    description: string;
    validity_start_date: string;
    validity_end_date: string;
    image: string;
}

export default function Benefits({navigation}: any) {
    const scrollRef = useRef<ScrollView>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const { authState } = useAuth();
    const [benefits, setBenefits] = useState<Benefit[]>([])
    const [amount, setAmount] = useState<number>(9);
    const [start, setStart] = useState(0)
    const [firstTime, setFirstTime] = useState(true)

    const {loadingBenefits, errorBenefits} = useBenefits({
        companyId: authState?.user?.company_id,
        amount: amount,
        start: start,
        token: authState?.token,
        setBenefits,
        setAmount,
    })

    useEffect(() => {
        // auto-scroll posts
        let scrollX = 0;
        const scrollInterval = setInterval(() => {
            scrollX += 300;
            scrollRef.current?.scrollTo({ x: scrollX, animated: true });
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

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const handleStart = () => {
        let prevStart = start;
        setStart(prevStart + amount)
        if (firstTime){
            setFirstTime(false)
            setAmount(3)
        }
        console.log(amount, start)

    }

    return (
        <BaseScreen>
            <Header onLogout={handleLogout}/>
            <Animatable.View animation="fadeInUp" duration={800} delay={200} style={{marginTop: vs(50)}}>


                {!loadingBenefits ? (
                    <>
                        {!errorBenefits ? (
                            <>
                                <Descuentos descuentos={benefits}/>
                                <View>
                                    <TouchableOpacity style={styles.button} onPress={handleStart}>
                                        <Text style={styles.buttonText}>Ver más</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <View>
                                <Text>Error al cargar beneficios</Text>
                            </View>
                        )}
                    </>
                ) : (
                    <ActivityIndicator size={"large"} color={'#fffff'}/>
                )}
            </Animatable.View>
        </BaseScreen>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: vs(5),
    },
    buttonText: {
        color: 'white',
        fontSize: vs(14),
        fontWeight: 'bold',
        marginRight: vs(3),
        textDecorationLine: 'underline',
    },
})
