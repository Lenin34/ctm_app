import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const successStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    logo: {
        width: width * 0.35,
        height: width * 0.35,
        marginBottom: 25,
    },
    title: {
        color: '#00cc66',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    description: {
        color: '#eee',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#005ea6',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
