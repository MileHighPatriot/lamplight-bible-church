"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { thisSunday } from "@/data/nextgen";

const fmt = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric" });

/** This Sunday's passage at every age, with conversation starters for the drive home. */
export default function DriveHome() {
  const [i, setI] = useState(2);
  const age = thisSunday.byAge[i];

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line">
      <div className="bg-night p-6 text-paper sm:p-8">
        <p className="eyebrow text-gold">Sunday, {fmt(thisSunday.date)} · {thisSunday.ref}</p>
        <p className="mt-3 font-serif text-[1.7rem] leading-snug sm:text-3xl">{thisSunday.bigIdea}</p>
        <div role="tablist" aria-label="Age group" className="mt-6 flex flex-wrap gap-2">
          {thisSunday.byAge.map((a, n) => (
            <button
              key={a.label}
              role="tab"
              type="button"
              aria-selected={n === i}
              aria-controls="drive-home-panel"
              onClick={() => setI(n)}
              className="min-h-11 rounded-full px-4 text-sm font-semibold ring-1 ring-paper/20 ring-inset aria-selected:bg-gold aria-selected:text-night aria-selected:ring-gold"
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
      <div id="drive-home-panel" role="tabpanel" className="p-6 sm:p-8" aria-live="polite">
        <p className="eyebrow text-ember">What they heard</p>
        <p className="scripture mt-2 text-2xl leading-snug">&ldquo;{age.said}&rdquo;</p>
        <p className="eyebrow mt-7 text-ember">Ask on the drive home</p>
        <ol className="mt-3 grid gap-3">
          {age.ask.map((q, n) => (
            <li key={q} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-soft text-sm font-bold text-ember">{n + 1}</span>
              <span className="pt-0.5">{q}</span>
            </li>
          ))}
        </ol>
        <div className="mt-7 flex items-start gap-3 rounded-2xl bg-parchment p-4">
          <Icon name="book" className="mt-1 h-5 w-5 shrink-0 text-ember" />
          <p className="text-[0.95rem]">
            <strong>Memory verse:</strong> <span className="scripture">&ldquo;{thisSunday.memory.text}&rdquo;</span>{" "}
            <span className="text-stone">{thisSunday.memory.ref}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
