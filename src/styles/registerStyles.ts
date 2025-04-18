import { StyleSheet, Dimensions } from 'react-native';
import {vs} from "react-native-size-matters";


export const registerStyles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: vs(18),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: vs(8),
    },
    label: {
        color: '#fff',
        marginVertical: vs(5),
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: vs(20),
        paddingVertical: vs(8),
        color: '#000',
        width: vs(200)
    },
    disabled: {
        opacity: 0.6,
    },
    registerBtn: {
        backgroundColor: '#02AF14',
        borderRadius: 30,
        marginTop: vs(10),
        paddingVertical: vs(10),
        alignItems: 'center',
        width: vs(125)
    },
    registerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        color: '#ccc',
        fontSize: vs(10),
        textAlign: 'center',
        marginTop: vs(50),
        textDecorationLine: 'underline',
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 12,
        marginTop: 3,
        marginLeft: 5,
    },
    selectInput: {
        justifyContent: 'center',
    },

    selectText: {
        color: '#000',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '85%',
        padding: 20,
        maxHeight: '70%',
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },

    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },

    modalItemText: {
        fontSize: 16,
        textAlign: 'center',
    },

    modalCancel: {
        marginTop: 15,
        textAlign: 'center',
        color: '#cc0000',
        fontWeight: 'bold',
        fontSize: 16,
    },

});
