import { groupEventsByNames } from '../functionsOfEvents/groupEventsByNames';
import { groupMetadataByEvents } from '../functionsOfEvents/groupMetadataByEvents';
import { StudentWeekCapacity } from './StudentWeekCapacity';
import { StudentWeekPrice } from './StudentWeekPrice';
import { groupEventsByWeeks } from '../functionsOfEvents/groupEventsByWeeks';
import './table.css';
import { useState } from 'react';





//console.log(weeksBoundaries)

// A: <div>[ ] [ ] [ ] [ ] [2] [1] [ ] [2] ... [ ] [ ] [ ] [ ]</div  <- weeksBoundaries
// B: <div>[ ] [ ] [ ] [ ] [ ] [1] [1] [ ] ... [ ] [ ] [ ] [ ]</div  <- weeksBoundaries


export function WeeksGrid({ events, filterEvents }) {
    //const students = groupEventsByNames(events);
    const weeks = groupEventsByWeeks(events);

    const weeksBoundaries = weeks.map(week => {
        const startDay = week.startDay
        const currentStartDay = new Date(startDay)
        const endDay = new Date(currentStartDay.setDate(currentStartDay.getDate() + 7));
        //console.log('......',startDay, ')))))',endDay)
        return {
            startDay: startDay,
            endDay: endDay,
        }
    })

    const [show, setShow] = useState('price')

    function handleChange(e) {
        setShow(e.target.value);
    }

    return (
        <div>
            <label className='input-weekGrid'>
                <input type='radio' name='choose' value='price' onChange={handleChange}/> По стоимости
            </label>
            <label className='input-weekGrid'>
                <input type='radio' name='choose' value='number' onChange={handleChange} /> По количeству занятий
            </label>
            <div className="StudentGrid">
                {filterEvents.map(({ name, events }) => (
                    <StudentRow
                        name={name}
                        events={events}
                        weeksBoundaries={weeksBoundaries}
                        show={show}
                    />
                ))}
            </div>
        </div>
    )
}

function StudentRow({ name, events, weeksBoundaries, show }) {
    const weeks = weeksBoundaries.map(({ startDay, endDay }) => {
        return events.filter(({ date }) => date >= startDay && date < endDay)
    })

    return (
        <div className='StudentRow'>
            <div className="StudentRow__name">
                <div className='Student__name'></div>
                {name}
            </div>
                <div className="StudentRow__weeks">

                    {weeks.map((events) => {
                        //console.log(events)
                        if (show === "price") {
                            return <StudentWeekPrice events={events} />
                        }
                        if (show === "number") {
                            return <StudentWeekCapacity events={events} />
                        }

                        return null;
                    })}
                </div>
        </div>
    );
}




