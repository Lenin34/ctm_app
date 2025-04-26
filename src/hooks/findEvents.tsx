
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
export default function findEvents({ids, date, apiEvents }: Props): Evento[] {
    let events: Evento[] = apiEvents.filter( evt => ids.includes(evt.id))

    return events.length > 0 ? events : [{ id: '', start_date: date, description: 'NO HAY EVENTOS DISPONIBLES', title: '', end_date: date, image: '' }];
}

