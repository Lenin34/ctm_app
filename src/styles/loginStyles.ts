import { StyleSheet, Dimensions } from 'react-native';
import { scale, vs, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingTop: vs(100),
        alignItems: 'center',
    },
    wrapper: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#000', // fondo por si fallara el gradiente
    },
    title: {
        color: '#ffffff',
        fontSize: vs(18),
        marginVertical: vs(30),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        color: '#ffffff',
        marginBottom: vs(5),
        marginTop: vs(10),
        alignContent: 'center',
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center',

    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: vs(30),
        paddingHorizontal: vs(15),
        color: '#000',
        width: vs(200)

    },
    iconOverlay: {
        position: 'absolute',
        right: vs(10),
        zIndex: 1,
    },
    loginBtn: {
        backgroundColor: '#005ea6',
        borderRadius: 30,
        marginTop: 20,
        paddingVertical: vs(8),
        alignItems: 'center',
        width: vs(200)
    },
    loginText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        color: '#ccc',
        fontSize: vs(11),
        textAlign: 'center',
        marginTop: vs(15),
        textDecorationLine: 'underline',
    },
    registerText: {
        color: '#eee',
        fontSize: vs(11),
        textAlign: 'center',
    },
    registerLink: {
        color: '#00cc66',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: vs(11),
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
});
