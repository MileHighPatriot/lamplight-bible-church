/**
 * Kids & Students. Rooms are ordered by age; `max` is the oldest age (in
 * years) a room takes, which the visit planner uses to place each child.
 */
export type Room = {
  id: string;
  max: number;
  name: string;
  ages: string;
  room: string;
  ratio: string;
  note: string;
  rhythm: string[];
  tone: "gold" | "sage" | "clay" | "dusk";
};

export const rooms: Room[] = [
  {
    id: "nursery",
    max: 1,
    name: "Nursery",
    ages: "Newborn – walking",
    room: "Room 101",
    ratio: "1 adult : 2 babies",
    note: "Newborns to walkers. Bring a labeled diaper bag.",
    rhythm: ["Rocking chairs and quiet songs", "Feeding and changing on your schedule", "We text you if they need you"],
    tone: "sage",
  },
  {
    id: "toddlers",
    max: 2,
    name: "Toddlers",
    ages: "Walking – 2 years",
    room: "Room 103",
    ratio: "1 adult : 4 kids",
    note: "Walkers to 2s. Snack is Cheerios and applesauce.",
    rhythm: ["Free play and a snack", "A five-minute Bible story with pictures", "One simple truth, said a dozen times"],
    tone: "gold",
  },
  {
    id: "preschool",
    max: 5,
    name: "Preschool",
    ages: "3 years – pre-K",
    room: "Room 105",
    ratio: "1 adult : 6 kids",
    note: "Ages 3 to pre-K. Bible story, songs, and a craft.",
    rhythm: ["Songs with motions", "The Bible story, acted out", "A craft to bring home"],
    tone: "clay",
  },
  {
    id: "k2",
    max: 8,
    name: "Kids K–2",
    ages: "Kindergarten – 2nd grade",
    room: "Room 110",
    ratio: "1 adult : 8 kids",
    note: "Kindergarten to 2nd grade. Large group, then small groups.",
    rhythm: ["Large-group worship and story", "Small groups by grade", "A memory verse with a prize jar"],
    tone: "sage",
  },
  {
    id: "35",
    max: 11,
    name: "Kids 3–5",
    ages: "3rd – 5th grade",
    room: "Room 112",
    ratio: "1 adult : 10 kids",
    note: "3rd to 5th grade. They bring their own Bibles.",
    rhythm: ["They find the passage in their own Bibles", "Teaching from the same text as the adults", "Small groups that ask real questions"],
    tone: "dusk",
  },
  {
    id: "students",
    max: 18,
    name: "Students",
    ages: "6th – 12th grade",
    room: "Main room",
    ratio: "Leaders in every small group",
    note: "6th grade and up usually sit with you on Sundays.",
    rhythm: ["Sundays: in the service with their families", "Wednesdays at 7: The Loft", "Small groups split by grade and gender"],
    tone: "gold",
  },
];

/** This Sunday's passage, taught at every age. Parents get the conversation starters. */
export const thisSunday = {
  ref: "Romans 8:26–27",
  date: "2026-09-27",
  bigIdea: "When we don't know what to pray, the Holy Spirit helps us.",
  memory: { text: "The Spirit also helps our weaknesses.", ref: "Romans 8:26 (WEB)" },
  byAge: [
    {
      label: "Ages 2–5",
      said: "God helps me when I don't know what to say.",
      ask: ["Who can you talk to when you feel sad?", "Can we pray together right now, even with just one word?"],
    },
    {
      label: "K–2nd",
      said: "Even when I don't have the words, God hears me.",
      ask: [
        "What's something that's hard to pray about?",
        "Paul says the Spirit helps us. What does a helper do?",
        "Let's each pray one sentence at dinner tonight.",
      ],
    },
    {
      label: "3rd–5th",
      said: "The Spirit prays for me, and God always knows what the Spirit means.",
      ask: [
        "Romans 8:26 says we're weak. Does that surprise you?",
        "Why would it matter that God knows our hearts?",
        "Is there something you've stopped praying about? Why?",
      ],
    },
    {
      label: "Students",
      said: "Prayer isn't a performance. You can be honest with God, even when it's messy.",
      ask: [
        "When is prayer hardest for you?",
        "What changes if the Spirit is praying with you, not grading you?",
        "Read Romans 8:26–28 together. How does verse 28 depend on 26–27?",
      ],
    },
  ],
};

export const checkIn = [
  {
    icon: "phone",
    title: "Pre-check in or use a kiosk",
    body: "Check in from your phone on the way, or at the kiosks inside the east doors. First time? A greeter will walk you through it.",
  },
  {
    icon: "shield",
    title: "Matching tags",
    body: "Your child gets a name tag with allergies printed on it. You get a pickup tag with the same code. No tag, no pickup.",
  },
  {
    icon: "access",
    title: "A secure hallway",
    body: "The kids wing has one entrance, staffed by a greeter. Only checked-in kids and badged volunteers go past it.",
  },
  {
    icon: "mail",
    title: "We text you if they need you",
    body: "If your child needs you mid-service, your code shows on the screen by the stage and we text you. Most weeks nobody gets a text.",
  },
];

export const safety = [
  "Every volunteer is background-checked before serving, and again every two years.",
  "Every volunteer is trained in child safety, abuse prevention, and first aid.",
  "Two unrelated adults in every room, every time. No volunteer is ever alone with a child.",
  "Volunteers must attend Lamplight for six months before serving with kids.",
  "Windows in every classroom door, and a hall monitor who walks the wing all morning.",
  "Nut-free rooms. Allergies are printed on every child's tag.",
];

export const students = {
  when: "Wednesdays at 7:00pm",
  where: "The Loft, upstairs, east entrance",
  grades: "6th – 12th grade",
  schools: ["Cherry Creek HS", "Campus MS", "Arapahoe HS", "Heritage HS", "Grandview HS", "Homeschool"],
  rhythm: [
    { time: "6:30", label: "Doors open", body: "Foosball, snacks, and whoever wins at 9-square." },
    { time: "7:00", label: "Worship", body: "The student band leads three or four songs." },
    { time: "7:20", label: "Teaching", body: "Jordan teaches through a book of the Bible, just like Sundays." },
    { time: "7:55", label: "Small groups", body: "By grade and gender, with the same leaders every week." },
    { time: "8:30", label: "Pickup", body: "Parents come to the Loft door. Middle schoolers are released only to a parent." },
  ],
  series: "Currently: the Gospel of Mark",
  trip: "Every July we take a week at a camp near Colorado Springs. Registration opens in February.",
};
