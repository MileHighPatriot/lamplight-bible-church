import Link from "next/link";
import AreaMap from "@/components/AreaMap";
import Bookshelf from "@/components/Bookshelf";
import Icon from "@/components/Icon";
import { Mark } from "@/components/Logo";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import ThisWeek from "@/components/ThisWeek";
import Button from "@/components/ui/Button";
import { bookByName } from "@/data/bible";
import { events } from "@/data/events";
import { formatTime, weekly } from "@/data/schedule";
import { mapsHref, site } from "@/data/site";
import { coverage, currentSeries, latest, stats } from "@/data/teaching";

const fmtDate = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const firstVisit = [
  {
    icon: "car",
    title: "Park in back",
    body: "Pull into the lot behind the building. The front row is saved for first-time guests.",
  },
  {
    icon: "child",
    title: "Check the kids in",
    body: "Stop at the kids desk inside the east doors. You'll get a matching tag, and only you can pick them up.",
  },
  {
    icon: "music",
    title: "Worship & the Word",
    body: "About 25 minutes of singing, then we open the Bible and teach through the next passage. 75 minutes, start to finish.",
  },
  {
    icon: "coffee",
    title: "Stay for coffee",
    body: "Swing by the welcome table after. We'd love to meet you, and there's a small gift with your name on it.",
  },
];

const nextSteps = [
  {
    href: "/next-gen/",
    photo: "kids-reading",
    eyebrow: "Newborn – 12th grade",
    title: "Kids & Students",
    body: "Safe, fun, Bible-teaching classes every Sunday and Wednesday.",
  },
  {
    href: "/groups/",
    photo: "couple-bible",
    eyebrow: "18 groups · 8 cities",
    title: "Home Groups",
    body: "Dinner, a passage, and people who'll know your name. Find one near you.",
  },
  {
    href: "/groups/#dtc",
    photo: "bible-notes",
    eyebrow: "Tuesdays 12:05",
    title: "DTC Lunch Study",
    body: "Forty-five minutes in the Word on your lunch break, and back at your desk by one.",
  },
];

