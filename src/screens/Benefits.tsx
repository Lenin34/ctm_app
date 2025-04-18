import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, Text, View} from 'react-native';
import BaseScreen from "../components/BaseScreen";
import Header from "../components/Header";
import Descuentos from "../components/benefits/Descuentos";
import {vs} from "react-native-size-matters";
import * as Animatable from 'react-native-animatable';

interface Descuento{
    idDescuento: string;
    image: string;
    titulo: string;
    vigencia: string;
    condiciones: string;
}


const descuentos: Descuento[] = [
    {
        idDescuento: '1',
        image: '../../assets/images/1.jpg',
        titulo: 'Descuento A',
        vigencia: '2025-04-16',
        condiciones: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
        idDescuento: '1',
        image: '../../assets/images/1.jpg',
        titulo: 'Descuento A',
        vigencia: '2025-04-16',
        condiciones: 'lorem impsuim'
    },
    {
        idDescuento: '1',
        image: '../../assets/images/1.jpg',
        titulo: 'Descuento A',
        vigencia: '2025-04-16',
        condiciones: 'lorem impsuim'
    },
    {
        idDescuento: '1',
        image: '../../assets/images/1.jpg',
        titulo: 'Descuento A',
        vigencia: '2025-04-16',
        condiciones: 'lorem impsuim'
    },
];

export default function Benefits({navigation}: any) {
    const scrollRef = useRef<ScrollView>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;

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

    return (
        <BaseScreen>
            <Header onLogout={handleLogout}/>
            <Animatable.View animation="fadeInUp" duration={800} delay={200} style={{marginTop: vs(50)}}>
                <Descuentos descuentos={descuentos}/>
            </Animatable.View>
        </BaseScreen>
    );
}
