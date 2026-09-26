"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

type Part = string | { blank: string };

/** Fill-in-the-blank notes for this Sunday. Answers save on this device. */
export default function SermonNotes({ id, title, refText, points }: { id: string; title: string; refText: string; points: Part[][] }) {
  const key = `ll-notes-${id}`;
  const [vals, setVals] = useState<Record<string, string>>({});
  const [thoughts, setThoughts] = useState("");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "{}");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore saved notes
      setVals(saved.vals ?? {});
      setThoughts(saved.thoughts ?? "");
    } catch {}
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify({ vals, thoughts }));
    } catch {}
  }, [key, vals, thoughts]);

  return (
    <div className="rounded-[1.75rem] bg-paper p-6 ring-1 ring-line sm:p-8 print:ring-0">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-ember">Message notes</p>
          <p className="mt-2 font-serif text-3xl">{title}</p>
          <p className="scripture text-lg text-ember">{refText}</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <button type="button" onClick={() => setShown((v) => !v)} className="rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-ink/15 ring-inset hover:bg-parchment">
            {shown ? "Hide answers" : "Show answers"}
          </button>
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-night px-4 py-2 text-sm font-semibold text-paper">
            <Icon name="notes" className="h-4 w-4" /> Print
          </button>
        </div>
      </div>
      <ol className="mt-6 grid list-decimal gap-4 pl-6 text-[1.08rem] leading-[2.2] marker:font-serif marker:text-ember">
        {points.map((parts, i) => (
          <li key={i}>
            {parts.map((p, j) =>
              typeof p === "string" ? (
                <span key={j}>{p}</span>
              ) : (
                <input
                  key={j}
                  aria-label={`Blank ${i + 1}.${j}`}
                  value={shown ? p.blank : (vals[`${i}-${j}`] ?? "")}
                  readOnly={shown}
                  onChange={(e) => setVals((v) => ({ ...v, [`${i}-${j}`]: e.target.value }))}
                  className={`mx-1 inline-block border-b-2 bg-transparent px-1 text-center font-semibold outline-none focus:border-gold ${
                    shown
                      ? "border-sage text-sage"
                      : (vals[`${i}-${j}`] ?? "").trim().toLowerCase() === p.blank.toLowerCase()
                        ? "border-sage text-sage"
                        : "border-line"
                  }`}
                  style={{ width: `${Math.max(p.blank.length, 5) * 0.72 + 1}rem` }}
                />
              ),
            )}
          </li>
        ))}
      </ol>
      <label className="mt-6 block">
        <span className="text-sm font-semibold text-stone">My takeaway this week</span>
        <textarea
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
          rows={3}
          placeholder="One thing I want to remember or do…"
          className="mt-2 w-full rounded-xl bg-parchment p-4 ring-1 ring-line outline-none focus:ring-2 focus:ring-gold"
        />
      </label>
      <p className="mt-2 text-xs text-stone print:hidden">Your notes save on this device automatically.</p>
    </div>
  );
}
