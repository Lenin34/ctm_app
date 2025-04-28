import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Animated,
    ScrollView,
    View,
    Text
} from 'react-native';
import BaseScreen from "../components/BaseScreen";
import Header from "../components/Header";
import * as Animatable from "react-native-animatable";
import NewEventModal from "../components/calendario/NewEventModal";
import CalendarComponent from "../components/calendario/CalendarComponent";
import EventList from "../components/calendario/EventList";
import {generateMarkedDates} from "../hooks/markedDates";
import TodayEvent from "../components/calendario/TodayEvent";
import findEvents from "../hooks/findEvents";
import {useEventos} from "../hooks/useEventos";
import formatYMDWithOffset from "../hooks/formatYMD";
import {useAuth} from "../context/AuthContext";

interface Evento {
    id: string;
    description: string;
    end_date: string;
    start_date: string;
    image: string;
    title: string;
}

export default function Calendar({navigation}) {
    const scrollRef = useRef<ScrollView>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
    const [calendarDaySelected, setCalendarDaysSelected] = useState<string>(new Date().toISOString().split('T')[0]);
    const [calendarIdSelected, setCalendarIdSelected] = useState<string[]>([''])
    const [numeroEventos, setNumeroeventos] = useState(0);
    const today = new Date();
    const { authState } = useAuth();

    //variables para control de fetch
    const [memory, setMemory] = useState<string[]>(['']);
    const [accumulatedMarkedDates, setAccumulatedMarkedDates] = useState<{
        [p: string]: { dots: { key: string; color: string; selectedDotColor?: string; id: string }[] }
    }>({})
    const [eventos, setEventos] = useState<Evento[]>([]);



// en Calendar.tsx
    const [dateRange, setDateRange] = useState({
        start: formatYMDWithOffset(today, 0, true),
        end:   formatYMDWithOffset(today, 0, false),
    });

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const { loading, error } = useEventos({
        companyId: authState?.user?.company_id,
        token: authState?.token,
        start_date: dateRange.start,
        end_date:   dateRange.end,
        amount:    '100',
        memory: memory,
        setMemory,
        eventos: eventos,
        setEventos,
        setAccumulatedMarkedDates,
    });

    const [calendarDaySelectedJson, setCalendarDaySelectedJson]= useState<Evento[]>(findEvents({
        ids: calendarIdSelected,
        date: calendarDaySelected,
        apiEvents: eventos,
    }))

    useEffect(() => {
        if (memory.length === 1) setModalSuccessVisible(true);
    }, [eventos]);


    useEffect(() => {
        const calendarDaySelectedJson: Evento[] = findEvents({
            ids: calendarIdSelected,
            date: calendarDaySelected,
            apiEvents: eventos,
        });

        setCalendarDaySelectedJson(calendarDaySelectedJson)
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

                <CalendarComponent
                    markedDates={accumulatedMarkedDates}
                    setCalendarDaySelected={setCalendarDaysSelected}
                    setCalendarIdSelected={setCalendarIdSelected}
                    setDataRange={setDateRange}
                />

                {!loading ? (
                    <>
                        {!error ? (
                            <View>

                                <TodayEvent eventos={calendarDaySelectedJson}/>

                                <EventList numeroEventos={eventos.length} eventos={eventos}/>

                                <NewEventModal visible={modalSuccessVisible} setVisible={setModalSuccessVisible} eventos={eventos.length}/>

                            </View>
                        ) : (
                            <View>
                                <Text>Error al cargar eventos</Text>
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

