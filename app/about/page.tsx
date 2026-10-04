import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Monogram from "@/components/Monogram";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import Button from "@/components/ui/Button";
import { distinctives } from "@/data/beliefs";
import { elders, staff } from "@/data/people";
import { site } from "@/data/site";
import { stats } from "@/data/teaching";

export const metadata: Metadata = {
  title: "Our Story & Staff",
  description: `How a Tuesday-night Bible study in a Centennial living room became Lamplight Bible Church. Meet the pastors, staff, and elders.`,
};

const story = [
  {
    year: "2013",
    title: "A living room in Centennial",
    body: "Nate and Amy Whitaker open their home on Tuesday nights to read through the Gospel of John with a few neighbors. Eleven people come the first night. By spring, they're borrowing chairs.",
  },
  {
    year: "2015",
    title: "The first Sunday",
    body: `On ${site.firstSunday}, about 90 people gather in a rented middle-school cafeteria and open to Mark 1. We set up and tear down every week for four years.`,
  },
  {
    year: "2019",
    title: "A home in the Tech Center",
    body: "We buy a tired two-story office building just off I-25 and turn the ground floor into an auditorium and the second into kids rooms and classrooms. Volunteers do most of the demolition.",
  },
  {
    year: "2020",
    title: "Streaming, then back together",
    body: "Like everyone, we learn to livestream in a week. We keep it after we reopen, and it's how many people first find us today.",
  },
  {
    year: "Today",
    title: "Still opening the Book",
    body: `Around 650 people on a Sunday, ${stats.messages.toLocaleString()} messages taught verse by verse, and 18 home groups across the south metro. Same simple idea as that first Tuesday night.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="Our story"
        title={
          <>
            It started with eleven people
            <br />
            <em className="text-gold-soft">and the Gospel of John.</em>
          </>
        }
        lede={`Lamplight has been teaching the Bible verse by verse in the south metro since ${site.founded}. We're bigger now, but we're trying hard to stay the kind of church where people know your name.`}
      />

      {/* ---------- Story ---------- */}
      <section className="grain section-y">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="reveal aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full rounded-b-[1.75rem]">
              <Photo name="bible-glow" alt="An open Bible glowing in warm light" sizes="(min-width: 1024px) 30vw, 90vw" className="h-full w-full object-cover" />
            </div>
            <dl className="reveal mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                [stats.messages.toLocaleString("en-US"), "messages"],
                [String(stats.books), "books taught"],
                [String(new Date().getFullYear() - site.founded) + "+", "years"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-serif text-4xl">{v}</dd>
                  <dd className="text-sm text-stone">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ol className="relative grid gap-10 border-l border-line pl-8 sm:pl-10">
            {story.map((s) => (
              <li key={s.year} className="reveal relative">
                <span aria-hidden className="absolute top-1.5 -left-[2.55rem] grid h-5 w-5 place-items-center rounded-full bg-parchment ring-1 ring-gold sm:-left-[3.05rem]">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </span>
                <p className="eyebrow text-ember">{s.year}</p>
                <h2 className="mt-2 text-[2rem]">{s.title}</h2>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-stone">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Distinctives ---------- */}
      <section className="lamp-glow bg-night section-y text-paper" style={{ "--glow-x": "85%", "--glow-y": "20%" } as React.CSSProperties}>
        <div className="wrap">
          <SectionHead light eyebrow="What we're about" title={<>Four things you&rsquo;ll notice<br /><em className="text-gold-soft">on your first Sunday.</em></>} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {distinctives.map((d) => (
              <li key={d.title} className="reveal rounded-[1.5rem] bg-night-2 p-6 ring-1 ring-paper/10">
                <Icon name="flame" className="h-5 w-5 text-gold" />
                <h3 className="mt-4 text-2xl">{d.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{d.body}</p>
              </li>
            ))}
          </ul>
          <Link href="/beliefs/" className="reveal mt-8 inline-flex items-center gap-2 font-semibold text-gold hover:underline">
            Read our statement of faith <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ---------- Staff ---------- */}
      <section id="staff" className="bg-paper section-y scroll-mt-4">
        <div className="wrap">
          <SectionHead eyebrow="Staff" title="The people you'll meet." lede="Six of us on staff, and a few hundred volunteers who do most of the real work." />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {staff.map((p) => (
              <li key={p.name} className="reveal flex flex-col rounded-[1.5rem] bg-parchment p-6 ring-1 ring-line">
                <div className="flex items-center gap-4">
                  <Monogram name={p.name} tone={p.tone} />
                  <div>
                    <h3 className="text-2xl">{p.name}</h3>
                    <p className="text-sm font-semibold text-ember">{p.role}</p>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-stone">{p.bio}</p>
                {p.email ? (
                  <a href={`mailto:${p.email}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ember hover:underline">
                    <Icon name="mail" className="h-4 w-4" /> {p.email}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Elders ---------- */}
      <section className="grain section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Elders"
              title={<>Led by a team,<br /><em>not a personality.</em></>}
              lede="Lamplight is led by a plurality of elders: two pastors and three men from the congregation who meet twice a month to pray, shepherd, and oversee the teaching and the budget. No one, including the lead pastor, has the final say alone."
            />
            <ul className="reveal mt-8 flex flex-wrap gap-2">
              {elders.map((e) => (
                <li key={e} className="rounded-full bg-paper px-4 py-2 font-semibold ring-1 ring-line">
                  {e}
                </li>
              ))}
            </ul>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Button href="/visit/">Plan a visit</Button>
              <Button href={`mailto:${site.email}`} variant="outline">
                Email the office
              </Button>
            </div>
          </div>
          <div className="reveal aspect-[4/3] overflow-hidden rounded-[1.75rem]">
            <Photo name="men-talking" alt="Two men talking together outdoors" sizes="(min-width: 1024px) 42vw, 100vw" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
