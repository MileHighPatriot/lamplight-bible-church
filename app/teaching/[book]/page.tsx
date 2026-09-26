import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import BookArchive from "@/components/tools/BookArchive";
import { bookBySlug, books } from "@/data/bible";
import { coverage, seriesForBook, upcoming, wednesdayEta } from "@/data/teaching";

export function generateStaticParams() {
  return books.map((b) => ({ book: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/teaching/[book]">): Promise<Metadata> {
  const { book } = await params;
  const b = bookBySlug[book];
  if (!b) return {};
  const c = coverage[b.name];
  return {
    title: `${b.name}: Verse-by-Verse Teaching`,
    description: c
      ? `${c.messages} messages through ${b.name} at Lamplight Bible Church, with the passage text for every one.`
      : `Lamplight hasn't taught through ${b.name} yet. Here's when we'll get there.`,
  };
}

const range = (a: string, b: string) => {
  const f = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return f(a) === f(b) ? f(a) : `${f(a)} – ${f(b)}`;
};

export default async function BookPage({ params }: PageProps<"/teaching/[book]">) {
  const { book } = await params;
  const b = bookBySlug[book];
  if (!b) notFound();
  const c = coverage[b.name];
  const list = seriesForBook(b.name);
  const prev = books[b.index - 1];
  const next = books[b.index + 1];
  const eta = wednesdayEta(b.index);
  const nextUp = upcoming.find((u) => u.passage.book === b.name);

  return (
    <>
      <PageHead
        eyebrow={`${b.testament === "OT" ? "Old" : "New"} Testament · ${b.section}`}
        title={b.name}
        lede={
          c
            ? `${c.chapters.size} of ${b.chapters} chapter${b.chapters > 1 ? "s" : ""} taught in ${c.messages} message${c.messages > 1 ? "s" : ""}.${c.current ? ` We're in ${b.name} right now on ${c.current === "sunday" ? "Sunday mornings" : "Wednesday nights"}.` : ""}`
            : `${b.chapters} chapter${b.chapters > 1 ? "s" : ""}. We haven't taught through ${b.name} yet.`
        }
      >
        <div className="flex flex-wrap gap-3">
          {list.map((s) => (
            <span key={s.id} className="rounded-full bg-paper/10 px-4 py-2 text-sm ring-1 ring-paper/15">
              <strong className="text-gold">{s.service === "sunday" ? "Sundays" : "Wednesdays"}</strong> ·{" "}
              {range(s.start, s.end)} · {s.count} messages
            </span>
          ))}
          {nextUp ? (
            <span className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-night">
              Next: {nextUp.ref} on{" "}
              {new Date(`${nextUp.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </span>
          ) : null}
        </div>
      </PageHead>

      <section className="grain section-y">
        <div className="wrap">
          {c ? (
            <BookArchive slug={b.slug} />
          ) : (
            <div className="mx-auto max-w-2xl rounded-[1.75rem] bg-paper p-8 text-center ring-1 ring-line sm:p-12">
              <Icon name="flame" className="mx-auto h-9 w-9 text-gold" />
              <h2 className="mt-4 text-3xl">Not yet, but we&rsquo;re on our way.</h2>
              <p className="mt-3 text-lg text-stone">
                Wednesday nights are reading through the whole Bible in order.{" "}
                {eta ? `At about a chapter a week, we should reach ${b.name} around ${eta}.` : ""} Until then, it&rsquo;s a
                great book to read on your own or with your group.
              </p>
              <Link href="/teaching/" className="mt-6 inline-flex items-center gap-2 font-semibold text-ember">
                Browse what we&rsquo;ve taught <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          )}

          <nav aria-label="Other books" className="mt-16 flex justify-between gap-4 border-t border-line pt-8">
            {prev ? (
              <Link href={`/teaching/${prev.slug}/`} className="group flex items-center gap-3">
                <Icon name="arrow-left" className="h-5 w-5 text-ember transition-transform group-hover:-translate-x-1" />
                <span>
                  <span className="block text-sm text-stone">Previous book</span>
                  <span className="font-serif text-xl">{prev.name}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/teaching/${next.slug}/`} className="group flex items-center gap-3 text-right">
                <span>
                  <span className="block text-sm text-stone">Next book</span>
                  <span className="font-serif text-xl">{next.name}</span>
                </span>
                <Icon name="arrow" className="h-5 w-5 text-ember transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </section>
    </>
  );
}
