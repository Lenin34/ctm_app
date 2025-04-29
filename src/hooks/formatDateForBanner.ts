import {LocaleConfig} from "react-native-calendars";

interface Props {
    start_date: string,
    end_date: string,
}
export function formatDateForBanner(start_date, end_date):string{
    const locale = LocaleConfig.locales[LocaleConfig.defaultLocale];

    const start = start_date.split(' ')[0];
    const [start_anio, start_mes, start_dia] = start.split('-');

    const start_nombreMes = locale.monthNames[Number(start_mes) - 1];

    if (start_date !== end_date){
        const end = end_date.split(' ')[0];
        const [end_anio, end_mes, end_dia] = end.split('-');
        const end_nombreMes = locale.monthNames[Number(end_mes) - 1];
        return `${start_dia} DE ${start_nombreMes} A ${end_dia} DE ${end_nombreMes} ${end_anio.slice(11,16)} hrs.`
    }
    return `${start_dia} DE ${start_nombreMes} DE ${start_anio} ${start_date.slice(11,16)} hrs.`;
}
