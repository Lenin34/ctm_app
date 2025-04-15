import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
    scroll: {
        paddingBottom: 80,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 30,
        marginBottom: 15,
    },
    postImage: {
        width: width * 0.7,
        height: 160,
        borderRadius: 12,
        marginRight: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4.5,
        elevation: 6,
    },
    mainBanner: {
        width: '100%',
        height: 220,
        borderRadius: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    card: {
        marginRight: 15,
        alignItems: 'center',
        width: 140,
    },
    cardImage: {
        width: 140,
        height: 140,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    cardOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 6,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0,0,0,0.55)',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    cardText: {
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
