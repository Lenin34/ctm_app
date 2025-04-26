// utils/dateUtils.ts

export function formatFecha(fecha: string): string {
    if (!fecha) return 'Sin fecha';

    try {
        const fechaSolo = fecha.split(' ')[0];
        const [anio, mes, dia] = fechaSolo.split('-');

        const meses = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];

        const mesNombre = meses[parseInt(mes, 10) - 1];

        return `${parseInt(dia, 10)} ${mesNombre} ${anio}`;
    } catch (e) {
        return 'Fecha inválida';
    }
}
