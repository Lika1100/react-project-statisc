import React from 'react';
import { groupMetadataByEvents } from '../functionsOfEvents/groupMetadataByEvents';
import { metadataToEvent } from '../functionsOfEvents/metadataToEvent';
import { groupEventsByWeeks } from '../functionsOfEvents/groupEventsByWeeks';

import { calendarStr } from "../data/calendarStr";

import './table.css'

// console.log(calendarStr)

const metadataEvents = groupMetadataByEvents(calendarStr);
const events = metadataEvents.map(metadataToEvent);



const weeks = groupEventsByWeeks(events)


// 235 students × 210 weeks × 30 lessons ≈ 1.5kk
      




const rows = weeks.map(({ events, startDay }) => {
    const year = startDay.getFullYear()
    const month = startDay.getMonth() + 1
    const date = startDay.getDate()

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    const income = events.reduce((acc, { price }) => acc + price, 0);
    const hours = events.reduce((acc, { duration }) => acc + duration, 0) / 60;
    const rate = income > 0 ? (income / hours).toFixed(0) : "—";
    const lessons = events.length;
    const students = new Set(events.map(({ name }) => name)).size;

    // 2019-01-14  12600  10  7 1200
    return {
        startDay: formattedDate,
        income,
        hours,
        lessons,
        students,
        rate,
    };
})
//console.table(rows);

export function TableIndicators() {
    return (
        <table className='table'>
            <tbody>
                <tr>
                    <th>Start day</th>
                    <th>Income</th>
                    <th>Hours</th>
                    <th>Lessons</th>
                    <th>Students</th>
                    <th>Rate</th>
                </tr>
                {rows.map((x) => {
                    return (
                        <tr>
                            <td>{x.startDay}</td>
                            <td>{x.income}</td>
                            <td>{x.hours}</td>
                            <td>{x.lessons}</td>
                            <td>{x.students}</td>
                            <td>{x.rate}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
