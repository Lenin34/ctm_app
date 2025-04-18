// src/styles/profileStyle.ts
import {StyleSheet, Dimensions} from 'react-native';
import {
    scale,
    verticalScale as vs,
    moderateScale as ms,
    moderateVerticalScale as mvs,
} from 'react-native-size-matters';

const {width} = Dimensions.get('window');

export const profileStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001f2e',
    },
    logo: {
        width: scale(40),
        height: scale(40),
        resizeMode: 'contain',
    },
    content: {
        padding: scale(20),
    },
    profileBox: {
        backgroundColor: '#333',
        borderRadius: ms(65),
        padding: scale(55),
        alignItems: 'center',
        paddingHorizontal: scale(25),
        width: '85%',
        alignSelf: 'center',
    },
    cameraButton: {
        backgroundColor: '#00aaff',
        borderRadius: ms(30),
        padding: ms(10),
        marginBottom: mvs(5),
    },
    cameraText: {
        color: '#fff',
        marginBottom: mvs(15),
        fontSize: ms(12),
    },
    fieldContainer: {
        width: '100%',
        marginBottom: mvs(10),
    },
    label: {
        color: '#ccc',
        fontSize: ms(12),
        marginBottom: mvs(5),
    },
    inputBox: {
        backgroundColor: '#fff',
        borderRadius: ms(20),
        paddingVertical: mvs(8),
        paddingHorizontal: ms(15),
    },
    inputText: {
        color: '#000',
        fontSize: ms(14),
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: mvs(20),
        gap: scale(8),
    },

    passwordButton: {
        flex: 1,
        backgroundColor: '#8797B8',
        borderRadius: ms(20),
        paddingVertical: mvs(10),
        paddingHorizontal: ms(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    greenButton: {
        backgroundColor: '#02AF14',
        borderRadius: ms(20),
        padding: ms(12),
        alignItems: 'center',
        width: '100%',
        marginTop: mvs(15),
    },
    blueButton: {
        backgroundColor: '#0077cc',
        borderRadius: ms(20),
        padding: ms(12),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: mvs(15),
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: 12,
        marginLeft: 6,
    },
    updateButton: {
        flex: 1,
        backgroundColor: '#38556B',
        borderRadius: ms(20),
        paddingVertical: mvs(10),
        paddingHorizontal: ms(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
