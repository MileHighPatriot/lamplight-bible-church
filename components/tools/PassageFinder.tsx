"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { books } from "@/data/bible";
import { messages } from "@/data/teaching";

/** Parse "jn 3:16", "Romans 8", "1 cor 13" into a book + chapter (+ verse). */
function parse(q: string) {
  const m = q.trim().toLowerCase().match(/^([1-3]?\s*[a-z. ]+?)\s*(\d+)?(?::(\d+))?$/);
  if (!m) return null;
  const name = m[1].replace(/\./g, "").replace(/\s+/g, " ").trim();
  if (name.length < 2) return null;
  const book =
    books.find((b) => b.name.toLowerCase() === name) ??
    books.find((b) => b.abbr.toLowerCase() === name) ??
    books.find((b) => b.name.toLowerCase().startsWith(name)) ??
    books.find((b) => b.name.toLowerCase().replace(/\s/g, "").startsWith(name.replace(/\s/g, "")));
  if (!book) return null;
  return { book, chapter: m[2] ? Number(m[2]) : null, verse: m[3] ? Number(m[3]) : null };
}

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** "Has Lamplight taught on John 3:16?" Search the whole archive by reference. */
export default function PassageFinder() {
  const [q, setQ] = useState("");
  const p = useMemo(() => parse(q), [q]);
  const results = useMemo(() => {
    if (!p) return [];
    return messages
      .filter((m) => {
        if (m.passage.book !== p.book.name) return false;
        if (p.chapter == null) return true;
        const end = m.passage.endChapter ?? m.passage.chapter;
        if (p.chapter < m.passage.chapter || p.chapter > end) return false;
        if (p.verse == null || m.passage.verseStart == null) return true;
        return p.verse >= m.passage.verseStart && p.verse <= (m.passage.verseEnd ?? m.passage.verseStart);
      })
      .slice(0, 8);
  }, [p]);

  return (
    <div className="rounded-[1.75rem] bg-paper p-6 ring-1 ring-line sm:p-8">
      <label htmlFor="finder" className="font-serif text-2xl">
        Find a passage
      </label>
      <p className="mt-1 text-stone">Type any reference to see every message we&rsquo;ve taught on it.</p>
      <div className="relative mt-5">
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-stone" />
        <input
          id="finder"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try John 3:16, Psalm 23, or 1 Cor 13"
          autoComplete="off"
          className="h-14 w-full rounded-full bg-parchment pr-5 pl-12 text-lg ring-1 ring-line outline-none focus:ring-2 focus:ring-gold"
        />
      </div>
      <div aria-live="polite" className="mt-4">
        {q && !p ? <p className="px-2 text-stone">Hmm, we couldn&rsquo;t find that book. Try the full name.</p> : null}
        {p && results.length === 0 ? (
          <p className="px-2 text-stone">
            We haven&rsquo;t taught {p.book.name}
            {p.chapter ? ` ${p.chapter}` : ""} yet.{" "}
            <Link href={`/teaching/${p.book.slug}/`} className="font-semibold text-ember underline underline-offset-2">
              See when we&rsquo;ll get there
            </Link>
          </p>
        ) : null}
        {results.length ? (
          <ul className="grid gap-1.5">
            {results.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/teaching/${p!.book.slug}/?m=${m.id}`}
                  className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 hover:bg-parchment"
                >
                  <span>
                    <span className="block font-semibold">{m.ref}</span>
                    <span className="block text-sm text-stone">
                      {m.service === "sunday" ? m.title : "Through the Bible"} · {fmt(m.date)}
                    </span>
                  </span>
                  <Icon name="play" className="h-3.5 w-3.5 shrink-0 text-ember" />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
