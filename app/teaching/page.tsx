import type { Metadata } from "next";
import Link from "next/link";
import Bookshelf from "@/components/Bookshelf";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import SectionHead from "@/components/SectionHead";
import PassageFinder from "@/components/tools/PassageFinder";
import { bookByName } from "@/data/bible";
import { series, stats, upcoming } from "@/data/teaching";

export const metadata: Metadata = {
  title: "Teaching: Through the Bible",
  description: `Every message Lamplight has taught since ${stats.firstYear}: ${stats.messages.toLocaleString()} messages through ${stats.books} books of the Bible, verse by verse.`,
};

const year = (iso: string) => iso.slice(0, 4);
const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

export default function TeachingPage() {
  const sunday = series.filter((s) => s.service === "sunday");
  const wednesday = series.filter((s) => s.service === "wednesday");
  return (
    <>
      <PageHead
        eyebrow="Teaching"
        title={
          <>
            Through the Bible,
            <br />
            <em className="text-gold-soft">verse by verse.</em>
          </>
        }
        lede="We don't pick topics and hunt for verses. We open a book of the Bible and teach straight through it, so we hear all of what God says, not just our favorite parts."
      >
        <dl className="grid max-w-2xl grid-cols-3 gap-6 border-t border-paper/15 pt-6">
          {[
            [stats.messages.toLocaleString(), "messages"],
            [stats.books, "books of the Bible"],
            [stats.chapters, "chapters taught"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-serif text-4xl text-gold-soft sm:text-5xl">{v}</dd>
              <dd className="mt-1 text-sm text-mist">{l}</dd>
            </div>
          ))}
        </dl>
      </PageHead>

      <section className="bg-night-2 text-paper">
        <div className="wrap py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gold">The bookshelf</p>
              <h2 className="h-section mt-3">Where we&rsquo;ve been, and where we are</h2>
            </div>
            <p className="max-w-sm text-mist">
              Gold shows how much of each book we&rsquo;ve taught. The flames mark this Sunday&rsquo;s and this
              Wednesday&rsquo;s books. Hover or tap a book for details.
            </p>
          </div>
          <div className="mt-12 pt-6">
            <Bookshelf />
          </div>
        </div>
      </section>

      <section className="grain section-y">
        <div className="wrap grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <PassageFinder />
          <div className="rounded-[1.75rem] bg-night p-6 text-paper sm:p-8">
            <p className="font-serif text-2xl">Coming up</p>
            <p className="mt-1 text-mist">Read ahead so the passage is fresh when we get there.</p>
            <ul className="mt-5 divide-y divide-paper/10">
              {upcoming.slice(0, 5).map((u) => (
                <li key={u.date + u.service}>
                  <Link
                    href={`/teaching/${bookByName[u.passage.book].slug}/`}
                    className="flex items-center justify-between gap-4 py-3.5 hover:text-gold"
                  >
                    <span>
                      <span className="block text-sm text-mist">
                        {fmt(u.date)} · {u.service === "sunday" ? "Sunday" : "Wednesday"}
                      </span>
                      <span className="block font-semibold">
                        {u.ref}
                        {u.service === "sunday" ? <span className="font-normal text-mist"> · {u.title}</span> : null}
                      </span>
                    </span>
                    <Icon name="book" className="h-4 w-4 shrink-0 text-gold" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/read/" className="mt-5 inline-flex items-center gap-2 font-semibold text-gold hover:text-gold-soft">
              Follow the reading plan <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper section-y">
        <div className="wrap">
          <SectionHead eyebrow="Every series" title="The archive, book by book" />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            {[
              ["Sunday mornings", "New Testament books, one at a time", sunday],
              ["Wednesday nights", "Genesis to Revelation, in order", wednesday],
            ].map(([label, sub, list]) => (
              <div key={label as string}>
                <p className="font-serif text-3xl">{label as string}</p>
                <p className="text-stone">{sub as string}</p>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {(list as typeof series).map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/teaching/${bookByName[s.book].slug}/`}
                        className="group flex items-center justify-between gap-4 py-3.5"
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-semibold group-hover:text-ember">{s.title}</span>
                          {s.current ? (
                            <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[0.7rem] font-bold tracking-wider text-ember uppercase">
                              Now
                            </span>
                          ) : null}
                        </span>
                        <span className="shrink-0 text-sm text-stone tabular-nums">
                          {year(s.start) === year(s.end) ? year(s.start) : `${year(s.start)}–${year(s.end).slice(2)}`} ·{" "}
                          {s.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
