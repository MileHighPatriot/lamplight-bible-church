"use client";

import Link from "next/link";
import { countdown, liveState, whenLabel } from "@/lib/live";
import { useNow } from "@/lib/useNow";
import { formatTime } from "@/data/schedule";

/** Compact "live now" / "next stream" status for the top bar. */
export default function LivePill() {
  const now = useNow(20000);
  if (!now) {
    return (
      <Link href="/watch/" className="flex items-center gap-2 hover:text-gold">
        <span className="h-2 w-2 rounded-full bg-mist/60" />
        Watch online
      </Link>
    );
  }
  const s = liveState(now);
  if (s.kind === "live") {
    return (
      <Link href="/watch/" className="flex items-center gap-2 font-semibold text-paper hover:text-gold">
        <span className="h-2 w-2 animate-pulse-live rounded-full bg-live" />
        Live now: {s.gathering.name}
        <span className="text-mist">· Watch</span>
      </Link>
    );
  }
  const { d, h, m } = countdown(s.minutesUntil);
  const soon = s.minutesUntil < 180;
  return (
    <Link href="/watch/" className="flex items-center gap-2 hover:text-gold">
      <span className={`h-2 w-2 rounded-full ${soon ? "bg-gold" : "bg-mist/60"}`} />
      <span>
        Next stream: {whenLabel(s.daysAhead, s.gathering.day)} {formatTime(s.gathering.start)}
        <span className="text-mist">
          {" "}
          · in {d ? `${d}d ` : ""}
          {h}h {m}m
        </span>
      </span>
    </Link>
  );
}
