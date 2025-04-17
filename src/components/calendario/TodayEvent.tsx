import {StyleSheet, Text, View} from "react-native";
import {vs} from "react-native-size-matters";


interface Evento {
    idEvento: string;
    date: string;
    details: string;
}

type Props = {
    eventos: Evento[]
}
export default function TodayEvent({eventos}: Props){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                {eventos[0].details === 'NO HAY EVENTOS DISPONIBLES' ? (
                    <Text style={styles.headerText}>{eventos[0].date}</Text>
                ) : (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.dot}/>
                        <Text style={styles.headerText}>{eventos[0].date}</Text>
                    </View>
                )}

            </View>
            <View style={styles.separator}/>
            <View style={styles.details}>
                {eventos.length > 1 ? (
                    <>
                        {eventos.map((item: Evento) => (
                            <Text style={[styles.detailsText, {}]}>{`\u2022 ${item.details.toUpperCase()}`}</Text>
                        ))}
                    </>
                ) : (
                    <Text style={styles.detailsText}>{eventos[0].details}</Text>
                )}
            </View>
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
        alignItems: "center",
        marginVertical: vs(20)
    },
    detailsText: {
        fontSize: vs(14),
        color: '#FFF',

    },
    separator: {
        height: 3,
        borderRadius: 3,
        backgroundColor: '#FFF',
        width: '80%',
        alignSelf: "center",

    },
    dot: {
        backgroundColor: '#292468',
        height: vs(16),
        width: vs(16),
        marginRight: vs(8),
        borderRadius: '50%',
    },
});