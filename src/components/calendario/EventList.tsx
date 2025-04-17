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
    idEvento: string;
    date: string;
    details: string;
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
                    <Text style={styles.title}>
                        TIENES {numeroEventos} EVENTOS PRÓXIMOS
                    </Text>
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
                        <View key={evento.idEvento} style={styles.eventItem}>
                            <Text style={styles.eventDetails}>{evento.details}</Text>
                            <View style={styles.dateContainer}>
                                <View style={styles.eventDot} />
                                <Text style={styles.eventDate}>
                                    {convertirFecha(evento.date)}
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
        borderRadius: 16,
        margin: 16,
        overflow: 'hidden',
    },
    header: {
        padding: 16,
        backgroundColor: '#E52D1D'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        color: 'white',
        fontSize: vs(16),
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    closeButton: {
        marginLeft: 8,
    },
    toggleButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    toggleText: {
        color: 'white',
        fontSize: vs(14),
        fontWeight: 'bold',
        marginRight: 8,
        textDecorationLine: 'underline',
    },
    content: {
        position: 'absolute',
        width: '100%',

    },
    eventItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
        marginTop: 8,
    },
    eventDot: {
        width: vs(12),
        height: vs(12),
        borderRadius: vs(6),
        backgroundColor: '#292468',
        marginRight: 8,
    },
    eventDate: {
        color: 'white',
        fontSize: vs(14),
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginTop: 12,
    },
});

export default EventList;