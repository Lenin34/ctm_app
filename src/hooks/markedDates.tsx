interface Evento {
    id: string;
    description: string;
    end_date: string;
    start_date: string;
    image: string;
    title: string;
}

// Define aquí los colores que quieras usar para cada “tipo” de evento
const COLORS = [
    '#F8931E',
    '#4FC6C0',
    '#FFFFFF',
    '#0B3F61',
    '#269CD9',
];

interface MarkedDateStyle {
    customStyles: {
        container: {
            backgroundColor: string;
            borderRadius: number;
        };
        text: {
            color: string;
            fontWeight?: 'bold';
        };
    };
}

export function generateMarkedDates(apiEvents: Evento[]): {
    [date: string]: { dots: { key: string; color: string; selectedDotColor?: string; id: string; }[] }
} {
    const result: Record<string, { dots: Array<{ key: string; color: string; selectedDotColor?: string; id: string }> }> = {};

    apiEvents.forEach((evt, idx) => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const start = evt.start_date.split(' ')[0];
        const end   = evt.end_date.split(' ')[0];

        let curr = new Date(start);
        const last = new Date(end);

        while (curr <= last) {
            const dayKey = curr.toISOString().split('T')[0];

            if (!result[dayKey]) {
                result[dayKey] = { dots: [] };
            }

            result[dayKey].dots.push({
                key: `evt${evt.id}`,   // debe ser único por “dot”
                color,
                selectedDotColor: color, // opcional: color cuando está seleccionado
                id: evt.id,
            });

            curr.setDate(curr.getDate() + 1);
        }
    });

    return result;
}