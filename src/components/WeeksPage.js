import { metadataToEvent } from '../functionsOfEvents/metadataToEvent';
import { calendarStr } from "../data/calendarStr";
import { groupMetadataByEvents } from '../functionsOfEvents/groupMetadataByEvents';
import { WeeksGrid } from './WeeksGrid';
import { useState } from 'react';
import { groupEventsByNames } from '../functionsOfEvents/groupEventsByNames';
import { findPrevMonday } from '../functionsOfEvents/groupEventsByWeeks';


 // 1. Выбрать режим отображения: цена или количество занятий
  // 2. Выбрать сортиировку студентов: по дате первого занятия или по дате поледнего занятия
  // 3. Убирать людей, которые занимались меньше N занятий (вводить в инпут)



  // 1. Разбить занятия по неделям (вроде готово)
  // 2. В рамках недели посчитать сколько часов на каждую группу по стоимомсти (по длине занятия*)
  // 3. Нарисовать столбики по неделям
  // 4. И в каждом столбике закрасить вертикально цветами для каждой группы (либо снова дивы position absolute, ли background linear-gradient)


const metadataEvents = groupMetadataByEvents(calendarStr);

const dateForFilterEvents = new Date (2019, 0, 1)
const events = metadataEvents.map(metadataToEvent)
  .filter((event) => event.date >= dateForFilterEvents)

const comparator = (a, b) => {
  const firstLessonA = findPrevMonday(a.events.map(({date}) => date)[0])
  const lastLessonA = findPrevMonday(a.events.map(({date}) => date).at(-1))
  const firstLessonB = findPrevMonday(b.events.map(({date}) => date)[0])
  const lastLessonB = findPrevMonday(b.events.map(({date}) => date).at(-1))

  if (lastLessonA - lastLessonB !== 0) {
    return lastLessonA - lastLessonB
  } else {
    return firstLessonA - firstLessonB
  }
  
}

export function WeeksPage() {
  const students = groupEventsByNames(events);
  const [filterByNum, setFilterByNum] = useState(0);

  const filterEvents = students
    .filter(({events}) => events.length >= filterByNum)
    .sort((a, b) => Math.random() - 0.5)
    .sort(comparator)

    //console.log('lll',filterEvents)

  return (
    <div>
      {/* ... */}
      <label className='input-weekGrid'>
        <input type='text' onChange={(e) => setFilterByNum(+e.target.value)}/>
      </label>
      <WeeksGrid events={events} filterEvents={filterEvents}/>
    </div>
  )
}



