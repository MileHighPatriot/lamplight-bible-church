export type EventKind = "Worship" | "Family" | "Serve" | "Women" | "Men" | "Students" | "Missions" | "Classes";

export type ChurchEvent = {
  id: string;
  title: string;
  kind: EventKind;
  /** Local Denver date/time. `end` optional. */
  start: string; // "2026-10-03T08:30"
  end?: string;
  place: string;
  blurb: string;
  signup?: boolean;
  featured?: boolean;
};

export const kinds: EventKind[] = ["Worship", "Family", "Serve", "Women", "Men", "Students", "Missions", "Classes"];

export const events: ChurchEvent[] = [
  {
    id: "serve-saturday",
    title: "Serve Saturday: Cherry Creek Trail Cleanup",
    kind: "Serve",
    start: "2026-10-03T08:30",
    end: "2026-10-03T11:30",
    place: "Cherry Creek State Park, Smoky Hill trailhead",
    blurb: "Gloves, grabbers, and coffee provided. Kids are welcome with a parent. We finish with breakfast burritos.",
    signup: true,
  },
  {
    id: "communion",
    title: "Communion Sunday",
    kind: "Worship",
    start: "2026-10-04T09:00",
    place: "Both services",
    blurb: "We take the Lord's Supper together the first Sunday of every month. Everyone who trusts in Jesus is welcome to take part.",
  },
  {
    id: "womens-retreat",
    title: "Women's Retreat: Still Waters",
    kind: "Women",
    start: "2026-10-09T16:00",
    end: "2026-10-11T12:00",
    place: "YMCA of the Rockies, Estes Park",
    blurb: "Two nights in the mountains working through Psalm 23. Scholarships available. Cabins fill up, so register early.",
    signup: true,
    featured: true,
  },
  {
    id: "chili",
    title: "Fall Family Night & Chili Cook-off",
    kind: "Family",
    start: "2026-10-16T17:30",
    end: "2026-10-16T19:30",
    place: "Fellowship hall & back lot",
    blurb: "Bring a crockpot or just an appetite. Bounce house, lawn games, and a pie table that gets out of hand every year.",
  },
  {
    id: "baptism",
    title: "Baptism Sunday",
    kind: "Worship",
    start: "2026-10-18T09:00",
    place: "Both services",
    blurb: "If you've trusted Jesus and haven't been baptized, this is your Sunday. Sign up by October 11 and join a short class after second service.",
    signup: true,
    featured: true,
  },
  {
    id: "foundations",
    title: "Foundations Class Begins",
    kind: "Classes",
    start: "2026-10-25T09:00",
    end: "2026-10-25T10:00",
    place: "Room 204",
    blurb: "Six Sundays on what the Bible says about God, Jesus, salvation, the church, and how to read Scripture for yourself.",
    signup: true,
  },
  {
    id: "trunk-or-treat",
    title: "Trunk or Treat",
    kind: "Family",
    start: "2026-10-31T17:00",
    end: "2026-10-31T19:00",
    place: "Church parking lot",
    blurb: "Forty decorated trunks, hot cider, and a safe place for kids to trick-or-treat. Open to the whole neighborhood.",
  },
  {
    id: "missions-sunday",
    title: "Missions Sunday: The Hendersons in Peru",
    kind: "Missions",
    start: "2026-11-01T09:00",
    place: "Both services",
    blurb: "Mark and Julie Henderson are home from Arequipa and will share how the church plant there is growing.",
  },
  {
    id: "occ",
    title: "Operation Christmas Child Packing Party",
    kind: "Serve",
    start: "2026-11-14T10:00",
    end: "2026-11-14T12:00",
    place: "Fellowship hall",
    blurb: "Our goal is 500 shoeboxes this year. Bring a friend, and bring a few items from the list if you can.",
  },
  {
    id: "students-lockin",
    title: "Students Fall Lock-in",
    kind: "Students",
    start: "2026-11-20T19:00",
    end: "2026-11-21T07:00",
    place: "The Loft",
    blurb: "Grades 6–12. Dodgeball, worship at midnight, and pancakes at dawn. Permission slip required.",
    signup: true,
  },
  {
    id: "thanksgiving-eve",
    title: "Thanksgiving Eve Service",
    kind: "Worship",
    start: "2026-11-25T19:00",
    end: "2026-11-25T20:00",
    place: "Main auditorium",
    blurb: "An hour of worship and stories of God's faithfulness this year. Replaces the usual midweek study.",
  },
  {
    id: "christmas-eve",
    title: "Christmas Eve Candlelight Services",
    kind: "Worship",
    start: "2026-12-24T15:00",
    end: "2026-12-24T19:00",
    place: "Services at 3:00, 4:30 & 6:00",
    blurb: "Carols, the Christmas story from Luke 2, and a room full of candles. Our favorite night of the year. Bring everyone.",
    featured: true,
  },
];
