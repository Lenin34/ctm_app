// i18n-calendar.ts
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['es'] = {
    monthNames: [
        'ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO',
        'JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'
    ],
    monthNamesShort: [
        'ene','feb','mar','abr','may','jun',
        'jul','ago','sep','oct','nov','dic'
    ],
    dayNames: [
        'domingo','lunes','martes','miércoles','jueves','viernes','sábado'
    ],
    dayNamesShort: ['Do','Lu','Ma','Mi','Ju','Vi','Sa']
};

LocaleConfig.defaultLocale = 'es';
