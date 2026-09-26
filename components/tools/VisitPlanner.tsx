"use client";

import { useState } from "react";
import { useNow } from "@/lib/useNow";
import Icon from "@/components/Icon";
import { rooms } from "@/data/nextgen";
import { formatTime, weekly, type Gathering } from "@/data/schedule";
import { site } from "@/data/site";

type Who = "me" | "couple" | "family";
type Arrive = "car" | "train" | "bike";
type Kid = { age: number };

const services = weekly.filter((g) => g.name === "Sunday Worship" || g.id === "midweek");

function nextDate(g: Gathering, now: Date) {
  const d = new Date(now);
  const diff = (g.day - now.getDay() + 7) % 7 || 7;
  d.setDate(now.getDate() + diff);
  const [h, m] = g.start.split(":").map(Number);
  d.setHours(h, m, 0, 0);
  return d;
}

function ics(g: Gathering, when: Date) {
  const stamp = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}00`;
  const end = new Date(when.getTime() + g.minutes * 60000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lamplight Bible Church//Plan a visit//EN",
    "BEGIN:VEVENT",
    `UID:${stamp(when)}-visit@lamplight.example`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART;TZID=America/Denver:${stamp(when)}`,
    `DTEND;TZID=America/Denver:${stamp(end)}`,
    `SUMMARY:${g.name} at Lamplight`,
    `LOCATION:${site.address.street}\\, ${site.address.city}\\, ${site.address.region} ${site.address.postal}`,
    "DESCRIPTION:Arrive 15 minutes early. Guest parking is in the front row of the back lot off Yosemite St.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

