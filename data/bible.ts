import verseCounts from "@/lib/verse-counts.json";

export type Section =
  | "Law"
  | "History"
  | "Poetry & Wisdom"
  | "Major Prophets"
  | "Minor Prophets"
  | "Gospels & Acts"
  | "Paul's Letters"
  | "General Letters"
  | "Prophecy";

export type Book = {
  index: number;
  name: string;
  /** Short label for tight spots, e.g. "1 Cor". */
  abbr: string;
  slug: string;
  testament: "OT" | "NT";
  section: Section;
  chapters: number;
  /** Verses in each chapter (KJV numbering), index 0 = chapter 1. */
  verses: number[];
};

const raw: [string, string, Section][] = [
  ["Genesis", "Gen", "Law"],
  ["Exodus", "Exod", "Law"],
  ["Leviticus", "Lev", "Law"],
  ["Numbers", "Num", "Law"],
  ["Deuteronomy", "Deut", "Law"],
  ["Joshua", "Josh", "History"],
  ["Judges", "Judg", "History"],
  ["Ruth", "Ruth", "History"],
  ["1 Samuel", "1 Sam", "History"],
  ["2 Samuel", "2 Sam", "History"],
  ["1 Kings", "1 Kgs", "History"],
  ["2 Kings", "2 Kgs", "History"],
  ["1 Chronicles", "1 Chr", "History"],
  ["2 Chronicles", "2 Chr", "History"],
  ["Ezra", "Ezra", "History"],
  ["Nehemiah", "Neh", "History"],
  ["Esther", "Esth", "History"],
  ["Job", "Job", "Poetry & Wisdom"],
  ["Psalms", "Ps", "Poetry & Wisdom"],
  ["Proverbs", "Prov", "Poetry & Wisdom"],
  ["Ecclesiastes", "Eccl", "Poetry & Wisdom"],
  ["Song of Songs", "Song", "Poetry & Wisdom"],
  ["Isaiah", "Isa", "Major Prophets"],
  ["Jeremiah", "Jer", "Major Prophets"],
  ["Lamentations", "Lam", "Major Prophets"],
  ["Ezekiel", "Ezek", "Major Prophets"],
  ["Daniel", "Dan", "Major Prophets"],
  ["Hosea", "Hos", "Minor Prophets"],
  ["Joel", "Joel", "Minor Prophets"],
  ["Amos", "Amos", "Minor Prophets"],
  ["Obadiah", "Obad", "Minor Prophets"],
  ["Jonah", "Jonah", "Minor Prophets"],
  ["Micah", "Mic", "Minor Prophets"],
  ["Nahum", "Nah", "Minor Prophets"],
  ["Habakkuk", "Hab", "Minor Prophets"],
  ["Zephaniah", "Zeph", "Minor Prophets"],
  ["Haggai", "Hag", "Minor Prophets"],
  ["Zechariah", "Zech", "Minor Prophets"],
  ["Malachi", "Mal", "Minor Prophets"],
  ["Matthew", "Matt", "Gospels & Acts"],
  ["Mark", "Mark", "Gospels & Acts"],
  ["Luke", "Luke", "Gospels & Acts"],
  ["John", "John", "Gospels & Acts"],
  ["Acts", "Acts", "Gospels & Acts"],
  ["Romans", "Rom", "Paul's Letters"],
  ["1 Corinthians", "1 Cor", "Paul's Letters"],
  ["2 Corinthians", "2 Cor", "Paul's Letters"],
  ["Galatians", "Gal", "Paul's Letters"],
  ["Ephesians", "Eph", "Paul's Letters"],
  ["Philippians", "Phil", "Paul's Letters"],
  ["Colossians", "Col", "Paul's Letters"],
  ["1 Thessalonians", "1 Thess", "Paul's Letters"],
  ["2 Thessalonians", "2 Thess", "Paul's Letters"],
  ["1 Timothy", "1 Tim", "Paul's Letters"],
  ["2 Timothy", "2 Tim", "Paul's Letters"],
  ["Titus", "Titus", "Paul's Letters"],
  ["Philemon", "Phlm", "Paul's Letters"],
  ["Hebrews", "Heb", "General Letters"],
  ["James", "Jas", "General Letters"],
  ["1 Peter", "1 Pet", "General Letters"],
  ["2 Peter", "2 Pet", "General Letters"],
  ["1 John", "1 John", "General Letters"],
  ["2 John", "2 John", "General Letters"],
  ["3 John", "3 John", "General Letters"],
  ["Jude", "Jude", "General Letters"],
  ["Revelation", "Rev", "Prophecy"],
];

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export const books: Book[] = raw.map(([name, abbr, section], index) => ({
  index,
  name,
  abbr,
  slug: slugify(name),
  testament: index < 39 ? "OT" : "NT",
  section,
  chapters: (verseCounts as number[][])[index].length,
  verses: (verseCounts as number[][])[index],
}));

export const bookByName = Object.fromEntries(books.map((b) => [b.name, b])) as Record<string, Book>;
export const bookBySlug = Object.fromEntries(books.map((b) => [b.slug, b])) as Record<string, Book>;

export const sections: Section[] = [
  "Law",
  "History",
  "Poetry & Wisdom",
  "Major Prophets",
  "Minor Prophets",
  "Gospels & Acts",
  "Paul's Letters",
  "General Letters",
  "Prophecy",
];

/** A passage like Romans 8:18–25, or a whole-chapter span like Genesis 12–13. */
export type Passage = {
  book: string;
  chapter: number;
  verseStart?: number;
  endChapter?: number;
  verseEnd?: number;
};

export function formatPassage(p: Passage, opts: { abbr?: boolean } = {}) {
  const multi = p.endChapter != null && p.endChapter !== p.chapter;
  // One psalm is "Psalm 23"; several are "Psalms 1–2".
  const name = opts.abbr ? bookByName[p.book].abbr : p.book === "Psalms" && !multi ? "Psalm" : p.book;
  const single = bookByName[p.book].chapters === 1;
  if (p.verseStart == null) {
    if (p.endChapter && p.endChapter !== p.chapter) return `${name} ${p.chapter}–${p.endChapter}`;
    return single ? name : `${name} ${p.chapter}`;
  }
  const endCh = p.endChapter ?? p.chapter;
  if (endCh !== p.chapter) return `${name} ${p.chapter}:${p.verseStart}–${endCh}:${p.verseEnd}`;
  return `${name} ${p.chapter}:${p.verseStart}${p.verseEnd && p.verseEnd !== p.verseStart ? `–${p.verseEnd}` : ""}`;
}

/** Query string for bible-api.com, e.g. "romans 8:18-25". */
export function apiRef(p: Passage) {
  const name = p.book.toLowerCase();
  if (p.verseStart == null) {
    return p.endChapter && p.endChapter !== p.chapter ? `${name} ${p.chapter}-${p.endChapter}` : `${name} ${p.chapter}`;
  }
  const endCh = p.endChapter ?? p.chapter;
  if (endCh !== p.chapter) return `${name} ${p.chapter}:${p.verseStart}-${endCh}:${p.verseEnd}`;
  return `${name} ${p.chapter}:${p.verseStart}-${p.verseEnd ?? p.verseStart}`;
}
