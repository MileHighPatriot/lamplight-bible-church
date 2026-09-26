import { bookByName, books as booksByIndex, formatPassage, type Passage } from "@/data/bible";

/**
 * The teaching archive. Lamplight teaches straight through books of the Bible:
 * a New Testament book on Sunday mornings, and "Through the Bible" on Wednesday
 * nights, Genesis to Revelation in order. Everything here is generated from the
 * series lists below so the archive, the bookshelf, and the stats always agree.
 */

export type Service = "sunday" | "wednesday";

export type Message = {
  id: string;
  service: Service;
  passage: Passage;
  /** Display reference, e.g. "Romans 8:18–25". */
  ref: string;
  title: string;
  date: string; // YYYY-MM-DD
  teacher: string;
  minutes: number;
  video: boolean;
  seriesId: string;
};

export type Series = {
  id: string;
  book: string;
  service: Service;
  title: string;
  start: string;
  end: string;
  count: number;
  current: boolean;
};

export const teachers = {
  nate: "Pastor Nate Whitaker",
  luis: "Pastor Luis Ortega",
  dave: "Dave Kincaid",
};

/* ---------- Sunday series (oldest first), one title per chapter ---------- */

const sundayBooks: { book: string; perChapter: number; titles: string[] }[] = [
  {
    book: "Mark",
    perChapter: 3,
    titles: [
      "The Beginning of the Gospel", "Authority to Forgive", "The Twelve", "Seeds and Storms",
      "A Touch of Faith", "Without Honor at Home", "From the Heart", "Who Do You Say I Am?", "Transfigured",
      "Came to Serve", "The King Rides In", "Render to God", "Watch", "The Upper Room", "Crucified",
      "He Is Not Here",
    ],
  },
  {
    book: "Acts",
    perChapter: 3,
    titles: [
      "Wait for the Promise", "Pentecost", "Such as I Have", "We Cannot but Speak", "Obey God Rather Than Men",
      "Seven Chosen to Serve", "Stephen", "Scattered Seed", "The Road to Damascus", "Nothing Unclean",
      "Called Christians", "Prayer Behind Prison Walls", "Sent Out", "Through Many Hardships",
      "The Council at Jerusalem", "Midnight in Philippi", "To an Unknown God", "Tentmakers in Corinth",
      "Riot in Ephesus", "Finishing the Race", "Ready for the Name", "Paul's Testimony", "Take Courage",
      "Before Felix", "I Appeal to Caesar", "Almost Persuaded", "Shipwrecked", "Unhindered",
    ],
  },
  {
    book: "Ephesians",
    perChapter: 3,
    titles: [
      "Every Spiritual Blessing", "Saved by Grace", "The Mystery Revealed", "Walk Worthy", "Walk in Love",
      "The Armor of God",
    ],
  },
  {
    book: "John",
    perChapter: 3,
    titles: [
      "The Word Became Flesh", "Water to Wine", "You Must Be Born Again", "Living Water", "Take Up Your Bed",
      "The Bread of Life", "Rivers of Living Water", "The Light of the World", "Once Blind", "The Good Shepherd",
      "The Resurrection and the Life", "The Hour Has Come", "He Washed Their Feet", "Let Not Your Heart Be Troubled",
      "The True Vine", "The Helper Is Coming", "The High Priestly Prayer", "Arrested in the Garden", "It Is Finished",
      "The Empty Tomb", "Do You Love Me?",
    ],
  },
  {
    book: "James",
    perChapter: 3,
    titles: ["Count It All Joy", "Faith That Works", "Taming the Tongue", "Draw Near to God", "The Prayer of Faith"],
  },
  {
    book: "Philippians",
    perChapter: 3,
    titles: ["To Live Is Christ", "The Mind of Christ", "Pressing On", "Rejoice in the Lord Always"],
  },
  {
    book: "Hebrews",
    perChapter: 3,
    titles: [
      "God Has Spoken", "So Great a Salvation", "Greater Than Moses", "A Rest That Remains", "Our Great High Priest",
      "An Anchor for the Soul", "The Order of Melchizedek", "A Better Covenant", "Once for All",
      "Draw Near with Confidence", "By Faith", "Run with Endurance", "The Same Forever",
    ],
  },
  {
    book: "1 Peter",
    perChapter: 3,
    titles: ["A Living Hope", "Living Stones", "Ready to Give an Answer", "The Fiery Trial", "Cast Your Cares"],
  },
  {
    book: "Luke",
    perChapter: 3,
    titles: [
      "Nothing Is Impossible", "Good News of Great Joy", "Prepare the Way", "Tempted in the Wilderness",
      "Launch Out into the Deep", "Love Your Enemies", "Only Say the Word", "Who Is This?", "Take Up Your Cross",
      "One Thing Is Needed", "Teach Us to Pray", "Rich Toward God", "The Narrow Door", "Counting the Cost",
      "Lost and Found", "Faithful in Little", "Where Are the Nine?", "Persistent in Prayer", "Zacchaeus",
      "By What Authority?", "Lift Up Your Heads", "The Last Supper", "Father, Forgive Them", "The Road to Emmaus",
    ],
  },
  {
    book: "Galatians",
    perChapter: 3,
    titles: [
      "No Other Gospel", "Crucified with Christ", "Justified by Faith", "Sons, Not Slaves", "Free Indeed",
      "Bear One Another's Burdens",
    ],
  },
  {
    book: "1 Thessalonians",
    perChapter: 3,
    titles: ["Turned to God", "Gentle Among You", "Standing Firm", "The Blessed Hope", "Rejoice, Pray, Give Thanks"],
  },
  {
    book: "Colossians",
    perChapter: 3,
    titles: ["The Supremacy of Christ", "Complete in Him", "Set Your Mind Above", "Seasoned with Salt"],
  },
  {
    book: "1 Corinthians",
    perChapter: 3,
    titles: [
      "Christ Crucified", "Spiritual Wisdom", "God Gives the Growth", "Stewards of the Mysteries", "A Little Leaven",
      "Bought with a Price", "Married and Single", "Knowledge Puffs Up", "All Things to All People",
      "A Way of Escape", "The Lord's Supper", "One Body, Many Parts", "The Greatest of These",
      "Decently and in Order", "Where Is Your Sting?", "Do Everything in Love",
    ],
  },
  {
    book: "2 Timothy",
    perChapter: 3,
    titles: ["Not a Spirit of Fear", "A Good Soldier", "All Scripture Is God-Breathed", "I Have Kept the Faith"],
  },
  {
    book: "1 John",
    perChapter: 3,
    titles: [
      "Walking in the Light", "An Advocate with the Father", "What Manner of Love", "God Is Love",
      "That You May Know",
    ],
  },
  {
    book: "Revelation",
    perChapter: 3,
    titles: [
      "The Revelation of Jesus Christ", "Your First Love", "I Stand at the Door", "The Throne Room",
      "Worthy Is the Lamb", "The Seals Opened", "A Great Multitude", "The Trumpets Sound", "The Bottomless Pit",
      "The Little Scroll", "The Two Witnesses", "The Woman and the Dragon", "The Beast from the Sea",
      "The Harvest of the Earth", "The Song of the Lamb", "The Bowls of Wrath", "Babylon the Great",
      "Fallen Is Babylon", "King of Kings", "The Thousand Years", "All Things New", "Come, Lord Jesus",
    ],
  },
];

