import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseScreen from "../components/BaseScreen";
import Header from "../components/Header";
import * as Animatable from "react-native-animatable";
import {homeStyles as styles} from "../styles/homeStyle";
import Carusel from "../components/Carusel";
import {vs} from "react-native-size-matters";
import NewEventModal from "../components/calendario/NewEventModal";
import CalendarComponent from "../components/calendario/CalendarComponent";
import EventList from "../components/calendario/EventList";
import EventRow from "../components/calendario/EventRow";



export default function Calendar({navigation}) {
    const scrollRef = useRef<ScrollView>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [modalSuccessVisible, setModalSuccessVisible] = useState(false);

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

/*    const markedDates = {
        '2025-04-05': { selected: true, selectedColor: '#70d7c7' },
        '2025-04-10': { marked: true, dotColor: 'red' },
        '2025-04-15': { disabled: true, disableTouchEvent: true },
    };*/

    const markedDates = [
        { idEvento: '1', date:'2025-04-06', details: 'Navidad' },
        { idEvento: '2', date:'2025-04-07', details: 'Navidad' },
    ]

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
            <Header onLogout={handleLogout} />

            <Animatable.View animation="fadeInUp" duration={800} delay={200}>
                <ScrollView contentContainerStyle={styles.scroll}>

                    <CalendarComponent markedDates={markedDates}/>
                    <TouchableOpacity onPress={() => setModalSuccessVisible(true)}
                                      style={{backgroundColor:'red'}}
                    >
                        <Text>Alerta</Text>
                    </TouchableOpacity>
                    <EventList title={"Eventos"}>
                        <View style={styles.colapsableContainer}>
                            <EventRow items={markedDates}/>
                        </View>
                    </EventList>


                    <NewEventModal visible={modalSuccessVisible} setVisible={setModalSuccessVisible}/>

                </ScrollView>
            </Animatable.View>
        </BaseScreen>
    );
}

