import React, {useState, useRef, useMemo, useEffect} from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Animated,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import { ChevronDown, X } from 'lucide-react-native';
import { mvs, vs } from 'react-native-size-matters';
import {AnimatedView} from "react-native-reanimated/lib/typescript/component/View";



const EventList = ({ children, numeroEventos}) => {

    const [collapsed, setCollapsed] = useState(true);
    const animation = useRef(new Animated.Value(0)).current;
    const radiusAnim     = useRef(new Animated.Value(20)).current;
    const [contentHeight, setContentHeight] = useState(0);
    const label = collapsed ? 'Ver eventos' : 'Ocultar eventos'

    const toggleCollapse = () => {
        if (collapsed) {
            /* 1️⃣  ABRIR:  altura 0 ➜ 1  y luego radio 20 ➜ 0  */
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,           // expande
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(radiusAnim, {
                    toValue: 0,           // quita redondeo DESPUÉS
                    duration: 200,
                    useNativeDriver: false,
                }),
            ]).start(() => setCollapsed(false));
        } else {
            /* 2️⃣  CERRAR:  altura 1 ➜ 0  y luego radio 0 ➜ 20  */
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 0,           // colapsa
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(radiusAnim, {
                    toValue: 20,          // vuelve a redondear DESPUÉS
                    duration: 200,
                    useNativeDriver: false,
                }),
            ]).start(() => setCollapsed(true));
        }
    };

    const heightInterpolate = useMemo(
        () => animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, contentHeight || 1], // evita [0,0] la 1ª vez
        }),
        [animation, contentHeight]            // ← dependencia clave
    );

    const animatedStyle = {
        height: heightInterpolate,
        width: '90%',
        overflow: 'hidden',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    };

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.container, {
                borderBottomLeftRadius:  radiusAnim,
                borderBottomRightRadius: radiusAnim,
            },]}>
                <View style={styles.rowTitle}>
                    <TouchableOpacity  style={[styles.close, {opacity: collapsed ? 0 : 1 }]} onPress={toggleCollapse}>
                        <X
                            color="white"
                            size={mvs(20, 0.75)}
                            strokeWidth={3}
                        />
                    </TouchableOpacity>
                    <View style={{width: '70%'}}>
                        <Text style={styles.textTitle}>TIENES {numeroEventos} EVENTOS PRÓXIMOS</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={toggleCollapse}  style={styles.row}>
                    <Text style={styles.textLink}>{label}</Text>
                    <ChevronDown color="white" size={mvs(20, 0.75)} strokeWidth={3} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {animatedStyle}>
                <View
                    onLayout={(e) => {
                        const h = e.nativeEvent.layout.height;
                        if (h !== contentHeight) setContentHeight(h);
                    }}
                >
                    {children}</View>
            </Animated.View>
        </View>
    );
};

export default EventList;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        marginBottom: vs(30)
    },
    container: {
        backgroundColor: '#E52D1D',
        paddingHorizontal: vs(16),
        paddingVertical: vs(14),
        width: '90%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    textTitle: {
        color: 'white',
        fontWeight: '900',
        fontSize: vs(18),
        textAlign: 'center',
    },
    textLink: {
        color: 'white',
        fontWeight: '900',
        fontSize: vs(14),
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontFamily: 'Montserrat',
    },
    close: {
        position: 'absolute',
        right: 0,
    },
    rowTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
