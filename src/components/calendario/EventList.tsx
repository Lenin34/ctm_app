import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Animated,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import { ChevronDown, X } from 'lucide-react-native';
import { mvs, vs } from 'react-native-size-matters';

const EventList = ({ title, children }) => {
    const [collapsed, setCollapsed] = useState(true);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleCollapse = () => {
        Animated.timing(animation, {
            toValue: collapsed ? 1 : 0,
            duration: 300,
            useNativeDriver: false, // height no funciona con native driver
        }).start(() => {
            setCollapsed(!collapsed);
        });
    };

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100], // puedes ajustar esto según tu contenido
    });

    const animatedStyle = {
        height: heightInterpolate,
        width: '70%',
        overflow: 'hidden',
        borderBottomLeftRadius: 20,
        borderBottomLeftRadius: 20,
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.rowTitle}>
                    <TouchableOpacity style={styles.close} onPress={toggleCollapse}>
                        <X
                            color="white"
                            size={mvs(20, 0.75)}
                            strokeWidth={3}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>TIENES 3 EVENTOS PRÓXIMOS</Text>
                </View>
                <TouchableOpacity onPress={toggleCollapse}  style={styles.row}>
                    <Text style={styles.textLink}>Ver eventos</Text>
                    <ChevronDown color="white" size={mvs(20, 0.75)} strokeWidth={3} />
                </TouchableOpacity>
            </View>
            <Animated.View style={animatedStyle}>
                <View>{children}</View>
            </Animated.View>
        </View>
    );
};

export default EventList;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        marginVertical: vs(10),
    },
    container: {
        backgroundColor: '#E52D1D',
        paddingHorizontal: vs(16),
        paddingVertical: vs(14),
        width: '70%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    textTitle: {
        color: 'white',
        fontWeight: '900',
        fontSize: vs(16),
        textAlign: 'center',
        fontFamily: 'Montserrat',
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