/** The current Sunday series, written out message by message. */
const romans: [string, string][] = [
  ["1:1-7", "Set Apart for the Gospel"],
  ["1:8-15", "Eager to Preach"],
  ["1:16-17", "Not Ashamed"],
  ["1:18-32", "Exchanged the Truth"],
  ["2:1-16", "No Partiality"],
  ["2:17-29", "A Circumcision of the Heart"],
  ["3:1-8", "Let God Be True"],
  ["3:9-20", "None Righteous"],
  ["3:21-22", "But Now"],
  ["3:23-26", "Justified Freely"],
  ["3:27-31", "Boasting Excluded"],
  ["4:1-8", "Counted as Righteousness"],
  ["4:9-17", "Father of All Who Believe"],
  ["4:18-25", "Hope Against Hope"],
  ["5:1-2", "Peace with God"],
  ["5:3-5", "Hope Does Not Disappoint"],
  ["5:6-11", "While We Were Still Sinners"],
  ["5:12-14", "Through One Man"],
  ["5:15-21", "Grace Abounded"],
  ["6:1-4", "Buried and Raised"],
  ["6:5-11", "Dead to Sin, Alive to God"],
  ["6:12-14", "Instruments of Righteousness"],
  ["6:15-23", "The Free Gift of God"],
  ["7:1-6", "Released from the Law"],
  ["7:7-12", "Is the Law Sin?"],
  ["7:13-20", "The War Within"],
  ["7:21-25", "Who Will Deliver Me?"],
  ["8:1-4", "No Condemnation"],
  ["8:5-8", "The Mind Set on the Spirit"],
  ["8:9-11", "The Spirit Who Gives Life"],
  ["8:12-13", "Debtors, Not to the Flesh"],
  ["8:14-15", "Abba, Father"],
  ["8:16-17", "Heirs of God"],
  ["8:18", "Not Worth Comparing"],
  ["8:19-22", "Creation Groans"],
  ["8:23-25", "Saved in Hope"],
];

