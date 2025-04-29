// src/styles/newPasswordStyles.ts

import { StyleSheet } from 'react-native';
import { mvs, ms } from 'react-native-size-matters';

export const newPasswordStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        alignItems: 'center',
        backgroundColor: '#a5b1bf',
        marginHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    input: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 13,
        fontSize: 16,
        marginBottom: mvs(4),
    },
    button: {
        width: '90%',
        backgroundColor: '#02AF14',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: mvs(10),
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: ms(16),
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    eyeIcon: {
        marginLeft: -36,
        zIndex: 1,
    },

});
