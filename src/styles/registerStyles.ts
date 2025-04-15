import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const registerStyles = StyleSheet.create({
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        alignSelf: 'center',
        marginBottom: 15,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
    },
    label: {
        color: '#fff',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 20,
        height: 45,
        color: '#000',
    },
    disabled: {
        opacity: 0.6,
    },
    registerBtn: {
        backgroundColor: '#00cc66',
        borderRadius: 30,
        marginTop: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    registerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 25,
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
        paddingVertical: 10,
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
