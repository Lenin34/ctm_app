import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const validateStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 90,
        paddingHorizontal: 30,
        paddingBottom: 40,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 10,
    },
    description: {
        color: '#eee',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 20,
        height: 50,
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 4,
        width: '100%',
        marginBottom: 20,
    },
    validateBtn: {
        backgroundColor: '#005ea6',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignItems: 'center',
        width: '100%',
    },
    validateText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 25,
        textDecorationLine: 'underline',
    },

});
