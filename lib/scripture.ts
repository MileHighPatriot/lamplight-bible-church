"use client";

import { useEffect, useState } from "react";

export type Verse = { chapter: number; verse: number; text: string };
export type ScriptureState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ok"; verses: Verse[]; translation: string }
  | { status: "error" };

const KEY = "ll-scripture-v1:";

/**
 * Passage text from bible-api.com (World English Bible, public domain).
 * Cached per passage in sessionStorage. Pass null to stay idle.
 */
export function useScripture(ref: string | null): ScriptureState {
  const [state, setState] = useState<ScriptureState>({ status: "idle" });

  useEffect(() => {
    if (!ref) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset when closed
      setState({ status: "idle" });
      return;
    }
    try {
      const cached = sessionStorage.getItem(KEY + ref);
      if (cached) {
        setState({ status: "ok", ...JSON.parse(cached) });
        return;
      }
    } catch {}
    setState({ status: "loading" });
    const ctrl = new AbortController();
    fetch(`https://bible-api.com/${encodeURIComponent(ref)}?translation=web`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const verses: Verse[] = json.verses.map((v: { chapter: number; verse: number; text: string }) => ({
          chapter: v.chapter,
          verse: v.verse,
          text: v.text.replace(/\s+/g, " ").trim(),
        }));
        const value = { verses, translation: json.translation_name ?? "World English Bible" };
        try {
          sessionStorage.setItem(KEY + ref, JSON.stringify(value));
        } catch {}
        setState({ status: "ok", ...value });
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setState({ status: "error" });
      });
    return () => ctrl.abort();
  }, [ref]);

  return state;
}
