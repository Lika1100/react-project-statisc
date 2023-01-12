export function StudentWeekCapacity({ events }) {
    return (
        <div className="StudentRow__week" style={{
            background: colorByEventsLength(events),
        }} />
    );
}


function colorByEventsLength(events) {
    if (events.length === 0) {
        return "none";
    }
    if (events.length === 1) {
        return "yellow";
    }
    if (events.length === 2) {
        return "orange";
    }
    return "red";
}