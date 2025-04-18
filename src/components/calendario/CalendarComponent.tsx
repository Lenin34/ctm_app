import React from 'react';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { vs } from 'react-native-size-matters';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import '../../constants/localeCalendar';

export default function CalendarComponent({ markedDates, setCalendarDaySelected }) {
    const today = new Date();
    const min   = new Date(today.getFullYear(), today.getMonth(), 1);
    //const max   = new Date(today.getFullYear(), today.getMonth() + 2, 1);

    const formatYMD = (d: Date) => {
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${mm}-${dd}`;
    };

    const locale = LocaleConfig.locales[LocaleConfig.defaultLocale];

    const onDayPress = (day: DateData) => {
        setCalendarDaySelected(day.dateString);
    };

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
            minDate={formatYMD(min)}
            //maxDate={formatYMD(max)}

            hideExtraDays
            hideArrows={false}
            disableAllTouchEventsForDisabledDays
            markingType="custom"
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
