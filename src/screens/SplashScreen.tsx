import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { splashStyles as styles } from '../styles/splashStyles';
// @ts-ignore
import splashIcon from '../../assets/images/logo_ctm.png';
import { Gradients } from '../constants/theme';
import LogoSN from "../components/svg/LogoSN";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onFinish, 3000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={Gradients.blue}
                style={styles.gradient}
            />
            <Animatable.View
                animation="bounceIn"
                duration={2000}
                style={styles.logoContainer}
            >
                <LogoSN size={"lg"}/>
            </Animatable.View>
        </View>
    );
}