const Choice = ({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className="flex min-h-14 items-center gap-3 rounded-2xl bg-paper px-4 py-3 text-left font-semibold ring-1 ring-line transition-colors hover:ring-gold aria-pressed:bg-night aria-pressed:text-paper aria-pressed:ring-night"
  >
    {children}
  </button>
);

/** Four quick questions, then a personal plan for your first visit. */
export default function VisitPlanner() {
  const [svc, setSvc] = useState(services[1].id);
  const [who, setWho] = useState<Who>("family");
  const [kids, setKids] = useState<Kid[]>([{ age: 4 }]);
  const [arrive, setArrive] = useState<Arrive>("car");
  const [needs, setNeeds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const g = services.find((s) => s.id === svc)!;
  const now = useNow(60000);
  const when = now ? nextDate(g, now) : null;
  const [h, m] = g.start.split(":").map(Number);
  const arriveBy = formatTime(`${String(m < 15 ? h - 1 : h).padStart(2, "0")}:${String((m + 45) % 60).padStart(2, "0")}`);
  const hasKids = who === "family" && kids.length > 0;
  const kidRooms = hasKids ? kids.map((k) => ({ ...k, ...rooms.find((r) => k.age <= r.max)! })) : [];
  const toggleNeed = (n: string) => setNeeds((v) => (v.includes(n) ? v.filter((x) => x !== n) : [...v, n]));

  const steps = [
    {
      icon: arrive === "train" ? "train" : arrive === "bike" ? "sun" : "car",
      title: `Arrive by ${arriveBy}`,
      body:
        arrive === "train"
          ? "Take the E or H line to Orchard Station. Walk east on Orchard Road about six minutes; we're on the right, just past Yosemite."
          : arrive === "bike"
            ? "Bike racks are by the east doors, under the overhang. The High Line Canal trail connects about a mile north."
            : `Pull into the back lot off Yosemite Street. The front row, marked with lamp signs, is saved for guests${needs.includes("access") ? ", and the accessible spaces are right by the east doors" : ""}.`,
    },
    ...(hasKids
      ? [
          {
            icon: "child",
            title: "Check the kids in",
            body: `Head to the kids desk inside the east doors. ${kidRooms
              .map((k) => `Your ${k.age}-year-old goes to ${k.name} (${k.room}).`)
              .join(" ")} You'll get a matching tag, and only you can pick them up.`,
          },
        ]
      : []),
    {
      icon: "music",
      title: `${formatTime(g.start)}: Worship`,
      body: `About 25 minutes of singing led by our band. Lyrics are on the screens. Sing, listen, or just take it in.${needs.includes("hearing") ? " Grab a hearing-loop receiver at the sound booth on your way in." : ""}`,
    },
    {
      icon: "book",
      title: "Teaching from the Bible",
      body: `We open to the next passage and teach through it for about 40 minutes. Bibles are under the seats${needs.includes("print") ? ", and large-print Bibles and notes are at the welcome table" : ""}.`,
    },
    {
      icon: "coffee",
      title: "Coffee & hellos",
      body: `Stop by the welcome table after. We'll have ${who === "family" ? "coffee, juice boxes," : "coffee"} and a small gift for you. No sign-up sheets, promise.`,
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
      <div className="grid content-start gap-8">
        <fieldset>
          <legend className="font-serif text-2xl">1. Which service?</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {services.map((s) => (
              <Choice key={s.id} on={svc === s.id} onClick={() => setSvc(s.id)}>
                <span>
                  <span className="block">{s.day === 0 ? "Sunday" : "Wednesday"}</span>
                  <span className="block text-sm font-normal opacity-75">{formatTime(s.start)}</span>
                </span>
              </Choice>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-serif text-2xl">2. Who&rsquo;s coming?</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {(
              [
                ["me", "Just me", "users"],
                ["couple", "Two of us", "heart"],
                ["family", "With kids", "child"],
              ] as const
            ).map(([v, l, i]) => (
              <Choice key={v} on={who === v} onClick={() => setWho(v)}>
                <Icon name={i} className="h-5 w-5 shrink-0" /> {l}
              </Choice>
            ))}
          </div>
          {who === "family" ? (
            <div className="mt-4 rounded-2xl bg-paper p-4 ring-1 ring-line">
              <p className="text-sm font-semibold text-stone">Kids&rsquo; ages</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {kids.map((k, i) => (
                  <span key={i} className="flex items-center gap-1 rounded-full bg-parchment py-1 pr-1 pl-3 ring-1 ring-line">
                    <select
                      aria-label={`Child ${i + 1} age`}
                      value={k.age}
                      onChange={(e) => setKids(kids.map((x, j) => (j === i ? { age: Number(e.target.value) } : x)))}
                      className="bg-transparent font-semibold outline-none"
                    >
                      {Array.from({ length: 18 }, (_, a) => (
                        <option key={a} value={a}>
                          {a === 0 ? "Under 1" : `${a} yr${a > 1 ? "s" : ""}`}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setKids(kids.filter((_, j) => j !== i))}
                      className="rounded-full p-1.5 hover:bg-linen"
                    >
                      <Icon name="close" className="h-3.5 w-3.5" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </span>
                ))}
                {kids.length < 6 ? (
                  <button
                    type="button"
                    onClick={() => setKids([...kids, { age: 7 }])}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-ember ring-1 ring-ember/40 ring-inset hover:bg-parchment"
                  >
                    + Add a child
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </fieldset>

        <fieldset>
          <legend className="font-serif text-2xl">3. How are you getting here?</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {(
              [
                ["car", "Driving", "car"],
                ["train", "Light rail", "train"],
                ["bike", "Biking", "sun"],
              ] as const
            ).map(([v, l, i]) => (
              <Choice key={v} on={arrive === v} onClick={() => setArrive(v)}>
                <Icon name={i} className="h-5 w-5 shrink-0" /> {l}
              </Choice>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-serif text-2xl">4. Anything we should know?</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["access", "Wheelchair or walker"],
              ["hearing", "Hearing assistance"],
              ["print", "Large print"],
              ["allergy", "Kid food allergies"],
            ].map(([v, l]) => (
              <button
                key={v}
                type="button"
                aria-pressed={needs.includes(v)}
                onClick={() => toggleNeed(v)}
                className="rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-line ring-inset hover:ring-gold aria-pressed:bg-sage aria-pressed:text-paper aria-pressed:ring-sage"
              >
                {needs.includes(v) ? "✓ " : ""}
                {l}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="overflow-hidden rounded-[1.75rem] bg-night text-paper shadow-[0_30px_80px_-40px_rgb(20_23_41)]">
          <div className="lamp-glow p-7 sm:p-8" style={{ "--glow-x": "90%", "--glow-y": "0%" } as React.CSSProperties}>
            <p className="eyebrow text-gold">Your plan</p>
            <p className="mt-2 font-serif text-3xl">
              {when ? when.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : g.day === 0 ? "This Sunday" : "This Wednesday"}
            </p>
            <p className="text-mist">
              {g.name} · {formatTime(g.start)} · {g.minutes} minutes
            </p>
          </div>
          <ol className="grid gap-0 px-7 pb-2 sm:px-8">
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-4 pb-6">
                {i < steps.length - 1 ? <span className="absolute top-10 bottom-0 left-5 w-px bg-paper/15" /> : null}
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-night-3 text-gold ring-1 ring-paper/10">
                  <Icon name={s.icon} className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-mist">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="border-t border-paper/10 bg-night-2 p-7 sm:p-8">
            {sent ? (
              <div role="status">
                <p className="font-serif text-2xl text-gold-soft">We&rsquo;ll see you {g.day === 0 ? "Sunday" : "Wednesday"}, {name.split(" ")[0] || "friend"}!</p>
                <p className="mt-2 text-mist">
                  Look for Tom or Kathy at the east doors. They&rsquo;ll be wearing lamp-yellow lanyards
                  {hasKids ? " and will walk you to the kids rooms" : ""}. (Concept site: no email was actually sent.)
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-3"
              >
                <p className="font-semibold">Want someone to meet you at the door?</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" className="h-12 rounded-xl bg-night px-4 ring-1 ring-paper/15 outline-none placeholder:text-mist/70 focus:ring-gold" />
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" className="h-12 rounded-xl bg-night px-4 ring-1 ring-paper/15 outline-none placeholder:text-mist/70 focus:ring-gold" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="submit" className="min-h-12 rounded-full bg-gold px-6 font-semibold text-night hover:bg-gold-soft">
                    Let us know you&rsquo;re coming
                  </button>
                  <a
                    href={when ? `data:text/calendar;charset=utf-8,${encodeURIComponent(ics(g, when))}` : undefined}
                    download="lamplight-visit.ics"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold ring-1 ring-paper/25 ring-inset hover:bg-paper/5"
                  >
                    <Icon name="calendar" className="h-4 w-4" /> Add to calendar
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
