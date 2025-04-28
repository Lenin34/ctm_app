import {StyleSheet, Text, View} from "react-native";
import {vs} from "react-native-size-matters";
import {backgroundColor} from "react-native-calendars/src/style";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/colors";


interface Evento {
    id: string;
    description: string;
    end_date: string;
    start_date: string;
    image: string;
    title: string;
}

type Props = {
    eventos: Evento[]
}
export default function TodayEvent({eventos}: Props){

    return(
        <View style={styles.container}>


            {eventos[0].description === 'NO HAY EVENTOS DISPONIBLES' ? (
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{eventos[0].start_date}</Text>
                    </View>
                    <View style={styles.separator}/>
                    <View style={[styles.details, {alignItems: 'center'}]}>
                        <Text style={styles.detailsText}>{eventos[0].description}</Text>
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{eventos[0].start_date.slice(0,10)}</Text>
                    </View>
                    <View style={styles.separator}/>
                    <View style={styles.details}>
                        {eventos.map((item: Evento) => (
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Ionicons name={'ellipse'} size={vs(13)} color={COLORS[parseInt(item.id, 10) % COLORS.length]}/>
                                <Text key={item.id} style={[styles.detailsText, {}]}>{item.description.toUpperCase()} {item.start_date.slice(11,16)} HRS.</Text>
                            </View>
                        ))}
                    </View>
                </>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(209,209,209,0.5)',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 30,
        paddingVertical: vs(5),
        marginVertical: vs(15)
    },
    header: {
        alignItems: 'center',
        marginVertical: vs(10)
    },
    headerText: {
        fontSize: vs(16),
        color: '#FFF',
        fontWeight: "bold"
    },
    details: {
        alignItems: "flex-start",
        margin: vs(20)
    },
    detailsText: {
        fontSize: vs(14),
        color: '#FFF',
        marginLeft: vs(3)
    },
    separator: {
        height: 2,
        borderRadius: 3,
        backgroundColor: '#FFF',
        width: '80%',
        alignSelf: "center",

    },
});