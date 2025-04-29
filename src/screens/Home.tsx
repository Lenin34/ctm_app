import React, { useRef, useEffect, useState } from 'react';
import {Text, View, ScrollView, Image, Animated, ActivityIndicator, Dimensions} from 'react-native';
import BaseScreen from '../components/BaseScreen';
import Header from '../components/common/Header';
import { homeStyles as styles } from '../styles/homeStyle';
import * as Animatable from 'react-native-animatable';
import Carusel from "../components/Carusel";
import {vs} from "react-native-size-matters";
import Descuentos from "../components/benefits/Descuentos";
import {useBenefits} from "../hooks/useBenefits";
import {useAuth} from "../context/AuthContext";
import {usePost} from "../hooks/usePost";
import {formatDateForBanner} from "../hooks/formatDateForBanner";

const posts = [
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
];

interface Post {
    "id": number,
    "title": string,
    "description": string,
    "image": string,
    "url": string,
    "platform": string,
    "start_date": string,
    "end_date": string,
}

interface Benefit {
    id: string;
    title: string;
    description: string;
    validity_start_date: string;
    validity_end_date: string;
    image: string;
}

export default function Home({ navigation }: any) {
    const { width } = Dimensions.get('window');
    const scrollRef = useRef<ScrollView>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const { authState } = useAuth();
    const [benefits, setBenefits] = useState<Benefit[]>([])
    const [post, setPost] = useState<Post[]>([])

    const {loadingPost, errorPost} = usePost({
        company_id: authState?.user?.company_id,
        token: authState?.token,
        start_date: '',
        end_date: '',
        amount: 5,
        setPost
    })

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

    console.log(post)

    return (
        <BaseScreen>
            <Header/>

            <Animatable.View animation="fadeInUp" duration={800} delay={200}>
                <ScrollView>

                    {!loadingPost ? (
                        <>
                            {!errorPost ? (
                                <>
                                    {/* POSTS */}
                                    <Animatable.View animation="fadeInUp" delay={300}>
                                        <Text style={styles.sectionTitle}>LO ÚLTIMO EN REDES SOCIALES</Text>
                                        <Carusel posts={post}/>
                                    </Animatable.View>

                                    {/* EVENTO */}
                                    <Animatable.View animation="fadeInUp" delay={500} style={{alignSelf: 'center'}}>
                                        <Text style={styles.sectionTitle}>
                                            ¡LO QUE SE VIENE!
                                        </Text>

                                        <Image
                                            source={{ uri: post[0].image }}
                                            style={{
                                                width: width * 0.9,  // 👈 ahora sí
                                                height: (width * 0.9) * 9 / 16, // 👈 altura proporcional (opcional, para 16:9)
                                                borderRadius: 10,
                                            }}
                                            resizeMode={"cover"}
                                        />

                                        <View style={styles.imageInfo}>
                                            <Text style={styles.infoTitle}>{post[0].title}</Text>
                                            <Text style={styles.infoDate}>{formatDateForBanner(post[0].start_date, post[0].end_date)}</Text>
                                        </View>

                                    </Animatable.View>
                                </>
                            ) : (
                                <View>
                                    <Text>Error al cargar post</Text>
                                </View>
                            )}
                        </>
                    ) : (
                        <ActivityIndicator size={"large"} color={'#fffff'}/>
                    )}


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
