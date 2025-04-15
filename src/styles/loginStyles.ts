import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    logo: {
        width: width * 0.35,
        height: width * 0.35,
        alignSelf: 'center',
        marginBottom: 20,
    },
    wrapper: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#000', // fondo por si fallara el gradiente
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
    },
    label: {
        color: '#ffffff',
        marginBottom: 5,
        marginTop: 10,
        alignContent: 'center',
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        paddingHorizontal: 20,
        height: 45,
        color: '#000',
        paddingRight: 45,
    },
    iconOverlay: {
        position: 'absolute',
        right: 15,
        top: 10,
        zIndex: 1,
    },
    loginBtn: {
        backgroundColor: '#005ea6',
        borderRadius: 30,
        marginTop: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    loginText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 15,
        textDecorationLine: 'underline',
    },
    registerText: {
        color: '#eee',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
    },
    registerLink: {
        color: '#00cc66',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingTop: 10,
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
});
