"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import MessagePanel from "@/components/tools/MessagePanel";
import { bookBySlug } from "@/data/bible";
import { messagesForBook, messageById, type Message } from "@/data/teaching";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** Chapter map + message list + detail panel for one book. */
export default function BookArchive({ slug }: { slug: string }) {
  const book = bookBySlug[slug];
  const all = useMemo(() => messagesForBook(book.name), [book.name]);
  const [chapter, setChapter] = useState<number | null>(null);
  const [service, setService] = useState<"all" | "sunday" | "wednesday">("all");
  const [open, setOpen] = useState<Message | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Deep link: ?m=<message id>
  useEffect(() => {
    const id = new URLSearchParams(location.search).get("m");
    if (id && messageById[id]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- open the linked message on load
      setOpen(messageById[id]);
      setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, []);

  const byChapter = useMemo(() => {
    const map = new Map<number, number>();
    for (const m of all) {
      const end = m.passage.endChapter ?? m.passage.chapter;
      for (let c = m.passage.chapter; c <= end; c++) map.set(c, (map.get(c) ?? 0) + 1);
    }
    return map;
  }, [all]);

  const hasBoth = all.some((m) => m.service === "sunday") && all.some((m) => m.service === "wednesday");
  const list = all
    .filter((m) => service === "all" || m.service === service)
    .filter((m) => chapter == null || (chapter >= m.passage.chapter && chapter <= (m.passage.endChapter ?? m.passage.chapter)))
    .slice()
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  function choose(m: Message) {
    setOpen(m);
    history.replaceState(null, "", `?m=${m.id}`);
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
      <div>
        <div className="rounded-[1.75rem] bg-paper p-6 ring-1 ring-line sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="font-serif text-2xl">Chapters</p>
            {chapter != null ? (
              <button type="button" onClick={() => setChapter(null)} className="text-sm font-semibold text-ember">
                Show all
              </button>
            ) : (
              <p className="text-sm text-stone">Tap one to filter</p>
            )}
          </div>
          <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(2.6rem,1fr))] gap-1.5">
            {Array.from({ length: book.chapters }, (_, i) => i + 1).map((c) => {
              const n = byChapter.get(c) ?? 0;
              return (
                <button
                  key={c}
                  type="button"
                  disabled={!n}
                  aria-pressed={chapter === c}
                  onClick={() => setChapter(chapter === c ? null : c)}
                  title={n ? `${book.name} ${c}: ${n} message${n > 1 ? "s" : ""}` : `${book.name} ${c}: not yet taught`}
                  className={`h-11 rounded-lg text-sm font-semibold tabular-nums transition-colors ${
                    !n
                      ? "bg-parchment text-stone/50"
                      : chapter === c
                        ? "bg-night text-gold"
                        : "bg-gold/25 text-ink hover:bg-gold/50"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {hasBoth ? (
          <div className="mt-6 inline-flex rounded-full bg-paper p-1 ring-1 ring-line">
            {(["all", "sunday", "wednesday"] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={service === s}
                onClick={() => setService(s)}
                className="rounded-full px-4 py-1.5 text-sm font-semibold text-stone aria-pressed:bg-night aria-pressed:text-paper"
              >
                {s === "all" ? "All" : s === "sunday" ? "Sundays" : "Wednesdays"}
              </button>
            ))}
          </div>
        ) : null}

        <ol className="mt-6 grid gap-1.5">
          {list.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => choose(m)}
                aria-current={open?.id === m.id ? "true" : undefined}
                className="group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors hover:bg-paper aria-[current=true]:bg-night aria-[current=true]:text-paper"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper ring-1 ring-line group-aria-[current=true]:bg-gold group-aria-[current=true]:text-night group-aria-[current=true]:ring-0">
                  <Icon name="play" className="ml-0.5 h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{m.service === "sunday" ? m.title : m.ref}</span>
                  <span className="block truncate text-sm text-stone group-aria-[current=true]:text-mist">
                    {m.service === "sunday" ? `${m.ref} · ` : "Wednesday · "}
                    {fmt(m.date)}
                  </span>
                </span>
                <span className="shrink-0 text-sm text-stone tabular-nums group-aria-[current=true]:text-mist">{m.minutes}m</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div ref={panelRef} className="scroll-mt-6 lg:sticky lg:top-6 lg:self-start">
        {open ? (
          <MessagePanel key={open.id} m={open} onClose={() => { setOpen(null); history.replaceState(null, "", location.pathname); }} />
        ) : (
          <div className="flex min-h-[22rem] flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-line p-10 text-center">
            <Icon name="book" className="h-9 w-9 text-ember" />
            <p className="mt-4 font-serif text-2xl">Pick a message</p>
            <p className="mt-2 max-w-xs text-stone">
              Choose any message to watch it, read the passage, or have it read aloud to you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
