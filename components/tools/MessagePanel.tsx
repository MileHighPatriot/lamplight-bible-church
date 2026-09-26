"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { apiRef } from "@/data/bible";
import type { Message } from "@/data/teaching";
import { useScripture } from "@/lib/scripture";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

/** A single message: the video frame, the passage text, and read-aloud. */
export default function MessagePanel({ m, onClose }: { m: Message; onClose: () => void }) {
  const [tab, setTab] = useState<"read" | "about">("read");
  const [speaking, setSpeaking] = useState(false);
  const [poster, setPoster] = useState(false);
  const text = useScripture(apiRef(m.passage));

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  function speak() {
    if (!("speechSynthesis" in window) || text.status !== "ok") return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(`${m.ref}. ${text.verses.map((v) => v.text).join(" ")}`);
    u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  }

  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line">
      <div className="relative aspect-video bg-night text-paper">
        <div className="lamp-glow absolute inset-0" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className="eyebrow text-gold">
              {m.service === "sunday" ? "Sunday" : "Wednesday · Through the Bible"}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-paper/10 p-2 ring-1 ring-paper/20 hover:bg-paper/20"
            >
              <Icon name="close" className="h-4 w-4" />
              <span className="sr-only">Close message</span>
            </button>
          </div>
          <div>
            <h2 className="text-3xl leading-tight sm:text-[2.6rem]">{m.service === "sunday" ? m.title : m.ref}</h2>
            <p className="mt-1 text-mist">
              {m.service === "sunday" ? `${m.ref} · ` : ""}
              {m.teacher}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPoster(true)}
          className="group absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-night shadow-2xl transition-transform hover:scale-105"
        >
          <Icon name="play" className="ml-1 h-6 w-6" />
          <span className="sr-only">Play message</span>
        </button>
        {poster ? (
          <div className="absolute inset-0 flex items-center justify-center bg-night/90 p-6 text-center">
            <div>
              <p className="font-serif text-2xl">This is a concept site.</p>
              <p className="mx-auto mt-2 max-w-sm text-mist">
                On a real church&rsquo;s site, the {m.video ? "video" : "audio"} for this message would play here,
                straight from YouTube or your podcast host.
              </p>
              <button type="button" onClick={() => setPoster(false)} className="mt-4 font-semibold text-gold">
                Got it
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line px-6 py-4 text-sm text-stone sm:px-8">
        <span className="flex items-center gap-1.5">
          <Icon name="calendar" className="h-4 w-4" /> {fmt(m.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="clock" className="h-4 w-4" /> {m.minutes} min
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name={m.video ? "play" : "headphones"} className="h-3.5 w-3.5" /> {m.video ? "Video & audio" : "Audio"}
        </span>
      </div>

      <div className="px-6 pt-5 sm:px-8">
        <div role="tablist" className="inline-flex rounded-full bg-parchment p-1">
          {(["read", "about"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className="rounded-full px-4 py-1.5 text-sm font-semibold text-stone aria-selected:bg-night aria-selected:text-paper"
            >
              {t === "read" ? "Read the passage" : "About this study"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-5 pb-7 sm:px-8">
        {tab === "read" ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-serif text-2xl">{m.ref}</p>
              <button
                type="button"
                onClick={speak}
                disabled={text.status !== "ok"}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-ink/15 ring-inset hover:bg-parchment disabled:opacity-50"
              >
                <Icon name={speaking ? "pause" : "headphones"} className="h-4 w-4" />
                {speaking ? "Stop" : "Listen"}
              </button>
            </div>
            <div className="mt-4 max-h-[26rem] overflow-y-auto pr-2 font-serif text-[1.18rem] leading-[1.75]">
              {text.status === "loading" || text.status === "idle" ? (
                <div className="grid gap-3" aria-label="Loading passage">
                  {[92, 100, 86, 97, 70].map((w) => (
                    <div key={w} className="h-4 animate-pulse rounded bg-linen" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : text.status === "error" ? (
                <p className="font-sans text-base text-stone">
                  We couldn&rsquo;t load the text right now. Open your Bible to {m.ref}, or try again in a moment.
                </p>
              ) : (
                <p>
                  {text.verses.map((v, i) => (
                    <span key={`${v.chapter}:${v.verse}`}>
                      {i > 0 && v.verse === 1 ? (
                        <span className="my-3 block font-sans text-sm font-bold text-ember">Chapter {v.chapter}</span>
                      ) : null}
                      <sup className="mr-1 font-sans text-[0.65rem] font-bold text-ember">{v.verse}</sup>
                      {v.text}{" "}
                    </span>
                  ))}
                </p>
              )}
            </div>
            {text.status === "ok" ? (
              <p className="mt-4 text-xs text-stone">Scripture from the {text.translation} (public domain).</p>
            ) : null}
          </>
        ) : (
          <div className="grid gap-4 text-[1.02rem] leading-relaxed">
            <p>
              {m.service === "sunday"
                ? `This message is part of our Sunday series in ${m.passage.book}. We teach straight through the book, so each week picks up where the last left off.`
                : `Wednesday nights we're reading through the whole Bible in order. This study covers ${m.ref}, with time for questions afterward in the fellowship hall.`}
            </p>
            <p className="text-stone">
              Want to go deeper? Read the passage twice before you watch, jot down one question, and bring it to your
              home group this week.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
