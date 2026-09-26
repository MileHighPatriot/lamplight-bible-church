import { formatPassage, type Passage } from "@/data/bible";

/**
 * "Read with us": a 12-week plan that keeps readers a step ahead of the
 * teaching. Mon–Thu read on through Isaiah (Wednesday nights) and into
 * Jeremiah, Friday is a psalm, and Saturday is the passage we'll teach on
 * Sunday. Sundays are for hearing it taught.
 */
export type Reading = {
  id: string;
  date: string; // YYYY-MM-DD
  track: "prophets" | "psalm" | "sunday";
  passage: Passage;
  ref: string;
};

export type Week = { n: number; start: string; sunday: string; sundayRef: string; readings: Reading[] };

export const PLAN_START = "2026-09-28"; // a Monday
export const PLAN_WEEKS = 12;

/** Sunday passages in Romans, Oct 4 through Dec 20. */
const romans: [number, number, number][] = [
  [8, 28, 30], [8, 31, 39], [9, 1, 5], [9, 6, 13], [9, 14, 24], [9, 25, 33],
  [10, 1, 4], [10, 5, 13], [10, 14, 21], [11, 1, 10], [11, 11, 24], [11, 25, 36],
];

function prophets(): Passage[] {
  const out: Passage[] = [];
  for (let c = 37; c <= 66; c++) out.push({ book: "Isaiah", chapter: c });
  for (let c = 1; out.length < PLAN_WEEKS * 4; c++) out.push({ book: "Jeremiah", chapter: c });
  return out;
}

const addDays = (iso: string, n: number) => {
  const t = Date.parse(`${iso}T12:00:00Z`) + n * 86400000;
  return new Date(t).toISOString().slice(0, 10);
};

export const plan: Week[] = (() => {
  const pro = prophets();
  return Array.from({ length: PLAN_WEEKS }, (_, w) => {
    const start = addDays(PLAN_START, w * 7);
    const [ch, v1, v2] = romans[w];
    const sundayPassage: Passage = { book: "Romans", chapter: ch, verseStart: v1, verseEnd: v2 };
    const readings: Reading[] = [];
    for (let d = 0; d < 4; d++) {
      const p = pro[w * 4 + d];
      readings.push({ id: `w${w + 1}d${d + 1}`, date: addDays(start, d), track: "prophets", passage: p, ref: formatPassage(p) });
    }
    const psalm: Passage = { book: "Psalms", chapter: 90 + w };
    readings.push({ id: `w${w + 1}d5`, date: addDays(start, 4), track: "psalm", passage: psalm, ref: formatPassage(psalm) });
    readings.push({ id: `w${w + 1}d6`, date: addDays(start, 5), track: "sunday", passage: sundayPassage, ref: formatPassage(sundayPassage) });
    return { n: w + 1, start, sunday: addDays(start, 6), sundayRef: formatPassage(sundayPassage), readings };
  });
})();

export const allReadings = plan.flatMap((w) => w.readings);
