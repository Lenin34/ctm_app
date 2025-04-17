import React from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import {vs} from "react-native-size-matters";
import {AntDesign} from "@expo/vector-icons";
import {View, Text, StyleSheet} from "react-native";
import '../../constants/localeCalendar'

function fixMonth(month: string){
    return month.length === 1 ? `0${month}` : month;
}

export default function CalendarComponent({markedDates, setCalendarDaySelected}) {
    //const month = '2025-04'; // el mes que quieres mostrar: YYYY-MM
    const currentDate: Date = new Date();
    let currentMont: string = String(currentDate.getMonth() + 1);
    let maxDate: string = String(Number(currentMont) + 2);

    currentMont = fixMonth(currentMont);
    maxDate = fixMonth(maxDate);


    const currentYear: string = String(currentDate.getFullYear());

    const locale = LocaleConfig.locales[LocaleConfig.defaultLocale];

    // Define aquí tus días marcados


    const onDayPress = (day: DateData) => {
        console.log('Día seleccionado:', day.dateString);
        setCalendarDaySelected(day.dateString);
    };

    return (
        <Calendar

            onDayPress={onDayPress}
            renderArrow={(direction) => (
                <AntDesign
                    name={direction === 'left' ? 'left' : 'right'}
                    size={20}
                    color="white"
                />
            )}
            renderHeader={(date) => {
                // `date` es un Date object
                const monthName = locale.monthNames[date.getMonth()] + ' ' + currentYear;
                return (
                    <View style={{width: vs(150) }}>
                        <Text style={{ fontSize: vs(18), fontWeight: 'bold', color: 'white', paddingVertical: vs(10), textAlign: 'center' }}>{monthName}</Text>
                        <View style={{ height: 3, backgroundColor: 'white', zIndex: 10, width: '150%', alignSelf: 'center', borderRadius: 30}}/>
                    </View>
                );
            }}


            minDate={`${currentYear}-${currentMont}-1`}
            maxDate={`${currentYear}-${maxDate}-1`}

            // Oculta días extra (de meses anteriores/siguientes)
            hideExtraDays={true}

            // Deshabilita flechas de navegación
            hideArrows={false}

            // Opcional: aún más seguro, deshabilita flechas individualmente
            disableArrowLeft={false}
            disableArrowRight={false}

            // Estilo de marcado (dot, multi-dot, period…)
            markingType={'custom'}

            // Tus fechas marcadas
            markedDates={markedDates}

            // Opciones para no permitir tocar días fuera de rango
            disableAllTouchEventsForDisabledDays={true}

            monthFormat={"MMMM"}

            style={{
                width: '90%',
                alignSelf: 'center',
                borderRadius: 30,
                backgroundColor: 'rgba(209,209,209,0.5)',
                marginTop: vs(10),
                paddingVertical: vs(10)
            }}
            // Personaliza header si quieres
            theme={{
                // Cabecera (mes / año)
                calendarBackground: 'transparent',
                textSectionTitleColor: '#FFF',
                dayTextColor: '#FFF',
                textDayFontWeight: 'bold',
                textDayHeaderFontWeight: 'bold',

            }}
        />
    );
}
