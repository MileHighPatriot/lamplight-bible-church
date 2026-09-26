import { weekly } from "@/data/schedule";
import { site } from "@/data/site";

const dayUri = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Church structured data: address, phone, and worship times. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lon },
    event: weekly
      .filter((g) => g.name === "Sunday Worship" || g.id === "midweek")
      .map((g) => ({
        "@type": "Event",
        name: `${g.name} (${g.start})`,
        eventSchedule: {
          "@type": "Schedule",
          byDay: `https://schema.org/${dayUri[g.day]}`,
          startTime: g.start,
          repeatFrequency: "P1W",
          scheduleTimezone: "America/Denver",
        },
        location: { "@type": "Place", name: site.name, address: `${site.address.street}, ${site.address.city}` },
      })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
