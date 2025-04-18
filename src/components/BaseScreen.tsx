import React from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    StyleProp,
    ViewStyle, SafeAreaView, StatusBar, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '../constants/theme';
import FondoAzul from "./svg/fondoAzul";

type Props = {
    children: React.ReactNode;
    scroll?: boolean;
    style?: StyleProp<ViewStyle>;
};

export default function BaseScreen({ children, scroll = true, style }: Props) {
    const Content = scroll ? ScrollView : View;
    const { width, height } = Dimensions.get('window');

    return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#0B3F61'}} >

                <View style={StyleSheet.absoluteFill}>
                    <LinearGradient
                        colors={Gradients.blue}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <View style={{ position: 'absolute', bottom: 0 }}>
                        <FondoAzul width={width} />
                    </View>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ flex: 1 }}
                >
                    <View style={styles.wrapper}>
                        <Content contentContainerStyle={[styles.contentContainer, style]}>
                            {children}
                        </Content>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'relative',

    },
    contentContainer: {
        justifyContent: 'center',
    },
});
