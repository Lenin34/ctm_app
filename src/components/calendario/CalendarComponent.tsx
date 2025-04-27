import React, {useState} from 'react';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { vs } from 'react-native-size-matters';
import { AntDesign } from '@expo/vector-icons';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import '../../constants/localeCalendar';
import formatYMD from "../../hooks/formatYMD";
import formatYMDWithOffset from "../../hooks/formatYMD";

type DateRange = { start: string; end: string };

export default function CalendarComponent({markedDates, setCalendarDaySelected, setCalendarIdSelected, setDataRange}: {
    markedDates: Record<string, { dots: Array<{ key: string; color: string; selectedDotColor?: string; id: string }> }>;
    setCalendarDaySelected: (date: string) => void;
    setCalendarIdSelected: (date: string[]) => void;
    setDataRange: (range: DateRange) => void;
}) {

    const today = new Date();

    const [visibleMonth, setVisibleMonth] = useState<{ month: number; year: number }>({
        month: new Date().getMonth() + 1,
        year:  new Date().getFullYear()
    });
    const onDayPress = (day: DateData) => {
        const date = day.dateString;
        console.log('fecha seleccionada', date)
        // Aquí “atrapas” tus dots para ese día
        const dayDots = markedDates[date]?.dots ?? [];
        if (dayDots.length === 0) {
            setCalendarDaySelected(date);
            setCalendarIdSelected(['']);
        }

        // Extraes los IDs
        const ids = dayDots.map(d => d.id);
        setCalendarDaySelected(date);
        setCalendarIdSelected(ids);

    };

    const min   = new Date(today.getFullYear(), today.getMonth(), 1);


    const locale = LocaleConfig.locales[LocaleConfig.defaultLocale];


    return (
        <Calendar
            onDayPress={onDayPress}

            // Flechas
            renderArrow={(direction) => (

                    <AntDesign
                        name={direction === 'left' ? 'left' : 'right'}
                        size={20}
                        color="white"

                    />
            )}

            onPressArrowLeft={(subtractMonth) => {
                subtractMonth();    // sin esto, el mes no cambiará
            }}

            // Cuando pulsan la flecha derecha:
            onPressArrowRight={(addMonth) => {
                addMonth();         // sin esto, el mes no cambiará
            }}

            // Este callback te da el mes y año activo después de cambiar:
            onMonthChange={(date: DateData) => {
                console.log('Mes cambiado →', date.month, date.year);
                setVisibleMonth({ month: date.month, year: date.year });
                const firstOfMonth = new Date(date.year, date.month - 1, 1);
                setDataRange({start: formatYMDWithOffset(firstOfMonth, 0, true), end:formatYMDWithOffset(firstOfMonth, 0, false)})
            }}

            // Header con año dinámico
            renderHeader={(date) => {
                const year      = date.getFullYear();
                const monthName = locale.monthNames[date.getMonth()] + ' ' + year;
                return (
                    <View style={{ width: vs(150) }}>
                        <Text style={{
                            fontSize: vs(18),
                            fontWeight: 'bold',
                            color: 'white',
                            paddingVertical: vs(10),
                            textAlign: 'center',
                        }}>
                            {monthName}
                        </Text>
                        <View style={{
                            height: 3,
                            backgroundColor: 'white',
                            width: '150%',
                            alignSelf: 'center',
                            borderRadius: 30,
                            zIndex: 10,
                        }}/>
                    </View>
                );
            }}

            // Rango de fechas dinámico
            minDate={formatYMDWithOffset(min, 0, true)}
            //maxDate={formatYMD(max)}

            hideExtraDays
            hideArrows={false}
            disableAllTouchEventsForDisabledDays
            markingType="multi-dot"
            markedDates={markedDates}
            monthFormat="MMMM"

            style={{
                width: '90%',
                alignSelf: 'center',
                borderRadius: 30,
                backgroundColor: 'rgba(209,209,209,0.5)',
                marginTop: vs(10),
                paddingVertical: vs(10),
            }}

            theme={{
                calendarBackground: 'transparent',
                textSectionTitleColor: '#FFF',
                dayTextColor: '#FFF',
                todayTextColor: '#0B3F61',
                textDayFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',
            }}
        />
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: vs(18),
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: vs(10),
        textAlign: 'center',
    },
    headerUnderline: {
        height: 3,
        backgroundColor: 'white',
        width: '150%',
        alignSelf: 'center',
        borderRadius: 30,
        zIndex: 10,
    },
});
