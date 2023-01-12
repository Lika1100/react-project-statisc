export function findPrevMonday(date) {
  const numOfWeek = date.getDay() === 0 ? 6 : date.getDay() - 1;
  const monday = new Date(date)

  monday.setDate(monday.getDate() - numOfWeek);
  monday.setHours(3);
  monday.setMinutes(0);

  return monday;
}

export function groupEventsByWeeks(events) {
  if (events.length === 0) {
    return [];
  }

  const sortedEvents = [...events].sort((a, b) => a.date - b.date);

  const firstEventDate = sortedEvents[0].date;
  const firstYearDate = new Date(firstEventDate.getFullYear(), 0, 1, 3, 0, 0); // -> 1st Jan 
  const firstMonday = findPrevMonday(firstYearDate);
  
  const lastEventDate = sortedEvents.at(-1).date // 12 nov -> 31 dec -> 26 dec
  const lastYearDate = new Date(lastEventDate.getFullYear(), 11, 31, 3, 0, 0);
  const lastMonday = findPrevMonday(lastYearDate)

  const resultSortedByWeek = [];

  let currentMonday = new Date(firstMonday);
  let weekNumber = 0;

  while (currentMonday < lastMonday) {
    const nextMonday = new Date(currentMonday);
    nextMonday.setDate(nextMonday.getDate() + 7);

    const currentWeekEvents = sortedEvents
      .filter((x) => x.date >= currentMonday && x.date < nextMonday);

    resultSortedByWeek.push({
      startDay: currentMonday,
      events: currentWeekEvents,
      weekNumber,
    })

    currentMonday = nextMonday;
    weekNumber += 1;
  }

  return resultSortedByWeek;
}

// const events = [
//   { date: new Date(2022, 11, 2, 12, 0) },
//   // { date: new Date(2022, 11, 4, 12, 0) },
//   // { date: new Date(2022, 11, 6, 12, 0) },
//   // { date: new Date(2022, 11, 12, 12, 0) },
//   // { date: new Date(2022, 11, 13, 12, 0) },
//   // { date: new Date(2022, 11, 24, 12, 0) },
//   //{ date: new Date(2023, 02, 02, 12, 0) },
// ];


// console.log(groupEventsByWeeks(events));