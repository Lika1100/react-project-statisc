export function StudentWeekPrice({ events }) {
    return (
        <div className="StudentRow__week" style={{
            background: colorByEventsPrice(events),
        }} />
    );
}

const prices90 = {
    '3100': 'st5',
    '3000': 'st4',
    '2900': 'st4',
    '2700': 'st3',
    '2500': 'st2',
    '2300': 'st2',
    '2000': 'st1',
}

const prices60 = {
    '2200': 'st5',
    '2000': 'st4',
    '1900': 'st3',
    '1800': 'st2',
    '1300': 'st1',
}

const colorForSt = {
    'none': 'black',
    'st5': 'white',
    'st4': 'red',
    'st3': 'orange',
    'st2': 'yellow' ,
    'st1': 'green',
    'default': 'brown',
}

function colorByEventsPrice(events) {
    const stage = studentStage(events);
    return colorForSt[stage]
}


function studentStage(events) {
    if (events.length === 0) {
        return 'none'
    }
    if (events[0].duration === 90) {
        const key = events[0].price
        return prices90[key]
    }
    if (events[0].duration === 60) {
        const key = events[0].price
        return prices60[key]
    }
    return "default"
    // ...

}