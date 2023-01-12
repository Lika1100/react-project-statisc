import React from 'react';
import './GraphicByWeeks.css'
import { metadataToEvent } from '../functionsOfEvents/metadataToEvent';
import { calendarStr } from "../data/calendarStr";
import { groupMetadataByEvents } from '../functionsOfEvents/groupMetadataByEvents';
import { groupEventsByWeeks } from '../functionsOfEvents/groupEventsByWeeks';
import {columnBackground} from "./columnBackground";

const metadataEvents = groupMetadataByEvents(calendarStr);
const dateForFilterEvents = new Date(2019, 0, 1)
const events = metadataEvents
    .map(metadataToEvent)
    .filter((event) => event.date >= dateForFilterEvents)

export function GraphicByWeeks({ width, height }) { // height of graph === max column height, width === all columns width sum
    const dataGroupByWeeks = groupEventsByWeeks(events)
    const hours = dataGroupByWeeks.map(({ events }) => numOfHours(events));
    const maxHours = Math.max(...hours);
    const heightsColumns = dataGroupByWeeks.map(({ events }) => {
        const heightColumn = numOfHours(events) / maxHours * height
        return heightColumn
    })
    const widthColumns = width / dataGroupByWeeks.length
    console.log(heightsColumns, widthColumns)
    // 90+90+60+60+60+60+120 -> 540 = 100%
    // 60+60+60+60 / 540 === 44.4444%
    // 90+90 / 540 === 33.3333%
    // 120 / 540 === 22.2222%

    // 60           90                  rest
    // 0...44.444   44.444...77.7777    77.777...100

    // background: "linear-gradient(to top, red 0%, red 44%, green 44%, green 77%, blue 77%, blue 100%)"


    // https://magma.com/d/4Dn7oBLQuX
    return (
        <div style={{ width: width }}>
            <div style={{
                background: "#eee",
                display: 'flex',
                transform: 'scale(1, -1)',
            }}>
                {dataGroupByWeeks.map(({ events }, index) => {
                    const style = {
                        height: heightsColumns[index],
                        width: widthColumns,
                        outline: `0.1px solid rgba(0,0,0,0.2)`,
                        background: columnBackground(events, "hours")
                    };
                    return <div style={style} />
                })}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {dataGroupByWeeks
                    .map((x, i) => {
                        if (i % 4 === 0) {
                            return (
                                <div style={{ width: widthColumns }}>
                                    <div className='Graphic-date'>
                                        {`
                                    ${x.startDay.getDate().toString().length > 1
                                                ? x.startDay.getDate()
                                                : `0${x.startDay.getDate()}`
                                            }
                                    ${x.startDay.getMonth() + 1 > 9
                                                ? x.startDay.getMonth() + 1
                                                : `0${x.startDay.getMonth() + 1}`
                                            }
                                    ${x.startDay.getFullYear()}
                                    `}
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div style={{ width: widthColumns }} />
                            )
                        }

                    })}
            </div>
        </div>
    )
}


function numOfHours(events) {
    return events.reduce((acc, prev) => acc + prev.duration, 0) / 60;
}


// https://upload.wikimedia.org/wikipedia/commons/e/e4/Global_Wealth_Distribution_2020_%28Property%29.svg



// to top, red 0%, red ${percentsForHours[0]}%, green ${percentsForHours[0]}%, green ${percentsForHours[1]}%, blue ${percentsForHours[1]}%, blue ${percentsForHours[2]}%
//to top, red 0%, red 10%, green 10%, green 40%, blue 40%, blue 100%

// 1. готово: распредление в процентах по типу длительности занятия (60/90/другое)
// 2. нарисовать градиент по этому распределению для каждого столбика
// 3. надо как-то подписать столбики снизу
//    https://sinyakov.com/frontend/img/weeks.png
// 4. сейчас сделано так: столбик = кол-во часов, распредление = по типу длительности занятия
// 5. хочется в любых комбинациях (например, в виде пропсов):
//    - высота столбика: кол-во часов или кол-во денег
//    - распредление в этом столбике: по типам: длительность занятия (60/90/другое), кол-во занятий (1/2/3/другое), стоиомть занятия (все эти группу типа 2000/2900)

// Переключалку часы/деньги + переключалку по типу (длительность/кол-во/стоиомось)
// Научиться рисовать график со столбцами, нормированными в деньгах
// Добавить разбиение по типу кол-во занятий