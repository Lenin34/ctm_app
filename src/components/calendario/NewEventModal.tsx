import {Modal, TouchableWithoutFeedback, View, StyleSheet, Text} from "react-native";
import {mvs, vs} from "react-native-size-matters";
import { BlurView } from "expo-blur";
import {X, ChevronDown} from "lucide-react-native";


interface Props {
    visible: boolean;
    setVisible: (v: boolean) => void;
}
export default function NewEventModal({visible, setVisible}: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => setVisible(false)}>
                <BlurView intensity={60} tint="dark" style={{flex: 1}}>
                    <View style={styles.container}>
                        <View style={styles.rowTitle}>
                            <Text style={styles.textTitle}>¡ALERTA!</Text>
                            <X color="white" size={mvs(20,0.75)} style={styles.close} strokeWidth={3}/>
                        </View>
                        <View style={{marginVertical: vs(6)}}>
                            <Text style={styles.textTitle}>TIENES {} EVENTOS PRÓXIMOS</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.textLink}>Ver eventos</Text>
                            <ChevronDown color="white" size={mvs(20,0.75)} strokeWidth={3}/>
                        </View>
                    </View>
                </BlurView>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
        container: {
            backgroundColor: '#E52D1D',
            paddingHorizontal: vs(16),
            paddingVertical: vs(14),
            width: '70%',
            marginHorizontal: 'auto',
            marginTop: vs(140),
            borderRadius: 20
        },
        textTitle: {
            color: 'white',
            fontWeight: '900',
            fontSize: vs(16),
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
            alignContent: 'end'}
    },
);
