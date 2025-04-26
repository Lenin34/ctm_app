// EventList.tsx (Componente Acordeón)
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { X } from 'lucide-react-native';
import { mvs, vs } from 'react-native-size-matters';
import Animated, {
    measure,
    runOnUI,
    useAnimatedRef,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import { LocaleConfig } from 'react-native-calendars';
import RotableChevronDown from './RotableChevronDown';

interface Evento {
    id: string;
    description: string;
    end_date: string;
    start_date: string;
    image: string;
    title: string;
}

type Props = {
    numeroEventos: number;
    eventos: Evento[];
};

const EventList = ({ numeroEventos, eventos }: Props) => {

    const locale = LocaleConfig.locales[LocaleConfig.defaultLocale];

    const listRef = useAnimatedRef<Animated.View>();
    const open = useSharedValue(false);
    const heightValue = useSharedValue(0);
    const progress = useDerivedValue(() =>
        open.value ? withTiming(1, { duration: 300 }) : withTiming(0, { duration: 200 })
    );

    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: interpolate(
            progress.value,
            [0, 1],
            [0, heightValue.value],
            Extrapolation.CLAMP
        ),
        overflow: 'hidden',
    }));

    const handleToggle = () => {
        runOnUI(() => {
            'worklet';
            const measured = measure(listRef);
            if (measured) {
                if (heightValue.value === 0) {
                    heightValue.value = measured.height;
                }
                open.value = !open.value;
            }
        })();
    };

    const convertirFecha = (fecha: string): string => {
        const [anio, mes, dia] = fecha.split('-');
        const nombreMes = locale.monthNames[Number(mes) - 1];
        return `${dia} DE ${nombreMes} DE ${anio}`;
    };

    return (
        <Animated.View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <View style={{width: '70%'}}>
                        <Text style={styles.title}>
                            TIENES {numeroEventos} EVENTOS PRÓXIMOS
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleToggle} style={styles.closeButton}>
                        <X color="white" size={mvs(20)} strokeWidth={3} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleToggle} style={styles.toggleButton}>
                    <Text style={styles.toggleText}>Ver eventos</Text>
                    <RotableChevronDown progress={progress} />
                </TouchableOpacity>
            </View>

            <Animated.View style={heightAnimationStyle}>
                <Animated.View
                    ref={listRef}
                    style={styles.content}
                    onLayout={() => {
                        runOnUI(() => {
                            'worklet';
                            const measured = measure(listRef);
                            if (measured && heightValue.value === 0) {
                                heightValue.value = measured.height;
                            }
                        })();
                    }}
                >
                    {eventos.map((evento) => (
                        <View key={String(evento.id)} style={styles.eventItem}>
                            <Text style={styles.eventDetails}>{evento.description}</Text>
                            <View style={styles.dateContainer}>
                                <View style={styles.eventDot} />
                                <Text style={styles.eventDate}>
                                    {convertirFecha(evento.start_date)}
                                </Text>
                            </View>
                            <View style={styles.separator} />
                        </View>
                    ))}
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(209,209,209,0.5)',
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    header: {
        padding: vs(10),
        backgroundColor: '#E52D1D'
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: vs(3),
    },
    title: {
        color: 'white',
        fontSize: vs(16),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        position: "absolute",
        zIndex: 2,
        right: 0,
        top: 0
    },
    toggleButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: vs(5),
    },
    toggleText: {
        color: 'white',
        fontSize: vs(14),
        fontWeight: 'bold',
        marginRight: vs(3),
        textDecorationLine: 'underline',
    },
    content: {
        position: 'absolute',
        width: '100%',
        paddingBottom: vs(20)
    },
    eventItem: {
        paddingHorizontal: vs(20),
        paddingTop: vs(20),
    },
    eventDetails: {
        color: 'white',
        fontSize: vs(14),
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: vs(10),
    },
    eventDot: {
        width: vs(12),
        height: vs(12),
        borderRadius: vs(6),
        backgroundColor: '#292468',
        marginRight: vs(5),
    },
    eventDate: {
        color: 'white',
        fontSize: vs(14),
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export default EventList;