/** Scheduled but not yet taught. The first one is "this Sunday". */
const romansUpcoming: [string, string][] = [
  ["8:26-27", "The Spirit Helps Us in Our Weakness"],
  ["8:28-30", "All Things for Good"],
  ["8:31-39", "More Than Conquerors"],
];

/* ---------- Wednesday: Through the Bible, in order ---------- */

/** Chapters covered per Wednesday, book by book, Genesis through Isaiah. */
const wednesdayPace: [string, number][] = [
  ["Genesis", 1], ["Exodus", 1], ["Leviticus", 2], ["Numbers", 2], ["Deuteronomy", 2], ["Joshua", 2],
  ["Judges", 2], ["Ruth", 2], ["1 Samuel", 1], ["2 Samuel", 1], ["1 Kings", 1], ["2 Kings", 1],
  ["1 Chronicles", 2], ["2 Chronicles", 2], ["Ezra", 2], ["Nehemiah", 2], ["Esther", 2], ["Job", 2],
  ["Psalms", 3], ["Proverbs", 2], ["Ecclesiastes", 2], ["Song of Songs", 2],
];
/** Isaiah is in progress: chapters 1–36 taught so far. */
const isaiahTaught = 36;
const wednesdayUpcoming = [37, 38, 39, 40];

/* ---------- Dates ---------- */

const day = 86400000;
const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
const utc = (s: string) => Date.parse(`${s}T12:00:00Z`);

