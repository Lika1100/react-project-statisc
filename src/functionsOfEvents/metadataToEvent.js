import { transformDate } from "./transformDate";

export function metadataToEvent(metadata) {
  const name = metadata.find((x) => x.startsWith("SUMMARY:"))
  .replace("SUMMARY:", "")
  .replace(/[^а-яёa-z0-9|]/ig, '');
;
  //console.log(name)
  const price = metadata.find((x) => x.startsWith("LOCATION:"))?.replace("LOCATION:", "");
  const dateStrStart = metadata.find((x) => x.startsWith("DTSTART;TZID=Europe/Moscow")).replace("DTSTART;TZID=Europe/Moscow:", "");
  const dateStart = transformDate(dateStrStart)
  const dateStrEnd = metadata.find((x) => x.startsWith("DTEND;TZID=Europe/Moscow:"))
    .replace("DTEND;TZID=Europe/Moscow:", "");
  const dateEnd = transformDate(dateStrEnd)
  const duration = (dateEnd.getTime() - dateStart.getTime()) / 60000

  return {
    name: name,
    price: +price,
    date: dateStart,
    duration: +duration
  }
}