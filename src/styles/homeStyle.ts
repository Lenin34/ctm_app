import { StyleSheet, Dimensions } from 'react-native';
import { scale, vs, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');
const imgGrid = (Dimensions.get('window').width * 0.8) / 3;
export const homeStyles = StyleSheet.create({

    sectionTitle: {
        fontSize: vs(12),
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    postImage: {
        width: vs(100),
        height: vs(100),
        borderRadius: 12,
        marginRight: vs(8),
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4.5,
        elevation: 6,
    },
    bannerWrapper: {
        width: '90%',
        aspectRatio: 16 / 9,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'red',
        objectFit: "cover"
    },
    card: {
        marginRight: 15,
        alignItems: 'center',
        width: 140,
    },
    cardImage: {
        width: imgGrid,
        height: imgGrid,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 8,
    },
    cardOverlay: {
        paddingVertical: vs(3),
    },
    cardText: {
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '90%',
        alignSelf: "center",
    },
    gridItem: {
        width: imgGrid,
        borderRadius: 8,
        overflow: 'hidden',

    },
    colapsableContainer: {
        width: '100%',
        backgroundColor: 'rgba(209,209,209,0.5)',
        paddingHorizontal: vs(8)
    },
    imageInfo: {
        position: 'absolute',
        zIndex: 2,
        bottom: vs(30),
        left: vs(25)
    },
    infoTitle: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: vs(18),
        fontWeight: '900'
    },
    infoDate: {
        color: 'white',
        textTransform: "uppercase",
        fontSize: vs(10)
    }
});
