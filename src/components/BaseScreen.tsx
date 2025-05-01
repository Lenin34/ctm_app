import React from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    StyleProp,
    ViewStyle,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '../constants/theme';
import FondoAzul from './svg/fondoAzul';

type Props = {
    children: React.ReactNode;
    scroll?: boolean;
    style?: StyleProp<ViewStyle>;
};

export default function BaseScreen({ children, scroll = true, style }: Props) {
    const { width } = Dimensions.get('window');

    const renderContent = () => {
        if (scroll) {
            return (
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={[styles.contentContainer, style]}
                >
                    {children}
                </ScrollView>
            );
        }

        return (
            <View style={[styles.contentContainer, style]}>
                {children}
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0B3F61' }} edges={['top']}>
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
                    {renderContent()}
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
        paddingBottom: 80,
        flexGrow: 1,
    },
});
