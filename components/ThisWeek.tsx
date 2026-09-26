"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { formatTime } from "@/data/schedule";
import { upcoming } from "@/data/teaching";
import { countdown, liveState, whenLabel } from "@/lib/live";
import { useNow } from "@/lib/useNow";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "This week" card: live state or a countdown to the next streamed gathering,
 * plus what we're teaching at it.
 */
export default function ThisWeek({ className = "" }: { className?: string }) {
  const now = useNow(1000);
  const state = now ? liveState(now) : null;
  const service = state?.gathering.id === "midweek" ? "wednesday" : "sunday";
  const next = upcoming.find((u) => u.service === service) ?? upcoming[0];
  const t = state?.kind === "next" ? countdown(state.minutesUntil) : null;
  const secs = now ? 59 - now.getSeconds() : 0;

  return (
    <div
      className={`rounded-[1.75rem] bg-paper/95 p-6 text-ink shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-black/5 backdrop-blur sm:p-7 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        {state?.kind === "live" ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-live px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
            <span className="h-2 w-2 animate-pulse-live rounded-full bg-white" /> Live now
          </span>
        ) : (
          <span className="eyebrow text-ember">This week</span>
        )}
        <span className="text-sm text-stone">
          {state ? `${whenLabel(state.kind === "next" ? state.daysAhead : 0, state.gathering.day)} · ${formatTime(state.gathering.start)}` : "Sundays 9:00 & 10:45"}
        </span>
      </div>

      <p className="mt-5 text-sm font-semibold text-stone">
        {service === "sunday" ? "Sunday · Romans, verse by verse" : "Wednesday · Through the Bible"}
      </p>
      <p className="mt-1 font-serif text-[1.9rem] leading-tight">{next.service === "sunday" ? next.title : next.ref}</p>
      {next.service === "sunday" ? <p className="scripture mt-1 text-lg text-ember">{next.ref}</p> : null}

      {t ? (
        <div className="mt-6 grid grid-cols-4 gap-2 text-center" aria-label="Countdown to the next livestream">
          {[
            [t.d, "days"],
            [t.h, "hrs"],
            [t.m, "min"],
            [secs, "sec"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-parchment py-2.5">
              <p className="font-serif text-2xl tabular-nums">{pad(Number(v))}</p>
              <p className="text-[0.7rem] font-semibold tracking-wider text-stone uppercase">{l}</p>
            </div>
          ))}
        </div>
      ) : state?.kind === "live" ? (
        <p className="mt-6 rounded-xl bg-parchment px-4 py-3 text-[0.95rem]">
          We&rsquo;re {state.minutesIn < 25 ? "in worship" : "in the Word"} right now. Come join us online.
        </p>
      ) : (
        <div className="mt-6 h-[4.6rem] rounded-xl bg-parchment" />
      )}

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <Link
          href="/watch/"
          className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-night px-4 text-sm font-semibold text-paper hover:bg-night-3"
        >
          <Icon name="play" className="h-3.5 w-3.5" /> {state?.kind === "live" ? "Watch live" : "Watch online"}
        </Link>
        <Link
          href={`/teaching/${next.passage.book.toLowerCase()}/`}
          className="flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 ring-ink/15 ring-inset hover:bg-parchment"
        >
          <Icon name="book" className="h-4 w-4" /> Read ahead
        </Link>
      </div>
    </div>
  );
}