/** Western Easter (Anonymous Gregorian algorithm). */
function easter(y: number) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), dd = ((h + l - 7 * m + 114) % 31) + 1;
  return `${y}-${String(month).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
}

/** Sundays with no book-study message: Easter and the Sunday closest to Christmas. */
function skipSunday(t: number) {
  const s = iso(t);
  const [y, m, d] = s.split("-").map(Number);
  return s === easter(y) || (m === 12 && d >= 22 && d <= 28);
}

/** Wednesdays off: Christmas break, Thanksgiving eve, and the first two weeks of July. */
function skipWednesday(t: number) {
  const [, m, d] = iso(t).split("-").map(Number);
  return (m === 12 && d >= 21) || (m === 1 && d <= 3) || (m === 11 && d >= 22 && d <= 28) || (m === 7 && d <= 14);
}

/** Walk backward from `last`, one week at a time, returning `n` dates oldest first. */
function datesBack(last: string, n: number, skip: (t: number) => boolean) {
  const out: string[] = [];
  let t = utc(last);
  while (out.length < n) {
    if (!skip(t)) out.push(iso(t));
    t -= 7 * day;
  }
  return out.reverse();
}

function datesForward(first: string, n: number, skip: (t: number) => boolean) {
  const out: string[] = [];
  let t = utc(first);
  while (out.length < n) {
    if (!skip(t)) out.push(iso(t));
    t += 7 * day;
  }
  return out;
}

/* ---------- Helpers ---------- */

/** Stable pseudo-random number in [0, 1) from a string. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

function parseRange(book: string, r: string): Passage {
  const [ch, vs] = r.split(":");
  const [a, b] = vs.split("-").map(Number);
  return { book, chapter: Number(ch), verseStart: a, verseEnd: b ?? a };
}

/** Split a chapter into `parts` verse ranges of roughly equal length. */
function splitChapter(book: string, chapter: number, parts: number): Passage[] {
  const total = bookByName[book].verses[chapter - 1];
  const n = Math.min(parts, total);
  const out: Passage[] = [];
  for (let i = 0; i < n; i++) {
    const a = Math.floor((i * total) / n) + 1;
    const b = Math.floor(((i + 1) * total) / n);
    out.push({ book, chapter, verseStart: a, verseEnd: b });
  }
  return out;
}

const seriesId = (service: Service, book: string) => `${service === "sunday" ? "sun" : "wed"}-${bookByName[book].slug}`;

function make(
  service: Service,
  passage: Passage,
  title: string,
  date: string,
  index: number,
): Message {
  const ref = formatPassage(passage);
  const r = hash(ref + date);
  const teacher =
    service === "sunday"
      ? index % 9 === 4 ? teachers.luis : teachers.nate
      : index % 6 === 2 ? teachers.nate : index % 17 === 11 ? teachers.dave : teachers.luis;
  return {
    id: `${date}-${service === "sunday" ? "am" : "pm"}`,
    service,
    passage,
    ref,
    title,
    date,
    teacher,
    minutes: service === "sunday" ? 38 + Math.round(r * 14) : 52 + Math.round(r * 18),
    video: date >= "2018-01-01",
    seriesId: seriesId(service, passage.book),
  };
}

/* ---------- Build the archive ---------- */

/** Last Sunday before Romans began. */
const LAST_SUNDAY_BEFORE_ROMANS = "2026-01-04";
const ROMANS_START = "2026-01-11";
/** Most recent Wednesday taught. */
const LAST_WEDNESDAY = "2026-09-23";

function buildSunday(): Message[] {
  const items: { passage: Passage; title: string }[] = [];
  for (const s of sundayBooks) {
    s.titles.forEach((title, ci) => {
      for (const p of splitChapter(s.book, ci + 1, s.perChapter)) items.push({ passage: p, title });
    });
  }
  const dates = datesBack(LAST_SUNDAY_BEFORE_ROMANS, items.length, skipSunday);
  const past = items.map((it, i) => make("sunday", it.passage, it.title, dates[i], i));
  const romansDates = datesForward(ROMANS_START, romans.length, skipSunday);
  const current = romans.map(([r, title], i) =>
    make("sunday", parseRange("Romans", r), title, romansDates[i], past.length + i),
  );
  return [...past, ...current];
}

function buildWednesday(): Message[] {
  const items: Passage[] = [];
  for (const [book, pace] of wednesdayPace) {
    const total = bookByName[book].chapters;
    for (let c = 1; c <= total; c += pace) {
      const end = Math.min(c + pace - 1, total);
      items.push(end > c ? { book, chapter: c, endChapter: end } : { book, chapter: c });
    }
  }
  for (let c = 1; c <= isaiahTaught; c++) items.push({ book: "Isaiah", chapter: c });
  const dates = datesBack(LAST_WEDNESDAY, items.length, skipWednesday);
  return items.map((p, i) => make("wednesday", p, formatPassage(p), dates[i], i));
}

/** Every message, newest first. */
export const messages: Message[] = [...buildSunday(), ...buildWednesday()].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : a.service === "wednesday" ? -1 : 1,
);

export const messageById = Object.fromEntries(messages.map((m) => [m.id, m])) as Record<string, Message>;

/* ---------- Series ---------- */

const seriesTitles: Record<string, string> = {
  "sun-romans": "Romans: The Gospel, Start to Finish",
  "wed-isaiah": "Isaiah: The Holy One of Israel",
};

export const series: Series[] = (() => {
  const map = new Map<string, Message[]>();
  for (const m of [...messages].reverse()) {
    const list = map.get(m.seriesId) ?? [];
    list.push(m);
    map.set(m.seriesId, list);
  }
  return [...map.entries()]
    .map(([id, list]) => ({
      id,
      book: list[0].passage.book,
      service: list[0].service,
      title: seriesTitles[id] ?? list[0].passage.book,
      start: list[0].date,
      end: list[list.length - 1].date,
      count: list.length,
      current: id === "sun-romans" || id === "wed-isaiah",
    }))
    .sort((a, b) => (a.start < b.start ? 1 : -1));
})();

/* ---------- Upcoming ---------- */

export type Upcoming = { service: Service; date: string; ref: string; title: string; passage: Passage };

export const upcoming: Upcoming[] = [
  ...datesForward("2026-09-27", romansUpcoming.length, skipSunday).map((date, i) => {
    const passage = parseRange("Romans", romansUpcoming[i][0]);
    return { service: "sunday" as const, date, ref: formatPassage(passage), title: romansUpcoming[i][1], passage };
  }),
  ...datesForward("2026-09-30", wednesdayUpcoming.length, skipWednesday).map((date, i) => {
    const passage: Passage = { book: "Isaiah", chapter: wednesdayUpcoming[i] };
    return { service: "wednesday" as const, date, ref: formatPassage(passage), title: formatPassage(passage), passage };
  }),
].sort((a, b) => (a.date < b.date ? -1 : 1));

/* ---------- Coverage per book, for the bookshelf ---------- */

export type Coverage = {
  /** Chapters taught at least once (1-based). */
  chapters: Set<number>;
  messages: number;
  sunday: boolean;
  wednesday: boolean;
  current: Service | null;
};

export const coverage: Record<string, Coverage> = (() => {
  const out: Record<string, Coverage> = {};
  for (const m of messages) {
    const c = (out[m.passage.book] ??= { chapters: new Set(), messages: 0, sunday: false, wednesday: false, current: null });
    c.messages++;
    c[m.service] = true;
    const end = m.passage.endChapter ?? m.passage.chapter;
    for (let ch = m.passage.chapter; ch <= end; ch++) c.chapters.add(ch);
  }
  out["Romans"].current = "sunday";
  out["Isaiah"].current = "wednesday";
  return out;
})();

export const stats = {
  messages: messages.length,
  books: Object.keys(coverage).length,
  chapters: Object.values(coverage).reduce((n, c) => n + c.chapters.size, 0),
  firstYear: Number(messages[messages.length - 1].date.slice(0, 4)),
};

export const latest = {
  sunday: messages.find((m) => m.service === "sunday")!,
  wednesday: messages.find((m) => m.service === "wednesday")!,
};

export const currentSeries = {
  sunday: series.find((s) => s.id === "sun-romans")!,
  wednesday: series.find((s) => s.id === "wed-isaiah")!,
};

export function messagesForBook(book: string) {
  return messages.filter((m) => m.passage.book === book);
}

export function seriesForBook(book: string) {
  return series.filter((s) => s.book === book);
}

/* ---------- When will Wednesdays reach a book? ---------- */

/** Wednesdays taught per year after breaks (see skipWednesday). */
const WEDNESDAYS_PER_YEAR = 46;

/**
 * Rough year the Wednesday study reaches a book, at about a chapter a week
 * from where we are in Isaiah. Null for books already reached.
 */
export function wednesdayEta(bookIndex: number): number | null {
  const isaiah = bookByName["Isaiah"];
  if (bookIndex <= isaiah.index) return null;
  let chapters = isaiah.chapters - isaiahTaught;
  for (let i = isaiah.index + 1; i < bookIndex; i++) chapters += booksByIndex[i].chapters;
  return 2026 + Math.max(1, Math.round((chapters + 13) / WEDNESDAYS_PER_YEAR));
}
