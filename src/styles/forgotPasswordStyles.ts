// src/styles/forgotPasswordStyles.ts
import { StyleSheet } from 'react-native';
import { mvs, ms, scale } from 'react-native-size-matters';

export const forgotPasswordStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: scale(20),
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: scale(20),
    },
    card: {
        backgroundColor: '#a5b1bf',
        borderRadius: ms(24),
        padding: scale(24),
        alignItems: 'center',
        marginHorizontal: scale(20),
        shadowColor: '#ffffff',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: ms(20),
        paddingHorizontal: ms(16),
        paddingVertical: mvs(17),
        fontSize: ms(14),
        marginBottom: mvs(25),
        color: '#000',
    },
    button: {
        width: '100%',
        backgroundColor: '#02AF14',
        borderRadius: ms(20),
        paddingVertical: mvs(3),
        alignItems: 'center',
        marginTop: mvs(10),
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: ms(14),
    },
});
