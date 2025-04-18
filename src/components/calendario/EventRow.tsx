import {FlatList, StyleSheet, Text, View} from "react-native";
import {vs} from "react-native-size-matters";
import {useState} from "react";
import {LocaleConfig} from "react-native-calendars";

interface Evento {
    idEvento: string;
    date: string;
    details: string;
}



export default function EventRow({items}: {items: Evento[]}){
    const locale = LocaleConfig.locales[LocaleConfig.defaultLocale];

    const convertirFecha = (fecha: string): string => {
        const [anio, mes, dia] = fecha.split('-');
        const nombreMes = locale.monthNames[Number(mes)-1];
        return `${dia} DE ${nombreMes} DE ${anio}`;
    }

    return(
        <View>
            {items.map((item) => (
                <View style={styles.container} key={item.idEvento}>
                    <View style={styles.containerDetails}>
                        <Text style={styles.details}>{item.details}</Text>
                    </View>
                    <View style={styles.containerDate}>
                        <View style={styles.dot}/>
                        <Text style={styles.date}>{convertirFecha(item.date)}</Text>
                    </View>
                    <View style={styles.separator}/>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: vs(16),
        paddingVertical: vs(12),
    },
    containerDetails: {
    },
    details: {
        fontSize: vs(14),
        color: '#FFF',
        textTransform: "uppercase"
    },
    containerDate: {
        flexDirection: 'row',
        paddingVertical: vs(5),
        alignItems: "center",
    },
    dot: {
        backgroundColor: '#292468',
        height: vs(16),
        width: vs(16),
        marginRight: vs(8),
        borderRadius: '50%',
    },
    date: {
        color: '#FFF',
        fontSize: vs(16),
    },
    separator: {
        height: 3,
        borderRadius: 3,
        backgroundColor: '#FFF',
        width: '100%',
        alignSelf: "center",
    }
});

