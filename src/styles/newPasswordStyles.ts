// src/styles/newPasswordStyles.ts

import { StyleSheet, Dimensions } from 'react-native';
import { vs, mvs } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

export const newPasswordStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: mvs(20),
    },
    card: {
        backgroundColor: 'rgb(66,111,161)',
        borderRadius: 20,
        paddingVertical: mvs(30),
        paddingHorizontal: mvs(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 10,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: mvs(20),
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: vs(12),
        paddingHorizontal: vs(16),
        fontSize: vs(14),
        color: '#000',
        borderWidth: 1,
        borderColor: '#000000',
    },
    enhancedInput: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: '35%',
        transform: [{ translateY: -4 }],
    },
    button: {
        backgroundColor: '#f8931e',
        paddingVertical: mvs(6),
        borderRadius: 30,
        alignItems: 'center',
        marginTop: mvs(10),
    },
});
