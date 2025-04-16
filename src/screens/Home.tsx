import React, { useRef, useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, Animated } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import Header from '../components/Header';
import { homeStyles as styles } from '../styles/homeStyle';
import * as Animatable from 'react-native-animatable';
import Carusel from "../components/Carusel";
import {vs} from "react-native-size-matters";

const posts = [
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
    require('../../assets/images/1.jpg'),
];

const descuentos = [
    {
        image: require('../../assets/images/1.jpg'),
        title: 'Descuento A',
    },
    {
        image: require('../../assets/images/2.jpg'),
        title: 'Descuento B',
    },
    {
        image: require('../../assets/images/2.jpg'),
        title: 'Descuento B',
    },
    {
        image: require('../../assets/images/2.jpg'),
        title: 'Descuento B',
    },
    {
        image: require('../../assets/images/1.jpg'),
        title: 'Descuento A',
    },
    {
        image: require('../../assets/images/2.jpg'),
        title: 'Descuento B',
    },
    {
        image: require('../../assets/images/2.jpg'),
        title: 'Descuento B',
    },
    {
        image: require('../../assets/images/2.jpg'),
        title: 'Descuento B',
    },

];

export default function Home({ navigation }: any) {
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
            <Header onLogout={handleLogout} />

            <Animatable.View animation="fadeInUp" duration={800} delay={200}>
                <ScrollView contentContainerStyle={styles.scroll}>
                    {/* POSTS */}
                    <Animatable.View animation="fadeInUp" delay={300}>
                        <Text style={styles.sectionTitle}>LO ÚLTIMO EN REDES SOCIALES</Text>
{/*                        <ScrollView
                            ref={scrollRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                        >
                            {posts.map((img, index) => (
                                <Image
                                    key={index}
                                    source={img}
                                    style={styles.postImage}
                                    resizeMode="cover"
                                />
                            ))}
                        </ScrollView>*/}
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

                    {/* DESCUENTOS */}
                    <Animatable.View animation="fadeInUp" delay={700}>
                        <Text style={[styles.sectionTitle, { marginBottom: vs(6) }]}>
                            ¡APROVECHA NUESTROS DESCUENTOS AQUÍ!
                        </Text>
                        <View style={styles.gridContainer}>
                            {descuentos.map((item, idx) => (
                                <View key={idx} style={styles.gridItem}>
                                    <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                                    <View style={styles.cardOverlay}>
                                        <Text style={styles.cardText}>{item.title}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </Animatable.View>

                </ScrollView>
            </Animatable.View>
        </BaseScreen>
    );
}
