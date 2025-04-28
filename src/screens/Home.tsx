import React, { useRef, useEffect, useState } from 'react';
import {Text, View, ScrollView, Image, Animated, ActivityIndicator} from 'react-native';
import BaseScreen from '../components/BaseScreen';
import Header from '../components/Header';
import { homeStyles as styles } from '../styles/homeStyle';
import * as Animatable from 'react-native-animatable';
import Carusel from "../components/Carusel";
import {vs} from "react-native-size-matters";
import Descuentos from "../components/benefits/Descuentos";
import {useBenefits} from "../hooks/useBenefits";
import {useAuth} from "../context/AuthContext";

const posts = [
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
];

interface Descuento{
    idDescuento: string;
    image: string;
    titulo: string;
    vigencia: string;
    condiciones: string;
}

interface Benefit {
    id: string;
    title: string;
    description: string;
    validity_start_date: string;
    validity_end_date: string;
    image: string;
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
        titulo: 'Descuento B',
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
    {
        idDescuento: '1',
        image: '../../assets/images/1.jpg',
        titulo: 'Descuento A',
        vigencia: '2025-04-16',
        condiciones: 'lorem impsuim'
    },
];

export default function Home({ navigation }: any) {
    const scrollRef = useRef<ScrollView>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const { authState } = useAuth();
    const [benefits, setBenefits] = useState<Benefit[]>([])

    const {loadingBenefits, errorBenefits} = useBenefits({
        companyId: authState?.user?.company_id,
        page: 1,
        token: authState?.token,
        setBenefits,
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


    return (
        <BaseScreen>
            <Header/>

            <Animatable.View animation="fadeInUp" duration={800} delay={200}>
                <ScrollView>
                    {/* POSTS */}
                    <Animatable.View animation="fadeInUp" delay={300}>
                        <Text style={styles.sectionTitle}>LO ÚLTIMO EN REDES SOCIALES</Text>
                        <Carusel/>
                    </Animatable.View>

                    {/* EVENTO */}
                    <Animatable.View animation="fadeInUp" delay={500}>
                        <Text style={[styles.sectionTitle, {marginBottom: vs(6)}]}>¡LO QUE SE VIENE!</Text>
                        <Animated.Image
                            source={require('../../assets/images/3.jpg')}
                            style={[styles.mainBanner, { transform: [{ scale: scaleAnim }] }]}
                            resizeMode="cover"
                        />
                    </Animatable.View>

                    {!loadingBenefits ? (
                        <>
                            {!errorBenefits ? (
                                <>
                                    {/* BENEFITS */}
                                    <Animatable.View animation="fadeInUp" delay={700}>
                                        <Text style={[styles.sectionTitle, { marginBottom: vs(6) }]}>
                                            ¡APROVECHA NUESTROS DESCUENTOS AQUÍ!
                                        </Text>
                                        <Descuentos descuentos={benefits}/>
                                    </Animatable.View>
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

                </ScrollView>
            </Animatable.View>
        </BaseScreen>
    );
}
