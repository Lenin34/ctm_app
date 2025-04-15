import React from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    StyleProp,
    ViewStyle, SafeAreaView, StatusBar,
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

            <SafeAreaView style={{flex: 1, backgroundColor: '#111921'}} edges={['top']} >
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
            </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#000',

    },
    contentContainer: {
        justifyContent: 'center',
    },
});
