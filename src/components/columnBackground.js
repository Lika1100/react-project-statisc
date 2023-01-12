const priceStageByLesson = {
  '120': {
    '4000': 'st5',
  },
  '90': {
      '3100': 'st5',
      '3000': 'st4',
      '2900': 'st4',
      '2700': 'st3',
      '2500': 'st2',
      '2300': 'st2',
      '2000': 'st1',
  },
  '60': {
      '2200': 'st5',
      '2000': 'st4',
      '1900': 'st3',
      '1800': 'st2',
      '1300': 'st1',
  }
};

const colorByPriceStage = {
  'st5': 'pink',
  'st4': 'red',
  'st3': 'orange',
  'st2': 'yellow',
  'st1': 'green',
  'other': 'blue',
}

const colorsByDuration = {
  "60": "yellow",
  "90": "salmon",
  "other": "white",
}

const colorsByCount = {
  "1": "yellow",
  "2": "orange",
  "3": "red",
  "other": "red",
}

const keys = {
  "hours": Object.keys(colorsByDuration),
  "count": Object.keys(colorsByCount),
  "price": Object.keys(colorByPriceStage),
}

const colorsDict = {
  "hours": colorsByDuration,
  "count": colorsByCount,
  "price": colorByPriceStage,
}

function countEventDurationTypes(events) {
  const types = keys["hours"];
  const counter = Object.fromEntries(types.map(key => [key, 0])); //{'60': 0, '90': 0, 'other': 0}
  events.forEach(({ duration }) => {
    const key = duration in counter ? duration : "other";
    counter[key] += duration
  })
  return counter;
}

function countEventPriceStageTypes(events) {
  const types = keys["price"];
  const counter = Object.fromEntries(types.map(key => [key, 0])); //{'60': 0, '90': 0, 'other': 0}
  events.forEach((event) => {
    const { duration, price } = event;
    const key = priceStageByLesson[duration]?.[price] ?? "other"
    if (key === 'other') {
        console.log(event)
    }
    counter[key] += duration
  })
  return counter;
}

export function columnBackground(events, viewType) { // viewType === "hours" | "count" | "price"
  const types = keys[viewType];
  let counter;
  if (viewType === "hours") {
    counter = countEventDurationTypes(events);
  } else if (viewType === "price") {
    counter = countEventPriceStageTypes(events);
  }
  const sum = Object.values(counter).reduce((a, b) => a + b, 0)

  const percentsForHours = types.map((x) => sum !== 0 ? (counter[x] / sum * 100) : 0)
  const boundaries = generateGradientPartsBoundaries(percentsForHours);
  const colors = colorsDict[viewType];
  const colorParts = boundaries
      .map((x, i) => `${colors[types[i]]} ${x[0]}%, ${colors[types[i]]} ${x[1]}%`)

  return `linear-gradient(to top, ${colorParts.join(',')})`;
}

function generateGradientPartsBoundaries(percents) { // []
  let sum = 0;
  let result = []
  for (let i = 0; i < percents.length; i++) {
      result.push([sum, sum + percents[i]])
      sum += percents[i]
  }
  return result
}

// При клике на столбик переходить на страницу, описывающую эту неделю
// На странице неделе табличка с занятиями: (имя | дата-время | продолжительность | цена)
