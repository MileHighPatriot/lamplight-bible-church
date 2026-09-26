import { streamed, weekly, type Gathering } from "@/data/schedule";

/** Wall-clock parts for a moment in Denver. */
export function denver(date: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Denver",
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  const minutes = Number(parts.hour) * 60 + Number(parts.minute) + Number(parts.second) / 60;
  return { day, minutes, ymd: `${parts.year}-${parts.month}-${parts.day}` };
}

const startMin = (g: Gathering) => {
  const [h, m] = g.start.split(":").map(Number);
  return h * 60 + m;
};

export type LiveState =
  | { kind: "live"; gathering: Gathering; minutesIn: number }
  | { kind: "next"; gathering: Gathering; minutesUntil: number; daysAhead: number };

/** Is a streamed gathering live right now? If not, which one is next and how long until it starts? */
export function liveState(now: Date, list: Gathering[] = streamed): LiveState {
  const { day, minutes } = denver(now);
  for (const g of list) {
    const s = startMin(g);
    if (g.day === day && minutes >= s && minutes < s + g.minutes) {
      return { kind: "live", gathering: g, minutesIn: Math.floor(minutes - s) };
    }
  }
  let best: { g: Gathering; until: number; days: number } | null = null;
  for (const g of list) {
    let days = (g.day - day + 7) % 7;
    let until = days * 1440 + startMin(g) - minutes;
    if (until <= 0) {
      days += 7;
      until += 7 * 1440;
    }
    if (!best || until < best.until) best = { g, until, days };
  }
  return { kind: "next", gathering: best!.g, minutesUntil: best!.until, daysAhead: best!.days };
}

/** Next in-person gathering of any kind (for "this week" lists). */
export function nextGathering(now: Date) {
  return liveState(now, weekly.filter((g) => g.name === "Sunday Worship" || g.id === "midweek"));
}

export function countdown(totalMinutes: number) {
  const d = Math.floor(totalMinutes / 1440);
  const h = Math.floor((totalMinutes % 1440) / 60);
  const m = Math.floor(totalMinutes % 60);
  return { d, h, m };
}

export function whenLabel(daysAhead: number, gatheringDay: number) {
  if (daysAhead === 0) return "Today";
  if (daysAhead === 1) return "Tomorrow";
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][gatheringDay];
}
