import { StyleSheet, Dimensions } from 'react-native';
import {vs} from "react-native-size-matters";

const { width } = Dimensions.get('window');

export const validateStyles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: vs(18),
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: vs(30),
        marginBottom: 10,
    },
    green: {
        backgroundColor: '#D5FFD9',
        width: vs(200),
        flexDirection: "row",
        paddingVertical: vs(3),
        paddingHorizontal: vs(10),
        borderRadius: 50,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    description: {
        color: '#02AF14',
        fontSize: vs(10),
        textAlign: 'left',
        flexWrap: "wrap",
        width: vs(110)
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: vs(20),
        paddingVertical: vs(10),
        color: '#000',
        fontSize: vs(12),
        textAlign: 'center',
        letterSpacing: 4,
        width: vs(200),
        marginBottom: vs(20),
    },
    validateBtn: {
        backgroundColor: '#8598B9',
        borderRadius: 30,
        paddingVertical: vs(8),
        alignItems: 'center',
        width: vs(125),
    },
    validateText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: vs(12),
    },
    link: {
        color: '#ccc',
        fontSize: vs(10),
        textAlign: 'center',
        marginTop: vs(20),
        textDecorationLine: 'underline',
    },
    indicaciones: {
        color: '#FFF',
        fontSize: vs(12),
        width: vs(200),
        textAlign: "center",
        marginVertical: vs(20)
    },
    resendBtn: {
        marginTop: vs(20),
    },
    resendText: {
        color: '#02AF14',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    disabledBtn: {
        opacity: 0.4,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },

    inputSuccess: {
        borderColor: '#02AF14',
        borderWidth: 1,
    },

    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },

    successText: {
        color: '#02AF14',
        fontSize: 12,
        marginTop: 5,
    },
});
