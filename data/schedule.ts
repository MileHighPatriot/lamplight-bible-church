/**
 * The weekly rhythm. Times are Denver local. `live` gatherings are streamed.
 * Day: 0 = Sunday … 6 = Saturday.
 */
export type Gathering = {
  id: string;
  name: string;
  day: number;
  start: string; // "09:00"
  minutes: number;
  place: string;
  note: string;
  live?: boolean;
  kids?: boolean;
};

export const weekly: Gathering[] = [
  {
    id: "sun-9",
    name: "Sunday Worship",
    day: 0,
    start: "09:00",
    minutes: 75,
    place: "Main auditorium",
    note: "Worship, then verse-by-verse teaching. Kids classes for newborns through 5th grade.",
    kids: true,
  },
  {
    id: "sun-1045",
    name: "Sunday Worship",
    day: 0,
    start: "10:45",
    minutes: 75,
    place: "Main auditorium",
    note: "Same message as 9:00. Streamed live. Kids classes for newborns through 5th grade.",
    live: true,
    kids: true,
  },
  {
    id: "foundations",
    name: "Foundations Class",
    day: 0,
    start: "09:00",
    minutes: 60,
    place: "Room 204",
    note: "A six-week class on what we believe and why. Great if you're new to church or new to Lamplight.",
  },
  {
    id: "dtc-lunch",
    name: "DTC Lunch Study",
    day: 2,
    start: "12:05",
    minutes: 45,
    place: "Conference room, 2nd floor",
    note: "Bring your lunch. We read the coming Sunday's passage together and you're back at your desk by 1.",
  },
  {
    id: "midweek",
    name: "Midweek: Through the Bible",
    day: 3,
    start: "19:00",
    minutes: 70,
    place: "Main auditorium",
    note: "We're working through the whole Bible, Genesis to Revelation, a chapter at a time. Streamed live.",
    live: true,
    kids: true,
  },
  {
    id: "students",
    name: "Lamplight Students",
    day: 3,
    start: "19:00",
    minutes: 90,
    place: "The Loft",
    note: "Grades 6–12. Worship, teaching, small groups, and far too much pizza.",
  },
  {
    id: "mens",
    name: "Men's Study",
    day: 6,
    start: "07:00",
    minutes: 60,
    place: "Fellowship hall",
    note: "Coffee, breakfast burritos, and an hour in the Word before the weekend gets going.",
  },
];

export const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, "0")}${suffix}`;
}

/** The streamed gatherings, used by the live countdown. */
export const streamed = weekly.filter((g) => g.live);
