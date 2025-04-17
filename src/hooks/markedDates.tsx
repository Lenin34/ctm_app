export function generateMarkedDates(apiEvents: { date: string }[]) {
    const today = new Date().toISOString().split('T')[0];

    const result: { [date: string]: any } = {
        [today]: {
            customStyles: {
                container: {
                    backgroundColor: 'red',
                    borderRadius: 20,
                },
                text: {
                    color: '#ffffff',
                    fontWeight: 'bold',
                },
            },
        },
    };

    apiEvents.forEach(event => {
        result[event.date] = {
            customStyles: {
                container: {
                    backgroundColor: '#292468',
                    borderRadius: 20,
                },
                text: {
                    color: '#ffffff',
                },
            },
        };
    });

    return result;
}
