import {Modal, TouchableWithoutFeedback, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {mvs, vs} from "react-native-size-matters";
import { BlurView } from "expo-blur";
import {X, ChevronDown} from "lucide-react-native";


type Props = {
    visible: boolean;
    setVisible: (v: boolean) => void;
    eventos: number;
}
export default function NewEventModal({visible, setVisible, eventos}: Props) {

    return (
        <Modal visible={visible} transparent animationType="fade">
                <BlurView intensity={60} tint="dark" style={{flex: 1}}>
                    <View style={styles.container}>
                        <View style={styles.rowTitle}>
                            <Text style={styles.textTitle}>¡ALERTA!</Text>
                            <TouchableOpacity style={styles.close} onPress={() => setVisible(false)}>
                                <X color="white" size={mvs(20,0.75)}  strokeWidth={3}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginVertical: vs(6)}}>
                            <Text style={styles.textTitle}>TIENES {eventos} EVENTOS PRÓXIMOS</Text>
                        </View>
                        <View >
                            <TouchableOpacity style={styles.row} onPress={() => setVisible(false)}>
                                <Text style={styles.textLink}>Ver eventos</Text>
                                <ChevronDown color="white" size={mvs(20,0.75)} strokeWidth={3}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
        container: {
            backgroundColor: '#E52D1D',
            paddingHorizontal: vs(16),
            paddingVertical: vs(14),
            width: '80%',
            marginHorizontal: 'auto',
            marginTop: vs(140),
            borderRadius: 20
        },
        textTitle: {
            color: 'white',
            fontWeight: '900',
            fontSize: vs(18),
            textAlign: 'center',
            fontFamily: 'Monserrat'
        },
        textLink: {
            color: 'white',
            fontWeight: '900',
            fontSize: vs(14),
            textAlign: 'center',
            textDecorationLine: 'underline',
            fontFamily: 'Monserrat'
        },
        close: {
            position: 'absolute',
            zIndex: 2,
            right: 0
        },
        rowTitle: {
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center'
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            alignSelf: "center"
        }
    },
);
