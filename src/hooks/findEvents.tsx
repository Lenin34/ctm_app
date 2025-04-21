
interface Event{
    idEvento: string;
    date: string;
    details: string;
}

type Props = {
    date: string;
    apiEvents: Event[];
}
export default function findEvents({ date, apiEvents }: Props): Event[] {
    let events: Event[] = [];
    for (const event of apiEvents) {
        if (event.date === date) {
            events.push(event);
        }
    }
    return events.length > 0 ? events : [{ idEvento: '', date: date, details: 'NO HAY EVENTOS DISPONIBLES' }];
}

