import {groupEventsByWeeks} from "./readEvents";

test("groupEventsByWeeks", () => {
  const events = [
    { date: new Date(2022, 11, 2, 12, 0) },
    { date: new Date(2022, 11, 4, 12, 0) },
    { date: new Date(2022, 11, 6, 12, 0) },
    { date: new Date(2022, 11, 12, 12, 0) },
    { date: new Date(2022, 11, 13, 12, 0) },
  ];

  const eventsByWeeks = groupEventsByWeeks(events);

  expect(eventsByWeeks).toHaveLength(3);

  expect(eventsByWeeks[0].startDay).toEqual(new Date(2022, 10, 28, 0, 0))
  expect(eventsByWeeks[0].events).toHaveLength(2);
  expect(eventsByWeeks[1].startDay).toEqual(new Date(2022, 11, 5, 0, 0))
  expect(eventsByWeeks[1].events).toHaveLength(1);
  expect(eventsByWeeks[2].startDay).toEqual(new Date(2022, 11, 12, 0, 0))
  expect(eventsByWeeks[2].events).toHaveLength(2);
})

