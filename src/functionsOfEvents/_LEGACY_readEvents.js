const { readFileSync } = require("fs");

function groupMetadataByEvents(data) {
  const groups = []
  const lines = data.split("\r\n");
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      groups.push([]);
    }
    if (groups.length === 0) {
      continue;
    }
    groups.at(-1).push(line);
  }
  return groups;
}

function metadataToEvent(metadata) {
  const name = metadata.find((x) => x.startsWith("SUMMARY:")).replace("SUMMARY:", "");
  const price = metadata.find((x) => x.startsWith("LOCATION:")).replace("LOCATION:", "");
  const dateStrStart = metadata.find((x) => x.startsWith("DTSTART;TZID=Europe/Moscow")).replace("DTSTART;TZID=Europe/Moscow:", "");
  const dateStart = transformDate(dateStrStart)
  const dateStrEnd = metadata.find((x) => x.startsWith("DTEND;TZID=Europe/Moscow:"))
    .replace("DTEND;TZID=Europe/Moscow:", "");
  const dateEnd = transformDate(dateStrEnd)
  const duration = (dateEnd.getTime() - dateStart.getTime()) / 60000

  return {
    name: name,
    price: price,
    date: dateStart,
    duration: duration
  }
}

function transformDate(str) {
  const year = +str.slice(0, 4)
  const month = +str.slice(4, 6)
  const day = +str.slice(6, 8)
  const hours = +str.slice(-6, -4)
  const minutes = +str.slice(-4, -2)
  // console.log(year, month, day, hours, minutes)
  return new Date(year, month - 1, day, hours + 3, minutes)
}

const data = readFileSync("./Demo.ics", "utf8");
//console.log(groupMetadataByEvents(data).map(metadataToEvent))





function groupEventsByWeeks(events) {
  if (events.length === 0) {
    return [];
  }

  const sortedEvents = [...events].sort((a, b) => a.date - b.date);
  const firstEventDate = sortedEvents[0].date; // -> 1st Jan 

  const numOfWeek = firstEventDate.getDay() === 0 ? 6 : firstEventDate.getDay() - 1;
  const firstMonday = new Date(firstEventDate)
  firstMonday.setDate(firstMonday.getDate() - numOfWeek);
  firstMonday.setHours(3);
  firstMonday.setMinutes(0);

  let resultSortedByWeek = [];
  let i = 0;
  let currentMonday = new Date(firstMonday);
  while (i < 10) {
    const nextMonday = new Date(currentMonday);
    nextMonday.setDate(nextMonday.getDate() + 7);

    const currenWeekEvents = sortedEvents
      .filter((x) => x.date >= currentMonday && x.date < nextMonday);

    resultSortedByWeek.push({
      startDay: currentMonday,
      events: currenWeekEvents,
    })

    currentMonday = nextMonday;
    i++;
  }
  
  return resultSortedByWeek;
}

// 05.02.2022
// 12.07.2022
// 07.08.2022

// 53 weeks:
// 27.12.21 — 02.01.22  ---  1st week
// ...
// 26.12.22 — 01.01.23  ---  last week


// 25.12.2021
// 05.02.2022
// 12.07.2022
// 07.08.2022

// 105 weeks:
// 28.12.20 — 03.01.21  ---  1st week
// ...
// 26.12.22 — 01.01.23  ---  last week




const events = [
  { date: new Date(2022, 11, 2, 12, 0) },
  { date: new Date(2022, 11, 4, 12, 0) },
  { date: new Date(2022, 11, 6, 12, 0) },
  { date: new Date(2022, 11, 12, 12, 0) },
  { date: new Date(2022, 11, 13, 12, 0) },
];


console.log(groupEventsByWeeks(events));


  // M T W T F S S
  // ? +     +    
  //   +   +     +
  // +   + +     +
  // +   +   +   +

// console.log(groupEventsByWeeks(groupMetadataByEvents(data).map(metadataToEvent)))


// Дата начала недели | Денег всего | Занятий всего | Часов всего | Средняя стоимость часа
// 05.12.22
// 12.12.22
// 19.12.22
// ...


/* const resultByMonths = sortedEvents.reduce((acc, item) => {
    let date = item.date.getMonth() + 1
    if (acc[date]) {
      acc[date].push(item)
    } else {
      acc[date] = [item]
    }
    return acc
  }, {})
  //console.log(resultByMonths, '=====')
  // result.push(new Date(firstMonday.getDay() + 7*24*60*60*1000));
  console.log(firstMonday)
  for (let key in resultByMonths) {
    
      
  }*/

// найти самый первый понедельник
// каждый раз + 7  дней
// console.log(transformDate('20220815T140000'))

// // 2022-09-15T11:00:00.000Z

// console.log(events(['DTEND;TZID=Europe/Moscow:20220815T153000','LOCATION:2000','SEQUENCE:3','SUMMARY:Б','TRANSP:OPAQUE', 'DTSTART;TZID=Europe/Moscow:20220815T140000']))

// readEvents




/* let obj = {
  name: '',
  price: '',
  dateStart: '',
  duration: ''
} */

//console.log(lines);
//|| x[0] === "LOCATION" || x[0] === "DTSTART;TZID=Europe/Moscow" || x[0] === 'DTEND;TZID=Europe/Moscow'

/*function a(arr) {
  let event = []
  arr
  .map((x) => {
    return x.split(":")
  })
  .filter((x) => {
   if (x[0] === 'SUMMARY' || x[0] === "LOCATION" || x[0] === "DTSTART;TZID=Europe/Moscow" || x[0] === 'DTEND;TZID=Europe/Moscow') {
    return event.push([x[0], x[1]])
   }
   })
  //console.log('******', event)
}*/