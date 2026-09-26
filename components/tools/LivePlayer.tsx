"use client";

import Icon from "@/components/Icon";
import { formatTime } from "@/data/schedule";
import { countdown, liveState, whenLabel } from "@/lib/live";
import { useNow } from "@/lib/useNow";

const pad = (n: number) => String(n).padStart(2, "0");

/** The stream frame: live, or counting down to the next stream. */
export default function LivePlayer() {
  const now = useNow(1000);
  const s = now ? liveState(now) : null;
  const t = s?.kind === "next" ? countdown(s.minutesUntil) : null;
  const secs = now ? 59 - now.getSeconds() : 0;
  return (
    <div className="relative aspect-square overflow-hidden sm:aspect-video rounded-[1.75rem] bg-night text-paper ring-1 ring-paper/10">
      <div className="lamp-glow absolute inset-0" style={{ "--glow-x": "50%", "--glow-y": "60%" } as React.CSSProperties} />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pb-14 text-center">
        {s?.kind === "live" ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-full bg-live px-3 py-1 text-xs font-bold tracking-wider uppercase">
              <span className="h-2 w-2 animate-pulse-live rounded-full bg-white" /> Live now
            </span>
            <p className="mt-4 font-serif text-3xl sm:text-4xl">{s.gathering.name}</p>
            <p className="mt-2 max-w-md text-mist">
              On a real church&rsquo;s site the YouTube livestream plays right here. This is a concept, so imagine the
              band warming up.
            </p>
          </>
        ) : s ? (
          <>
            <p className="eyebrow text-gold">
              Next stream · {whenLabel(s.daysAhead, s.gathering.day)} at {formatTime(s.gathering.start)}
            </p>
            <p className="mt-3 font-serif text-3xl sm:text-5xl">{s.gathering.name}</p>
            <div className="mt-6 flex gap-2 sm:gap-3" aria-label="Countdown">
              {[
                [t!.d, "days"],
                [t!.h, "hours"],
                [t!.m, "min"],
                [secs, "sec"],
              ].map(([v, l]) => (
                <div key={l} className="w-16 rounded-2xl bg-paper/10 py-3 ring-1 ring-paper/15 backdrop-blur sm:w-20">
                  <p className="font-serif text-3xl tabular-nums sm:text-4xl">{pad(Number(v))}</p>
                  <p className="text-[0.65rem] font-bold tracking-wider text-mist uppercase">{l}</p>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-night to-transparent px-5 pt-10 pb-4 text-sm text-mist">
        <span className="flex items-center gap-2">
          <Icon name="live" className="h-4 w-4 text-gold" /> Lamplight Live
        </span>
        <span className="hidden sm:inline">Sundays 10:45 · Wednesdays 7:00</span>
      </div>
    </div>
  );
}
