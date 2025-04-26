import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.85;
const avatarSize = width * 0.22;
const logoWidth = width * 0.35;

export const credentialStyles = StyleSheet.create({
    backTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 150,
        marginLeft: 16,
        gap: 6,
    },
    backText: {
        color: 'white',
        fontWeight: 'bold',
    },
    card: {
        marginTop: 40,
        width: cardWidth,
        backgroundColor: '#e6edf4',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        alignSelf: 'center',
    },
    logo: {
        width: logoWidth,
        height: logoWidth * 0.4, // Relación de aspecto 2.5:1
        marginBottom: 16,
    },
    avatar: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        marginBottom: 16,
        backgroundColor: '#ccc',
    },
    name: {
        fontSize: width * 0.05, // 5% del ancho
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    info: {
        fontSize: width * 0.04, // 4% del ancho
        color: '#333',
        marginBottom: 4,
        textAlign: 'center',
    },
    qrBox: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
    },
});
