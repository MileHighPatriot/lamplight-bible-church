"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { events, kinds, type ChurchEvent, type EventKind } from "@/data/events";
import { fullAddress } from "@/data/site";

const d = (iso: string) => new Date(`${iso}:00`);
const time = (iso: string) =>
  d(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).replace(":00", "").replace(" ", "").toLowerCase();
const sameDay = (a: string, b: string) => a.slice(0, 10) === b.slice(0, 10);

function when(e: ChurchEvent) {
  const start = d(e.start);
  const day = start.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  if (!e.end) return `${day} · ${time(e.start)}`;
  if (sameDay(e.start, e.end)) return `${day} · ${time(e.start)}–${time(e.end)}`;
  const endDay = d(e.end).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  return `${day}, ${time(e.start)} – ${endDay}, ${time(e.end)}`;
}

/** One-event .ics file. Times are Denver local. Events with no end get 90 minutes. */
function ics(e: ChurchEvent) {
  const stamp = (x: Date) =>
    `${x.getFullYear()}${String(x.getMonth() + 1).padStart(2, "0")}${String(x.getDate()).padStart(2, "0")}T${String(x.getHours()).padStart(2, "0")}${String(x.getMinutes()).padStart(2, "0")}00`;
  const start = d(e.start);
  const end = e.end ? d(e.end) : new Date(start.getTime() + 90 * 60000);
  const esc = (s: string) => s.replace(/[,;]/g, (c) => `\\${c}`);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lamplight Bible Church//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@lamplight.example`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART;TZID=America/Denver:${stamp(start)}`,
    `DTEND;TZID=America/Denver:${stamp(end)}`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc(`${e.place}, ${fullAddress}`)}`,
    `DESCRIPTION:${esc(e.blurb)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

const kindTone: Record<EventKind, string> = {
  Worship: "bg-gold-soft text-ember",
  Family: "bg-sage-soft text-sage",
  Serve: "bg-sage-soft text-sage",
  Women: "bg-[#f1d9cb] text-clay-deep",
  Men: "bg-linen text-stone",
  Students: "bg-night-3 text-gold-soft",
  Missions: "bg-[#f1d9cb] text-clay-deep",
  Classes: "bg-gold-soft text-ember",
};

/** Filterable calendar of upcoming events with .ics downloads and a signup form. */
export default function EventList() {
  const [kind, setKind] = useState<EventKind | "All">("All");
  const [signing, setSigning] = useState<ChurchEvent | null>(null);
  const [going, setGoing] = useState<Record<string, number>>({});

  const used = kinds.filter((k) => events.some((e) => e.kind === k));
  const byMonth = new Map<string, ChurchEvent[]>();
  for (const e of events.filter((x) => kind === "All" || x.kind === kind)) {
    const m = d(e.start).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    byMonth.set(m, [...(byMonth.get(m) ?? []), e]);
  }
  const months = [...byMonth.entries()];

  return (
    <div>
      <div role="group" aria-label="Filter events" className="flex flex-wrap gap-2">
        {(["All", ...used] as const).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className="min-h-11 rounded-full bg-paper px-4 text-sm font-semibold ring-1 ring-line ring-inset transition-colors hover:ring-ink aria-pressed:bg-night aria-pressed:text-paper aria-pressed:ring-night"
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-12" aria-live="polite">
        {months.map(([month, list]) => (
          <section key={month} aria-labelledby={`m-${month}`}>
            <h2 id={`m-${month}`} className="flame-rule font-serif text-2xl text-ink">
              <span className="text-ink">{month}</span>
            </h2>
            <ul className="mt-6 grid gap-4">
              {list.map((e) => {
                const start = d(e.start);
                return (
                  <li
                    key={e.id}
                    id={e.id}
                    className="grid scroll-mt-24 gap-5 rounded-[1.5rem] bg-paper p-5 ring-1 ring-line target:ring-2 target:ring-gold sm:grid-cols-[5.5rem_1fr_auto] sm:items-center sm:p-6"
                  >
                    <div className="flex items-center gap-3 sm:block sm:text-center">
                      <div className="w-16 overflow-hidden rounded-2xl bg-night text-center text-paper sm:w-full">
                        <p className="bg-gold py-1 text-[0.7rem] font-bold tracking-widest text-night uppercase">
                          {start.toLocaleDateString("en-US", { month: "short" })}
                        </p>
                        <p className="py-1.5 font-serif text-3xl leading-none">{start.getDate()}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold sm:mt-2 sm:inline-block ${kindTone[e.kind]}`}>{e.kind}</span>
                    </div>
                    <div>
                      <h3 className="text-[1.6rem] leading-tight">{e.title}</h3>
                      <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-stone">
                        <span className="flex items-center gap-1.5">
                          <Icon name="clock" className="h-4 w-4 text-ember" /> {when(e)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Icon name="pin" className="h-4 w-4 text-ember" /> {e.place}
                        </span>
                      </p>
                      <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-relaxed text-stone">{e.blurb}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                      {e.signup ? (
                        going[e.id] ? (
                          <p className="flex min-h-11 items-center gap-2 rounded-full bg-sage-soft px-4 text-sm font-semibold text-sage">
                            <Icon name="check" className="h-4 w-4" /> You&rsquo;re in ({going[e.id]})
                          </p>
                        ) : (
                          <button type="button" onClick={() => setSigning(e)} className="min-h-11 rounded-full bg-gold px-5 text-sm font-semibold text-night hover:bg-gold-soft">
                            Sign up
                          </button>
                        )
                      ) : null}
                      <a
                        href={`data:text/calendar;charset=utf-8,${encodeURIComponent(ics(e))}`}
                        download={`${e.id}.ics`}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 ring-line ring-inset hover:ring-ink"
                      >
                        <Icon name="calendar" className="h-4 w-4" /> Add to calendar
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {signing ? (
        <div role="dialog" aria-modal="true" aria-labelledby="signup-title" className="fixed inset-0 z-50 flex items-end justify-center bg-night/60 p-4 backdrop-blur-sm sm:items-center" onClick={() => setSigning(null)}>
          <form
            onClick={(ev) => ev.stopPropagation()}
            onSubmit={(ev) => {
              ev.preventDefault();
              const n = Number(new FormData(ev.currentTarget).get("count")) || 1;
              setGoing((g) => ({ ...g, [signing.id]: n }));
              setSigning(null);
            }}
            className="w-full max-w-md rounded-[1.75rem] bg-paper p-7"
          >
            <p className="eyebrow text-ember">Sign up · Church Center (demo)</p>
            <h2 id="signup-title" className="mt-2 text-3xl">
              {signing.title}
            </h2>
            <p className="mt-1 text-sm text-stone">{when(signing)}</p>
            <div className="mt-5 grid gap-3">
              <input required placeholder="Your name" aria-label="Your name" className="h-12 rounded-xl bg-parchment px-4 ring-1 ring-line outline-none focus:ring-2 focus:ring-gold" />
              <input required type="email" placeholder="Email" aria-label="Email" className="h-12 rounded-xl bg-parchment px-4 ring-1 ring-line outline-none focus:ring-2 focus:ring-gold" />
              <label className="flex items-center justify-between gap-3 rounded-xl bg-parchment px-4 py-2 ring-1 ring-line">
                <span className="font-semibold">How many people?</span>
                <select name="count" defaultValue="1" className="h-9 rounded-lg bg-paper px-2 ring-1 ring-line">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-5 flex gap-2">
              <button type="submit" className="min-h-12 flex-1 rounded-full bg-gold font-semibold text-night">
                Count me in
              </button>
              <button type="button" onClick={() => setSigning(null)} className="min-h-12 rounded-full px-5 font-semibold ring-1 ring-line ring-inset">
                Cancel
              </button>
            </div>
            <p className="mt-3 text-xs text-stone">Concept site: signups aren&rsquo;t actually sent.</p>
          </form>
        </div>
      ) : null}
    </div>
  );
}
