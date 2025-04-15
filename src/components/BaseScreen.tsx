import React from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '../constants/theme';

type Props = {
    children: React.ReactNode;
    scroll?: boolean;
    style?: StyleProp<ViewStyle>;
};

export default function BaseScreen({ children, scroll = true, style }: Props) {
    const Content = scroll ? ScrollView : View;


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <View style={styles.wrapper}>
                <LinearGradient colors={Gradients.greenish} style={StyleSheet.absoluteFillObject} />
                <Content contentContainerStyle={[styles.contentContainer, style]}>
                    {children}
                </Content>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#000',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
});
