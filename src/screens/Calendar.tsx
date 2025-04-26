import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseScreen from "../components/BaseScreen";
import Header from "../components/common/Header";
import * as Animatable from "react-native-animatable";
import {homeStyles as styles} from "../styles/homeStyle";
import NewEventModal from "../components/calendario/NewEventModal";
import CalendarComponent from "../components/calendario/CalendarComponent";
import EventList from "../components/calendario/EventList";
import EventRow from "../components/calendario/EventRow";
import {generateMarkedDates} from "../hooks/markedDates";
import TodayEvent from "../components/calendario/TodayEvent";
import findEvents from "../hooks/findEvents";

interface Evento {
    idEvento: string;
    date: string;
    details: string;
}

export default function Calendar({navigation}) {
    const scrollRef = useRef<ScrollView>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
    const [calendarDaySelected, setCalendarDaySelected] = useState<string>(new Date().toISOString().split('T')[0]);
    const [numeroEventos, setNumeroeventos] = useState(0)




    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const eventosApi = [
        { idEvento: '1', date:'2025-04-16', details: 'duplicado 1' },
        { idEvento: '2', date:'2025-04-06', details: 'duplicado 2' },
        { idEvento: '3', date:'2025-05-09', details: '9 de mayo' },
        { idEvento: '4', date:'2025-04-11', details: '11 de abril' },
        { idEvento: '5', date:'2026-04-13', details: '13 de abril 2026' },
        { idEvento: '6', date:'2025-9-18', details: '18 de octubre' },
        { idEvento: '7', date:'2025-12-18', details: '18 de diciembre' },
    ];

    const [calendarDaySelectedJson, setCalendarDaySelectedJson]= useState<Evento[]>(findEvents({
        date: calendarDaySelected,
        apiEvents: eventosApi,
    }))


    const markedDates = generateMarkedDates(eventosApi);

    useEffect(() => {
        setNumeroeventos(eventosApi.length)
        setModalSuccessVisible(true)
    }, []);

    useEffect(() => {
        const calendarDaySelectedJson: Evento[] = findEvents({
            date: calendarDaySelected,
            apiEvents: eventosApi,
        });
        setCalendarDaySelectedJson(calendarDaySelectedJson)
        console.log('dia atrapado',calendarDaySelected)
        console.log('dia desde screen calendar', calendarDaySelectedJson)
    }, [calendarDaySelected]);


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
                <View>

                    <CalendarComponent markedDates={markedDates} setCalendarDaySelected={setCalendarDaySelected}/>

                    <TodayEvent eventos={calendarDaySelectedJson}/>

                    <EventList numeroEventos={numeroEventos} eventos={eventosApi}/>

                    <NewEventModal visible={modalSuccessVisible} setVisible={setModalSuccessVisible} eventos={numeroEventos}/>

                </View>
            </Animatable.View>
        </BaseScreen>
    );
}

