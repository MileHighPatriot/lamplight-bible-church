/**
 * Single edit point for church details. Lamplight is a fictional church built
 * as a portfolio concept: phone numbers use the 555-01xx fiction range and the
 * address is illustrative.
 */
export const site = {
  name: "Lamplight Bible Church",
  shortName: "Lamplight",
  url: "https://lamplight.5280webs.com",
  description:
    "A Bible church in Greenwood Village teaching verse by verse. Sundays at 9:00 & 10:45, Wednesdays at 7:00. Come as you are.",
  locale: "en_US",
  verse: {
    text: "Your word is a lamp to my feet and a light to my path.",
    ref: "Psalm 119:105",
  },
  phone: "(303) 555-0164",
  phoneHref: "tel:+13035550164",
  email: "hello@lamplight.example",
  prayerEmail: "prayer@lamplight.example",
  address: {
    street: "8615 E Orchard Rd",
    city: "Greenwood Village",
    region: "CO",
    postal: "80111",
  },
  geo: { lat: 39.6103, lon: -104.8871 },
  directions:
    "Just east of I-25 at Orchard Road. Turn south on Yosemite Street, then left into the lot behind the building.",
  lightRail: "Orchard Station (E and H lines) is a 6-minute walk. Head east on Orchard Road.",
  officeHours: "Tue–Thu, 9am–3pm",
  youtube: "https://www.youtube.com/@lamplightbible",
  founded: 2013,
  firstSunday: "January 11, 2015",
  movedIn: 2019,
};

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
