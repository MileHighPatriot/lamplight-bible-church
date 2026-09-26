import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import SectionHead from "@/components/SectionHead";
import EventList from "@/components/tools/EventList";
import { events } from "@/data/events";
import { dayNames, formatTime, weekly } from "@/data/schedule";

export const metadata: Metadata = {
  title: "Events",
  description:
    "What's coming up at Lamplight: baptism Sunday, the women's retreat, Trunk or Treat, Christmas Eve candlelight services, and more. Add any event to your calendar.",
};

const fmt = (iso: string) =>
  new Date(`${iso}:00`).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });

export default function EventsPage() {
  const featured = events.filter((e) => e.featured);
  const rhythm = weekly.filter((g) => g.id !== "sun-1045");

  return (
    <>
      <PageHead
        eyebrow="Events"
        title={
          <>
            Room at the table,
            <br />
            <em className="text-gold-soft">all fall long.</em>
          </>
        }
        lede="Retreats, baptisms, a chili cook-off that gets competitive, and Christmas Eve by candlelight. Filter by what you're into, and add anything to your calendar in one tap."
      >
        <ul className="grid gap-3 md:grid-cols-3">
          {featured.map((e) => (
            <li key={e.id}>
              <a href={`#${e.id}`} className="group flex h-full flex-col rounded-2xl bg-night-2 p-5 ring-1 ring-paper/10 transition-colors hover:ring-gold/60">
                <span className="eyebrow text-gold">{fmt(e.start)}</span>
                <span className="mt-2 flex-1 font-serif text-2xl leading-tight">{e.title}</span>
                <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-mist group-hover:text-paper">
                  Details <Icon name="arrow" className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHead>

      <section className="grain section-y">
        <div className="wrap">
          <EventList />
        </div>
      </section>

      <section className="bg-paper section-y">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHead
            eyebrow="Every week"
            title={
              <>
                The regular rhythm.
                <br />
                <em>No sign-up needed.</em>
              </>
            }
            lede="These happen every week unless we say otherwise. Just show up."
          />
          <ul className="divide-y divide-line border-y border-line">
            {rhythm.map((g) => (
              <li key={g.id} className="reveal grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="font-semibold text-ember">
                  {dayNames[g.day]}
                  <span className="block font-serif text-2xl font-normal text-ink">
                    {g.id === "sun-9" ? "9 & 10:45am" : formatTime(g.start)}
                  </span>
                </p>
                <div>
                  <p className="font-serif text-2xl">{g.name}</p>
                  <p className="text-sm font-semibold text-stone">{g.place}</p>
                  <p className="mt-1.5 text-[0.95rem] text-stone">{g.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
