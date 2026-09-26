"use client";

import { useState } from "react";
import { apiRef, formatPassage, type Passage } from "@/data/bible";
import { useScripture } from "@/lib/scripture";

/** Scripture references as chips. Tap one to read the verses in place. */
export default function BeliefRefs({ id, refs }: { id: string; refs: Passage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const passage = open == null ? null : refs[open];
  const state = useScripture(passage ? apiRef(passage) : null);
  const panel = `${id}-verses`;

  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {refs.map((r, n) => (
          <li key={formatPassage(r)}>
            <button
              type="button"
              aria-expanded={open === n}
              aria-controls={panel}
              onClick={() => setOpen(open === n ? null : n)}
              className="min-h-10 rounded-full bg-paper px-4 text-sm font-semibold text-ember ring-1 ring-line ring-inset transition-colors hover:ring-ember aria-expanded:bg-night aria-expanded:text-gold-soft aria-expanded:ring-night"
            >
              {formatPassage(r)}
            </button>
          </li>
        ))}
      </ul>
      <div id={panel} aria-live="polite">
        {passage ? (
          <div className="mt-4 rounded-2xl border-l-2 border-gold bg-paper p-5 ring-1 ring-line">
            {state.status === "ok" ? (
              <>
                <p className="scripture text-lg leading-relaxed">
                  {state.verses.map((v) => (
                    <span key={`${v.chapter}:${v.verse}`}>
                      <sup className="mr-1 font-sans text-[0.65rem] font-bold text-ember not-italic">{v.verse}</sup>
                      {v.text}{" "}
                    </span>
                  ))}
                </p>
                <p className="mt-3 text-xs font-semibold text-stone">
                  {formatPassage(passage)} · {state.translation}
                </p>
              </>
            ) : state.status === "error" ? (
              <p className="text-stone">Couldn&rsquo;t load the passage right now. Open your Bible to {formatPassage(passage)}.</p>
            ) : (
              <div className="grid gap-2" aria-label="Loading passage">
                <span className="h-4 w-full animate-pulse rounded bg-linen" />
                <span className="h-4 w-4/5 animate-pulse rounded bg-linen" />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
