
interface Evento {
    id: string;
    description: string;
    end_date: string;
    start_date: string;
    image: string;
    title: string;
}

type Props = {
    ids: string[];
    date: string;
    apiEvents: Evento[];
}
export default function findEvents({ ids, date, apiEvents }: Props): Evento[] {
    const cleanDate = date.split(' ')[0]; // 👈 limpia por si date tiene hora

    const events: Evento[] = apiEvents
        .filter(evt => ids.includes(evt.id))
        .map((item: Evento) => {
            if (item.end_date.split(' ')[0] === cleanDate) { // 👈 compara limpio
                return { ...item, start_date: item.end_date };
            }
            return item;
        });

    return events.length > 0
        ? events
        : [{ id: '', start_date: cleanDate, description: 'NO HAY EVENTOS DISPONIBLES', title: '', end_date: cleanDate, image: '' }];
}



