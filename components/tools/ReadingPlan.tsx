"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { apiRef } from "@/data/bible";
import { allReadings, plan, PLAN_START, type Reading } from "@/data/readingPlan";
import { denver } from "@/lib/live";
import { useScripture } from "@/lib/scripture";
import { useNow } from "@/lib/useNow";

const KEY = "ll-plan-v1";
const track = {
  prophets: { label: "Prophets", tone: "bg-sage-soft text-sage" },
  psalm: { label: "Psalm", tone: "bg-gold-soft text-ember" },
  sunday: { label: "Sunday prep", tone: "bg-night text-gold-soft" },
};
const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", o);

function Passage({ r }: { r: Reading }) {
  const state = useScripture(apiRef(r.passage));
  if (state.status === "ok")
    return (
      <div className="scripture max-h-80 overflow-y-auto pr-2 text-[1.05rem] leading-relaxed">
        {state.verses.map((v) => (
          <span key={`${v.chapter}:${v.verse}`}>
            <sup className="mr-1 font-sans text-[0.65rem] font-bold text-ember not-italic">{v.verse}</sup>
            {v.text}{" "}
          </span>
        ))}
        <p className="mt-3 font-sans text-xs font-semibold text-stone not-italic">{state.translation}</p>
      </div>
    );
  if (state.status === "error") return <p className="text-stone">Couldn&rsquo;t load {r.ref} right now. Grab your Bible and read along.</p>;
  return (
    <div className="grid gap-2" aria-label="Loading passage">
      <span className="h-4 w-full animate-pulse rounded bg-linen" />
      <span className="h-4 w-11/12 animate-pulse rounded bg-linen" />
      <span className="h-4 w-3/4 animate-pulse rounded bg-linen" />
    </div>
  );
}

