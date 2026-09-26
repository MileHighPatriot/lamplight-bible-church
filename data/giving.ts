/** Giving funds, budget breakdown, and missions partners. Figures are illustrative. */
export const funds = [
  { id: "general", name: "General Fund", note: "Ministry, staff, and the building. Where most giving goes." },
  { id: "missions", name: "Missions", note: "The Hendersons in Peru and our local partners." },
  { id: "benevolence", name: "Care & Benevolence", note: "Rent, groceries, and car repairs for people in a hard spot." },
  { id: "building", name: "Building Fund", note: "Paying down the mortgage on the Orchard Road building." },
];

/** Share of the 2026 budget, in percent. Adds to 100. */
export const budget = [
  { label: "Ministry & staff", pct: 52, note: "Six staff, teaching, worship, groups, and care.", tone: "bg-gold" },
  { label: "Building", pct: 18, note: "Mortgage, utilities, and upkeep.", tone: "bg-sage" },
  { label: "Missions", pct: 12, note: "Peru, local partners, and short-term trips.", tone: "bg-clay" },
  { label: "Kids & students", pct: 7, note: "Curriculum, supplies, camp scholarships.", tone: "bg-dusk" },
  { label: "Care & benevolence", pct: 6, note: "Direct help for people in our church and neighborhood.", tone: "bg-gold-soft" },
  { label: "Operations", pct: 5, note: "Insurance, audit, software, office.", tone: "bg-mist" },
];

export const budgetTotal = 1_840_000;

export const missionaries = {
  names: "Mark & Julie Henderson",
  place: "Arequipa, Peru",
  since: 2018,
  body: "Mark and Julie moved from Centennial to Arequipa in 2018 to plant a Bible-teaching church. Iglesia Lámpara now has about 140 people on Sundays, trains local pastors, and runs an after-school English and tutoring program for 60 kids.",
  stats: [
    { value: "140", label: "on Sundays" },
    { value: "9", label: "pastors in training" },
    { value: "60", label: "kids in tutoring" },
  ],
};

export const partners = [
  { name: "South Metro Pregnancy Center", body: "Free ultrasounds, parenting classes, and baby supplies for moms in Arapahoe County." },
  { name: "Refugee Family Mentoring", body: "Lamplight families walk alongside newly arrived families in Aurora for their first year." },
  { name: "Tech Center Chaplains", body: "Volunteer chaplains who serve office workers through crisis and grief." },
];

export const otherWays = [
  { icon: "gift", title: "In person", body: "We don't pass a plate. There are giving boxes by every door at the back of the room." },
  { icon: "mail", title: "By check", body: "Make it out to Lamplight Bible Church and mail it to 8615 E Orchard Rd, Greenwood Village, CO 80111." },
  { icon: "phone", title: "By text", body: "Text an amount, like 50, to (303) 555-0164. The first time, you'll get a link to set up." },
  { icon: "shield", title: "Stock, IRA & donor-advised funds", body: "Give appreciated stock, a qualified charitable distribution, or a DAF grant. Email the office for our transfer details and EIN." },
];

export const givingFaqs = [
  ["Is giving required to be part of Lamplight?", "No. Guests are never expected to give. We teach about generosity when the text we're in talks about it, and otherwise we trust people to give as God leads them."],
  ["Will I get a tax statement?", "Yes. Everyone who gives online or by check gets a year-end statement by January 31. You can also download it any time from your Church Center account."],
  ["Can I change or stop a recurring gift?", "Any time, from your Church Center account or by emailing the office. There's no penalty and nobody will follow up with you about it."],
  ["Who decides how the money is spent?", "The elders set the budget each fall, and the church can see it. An independent CPA firm audits our books every year, and the annual report is available on request."],
];
