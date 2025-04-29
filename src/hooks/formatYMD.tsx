

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Devuelve el primer o último día de un mes dado, con posible offset de meses.
 *
 * @param baseDate Fecha de referencia
 * @param offsetMonths 0 = mes actual, -1 = mes anterior, +1 = mes siguiente, etc.
 * @param start true → primer día, false → último día
 */
function formatYMDWithOffset(
    baseDate: Date,
    offsetMonths: number,
    start: boolean
): string {
    const year  = baseDate.getFullYear();
    const month = baseDate.getMonth() + offsetMonths;
    if (start) {
        // Primer día: día 1
        const d = new Date(year, month, 1);
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-01`;
    } else {
        // Último día: día 0 del mes siguiente
        const d = new Date(year, month + 1, 0);
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }
}

export default formatYMDWithOffset;
