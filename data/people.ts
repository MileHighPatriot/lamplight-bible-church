export type Person = {
  name: string;
  role: string;
  bio: string;
  email?: string;
  /** Two-tone monogram colors. */
  tone: "gold" | "sage" | "dusk" | "clay";
};

export const staff: Person[] = [
  {
    name: "Nate Whitaker",
    role: "Lead Pastor",
    bio: "Nate started Lamplight as a Tuesday-night Bible study in his Centennial living room in 2013. He teaches most Sundays, reads too many commentaries, and still coaches his daughter's rec soccer team.",
    email: "nate@lamplight.example",
    tone: "gold",
  },
  {
    name: "Luis Ortega",
    role: "Associate Pastor, Midweek & Care",
    bio: "Luis leads Wednesday nights through the Bible and oversees hospital visits, counseling, and care. Before ministry he spent twelve years as an engineer in the Tech Center.",
    email: "luis@lamplight.example",
    tone: "sage",
  },
  {
    name: "Rachel Kim",
    role: "Director of Kids Ministry",
    bio: "Rachel runs Sunday and Wednesday kids classes for newborns through 5th grade, and the 60 volunteers who make them happen. Former Cherry Creek Schools first-grade teacher.",
    email: "rachel@lamplight.example",
    tone: "clay",
  },
  {
    name: "Jordan Pike",
    role: "Students Pastor",
    bio: "Jordan leads Lamplight Students (grades 6–12) on Wednesday nights and the summer trip to Colorado Springs. He knows every good burrito spot on Arapahoe Road.",
    email: "jordan@lamplight.example",
    tone: "dusk",
  },
  {
    name: "Micah Dunn",
    role: "Worship Leader",
    bio: "Micah leads the Sunday and midweek worship teams. He cares more about the congregation singing than the band sounding big.",
    email: "micah@lamplight.example",
    tone: "sage",
  },
  {
    name: "Grace Lindqvist",
    role: "Operations & Groups",
    bio: "Grace keeps the building, the calendar, and the home groups running. If you want to find a group, she's the one to ask.",
    email: "grace@lamplight.example",
    tone: "gold",
  },
];

export const elders = ["Nate Whitaker", "Luis Ortega", "Dave Kincaid", "Tom Albrecht", "Samuel Okafor"];

export const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
