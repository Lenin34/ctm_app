// src/styles/changePasswordStyle.ts
import { StyleSheet, Dimensions } from 'react-native';
import { scale, vs, moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        padding: moderateScale(25),
        width: '90%',
        alignSelf: 'center',
        marginTop: vs(100),
    },
    title: {
        color: '#fff',
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        marginBottom: vs(20),
        alignSelf: 'center',
    },
    label: {
        color: '#fff',
        fontSize: moderateScale(12),
        marginTop: vs(10),
        marginBottom: vs(4),
    },
    inputBox: {
        position: 'relative',
        marginBottom: vs(12),
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingVertical: vs(10),
        paddingHorizontal: scale(20),
        fontSize: moderateScale(14),
    },
    eyeIcon: {
        position: 'absolute',
        right: scale(20),
        top: vs(12),
    },
    btn: {
        backgroundColor: '#02AF14',
        borderRadius: 25,
        paddingVertical: vs(12),
        marginTop: vs(20),
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: moderateScale(14),
    },
    errorText: {
        color: '#FF0000',
        fontSize: moderateScale(12),
        marginTop: vs(5),
        textAlign: 'center',
    }
});

export default styles;