/** 12-week reading plan with checkboxes and a streak, saved in this browser. */
export default function ReadingPlan() {
  const now = useNow(60000);
  const today = now ? denver(now).ymd : null;
  const [done, setDone] = useState<Set<string>>(new Set());
  const [week, setWeek] = useState<number | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore saved progress after hydration
      setDone(new Set(JSON.parse(localStorage.getItem(KEY) ?? "[]")));
    } catch {}
  }, []);

  const save = (next: Set<string>) => {
    setDone(next);
    try {
      localStorage.setItem(KEY, JSON.stringify([...next]));
    } catch {}
  };
  const toggle = (id: string) => {
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    save(next);
  };

  const todayWeek = today ? (plan.find((w) => today >= w.start && today <= w.sunday)?.n ?? (today < PLAN_START ? 1 : plan.length)) : 1;
  const shown = plan[(week ?? todayWeek) - 1];
  const todays = today ? allReadings.find((r) => r.date === today) : undefined;

  const streak = useMemo(() => {
    if (!today) return 0;
    const past = allReadings.filter((r) => r.date <= today).reverse();
    if (past[0]?.date === today && !done.has(past[0].id)) past.shift();
    let n = 0;
    for (const r of past) {
      if (!done.has(r.id)) break;
      n++;
    }
    return n;
  }, [done, today]);

  const pct = Math.round((done.size / allReadings.length) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr] lg:gap-8">
      {/* ---------- Progress ---------- */}
      <aside className="grid content-start gap-4 lg:sticky lg:top-8 lg:self-start">
        <div className="rounded-[1.75rem] bg-night p-6 text-paper">
          <p className="eyebrow text-gold">{today && today < PLAN_START ? "Starts Monday, Sept 28" : "Today"}</p>
          {todays ? (
            <>
              <p className="mt-2 font-serif text-3xl">{todays.ref}</p>
              <button
                type="button"
                onClick={() => {
                  setWeek(null);
                  setOpen(todays.id);
                }}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-night hover:bg-gold-soft"
              >
                <Icon name="book" className="h-4 w-4" /> Read it now
              </button>
            </>
          ) : (
            <p className="mt-2 font-serif text-2xl leading-snug text-paper/90">
              {today && today < PLAN_START ? `First reading: ${allReadings[0].ref}` : "Sunday. Come hear it taught."}
            </p>
          )}
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-paper/15 pt-5">
            <div>
              <dt className="text-xs text-mist">Streak</dt>
              <dd className="mt-1 flex items-center gap-1.5 font-serif text-3xl">
                <Icon name="flame" className={`h-5 w-5 ${streak ? "text-gold" : "text-paper/30"}`} />
                {streak} <span className="font-sans text-sm text-mist">day{streak === 1 ? "" : "s"}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-mist">Read</dt>
              <dd className="mt-1 font-serif text-3xl">
                {done.size}
                <span className="font-sans text-sm text-mist"> / {allReadings.length}</span>
              </dd>
            </div>
          </dl>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-paper/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Plan progress">
            <div className="h-full rounded-full bg-gold transition-[width]" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-xs text-mist">{pct}% of the plan · saved in this browser</p>
        </div>
        <div className="grid gap-2 rounded-[1.5rem] bg-paper p-5 text-sm ring-1 ring-line">
          {Object.values(track).map((t, i) => (
            <p key={t.label} className="flex items-center gap-3">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${t.tone}`}>{t.label}</span>
              <span className="text-stone">{["Mon–Thu", "Friday", "Saturday"][i]}</span>
            </p>
          ))}
        </div>
      </aside>

      {/* ---------- Week ---------- */}
      <div className="min-w-0">
        <div role="tablist" aria-label="Week" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2">
          {plan.map((w) => {
            const complete = w.readings.every((r) => done.has(r.id));
            return (
              <button
                key={w.n}
                role="tab"
                type="button"
                aria-selected={w.n === shown.n}
                onClick={() => {
                  setWeek(w.n);
                  setOpen(null);
                }}
                className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-paper text-center ring-1 ring-line ring-inset aria-selected:bg-night aria-selected:text-paper aria-selected:ring-night"
              >
                <span className="text-[0.65rem] font-bold tracking-wider uppercase opacity-75">Wk</span>
                <span className="-mt-2 font-serif text-xl">{w.n}</span>
                {complete ? <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-sage" aria-label="complete" /> : null}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" className="mt-4 overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-4 sm:px-7">
            <h2 className="text-2xl">Week {shown.n}</h2>
            <p className="text-sm font-semibold text-stone">
              {fmt(shown.start, { month: "short", day: "numeric" })} – {fmt(shown.sunday, { month: "short", day: "numeric" })}
            </p>
          </div>
          <ul className="divide-y divide-line">
            {shown.readings.map((r) => {
              const isToday = r.date === today;
              const checked = done.has(r.id);
              return (
                <li key={r.id} className={isToday ? "bg-gold-soft/25" : undefined}>
                  <div className="flex items-center gap-3 px-5 py-3.5 sm:gap-4 sm:px-7">
                    <label className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center">
                      <input type="checkbox" checked={checked} onChange={() => toggle(r.id)} className="peer sr-only" aria-label={`Mark ${r.ref} read`} />
                      <span className="grid h-7 w-7 place-items-center rounded-full ring-2 ring-line transition-colors peer-checked:bg-sage peer-checked:text-paper peer-checked:ring-sage peer-focus-visible:outline-2 peer-focus-visible:outline-gold">
                        {checked ? <Icon name="check" className="h-4 w-4" /> : null}
                      </span>
                    </label>
                    <div className="w-12 shrink-0 text-center leading-tight">
                      <p className="text-xs font-bold text-stone uppercase">{fmt(r.date, { weekday: "short" })}</p>
                      <p className="font-serif text-xl">{fmt(r.date, { day: "numeric" })}</p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-serif text-xl ${checked ? "text-stone line-through decoration-1" : ""}`}>{r.ref}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${track[r.track].tone}`}>{track[r.track].label}</span>
                        {isToday ? <span className="text-xs font-bold text-ember">Today</span> : null}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-expanded={open === r.id}
                      onClick={() => setOpen(open === r.id ? null : r.id)}
                      className="min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold text-ember ring-1 ring-line ring-inset hover:ring-ember aria-expanded:bg-night aria-expanded:text-gold-soft aria-expanded:ring-night"
                    >
                      {open === r.id ? "Close" : "Read"}
                    </button>
                  </div>
                  {open === r.id ? (
                    <div className="border-t border-line bg-parchment px-5 py-5 sm:px-7">
                      <Passage r={r} />
                      {!checked ? (
                        <button
                          type="button"
                          onClick={() => {
                            toggle(r.id);
                            setOpen(null);
                          }}
                          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-night px-5 text-sm font-semibold text-paper hover:bg-night-3"
                        >
                          <Icon name="check" className="h-4 w-4" /> Mark as read
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
            <li className="flex items-center gap-4 bg-night px-5 py-4 text-paper sm:px-7">
              <Icon name="flame" className="h-5 w-5 shrink-0 text-gold" />
              <p className="text-[0.95rem]">
                <strong>Sunday {fmt(shown.sunday, { month: "short", day: "numeric" })}:</strong>{" "}
                <span className="text-mist">we teach {shown.sundayRef} at 9:00 & 10:45.</span>
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-4 flex flex-wrap justify-end gap-4 text-sm">
          <button type="button" onClick={() => window.print()} className="font-semibold text-ember hover:underline">
            Print this plan
          </button>
          {done.size ? (
            <button type="button" onClick={() => confirm("Clear all your progress?") && save(new Set())} className="font-semibold text-stone hover:underline">
              Reset progress
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
