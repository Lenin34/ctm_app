import {FlatList, Text, View} from "react-native";

interface Evento {
    idEvento: string;
    date: string;
    details: string;
}
export default function EventRow({items}: {items: Evento[]}){


    const renderitem = ({item}) => {
        return(
            <View style={{marginTop: 70}}>
                <View>{item.details}</View>
                <View>
                    <View></View>
                    <Text>{item.date}</Text>
                </View>
            </View>
        )
    }


    return(
        <View>
            <FlatList
                data={items}
                keyExtractor={(item) => item.idEvento}
                renderItem={renderitem}
                contentContainerStyle={{width: '100%'}}/>
        </View>
    )
}