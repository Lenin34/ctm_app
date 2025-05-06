import { StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';

export const googleLoginButtonStyles = StyleSheet.create({
    button: {
        backgroundColor: '#323232',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: vs(10),
        paddingHorizontal: vs(16),
        borderRadius: 30,
        elevation: 5,
        marginTop: vs(20),
        width: vs(220),
        alignSelf: 'center',
    },
    icon: {
        width: vs(20),
        height: vs(20),
        marginRight: vs(10),
    },
    text: {
        fontSize: vs(13),
        color: '#fff',
        fontWeight: 'bold',
    },
});
