export type Area =
  | "Greenwood Village"
  | "Centennial"
  | "Englewood"
  | "Littleton"
  | "Highlands Ranch"
  | "Lone Tree"
  | "Aurora"
  | "Tech Center"
  | "Online";

export type Stage = "Everyone" | "Young adults" | "Couples" | "Families" | "Men" | "Women" | "55+";

export type Group = {
  id: string;
  name: string;
  hosts: string;
  area: Area;
  day: number;
  time: string;
  stage: Stage;
  study: string;
  kids: boolean;
  full: boolean;
  note: string;
};

export const areas: Area[] = [
  "Greenwood Village",
  "Centennial",
  "Englewood",
  "Littleton",
  "Highlands Ranch",
  "Lone Tree",
  "Aurora",
  "Tech Center",
  "Online",
];

export const stages: Stage[] = ["Everyone", "Young adults", "Couples", "Families", "Men", "Women", "55+"];

const sunday = "Sunday's passage in Romans";

export const groups: Group[] = [
  { id: "g1", name: "Orchard Road", hosts: "Tom & Kathy Albrecht", area: "Greenwood Village", day: 2, time: "18:30", stage: "Everyone", study: sunday, kids: false, full: false, note: "Dessert first, then discussion. Ten minutes from the church." },
  { id: "g2", name: "Westlands Park Families", hosts: "Ben & Aubrey Carter", area: "Greenwood Village", day: 5, time: "17:30", stage: "Families", study: sunday, kids: true, full: false, note: "Potluck dinner. Kids play in the basement with a rotating sitter." },
  { id: "g3", name: "Dry Creek", hosts: "Samuel & Ada Okafor", area: "Centennial", day: 1, time: "19:00", stage: "Couples", study: sunday, kids: false, full: false, note: "Married and engaged couples. Childcare stipend available." },
  { id: "g4", name: "Streets at SouthGlenn", hosts: "Priya Natarajan", area: "Centennial", day: 4, time: "19:00", stage: "Women", study: "1 Samuel: A Heart After God", kids: false, full: false, note: "Women of every age. We finish at 8:30 sharp." },
  { id: "g5", name: "Arapahoe Road", hosts: "Chris & Dana Maldonado", area: "Centennial", day: 3, time: "18:00", stage: "Families", study: "Wednesday's chapter in Isaiah", kids: true, full: true, note: "Full for fall. Ask Grace about the waitlist." },
  { id: "g6", name: "Englewood Young Adults", hosts: "Eli Brooks & Sofia Reyes", area: "Englewood", day: 2, time: "19:30", stage: "Young adults", study: sunday, kids: false, full: false, note: "Ages 18–30, single or married. Near the Englewood light rail." },
  { id: "g7", name: "Hampden Heights", hosts: "Walt & June Pierce", area: "Englewood", day: 4, time: "10:00", stage: "55+", study: "Psalms of Ascent", kids: false, full: false, note: "Morning group with coffee cake. Most of us are retired, all are welcome." },
  { id: "g8", name: "Downtown Littleton", hosts: "Marcus & Leah Tran", area: "Littleton", day: 0, time: "17:00", stage: "Everyone", study: sunday, kids: true, full: false, note: "Sunday supper group. Walkable from Main Street." },
  { id: "g9", name: "Ken Caryl", hosts: "Ryan Gallagher", area: "Littleton", day: 6, time: "06:30", stage: "Men", study: "Proverbs, a chapter a week", kids: false, full: false, note: "Early start, strong coffee. Done by 7:45." },
  { id: "g10", name: "Highlands Ranch Families", hosts: "Josh & Megan Ellery", area: "Highlands Ranch", day: 0, time: "16:00", stage: "Families", study: sunday, kids: true, full: false, note: "Kids have their own lesson in the next room." },
  { id: "g11", name: "Backcountry", hosts: "Nate & Holly Whitaker", area: "Highlands Ranch", day: 1, time: "18:30", stage: "Couples", study: sunday, kids: false, full: true, note: "Full. Hosted by Pastor Nate and Holly." },
  { id: "g12", name: "RidgeGate", hosts: "Andre & Kim Wallace", area: "Lone Tree", day: 2, time: "19:00", stage: "Everyone", study: sunday, kids: false, full: false, note: "Mixed ages. Near the Lone Tree City Center station." },
  { id: "g13", name: "Southlands", hosts: "Maria Castillo", area: "Aurora", day: 4, time: "18:30", stage: "Women", study: "Ruth", kids: true, full: false, note: "Bilingual group (English/Spanish). Kids welcome." },
  { id: "g14", name: "Cherry Creek Reservoir", hosts: "Dave & Linda Kincaid", area: "Aurora", day: 5, time: "18:00", stage: "55+", study: sunday, kids: false, full: false, note: "Empty nesters. Summer meetings move to the park." },
  { id: "g15", name: "DTC Lunch Study", hosts: "Pastor Luis Ortega", area: "Tech Center", day: 2, time: "12:05", stage: "Everyone", study: "The coming Sunday's passage", kids: false, full: false, note: "At the church, 2nd-floor conference room. Back at your desk by 1." },
  { id: "g16", name: "Belleview Station", hosts: "Jenna Park", area: "Tech Center", day: 4, time: "17:30", stage: "Young adults", study: sunday, kids: false, full: false, note: "Right after work, near the Belleview light rail. Tacos after." },
  { id: "g17", name: "Lamplight Online", hosts: "Aaron & Beth Sutter", area: "Online", day: 1, time: "19:30", stage: "Everyone", study: sunday, kids: false, full: false, note: "On video. Good for travel weeks, shift workers, or if you're far away." },
  { id: "g18", name: "Men of the Word", hosts: "Samuel Okafor", area: "Greenwood Village", day: 6, time: "07:00", stage: "Men", study: "Wednesday's chapter in Isaiah", kids: false, full: false, note: "The Saturday men's study, in the fellowship hall." },
];
