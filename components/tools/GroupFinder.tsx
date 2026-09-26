"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { areas, groups, stages, type Area, type Group, type Stage } from "@/data/groups";
import { dayNames, formatTime } from "@/data/schedule";

const days = [0, 1, 2, 3, 4, 5, 6];

/** Filter home groups by area, day, and stage of life, then ask to join. */
export default function GroupFinder() {
  const [area, setArea] = useState<Area | "any">("any");
  const [day, setDay] = useState<number | "any">("any");
  const [stage, setStage] = useState<Stage | "any">("any");
  const [kids, setKids] = useState(false);
  const [openOnly, setOpenOnly] = useState(true);
  const [joining, setJoining] = useState<Group | null>(null);
  const [joined, setJoined] = useState<string[]>([]);

  const list = useMemo(
    () =>
      groups.filter(
        (g) =>
          (area === "any" || g.area === area) &&
          (day === "any" || g.day === day) &&
          (stage === "any" || g.stage === stage || (stage !== "Men" && stage !== "Women" && g.stage === "Everyone")) &&
          (!kids || g.kids) &&
          (!openOnly || !g.full),
      ),
    [area, day, stage, kids, openOnly],
  );

  const reset = () => {
    setArea("any");
    setDay("any");
    setStage("any");
    setKids(false);
    setOpenOnly(true);
  };

  const select = "h-12 w-full rounded-xl bg-paper px-3 font-semibold ring-1 ring-line outline-none focus:ring-2 focus:ring-gold";

  return (
    <div>
      <div className="grid gap-3 rounded-[1.75rem] bg-night p-5 text-paper sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="grid gap-1.5 text-sm text-mist">
          Near
          <select value={area} onChange={(e) => setArea(e.target.value as Area | "any")} className={`${select} text-ink`}>
            <option value="any">Anywhere</option>
            {areas.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm text-mist">
          Day
          <select value={day} onChange={(e) => setDay(e.target.value === "any" ? "any" : Number(e.target.value))} className={`${select} text-ink`}>
            <option value="any">Any day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {dayNames[d]}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm text-mist">
          Group for
          <select value={stage} onChange={(e) => setStage(e.target.value as Stage | "any")} className={`${select} text-ink`}>
            <option value="any">Anyone</option>
            {stages.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap items-end gap-2 sm:col-span-2 lg:col-span-1">
          <button type="button" aria-pressed={kids} onClick={() => setKids(!kids)} className="h-12 rounded-xl px-4 text-sm font-semibold ring-1 ring-paper/20 ring-inset aria-pressed:bg-gold aria-pressed:text-night aria-pressed:ring-gold">
            Kids welcome
          </button>
          <button type="button" aria-pressed={openOnly} onClick={() => setOpenOnly(!openOnly)} className="h-12 rounded-xl px-4 text-sm font-semibold ring-1 ring-paper/20 ring-inset aria-pressed:bg-gold aria-pressed:text-night aria-pressed:ring-gold">
            Open now
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4" aria-live="polite">
        <p className="text-stone">
          <strong className="text-ink">{list.length}</strong> group{list.length === 1 ? "" : "s"} match
        </p>
        <button type="button" onClick={reset} className="text-sm font-semibold text-ember">
          Clear filters
        </button>
      </div>

      {list.length ? (
        <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <li key={g.id} id={g.id === "g15" ? "dtc" : undefined} className="flex flex-col rounded-[1.5rem] bg-paper p-6 ring-1 ring-line">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-bold text-sage">{g.stage}</span>
                {g.full ? (
                  <span className="rounded-full bg-linen px-3 py-1 text-xs font-bold text-stone">Waitlist</span>
                ) : g.kids ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-stone">
                    <Icon name="child" className="h-4 w-4" /> Kids welcome
                  </span>
                ) : null}
              </div>
              <h2 className="mt-4 text-[1.6rem] leading-tight">{g.name}</h2>
              <p className="text-sm text-stone">Hosted by {g.hosts}</p>
              <dl className="mt-4 grid gap-1.5 text-[0.95rem]">
                <div className="flex gap-2">
                  <Icon name="calendar" className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                  <dd>
                    {dayNames[g.day]}s · {formatTime(g.time)}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <Icon name={g.area === "Online" ? "globe" : "pin"} className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                  <dd>{g.area}</dd>
                </div>
                <div className="flex gap-2">
                  <Icon name="book" className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                  <dd>{g.study}</dd>
                </div>
              </dl>
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-stone">{g.note}</p>
              {joined.includes(g.id) ? (
                <p className="mt-5 rounded-xl bg-sage-soft px-4 py-3 text-sm font-semibold text-sage">
                  ✓ Request sent. {g.hosts.split(" ")[0]} will reach out this week.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => setJoining(g)}
                  className="mt-5 min-h-11 rounded-full bg-night px-5 text-sm font-semibold text-paper hover:bg-night-3"
                >
                  {g.full ? "Join the waitlist" : "Ask to join"}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-[1.5rem] border-2 border-dashed border-line p-10 text-center">
          <p className="font-serif text-2xl">No groups match all of that.</p>
          <p className="mt-2 text-stone">Try another day or area, or email Grace and she&rsquo;ll help you find a fit.</p>
        </div>
      )}

      {joining ? (
        <div role="dialog" aria-modal="true" aria-labelledby="join-title" className="fixed inset-0 z-50 flex items-end justify-center bg-night/60 p-4 backdrop-blur-sm sm:items-center" onClick={() => setJoining(null)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              setJoined((j) => [...j, joining.id]);
              setJoining(null);
            }}
            className="w-full max-w-md rounded-[1.75rem] bg-paper p-7"
          >
            <p className="eyebrow text-ember">{joining.full ? "Waitlist" : "Join a group"}</p>
            <h2 id="join-title" className="mt-2 text-3xl">
              {joining.name}
            </h2>
            <p className="mt-1 text-stone">
              {dayNames[joining.day]}s at {formatTime(joining.time)} · {joining.area}
            </p>
            <div className="mt-5 grid gap-3">
              <input required placeholder="Your name" aria-label="Your name" className="h-12 rounded-xl bg-parchment px-4 ring-1 ring-line outline-none focus:ring-2 focus:ring-gold" />
              <input required type="email" placeholder="Email" aria-label="Email" className="h-12 rounded-xl bg-parchment px-4 ring-1 ring-line outline-none focus:ring-2 focus:ring-gold" />
              <textarea placeholder="Anything the hosts should know? (optional)" aria-label="Note for the hosts" rows={3} className="rounded-xl bg-parchment p-4 ring-1 ring-line outline-none focus:ring-2 focus:ring-gold" />
            </div>
            <div className="mt-5 flex gap-2">
              <button type="submit" className="min-h-12 flex-1 rounded-full bg-gold font-semibold text-night">
                Send request
              </button>
              <button type="button" onClick={() => setJoining(null)} className="min-h-12 rounded-full px-5 font-semibold ring-1 ring-line ring-inset">
                Cancel
              </button>
            </div>
            <p className="mt-3 text-xs text-stone">Concept site: requests aren&rsquo;t actually sent.</p>
          </form>
        </div>
      ) : null}
    </div>
  );
}
