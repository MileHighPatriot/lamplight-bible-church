"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

type Share = "pastors" | "team";

const topics = ["Health", "Family", "Work", "Grief", "Faith", "Praise", "Other"];

/** Prayer request form. Concept only: nothing is sent. */
export default function PrayerForm() {
  const [share, setShare] = useState<Share>("team");
  const [topic, setTopic] = useState<string | null>(null);
  const [anon, setAnon] = useState(false);
  const [followUp, setFollowUp] = useState(false);
  const [text, setText] = useState("");
  const [sent, setSent] = useState<{ name: string } | null>(null);

  const field = "h-12 w-full rounded-xl bg-parchment px-4 ring-1 ring-line outline-none focus:ring-2 focus:ring-gold";

  if (sent) {
    return (
      <div className="rounded-[1.75rem] bg-paper p-7 ring-1 ring-line sm:p-10" aria-live="polite">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-soft text-ember">
          <Icon name="hands" className="h-7 w-7" />
        </span>
        <h2 className="mt-6 text-4xl">We&rsquo;re praying{sent.name ? `, ${sent.name}` : ""}.</h2>
        <p className="mt-3 max-w-lg text-lg text-stone">
          {share === "pastors"
            ? "Your request went only to the pastors. They pray over every request by name before the week is out."
            : "Your request went to the pastors and the prayer team. The team prays over it by name on Sunday morning at 8:30."}
          {followUp ? " Someone will reach out within two days." : ""}
        </p>
        <p className="mt-6 text-sm text-stone">Concept site: no request was actually sent.</p>
        <button
          type="button"
          onClick={() => {
            setSent(null);
            setText("");
            setTopic(null);
          }}
          className="mt-6 min-h-12 rounded-full px-6 font-semibold ring-1 ring-line ring-inset hover:bg-parchment"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const name = String(new FormData(e.currentTarget).get("name") ?? "").trim().split(" ")[0];
        setSent({ name: anon ? "" : name });
      }}
      className="rounded-[1.75rem] bg-paper p-6 ring-1 ring-line sm:p-9"
    >
      <fieldset>
        <legend className="eyebrow text-ember">Who should see this?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {(
            [
              ["team", "Pastors & prayer team", "About 20 people who pray every week. They keep it confidential."],
              ["pastors", "Pastors only", "For anything sensitive. Only the pastors will read it."],
            ] as const
          ).map(([id, label, note]) => (
            <button
              key={id}
              type="button"
              aria-pressed={share === id}
              onClick={() => setShare(id)}
              className="rounded-2xl p-4 text-left ring-1 ring-line ring-inset transition-colors hover:ring-ink aria-pressed:bg-night aria-pressed:text-paper aria-pressed:ring-night"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Icon name={id === "team" ? "users" : "shield"} className="h-4 w-4" /> {label}
              </span>
              <span className="mt-1 block text-sm opacity-75">{note}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="eyebrow text-ember">It&rsquo;s about (optional)</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(topic === t ? null : t)}
              className="min-h-10 rounded-full px-4 text-sm font-semibold ring-1 ring-line ring-inset aria-pressed:bg-gold aria-pressed:ring-gold"
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 grid gap-2">
        <span className="eyebrow text-ember">How can we pray?</span>
        <textarea
          required
          rows={5}
          maxLength={1000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={topic === "Praise" ? "Tell us what God has done. We love these." : "Share as much or as little as you like."}
          className="rounded-xl bg-parchment p-4 leading-relaxed ring-1 ring-line outline-none focus:ring-2 focus:ring-gold"
        />
        <span className="text-right text-xs text-stone">{text.length}/1000</span>
      </label>

      <label className="mt-2 flex cursor-pointer items-center gap-3">
        <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="h-4 w-4 accent-[#945311]" />
        <span className="text-[0.95rem]">Keep my name off it</span>
      </label>

      {!anon ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="Your name" aria-label="Your name" className={field} />
          <input name="email" type="email" required={followUp} placeholder={followUp ? "Email" : "Email (optional)"} aria-label="Email" className={field} />
        </div>
      ) : null}

      {!anon ? (
        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl bg-parchment p-4 ring-1 ring-line">
          <input type="checkbox" checked={followUp} onChange={(e) => setFollowUp(e.target.checked)} className="mt-1 h-4 w-4 accent-[#945311]" />
          <span className="text-[0.95rem]">I&rsquo;d like a pastor to reach out to me.</span>
        </label>
      ) : null}

      <button type="submit" className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-lg font-semibold text-night hover:bg-gold-soft">
        <Icon name="hands" className="h-5 w-5" /> Send prayer request
      </button>
      <p className="mt-3 text-center text-xs text-stone">Concept site: requests aren&rsquo;t actually sent.</p>
    </form>
  );
}