export default function Home() {
  const sundays = weekly.filter((g) => g.name === "Sunday Worship");
  const midweek = weekly.find((g) => g.id === "midweek")!;
  const romans = coverage["Romans"];
  const isaiah = coverage["Isaiah"];
  const romansCh = Math.max(...romans.chapters);
  const soon = events.slice(0, 3);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        className="lamp-glow relative overflow-hidden bg-night text-paper"
        style={{ "--glow-x": "72%", "--glow-y": "38%" } as React.CSSProperties}
      >
        <div className="wrap grid items-center gap-12 pt-12 pb-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-20 lg:pb-28">
          <div>
            <p className="eyebrow animate-rise text-gold">A Bible church in Greenwood Village</p>
            <h1 className="display mt-5 animate-rise [animation-delay:60ms]">
              Come as you are.
              <br />
              <em className="text-gold-soft">We&rsquo;ll open the Book together.</em>
            </h1>
            <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-mist [animation-delay:120ms] sm:text-xl">
              Lamplight is a church for regular people who want to know God through His Word. We teach straight
              through the Bible, verse by verse, and you&rsquo;re welcome just the way you are.
            </p>
            <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:180ms]">
              <Button href="/visit/">Plan your first visit</Button>
              <Button href="/teaching/" variant="outline-light" arrow={false}>
                <Icon name="book" className="h-4 w-4" /> Explore the teaching
              </Button>
            </div>
            <dl className="mt-12 grid max-w-lg animate-rise grid-cols-2 gap-6 border-t border-paper/15 pt-6 [animation-delay:240ms]">
              <div>
                <dt className="eyebrow text-mist">Sundays</dt>
                <dd className="mt-1.5 font-serif text-2xl">{sundays.map((s) => formatTime(s.start)).join(" & ")}</dd>
              </div>
              <div>
                <dt className="eyebrow text-mist">Wednesdays</dt>
                <dd className="mt-1.5 font-serif text-2xl">{formatTime(midweek.start)}</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-t-full rounded-b-[2rem] ring-1 ring-paper/10">
              <Photo
                name="bible-lamp"
                alt="An open Bible on a table under the warm light of a lamp"
                sizes="(min-width: 1024px) 34vw, 80vw"
                priority
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent" />
            </div>
            <ThisWeek className="relative -mt-40 w-[88%] sm:-mt-48 sm:w-[78%] lg:-mt-56" />
          </div>
        </div>
      </section>

      {/* ---------- Verse band ---------- */}
      <section className="border-b border-line bg-paper">
        <div className="wrap flex flex-col items-center gap-3 py-10 text-center">
          <Mark className="h-7 w-7 text-night" />
          <p className="scripture max-w-2xl text-2xl leading-snug sm:text-[1.75rem]">&ldquo;{site.verse.text}&rdquo;</p>
          <p className="eyebrow text-stone">{site.verse.ref}</p>
        </div>
      </section>

      {/* ---------- First visit ---------- */}
      <section className="grain section-y">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <SectionHead
              eyebrow="Your first Sunday"
              title={
                <>
                  No awkward moments.
                  <br />
                  <em>Here&rsquo;s exactly what happens.</em>
                </>
              }
              lede="Most people check us out online before they ever walk in. So here's the whole morning, start to finish, so nothing catches you off guard."
            />
            <div className="reveal relative mt-10 aspect-[3/2] overflow-hidden rounded-[1.75rem]">
              <Photo name="family-park" alt="A family walking together through a park on a sunny morning" sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <div>
            <ol className="relative grid gap-4">
              {firstVisit.map((s, i) => (
                <li key={s.title} className="reveal relative flex gap-5 rounded-[1.5rem] bg-paper p-6 ring-1 ring-line sm:p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-night text-gold">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-stone">Step {i + 1}</p>
                    <h3 className="mt-0.5 text-2xl">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-stone">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="reveal mt-8 flex flex-col gap-4 rounded-[1.5rem] bg-sage-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <p className="max-w-sm text-[1.02rem]">
                <strong>Tell us you&rsquo;re coming</strong> and we&rsquo;ll have someone meet you at the door and walk you
                to the kids rooms.
              </p>
              <Button href="/visit/" variant="night" className="shrink-0">
                Plan your visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Through the Bible ---------- */}
      <section className="relative overflow-hidden bg-night-2 text-paper">
        <div className="wrap section-y">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div>
              <SectionHead
                light
                eyebrow="Through the Bible"
                title={
                  <>
                    Every book. Every chapter.
                    <br />
                    <em className="text-gold-soft">One verse at a time.</em>
                  </>
                }
                lede={`Since ${stats.firstYear} we've taught ${stats.messages.toLocaleString()} messages through ${stats.books} books of the Bible. Sundays go through the New Testament, and Wednesday nights are working through the whole thing, Genesis to Revelation.`}
              />
              <div className="mt-10 grid gap-4">
                {[
                  {
                    s: currentSeries.sunday,
                    label: "Sundays",
                    now: `Romans ${romansCh} of ${bookByName.Romans.chapters}`,
                    pct: romansCh / bookByName.Romans.chapters,
                    href: "/teaching/romans/",
                  },
                  {
                    s: currentSeries.wednesday,
                    label: "Wednesdays",
                    now: `Isaiah ${isaiah.chapters.size} of ${bookByName.Isaiah.chapters}`,
                    pct: isaiah.chapters.size / bookByName.Isaiah.chapters,
                    href: "/teaching/isaiah/",
                  },
                ].map((row) => (
                  <Link
                    key={row.label}
                    href={row.href}
                    className="reveal group rounded-2xl bg-night-3/70 p-5 ring-1 ring-paper/10 transition-colors hover:ring-gold/60"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="eyebrow text-gold">{row.label}</p>
                      <p className="text-sm text-mist">{row.s.count} messages so far</p>
                    </div>
                    <p className="mt-2 font-serif text-2xl">{row.s.title}</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft" style={{ width: `${row.pct * 100}%` }} />
                    </div>
                    <p className="mt-2 flex items-center justify-between text-sm text-mist">
                      Chapter {row.now}
                      <Icon name="arrow" className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="reveal rounded-[1.75rem] bg-night p-6 ring-1 ring-paper/10 sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="font-serif text-2xl">The bookshelf</p>
                <p className="flex items-center gap-4 text-xs text-mist">
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-2 rounded-sm bg-gold" /> Taught
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 12 16" className="h-3 w-2.5 text-gold" aria-hidden="true">
                      <path d="M6 0c3 3.4 5 6 5 8.9a5 5 0 0 1-10 0C1 6 3 3.4 6 0Z" fill="currentColor" />
                    </svg>{" "}
                    Now teaching
                  </span>
                </p>
              </div>
              <Bookshelf compact />
              <p className="mt-6 text-sm text-mist">
                Tap any book to see every message we&rsquo;ve taught from it, or when we&rsquo;ll get there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Latest message ---------- */}
      <section className="section-y">
        <div className="wrap">
          <SectionHead eyebrow="Catch up" title="The latest from the Word" />
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            {[latest.sunday, latest.wednesday].map((m, i) => (
              <Link
                key={m.id}
                href={`/teaching/${bookByName[m.passage.book].slug}/?m=${m.id}`}
                className={`reveal group relative flex flex-col justify-end overflow-hidden rounded-[1.75rem] ${i === 0 ? "min-h-[26rem]" : "min-h-[20rem] lg:min-h-[26rem]"}`}
              >
                <Photo
                  name={i === 0 ? "worship-hand" : "bible-glow"}
                  alt=""
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-night/10" />
                <div className="relative p-7 text-paper sm:p-9">
                  <p className="eyebrow text-gold">
                    {m.service === "sunday" ? "Sunday" : "Wednesday"} · {fmtDate(m.date)}
                  </p>
                  <h3 className="mt-3 text-[2.1rem] leading-tight">{m.service === "sunday" ? m.title : m.ref}</h3>
                  <p className="mt-1 text-mist">
                    {m.service === "sunday" ? `${m.ref} · ` : "Through the Bible · "}
                    {m.teacher} · {m.minutes} min
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2 text-sm font-semibold ring-1 ring-paper/25 backdrop-blur group-hover:bg-gold group-hover:text-night">
                    <Icon name="play" className="h-3.5 w-3.5" /> Watch or read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Next steps ---------- */}
      <section className="grain border-t border-line section-y">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Find your people" title="Church is more than Sunday morning" />
            <Button href="/events/" variant="outline" className="reveal">
              See all events
            </Button>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {nextSteps.map((n) => (
              <Link key={n.href} href={n.href} className="reveal group overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line">
                <div className="aspect-[4/3] overflow-hidden">
                  <Photo name={n.photo} alt="" sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6 sm:p-7">
                  <p className="eyebrow text-ember">{n.eyebrow}</p>
                  <h3 className="mt-2 text-[1.7rem]">{n.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone">{n.body}</p>
                  <p className="mt-5 flex items-center gap-1.5 font-semibold text-ember">
                    Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 grid gap-3 lg:grid-cols-3">
            {soon.map((e) => {
              const d = new Date(e.start);
              return (
                <Link
                  key={e.id}
                  href={`/events/#${e.id}`}
                  className="reveal flex items-center gap-5 rounded-2xl bg-paper p-5 ring-1 ring-line transition-shadow hover:ring-gold"
                >
                  <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-night text-paper">
                    <span className="text-[0.68rem] font-bold tracking-wider text-gold uppercase">
                      {d.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="font-serif text-2xl leading-none">{d.getDate()}</span>
                  </span>
                  <span>
                    <span className="block text-sm text-stone">{e.kind}</span>
                    <span className="block font-semibold leading-snug">{e.title}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Location ---------- */}
      <section className="bg-paper section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Where we meet"
              title={
                <>
                  Right off I-25,
                  <br />
                  <em>in the heart of the Tech Center.</em>
                </>
              }
              lede={`We meet in a former office building in the Tech Center that we've called home since ${site.movedIn}. Plenty of parking, and a short walk from the light rail.`}
            />
            <ul className="reveal mt-8 grid gap-4 text-[1.02rem]">
              <li className="flex gap-3">
                <Icon name="car" className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                {site.directions}
              </li>
              <li className="flex gap-3">
                <Icon name="train" className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                {site.lightRail}
              </li>
              <li className="flex gap-3">
                <Icon name="access" className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                Step-free entrance, elevator, accessible restrooms, and hearing-loop receivers at the sound booth.
              </li>
            </ul>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Button href={mapsHref} variant="night">
                Get directions
              </Button>
              <Button href="/visit/" variant="outline" arrow={false}>
                Plan a visit
              </Button>
            </div>
          </div>
          <AreaMap className="reveal w-full rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgb(20_23_41/0.45)] ring-1 ring-line" />
        </div>
      </section>

      {/* ---------- Give & pray ---------- */}
      <section className="lamp-glow bg-night text-paper" style={{ "--glow-x": "50%", "--glow-y": "100%" } as React.CSSProperties}>
        <div className="wrap grid gap-5 py-16 md:grid-cols-2 lg:py-20">
          {[
            {
              href: "/prayer/",
              icon: "hands",
              title: "How can we pray for you?",
              body: "Our prayer team prays over every request by name, every week. Share as much or as little as you like.",
              cta: "Send a prayer request",
            },
            {
              href: "/give/",
              icon: "gift",
              title: "Give to what God is doing here",
              body: "We don't pass a plate. Give online in a minute, or use the boxes at the back of the room.",
              cta: "Give online",
            },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="reveal group rounded-[1.75rem] bg-night-2 p-8 ring-1 ring-paper/10 transition-colors hover:ring-gold/60 sm:p-10">
              <Icon name={c.icon} className="h-8 w-8 text-gold" />
              <h2 className="mt-6 text-[2.2rem] leading-tight">{c.title}</h2>
              <p className="mt-3 max-w-md text-mist">{c.body}</p>
              <p className="mt-6 flex items-center gap-2 font-semibold text-gold">
                {c.cta} <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
