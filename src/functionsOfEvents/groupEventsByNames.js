

export function groupEventsByNames(events) {
    if (events.length === 0 || events === undefined) {
        return [];
    }

    const sortedEvents = [...events].sort((a, b) => a.date - b.date);

    const resultSortedByName = [];

    const uniqueNames = Array.from(new Set(sortedEvents.map(({name}) => name)))
    for (let name of uniqueNames) {
        let a = sortedEvents.filter((x) => x.name === name)
        resultSortedByName.push({
            name: name,
            events: a,
        })
    }


    return resultSortedByName;
}


/*const events = [
    {
        date: new Date(2022, 11, 2, 12, 0),
        name: 'Alex'
    },
    {
        date: new Date(2022, 11, 4, 12, 0),
        name: 'Anna'
    },
    {
        date: new Date(2022, 11, 6, 12, 0),
        name: 'Joe'
    },
    {
        date: new Date(2022, 11, 12, 12, 0),
        name: 'Kris'
    },
    {
        date: new Date(2022, 11, 13, 12, 0),
        name: 'Joe'
    },
    {
        date: new Date(2022, 11, 24, 12, 0),
        name: 'Alex'
    },
    {
        date: new Date(2023, 2, 2, 12, 0),
        name: 'Anna'
    },
];*/

//console.log(groupEventsByNames(events));
