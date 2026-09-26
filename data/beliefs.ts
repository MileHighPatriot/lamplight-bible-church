import type { Passage } from "@/data/bible";

export type Belief = { id: string; title: string; body: string; refs: Passage[] };

const p = (book: string, chapter: number, verseStart?: number, verseEnd?: number): Passage => ({
  book,
  chapter,
  verseStart,
  verseEnd,
});

/** Statement of faith. Every point is tied to the passages it comes from. */
export const beliefs: Belief[] = [
  {
    id: "scripture",
    title: "The Bible",
    body: "We believe the Bible, Old and New Testaments, is the inspired Word of God, without error in what it teaches, and our final authority for faith and life. That's why we teach through it book by book.",
    refs: [p("2 Timothy", 3, 16, 17), p("2 Peter", 1, 20, 21), p("Psalms", 119, 105)],
  },
  {
    id: "god",
    title: "God",
    body: "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit, equal in power and glory.",
    refs: [p("Deuteronomy", 6, 4), p("Matthew", 28, 19), p("2 Corinthians", 13, 14)],
  },
  {
    id: "jesus",
    title: "Jesus Christ",
    body: "We believe Jesus is God the Son, born of a virgin, fully God and fully man. He lived without sin, died on the cross in our place, rose bodily from the dead, and will return in power and glory.",
    refs: [p("John", 1, 1, 14), p("1 Corinthians", 15, 3, 4), p("Acts", 1, 11)],
  },
  {
    id: "salvation",
    title: "Salvation",
    body: "We believe salvation is a gift of God's grace, received by faith in Jesus alone, not earned by good works. Everyone who trusts in Him is forgiven, made new, and secure in His hand.",
    refs: [p("Ephesians", 2, 8, 9), p("Romans", 10, 9, 10), p("John", 10, 27, 29)],
  },
  {
    id: "spirit",
    title: "The Holy Spirit",
    body: "We believe the Holy Spirit lives in every believer, giving new life and spiritual gifts to build up the church. We welcome every gift the Bible describes, used in love and in order.",
    refs: [p("John", 14, 16, 17), p("1 Corinthians", 12, 4, 7), p("1 Corinthians", 14, 40)],
  },
  {
    id: "church",
    title: "The Church",
    body: "We believe the church is the body of Christ: every believer, gathered to worship, learn the Word, pray, share life, and make disciples. We practice two ordinances: baptism by immersion for believers, and the Lord's Supper.",
    refs: [p("Acts", 2, 42, 47), p("Matthew", 28, 19, 20), p("1 Corinthians", 11, 23, 26)],
  },
  {
    id: "future",
    title: "The Future",
    body: "We believe Jesus will return personally and visibly. God will raise the dead and judge the world, and those who belong to Him will live with Him forever in a new creation.",
    refs: [p("1 Thessalonians", 4, 16, 17), p("Revelation", 21, 1, 4)],
  },
];

/** What makes Lamplight, Lamplight. */
export const distinctives = [
  {
    title: "Verse by verse",
    body: "We teach through whole books of the Bible, so we hear all of it, including the hard parts, and nobody's hobbyhorse sets the agenda.",
  },
  {
    title: "Come as you are",
    body: "Jeans are fine. So are questions, doubts, and a messy week. Nobody will put you on the spot.",
  },
  {
    title: "Simple, not shallow",
    body: "No fog machines or hype. Songs you can sing, teaching you can take home, and people who'll know your name.",
  },
  {
    title: "Love first",
    body: "Right doctrine matters because it produces people who love God and their neighbors. That's the measure we hold ourselves to.",
  },
];

export const baptistNote =
  "Lamplight is an independent, non-denominational Bible church. Our roots are in the Calvary Chapel and Baptist traditions, and you'll find people from both here, along with plenty who grew up with no church at all.";
