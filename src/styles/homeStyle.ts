import { StyleSheet, Dimensions } from 'react-native';
import { scale, vs, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');
const imgGrid = (Dimensions.get('window').width * 0.8) / 3;
export const homeStyles = StyleSheet.create({
    scroll: {
        paddingTop: vs(20)
    },
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
    mainBanner: {
        alignSelf: 'center',
        width: '90%',
        height: vs(175),
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
        width: imgGrid,
        height: imgGrid,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
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
        backgroundColor: 'white'
    }
});
