import { StyleSheet, Dimensions } from 'react-native';
import { scale, vs, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');



export const loginStyles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingTop: vs(60),
        paddingBottom: vs(40),
        alignItems: 'center',
    },
    wrapper: {
        flex: 1,
        position: 'relative',
    },
    title: {
        color: '#ffffff',
        fontSize: vs(18),
        marginVertical: vs(20),
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
        borderRadius: 30,
        paddingHorizontal: vs(15),
        color: '#000',
        width: vs(200),
        paddingVertical: vs(10),
    },
    iconOverlay: {
        position: 'absolute',
        right: vs(10),
        zIndex: 1,
    },
    loginBtn: {
        backgroundColor: '#005ea6',
        borderRadius: 30,
        paddingVertical: vs(10),
        paddingHorizontal: vs(16),
        alignItems: 'center',
        marginTop: vs(20),
        width: vs(220),
        alignSelf: 'center',
    },
    loginText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: vs(13),
    },
    link: {
        color: '#ccc',
        fontSize: vs(11),
        textAlign: 'center',
        marginTop: vs(15),
        textDecorationLine: 'underline',
    },
    link1: {
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
        color: '#D5FFD9',
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
