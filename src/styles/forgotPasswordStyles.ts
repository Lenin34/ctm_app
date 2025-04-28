// styles/forgotPasswordStyles.ts

import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export const forgotPasswordStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: ms(20),
    },
    card: {
        backgroundColor: '#e6edf4',
        borderRadius: ms(24),
        padding: ms(20),
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: ms(30),
        paddingHorizontal: ms(16),
        paddingVertical: mvs(10),
        fontSize: ms(14),
        marginBottom: mvs(20),
        color: '#333',
    },
    button: {
        width: '90%',
        backgroundColor: '#02AF14',
        borderRadius: ms(30),
        paddingVertical: mvs(14),
        alignItems: 'center',
    },
});
